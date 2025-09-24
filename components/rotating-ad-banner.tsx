'use client'

import React, { useState, useEffect } from 'react'
import MediaMisterAd from './media-mister-ad'

export default function RotatingAdBanner() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0)

  const ads = [
    {
      id: 'fiverr',
      name: 'Fiverr',
      component: (
        <div className="w-full flex justify-center my-8">
          <div className="w-full max-w-5xl">
            <a 
              href="https://go.fiverr.com/visit/?bta=653537&nci=16971" 
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-90 transition-opacity duration-200"
            >
              <img 
                src="https://fiverr.ck-cdn.com/tn/serve/?cid=42910224" 
                alt="Fiverr - Find the right freelance service for your business" 
                title="Fiverr - Freelance Services"
                width="728" 
                height="90"
                className="w-full h-auto max-w-full rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              />
            </a>
          </div>
        </div>
      )
    },
    {
      id: 'mediamister',
      name: 'MediaMister',
      component: <MediaMisterAd />
    },
    {
      id: 'nordvpn',
      name: 'NordVPN',
      component: (
        <div className="w-full flex justify-center my-8">
          <div className="w-full max-w-5xl">
            <a 
              href="https://go.nordvpn.net/aff_c?offer_id=15&aff_id=130825&file_id=162"
              target="_blank" 
              rel="noopener noreferrer"
              className="block hover:opacity-90 transition-opacity duration-200"
            >
              <img 
                src="https://media.go2speed.org/brand/files/nordvpn/15/NordVPN_728x90_1.gif" 
                alt="NordVPN - Secure VPN Service" 
                title="NordVPN - Get 3 months free"
                width="728" 
                height="90"
                className="w-full h-auto max-w-full rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              />
            </a>
            {/* Hidden tracking pixel */}
            <img 
              src="https://go.nordvpn.net/aff_i?offer_id=15&file_id=162&aff_id=130825" 
              width="0" 
              height="0" 
              style={{ position: 'absolute', visibility: 'hidden' }} 
              alt=""
            />
          </div>
        </div>
      )
    }
  ]

  // Rotate ads every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length)
    }, 20000) // 20 seconds

    return () => clearInterval(interval)
  }, [ads.length])

  const currentAd = ads[currentAdIndex]

  return (
    <div className="relative">
      {/* Ad content with fade transition */}
      <div 
        key={currentAd.id}
        className="animate-fade-in"
        style={{
          animation: 'fadeIn 0.5s ease-in-out'
        }}
      >
        {currentAd.component}
      </div>


      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
