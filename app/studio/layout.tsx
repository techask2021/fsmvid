import type React from "react"
import type { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
  title: "Studio | FSMVID",
  description: "Content Management System",
  robots: {
    index: false,
    follow: false,
  },
}

// Completely isolated layout for Sanity Studio - NO ADS, NO HEADER, NO FOOTER
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* NO AdSense scripts */}
        {/* NO Analytics */}
        {/* NO external scripts */}
      </head>
      <body suppressHydrationWarning>
        {/* NO Header */}
        {/* NO Footer */}
        {/* NO Theme Provider */}
        {/* NO Ads */}
        {children}
      </body>
    </html>
  )
}

