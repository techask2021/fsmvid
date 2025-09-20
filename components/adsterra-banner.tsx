"use client"

import { useEffect, useState } from "react"

interface AdsterraBannerProps {
  className?: string
}

export default function AdsterraBanner({ className = "" }: AdsterraBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return

    // Check if script already exists
    if (document.querySelector('script[src*="highperformanceformat.com"]')) {
      setIsLoaded(true)
      return
    }

    // Set up the Adsterra configuration
    const setupAdsterra = () => {
      // @ts-ignore
      window.atOptions = {
        'key': 'ab85c7c930b997335c95bd33a760bfc6',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };

      // Create the script element
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://www.highperformanceformat.com/ab85c7c930b997335c95bd33a760bfc6/invoke.js'
      script.async = true
      
      script.onload = () => {
        console.log('Adsterra script loaded successfully')
        setIsLoaded(true)
      }
      
      script.onerror = (error) => {
        console.error('Failed to load Adsterra script:', error)
        setHasError(true)
      }
      
      // Append to the banner container instead of head
      const bannerContainer = document.getElementById('adsterra-banner')
      if (bannerContainer) {
        bannerContainer.appendChild(script)
      } else {
        document.head.appendChild(script)
      }

      return script
    }

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const script = setupAdsterra()
      
      // Cleanup function
      return () => {
        if (script && script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className={`w-full flex justify-center items-center my-6 ${className}`}>
      <div 
        id="adsterra-banner"
        className="w-full max-w-[728px] h-[90px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        style={{ minHeight: '90px' }}
      >
        {hasError ? (
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Ad unavailable
          </div>
        ) : !isLoaded ? (
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Loading ad...
          </div>
        ) : null}
      </div>
    </div>
  )
}
