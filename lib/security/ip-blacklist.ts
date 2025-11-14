/**
 * IP Blacklist System
 * 
 * Purpose: Block known bot IPs and auto-add suspicious IPs
 * - Permanent blocks for confirmed bots
 * - Auto-blacklist IPs that hit abuse thresholds
 * - Manual whitelist for legitimate high-volume users
 */

// Known bot IPs from logs (confirmed abusers)
const PERMANENT_BLACKLIST = new Set([
  '45.252.182.69',   // Bot - 200+ Instagram requests
  '51.38.122.150',   // Heavy abuse - 190+ requests
  '176.9.243.166',   // Previous abuser
  '49.149.69.114',   // Bot - Missing Accept-Language and Sec-Fetch-Site headers
  '2a06:98c0:3600::103', // Bot (IPv6) - Missing Accept-Language and Sec-Fetch-Site headers
])

// Temporarily blacklisted IPs (auto-added, expires after 24 hours)
interface TempBlacklistEntry {
  ip: string
  timestamp: number
  reason: string
}

const tempBlacklist = new Map<string, TempBlacklistEntry>()

// Whitelisted IPs (legitimate high-volume users)
const WHITELIST = new Set<string>([
  // Add legitimate IPs here if needed
  // Example: '123.456.789.0'
])

/**
 * Check if IP is blacklisted
 */
export function isBlacklisted(ip: string): boolean {
  // Whitelist takes priority
  if (WHITELIST.has(ip)) {
    return false
  }

  // Check permanent blacklist
  if (PERMANENT_BLACKLIST.has(ip)) {
    console.info(`[BLACKLIST] Blocked permanent blacklisted IP: ${ip}`)
    return true
  }

  // Check temporary blacklist
  const tempEntry = tempBlacklist.get(ip)
  if (tempEntry) {
    // Check if still valid (24 hours)
    const now = Date.now()
    const age = now - tempEntry.timestamp
    const twentyFourHours = 24 * 60 * 60 * 1000

    if (age < twentyFourHours) {
      console.info(`[BLACKLIST] Blocked temp blacklisted IP: ${ip} (Reason: ${tempEntry.reason})`)
      return true
    } else {
      // Expired, remove from temp blacklist
      tempBlacklist.delete(ip)
    }
  }

  return false
}

/**
 * Add IP to temporary blacklist (24 hour ban)
 */
export function addToTempBlacklist(ip: string, reason: string): void {
  tempBlacklist.set(ip, {
    ip,
    timestamp: Date.now(),
    reason,
  })
  console.warn(`[BLACKLIST] Added IP to temp blacklist: ${ip} - Reason: ${reason}`)
}

/**
 * Add IP to permanent blacklist (requires manual intervention)
 */
export function addToPermanentBlacklist(ip: string): void {
  PERMANENT_BLACKLIST.add(ip)
  console.warn(`[BLACKLIST] Added IP to PERMANENT blacklist: ${ip}`)
}

/**
 * Remove IP from blacklist (for false positives)
 */
export function removeFromBlacklist(ip: string): void {
  PERMANENT_BLACKLIST.delete(ip)
  tempBlacklist.delete(ip)
  console.info(`[BLACKLIST] Removed IP from blacklist: ${ip}`)
}

/**
 * Add IP to whitelist (for legitimate high-volume users)
 */
export function addToWhitelist(ip: string): void {
  WHITELIST.add(ip)
  console.info(`[WHITELIST] Added IP to whitelist: ${ip}`)
}

/**
 * Get blacklist statistics
 */
export function getBlacklistStats(): {
  permanent: number
  temporary: number
  whitelist: number
} {
  return {
    permanent: PERMANENT_BLACKLIST.size,
    temporary: tempBlacklist.size,
    whitelist: WHITELIST.size,
  }
}

