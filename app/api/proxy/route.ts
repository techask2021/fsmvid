import { type NextRequest, NextResponse } from "next/server"
import { withRateLimit, addRateLimitHeaders } from "@/lib/rate-limit-middleware"
import { RATE_LIMITS } from "@/lib/rate-limit"
import { getCachedResponse, setCachedResponse } from "@/lib/api-cache"
import { trackAndDetectBot, isSuspiciousPattern } from "@/lib/bot-detector"
import { getClientIP } from "@/lib/rate-limit"
import { validateRequest } from "@/lib/request-validator"
import { cacheYouTubeDownloadUrl } from "@/lib/youtube-download-cache"

/**
 * Cache YouTube download URLs and replace with proxied URLs
 * This prevents 403 errors by routing downloads through our server
 */
async function cacheYouTubeUrls(responseData: any, originalVideoUrl: string, videoTitle: string): Promise<any> {
  console.info('[YOUTUBE CACHE] Processing YouTube URLs for caching...')
  
  try {
    // Handle medias array format (common YouTube API response)
    if (responseData.medias && Array.isArray(responseData.medias)) {
      const proxiedMedias = await Promise.all(
        responseData.medias.map(async (media: any) => {
          if (media.url && media.url.includes('googlevideo.com')) {
            // Extract quality and format
            const quality = media.label || media.quality || media.height ? `${media.height}p` : 'unknown'
            const format = media.ext || media.extension || 'mp4'
            const filename = `${videoTitle.replace(/[^a-z0-9]/gi, '_').substring(0, 50)}_${quality}.${format}`
            
            // Cache the URL and get proxied path
            const proxiedUrl = await cacheYouTubeDownloadUrl(
              media.url,
              filename,
              quality,
              format,
              videoTitle,
              originalVideoUrl
            )
            
            console.info(`[YOUTUBE CACHE] ✓ Cached: ${quality} ${format}`)
            
            // Return media object with proxied URL
            return {
              ...media,
              url: proxiedUrl,
              originalUrl: media.url, // Keep original for reference
            }
          }
          return media
        })
      )
      
      return {
        ...responseData,
        medias: proxiedMedias,
      }
    }
    
    // Handle formats object format
    if (responseData.formats && typeof responseData.formats === 'object') {
      const proxiedFormats: any = {}
      
      for (const [formatType, qualities] of Object.entries(responseData.formats)) {
        proxiedFormats[formatType] = {}
        
        for (const [quality, details] of Object.entries(qualities as any)) {
          const detailsObj = details as any
          
          if (detailsObj.url && detailsObj.url.includes('googlevideo.com')) {
            const filename = `${videoTitle.replace(/[^a-z0-9]/gi, '_').substring(0, 50)}_${quality}.${formatType}`
            
            // Cache the URL and get proxied path
            const proxiedUrl = await cacheYouTubeDownloadUrl(
              detailsObj.url,
              filename,
              quality,
              formatType,
              videoTitle,
              originalVideoUrl
            )
            
            console.info(`[YOUTUBE CACHE] ✓ Cached: ${quality} ${formatType}`)
            
            proxiedFormats[formatType][quality] = {
              ...detailsObj,
              url: proxiedUrl,
              originalUrl: detailsObj.url,
            }
          } else {
            proxiedFormats[formatType][quality] = detailsObj
          }
        }
      }
      
      return {
        ...responseData,
        formats: proxiedFormats,
      }
    }
    
    console.warn('[YOUTUBE CACHE] No YouTube URLs found to cache')
    return responseData
    
  } catch (error) {
    console.error('[YOUTUBE CACHE] Error caching URLs:', error)
    // Return original data if caching fails
    return responseData
  }
}

