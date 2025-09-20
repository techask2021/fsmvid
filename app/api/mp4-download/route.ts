import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { join } from 'path';
import { writeFile, unlink, readFile, stat } from 'fs/promises';
import { randomBytes } from 'crypto';
import { Readable } from 'stream';

export const maxDuration = 60; // Maximum allowed duration for Vercel Hobby plan
export const dynamic = 'force-dynamic';

// Helper function to create a temporary file path
function getTempFilePath() {
  const tempDir = process.env.TEMP || '/tmp';
  const randomName = randomBytes(16).toString('hex');
  return join(tempDir, `${randomName}.mp4`);
}

async function downloadVideo(url: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Add user agent and headers for Dailymotion
    const headers = [
      '-headers', 
      'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\r\nReferer: https://www.dailymotion.com/\r\nOrigin: https://www.dailymotion.com'
    ];

    const ffmpeg = spawn('ffmpeg', [
      ...headers,
      '-i', url,
      '-c:v', 'copy',           // Copy video stream without re-encoding
      '-c:a', 'copy',           // Copy audio stream without re-encoding
      '-bsf:a', 'aac_adtstoasc', // Fix audio stream
      '-f', 'mp4',              // Force MP4 format
      '-movflags', 'frag_keyframe+empty_moov+default_base_moof',  // Enable fragmented output
      '-max_muxing_queue_size', '1024',  // Increase muxing queue size
      '-y',                     // Overwrite output file
      outputPath
    ]);

    let errorOutput = '';
    
    ffmpeg.stderr.on('data', (data) => {
      const message = data.toString();
      errorOutput += message;
      console.log('FFmpeg:', message);
    });

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg failed with code ${code}: ${errorOutput}`));
      }
    });

    ffmpeg.on('error', (err) => {
      reject(err);
    });
  });
}

export async function POST(request: NextRequest) {
  const tempFilePath = getTempFilePath();
  
  try {
    // Check if request body exists
    const text = await request.text();
    if (!text) {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 });
    }

    // Parse the JSON safely
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    const { url, title = 'dailymotion_video' } = data;

    if (!url) {
      return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
    }

    console.log(`Processing MP4 download for: ${url}`);

    // Create a sanitized filename
    const sanitizedTitle = title
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '_');
    
    const filename = `${sanitizedTitle}.mp4`;

    // For MP4 URLs, directly download and save
    if (url.includes('.mp4')) {
      const videoResponse = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.dailymotion.com/',
          'Origin': 'https://www.dailymotion.com'
        }
      });

      if (!videoResponse.ok) {
        throw new Error(`Failed to fetch video: ${videoResponse.statusText}`);
      }

      const buffer = await videoResponse.arrayBuffer();
      await writeFile(tempFilePath, Buffer.from(buffer));
    } else {
      // For m3u8, convert to MP4
      console.log('Converting HLS stream to MP4...');
      await downloadVideo(url, tempFilePath);
    }

    // Verify the file exists and has content
    const stats = await stat(tempFilePath);
    if (stats.size === 0) {
      throw new Error('Generated video file is empty');
    }

    // Read the file and stream it to the response
    const fileBuffer = await readFile(tempFilePath);
    const response = new NextResponse(fileBuffer);

    response.headers.set('Content-Type', 'video/mp4');
    response.headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    response.headers.set('Content-Length', stats.size.toString());

    // Clean up temp file immediately after sending
    await unlink(tempFilePath);

    return response;
  } catch (error) {
    // Clean up temp file if it exists
    try {
      await unlink(tempFilePath);
    } catch (cleanupError) {
      console.error('Failed to delete temp file:', cleanupError);
    }

    console.error('MP4 download API error:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    }, { status: 500 });
  }
}