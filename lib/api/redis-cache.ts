import { Redis } from '@upstash/redis'

// Initialize Redis client with environment variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

/**
 * Get cached response from Upstash Redis
 * @param key - Cache key (usually the video URL)
 * @returns Cached data or null if not found/expired
 */
export async function getCachedResponse(key: string): Promise<any | null> {
  // Skip if Redis is not configured
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }

  try {
    const cacheKey = `api_cache:${key}`
    const cached = await redis.get(cacheKey)

    if (cached) {
      console.info(`[CACHE HIT] Retrieved from Redis: ${key.substring(0, 50)}...`)
      return cached
    }

    return null
  } catch (error) {
    console.error('[CACHE] Error reading from Redis:', error)
    return null
  }
}

/**
 * Set cached response in Upstash Redis
 * @param key - Cache key (usually the video URL)
 * @param data - Data to cache
 * @param ttl - Time to live in seconds (default: 3600 = 1 hour)
 */
export async function setCachedResponse(key: string, data: any, ttl: number = 3600): Promise<void> {
  // Skip if Redis is not configured
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return
  }

  try {
    const cacheKey = `api_cache:${key}`
    await redis.setex(cacheKey, ttl, JSON.stringify(data))
    console.info(`[CACHE SET] Stored in Redis with ${ttl}s TTL: ${key.substring(0, 50)}...`)
  } catch (error) {
    console.error('[CACHE] Error writing to Redis:', error)
  }
}

/**
 * Delete cached response from Upstash Redis
 * @param key - Cache key to delete
 */
export async function deleteCachedResponse(key: string): Promise<void> {
  // Skip if Redis is not configured
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return
  }

  try {
    const cacheKey = `api_cache:${key}`
    await redis.del(cacheKey)
    console.info(`[CACHE DELETE] Removed from Redis: ${key.substring(0, 50)}...`)
  } catch (error) {
    console.error('[CACHE] Error deleting from Redis:', error)
  }
}
