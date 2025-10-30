'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window { turnstile?: any }
}

export default function TurnstileGate() {
  const mounted = useRef(false)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true

    if (!siteKey) return

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      window.turnstile?.render('#turnstile-container', {
        sitekey: siteKey,
        callback: async (token: string) => {
          try {
            await fetch('/api/verify-human', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token })
            })
            // cookie set; refresh to enable ads
            location.reload()
          } catch {}
        },
        'error-callback': () => {},
        theme: 'auto',
        size: 'invisible',
        action: 'pageview'
      })
    }
    document.body.appendChild(script)
  }, [siteKey])

  if (!siteKey) return null
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div id="turnstile-container" />
    </div>
  )
}


