import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Paths that should NOT be logged (noise)
const IGNORED_PATHS = [
  '/favicon',
  '/icons/',
  '/_next/',
  '/images/',
  '/static/',
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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if this is a path we should ignore
  const shouldIgnore = IGNORED_PATHS.some(ignored =>
    pathname.includes(ignored)
  )

  // Only log important API calls and user navigation
  if (!shouldIgnore) {
    const isImportantAPI = IMPORTANT_PATHS.some(path => pathname.startsWith(path))

    if (isImportantAPI) {
      // This will show in wrangler logs
      console.info(`[REQUEST] ${request.method} ${pathname}`)
    }
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
