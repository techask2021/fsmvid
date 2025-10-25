import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 60

/**
 * Truth Social API Info Endpoint
 * Returns the API URL for CLIENT-SIDE fetching
 * 
 * Truth Social's API:
 * ✅ Allows direct browser requests (CORS-friendly)
 * ❌ Blocks all server requests (403)
 * ❌ Blocks datacenter proxy requests (403)
 * 
 * Solution: Browser fetches API directly, then uses proxy for video download
 */
export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { status: "error", message: "URL is required" },
        { status: 400 }
      )
    }

    // Extract post ID from Truth Social URL
    // Format: https://truthsocial.com/@username/postid or https://truthsocial.com/@username/posts/postid
    const postIdMatch = url.match(/truthsocial\.com\/@[\w]+\/(?:posts\/)?(\d+)/)
    if (!postIdMatch || !postIdMatch[1]) {
      return NextResponse.json(
        { status: "error", message: "Invalid Truth Social URL format. Please use format: https://truthsocial.com/@username/postid" },
        { status: 400 }
      )
    }

    const postId = postIdMatch[1]
    const apiUrl = `https://truthsocial.com/api/v1/statuses/${postId}`

    console.log(`Truth Social post ID: ${postId}, API URL: ${apiUrl}`)

    // Return the API URL for client-side fetching
    // Truth Social allows CORS requests from browsers
    return NextResponse.json({
      status: "client_fetch",
      apiUrl: apiUrl,
      postId: postId
    })

  } catch (error: any) {
    console.error("Truth Social API error:", error)
    return NextResponse.json(
      { 
        status: "error", 
        message: error.message || "An error occurred while processing the Truth Social post" 
      },
      { status: 500 }
    )
  }
}
