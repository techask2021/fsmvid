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
  reason?: string
} {
  if (!userAgent) {
    return {
      valid: false,
      reason: 'Missing User-Agent header',
    }
  }
  
  // Check for common bot/script patterns
  const botPatterns = [
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
  ]
  
  for (const pattern of botPatterns) {
    if (pattern.test(userAgent)) {
      return {
        valid: false,
        reason: `Bot-like User-Agent detected: ${userAgent.substring(0, 50)}`,
      }
    }
  }
  
  // User-Agent should be reasonably long (browsers have detailed UAs)
  if (userAgent.length < 20) {
    return {
      valid: false,
      reason: 'User-Agent too short (suspicious)',
    }
  }
  
  return { valid: true }
}

/**
 * Comprehensive request validation
 * Returns validation result and recommended action
 */
export function validateRequest(
  origin: string | null,
  referer: string | null,
  userAgent: string | null
): {
  valid: boolean
  suspicious: boolean
  reasons: string[]
  recommendedAction: 'allow' | 'strict_limit' | 'block'
} {
  const reasons: string[] = []
  let suspicious = false
  
  // Check origin/referer
  const originCheck = isValidOrigin(origin, referer)
  if (!originCheck.valid) {
    reasons.push(originCheck.reason!)
    suspicious = true
  }
  
  // Check user-agent
  const uaCheck = isValidUserAgent(userAgent)
  if (!uaCheck.valid) {
    reasons.push(uaCheck.reason!)
    suspicious = true
  }
  
  // Determine action based on findings
  let recommendedAction: 'allow' | 'strict_limit' | 'block' = 'allow'
  
  if (reasons.length === 0) {
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
    reasons,
    recommendedAction,
  }
}

