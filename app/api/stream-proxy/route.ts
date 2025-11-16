import { type NextRequest } from "next/server"

export const runtime = "edge"
export const maxDuration = 300 // 5 minutes for large file streaming

/**
 * Universal streaming proxy for all platforms
 * Streams video/audio directly from source to user without buffering
 * This enables one-click downloads on mobile and bypasses CORS issues
 */

// Platform-specific headers to bypass restrictions
function getPlatformHeaders(platform: string, url: string): HeadersInit {
  const baseHeaders: HeadersInit = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  }

  // Platform-specific headers
  switch (platform?.toLowerCase()) {
    case 'tiktok':
      return {
        ...baseHeaders,
        'Referer': 'https://www.tiktok.com/',
        'Origin': 'https://www.tiktok.com',
        'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8',
        'Sec-Fetch-Dest': 'video',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
      }

    case 'instagram':
      return {
        ...baseHeaders,
        'Referer': 'https://www.instagram.com/',
        'Origin': 'https://www.instagram.com',
        'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8',
        'Sec-Fetch-Dest': 'video',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
      }

    case 'weibo':
      return {
        ...baseHeaders,
        'Referer': 'https://weibo.com/',
        'Origin': 'https://weibo.com',
        'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Sec-Fetch-Dest': 'video',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
      }

    case 'xiaohongshu':
    case 'redbook':
      return {
        ...baseHeaders,
        'Referer': 'https://www.xiaohongshu.com/',
        'Origin': 'https://www.xiaohongshu.com',
        'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Sec-Fetch-Dest': 'video',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
      }

    case 'bilibili':
      return {
        ...baseHeaders,
        'Referer': 'https://www.bilibili.com/',
        'Origin': 'https://www.bilibili.com',
        'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Sec-Fetch-Dest': 'video',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
      }

    case 'youtube':
      // YouTube requires specific headers to avoid 403
      // Remove Origin and Referer as they can cause blocks
      return {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'identity',
        'Range': 'bytes=0-',
        // Don't send Origin/Referer for YouTube - causes 403
      }

    case 'facebook':
      return {
        ...baseHeaders,
        'Referer': 'https://www.facebook.com/',
        'Origin': 'https://www.facebook.com',
        'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8',
      }

    case 'twitter':
    case 'x':
      return {
        ...baseHeaders,
        'Referer': 'https://twitter.com/',
        'Origin': 'https://twitter.com',
        'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8',
      }

    case 'dailymotion':
      return {
        ...baseHeaders,
        'Referer': 'https://www.dailymotion.com/',
        'Origin': 'https://www.dailymotion.com',
      }

    case 'bsky':
    case 'bluesky':
      return {
        ...baseHeaders,
        'Referer': 'https://bsky.app/',
        'Origin': 'https://bsky.app',
      }

    case 'reddit':
      return {
        ...baseHeaders,
        'Referer': 'https://www.reddit.com/',
        'Origin': 'https://www.reddit.com',
      }

    case 'douyin':
      return {
        ...baseHeaders,
        'Referer': 'https://www.douyin.com/',
        'Origin': 'https://www.douyin.com',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      }

    case 'kuaishou':
      return {
        ...baseHeaders,
        'Referer': 'https://www.kuaishou.com/',
        'Origin': 'https://www.kuaishou.com',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      }

    case 'pinterest':
      return {
        ...baseHeaders,
        'Referer': 'https://www.pinterest.com/',
        'Origin': 'https://www.pinterest.com',
      }

    case 'linkedin':
      return {
        ...baseHeaders,
        'Referer': 'https://www.linkedin.com/',
        'Origin': 'https://www.linkedin.com',
      }

    case 'snapchat':
      return {
        ...baseHeaders,
        'Referer': 'https://www.snapchat.com/',
        'Origin': 'https://www.snapchat.com',
      }

    case 'threads':
      return {
        ...baseHeaders,
        'Referer': 'https://www.threads.net/',
        'Origin': 'https://www.threads.net',
      }

    case 'tumblr':
      return {
        ...baseHeaders,
        'Referer': 'https://www.tumblr.com/',
        'Origin': 'https://www.tumblr.com',
      }

    case 'telegram':
      return {
        ...baseHeaders,
        'Referer': 'https://telegram.org/',
        'Origin': 'https://telegram.org',
      }

    case 'mixcloud':
      return {
        ...baseHeaders,
        'Referer': 'https://www.mixcloud.com/',
        'Origin': 'https://www.mixcloud.com',
        'Accept': 'audio/mpeg,audio/*;q=0.9,*/*;q=0.8',
      }

    case 'soundcloud':
      return {
        ...baseHeaders,
        'Referer': 'https://soundcloud.com/',
        'Origin': 'https://soundcloud.com',
        'Accept': 'audio/mpeg,audio/*;q=0.9,*/*;q=0.8',
        'Sec-Fetch-Dest': 'audio',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
      }

    case 'spotify':
      return {
        ...baseHeaders,
        'Referer': 'https://open.spotify.com/',
        'Origin': 'https://open.spotify.com',
        'Accept': 'audio/mpeg,audio/*;q=0.9,*/*;q=0.8',
      }

    case 'rumble':
      return {
        ...baseHeaders,
        'Referer': 'https://rumble.com/',
        'Origin': 'https://rumble.com',
      }

    case 'bitchute':
      return {
        ...baseHeaders,
        'Referer': 'https://www.bitchute.com/',
        'Origin': 'https://www.bitchute.com',
      }

    case 'imgur':
      return {
        ...baseHeaders,
        'Referer': 'https://imgur.com/',
        'Origin': 'https://imgur.com',
      }

    case '9gag':
      return {
        ...baseHeaders,
        'Referer': 'https://9gag.com/',
        'Origin': 'https://9gag.com',
      }

    case 'ifunny':
      return {
        ...baseHeaders,
        'Referer': 'https://ifunny.co/',
        'Origin': 'https://ifunny.co',
      }

    case 'ted':
      return {
        ...baseHeaders,
        'Referer': 'https://www.ted.com/',
        'Origin': 'https://www.ted.com',
      }

    case 'espn':
      return {
        ...baseHeaders,
        'Referer': 'https://www.espn.com/',
        'Origin': 'https://www.espn.com',
      }

    case 'imdb':
      return {
        ...baseHeaders,
        'Referer': 'https://www.imdb.com/',
        'Origin': 'https://www.imdb.com',
      }

    case 'capcut':
      return {
        ...baseHeaders,
        'Referer': 'https://www.capcut.com/',
        'Origin': 'https://www.capcut.com',
      }

    case 'febspot':
      return {
        ...baseHeaders,
        'Referer': 'https://febspot.com/',
        'Origin': 'https://febspot.com',
      }

    case 'deezer':
      return {
        ...baseHeaders,
        'Referer': 'https://www.deezer.com/',
        'Origin': 'https://www.deezer.com',
        'Accept': 'audio/mpeg,audio/*;q=0.9,*/*;q=0.8',
      }

    case 'zingmp3':
      return {
        ...baseHeaders,
        'Referer': 'https://zingmp3.vn/',
        'Origin': 'https://zingmp3.vn',
        'Accept-Language': 'vi,en;q=0.9',
      }

    case 'castbox':
      return {
        ...baseHeaders,
        'Referer': 'https://castbox.fm/',
        'Origin': 'https://castbox.fm',
        'Accept': 'audio/mpeg,audio/*;q=0.9,*/*;q=0.8',
      }

    default:
      return baseHeaders
  }
}

