import { type NextRequest } from "next/server"

export const runtime = "edge"

/**
 * Weibo Video Streaming Proxy
 *
 * This endpoint proxies Weibo video URLs with proper headers to avoid 403 errors.
 * It streams the video content (no buffering) to support unlimited file sizes.
 *
 * Usage: /api/weibo-proxy?url=https://f.video.weibocdn.com/...
 *
 * Why needed:
 * - Weibo CDN requires specific headers (Referer, Origin, User-Agent)
 * - Direct browser access to Weibo URLs returns 403 Forbidden
 * - Streaming approach avoids CPU timeout for large files
 */
export async function GET(request: NextRequest) {
  try {
    // Get the video URL from query parameters
    const searchParams = request.nextUrl.searchParams
    const videoUrl = searchParams.get('url')

    if (!videoUrl) {
      return new Response('Missing url parameter', { status: 400 })
    }

    // Verify it's a Weibo URL for security
    if (!videoUrl.includes('weibocdn.com') && !videoUrl.includes('weibo.com') && !videoUrl.includes('miaopai.com')) {
      return new Response('Invalid Weibo URL', { status: 400 })
    }

    // Fetch with Weibo-specific headers
    const headers: HeadersInit = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      'Referer': 'https://weibo.com/',
      'Origin': 'https://weibo.com',
      'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Sec-Fetch-Dest': 'video',
      'Sec-Fetch-Mode': 'no-cors',
      'Sec-Fetch-Site': 'cross-site',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    }

    // Support Range requests for resumable downloads and video streaming
    const rangeHeader = request.headers.get('range')
    if (rangeHeader) {
      headers['Range'] = rangeHeader
    }

    console.info(`[WEIBO PROXY] Streaming request for: ${videoUrl.substring(0, 80)}...`)

    // Fetch the video from Weibo CDN
    const response = await fetch(videoUrl, {
      headers,
      redirect: 'follow',
    })

    if (!response.ok) {
      console.error(`[WEIBO PROXY] Failed: ${response.status} ${response.statusText}`)
      return new Response(`Failed to fetch video: ${response.status}`, { status: response.status })
    }

    // Get content metadata
    const contentType = response.headers.get('content-type') || 'video/mp4'
    const contentLength = response.headers.get('content-length')
    const acceptRanges = response.headers.get('accept-ranges')

    // Build response headers
    const responseHeaders = new Headers({
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range',
    })

    if (contentLength) {
      responseHeaders.set('Content-Length', contentLength)
      const sizeMB = Math.round(parseInt(contentLength) / 1024 / 1024)
      console.info(`[WEIBO PROXY] Streaming video (${sizeMB}MB)`)
    }

    if (acceptRanges) {
      responseHeaders.set('Accept-Ranges', acceptRanges)
    }

    // Handle range requests (206 Partial Content) for resumable downloads
    if (response.status === 206) {
      const contentRange = response.headers.get('content-range')
      if (contentRange) {
        responseHeaders.set('Content-Range', contentRange)
      }

      return new Response(response.body, {
        status: 206,
        headers: responseHeaders,
      })
    }

    // Stream the full video (no buffering - just pipe through)
    return new Response(response.body, {
      status: 200,
      headers: responseHeaders,
    })

  } catch (error) {
    console.error('[WEIBO PROXY] Error:', error)
    return new Response('Proxy error', { status: 500 })
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range',
    },
  })
}
