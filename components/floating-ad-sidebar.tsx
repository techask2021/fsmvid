'use client'

import React, { useState, useEffect } from 'react'
import { X, ChevronDown, ChevronUp, Eye } from 'lucide-react'

interface Ad {
  id: string
  name: string
  content: React.ReactNode
  hook: string
}

export default function FloatingAdSidebar() {
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentAdIndex, setCurrentAdIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const ads: Ad[] = [
    {
      id: 'redotpay',
      name: 'RedotPay',
      hook: '💰 Get $5 FREE - Spend Crypto Like Cash!',
      content: (
        <a 
          href="https://wap.redotpay.com/en/invite/?referralId=it60y&fbclid=IwY2xjawM-TJNleHRuA2FlbQIxMABicmlkETF4T0NJMHA1ZG9FdTF6M3hoAR5gF66vUHSOYDjWm3va7NDieD-sXhcSSj5layq4R9msU-pfYboJwX6pMxbtwQ_aem_rQ-RUntd4rM92eScO4HsUw"
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:opacity-90 transition-opacity duration-200"
        >
          <img 
            src="/redotpay.jpg" 
            alt="RedotPay - Spend Crypto Like Fiat" 
            title="RedotPay - Get 5 USD For New Registrations"
            width="300" 
            height="250"
            className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 object-cover"
          />
        </a>
      )
    }
  ]

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Rotate ads every 10 seconds
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length)
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [isVisible, ads.length])

  // Hide sidebar if no ads
  if (ads.length === 0) return null

  if (!isVisible) return null

  const currentAd = ads[currentAdIndex]

  // Mobile minimized version
  if (isMobile && !isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 left-4 z-50">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-2xl border border-blue-500 overflow-hidden">
          {/* Minimized header with hook */}
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm leading-tight">
                  {currentAd.hook}
                </p>
                <p className="text-blue-100 text-xs">
                  Tap to see exclusive offer
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(true)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
                aria-label="Expand ad"
              >
                <Eye className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                aria-label="Close ad"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Desktop version or mobile expanded version
  return (
    <div className={`fixed ${isMobile ? 'bottom-4 right-4 left-4' : 'top-1/2 right-4 transform -translate-y-1/2'} z-50 ${isMobile ? 'w-auto' : 'w-80 max-w-sm'}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              {currentAd.name}
            </span>
            {isMobile && (
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
                aria-label="Minimize ad"
              >
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            )}
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
            aria-label="Close ad"
          >
            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Ad content */}
        <div className="p-3">
          {currentAd.content}
        </div>

        {/* Ad indicators */}
        {ads.length > 1 && (
          <div className="flex justify-center space-x-1 p-2 bg-gray-50 dark:bg-gray-700">
            {ads.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAdIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentAdIndex
                    ? 'bg-blue-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to ad ${index + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
