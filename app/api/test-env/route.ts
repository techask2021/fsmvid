import { NextResponse } from 'next/server';

export const runtime = 'edge';

// Temporary debug endpoint to verify environment variables are accessible
export async function GET() {
  const envVars = {
    hasZmApiKey: !!process.env.NEXT_PUBLIC_ZM_API_KEY,
    hasZmApiUrl: !!process.env.NEXT_PUBLIC_ZM_API_URL,
    hasSanityProjectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    hasSanityToken: !!process.env.SANITY_API_TOKEN,
    hasUpstashUrl: !!process.env.UPSTASH_REDIS_REST_URL,
    hasUpstashToken: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    hasRecaptchaSecret: !!process.env.RECAPTCHA_SECRET_KEY,
    hasResendKey: !!process.env.RESEND_API_KEY,
    // Show partial values to verify they're loaded
    zmApiKeyPreview: process.env.NEXT_PUBLIC_ZM_API_KEY?.substring(0, 3) + '...',
    zmApiUrl: process.env.NEXT_PUBLIC_ZM_API_URL,
    runtime: 'edge',
    platform: 'cloudflare-workers',
  };

  return NextResponse.json(envVars);
}
