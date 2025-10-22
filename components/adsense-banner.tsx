'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSenseBanner() {
  const adRef = useRef<HTMLModElement>(null)
  const [isAdLoaded, setIsAdLoaded] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 3

  useEffect(() => {
    const loadAd = () => {
      try {
        // Ensure the ad container exists
        if (!adRef.current) {
          console.warn('AdSense: Ad container not found')
          return
        }

        // Check if adsbygoogle script is loaded
        if (typeof window === 'undefined' || !window.adsbygoogle) {
          console.warn('AdSense: Script not loaded yet, retrying...')
          
          if (retryCount < maxRetries) {
            setTimeout(() => {
              setRetryCount(prev => prev + 1)
            }, 1000)
          }
          return
        }

        // Check if ad is already pushed (avoid duplicate pushes)
        if (isAdLoaded) {
          return
        }

        // Push ad to AdSense
        try {
          window.adsbygoogle = window.adsbygoogle || []
          window.adsbygoogle.push({})
          setIsAdLoaded(true)
          console.log('AdSense: Ad loaded successfully')
        } catch (pushError) {
          console.error('AdSense push error:', pushError)
          
          // Retry mechanism
          if (retryCount < maxRetries) {
            setTimeout(() => {
              setRetryCount(prev => prev + 1)
            }, 2000)
          }
        }
      } catch (err) {
        console.error('AdSense error:', err)
        
        // Retry mechanism
        if (retryCount < maxRetries) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1)
          }, 2000)
        }
      }
    }

    // Immediate load attempt
    loadAd()

    // Also try after a short delay to ensure script is loaded
    const timeoutId = setTimeout(loadAd, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [retryCount, isAdLoaded])

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

