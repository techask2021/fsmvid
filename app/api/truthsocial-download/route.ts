import { type NextRequest, NextResponse } from "next/server"
import { proxyPool } from "./proxy-pool"

export const runtime = "nodejs"
export const maxDuration = 60

/**
 * Truth Social Download Endpoint (Uses Rotating Proxies)
 * Downloads videos through Ephemeral Proxies to bypass CDN restrictions
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

    // Step 1: Initialize proxy pool (if not already initialized)
    console.log('Step 1: Initializing proxy pool...')
    
    try {
      await proxyPool.initialize(rapidApiKey, rapidApiHost)
    } catch (initError: any) {
      console.error('Failed to initialize proxy pool:', initError)
      return NextResponse.json(
        { message: `Failed to initialize proxy pool: ${initError.message}` },
        { status: 500 }
      )
    }

    // Step 2: Try multiple proxies until one works (max 3 attempts)
    console.log('Step 2: Trying proxies...')
    
    let videoResponse: any = null
    let successfulProxy: any = null
    const maxAttempts = 3
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const proxy = proxyPool.getRandomProxy()
        console.log(`Attempt ${attempt}/${maxAttempts}: Trying proxy ${proxy.host}:${proxy.port} (${proxy.country})`)
        
        // Construct proxy URL for fetch
        const proxyUrl = `http://${proxy.host}:${proxy.port}`
        
        // Create proxy agent
        const agent = new HttpsProxyAgent(proxyUrl)
        
        // Use node-fetch with proxy agent (with timeout)
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout
        
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
            console.log(`❌ Proxy ${proxy.host} returned ${videoResponse.status}, trying next...`)
          }
        } catch (fetchError: any) {
          clearTimeout(timeoutId)
          console.log(`❌ Proxy ${proxy.host} failed: ${fetchError.message}, trying next...`)
          if (attempt === maxAttempts) throw fetchError
        }
        
      } catch (proxyError: any) {
        console.log(`❌ Attempt ${attempt} failed: ${proxyError.message}`)
        if (attempt === maxAttempts) {
          return NextResponse.json(
            { message: `All proxy attempts failed. Please try again later.` },
            { status: 500 }
          )
        }
      }
    }

    if (!videoResponse || !videoResponse.ok) {
      console.error('Failed to fetch video after all attempts')
      return NextResponse.json(
        { message: 'Failed to fetch video after multiple attempts' },
        { status: 500 }
      )
    }

    // Step 4: Stream the video response back to the client
    const contentType = videoResponse.headers.get('Content-Type') || 'video/mp4'
    const contentLength = videoResponse.headers.get('Content-Length')

    if (contentLength) {
      console.log(`File size: ${Math.round(parseInt(contentLength) / 1024 / 1024)}MB`)
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

