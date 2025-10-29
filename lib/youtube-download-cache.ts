/**
 * YouTube Download URL Cache System using Netlify Blob Storage
 * 
 * Purpose: Store YouTube video download URLs server-side to bypass 403 errors
 * - Stores URLs that fail with direct download
 * - Provides proxied access with proper headers
 * - Auto-expires after 5 hours (before YouTube URLs expire)
 */

interface YouTubeDownloadData {
  downloadUrl: string      // Original YouTube CDN URL (googlevideo.com)
  filename: string          // Video filename
  quality: string          // Video quality (720p, 1080p, etc.)
  format: string           // Video format (mp4, webm, etc.)
  videoTitle: string       // Original video title
  originalVideoUrl: string // Original YouTube video URL
  timestamp: number        // When this was cached
}

/**
 * Get or create the YouTube downloads blob store
 * Uses dynamic import to avoid build errors in local development
 */
async function getYouTubeStore() {
  try {
    // Only import @netlify/blobs in production/Netlify environment
    if (process.env.NETLIFY || process.env.NODE_ENV === 'production') {
      const { getStore } = await import('@netlify/blobs')
      return getStore('youtube-downloads')
    }
    return null
  } catch (error) {
    // In development or if blob store is not available
    console.warn('[YOUTUBE CACHE] Blob store not available, using in-memory fallback')
    return null
  }
}

// In-memory fallback for local development
const memoryCache = new Map<string, YouTubeDownloadData>()

/**
 * Generate unique download ID
 */
function generateDownloadId(): string {
  return `yt-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
}

/**
 * Store YouTube download URL and return proxied URL path
 * 
 * @param downloadUrl - The direct YouTube CDN URL (googlevideo.com)
 * @param filename - Desired filename for download
 * @param quality - Video quality
 * @param format - Video format
 * @param videoTitle - Original video title
 * @param originalVideoUrl - Original YouTube watch URL
 * @returns Proxied URL path like /api/youtube-download/xyz123
 */
export async function cacheYouTubeDownloadUrl(
  downloadUrl: string,
  filename: string,
  quality: string,
  format: string,
  videoTitle: string,
  originalVideoUrl: string
): Promise<string> {
  const downloadId = generateDownloadId()
  
  const data: YouTubeDownloadData = {
    downloadUrl,
    filename,
    quality,
    format,
    videoTitle,
    originalVideoUrl,
    timestamp: Date.now(),
  }
  
  const store = await getYouTubeStore()
  
  if (store) {
    try {
      // Store in Netlify Blob with 5-hour TTL (YouTube URLs expire in ~6 hours)
      await store.setJSON(downloadId, data, {
        metadata: {
          ttl: 18000, // 5 hours in seconds
        },
      })
      
      console.info(`[YOUTUBE CACHE] ✓ Stored in Netlify Blob: ${videoTitle} (${quality}) - ID: ${downloadId}`)
    } catch (error) {
      console.error('[YOUTUBE CACHE] Failed to store in blob:', error)
      // Fallback to memory
      memoryCache.set(downloadId, data)
      console.info(`[YOUTUBE CACHE] ✓ Stored in memory fallback: ${videoTitle} (${quality}) - ID: ${downloadId}`)
    }
  } else {
    // Development fallback
    memoryCache.set(downloadId, data)
    console.info(`[YOUTUBE CACHE] ✓ Stored in memory (dev mode): ${videoTitle} (${quality}) - ID: ${downloadId}`)
  }
  
  // Return the proxied URL path
  return `/api/youtube-download/${downloadId}`
}

/**
 * Get YouTube download URL from cache
 * 
 * @param downloadId - The unique download ID
 * @returns The cached download data or null if not found/expired
 */
export async function getYouTubeDownloadUrl(
  downloadId: string
): Promise<YouTubeDownloadData | null> {
  const store = await getYouTubeStore()
  
  if (store) {
    try {
      const data = await store.get(downloadId, { type: 'json' })
      
      if (data) {
        console.info(`[YOUTUBE CACHE] ✓ Retrieved from Netlify Blob: ${downloadId}`)
        return data as YouTubeDownloadData
      }
    } catch (error) {
      console.warn(`[YOUTUBE CACHE] Failed to retrieve from blob: ${error}`)
    }
  }
  
  // Check memory fallback
  const memData = memoryCache.get(downloadId)
  
  if (memData) {
    // Check if expired (5 hours)
    const age = Date.now() - memData.timestamp
    const MAX_AGE = 5 * 60 * 60 * 1000 // 5 hours
    
    if (age < MAX_AGE) {
      console.info(`[YOUTUBE CACHE] ✓ Retrieved from memory: ${downloadId}`)
      return memData
    } else {
      // Expired, remove it
      memoryCache.delete(downloadId)
      console.warn(`[YOUTUBE CACHE] ✗ Expired and removed from memory: ${downloadId}`)
    }
  }
  
  console.warn(`[YOUTUBE CACHE] ✗ Not found or expired: ${downloadId}`)
  return null
}

/**
 * Delete a specific download ID from cache
 */
export async function deleteYouTubeDownloadUrl(downloadId: string): Promise<void> {
  const store = await getYouTubeStore()
  
  if (store) {
    try {
      await store.delete(downloadId)
      console.info(`[YOUTUBE CACHE] Deleted from blob: ${downloadId}`)
    } catch (error) {
      console.error(`[YOUTUBE CACHE] Failed to delete from blob: ${error}`)
    }
  }
  
  memoryCache.delete(downloadId)
}

/**
 * Get cache statistics (for monitoring/debugging)
 */
export function getYouTubeCacheStats(): {
  memorySize: number
  memoryEntries: Array<{ videoTitle: string; quality: string; age: number }>
} {
  const entries = Array.from(memoryCache.values()).map(entry => ({
    videoTitle: entry.videoTitle,
    quality: entry.quality,
    age: Math.floor((Date.now() - entry.timestamp) / 1000), // Age in seconds
  }))
  
  return {
    memorySize: memoryCache.size,
    memoryEntries: entries,
  }
}

/**
 * Cleanup memory cache (remove expired entries)
 * This is mainly for the in-memory fallback
 */
export function cleanupExpiredCache(): void {
  const MAX_AGE = 5 * 60 * 60 * 1000 // 5 hours
  const now = Date.now()
  
  let removed = 0
  for (const [id, data] of memoryCache.entries()) {
    if (now - data.timestamp > MAX_AGE) {
      memoryCache.delete(id)
      removed++
    }
  }
  
  if (removed > 0) {
    console.info(`[YOUTUBE CACHE] Cleaned up ${removed} expired entries from memory`)
  }
}
