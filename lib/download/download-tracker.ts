/**
 * Download Tracker for Homepage Download Limits
 * 
 * Strategy:
 * - Homepage: 3 free downloads, resets every 6 hours
 * - Platform pages: Unlimited downloads
 * - Storage: LocalStorage (primary) + Cookies (fallback)
 * - Friendly UX: Allow bypass with "Maybe Later"
 */

export interface DownloadRecord {
  count: number
  lastDownload: string // ISO date string
  lastReset: string // ISO date string
  platformCounts: Record<string, number> // Track per platform
  platformResetTimes: Record<string, string> // Track reset time per platform
  bypassedUntil?: string // ISO date string for "Maybe Later" bypass
}

const STORAGE_KEY = 'fsmvid_download_tracker'
const RESET_MINUTES = 60 // Reset every 60 minutes PER PLATFORM
const HOMEPAGE_LIMIT = 3 // 3 free downloads per platform on homepage

/**
 * Get download record from localStorage
 */
export function getDownloadRecord(): DownloadRecord {
  if (typeof window === 'undefined') {
    return createEmptyRecord()
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return createEmptyRecord()
    }

    const record = JSON.parse(stored) as DownloadRecord
    
    // Initialize new fields for backward compatibility
    if (!record.platformCounts) record.platformCounts = {}
    if (!record.platformResetTimes) record.platformResetTimes = {}

    return record
  } catch (error) {
    console.error('Error reading download record:', error)
    return createEmptyRecord()
  }
}

/**
 * Save download record to localStorage
 */
export function saveDownloadRecord(record: DownloadRecord): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch (error) {
    console.error('Error saving download record:', error)
  }
}

/**
 * Create empty download record
 */
function createEmptyRecord(): DownloadRecord {
  const now = new Date().toISOString()
  return {
    count: 0,
    lastDownload: now,
    lastReset: now,
    platformCounts: {},
    platformResetTimes: {},
  }
}

/**
 * Check if platform should be reset (20 minutes passed for specific platform)
 */
function shouldResetPlatform(record: DownloadRecord, platform: string): boolean {
  const platformResetTime = record.platformResetTimes?.[platform]
  if (!platformResetTime) return false
  
  const lastReset = new Date(platformResetTime)
  const now = new Date()
  const minutesPassed = (now.getTime() - lastReset.getTime()) / (1000 * 60)
  
  return minutesPassed >= RESET_MINUTES
}

/**
 * Track a download and return limit status (PER PLATFORM)
 * 
 * IMPORTANT: Only tracks on HOMEPAGE. Tool pages are completely ignored.
 */
export function trackDownload(platform: string, isHomepage: boolean): {
  allowed: boolean
  count: number
  limit: number
  shouldShowModal: boolean
  shouldShowHint: boolean
  remainingDownloads: number
  resetIn: string
  resetTimestamp: number // Unix timestamp when limit resets
  mostUsedPlatform: string
} {
  // Platform pages have NO limits - UNLIMITED
  // Do NOT track anything on tool pages
  if (!isHomepage) {
    return {
      allowed: true,
      count: 0,
      limit: Infinity,
      shouldShowModal: false,
      shouldShowHint: false,
      remainingDownloads: Infinity,
      resetIn: 'Never',
      resetTimestamp: 0,
      mostUsedPlatform: platform,
    }
  }

  // Only get record if we're on homepage
  const record = getDownloadRecord()
  
  // Initialize platform tracking if needed
  if (!record.platformCounts) record.platformCounts = {}
  if (!record.platformResetTimes) record.platformResetTimes = {}
  
  // Check if this platform should be reset (20 minutes passed)
  if (shouldResetPlatform(record, platform)) {
    record.platformCounts[platform] = 0
    delete record.platformResetTimes[platform]
    saveDownloadRecord(record)
  }
  
  // Check if user has bypassed with "Maybe Later" for this platform
  if (record.bypassedUntil) {
    const bypassUntil = new Date(record.bypassedUntil)
    if (new Date() < bypassUntil) {
      // Still in bypass period - allow download
      const platformCount = record.platformCounts[platform] || 0
      return {
        allowed: true,
        count: platformCount,
        limit: HOMEPAGE_LIMIT,
        shouldShowModal: false,
        shouldShowHint: false,
        remainingDownloads: Math.max(0, HOMEPAGE_LIMIT - platformCount),
        resetIn: getPlatformResetTime(record, platform),
        resetTimestamp: getPlatformResetTimestamp(record, platform),
        mostUsedPlatform: platform,
      }
    } else {
      // Bypass expired, remove it
      delete record.bypassedUntil
      saveDownloadRecord(record)
    }
  }

  // Get count for THIS platform only
  const platformCount = record.platformCounts[platform] || 0
  const allowed = platformCount < HOMEPAGE_LIMIT
  const shouldShowHint = platformCount === 1 // Show hint at download #2 for this platform
  const shouldShowModal = platformCount >= HOMEPAGE_LIMIT // Show modal at download #4 for this platform

  // Update record for this platform
  const newPlatformCount = platformCount + 1
  const platformCounts = { ...record.platformCounts }
  platformCounts[platform] = newPlatformCount
  
  // Set reset time for this platform if first download
  const platformResetTimes = { ...record.platformResetTimes }
  if (!platformResetTimes[platform]) {
    platformResetTimes[platform] = new Date().toISOString()
  }

  const updatedRecord: DownloadRecord = {
    ...record,
    count: record.count + 1, // Still track total for stats
    lastDownload: new Date().toISOString(),
    platformCounts,
    platformResetTimes,
  }

  saveDownloadRecord(updatedRecord)

  return {
    allowed,
    count: newPlatformCount,
    limit: HOMEPAGE_LIMIT,
    shouldShowModal,
    shouldShowHint,
    remainingDownloads: Math.max(0, HOMEPAGE_LIMIT - newPlatformCount),
    resetIn: getPlatformResetTime(updatedRecord, platform),
    resetTimestamp: getPlatformResetTimestamp(updatedRecord, platform),
    mostUsedPlatform: platform,
  }
}

