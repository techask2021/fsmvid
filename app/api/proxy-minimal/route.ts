import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

// ULTRA MINIMAL proxy - NO security, NO caching, NO middleware
// Just pure API forwarding to test if the core functionality works
export async function POST(request: NextRequest) {
  try {
    // Parse request
    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json({ status: "error", message: "URL is required" }, { status: 400 })
    }

    // Get API credentials
    const apiKey = process.env.NEXT_PUBLIC_ZM_API_KEY
    const apiUrl = process.env.NEXT_PUBLIC_ZM_API_URL

    if (!apiKey || !apiUrl) {
      return NextResponse.json({ status: "error", message: "API config missing" }, { status: 500 })
    }

    // Call ZM API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "apikey": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url })
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({
        status: "error",
        message: data.message || "API error",
        details: data
      }, { status: response.status })
    }

    // Return success
    return NextResponse.json(data.medias ? { status: "success", ...data } : { status: "success", formats: data.formats })

  } catch (error) {
    console.error("[PROXY MINIMAL] Error:", error)
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
