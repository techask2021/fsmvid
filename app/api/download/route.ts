import { type NextRequest, NextResponse } from "next/server"
import { detectPlatform } from "@/lib/platform-detector"

export const runtime = "nodejs" // Use Node.js runtime for better compatibility with media CDNs
export const maxDuration = 60 // Allow up to 60 seconds for large file downloads

export async function POST(request: NextRequest) {
  try {
    // Destructure platform from the request body as well
    const { url, filename, platform: originalPlatform } = await request.json();

    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }

    if (!filename) {
      return NextResponse.json({ message: "Filename is required" }, { status: 400 });
    }

    // Use the platform passed from the client, as 'url' is now a direct media link
    // and detectPlatform(directMediaUrl) would likely fail or be incorrect.
    const platformToUse = originalPlatform || detectPlatform(url) || ''; // Fallback if not provided, though it should be
    const isTikTok = platformToUse === 'tiktok' || url.includes('tiktok.com') || url.includes('tiktokcdn.com');
    const isDailymotion = platformToUse === 'dailymotion';
    const isWeibo = platformToUse === 'weibo' || url.includes('weibo.com') || url.includes('weibocdn.com') || url.includes('miaopai.com');
    const isBluesky = platformToUse === 'bsky';
    const isReddit = platformToUse === 'reddit';
    const isYoutube = platformToUse === 'youtube';
    const isMixcloud = platformToUse === 'mixcloud' || url.includes('mixcloud.stream');
    const isSoundcloud = platformToUse === 'soundcloud' || url.includes('soundcloud.com') || url.includes('sndcdn.com');
    const isSpotify = platformToUse === 'spotify' || url.includes('spotify.com') || url.includes('spotifycdn.com');
    const isGoogleVideoLink = url.includes('.googlevideo.com') || url.includes('youtube.com');

    console.log(`Downloading file from ${url} (Original Platform: ${platformToUse})`);
    
    // Handle special case for m3u8 streaming URLs (common with Dailymotion)
    const isM3u8 = url.includes('.m3u8');
    
    // Set proper headers based on the platform
    const headers: HeadersInit = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', // Updated User-Agent
      'Accept': '*/*',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    };
    
    // Add platform-specific headers
    if (isTikTok) {
      headers['Referer'] = 'https://www.tiktok.com/';
      headers['Origin'] = 'https://www.tiktok.com';
      headers['Accept'] = 'video/mp4,video/*;q=0.9,*/*;q=0.8';
      headers['Sec-Fetch-Dest'] = 'video';
      headers['Sec-Fetch-Mode'] = 'no-cors';
      headers['Sec-Fetch-Site'] = 'cross-site';
    } else if (isDailymotion) {
      headers['Referer'] = 'https://www.dailymotion.com/';
      headers['Origin'] = 'https://www.dailymotion.com';
    } else if (isWeibo) {
      headers['Referer'] = 'https://weibo.com/';
      headers['Origin'] = 'https://weibo.com';
      // Weibo requires these headers to avoid 403
      headers['Accept'] = 'video/mp4,video/*;q=0.9,*/*;q=0.8';
      headers['Accept-Language'] = 'zh-CN,zh;q=0.9,en;q=0.8';
      headers['Sec-Fetch-Dest'] = 'video';
      headers['Sec-Fetch-Mode'] = 'no-cors';
      headers['Sec-Fetch-Site'] = 'cross-site';
    } else if (isBluesky) {
      headers['Referer'] = 'https://bsky.app/';
      headers['Origin'] = 'https://bsky.app';
    } else if (isReddit) {
      headers['Referer'] = 'https://www.reddit.com/';
      headers['Origin'] = 'https://www.reddit.com';
    } else if (isMixcloud) {
      headers['Referer'] = 'https://www.mixcloud.com/';
      headers['Origin'] = 'https://www.mixcloud.com';
      headers['Accept'] = 'audio/mpeg,audio/*;q=0.9,*/*;q=0.8';
    } else if (isSoundcloud) {
      headers['Referer'] = 'https://soundcloud.com/';
      headers['Origin'] = 'https://soundcloud.com';
      headers['Accept'] = 'audio/mpeg,audio/*;q=0.9,*/*;q=0.8';
      // SoundCloud requires these specific headers to avoid 401
      headers['Sec-Fetch-Dest'] = 'audio';
      headers['Sec-Fetch-Mode'] = 'no-cors';
      headers['Sec-Fetch-Site'] = 'cross-site';
    } else if (isSpotify) {
      headers['Referer'] = 'https://open.spotify.com/';
      headers['Origin'] = 'https://open.spotify.com';
      headers['Accept'] = 'audio/mpeg,audio/*;q=0.9,*/*;q=0.8';
      headers['Sec-Fetch-Dest'] = 'audio';
      headers['Sec-Fetch-Mode'] = 'no-cors';
      headers['Sec-Fetch-Site'] = 'cross-site';
    }

    // Apply YouTube/googlevideo specific headers when needed (even if platform is 'universal')
    if (isYoutube || isGoogleVideoLink) {
      headers['Referer'] = 'https://www.youtube.com/';
      headers['Origin'] = 'https://www.youtube.com';
      headers['Accept-Language'] = 'en-US,en;q=0.9';
      headers['Accept-Encoding'] = 'gzip, deflate, br';
      headers['DNT'] = '1';
      headers['Connection'] = 'keep-alive';
      headers['Upgrade-Insecure-Requests'] = '1';
      // Some googlevideo endpoints require a Range header to avoid 403
      if (!('Range' in headers)) {
        headers['Range'] = 'bytes=0-';
      }
    }
    
    // Fetch the file from the URL
    const fileResponse = await fetch(url, {
      headers,
      redirect: 'follow' // Follow redirects which are common with streaming services
    })

    if (!fileResponse.ok) {
      console.error(`Download failed: ${fileResponse.status} ${fileResponse.statusText}`);
      return NextResponse.json({ 
        message: `Failed to download file: ${fileResponse.status} ${fileResponse.statusText}`,
        url: url
      }, { status: fileResponse.status });
    }

    // For m3u8 files, we need special handling
    if (isM3u8) {
      try {
        // Get the original content
        const content = await fileResponse.text();
        
        // Return the m3u8 file with proper headers
        const response = new NextResponse(content);
        response.headers.set('Content-Disposition', `attachment; filename="${filename.replace(/\.(mp4|streaming)$/, '.m3u8')}"`);
        response.headers.set('Content-Type', 'application/vnd.apple.mpegurl');
        response.headers.set('Content-Length', `${content.length}`);
        
        return response;
      } catch (m3u8Error) {
        console.error('Error processing m3u8 file:', m3u8Error);
        return NextResponse.json({ message: 'Error processing m3u8 streaming file' }, { status: 500 });
      }
    }
    
    try {
      // Stream the file data instead of buffering the whole file in memory
      const response = new NextResponse(fileResponse.body as any)
      
      // Get content type from response or infer from filename
      let contentType = fileResponse.headers.get('Content-Type') || 'application/octet-stream';
      
      // Fix content type based on file extension
      if (filename.endsWith('.mp4') && !contentType.includes('mp4')) {
        contentType = 'video/mp4';
      } else if (filename.endsWith('.m4a') && !contentType.includes('m4a') && !contentType.includes('audio')) {
        contentType = 'audio/mp4';
      } else if (filename.endsWith('.mp3') && !contentType.includes('mp3') && !contentType.includes('audio')) {
        contentType = 'audio/mpeg';
      } else if (filename.endsWith('.webm') && !contentType.includes('webm')) {
        contentType = 'video/webm';
      }
      
      // Set headers for download with proper encoding for non-ASCII characters
      // Use RFC 5987 encoding for filenames with special characters
      const encodedFilename = encodeURIComponent(filename);
      response.headers.set('Content-Disposition', `attachment; filename="${filename.replace(/[^\x00-\x7F]/g, '_')}"; filename*=UTF-8''${encodedFilename}`)
      response.headers.set('Content-Type', contentType)
      const contentLength = fileResponse.headers.get('Content-Length')
      if (contentLength) {
        response.headers.set('Content-Length', contentLength)
      }
      
      return response
    } catch (downloadError) {
      console.error('Error downloading file:', downloadError);
      return NextResponse.json({ message: 'Error downloading file content' }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Download error:", error)
    return NextResponse.json({ message: error.message || "An error occurred" }, { status: 500 })
  }
}
