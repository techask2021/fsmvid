import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getClientIP, RateLimitConfig } from './rate-limit'
import { isBlacklisted } from './ip-blacklist'

/**
 * Middleware wrapper for rate limiting API routes
 * 
 * Usage:
 * ```ts
 * export async function POST(request: NextRequest) {
 *   const rateLimitResult = await withRateLimit(request, RATE_LIMITS.DOWNLOAD)
 *   if (!rateLimitResult.success) {
 *     return rateLimitResult.response
 *   }
 * 
 *   // Continue with your API logic...
 * }
 * ```
 */
export async function withRateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<{
  success: boolean
  response?: NextResponse
  headers?: Record<string, string>
}> {
  const ip = getClientIP(request.headers)
  
  // Check IP blacklist FIRST (before rate limiting)
  if (isBlacklisted(ip)) {
    return {
      success: false,
      response: NextResponse.json(
        {
          status: 'error',
          message: 'Access denied. Your IP has been blocked due to suspicious activity.',
        },
        {
          status: 403,
        }
      ),
    }
  }
  
  const result = await rateLimit(ip, config)

  // Prepare rate limit headers (helps clients understand their quota)
  const rateLimitHeaders = {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  }

  if (!result.success) {
    // Rate limit exceeded
    const retryAfter = Math.ceil((result.reset - Date.now()) / 1000)
    console.info(`[RATE LIMIT] IP ${ip} exceeded limit (${result.limit} req/hour)`)
    
    return {
      success: false,
      response: NextResponse.json(
        {
          status: 'error',
          message: 'Too many requests. Please try again later.',
          retryAfter: retryAfter,
          limit: result.limit,
          reset: new Date(result.reset).toISOString(),
        },
        {
          status: 429,
          headers: {
            ...rateLimitHeaders,
            'Retry-After': retryAfter.toString(),
          },
        }
      ),
    }
  }

  // Rate limit check passed - log only when getting close to limit
  if (result.remaining <= 10) {
    console.info(`[RATE LIMIT] IP ${ip} has ${result.remaining} requests remaining`)
  }

  // Rate limit check passed
  return {
    success: true,
    headers: rateLimitHeaders,
  }
}

/**
 * Helper to add rate limit headers to successful responses
 */
export function addRateLimitHeaders(
  response: NextResponse,
  headers: Record<string, string>
): NextResponse {
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

