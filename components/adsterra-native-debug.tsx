"use client"

import { useEffect, useState } from "react"

interface AdsterraNativeDebugProps {
  className?: string
  id?: string
}

export default function AdsterraNativeDebug({ 
  className = "", 
  id = "adsterra-native-debug" 
}: AdsterraNativeDebugProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [debugInfo, setDebugInfo] = useState("")

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return

    setDebugInfo("Initializing...")

    // Check if script already exists
    if (document.querySelector('script[src*="revenuecpmgate.com"]')) {
      setDebugInfo("Script already loaded")
      setIsLoaded(true)
      return
    }

    setDebugInfo("Setting up Adsterra...")

    // Set up the Adsterra configuration
    // @ts-ignore
    window.atOptions = {
      'key': 'ab85c7c930b997335c95bd33a760bfc6',
      'format': 'iframe',
      'height': 200,
      'width': 728,
      'params': {}
    };

    setDebugInfo("Configuration set, loading script...")

    // Load the script exactly as provided
    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-cfasync', 'false')
    script.src = '//pl27688086.revenuecpmgate.com/9dc186f2a04a80ed5e486bee5936c041/invoke.js'
    
    script.onload = () => {
      console.log('Adsterra native script loaded successfully')
      setDebugInfo("Script loaded successfully")
      setIsLoaded(true)
    }
    
    script.onerror = (error) => {
      console.error('Failed to load Adsterra native script:', error)
      setDebugInfo("Script failed to load")
      setHasError(true)
    }
    
    document.head.appendChild(script)
    setDebugInfo("Script added to head")

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <div className={`w-full ${className}`}>
      <div 
        id={id}
        className="w-full max-w-6xl mx-auto px-4 border-2 border-dashed border-blue-300 rounded-lg p-4"
        style={{ minHeight: '200px' }}
      >
        <div className="text-center mb-4">
          <div className="text-sm text-gray-600 mb-2">Debug Info: {debugInfo}</div>
          <div className="text-xs text-gray-500">ID: {id}</div>
          {hasError && <div className="text-red-500 text-sm">❌ Error occurred</div>}
          {isLoaded && <div className="text-green-500 text-sm">✅ Script loaded</div>}
        </div>
        
        {/* This is the exact container div that Adsterra expects */}
        <div 
          id="container-9dc186f2a04a80ed5e486bee5936c041" 
          style={{ 
            width: '100%', 
            height: '200px',
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5'
          }}
        >
          <div className="text-gray-500 text-sm">Ad container - {isLoaded ? 'Ready' : 'Loading...'}</div>
        </div>
      </div>
    </div>
  )
}
