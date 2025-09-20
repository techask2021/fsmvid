import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// Set timeout for video processing - Vercel has a maximum of 60 seconds for serverless functions
export const maxDuration = 60; // 60 seconds (Vercel limit)

export async function POST(request: NextRequest) {
  try {
    // Extract the m3u8 URL from the request
    const { url, title = 'dailymotion_video' } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
    }

    if (!url.includes('.m3u8')) {
      return NextResponse.json({ error: 'URL must be an m3u8 stream' }, { status: 400 });
    }

    console.log(`Processing HLS stream: ${url}`);

    // Determine platform-specific headers
    let referer = 'https://www.dailymotion.com/';
    let origin = 'https://www.dailymotion.com';
    
    if (url.includes('bsky.app') || title.includes('bsky')) {
      referer = 'https://bsky.app/';
      origin = 'https://bsky.app';
    } else if (url.includes('reddit.com') || title.includes('reddit')) {
      referer = 'https://www.reddit.com/';
      origin = 'https://www.reddit.com';
    }

    // Fetch the m3u8 manifest
    const m3u8Response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': referer,
        'Origin': origin
      }
    });

    if (!m3u8Response.ok) {
      return NextResponse.json({ 
        error: `Failed to fetch m3u8 content: ${m3u8Response.status}` 
      }, { status: 500 });
    }

    // Read the manifest content
    let manifestContent = await m3u8Response.text();
    
    // Parse the manifest to detect if it's a master playlist or a media playlist
    const isMasterPlaylist = manifestContent.includes('#EXT-X-STREAM-INF');

    // If it's a master playlist, we need to extract the highest quality stream URL
    let mediaPlaylistUrl = url;
    if (isMasterPlaylist) {
      // Simple parsing to find the highest bitrate stream
      const streams = manifestContent.split('#EXT-X-STREAM-INF:')
        .filter(str => str.trim().length > 0)
        .map(str => {
          const metaAndUrl = str.split('\n').filter(line => line.trim().length > 0);
          const meta = metaAndUrl[0] || '';
          const streamUrl = metaAndUrl[1] || '';
          
          // Extract bandwidth (bitrate)
          const bandwidthMatch = meta.match(/BANDWIDTH=(\d+)/);
          const bandwidth = bandwidthMatch ? parseInt(bandwidthMatch[1]) : 0;
          
          // Extract resolution if available
          const resolutionMatch = meta.match(/RESOLUTION=(\d+x\d+)/);
          const resolution = resolutionMatch ? resolutionMatch[1] : '';
          
          return { bandwidth, resolution, url: streamUrl };
        })
        .sort((a, b) => b.bandwidth - a.bandwidth); // Sort by bandwidth (highest first)
      
      if (streams.length > 0 && streams[0].url) {
        // Get the highest quality stream
        const highestQualityStream = streams[0];
        console.log(`Selected highest quality stream: ${highestQualityStream.resolution || 'Unknown'} (${highestQualityStream.bandwidth} bps)`);
        
        // Resolve relative URL if needed
        mediaPlaylistUrl = new URL(highestQualityStream.url, url).toString();
        
        // Fetch the media playlist for that specific stream
        const mediaPlaylistResponse = await fetch(mediaPlaylistUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': referer,
            'Origin': origin
          }
        });
        
        if (mediaPlaylistResponse.ok) {
          manifestContent = await mediaPlaylistResponse.text();
        } else {
          console.error(`Failed to fetch media playlist: ${mediaPlaylistResponse.status}`);
        }
      }
    }

    // Process the manifest content for client-side usage
    // Fix any relative URLs in the playlist to absolute URLs
    const baseUrl = new URL('./', mediaPlaylistUrl).toString();
    manifestContent = manifestContent.replace(/^([^#][^:]*(?!:\/\/).*)$/gm, (match) => {
      return new URL(match, baseUrl).toString();
    });

    // Create a sanitized filename
    const sanitizedTitle = title
      .replace(/[^\w\s-]/g, '') // Remove non-word chars
      .trim()
      .replace(/\s+/g, '_'); // Replace spaces with underscores
    
    const filename = `${sanitizedTitle}.m3u8`;

    // Return the processed stream with headers
    const response = new NextResponse(manifestContent);
    response.headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    response.headers.set('Content-Type', 'application/vnd.apple.mpegurl');
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.headers.set('X-Original-URL', mediaPlaylistUrl); // Include original URL for reference
    
    return response;
  } catch (error) {
    console.error('HLS download API error:', error);
    
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Determine platform-specific headers
    let referer = 'https://www.dailymotion.com/';
    let origin = 'https://www.dailymotion.com';
    
    if (url.includes('bsky.app')) {
      referer = 'https://bsky.app/';
      origin = 'https://bsky.app';
    } else if (url.includes('reddit.com')) {
      referer = 'https://www.reddit.com/';
      origin = 'https://www.reddit.com';
    }

    // Fetch with platform-specific headers
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': referer,
        'Origin': origin
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.statusText}`);
    }

    // Get the content type from the response
    const contentType = response.headers.get('content-type') || 'application/vnd.apple.mpegurl';
    
    // Create response with proper headers
    const headers = new Headers({
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="video${contentType.includes('m3u8') ? '.m3u8' : '.mp4'}"`,
      // Add CORS headers
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });

    // Stream the response
    return new NextResponse(response.body, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to download video' },
      { status: 500 }
    );
  }
}