import { NextResponse } from 'next/server';

export const runtime = 'edge';

// Ultra-simple test endpoint - no dependencies
export async function GET() {
  try {
    return NextResponse.json({
      status: 'success',
      message: 'Simple test endpoint working',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    return NextResponse.json({
      status: 'success',
      message: 'POST request working'
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
