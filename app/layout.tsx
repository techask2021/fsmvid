import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

import Script from "next/script"
import { cn } from "@/lib/utils"
import { Analytics } from "@/components/analytics"
import AdOptimizer from "@/components/ad-optimizer"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Ensure text remains visible during font loading
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "FSMVID | Free Social Media Video Downloader",
    template: "%s | FSMVID",
  },
  description: "Free online video downloader and converter tool that works. Download videos from 30+ platforms including YouTube, TikTok, Facebook, Instagram, Twitter with no software installation. Web-based video download utility with 4K quality, multiple formats (MP4, MKV, WebM, MP3), and built-in format conversion. No registration required—completely free video download software.",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicon/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/favicon/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FSMVID - Free Social Media Video Downloader',
      }
    ]
  },
  // Adding canonical URL to prevent duplicate content issues
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || 'https://fsmvid.com',
  }
}

// Optimized Web Vitals reporting function
const WebVitalsMonitoring = () => {
  // Only enable in production
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (!isProduction) {
    return null;
  }

  return (
    <Script id="web-vitals" strategy="worker"> {/* Changed to worker strategy */}
      {`
        function sendToAnalytics(metric) {
          if (!navigator.sendBeacon) return;
          
          const body = JSON.stringify(metric);
          try {
            navigator.sendBeacon('/api/vitals', body);
          } catch (e) {
            // Fallback
            fetch('/api/vitals', {
              body,
              method: 'POST',
              keepalive: true
            });
          }
        }
        
        try {
          if (window.performance) {
            // CLS
            new PerformanceObserver((entryList) => {
              const entries = entryList.getEntries();
              entries.forEach((entry) => {
                if (!entry.hadRecentInput) {
                  const cls = {
                    name: 'CLS',
                    value: entry.value,
                    rating: entry.value <= 0.1 ? 'good' : 
                            entry.value <= 0.25 ? 'needs-improvement' : 'poor',
                    id: Math.random().toString(36).slice(2),
                  };
                  requestIdleCallback(() => sendToAnalytics(cls));
                }
              });
            }).observe({type: 'layout-shift', buffered: true});
            
            // LCP
            new PerformanceObserver((entryList) => {
              const entries = entryList.getEntries();
              const lcp = entries[entries.length - 1];
              if (lcp) {
                const lcpValue = {
                  name: 'LCP',
                  value: lcp.startTime,
                  rating: lcp.startTime <= 2500 ? 'good' : 
                          lcp.startTime <= 4000 ? 'needs-improvement' : 'poor',
                  id: Math.random().toString(36).slice(2),
                };
                requestIdleCallback(() => sendToAnalytics(lcpValue));
              }
            }).observe({type: 'largest-contentful-paint', buffered: true});
            
            // FID
            new PerformanceObserver((entryList) => {
              const entries = entryList.getEntries();
              entries.forEach((entry) => {
                const fid = {
                  name: 'FID',
                  value: entry.processingStart - entry.startTime,
                  rating: (entry.processingStart - entry.startTime) <= 100 ? 'good' : 
                          (entry.processingStart - entry.startTime) <= 300 ? 'needs-improvement' : 'poor',
                  id: Math.random().toString(36).slice(2),
                };
                requestIdleCallback(() => sendToAnalytics(fid));
              });
            }).observe({type: 'first-input', buffered: true});
            
            // TTFB
            new PerformanceObserver((list) => {
              const entry = list.getEntries()[0];
              if (entry) {
                const ttfb = {
                  name: 'TTFB',
                  value: entry.responseStart - entry.requestStart,
                  rating: (entry.responseStart - entry.requestStart) <= 100 ? 'good' : 
                          (entry.responseStart - entry.requestStart) <= 200 ? 'needs-improvement' : 'poor',
                  id: Math.random().toString(36).slice(2),
                };
                requestIdleCallback(() => sendToAnalytics(ttfb));
              }
            }).observe({type: 'navigation', buffered: true});
          }
        } catch (e) {
          console.error('Web Vitals error:', e);
        }
      `}
    </Script>
  )
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/favicon/favicon.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/icons/youtube.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/icons/tiktok.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/icons/facebook.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/icons/instagram.svg" as="image" type="image/svg+xml" />
        
        {/* Preconnect to any external domains used for assets */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preconnect to Google Ads domains for faster ad loading */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://adservice.google.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://www.gstatic.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://adservice.google.com" />
        
        {/* Meta tags for Core Web Vitals optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#2563EB" />
        
        {/* Galaksion domain verification */}
        <meta name="galaksion-domain-verification" content="13c97584dfc6c84fac030fea976dd4b59475a706434204afb9743b820c2fb221" />
        
        {/* Google AdSense - Simple async loading */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2918771713238080"
          crossOrigin="anonymous"
        />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          
          <div className="relative flex min-h-screen flex-col overflow-x-hidden break-words">
            <div>
              <Header />
            </div>
            <div className="flex-1 break-words pt-20" style={{ containIntrinsicSize: '1px 5000px' }}> {/* Added pt-20 */}
              {children}
            </div>
            
            <Footer />
          </div>
          <Toaster />
          <Analytics />
          <AdOptimizer />
        </ThemeProvider>
        <WebVitalsMonitoring />
      </body>
    </html>
  )
}

import './globals.css'
