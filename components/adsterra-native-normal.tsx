"use client"

import { useEffect, useState } from "react"

interface AdsterraNativeNormalProps {
  className?: string
  id?: string
}

export default function AdsterraNativeNormal({ 
  className = "", 
  id = "adsterra-native-normal" 
}: AdsterraNativeNormalProps) {
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

    // Add CSS to remove bottom margin from Adsterra container
    const style = document.createElement('style')
    style.textContent = `
      #container-9dc186f2a04a80ed5e486bee5936c041 {
        margin-bottom: 0 !important;
      }
    `
    document.head.appendChild(style)

    // Load the script exactly as provided
    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-cfasync', 'false')
    script.src = '//pl27688086.revenuecpmgate.com/9dc186f2a04a80ed5e486bee5936c041/invoke.js'
    
    script.onload = () => {
      setIsLoaded(true)
    }
    
    script.onerror = (error) => {
      setHasError(true)
    }
    
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }
    }
  }, [])

  return (
    <div className={`w-full ${className}`}>
      <div 
        id={id}
        className="w-full max-w-6xl mx-auto px-4"
        style={{ minHeight: '200px' }}
      >
        {/* This is the exact container div that Adsterra expects */}
        <div id="container-9dc186f2a04a80ed5e486bee5936c041"></div>
      </div>
    </div>
  )
}
