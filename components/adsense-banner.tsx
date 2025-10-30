'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSenseBanner() {
  const adRef = useRef<HTMLModElement>(null)
  const hasInitialized = useRef(false)

  useEffect(() => {
    // Prevent double initialization in React Strict Mode
    if (hasInitialized.current) return
    
    const loadAd = () => {
      try {
        // Ensure the ad container exists
        if (!adRef.current) {
          return
        }

        // Check if ad already has status (already initialized)
        if (adRef.current.getAttribute('data-adsbygoogle-status')) {
          return
        }

        // Ensure the container has proper width before initializing
        const containerWidth = adRef.current.parentElement?.offsetWidth || 0
        if (containerWidth === 0) {
          // Retry if container doesn't have width yet
          setTimeout(loadAd, 100)
          return
        }

        // Check if adsbygoogle script is loaded
        if (typeof window === 'undefined' || !window.adsbygoogle) {
          // Retry after 100ms if script not loaded yet
          setTimeout(loadAd, 100)
          return
        }

        // Skip if page hasn't enabled ads (no script present when not human)
        const hasAdsScript = !!document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')
        if (!hasAdsScript) return

        // Mark as initialized
        hasInitialized.current = true

        // Push ad to AdSense
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
        
      } catch (err) {
        // Silently handle errors in production
        if (process.env.NODE_ENV === 'development') {
          console.error('AdSense error:', err)
        }
      }
    }

    // Longer delay to ensure DOM is fully laid out
    const timeoutId = setTimeout(loadAd, 300)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="w-full mt-1 mb-4">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2918771713238080"
        data-ad-slot="2669514106"
        data-ad-format="auto"
      />
    </div>
  )
}

