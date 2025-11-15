import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Paths that should NOT be logged (noise) - expanded list
const IGNORED_PATHS = [
  '/favicon',
  '/icons/',
  '/_next/',
  '/images/',
  '/static/',
  '/_vercel/',
  '/robots.txt',
  '/sitemap',
  '/api/og',
  '/api/revalidate',
  'cdn.sanity.io', // Sanity CDN images
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.ico',
  '.css',
  '.js',
  '.map',
  '.woff',
  '.woff2',
  '.ttf',
  '.webmanifest',
  '?_rsc=',
]

// Paths that SHOULD be logged (important user behavior)
const IMPORTANT_PATHS = [
  '/api/proxy',
  '/api/download',
  '/api/weibo-proxy',
]

// Pages that should be logged (user navigation)
const IMPORTANT_PAGES = [
  '/',
  '/blog',
  '/platforms/',
]

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const fullPath = pathname + search

  // Check if this is a path we should ignore
  const shouldIgnore = IGNORED_PATHS.some(ignored =>
    pathname.includes(ignored) || fullPath.includes(ignored)
  )

  if (shouldIgnore) {
    return NextResponse.next()
  }

  // Log important API calls with details
  const isImportantAPI = IMPORTANT_PATHS.some(path => pathname.startsWith(path))
  if (isImportantAPI) {
    console.info(`[REQUEST] ${request.method} ${pathname}`)
    return NextResponse.next()
  }

  // Log important page visits (but not 200 status - that's handled by Next.js)
  const isImportantPage = IMPORTANT_PAGES.some(page =>
    pathname === page || pathname.startsWith(page)
  )
  if (isImportantPage && request.method === 'GET') {
    console.info(`[PAGE] ${pathname}`)
  }

  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
