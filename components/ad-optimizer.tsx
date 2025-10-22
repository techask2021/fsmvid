'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

/**
 * AdOptimizer component ensures ads load properly by:
 * 1. Monitoring page visibility
 * 2. Re-initializing ads when page becomes visible
 * 3. Handling script load errors
 * 4. Ensuring ads render after client-side navigation
 */
export default function AdOptimizer() {
  useEffect(() => {
    // Function to check and initialize ads
    const initializeAds = () => {
      if (typeof window === 'undefined') return

      try {
        // Ensure adsbygoogle array exists
        window.adsbygoogle = window.adsbygoogle || []

        // Find all uninitialized ad slots
        const adSlots = document.querySelectorAll('ins.adsbygoogle')
        
        adSlots.forEach((adSlot) => {
          // Check if ad is not yet initialized (no data-adsbygoogle-status attribute)
          if (!adSlot.getAttribute('data-adsbygoogle-status')) {
            try {
              window.adsbygoogle.push({})
            } catch (e) {
              console.error('Failed to push ad:', e)
            }
          }
        })
      } catch (error) {
        console.error('Ad initialization error:', error)
      }
    }

    // Initialize ads when component mounts
    const mountTimeout = setTimeout(initializeAds, 300)

    // Re-initialize ads when page becomes visible (for users who switch tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setTimeout(initializeAds, 500)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Re-initialize ads on navigation (for SPAs)
    const handleRouteChange = () => {
      setTimeout(initializeAds, 1000)
    }

    window.addEventListener('popstate', handleRouteChange)

    // Cleanup
    return () => {
      clearTimeout(mountTimeout)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  return null
}