// Generate filename from URL or platform
function getFilename(url: string, platform: string, format: string = 'mp4'): string {
  try {
    // Try to get filename from URL
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split('/')
    const lastPart = pathParts[pathParts.length - 1]

    if (lastPart && lastPart.includes('.')) {
      return lastPart
    }
  } catch (error) {
    // Invalid URL, generate filename
  }

  // Generate filename: platform_timestamp.format
  const timestamp = Date.now()
  return `${platform}_${timestamp}.${format}`
}

export async function GET(request: NextRequest) {
  try {
    // Get parameters from URL
    const url = request.nextUrl.searchParams.get('url')
    const platform = request.nextUrl.searchParams.get('platform') || 'universal'
    const format = request.nextUrl.searchParams.get('format') || 'mp4'
    const filename = request.nextUrl.searchParams.get('filename')

    // Validate URL
    if (!url) {
      return new Response('Missing URL parameter', { status: 400 })
    }

    // Decode URL if needed
    const decodedUrl = decodeURIComponent(url)

    console.info(`[STREAM PROXY] Starting stream - Platform: ${platform}, Format: ${format}`)

    // Get platform-specific headers
    const headers = getPlatformHeaders(platform, decodedUrl)

    // Fetch from source (streaming mode)
    const response = await fetch(decodedUrl, {
      headers,
      redirect: 'follow',
    })

    if (!response.ok) {
      console.error(`[STREAM PROXY] Fetch failed: ${response.status} ${response.statusText}`)
      return new Response(`Failed to fetch video: ${response.status} ${response.statusText}`, {
        status: response.status,
      })
    }

    // Get content type from response or use format
    let contentType = response.headers.get('Content-Type') || 'application/octet-stream'

    // Override content type based on format
    if (format === 'mp3' || format === 'm4a') {
      contentType = 'audio/mpeg'
    } else if (format === 'mp4') {
      contentType = 'video/mp4'
    } else if (format === 'webm') {
      contentType = 'video/webm'
    } else if (format === 'm3u8' || format === 'streaming') {
      contentType = 'application/vnd.apple.mpegurl'
    }

    // Generate filename
    const downloadFilename = filename || getFilename(decodedUrl, platform, format)

    // Prepare response headers
    const responseHeaders = new Headers()
    responseHeaders.set('Content-Type', contentType)

    // Use RFC 5987 encoding for filenames with non-ASCII characters
    // Replace non-ASCII with underscore for the basic filename, and encode properly for filename*
    const asciiFilename = downloadFilename.replace(/[^\x00-\x7F]/g, '_')
    const encodedFilename = encodeURIComponent(downloadFilename)
    responseHeaders.set('Content-Disposition', `attachment; filename="${asciiFilename}"; filename*=UTF-8''${encodedFilename}`)

    // Copy important headers from source
    const contentLength = response.headers.get('Content-Length')
    if (contentLength) {
      responseHeaders.set('Content-Length', contentLength)
    }

    const acceptRanges = response.headers.get('Accept-Ranges')
    if (acceptRanges) {
      responseHeaders.set('Accept-Ranges', acceptRanges)
    }

    // Enable CORS for frontend
    responseHeaders.set('Access-Control-Allow-Origin', '*')
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    responseHeaders.set('Access-Control-Allow-Headers', 'Range')

    console.info(`[STREAM PROXY] Streaming started - ${platform} - ${contentLength || 'unknown size'}`)

    // Stream the response (no buffering - just pipe through)
    return new Response(response.body, {
      status: 200,
      headers: responseHeaders,
    })

  } catch (error) {
    console.error('[STREAM PROXY] Error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Range',
    },
  })
}
