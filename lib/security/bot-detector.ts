/**
 * Smart Bot Detection System
 * 
 * Purpose: Detect and auto-block suspicious bot behavior
 * - Track request patterns per IP
 * - Auto-blacklist if 50+ requests in 10 minutes
 * - Real users never hit this threshold
 */

import { addToTempBlacklist } from './ip-blacklist'

interface RequestTracker {
  count: number
  firstRequest: number
  lastRequest: number
  timestamps: number[]
}

// Track requests per IP (in-memory, resets on server restart)
const requestTracking = new Map<string, RequestTracker>()

// Thresholds for bot detection
// These are set to allow legitimate users who retry downloads or download multiple videos
// while still catching automated bots quickly
const BOT_THRESHOLD = 50 // requests in 10 minutes (allows batch downloads by real users)
const TIME_WINDOW = 10 * 60 * 1000 // 10 minutes in milliseconds
const RAPID_FIRE_THRESHOLD = 12 // requests in 10 seconds (allows retries but catches bots)
const RAPID_FIRE_WINDOW = 10 * 1000 // 10 seconds

/**
 * Track a request and check if it's bot behavior
 * Returns true if IP should be blocked
 */
export function trackAndDetectBot(ip: string): {
  isBot: boolean
  requestCount: number
  reason?: string
} {
  const now = Date.now()
  
  // Get or create tracker for this IP
  let tracker = requestTracking.get(ip)
  
  if (!tracker) {
    tracker = {
      count: 0,
      firstRequest: now,
      lastRequest: now,
      timestamps: [],
    }
    requestTracking.set(ip, tracker)
  }
  
  // Add current timestamp
  tracker.timestamps.push(now)
  tracker.lastRequest = now
  tracker.count++
  
  // Remove timestamps older than TIME_WINDOW
  tracker.timestamps = tracker.timestamps.filter(
    timestamp => now - timestamp < TIME_WINDOW
  )
  
  // Update count based on recent timestamps
  const recentCount = tracker.timestamps.length
  
  // Bot detection: 50+ requests in 10 minutes
  // This allows real users to download multiple videos or retry failures
  if (recentCount >= BOT_THRESHOLD) {
    const reason = `Bot detected: ${recentCount} requests in 10 minutes (automated behavior)`
    
    // Auto-blacklist this IP
    addToTempBlacklist(ip, reason)
    
    console.warn(`[BOT DETECTOR] ${reason} - IP: ${ip}`)
    
    return {
      isBot: true,
      requestCount: recentCount,
      reason,
    }
  }
  
  // ADVANCED: Check for rapid-fire requests (12 requests in 10 seconds = bot)
  // Allows users to retry failed downloads (5-10 retries) but catches automation
  const rapidFireRequests = tracker.timestamps.filter(
    timestamp => now - timestamp < RAPID_FIRE_WINDOW
  )
  
  if (rapidFireRequests.length >= RAPID_FIRE_THRESHOLD) {
    const reason = `Bot detected: ${rapidFireRequests.length} requests in 10 seconds (too fast - likely automated)`
    addToTempBlacklist(ip, reason)
    console.warn(`[BOT DETECTOR] ${reason} - IP: ${ip}`)
    return {
      isBot: true,
      requestCount: recentCount,
      reason,
    }
  }
  
  // ADVANCED: Check for too-perfect timing (consistent intervals = bot)
  // Only check if we have enough data points and requests are very fast
  if (tracker.timestamps.length >= 10) {
    const intervals: number[] = []
    for (let i = 1; i < tracker.timestamps.length; i++) {
      intervals.push(tracker.timestamps[i] - tracker.timestamps[i - 1])
    }
    
    // Calculate average and variance
    const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length
    const variance = intervals.reduce((sum, interval) => {
      return sum + Math.pow(interval - avg, 2)
    }, 0) / intervals.length
    
    // If variance is VERY low (perfect timing) AND fast requests, likely a bot
    // Real humans have irregular timing, even when working through a list
    // Only flag if average is less than 3 seconds AND variance is very low
    if (variance < 50000 && avg < 3000) {
      const reason = `Bot detected: Perfect automated timing (avg: ${Math.round(avg)}ms, variance: ${Math.round(variance)})`
      addToTempBlacklist(ip, reason)
      console.warn(`[BOT DETECTOR] ${reason} - IP: ${ip}`)
      return {
        isBot: true,
        requestCount: recentCount,
        reason,
      }
    }
  }
  
  return {
    isBot: false,
    requestCount: recentCount,
  }
}

/**
 * Check if request pattern looks like a bot (without tracking)
 * Useful for logging/monitoring
 */
export function isSuspiciousPattern(
  userAgent: string | null,
  origin: string | null,
  referer: string | null
): {
  suspicious: boolean
  reasons: string[]
} {
  const reasons: string[] = []
  
  // Check User-Agent
  if (!userAgent || userAgent.length < 10) {
    reasons.push('Missing or suspicious User-Agent')
  } else {
    const botPatterns = [
      'bot', 'crawler', 'spider', 'scraper',
      'python', 'curl', 'wget', 'postman',
      'http', 'okhttp', 'axios', 'got'
    ]
    
    const ua = userAgent.toLowerCase()
    for (const pattern of botPatterns) {
      if (ua.includes(pattern)) {
        reasons.push(`Bot-like User-Agent: ${pattern}`)
        break
      }
    }
  }
  
  // Check Origin/Referer (should be from your domain for legitimate requests)
  if (!origin && !referer) {
    reasons.push('Missing Origin and Referer headers (direct API call)')
  }
  
  return {
    suspicious: reasons.length > 0,
    reasons,
  }
}

/**
 * Clean up old tracking data (call periodically)
 */
export function cleanupOldTracking(): void {
  const now = Date.now()
  const cleaned: string[] = []
  
  for (const [ip, tracker] of requestTracking.entries()) {
    // Remove if no activity in last hour
    if (now - tracker.lastRequest > 60 * 60 * 1000) {
      requestTracking.delete(ip)
      cleaned.push(ip)
    }
  }
  
  if (cleaned.length > 0) {
    console.info(`[BOT DETECTOR] Cleaned up ${cleaned.length} old tracking entries`)
  }
}

/**
 * Get bot detection statistics
 */
export function getBotDetectionStats(): {
  trackedIPs: number
  topRequesters: Array<{ ip: string; count: number }>
} {
  const topRequesters = Array.from(requestTracking.entries())
    .map(([ip, tracker]) => ({
      ip,
      count: tracker.timestamps.length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
  
  return {
    trackedIPs: requestTracking.size,
    topRequesters,
  }
}

// Auto-cleanup every 30 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupOldTracking, 30 * 60 * 1000)
}