// This is a proxy function to handle the API request
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    const { url, platform, isHomepage } = body
    
    // ALWAYS apply Redis rate limiting to protect API from bots
    // This applies to BOTH homepage and tool pages
    const rateLimitResult = await withRateLimit(request, RATE_LIMITS.PROXY)
    if (!rateLimitResult.success) {
      console.info(`[RATE LIMIT] Blocked request for platform: ${platform}`)
      return rateLimitResult.response!
    }
    
    // Smart bot detection: Auto-block at 50 requests in 10 minutes OR 12 requests in 10 seconds
    const clientIP = getClientIP(request.headers)
    const botCheck = trackAndDetectBot(clientIP)
    
    if (botCheck.isBot) {
      console.warn(`[BOT DETECTOR] Blocked bot IP: ${clientIP} - ${botCheck.reason}`)
      return NextResponse.json(
        {
          status: 'error',
          message: 'Too many requests detected. Your IP has been temporarily blocked.',
        },
        { status: 429 }
      )
    }
    
    // Advanced validation: Check origin, referer, User-Agent, and browser headers
    const userAgent = request.headers.get('user-agent')
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')
    
    const validation = validateRequest(origin, referer, userAgent, request.headers)
    
    // If bot detected via User-Agent or missing headers, BLOCK immediately
    if (validation.isBot) {
      console.warn(`[BOT DETECTOR] Bot detected via advanced checks from ${clientIP}: ${validation.reasons.join(', ')}`)
      return NextResponse.json(
        {
          status: 'error',
          message: 'Bot detected. Access denied.',
        },
        { status: 403 }
      )
    }
    
    if (!validation.valid) {
      console.warn(`[REQUEST VALIDATOR] Suspicious request from ${clientIP}: ${validation.reasons.join(', ')}`)
      
      // If recommendedAction is 'block', reject immediately
      if (validation.recommendedAction === 'block') {
        return NextResponse.json(
          {
            status: 'error',
            message: 'Invalid request. Please use the official website.',
          },
          { status: 403 }
        )
      }
      
      // If 'strict_limit', apply additional strict rate limit (50/hour instead of 200)
      if (validation.recommendedAction === 'strict_limit') {
        console.info(`[REQUEST VALIDATOR] Applying strict rate limit (50/hour) for direct API call from ${clientIP}`)
        
        // Apply strict rate limit for suspected bots
        const strictLimitResult = await withRateLimit(request, RATE_LIMITS.PROXY_STRICT)
        if (!strictLimitResult.success) {
          console.warn(`[RATE LIMIT] Blocked suspected bot ${clientIP} (exceeded 50/hour strict limit)`)
          return strictLimitResult.response!
        }
      }
    }
    
    // Note: Client-side download limit (3 per platform) is only on homepage
    // But API rate limiting (200/hour) applies to ALL pages for security
    
    console.info(`[PROXY] Request for ${platform} - Homepage: ${isHomepage === true ? 'true' : 'false'}`)

    if (!url || !platform) {
      return NextResponse.json({ status: "error", message: "URL and platform are required" }, { status: 400 })
    }

    // Enable debug mode to see verbose logs (set DEBUG_MODE=true in .env)
    const DEBUG_MODE = process.env.DEBUG_MODE === 'true';

    // Normalize URLs for different platforms
    let processUrl = url;
    
    // Normalize YouTube Shorts URLs to regular watch URLs
    if ((platform === 'youtube' || url.includes('youtube.com/shorts/') || url.includes('youtu.be/shorts/')) && url.includes('/shorts/')) {
      const videoId = url.split('/shorts/').pop()?.split('?')[0].split('#')[0].split('&')[0];
      if (videoId) {
        processUrl = `https://www.youtube.com/watch?v=${videoId}`;
        if (DEBUG_MODE) console.log("✅ Normalized YouTube Shorts URL:", processUrl);
      }
    }
    
    // Normalize YouTube short links (youtu.be)
    if ((platform === 'youtube' || url.includes('youtu.be/')) && url.includes('youtu.be/') && !url.includes('/shorts/')) {
      const videoId = url.split('youtu.be/').pop()?.split('?')[0].split('#')[0].split('&')[0];
      if (videoId) {
        processUrl = `https://www.youtube.com/watch?v=${videoId}`;
        if (DEBUG_MODE) console.log("✅ Normalized youtu.be URL:", processUrl);
      }
    }
    
    // Normalize Dailymotion short URLs
    if (platform === 'dailymotion' && url.includes('dai.ly/')) {
      // Convert dai.ly short URLs to full dailymotion URLs
      const videoId = url.split('dai.ly/').pop()?.split('?')[0].split('#')[0];
      if (videoId) {
        processUrl = `https://www.dailymotion.com/video/${videoId}`;
        if (DEBUG_MODE) console.log("✅ Normalized Dailymotion URL:", processUrl);
      }
    }

    // Normalize Tumblr URLs
    if (platform === 'tumblr') {
      // Ensure clean Tumblr post URLs
      if (url.includes('tumblr.com/post/')) {
        // Remove any trailing parameters that might cause issues
        processUrl = url.split('?')[0].split('#')[0];
        if (DEBUG_MODE) console.log("✅ Normalized Tumblr URL:", processUrl);
      }
    }
    
    // Normalize Snapchat URLs
    if (platform === 'snapchat') {
      // Ensure clean Snapchat URLs
      processUrl = url.split('?')[0].split('#')[0];
      if (DEBUG_MODE) console.log("✅ Normalized Snapchat URL:", processUrl);
    }
    
    // Normalize Reddit URLs
    if (platform === 'reddit' || (platform === 'universal' && url.includes('reddit.com'))) {
      // Ensure Reddit URLs are in the proper format
      if (url.includes('redd.it/')) {
        // Convert redd.it short URLs to full reddit URLs
        const postId = url.split('redd.it/').pop()?.split('?')[0].split('#')[0];
        if (postId) {
          processUrl = `https://www.reddit.com/comments/${postId}`;
          if (DEBUG_MODE) console.log("✅ Normalized Reddit URL:", processUrl);
        }
      } else if (url.includes('reddit.com/r/') && !url.includes('/comments/')) {
        // Convert subreddit post URLs to comment URLs
        const match = url.match(/reddit\.com\/r\/([^\/]+)\/comments\/([^\/]+)/);
        if (match) {
          processUrl = `https://www.reddit.com/comments/${match[2]}`;
          if (DEBUG_MODE) console.log("✅ Normalized Reddit URL:", processUrl);
        }
      }
    }

    // Check cache first to avoid unnecessary API calls
    const cachedData = getCachedResponse(processUrl)
    if (cachedData) {
      console.info(`[CACHE] Returning cached data for ${platform}`)
      return NextResponse.json(cachedData, { status: 200 })
    }

    // Get the new ZM API credentials from environment variables
    const apiKey = process.env.NEXT_PUBLIC_ZM_API_KEY
    const apiUrl = process.env.NEXT_PUBLIC_ZM_API_URL

    if (!apiKey || !apiUrl) {
      return NextResponse.json({ status: "error", message: "API configuration is missing" }, { status: 500 })
    }

    // Use the new ZM API endpoint with proper headers
    const options = {
      method: "POST",
      headers: {
        "apikey": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: processUrl })
    }

    // Minimal logging for production
    if (DEBUG_MODE) {
      console.log(`Proxying POST request to: ${apiUrl}`);
      console.log("Request body:", JSON.stringify({ url: processUrl }));
      console.log("Using API key:", apiKey.substring(0, 5) + "..." + apiKey.substring(apiKey.length - 5));
    }

    // Retry logic for handling intermittent failures
    const maxRetries = 5;
    const retryDelay = 1500; // 1.5 seconds between retries
    let lastError = null;
    let data = null;
    let response = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Make the request to the new ZM API endpoint using POST with body
        if (DEBUG_MODE) {
          console.info(`Making POST request to: ${apiUrl} (Attempt ${attempt}/${maxRetries})`);
        }
        
        response = await fetch(apiUrl, options)
        data = await response.json()
        
        // Only log in debug mode or on errors
        if (DEBUG_MODE) {
          console.info("ZM API Status:", response.status)
          console.info("ZM API Response:", JSON.stringify(data).substring(0, 200) + "...")
        }
        
        // Check if we got a successful response with media
        const hasMedia = data.medias || data.formats;
        const isNoMediaError = data.error === true && data.message && data.message.toLowerCase().includes("no medias found");
        
        // If successful or it's a permanent error (not a temporary "no media" issue), break the loop
        if (response.ok && hasMedia && !isNoMediaError) {
          if (DEBUG_MODE) console.info(`✓ Success on attempt ${attempt}`);
          break;
        }
        
        // If it's a "no medias found" error and we have retries left, try again
        if (isNoMediaError && attempt < maxRetries) {
          if (DEBUG_MODE) console.info(`⚠ No medias found on attempt ${attempt}, retrying in ${retryDelay}ms...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          continue;
        }
        
        // If it's another type of error, break immediately
        if (!response.ok || data.error === true) {
          lastError = data;
          break;
        }
        
      } catch (fetchError) {
        // Only log critical fetch errors (not API errors)
        if (DEBUG_MODE || attempt === maxRetries) {
          console.error(`✗ Fetch error on attempt ${attempt}:`, fetchError);
        }
        lastError = fetchError;
        
        // If we have retries left, wait and try again
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          continue;
        }
      }
    }
    
    // Use the last response and data from the loop
    if (!response || !data) {
      // Only log critical connection failures
      console.error("⚠️ CRITICAL: All retry attempts failed - API unreachable");
      return NextResponse.json({ 
        status: "error", 
        message: "Failed to connect to the video processing service after multiple attempts" 
      }, { 
        status: 500 
      })
    }

      // Return error if the API call fails
      // Only log non-503 errors (503 is too common/noisy)
      if (!response.ok) {
        // Only log if it's not a common temporary error
        const isTemporaryError = data.code === 'NETWORK_UNAVAILABLE' || response.status === 503;
        
        if (DEBUG_MODE || (!isTemporaryError && response.status >= 500)) {
          console.error(`API Error (${response.status}):`, data.message || data.error);
        }
        
        // Provide user-friendly messages for common API errors
        let userMessage = data.message || "Unknown error";
        
        if (data.code === "NETWORK_UNAVAILABLE" || response.status === 503) {
          userMessage = "The video processing service is temporarily unavailable. Please try again in a few moments.";
        } else if (response.status === 429) {
          userMessage = "Too many requests. Please wait a moment and try again.";
        } else if (response.status >= 500) {
          userMessage = "The video processing service is experiencing issues. Please try again later.";
        }
        
        return NextResponse.json({ 
          status: "error", 
          message: userMessage,
          details: data
        }, { 
          status: response.status 
        })
      }

      // Even if response.ok is true, the API might have its own error flag/message
      if (data.error === true || (data.status && data.status !== 200 && data.status !== "success")) {
        // Handle "No medias found" errors with platform-specific messages
        if (data.message && data.message.toLowerCase().includes("no medias found")) {
          const errorStatus = 404;
          // Don't log "not found" errors - they're expected when users submit invalid URLs
          if (DEBUG_MODE) {
            console.error("API Error (logical):", data.message || "No media found");
          }
          
          // Provide platform-specific error messages
          let customMessage = data.message;
          if (platform === 'tumblr') {
            customMessage = "This Tumblr content cannot be downloaded. It may be private or removed.";
          } else if (platform === 'snapchat') {
            customMessage = "This Snapchat content cannot be downloaded. Only public Spotlight videos and public stories are supported.";
          }
          
          return NextResponse.json({
            status: "error",
            message: customMessage,
            details: data
          }, {
            status: errorStatus 
          });
        }
        
        // For other errors, use a 422 or 404 if appropriate
        const errorStatus = (data.status && data.status >= 400) ? data.status : 422;
        // Only log non-404 errors (404s are too common)
        if (DEBUG_MODE || errorStatus !== 404) {
          console.error("API Error (logical):", data.message || "No media found");
        }
        return NextResponse.json({
          status: "error",
          message: data.message || "Failed to process video or no media found.",
          details: data
        }, {
          status: errorStatus 
        });
      }
      
      // Check if the API response has the expected format (medias or formats)
      // The Bilibili "No medias found" case returns data.medias as an empty object/array, so check for that too.
      const noMediasFoundInData = data.medias && ( (Array.isArray(data.medias) && data.medias.length === 0) || (typeof data.medias === 'object' && Object.keys(data.medias).length === 0 && !Array.isArray(data.medias)) );

      if (!data.formats && !data.medias || noMediasFoundInData) {
        // If "No medias found" was the specific message, we should have caught it above.
        // This block now handles cases where the structure is unexpected but no explicit error was flagged by the API.
        if (data.message && data.message.toLowerCase().includes("no medias found")) {
             if (DEBUG_MODE) {
               console.warn("API Warning: No medias found (unexpected path)");
             }
             return NextResponse.json({
                status: "error",
                message: data.message,
                details: data
             }, { status: 404 });
        }

        // Try to transform the response if it's not in the expected format
        if (data.downloadOptions || data.links || data.urls || (platform === 'youtube' && data.streamingData) || data.medias) {
          // Transform different response formats to our standard format
          const formats: any = {}
          
          if (data.downloadOptions) {
            data.downloadOptions.forEach((option: any) => {
              if (!formats[option.format]) formats[option.format] = {}
              formats[option.format][option.quality] = {
                url: option.url,
                size: option.size
              }
            })
          } else if (platform === 'youtube' && data.streamingData) {
            // Process YouTube's streamingData format from the new API
            const videoFormats = [...(data.streamingData.formats || []), ...(data.streamingData.adaptiveFormats || [])];
            
            if (!formats["mp4"]) formats["mp4"] = {}
            if (!formats["mp3"]) formats["mp3"] = {}
            
            videoFormats.forEach((format: any) => {
              if (format.url) {
                const quality = format.qualityLabel || format.quality || (format.audioQuality ? 'audio' : 'video');
                const mimeType = format.mimeType || '';
                const isAudio = mimeType.includes('audio') || format.audioQuality;
                
                if (isAudio) {
                  formats["mp3"][quality] = {
                    url: format.url,
                    size: Math.round(format.contentLength / (1024 * 1024)) + " MB" || "Unknown"
                  }
                } else {
                  formats["mp4"][quality] = {
                    url: format.url,
                    size: Math.round(format.contentLength / (1024 * 1024)) + " MB" || "Unknown"
                  }
                }
              }
            });
          } else if (data.links || data.urls) {
            const links = data.links || data.urls
            
            // For YouTube, the response typically has a links object with quality keys
            if (platform === 'youtube') {
              if (!formats["mp4"]) formats["mp4"] = {}
              if (!formats["mp3"]) formats["mp3"] = {}
              
              Object.entries(links).forEach(([quality, url]) => {
                if (typeof quality === 'string' && typeof url === 'string') {
                  if (quality.includes('audio')) {
                    formats["mp3"][quality] = {
                      url: url,
                      size: data.sizes?.[quality] || "Unknown"
                    }
                  } else {
                    formats["mp4"][quality] = {
                      url: url,
                      size: data.sizes?.[quality] || "Unknown"
                    }
                  }
                }
              })
            } else {
              // Generic links handling for other platforms
              Object.keys(links).forEach((key) => {
                if (!formats["mp4"]) formats["mp4"] = {}
                formats["mp4"][key] = {
                  url: links[key],
                  size: "Unknown"
                }
              })
            }
          }
          
          return NextResponse.json({
            status: "success",
            formats
          })
        }
        
        // If we can't transform, return an error
        return NextResponse.json({ 
          status: "error", 
          message: "Invalid API response format" 
        }, { 
          status: 500 
        })
      }

      // Prepare response data
      let responseData = data.medias ? {
        status: "success",
        ...data
      } : {
        status: "success",
        formats: data.formats
      }
      
      // For YouTube: Cache download URLs and replace with proxied URLs
      if (platform === 'youtube' || url.includes('youtube.com') || url.includes('youtu.be')) {
        responseData = await cacheYouTubeUrls(responseData, processUrl, data.title || 'YouTube Video')
      }
      
      // Cache the successful response to avoid repeated API calls
      setCachedResponse(processUrl, responseData)
      
      // Return the formatted API response
      const finalResponse = NextResponse.json(responseData)
      
      // Add rate limit headers (applied to all requests)
      return addRateLimitHeaders(finalResponse, rateLimitResult.headers || {})
  } catch (error) {
    // Always log unexpected errors - these indicate code problems
    console.error("⚠️ CRITICAL - Unexpected proxy error:", error)
    return NextResponse.json({ 
      status: "error", 
      message: "Failed to process request" 
    }, { 
      status: 500 
    })
  }
}
