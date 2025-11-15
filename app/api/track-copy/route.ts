import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

/**
 * Track when users copy direct download links
 * This endpoint logs successful link copies for analytics
 */
export async function POST(request: NextRequest) {
  try {
    const { platform, fileSize, url } = await request.json()

    // Extract file size in MB for logging
    let sizeMB = 'unknown'
    if (fileSize && typeof fileSize === 'number') {
      sizeMB = `${Math.round(fileSize / 1024 / 1024)}MB`
    }

    // Log the successful copy event
    console.info(`[LINK COPIED] ${platform} - ${sizeMB} - User copied direct download link`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[TRACK COPY] Error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
