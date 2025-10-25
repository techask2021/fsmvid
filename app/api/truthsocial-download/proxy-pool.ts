/**
 * Smart Proxy Pool Manager for Ephemeral Proxies (Truth Social Only)
 * 
 * Strategy:
 * 1. Fetch 20 proxies on startup (uses free limit once)
 * 2. Store them in memory with expiration times
 * 3. Auto-extend proxies every 25 minutes (before they expire)
 * 4. Rotate randomly between proxies for each download
 * 5. Result: Unlimited downloads all month with $0 cost!
 */

interface ProxyInfo {
  id: string
  host: string
  port: number
  expiresAt: Date
  country?: string
  countryISO?: string
}

class ProxyPool {
  private proxies: ProxyInfo[] = []
  private rapidApiKey: string = ''
  private rapidApiHost: string = ''
  private isInitialized: boolean = false
  private extendInterval: NodeJS.Timeout | null = null
  private initializationPromise: Promise<void> | null = null

  /**
   * Initialize the proxy pool by fetching 20 proxies
   */
  async initialize(rapidApiKey: string, rapidApiHost: string): Promise<void> {
    // If already initializing, wait for that to complete
    if (this.initializationPromise) {
      return this.initializationPromise
    }

    // If already initialized, skip
    if (this.isInitialized && this.proxies.length > 0) {
      console.log(`✅ Proxy pool already initialized with ${this.proxies.length} proxies`)
      return
    }

    this.rapidApiKey = rapidApiKey
    this.rapidApiHost = rapidApiHost

    this.initializationPromise = this._doInitialize()
    await this.initializationPromise
    this.initializationPromise = null
  }

  private async _doInitialize(): Promise<void> {
    console.log('🔄 Initializing proxy pool - fetching 20 proxies...')
    
    const fetchPromises: Promise<ProxyInfo | null>[] = []

    // Fetch 20 proxies in parallel
    for (let i = 0; i < 20; i++) {
      fetchPromises.push(this.fetchNewProxy(i + 1))
    }

    const results = await Promise.allSettled(fetchPromises)
    
    // Filter successful proxies
    this.proxies = results
      .filter((result): result is PromiseFulfilledResult<ProxyInfo | null> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value!)

    if (this.proxies.length === 0) {
      console.error('❌ Failed to fetch any proxies!')
      throw new Error('Failed to initialize proxy pool')
    }

    console.log(`✅ Proxy pool initialized with ${this.proxies.length} proxies`)
    this.logProxySummary()
    
    this.isInitialized = true

    // Start auto-extend background job (every 25 minutes)
    this.startAutoExtend()
  }

  /**
   * Fetch a single new proxy from the API
   */
  private async fetchNewProxy(index: number): Promise<ProxyInfo | null> {
    try {
      const response = await fetch(`https://${this.rapidApiHost}/v2/datacenter/proxy`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': this.rapidApiKey,
          'x-rapidapi-host': this.rapidApiHost,
        },
      })

      if (!response.ok) {
        console.error(`Failed to fetch proxy ${index}: ${response.status}`)
        return null
      }

      const data = await response.json() as any

      if (!data.success || !data.proxy) {
        console.error(`Invalid proxy response for ${index}`)
        return null
      }

      const proxy = data.proxy

