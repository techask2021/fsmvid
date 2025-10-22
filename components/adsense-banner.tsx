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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      className="w-full flex justify-center mt-1 mb-4" 
      style={{ minHeight: '250px' }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ 
          display: 'inline-block', 
          width: isMobile ? '300px' : '880px', 
          height: '250px' 
        }}
        data-ad-client="ca-pub-2918771713238080"
        data-ad-slot={isMobile ? "9471969443" : "2669514106"}
      />
    </div>
  )
}

