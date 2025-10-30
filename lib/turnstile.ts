export async function verifyTurnstileToken(token: string, ip?: string): Promise<{ success: boolean; error?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error('[Turnstile] Missing TURNSTILE_SECRET_KEY');
    return { success: false, error: 'Server misconfiguration' }
  }

  try {
    const formData = new FormData()
    formData.append('secret', secret)
    formData.append('response', token)
    if (ip) formData.append('remoteip', ip)

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (data.success === true) return { success: true }
    const code = Array.isArray(data['error-codes']) && data['error-codes'][0]
    return { success: false, error: code || 'verification_failed' }
  } catch (err) {
    console.error('[Turnstile] Verification error:', err)
    return { success: false, error: 'network_error' }
  }
}


