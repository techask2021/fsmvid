import { useState, useCallback } from 'react'
import { 
  trackDownload, 
  setBypass, 
  clearBypass,
  getDownloadStats,
  resetDownloadCounter 
} from '@/lib/download/download-tracker'

export interface DownloadLimitState {
  allowed: boolean
  count: number
  limit: number
  shouldShowModal: boolean
  shouldShowHint: boolean
  remainingDownloads: number
  resetIn: string
  resetTimestamp: number
  mostUsedPlatform: string
}

/**
 * Hook to manage download limits on homepage
 * 
 * Usage:
 * ```tsx
 * const { checkLimit, handleBypass, handleProceed } = useDownloadLimit()
 * 
 * const status = checkLimit(platform, isHomepage)
 * if (status.shouldShowModal) {
 *   // Show modal
 * }
 * ```
 */
export function useDownloadLimit() {
  const [limitState, setLimitState] = useState<DownloadLimitState | null>(null)

  /**
   * Check if download is allowed and track it
   */
  const checkLimit = useCallback((platform: string, isHomepage: boolean): DownloadLimitState => {
    const status = trackDownload(platform, isHomepage)
    setLimitState(status)
    return status
  }, [])

  /**
   * Handle "Maybe Later" button click
   * Allows 1 more hour of downloads
   */
  const handleBypass = useCallback(() => {
    setBypass(1) // Bypass for 1 hour
    setLimitState(null) // Close modal
  }, [])

  /**
   * Handle "Go to Platform Page" button click
   * Clears limits and redirects
   */
  const handleProceed = useCallback((platform: string) => {
    clearBypass()
    setLimitState(null)
    
    // Return platform URL
    return getPlatformUrl(platform)
  }, [])

  /**
   * Get current stats (for display)
   */
  const getStats = useCallback(() => {
    return getDownloadStats()
  }, [])

  /**
   * Reset counter (for testing)
   */
  const resetCounter = useCallback(() => {
    resetDownloadCounter()
    setLimitState(null)
  }, [])

  return {
    limitState,
    checkLimit,
    handleBypass,
    handleProceed,
    getStats,
    resetCounter,
  }
}

/**
 * Get platform page URL - must match actual routes in app/
 */
function getPlatformUrl(platform: string): string {
  const platformUrls: Record<string, string> = {
    youtube: '/youtube-video-saver',
    tiktok: '/tiktok-video-saver',
    instagram: '/instagram-media-saver',
    facebook: '/facebook-media-grabber',
    twitter: '/twitter-video-saver',
    reddit: '/reddit-video-saver',
    dailymotion: '/dailymotion-video-saver',
    snapchat: '/snapchat-story-saver',
    pinterest: '/pinterest-media-saver',
    tumblr: '/tumblr-content-saver',
    linkedin: '/linkedin-content-saver',
    threads: '/threads-video-saver',
    soundcloud: '/soundcloud-mp3-saver',
    spotify: '/spotify-mp3-saver',
    mixcloud: '/mixcloud-mp3-saver',
    rumble: '/rumble-video-grabber',
    bluesky: '/bluesky-video-saver',
    bsky: '/bluesky-video-saver',
    telegram: '/telegram-media-saver',
    imgur: '/imgur-media-saver',
    weibo: '/weibo-video-saver',
    douyin: '/douyin-video-saver',
    kuaishou: '/kuaishou-video-saver',
    bilibili: '/bilibili-video-saver',
    '9gag': '/9gag-video-saver',
    imdb: '/imdb-video-saver',
    espn: '/espn-video-saver',
    ted: '/ted-video-saver',
    capcut: '/capcut-video-saver',
    febspot: '/febspot-video-saver',
    ifunny: '/ifunny-video-saver',
    bitchute: '/bitchute-video-saver',
    xiaohongshu: '/xiaohongshu-video-saver',
    castbox: '/castbox-podcast-saver',
    deezer: '/deezer-music-saver',
    zingmp3: '/zingmp3-saver',
  }

  return platformUrls[platform.toLowerCase()] || '/'
}

