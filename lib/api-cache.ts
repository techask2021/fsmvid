/**
 * API Response Caching System
 * 
 * Purpose: Cache video information to avoid repeated API calls for same URL
 * - Saves API quota/costs
 * - Faster response for repeated URLs
 * - Stores in memory (session-based)
 */

interface CacheEntry {
  data: any
  timestamp: number
  url: string
}

// In-memory cache (clears on page reload)
const cache = new Map<string, CacheEntry>()

// Cache duration: 10 minutes (600,000 ms)
const CACHE_TTL = 10 * 60 * 1000

/**
 * Generate cache key from URL
 */
function getCacheKey(url: string): string {
  // Normalize URL to avoid cache misses due to minor differences
  try {
    const urlObj = new URL(url)
    // Remove tracking parameters
    urlObj.searchParams.delete('utm_source')
    urlObj.searchParams.delete('utm_medium')
    urlObj.searchParams.delete('utm_campaign')
    return urlObj.toString().toLowerCase()
  } catch {
    return url.toLowerCase()
  }
}

/**
 * Check if cache entry is still valid
 */
function isValid(entry: CacheEntry): boolean {
  const now = Date.now()
  const age = now - entry.timestamp
  return age < CACHE_TTL
}

/**
 * Get cached response for URL
 */
export function getCachedResponse(url: string): any | null {
  const key = getCacheKey(url)
  const entry = cache.get(key)
  
  if (!entry) {
    return null
  }
  
  if (!isValid(entry)) {
    // Cache expired, remove it
    cache.delete(key)
    return null
  }
  
  console.info(`[CACHE] Hit for URL: ${url.substring(0, 50)}...`)
  return entry.data
}

/**
 * Store response in cache
 */
export function setCachedResponse(url: string, data: any): void {
  const key = getCacheKey(url)
  
  cache.set(key, {
    data,
    timestamp: Date.now(),
    url: url.substring(0, 100), // Store truncated URL for debugging
  })
  
  console.info(`[CACHE] Stored for URL: ${url.substring(0, 50)}...`)
  
  // Limit cache size to prevent memory issues
  if (cache.size > 100) {
    // Remove oldest entries
    const entries = Array.from(cache.entries())
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp)
    
    // Remove oldest 20 entries
    for (let i = 0; i < 20; i++) {
      cache.delete(entries[i][0])
    }
  }
}

/**
 * Clear all cache (useful for testing)
 */
export function clearCache(): void {
  cache.clear()
  console.info('[CACHE] Cleared all entries')
}

/**
 * Get cache statistics
 */
export function getCacheStats(): {
  size: number
  entries: Array<{ url: string; age: number }>
} {
  const entries = Array.from(cache.values()).map(entry => ({
    url: entry.url,
    age: Math.floor((Date.now() - entry.timestamp) / 1000), // Age in seconds
  }))
  
  return {
    size: cache.size,
    entries,
  }
}

