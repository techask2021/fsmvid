import { Redis } from '@upstash/redis'

// Initialize Redis client with environment variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

export interface RateLimitConfig {
  interval: number // Time window in seconds (e.g., 3600 for 1 hour)
  limit: number    // Max requests in the time window
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number // Unix timestamp when the limit resets
}

/**
 * Rate limiter using Upstash Redis
 * 
 * @param identifier - Unique identifier (usually IP address)
 * @param config - Rate limit configuration
 * @returns Rate limit result with success status and remaining quota
 */
export async function rateLimit(
  identifier: string,
  config: RateLimitConfig = { interval: 3600, limit: 20 }
): Promise<RateLimitResult> {
  // TEMPORARILY DISABLED for Cloudflare Workers debugging
  // Skip rate limiting if Redis is not configured
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn('[Rate Limit] Upstash Redis not configured - rate limiting disabled')
    return {
      success: true,
      limit: config.limit,
      remaining: config.limit,
      reset: Date.now() + config.interval * 1000,
    }
  }

  // TEMPORARY: Always allow requests while debugging Cloudflare Workers issues
  console.info('[Rate Limit] DISABLED for debugging - allowing all requests')
  return {
    success: true,
    limit: config.limit,
    remaining: config.limit,
    reset: Date.now() + config.interval * 1000,
  }

  /* TEMPORARILY COMMENTED OUT - Re-enable after fixing Workers issues
  try {
    const key = `rate_limit:${identifier}`
    const now = Date.now()
    const window = Math.floor(now / (config.interval * 1000))
    const windowKey = `${key}:${window}`

    // Use Redis pipeline for atomic operations
    const pipeline = redis.pipeline()
    pipeline.incr(windowKey)
    pipeline.expire(windowKey, config.interval)

    const results = await pipeline.exec()
    const count = results[0] as number

    const success = count <= config.limit
    const remaining = Math.max(0, config.limit - count)
    const reset = (window + 1) * config.interval * 1000

    return {
      success,
      limit: config.limit,
      remaining,
      reset,
    }
  } catch (error) {
    // If Redis fails, log error but don't block the request
    console.error('[Rate Limit] Redis error:', error)
    return {
      success: true,
      limit: config.limit,
      remaining: config.limit,
      reset: Date.now() + config.interval * 1000,
    }
  }
  */
}

/**
 * Get client IP address from request headers
 * Works with Netlify, Vercel, and other edge platforms
 */
export function getClientIP(headers: Headers): string {
  // Try various headers in order of preference
  const forwardedFor = headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  const cfConnectingIP = headers.get('cf-connecting-ip') // Cloudflare
  if (cfConnectingIP) {
    return cfConnectingIP
  }

  const nfConnectingIP = headers.get('x-nf-client-connection-ip') // Netlify
  if (nfConnectingIP) {
    return nfConnectingIP
  }

  // Fallback to a default value
  return 'unknown'
}

/**
 * Different rate limit tiers for different endpoints
 */
export const RATE_LIMITS = {
  // Expensive endpoints - generous limits for legitimate browsers (caching helps reduce actual API calls)
  DOWNLOAD: { interval: 3600, limit: 200 },       // 200 downloads per hour (generous with caching)
  VIDEO_INFO: { interval: 3600, limit: 200 },     // 200 info requests per hour
  PROXY: { interval: 3600, limit: 200 },          // 200 proxy requests per hour
  
  // Strict limits for suspected bots/direct API calls
  PROXY_STRICT: { interval: 3600, limit: 50 },    // 50 proxy requests per hour for bots
  DOWNLOAD_STRICT: { interval: 3600, limit: 50 }, // 50 downloads per hour for bots
  
  // Less expensive endpoints - relaxed limits
  GENERAL: { interval: 3600, limit: 300 },        // 300 requests per hour
  
  // Very cheap endpoints - generous limits
  VITALS: { interval: 3600, limit: 500 },         // 500 vitals per hour
  CSP_REPORT: { interval: 3600, limit: 1000 },    // 1000 CSP reports per hour
} as const

