// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  typescript: {
    // Setting this to true to bypass TypeScript errors during build
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false, // Enable Next.js image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'], // Enable modern image formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Responsive image sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Custom image sizes
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    optimizeCss: true, // Optimize CSS for production
    optimizePackageImports: ['react-icons', 'lucide-react', '@radix-ui/react-icons'], // Optimize package tree-shaking
    scrollRestoration: true, // Improve scroll restoration
    serverActions: {
      allowedOrigins: ['*'],
      allowedHeaders: ['*'],
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn', 'info'], // Keep error, warn, and info logs in production
    } : false, // Remove only console.log and console.debug in production
  },
  reactStrictMode: true, // Helps catch potential issues
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true, // Enable compression
  productionBrowserSourceMaps: false, // Disable source maps in production
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 1 minute
    pagesBufferLength: 5,
  },
  staticPageGenerationTimeout: 90,
  async redirects() {
    return [
      // Old URLs returning 308 redirect to the 410 page
      { source: '/dmca', destination: '/api/gone', permanent: true },
      { source: '/video', destination: '/api/gone', permanent: true },
      { source: '/video/', destination: '/api/gone', permanent: true },
      { source: '/twitter-video-downloader', destination: '/api/gone', permanent: true },
      { source: '/imgur-video-downloader', destination: '/api/gone', permanent: true },
      { source: '/instagram-video-saver', destination: '/api/gone', permanent: true },
      { source: '/instagram-video-downloader', destination: '/api/gone', permanent: true },
      { source: '/facebook-video-saver', destination: '/api/gone', permanent: true },
      { source: '/dailymotion-video-downloader', destination: '/api/gone', permanent: true },
      { source: '/pinterest-video-downloader', destination: '/api/gone', permanent: true },
      { source: '/youtube-video-downloader', destination: '/api/gone', permanent: true },
      { source: '/tumblr-video-downloader', destination: '/api/gone', permanent: true },
      { source: '/snapchat-video-downloader', destination: '/api/gone', permanent: true },
      { source: '/vimeo-video-downloader', destination: '/api/gone', permanent: true },
      { source: '/pinterest-video-saver', destination: '/api/gone', permanent: true },
      { source: '/linkedin-video-downloader', destination: '/api/gone', permanent: true },
      { source: '/tiktok-video-downloader', destination: '/api/gone', permanent: true },
      { source: '/telegram-video-downloader', destination: '/api/gone', permanent: true },
      { source: '/rumble-video-downloader', destination: '/api/gone', permanent: true },
      { source: '/:platform-video-downloader', destination: '/api/gone', permanent: true },
      { source: '/twitter-story-saver', destination: '/api/gone', permanent: true },
      
      // Old WordPress listing pages
      { source: '/listing/capital-vilnius', destination: '/api/gone', permanent: true },
      { source: '/listing/sj-interna', destination: '/api/gone', permanent: true },
      { source: '/listing/kontolita-buhalterines-paslaugos-ir-konsultacijos', destination: '/api/gone', permanent: true },
      { source: '/listing/baltic-sothebys-international-realty-lithuania', destination: '/api/gone', permanent: true },
      { source: '/listing/real-estate-agent-in-vilnius-agata-avsejenko', destination: '/api/gone', permanent: true },
      { source: '/listing/inkonta-teisines-ir-buhalterines-paslaugos-2', destination: '/api/gone', permanent: true },
      { source: '/listing/vilnius-county-tax-inspection-service', destination: '/api/gone', permanent: true },
      { source: '/listing/lina-ivanauske-komercinio-nt-eksperte', destination: '/api/gone', permanent: true },
      { source: '/listing/mb-verslo-sprendimu-profesionalai-2', destination: '/api/gone', permanent: true },
      { source: '/listing/andrius-kapitancukas-nt-brokeris', destination: '/api/gone', permanent: true },
      { source: '/listing/accounting-services-in-vilnius-2', destination: '/api/gone', permanent: true },
      { source: '/listing/pro-kapital-vilnius-real-estate', destination: '/api/gone', permanent: true },
      { source: '/listing/nt-eksperte-karina-paulauskaite', destination: '/api/gone', permanent: true },
      { source: '/listing/leinonen-lithuania-vilnius-2', destination: '/api/gone', permanent: true },
      { source: '/listing/grant-thornton-baltic-2', destination: '/api/gone', permanent: true },
      { source: '/listing/1office-lithuania-uab-2', destination: '/api/gone', permanent: true },
      { source: '/listing/uab-financial-world-3', destination: '/api/gone', permanent: true },
      { source: '/listing/ecovis-proventus-uab', destination: '/api/gone', permanent: true },
      { source: '/listing/vilija-tamasauskiene', destination: '/api/gone', permanent: true },
      { source: '/listing/akorus-real-estate', destination: '/api/gone', permanent: true },
      { source: '/listing/ecit-norian-uab-2', destination: '/api/gone', permanent: true },
      { source: '/listing/solds-real-estate', destination: '/api/gone', permanent: true },
      { source: '/listing/mokesciu-sufleris', destination: '/api/gone', permanent: true },
      { source: '/listing/nst-accounting-2', destination: '/api/gone', permanent: true },
      { source: '/listing/esas-consulting', destination: '/api/gone', permanent: true },
      { source: '/listing/tomas-paulaitis', destination: '/api/gone', permanent: true },
      { source: '/listing/uab-rebaltic', destination: '/api/gone', permanent: true },
      { source: '/listing/eureka-lt-2', destination: '/api/gone', permanent: true },
      { source: '/listing/uab-kadmas', destination: '/api/gone', permanent: true },
      { source: '/listing/ober-haus', destination: '/api/gone', permanent: true },
      { source: '/listing/1stopvat', destination: '/api/gone', permanent: true },
      { source: '/listing/gismeya', destination: '/api/gone', permanent: true },
      { source: '/listing/proreal', destination: '/api/gone', permanent: true },
      
      // Old WordPress listing categories
      { source: '/listing-category/business-management-consultant', destination: '/api/gone', permanent: true },
      { source: '/listing-category/tax-preparation-services', destination: '/api/gone', permanent: true },
      { source: '/listing-category/financial-consultant', destination: '/api/gone', permanent: true },
      { source: '/listing-category/real-estate-agency', destination: '/api/gone', permanent: true },
      { source: '/listing-category/insurance-agency', destination: '/api/gone', permanent: true },
      { source: '/listing-category/accounting-firm', destination: '/api/gone', permanent: true },
      { source: '/listing-category/medical-center', destination: '/api/gone', permanent: true },
      { source: '/listing-category/dental-clinic', destination: '/api/gone', permanent: true },
      { source: '/listing-category/notary-public', destination: '/api/gone', permanent: true },
      { source: '/listing-category/law-firm', destination: '/api/gone', permanent: true },
      
      // Old WordPress author pages
      { source: '/author/raymond', destination: '/api/gone', permanent: true },
      
      // Old WordPress blog and category pages
      { source: '/category/blog', destination: '/api/gone', permanent: true },
      
      // Old WordPress region pages
      { source: '/region/vilnius', destination: '/api/gone', permanent: true },
      
      // Old WordPress static pages
      { source: '/terms-and-conditions', destination: '/api/gone', permanent: true },
      { source: '/submit-listing', destination: '/api/gone', permanent: true },
      { source: '/listing-with-sidebar', destination: '/api/gone', permanent: true },
      { source: '/listing-full', destination: '/api/gone', permanent: true },
      { source: '/disclaimer', destination: '/api/gone', permanent: true },
      
      // Old WordPress blog posts
      { source: '/vilnius-startup-ecosystem-guide-complete-overview-of-funding-support-programs', destination: '/api/gone', permanent: true },
      { source: '/12-best-day-trips-from-vilnius-trakai-castle-curonian-spit-hidden-gems', destination: '/api/gone', permanent: true },
      { source: '/vilnius-music-scene-where-traditional-folk-meets-modern-beats', destination: '/api/gone', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        // Cache static assets
        source: '/(fonts|images|icons)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
        ],
      },
      {
        // Cache static assets
        source: '/(.*)\\.(jpg|jpeg|png|gif|ico|css|js)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts
        source: '/(.*)\\.(woff|woff2|ttf|otf)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Content Security Policy
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' 
                https://analytics.umami.is 
                https://*.google-analytics.com 
                https://*.googletagmanager.com 
                https://*.cloudflareinsights.com 
                http://gc.kis.v2.scr.kaspersky-labs.com 
                ws://gc.kis.v2.scr.kaspersky-labs.com 
                https://pagead2.googlesyndication.com 
                https://adservice.google.com
                https://googleads.g.doubleclick.net
                https://fundingchoicesmessages.google.com
                https://partner.googleadservices.com
                https://va.vercel-scripts.com 
                https://ep2.adtrafficquality.google
                https://www.google.com
                https://www.gstatic.com
                https://*.googlesyndication.com
                https://*.doubleclick.net;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://googleads.g.doubleclick.net https://www.gstatic.com;
              font-src 'self' https://fonts.gstatic.com https://www.gstatic.com;
              img-src 'self' data: https: blob:;
              connect-src 'self' https: https://*.googlevideo.com https://*.youtube.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net;
              frame-src 'self' https: https://www.google.com https://*.googlevideo.com https://*.youtube.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://ad.doubleclick.net;
              media-src 'self' https: https://*.googlevideo.com https://*.youtube.com blob:;
              object-src 'none';
              worker-src 'self' blob:;
              form-action 'self';
              frame-ancestors 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com;
              base-uri 'self';
              upgrade-insecure-requests;
              block-all-mixed-content
            `.replace(/\n/g, '')
          }
        ]
      },
    ];
  },
}

export default nextConfig;
