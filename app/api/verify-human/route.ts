import { NextResponse, type NextRequest } from 'next/server'
import { verifyTurnstileToken } from '@/lib/turnstile'
import { getClientIP } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()
    if (!token) {
      return NextResponse.json({ status: 'error', message: 'Missing token' }, { status: 400 })
    }

    const ip = getClientIP(request.headers)
    const result = await verifyTurnstileToken(token, ip !== 'unknown' ? ip : undefined)
    if (!result.success) {
      return NextResponse.json({ status: 'error', message: 'Verification failed', code: result.error }, { status: 401 })
    }

    const res = NextResponse.json({ status: 'ok' }, { status: 200 })
    // mark visitor as human for 24 hours
    res.cookies.set('human', '1', { httpOnly: true, sameSite: 'lax', secure: true, maxAge: 60 * 60 * 24, path: '/' })
    return res
  } catch (e) {
    return NextResponse.json({ status: 'error', message: 'Invalid request' }, { status: 400 })
  }
}


