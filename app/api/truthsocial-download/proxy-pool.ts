/**
 * Simplified Proxy Manager for Ephemeral Proxies (Serverless-Compatible)
 * 
 * Strategy for Netlify/Serverless:
 * - Fetch a fresh datacenter proxy on each download request
 * - Free plan provides 20 proxies/month (20 downloads/month)
 * - Each proxy is valid for 30 minutes
 * - Simple and stateless - perfect for serverless functions
 */

interface ProxyInfo {
  id: string
  host: string
  port: number
  country?: string
  countryISO?: string
}

class ProxyManager {
  /**
   * Fetch a fresh proxy from Ephemeral Proxies API
   */
  async getProxy(rapidApiKey: string, rapidApiHost: string): Promise<ProxyInfo> {
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
    console.log('Raw API Response:', JSON.stringify(data, null, 2))

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
      countryISO: proxyData.countryISO || 'XX'
    }

    console.log(`✅ Got proxy: ${proxy.host}:${proxy.port} (${proxy.country})`)
    
    return proxy
  }
}

// Export a singleton instance
export const proxyManager = new ProxyManager()