/**
 * Set bypass period (when user clicks "Maybe Later")
 */
export function setBypass(hours: number = 1): void {
  const record = getDownloadRecord()
  const bypassUntil = new Date()
  bypassUntil.setHours(bypassUntil.getHours() + hours)
  
  record.bypassedUntil = bypassUntil.toISOString()
  saveDownloadRecord(record)
}

/**
 * Clear bypass (when user goes to platform page)
 */
export function clearBypass(): void {
  const record = getDownloadRecord()
  delete record.bypassedUntil
  saveDownloadRecord(record)
}

/**
 * Reset download counter manually
 */
export function resetDownloadCounter(): void {
  saveDownloadRecord(createEmptyRecord())
}

/**
 * Get time until reset for specific platform
 */
function getPlatformResetTime(record: DownloadRecord, platform: string): string {
  const platformResetTime = record.platformResetTimes?.[platform]
  if (!platformResetTime) return `${RESET_MINUTES} minutes`
  
  const lastReset = new Date(platformResetTime)
  const resetTime = new Date(lastReset.getTime() + RESET_MINUTES * 60 * 1000)
  const now = new Date()
  const diff = resetTime.getTime() - now.getTime()
  
  if (diff <= 0) return 'Now'
  
  const minutes = Math.floor(diff / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  }
  return `${seconds}s`
}

/**
 * Get reset timestamp (Unix timestamp in milliseconds)
 */
function getPlatformResetTimestamp(record: DownloadRecord, platform: string): number {
  const platformResetTime = record.platformResetTimes?.[platform]
  if (!platformResetTime) {
    // If no reset time, assume it starts now
    return Date.now() + RESET_MINUTES * 60 * 1000
  }
  
  const lastReset = new Date(platformResetTime)
  return lastReset.getTime() + RESET_MINUTES * 60 * 1000
}

/**
 * Get the most used platform
 */
function getMostUsedPlatform(record: DownloadRecord): string {
  const platforms = Object.entries(record.platformCounts)
  if (platforms.length === 0) return 'youtube'
  
  platforms.sort((a, b) => b[1] - a[1])
  return platforms[0][0]
}

/**
 * Get download stats (for analytics)
 */
export function getDownloadStats(): {
  totalDownloads: number
  platformBreakdown: Record<string, number>
  timeUntilReset: string
} {
  const record = getDownloadRecord()
  
  // Get the earliest reset time from all platforms
  let earliestReset = `${RESET_MINUTES} minutes`
  const platforms = Object.keys(record.platformResetTimes || {})
  if (platforms.length > 0) {
    earliestReset = getPlatformResetTime(record, platforms[0])
  }
  
  return {
    totalDownloads: record.count,
    platformBreakdown: record.platformCounts || {},
    timeUntilReset: earliestReset,
  }
}

