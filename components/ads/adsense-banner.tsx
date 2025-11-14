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
  const [isMounted, setIsMounted] = useState(false)

  // Only render on client to prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Don't initialize until component is mounted on client
    if (!isMounted) return
    
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
        const container = adRef.current.parentElement
        const containerWidth = container?.offsetWidth || 0
        const containerHeight = container?.offsetHeight || 0
        
        // Check if container is actually visible and has dimensions
        if (containerWidth === 0 || containerHeight === 0) {
          // Retry if container doesn't have dimensions yet
          setTimeout(loadAd, 200)
          return
        }

        // Check if adsbygoogle script is loaded
        if (typeof window === 'undefined' || !window.adsbygoogle) {
          // Retry after 200ms if script not loaded yet
          setTimeout(loadAd, 200)
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

    // Delay to ensure DOM is fully laid out and container has dimensions
    const timeoutId = setTimeout(loadAd, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isMounted])

  // Don't render on server to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="w-full mt-1 mb-4" style={{ minHeight: '100px' }}>
        {/* Placeholder to prevent layout shift */}
      </div>
    )
  }

  return (
    <div className="w-full mt-1 mb-4">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '100px' }}
        data-ad-client="ca-pub-2918771713238080"
        data-ad-slot="2669514106"
        data-ad-format="auto"
      />
    </div>
  )
}

