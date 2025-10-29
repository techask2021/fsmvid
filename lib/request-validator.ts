/**
 * Request Validation System
 * 
 * Purpose: Validate that requests come from legitimate sources
 * - Check Origin/Referer headers
 * - Block direct API calls
 * - Allow only requests from your domain
 */

/**
 * Get allowed origins/domains for your application
 * Add your production and development domains here
 */
function getAllowedOrigins(): string[] {
  return [
    'https://fsmvid.com',
    'https://www.fsmvid.com',
    'https://fsmvid.netlify.app',
    'http://localhost:3000',  // Development
    'http://localhost:3001',  // Development
    // Add your actual domain here!
  ]
}

/**
 * Check if request comes from an allowed origin
 */
export function isValidOrigin(origin: string | null, referer: string | null): {
  valid: boolean
  reason?: string
} {
  const allowedOrigins = getAllowedOrigins()
  
  // Check origin header
  if (origin) {
    const isAllowed = allowedOrigins.some(allowed => origin.startsWith(allowed))
    if (isAllowed) {
      return { valid: true }
    }
  }
  
  // Check referer header as fallback
  if (referer) {
    const isAllowed = allowedOrigins.some(allowed => referer.startsWith(allowed))
    if (isAllowed) {
      return { valid: true }
    }
  }
  
  // If neither origin nor referer match allowed domains
  if (!origin && !referer) {
    return {
      valid: false,
      reason: 'Missing Origin and Referer headers (direct API call detected)',
    }
  }
  
  return {
    valid: false,
    reason: `Invalid origin/referer: ${origin || referer} (not from allowed domain)`,
  }
}

/**
 * Check if User-Agent looks legitimate
 */
export function isValidUserAgent(userAgent: string | null): {
  valid: boolean
  isBot: boolean
  reason?: string
} {
  if (!userAgent) {
    return {
      valid: false,
      isBot: true,
      reason: 'Missing User-Agent header',
    }
  }
  
  // Check for OBVIOUS bot/automation tools (instant block)
  const obviousBotPatterns = [
    /python/i,
    /curl/i,
    /wget/i,
    /postman/i,
    /insomnia/i,
    /httpie/i,
    /^node-fetch/i,
    /^axios/i,
    /^got/i,
    /^superagent/i,
    /headless/i,        // HeadlessChrome
    /phantom/i,         // PhantomJS
    /selenium/i,        // Selenium
    /webdriver/i,       // WebDriver
    /puppeteer/i,       // Puppeteer
    /playwright/i,      // Playwright
    /scrapy/i,          // Scrapy
    /bot/i,             // Generic bots
    /crawler/i,         // Crawlers
    /spider/i,          // Spiders
  ]
  
  for (const pattern of obviousBotPatterns) {
    if (pattern.test(userAgent)) {
      return {
        valid: false,
        isBot: true,
        reason: `Bot User-Agent detected: ${userAgent.substring(0, 50)}`,
      }
    }
  }
  
  // User-Agent should be reasonably long (browsers have detailed UAs)
  if (userAgent.length < 20) {
    return {
      valid: false,
      isBot: true,
      reason: 'User-Agent too short (suspicious)',
    }
  }
  
  return { valid: true, isBot: false }
}

/**
 * Check if request has expected browser headers (bot detection)
 * Only flag as bot if MULTIPLE headers are missing (not just one)
 */
export function hasBrowserHeaders(headers: Headers): {
  valid: boolean
  missingHeaders: string[]
  isSuspiciousBot: boolean
} {
  const missingHeaders: string[] = []
  
  // Real browsers usually send these headers
  const acceptLanguage = headers.get('accept-language')
  const acceptEncoding = headers.get('accept-encoding')
  const secFetchSite = headers.get('sec-fetch-site')
  
  // Only flag if MULTIPLE key headers are missing (not just one)
  if (!acceptLanguage) {
    missingHeaders.push('Accept-Language header missing')
  }
  
  if (!acceptEncoding) {
    missingHeaders.push('Accept-Encoding header missing')
  }
  
  if (!secFetchSite) {
    missingHeaders.push('Sec-Fetch-Site header missing')
  }
  
  // Only consider bot if 2+ headers are missing
  // Real browsers ALWAYS send these, bots rarely send ANY of them
  const isSuspiciousBot = missingHeaders.length >= 2
  
  return {
    valid: missingHeaders.length === 0,
    missingHeaders,
    isSuspiciousBot,
  }
}

/**
 * Comprehensive request validation
 * Returns validation result and recommended action
 */
export function validateRequest(
  origin: string | null,
  referer: string | null,
  userAgent: string | null,
  headers?: Headers
): {
  valid: boolean
  suspicious: boolean
  isBot: boolean
  reasons: string[]
  recommendedAction: 'allow' | 'strict_limit' | 'block'
} {
  const reasons: string[] = []
  let suspicious = false
  let isBot = false
  
  // Check origin/referer
  const originCheck = isValidOrigin(origin, referer)
  if (!originCheck.valid) {
    reasons.push(originCheck.reason!)
    suspicious = true
  }
  
  // Check user-agent for OBVIOUS bots
  const uaCheck = isValidUserAgent(userAgent)
  if (!uaCheck.valid) {
    reasons.push(uaCheck.reason!)
    suspicious = true
    if (uaCheck.isBot) {
      isBot = true // Confirmed bot from User-Agent
    }
  }
  
  // Check browser headers (if provided)
  if (headers && originCheck.valid) {
    // Only check headers if origin is valid (from our domain)
    // This catches sophisticated bots running from our domain
    const headerCheck = hasBrowserHeaders(headers)
    if (!headerCheck.valid) {
      reasons.push(...headerCheck.missingHeaders)
      suspicious = true
    }
    // Only flag as bot if MULTIPLE headers are missing (2+)
    // This avoids false positives with real browsers
    if (headerCheck.isSuspiciousBot) {
      isBot = true
    }
  }
  
  // Determine action based on findings
  let recommendedAction: 'allow' | 'strict_limit' | 'block' = 'allow'
  
  // If confirmed bot (User-Agent or missing headers), BLOCK immediately
  if (isBot) {
    recommendedAction = 'block'
  } else if (reasons.length === 0) {
    // Everything looks good
    recommendedAction = 'allow'
  } else if (reasons.length === 1 && originCheck.valid) {
    // Only User-Agent is suspicious, but origin is valid
    // Might be a browser with weird UA
    recommendedAction = 'allow'
    suspicious = false // Override
  } else if (!originCheck.valid) {
    // Origin/Referer check failed = likely direct API call or outside domain
    // BLOCK COMPLETELY - No access from outside the website!
    recommendedAction = 'block'
  }
  
  return {
    valid: reasons.length === 0,
    suspicious,
    isBot,
    reasons,
    recommendedAction,
  }
}

