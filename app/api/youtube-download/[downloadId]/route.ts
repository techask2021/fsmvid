import { type NextRequest, NextResponse } from "next/server"
import { getYouTubeDownloadUrl } from "@/lib/youtube-download-cache"

/**
 * YouTube Download Proxy - Dynamic Route
 * 
 * This endpoint:
 * 1. Retrieves cached YouTube URL from Netlify Blob
 * 2. Fetches video from YouTube CDN with proper headers
 * 3. Streams video to client (bypasses 403 errors)
 * 
 * Usage: GET /api/youtube-download/{downloadId}
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ downloadId: string }> }
) {
  try {
    // Next.js 15 requires awaiting params
    const { downloadId } = await params

    console.info(`[YOUTUBE DOWNLOAD] 📥 Request for ID: ${downloadId}`)

    // Get the cached download URL from Netlify Blob
    const cachedData = await getYouTubeDownloadUrl(downloadId)

    if (!cachedData) {
      console.error(`[YOUTUBE DOWNLOAD] ❌ Invalid or expired ID: ${downloadId}`)
      return NextResponse.json(
        {
          status: "error",
          message: "Download link has expired or is invalid. Please go back and click 'Get Download Options' again to generate fresh links.",
        },
        { status: 404 }
      )
    }

    console.info(
      `[YOUTUBE DOWNLOAD] 📹 Fetching: "${cachedData.videoTitle}" (${cachedData.quality})`
    )

    // Fetch the video from YouTube CDN with proper headers to bypass 403
    const youtubeResponse = await fetch(cachedData.downloadUrl, {
      method: 'GET',
      headers: {
        // Critical headers that YouTube CDN requires
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.youtube.com/',
        'Origin': 'https://www.youtube.com',
        'Accept': '*/*',
        'Accept-Encoding': 'identity;q=1, *;q=0',
        'Accept-Language': 'en-US,en;q=0.9',
        'Range': 'bytes=0-', // Support range requests for streaming
        'Sec-Fetch-Dest': 'video',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
      },
    })

    console.info(`[YOUTUBE DOWNLOAD] 🌐 YouTube CDN response: ${youtubeResponse.status}`)

    if (!youtubeResponse.ok) {
      console.error(
        `[YOUTUBE DOWNLOAD] ❌ YouTube CDN error ${youtubeResponse.status}: ${youtubeResponse.statusText}`
      )

      // If 403, the URL has expired - user needs to regenerate
      if (youtubeResponse.status === 403) {
        return NextResponse.json(
          {
            status: "error",
            message:
              "YouTube download URL has expired. Please go back and click 'Get Download Options' again to generate fresh links.",
          },
          { status: 403 }
        )
      }

      // Handle 404 (video removed/unavailable)
      if (youtubeResponse.status === 404) {
        return NextResponse.json(
          {
            status: "error",
            message: "Video not found or has been removed from YouTube.",
          },
          { status: 404 }
        )
      }

      return NextResponse.json(
        {
          status: "error",
          message: `Failed to download video: ${youtubeResponse.statusText}`,
        },
        { status: youtubeResponse.status }
      )
    }

    // Get content information
    const contentLength = youtubeResponse.headers.get('content-length')
    const contentType = youtubeResponse.headers.get('content-type') || 'video/mp4'

    const fileSizeMB = contentLength
      ? Math.round(parseInt(contentLength) / 1024 / 1024)
      : 'unknown'

    console.info(
      `[YOUTUBE DOWNLOAD] ✅ Streaming "${cachedData.videoTitle}": ${fileSizeMB}MB`
    )

    // Set up response headers for download
    const headers = new Headers()
    headers.set('Content-Type', contentType)
    headers.set('Content-Disposition', `attachment; filename="${cachedData.filename}"`)

    if (contentLength) {
      headers.set('Content-Length', contentLength)
    }

    // Enable range requests (allows resume/seeking in video players)
    headers.set('Accept-Ranges', 'bytes')
    headers.set('Cache-Control', 'public, max-age=3600') // Cache for 1 hour

    // CORS headers (allow download from any origin)
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length')

    // Stream the video response back to the client
    return new NextResponse(youtubeResponse.body, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("[YOUTUBE DOWNLOAD] ⚠️  Unexpected error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "An unexpected error occurred while downloading the video. Please try again.",
      },
      { status: 500 }
    )
  }
}

/**
 * Handle OPTIONS requests for CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Range',
      'Access-Control-Max-Age': '86400', // Cache preflight for 24 hours
    },
  })
}

