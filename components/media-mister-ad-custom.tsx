'use client'

import React, { useState } from 'react'

export default function MediaMisterAdCustom() {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="w-full flex justify-center my-8">
      <div className="w-full max-w-5xl">
        <a 
          href="https://www.mediamister.com/#a_aid=68cf059493c35&a_bid=ffc2864d" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:opacity-90 transition-opacity duration-200"
        >
          {!imageError ? (
            // Try to load the original Media Mister banner
            <img 
              src="https://affiliates.mediamister.com/accounts/default1/7hwb5fwx/ffc2864d.jpg" 
              alt="Media Mister - Buy Followers, Likes, Subscribers & Views" 
              title="Media Mister - Social Media Services"
              width="728" 
              height="130"
              className="w-full h-auto max-w-full rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            // Fallback custom banner with full width and 130px height
            <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-200 rounded-lg p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden" style={{ height: '130px' }}>
              {/* Background texture pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
              </div>
              
              <div className="relative flex items-center justify-between h-full">
                {/* Left side - Social media promotion with megaphone */}
                <div className="flex items-center space-x-10">
                  {/* Megaphone and social icons */}
                  <div className="relative">
                    {/* Megaphone */}
                    <div className="w-28 h-28 bg-gradient-to-br from-blue-400 to-pink-500 rounded-t-full transform rotate-12 relative">
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">🎯</span>
                      </div>
                      {/* Person on megaphone */}
                      <div className="absolute -top-1 -left-1 w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
                        <span className="text-yellow-800 text-sm">💡</span>
                      </div>
                      {/* Person next to megaphone */}
                      <div className="absolute -bottom-1 -right-2 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">📄</span>
                      </div>
                    </div>
                    
                    {/* Laptop behind megaphone */}
                    <div className="absolute -bottom-2 -left-2 w-10 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
                      <span className="text-white text-sm">💻</span>
                    </div>
                    
                    {/* Gears and elements */}
                    <div className="absolute -top-3 -right-3 w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">⚙️</span>
                    </div>
                  </div>
                  
                  {/* Main text */}
                  <div className="text-gray-800">
                    <div className="font-bold text-3xl leading-tight">
                      BUY FOLLOWERS, LIKES,<br />
                      SUBSCRIBERS & VIEWS
                    </div>
                  </div>
                </div>
                
                {/* Center divider */}
                <div className="w-px h-20 bg-gray-300 transform rotate-12"></div>
                
                {/* Center - Media Mister Logo */}
                <div className="flex items-center space-x-6">
                  {/* Stylized M logo */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center relative">
                      <span className="text-white font-bold text-4xl">M</span>
                      {/* Small dot on M */}
                      <div className="absolute -left-1 top-4 w-4 h-4 bg-blue-300 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-gray-800">
                    <div className="font-bold text-3xl">Media Mister</div>
                  </div>
                </div>
                
                {/* Right side - Person with laptop and books */}
                <div className="flex items-center space-x-6">
                  {/* Person with laptop */}
                  <div className="relative">
                    {/* Stack of books */}
                    <div className="flex space-x-1">
                      <div className="w-5 h-16 bg-red-400 rounded-sm"></div>
                      <div className="w-5 h-16 bg-green-400 rounded-sm"></div>
                      <div className="w-5 h-16 bg-blue-400 rounded-sm"></div>
                      <div className="w-5 h-16 bg-yellow-400 rounded-sm"></div>
                    </div>
                    
                    {/* Person sitting */}
                    <div className="absolute -top-10 left-4 w-12 h-12 bg-gradient-to-br from-green-300 to-teal-400 rounded-full flex items-center justify-center">
                      <span className="text-green-800 text-xl">👩</span>
                    </div>
                    
                    {/* Laptop */}
                    <div className="absolute -top-8 -right-2 w-14 h-10 bg-gray-800 rounded-sm flex items-center justify-center">
                      <span className="text-white text-base">💻</span>
                    </div>
                    
                    {/* Dollar coin */}
                    <div className="absolute -bottom-2 -right-1 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-yellow-800 text-base font-bold">$</span>
                    </div>
                  </div>
                  
                  <div className="text-gray-600 text-lg">
                    <div className="font-semibold">Social Media</div>
                    <div>Services</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </a>
        
        {/* Hidden tracking pixel */}
        <img 
          className="border-0 hidden" 
          src="https://affiliates.mediamister.com/scripts/7hwi5fwx?a_aid=68cf059493c35&a_bid=ffc2864d" 
          width="1" 
          height="1" 
          alt="" 
        />
      </div>
    </div>
  )
}
