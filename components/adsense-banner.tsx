'use client'

import { useEffect } from 'react'

export default function AdSenseBanner() {
  useEffect(() => {
    try {
      // Push ad on component mount
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <div className="w-full flex justify-center mt-1 mb-3">
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: '880px', height: '250px' }}
        data-ad-client="ca-pub-2918771713238080"
        data-ad-slot="2669514106"
      />
    </div>
  )
}

