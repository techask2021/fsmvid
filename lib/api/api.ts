import type { Platform } from "@/lib/download/platform-detector"

interface DownloadOptions {
  quality: string
  format: string
  size: string
  url: string
}

export interface DownloadResult {
  url: string
  platform: Platform
  title: string
  thumbnail: string
  downloadOptions: DownloadOptions[]
}

export async function downloadContent(url: string, platform: Platform): Promise<DownloadResult> {
  try {
    // Use our proxy endpoint instead of calling the ZM API directly
    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, platform }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Failed to download from ${platform}`)
    }

    const data = await response.json()

    // Transform the API response to our standard format
    return transformApiResponse(data, url, platform)
  } catch (error) {
    console.error(`Error downloading from ${platform}:`, error)
    throw error
  }
}

function transformApiResponse(apiData: any, originalUrl: string, platform: Platform): DownloadResult {
  // If the API response already matches our format, return it directly
  if (apiData.url && apiData.platform && apiData.downloadOptions) {
    return apiData
  }

  // Handle auto-download-all-in-one API format
  if (apiData.source && apiData.medias) {
    const platformToUse = apiData.source as Platform || platform || null
    const platformName = platformToUse ? platformToUse.charAt(0).toUpperCase() + platformToUse.slice(1) : "Unknown"
    return {
      url: originalUrl,
      platform: platformToUse,
      title: apiData.title || `${platformName} Content`,
      thumbnail: apiData.thumbnail || `/placeholder.svg?height=720&width=1280`,
      downloadOptions: extractDownloadOptions(apiData, platformToUse),
    }
  }

  // Handle YouTube-specific response format
  if (platform === 'youtube' && apiData.videoDetails) {
    return {
      url: originalUrl,
      platform,
      title: apiData.videoDetails.title || "YouTube Video",
      thumbnail: apiData.videoDetails.thumbnail?.thumbnails?.[0]?.url || `/placeholder.svg?height=720&width=1280`,
      downloadOptions: extractDownloadOptions(apiData, platform),
    }
  }

  // Otherwise, transform the API response to our standard format
  const platformToUse = platform || null
  const platformName = platformToUse ? platformToUse.charAt(0).toUpperCase() + platformToUse.slice(1) : "Unknown"
  return {
    url: originalUrl,
    platform: platformToUse,
    title:
      apiData.title ||
      apiData.video_title ||
      apiData.name ||
      `${platformName} Content`,
    thumbnail: apiData.thumbnail || apiData.thumbnail_url || apiData.image || `/placeholder.svg?height=720&width=1280`,
    downloadOptions: extractDownloadOptions(apiData, platformToUse),
  }
}

function extractDownloadOptions(apiData: any, platform: Platform): DownloadOptions[] {
  // Handle different response structures based on the platform or general structure

  // Handle the auto-download-all-in-one API format (with medias array)
  if (apiData.medias && Array.isArray(apiData.medias)) {
    const options: DownloadOptions[] = [];
    
    apiData.medias.forEach((media: any) => {
      if (media.url) {
        options.push({
          quality: media.label || media.quality || `${media.height}p`,
          format: media.ext || media.extension || "mp4",
          size: media.size || "Unknown",
          url: media.url,
        });
      }
    });
    
    return options;
  }

  // Special handling for YouTube responses from new ZM API endpoint
  if (platform === 'youtube' && apiData.streamingData) {
    const options: DownloadOptions[] = [];
    const videoFormats = [
      ...(apiData.streamingData.formats || []), 
      ...(apiData.streamingData.adaptiveFormats || [])
    ];
    
    videoFormats.forEach((format: any) => {
      if (format.url) {
        const quality = format.qualityLabel || format.quality || (format.audioQuality ? 'audio' : 'video');
        const mimeType = format.mimeType || '';
        const isAudio = mimeType.includes('audio') || format.audioQuality;
        
        options.push({
          quality,
          format: isAudio ? 'mp3' : 'mp4',
          size: format.contentLength ? Math.round(format.contentLength / (1024 * 1024)) + " MB" : "Unknown",
          url: format.url,
        });
      }
    });
    
    return options;
  }

  // Special handling for YouTube responses from ZM API
  if (platform === 'youtube' && apiData.links && typeof apiData.links === 'object') {
    const options: DownloadOptions[] = [];
    
    // YouTube API typically returns a links object with quality keys
    Object.entries(apiData.links).forEach(([quality, url]: [string, any]) => {
      options.push({
        quality,
        format: quality.includes('audio') ? 'mp3' : 'mp4',
        size: apiData.sizes?.[quality] || "Unknown",
        url: url as string,
      });
    });
    
    return options;
  }

  // Handle the formats structure that comes from ZM API
  if (apiData.formats && typeof apiData.formats === 'object') {
    const options: DownloadOptions[] = [];
    
    Object.entries(apiData.formats).forEach(([format, qualities]: [string, any]) => {
      Object.entries(qualities).forEach(([quality, details]: [string, any]) => {
        options.push({
          quality,
          format,
          size: details.size || "Unknown",
          url: details.url,
        });
      });
    });
    
    return options;
  }

  if (Array.isArray(apiData.formats)) {
    return apiData.formats.map((format: any) => ({
      quality: format.quality || "Standard",
      format: format.format || format.type || "MP4",
      size: format.size || format.filesize || "Unknown",
      url: format.url || format.download_url || "#",
    }))
  }

  if (Array.isArray(apiData.videos)) {
    return apiData.videos.map((video: any) => ({
      quality: video.quality || "Standard",
      format: video.format || video.extension || "MP4",
      size: video.size || "Unknown",
      url: video.url || video.download_url || "#",
    }))
  }

  if (apiData.url) {
    // Simple response with just a URL
    return [
      {
        quality: "Standard",
        format: "MP4",
        size: "Unknown",
        url: apiData.url,
      },
    ]
  }

  // Fallback for unexpected response structure
  throw new Error("Unexpected response structure")
}