      return {
        id: proxy.id,
        host: proxy.host,
        port: proxy.port,
        expiresAt: new Date(proxy.expires_at),
        country: proxy.visibility?.country,
        countryISO: proxy.visibility?.country_iso,
      }
    } catch (error) {
      console.error(`Error fetching proxy ${index}:`, error)
      return null
    }
  }

  /**
   * Extend the expiration time of a proxy by 30 minutes
   */
  private async extendProxy(proxy: ProxyInfo): Promise<boolean> {
    try {
      const response = await fetch(
        `https://${this.rapidApiHost}/v2/datacenter/proxy/${proxy.id}/extend`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': this.rapidApiKey,
            'x-rapidapi-host': this.rapidApiHost,
          },
        }
      )

      if (!response.ok) {
        console.error(`Failed to extend proxy ${proxy.id}: ${response.status}`)
        return false
      }

      const data = await response.json() as any

      if (data.success && data.proxy) {
        // Update expiration time
        proxy.expiresAt = new Date(data.proxy.expires_at)
        
        const minutesLeft = Math.round((proxy.expiresAt.getTime() - Date.now()) / 1000 / 60)
        console.log(`♻️  Extended proxy ${proxy.host}:${proxy.port} - Now valid for ${minutesLeft} min`)
        
        return true
      }

      return false
    } catch (error) {
      console.error(`Error extending proxy ${proxy.id}:`, error)
      return false
    }
  }

  /**
   * Start background job to auto-extend proxies every 25 minutes
   */
  private startAutoExtend(): void {
    // Clear existing interval if any
    if (this.extendInterval) {
      clearInterval(this.extendInterval)
    }

    // Run every 25 minutes (before 30-min expiration)
    this.extendInterval = setInterval(() => {
      this.extendAllProxies()
    }, 25 * 60 * 1000) // 25 minutes

    console.log('🔄 Auto-extend background job started (runs every 25 minutes)')
  }

  /**
   * Extend all proxies that are expiring soon
   */
  private async extendAllProxies(): Promise<void> {
    console.log(`\n🔄 Auto-extending ${this.proxies.length} proxies...`)
    
    const now = Date.now()
    const extendPromises: Promise<boolean>[] = []

    for (const proxy of this.proxies) {
      const minutesLeft = Math.round((proxy.expiresAt.getTime() - now) / 1000 / 60)
      
      // Extend if less than 10 minutes left (safety buffer)
      if (minutesLeft < 10) {
        console.log(`⚠️  Proxy ${proxy.host}:${proxy.port} expiring soon (${minutesLeft} min left)`)
        extendPromises.push(this.extendProxy(proxy))
      }
    }

    if (extendPromises.length > 0) {
      const results = await Promise.all(extendPromises)
      const successful = results.filter(r => r).length
      console.log(`✅ Extended ${successful}/${extendPromises.length} proxies`)
    } else {
      console.log('✅ All proxies still valid, no extension needed')
    }
  }

  /**
   * Get a random valid proxy from the pool
   */
  getRandomProxy(): ProxyInfo {
    if (!this.isInitialized || this.proxies.length === 0) {
      throw new Error('Proxy pool not initialized')
    }

    // Filter out expired proxies (shouldn't happen with auto-extend, but safety check)
    const validProxies = this.proxies.filter(p => p.expiresAt > new Date())

    if (validProxies.length === 0) {
      throw new Error('No valid proxies available')
    }

    // Return random proxy
    const randomIndex = Math.floor(Math.random() * validProxies.length)
    const proxy = validProxies[randomIndex]

    const minutesLeft = Math.round((proxy.expiresAt.getTime() - Date.now()) / 1000 / 60)
    console.log(`🎲 Selected random proxy: ${proxy.host}:${proxy.port} (${proxy.country}, ${minutesLeft} min left)`)

    return proxy
  }

  /**
   * Log summary of proxy pool status
   */
  private logProxySummary(): void {
    const countries = this.proxies.reduce((acc, p) => {
      const country = p.countryISO || 'Unknown'
      acc[country] = (acc[country] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    console.log('\n📊 Proxy Pool Summary:')
    console.log(`   Total proxies: ${this.proxies.length}`)
    console.log(`   Countries: ${Object.entries(countries).map(([c, count]) => `${c}(${count})`).join(', ')}`)
    
    const avgExpiry = this.proxies.reduce((sum, p) => 
      sum + (p.expiresAt.getTime() - Date.now()), 0
    ) / this.proxies.length / 1000 / 60
    console.log(`   Avg time left: ${Math.round(avgExpiry)} minutes\n`)
  }
}

// Singleton instance
const proxyPool = new ProxyPool()

export { proxyPool, type ProxyInfo }

