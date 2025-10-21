import { type NextRequest, NextResponse } from "next/server"

// This is a proxy function to handle the API request
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    const { url, platform } = body

    if (!url || !platform) {
      return NextResponse.json({ status: "error", message: "URL and platform are required" }, { status: 400 })
    }

    // Normalize Dailymotion short URLs
    let processUrl = url;
    if (platform === 'dailymotion' && url.includes('dai.ly/')) {
      // Convert dai.ly short URLs to full dailymotion URLs
      const videoId = url.split('dai.ly/').pop()?.split('?')[0].split('#')[0];
      if (videoId) {
        processUrl = `https://www.dailymotion.com/video/${videoId}`;
        console.log("Normalized Dailymotion URL:", processUrl);
      }
    }

    // Normalize Reddit URLs
    if (platform === 'reddit' || (platform === 'universal' && url.includes('reddit.com'))) {
      // Ensure Reddit URLs are in the proper format
      if (url.includes('redd.it/')) {
        // Convert redd.it short URLs to full reddit URLs
        const postId = url.split('redd.it/').pop()?.split('?')[0].split('#')[0];
        if (postId) {
          processUrl = `https://www.reddit.com/comments/${postId}`;
          console.log("Normalized Reddit URL:", processUrl);
        }
      } else if (url.includes('reddit.com/r/') && !url.includes('/comments/')) {
        // Convert subreddit post URLs to comment URLs
        const match = url.match(/reddit\.com\/r\/([^\/]+)\/comments\/([^\/]+)/);
        if (match) {
          processUrl = `https://www.reddit.com/comments/${match[2]}`;
          console.log("Normalized Reddit URL:", processUrl);
        }
      }
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

    // Log the request for debugging
    console.log(`Proxying POST request to: ${apiUrl}`);
    console.log("Request body:", JSON.stringify({ url: processUrl }));
    console.log("Using API key:", apiKey.substring(0, 5) + "..." + apiKey.substring(apiKey.length - 5));
    console.log("Using API URL:", apiUrl);
    console.log("Request headers:", JSON.stringify(options.headers));

    try {
      // Make the request to the new ZM API endpoint using POST with body
      console.log("Making POST request to:", apiUrl);
      
      const response = await fetch(
        apiUrl, 
        options
      )
      
      // Get the response data
      const data = await response.json()
      
      // Log the response for debugging
      console.log("ZM API Status:", response.status)
      console.log("ZM API Response Headers:", JSON.stringify(Object.fromEntries([...response.headers.entries()])))
      console.log("ZM API Response:", JSON.stringify(data).substring(0, 200) + "...")

      // Return error if the API call fails
      if (!response.ok) {
        console.error("API Error (non-2xx):", data)
        console.error("Full error response (non-2xx):", JSON.stringify(data))
        return NextResponse.json({ 
          status: "error", 
          message: `API error: ${response.status} - ${data.message || data.error || "Unknown error"}`,
          details: data
        }, { 
          status: response.status 
        })
      }

      // Even if response.ok is true, the API might have its own error flag/message
      if (data.error === true || (data.status && data.status !== 200 && data.status !== "success" && data.status !== 203 && data.message && data.message.toLowerCase().includes("no medias found"))) {
        // The ZM API for Bilibili returns status 203 with "No medias found"
        // For other errors, use a 422 or 404 if appropriate, or relay the API's status if it's an error status
        const errorStatus = (data.status && data.status >= 400) ? data.status : 
                            (data.message && data.message.toLowerCase().includes("no medias found")) ? 404 : 422; // Unprocessable Entity or Not Found
        console.error("API Error (logical):", data.message || "No media found or API logical error");
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
             console.warn("API Warning: No medias found, but not caught by primary error check. Data:", JSON.stringify(data));
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

      // Return the formatted API response - if we have medias, retain the original format
      if (data.medias) {
        return NextResponse.json({
          status: "success",
          ...data
        })
      }

      // Otherwise return the formats as is
      return NextResponse.json({
        status: "success",
        formats: data.formats
      })
    } catch (fetchError) {
      console.error("Fetch error:", fetchError)
      return NextResponse.json({ 
        status: "error", 
        message: "Failed to connect to the video processing service" 
      }, { 
        status: 500 
      })
    }
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json({ 
      status: "error", 
      message: "Failed to process request" 
    }, { 
      status: 500 
    })
  }
}
