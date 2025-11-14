import { NextRequest } from "next/server"
nexport const runtime = "edge"

/**
 * API endpoint that handles Content Security Policy violation reports
 * This can be used to monitor policy violations in production
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the CSP violation report
    const report = await request.json()
    
    // Log the violation report (you could store in a database or send to a monitoring service)
    console.error("CSP Violation:", JSON.stringify(report, null, 2))
    
    // In production, you might want to send this to a logging service
    // like Sentry, LogRocket, or a custom monitoring solution
    
    return new Response(null, { status: 204 }) // No content response
  } catch (error) {
    console.error("Error processing CSP report:", error)
    return new Response(JSON.stringify({ error: "Failed to process report" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
} 