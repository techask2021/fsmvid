import { type NextRequest, NextResponse } from "next/server"
import { proxyManager } from "./proxy-pool"

export const runtime = "nodejs"
export const maxDuration = 60

/**
 * Truth Social Download Endpoint (Uses Ephemeral Proxies)
 * Downloads videos through datacenter proxies to bypass CDN restrictions
 * Serverless-compatible: Fetches a fresh proxy on each request
 */
export async function POST(request: NextRequest) {
  try {
    const { url, filename } = await request.json()

    if (!url || !filename) {
      return NextResponse.json(
        { message: "URL and filename are required" },
        { status: 400 }
      )
    }

    console.log(`Truth Social download: ${url}`)

    const rapidApiKey = process.env.RAPIDAPI_KEY
    const rapidApiHost = process.env.RAPIDAPI_HOST || 'ephemeral-proxies.p.rapidapi.com'

    if (!rapidApiKey) {
      return NextResponse.json(
        { message: "Proxy service not configured. Please set RAPIDAPI_KEY in environment variables." },
        { status: 500 }
      )
    }

    // Import node-fetch and https-proxy-agent
    const nodeFetch = await import('node-fetch')
    const { HttpsProxyAgent } = await import('https-proxy-agent')

    // Try up to 3 different proxies
    const maxAttempts = 3
    let videoResponse: any = null
    let successfulProxy: any = null

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(`\n🔄 Attempt ${attempt}/${maxAttempts}: Fetching proxy...`)
        
        // Fetch a fresh proxy from API
        const proxy = await proxyManager.getProxy(rapidApiKey, rapidApiHost)
        
        console.log(`Trying to download through proxy: ${proxy.host}:${proxy.port} (${proxy.country})`)
        
        // Construct proxy URL for node-fetch
        const proxyUrl = `http://${proxy.host}:${proxy.port}`
        
        // Create proxy agent
        const agent = new HttpsProxyAgent(proxyUrl)
        
        // Use node-fetch with proxy agent (with timeout)
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 20000) // 20 second timeout
        
        try {
          videoResponse = await nodeFetch.default(url, {
            method: 'GET',
            signal: controller.signal,
            // @ts-ignore - node-fetch accepts agent option
            agent: agent,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': '*/*',
              'Referer': 'https://truthsocial.com/',
            },
          })
          clearTimeout(timeoutId)
          
          if (videoResponse.ok) {
            successfulProxy = proxy
            console.log(`✅ Video fetched successfully through proxy ${proxy.host} (${proxy.country})!`)
            break
          } else {
            console.log(`❌ Proxy ${proxy.host} returned ${videoResponse.status}`)
            if (attempt < maxAttempts) {
              console.log(`Trying another proxy...`)
            }
          }
        } catch (fetchError: any) {
          clearTimeout(timeoutId)
          console.log(`❌ Proxy ${proxy.host} failed: ${fetchError.message}`)
          if (attempt < maxAttempts) {
            console.log(`Trying another proxy...`)
          } else {
            throw fetchError
          }
        }
        
      } catch (proxyError: any) {
        console.log(`❌ Attempt ${attempt} failed: ${proxyError.message}`)
        if (attempt === maxAttempts) {
          return NextResponse.json(
            { message: `Failed to download video. Please try again later. (${proxyError.message})` },
            { status: 500 }
          )
        }
      }
    }

    if (!videoResponse || !videoResponse.ok) {
      console.error('Failed to fetch video after all attempts')
      return NextResponse.json(
        { message: 'Failed to download video after multiple attempts. Please try again.' },
        { status: 500 }
      )
    }

    // Stream the video response back to the client
    const contentType = videoResponse.headers.get('Content-Type') || 'video/mp4'
    const contentLength = videoResponse.headers.get('Content-Length')

    if (contentLength) {
      console.log(`📦 File size: ${Math.round(parseInt(contentLength) / 1024 / 1024)}MB`)
    }

    // Create response with video stream
    const response = new NextResponse(videoResponse.body as any)
    
    // Set headers for download
    const encodedFilename = encodeURIComponent(filename)
    response.headers.set('Content-Disposition', `attachment; filename="${filename}"; filename*=UTF-8''${encodedFilename}`)
    response.headers.set('Content-Type', contentType)
    
    if (contentLength) {
      response.headers.set('Content-Length', contentLength)
    }

    // Enable CORS
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')

    console.log(`✅ Download completed successfully!`)
    return response

  } catch (error: any) {
    console.error("Truth Social download error:", error)
    return NextResponse.json(
      { message: error.message || "An error occurred during download" },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
