"use client"

import { useEffect, useState } from "react"

interface AdsterraNativeBannerProps {
  className?: string
  id?: string
}

export default function AdsterraNativeBanner({ 
  className = "", 
  id = "adsterra-native-banner" 
}: AdsterraNativeBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return

    // Check if script already exists
    if (document.querySelector('script[src*="revenuecpmgate.com"]')) {
      setIsLoaded(true)
      return
    }

    // Set up the container first
    const container = document.getElementById(id)
    if (!container) {
      console.error(`Container with id "${id}" not found`)
      setHasError(true)
      return
    }

    // Create the container div that Adsterra expects
    const adContainer = document.createElement('div')
    adContainer.id = 'container-9dc186f2a04a80ed5e486bee5936c041'
    container.appendChild(adContainer)

    // Load Adsterra Native script
    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-cfasync', 'false')
    script.src = '//pl27688086.revenuecpmgate.com/9dc186f2a04a80ed5e486bee5936c041/invoke.js'
    
    script.onload = () => {
      console.log('Adsterra Native script loaded successfully')
      setIsLoaded(true)
    }
    
    script.onerror = (error) => {
      console.error('Failed to load Adsterra Native script:', error)
      setHasError(true)
    }
    
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      if (adContainer.parentNode) {
        adContainer.parentNode.removeChild(adContainer)
      }
    }
  }, [id])

  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      <div 
        id={id}
        className="w-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        style={{ minHeight: '250px' }}
      >
        {hasError ? (
          <div className="text-gray-500 dark:text-gray-400 text-sm text-center p-4">
            Ad unavailable
          </div>
        ) : !isLoaded ? (
          <div className="text-gray-500 dark:text-gray-400 text-sm text-center p-4">
            Loading ad...
          </div>
        ) : null}
      </div>
    </div>
  )
}
