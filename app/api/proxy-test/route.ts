import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

// Minimal proxy test - NO security, NO rate limiting, NO caching
export async function POST(request: NextRequest) {
  try {
    console.log('[PROXY TEST] Starting minimal proxy test')

    // Parse the request body
    const body = await request.json()
    const { url } = body

    console.log('[PROXY TEST] Request URL:', url)

    if (!url) {
      return NextResponse.json({ status: "error", message: "URL is required" }, { status: 400 })
    }

    // Get the API credentials from environment
    const apiKey = process.env.NEXT_PUBLIC_ZM_API_KEY
    const apiUrl = process.env.NEXT_PUBLIC_ZM_API_URL

    console.log('[PROXY TEST] API Key exists:', !!apiKey)
    console.log('[PROXY TEST] API URL:', apiUrl)

    if (!apiKey || !apiUrl) {
      return NextResponse.json({
        status: "error",
        message: "API configuration is missing",
        debug: {
          hasApiKey: !!apiKey,
          hasApiUrl: !!apiUrl
        }
      }, { status: 500 })
    }

    // Make the API request
    const options = {
      method: "POST",
      headers: {
        "apikey": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url })
    }

    console.log('[PROXY TEST] Calling ZM API...')

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    console.log('[PROXY TEST] API Response status:', response.status)
    console.log('[PROXY TEST] API Response data:', JSON.stringify(data).substring(0, 200))

    if (!response.ok) {
      return NextResponse.json({
        status: "error",
        message: data.message || "API request failed",
        details: data
      }, { status: response.status })
    }

    // Return success
    return NextResponse.json({
      status: "success",
      ...data
    })

  } catch (error) {
    console.error('[PROXY TEST] Error:', error)
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
