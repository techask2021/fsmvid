"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"
import Script from "next/script"

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = "G-0YWLSNQ3NK";

// Only enable analytics in production
const isProduction = process.env.NODE_ENV === 'production';

function AnalyticsContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Only track in production
    if (!isProduction) return;
    
    // Track page view when path changes
    if (pathname && window.gtag) {
      const url = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  return null
}

export function Analytics() {
  // Don't render analytics in development
  if (!isProduction) {
    console.log('[Analytics] Disabled in development environment');
    return null;
  }

  return (
    <>
      <Suspense fallback={null}>
       <AnalyticsContent />
      </Suspense>
      
      {/* Google tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  )
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}