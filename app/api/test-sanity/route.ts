import { NextResponse } from 'next/server'
export const runtime = 'edge'

export async function GET() {
  try {
    console.log('[SANITY TEST] Testing Sanity connection with direct HTTP API...')

    const projectId = 'fb7jparp'
    const dataset = 'production'
    const apiVersion = 'v2021-10-21' // Use stable API version (date doesn't matter for public data)

    // Test with direct HTTP fetch to Sanity CDN
    const query = encodeURIComponent('*[_type == "post"] | order(publishedAt desc)[0...3]')
    const url = `https://${projectId}.apicdn.sanity.io/${apiVersion}/data/query/${dataset}?query=${query}`

    console.log('[SANITY TEST] Fetching from URL:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('[SANITY TEST] Response status:', response.status)
    console.log('[SANITY TEST] Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[SANITY TEST] Error response:', errorText)
      return NextResponse.json({
        status: 'error',
        message: `Sanity API returned ${response.status}`,
        responseStatus: response.status,
        responseBody: errorText,
        testedUrl: url,
      }, { status: 500 })
    }

    const data = await response.json()
    console.log('[SANITY TEST] Success! Data:', data)

    return NextResponse.json({
      status: 'success',
      message: 'Sanity connection working with direct HTTP API',
      postCount: data.result?.length || 0,
      samplePosts: data.result,
      testedUrl: url,
    })
  } catch (error) {
    console.error('[SANITY TEST] Error:', error)
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : String(error),
    }, { status: 500 })
  }
}
