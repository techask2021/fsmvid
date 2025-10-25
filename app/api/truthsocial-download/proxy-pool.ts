/**
 * Smart Proxy Manager for Ephemeral Proxies (Serverless-Compatible)
 * 
 * Strategy:
 * - Cache proxy for 25 minutes (proxies last 30 minutes, gives 5min buffer)
 * - Reuse same proxy across multiple requests to avoid rate limits
 * - Free plan: 2 requests/second, 20 proxies/month
 * - This allows many downloads with minimal API calls
 */

interface ProxyInfo {
  id: string
  host: string
  port: number
  country?: string
  countryISO?: string
  expiresAt: number
}

// Global cache (persists across requests in same instance)
let cachedProxy: ProxyInfo | null = null

class ProxyManager {
  /**
   * Get a proxy (cached or fresh)
   */
  async getProxy(rapidApiKey: string, rapidApiHost: string): Promise<ProxyInfo> {
    // Check if cached proxy is still valid (expires in 25 minutes)
    const now = Date.now()
    if (cachedProxy && cachedProxy.expiresAt > now) {
      console.log(`♻️ Using cached proxy: ${cachedProxy.host}:${cachedProxy.port} (expires in ${Math.round((cachedProxy.expiresAt - now) / 60000)}min)`)
      return cachedProxy
    }

    console.log('🔄 Fetching fresh proxy from Ephemeral Proxies API...')
    
    const response = await fetch('https://ephemeral-proxies.p.rapidapi.com/v2/datacenter/proxy', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': rapidApiHost
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Ephemeral Proxies API error: ${response.status} - ${errorText}`)
      throw new Error(`Failed to fetch proxy: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Extract proxy from nested response structure
    const proxyData = data.proxy || data
    
    if (!proxyData.host || !proxyData.port) {
      console.error('Invalid proxy response structure:', data)
      throw new Error('Invalid proxy data received from API')
    }

    const proxy: ProxyInfo = {
      id: proxyData.id || 'unknown',
      host: proxyData.host,
      port: proxyData.port,
      country: proxyData.country || 'Unknown',
      countryISO: proxyData.countryISO || 'XX',
      expiresAt: now + (25 * 60 * 1000) // Cache for 25 minutes
    }

    // Cache the proxy
    cachedProxy = proxy

    console.log(`✅ Got fresh proxy: ${proxy.host}:${proxy.port} (${proxy.country}) - cached for 25min`)
    
    return proxy
  }

  /**
   * Clear cached proxy (force fresh fetch on next request)
   */
  clearCache() {
    cachedProxy = null
    console.log('🗑️ Proxy cache cleared')
  }
}

// Export a singleton instance
export const proxyManager = new ProxyManager()
