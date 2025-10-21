// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
let userConfig = {}
try {
  userConfig = require("./sanity.config").default || {}
} catch {}

const nextConfig = {
  eslint: {
    // Set this to false to push to vercel
    ignoreDuringBuilds: true,
  },
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
      exclude: ['error', 'warn'],
    } : false, // Remove console logs in production
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
            value: 'DENY',
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
                https://www.gstatic.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              img-src 'self' data: https:;
              connect-src 'self' https: https://*.googlevideo.com https://*.youtube.com;
              frame-src 'self' https: https://www.google.com https://*.googlevideo.com https://*.youtube.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com;
              media-src 'self' https: https://*.googlevideo.com https://*.youtube.com blob:;
              object-src 'self';
              worker-src 'self' blob:;
              form-action 'self';
              frame-ancestors 'none';
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

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig;
