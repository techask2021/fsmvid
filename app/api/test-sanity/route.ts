import { NextResponse } from 'next/server'
export const runtime = 'edge'
import { client } from '@/lib/blog/blog-client'

export async function GET() {
  try {
    console.log('[SANITY TEST] Testing Sanity connection...')

    // Test environment variables
    const envCheck = {
      hasProjectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      hasDataset: !!process.env.NEXT_PUBLIC_SANITY_DATASET,
      hasApiVersion: !!process.env.NEXT_PUBLIC_SANITY_API_VERSION,
      hasToken: !!process.env.SANITY_API_TOKEN,
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    }

    console.log('[SANITY TEST] Environment check:', envCheck)

    // Test simple query
    const count = await client.fetch<number>('count(*[_type == "post"])')
    console.log('[SANITY TEST] Post count:', count)

    // Test fetching one post
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc)[0...1] {
        _id,
        title,
        slug
      }
    `)
    console.log('[SANITY TEST] Sample posts:', posts)

    return NextResponse.json({
      status: 'success',
      message: 'Sanity connection working',
      envCheck,
      postCount: count,
      samplePosts: posts,
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
