'use client'

import { useEffect, useState } from 'react'

export default function AdBlockerDetector() {
  const [isAdBlockDetected, setIsAdBlockDetected] = useState(false)

  useEffect(() => {
    const detectAdBlocker = async () => {
      try {
        // Method 1: Check if adsbygoogle is blocked
        const checkAdScript = () => {
          return new Promise((resolve) => {
            const testAd = document.createElement('div')
            testAd.innerHTML = '&nbsp;'
            testAd.className = 'adsbox'
            testAd.style.position = 'absolute'
            testAd.style.left = '-10000px'
            document.body.appendChild(testAd)
            
            setTimeout(() => {
              const isBlocked = testAd.offsetHeight === 0
              document.body.removeChild(testAd)
              resolve(isBlocked)
            }, 100)
          })
        }

        // Method 2: Check if AdSense script loaded
        const checkAdSenseLoaded = () => {
          return typeof window !== 'undefined' && window.adsbygoogle !== undefined
        }

        // Method 3: Try to fetch ad script
        const checkAdFetch = async () => {
          try {
            const response = await fetch(
              'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
              { method: 'HEAD', mode: 'no-cors' }
            )
            return true
          } catch (error) {
            return false
          }
        }

        // Run all checks
        const [adScriptBlocked] = await Promise.all([
          checkAdScript(),
        ])

        const adSenseLoaded = checkAdSenseLoaded()

        if (adScriptBlocked || !adSenseLoaded) {
          setIsAdBlockDetected(true)
          console.warn('Ad blocker detected or ads failed to load')
          
          // Try to re-initialize ads
          setTimeout(() => {
            if (typeof window !== 'undefined' && window.adsbygoogle) {
              try {
                window.adsbygoogle.forEach((ad) => {
                  if (ad && !ad.loaded) {
                    window.adsbygoogle.push(ad)
                  }
                })
              } catch (e) {
                console.error('Failed to re-initialize ads:', e)
              }
            }
          }, 2000)
        } else {
          setIsAdBlockDetected(false)
          console.log('Ads loaded successfully - no blocker detected')
        }
      } catch (error) {
        console.error('Ad blocker detection error:', error)
      }
    }

    // Run detection after page loads
    const timeoutId = setTimeout(detectAdBlocker, 2000)

    return () => clearTimeout(timeoutId)
  }, [])

  // This component doesn't render anything visible
  return null
}

