import { type NextRequest, NextResponse } from "next/server"
nexport const runtime = "edge"

export async function POST(request: NextRequest) {
  const body = await request.json()

  // Log the metrics to your analytics service
  console.log("Web Vitals:", body)

  // Here you would typically send this data to your analytics service

  return NextResponse.json({ success: true })
}
