import { NextResponse } from 'next/server';
export const runtime = "edge"

export async function GET() {
  return new NextResponse(
    'This service has been discontinued. Please visit our homepage for alternative solutions.',
    {
      status: 410,
      statusText: 'Gone',
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}

export const dynamic = 'force-static'; 