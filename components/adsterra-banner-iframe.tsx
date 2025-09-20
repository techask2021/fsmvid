"use client"

import { useEffect, useState } from "react"

interface AdsterraBannerProps {
  className?: string
}

export default function AdsterraBannerIframe({ className = "" }: AdsterraBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return

    // Set up the Adsterra configuration
    // @ts-ignore
    window.atOptions = {
      'key': 'ab85c7c930b997335c95bd33a760bfc6',
      'format': 'iframe',
      'height': 90,
      'width': 728,
      'params': {}
    };

    // Create iframe directly
    const bannerContainer = document.getElementById('adsterra-banner-iframe')
    if (bannerContainer) {
      const iframe = document.createElement('iframe')
      iframe.src = `https://www.highperformanceformat.com/ab85c7c930b997335c95bd33a760bfc6/invoke.html`
      iframe.width = '728'
      iframe.height = '90'
      iframe.frameBorder = '0'
      iframe.scrolling = 'no'
      iframe.style.border = 'none'
      iframe.style.borderRadius = '8px'
      
      iframe.onload = () => {
        console.log('Adsterra iframe loaded successfully')
        setIsLoaded(true)
      }
      
      iframe.onerror = (error) => {
        console.error('Failed to load Adsterra iframe:', error)
        setHasError(true)
      }
      
      bannerContainer.appendChild(iframe)
    }
  }, [])

  return (
    <div className={`w-full flex justify-center items-center my-6 ${className}`}>
      <div 
        id="adsterra-banner-iframe"
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
