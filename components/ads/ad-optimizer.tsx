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
            // Ensure the ad container has dimensions before initializing
            const container = adSlot.parentElement
            const containerWidth = container?.offsetWidth || 0
            const containerHeight = container?.offsetHeight || 0
            
            // Only initialize if container has proper dimensions
            if (containerWidth > 0 && containerHeight > 0) {
              try {
                window.adsbygoogle.push({})
              } catch (e) {
                // Silently handle errors - ads may fail to load for various reasons
                if (process.env.NODE_ENV === 'development') {
                  console.error('Failed to push ad:', e)
                }
              }
            }
          }
        })
      } catch (error) {
        // Silently handle errors in production
        if (process.env.NODE_ENV === 'development') {
          console.error('Ad initialization error:', error)
        }
      }
    }

    // Initialize ads when component mounts (longer delay to ensure layout is complete)
    const mountTimeout = setTimeout(initializeAds, 800)

    // Re-initialize ads when page becomes visible (for users who switch tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setTimeout(initializeAds, 1000)
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

