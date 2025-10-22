'use client'

import { useEffect, useRef, useState } from 'react'

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

        // Check if adsbygoogle script is loaded
        if (typeof window === 'undefined' || !window.adsbygoogle) {
          // Retry after 100ms if script not loaded yet
          setTimeout(loadAd, 100)
          return
        }

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

    // Single load attempt after a short delay
    const timeoutId = setTimeout(loadAd, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div 
      className="w-full flex justify-center mt-1 mb-[23px]" 
      style={{ minHeight: '250px' }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '880px', height: '250px' }}
        data-ad-client="ca-pub-2918771713238080"
        data-ad-slot="2669514106"
        data-ad-format="auto"
        data-full-width-responsive="false"
      />
    </div>
  )
}

