export async function downloadVideo(videoUrl: string, filename: string, platform?: string): Promise<void> {
  try {
    // First try to get video info from the API
    const apiResponse = await fetch('/api/proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: videoUrl,
        platform,
        isApi: true
      })
    });

    if (!apiResponse.ok) {
      // If the API explicitly said "Not Found" (which our proxy now sends for "No medias found"),
      // then don't bother with the fallback, as it will likely also fail.
      if (apiResponse.status === 404) {
        const errorData = await apiResponse.json().catch(() => ({ message: "No downloadable media found for this URL (404)." }));
        throw new Error(errorData.message || "No downloadable media found for this URL.");
      }

      // For other API request failures, try direct download as a fallback
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: videoUrl,
          platform
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }

      // Handle streaming response
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = blobUrl;

      // Get filename from Content-Disposition header or use default
      const disposition = response.headers.get('content-disposition');
      const suggestedFilename = disposition?.split('filename="')[1]?.split('"')[0];
      const finalFilename = suggestedFilename || `video.${filename}`;
      link.download = finalFilename;
      link.setAttribute('download', finalFilename);

      document.body.appendChild(link);
      link.click();

      // Clean up the blob URL after the download has started
      link.addEventListener('load', () => {
        URL.revokeObjectURL(blobUrl);
        document.body.removeChild(link);
      });

      // Fallback for browsers that don't support the load event on 'a' tags
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 1000);
    } else {
      // Use the API response to get the best quality download URL
      const data = await apiResponse.json();

      // Check if the external API reported an error or found no media
      if (data.error === true || (data.message && data.message.toLowerCase().includes("no medias found")) || (data.medias && Array.isArray(data.medias) && data.medias.length === 0)) {
        // Prefer the message from the API if available
        const errorMessage = data.message || 'No downloadable media found for this URL.';
        throw new Error(errorMessage);
      }

      const downloadUrl = getBestQualityUrl(data, platform); // Pass platform

      if (!downloadUrl) {
        // This error is now more specific, as data.error should have been caught above
        throw new Error('Could not extract a valid download URL from the API response.');
      }

      // Download using the obtained URL
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: downloadUrl,
          platform
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to download video: ${response.statusText}`);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = blobUrl;
      link.download = `${data.title || 'video'}.${filename}`;
      link.setAttribute('download', `${data.title || 'video'}.${filename}`);

      document.body.appendChild(link);
      link.click();

      // Clean up the blob URL after the download has started
      link.addEventListener('load', () => {
        URL.revokeObjectURL(blobUrl);
        document.body.removeChild(link);
      });

      // Fallback for browsers that don't support the load event on 'a' tags
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 1000);
    }
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
}

export function getBestQualityUrl(apiResponse: any, platform?: string, quality?: string, format?: string): string | null {
  try {
    console.log(`getBestQualityUrl called for platform: ${platform}, quality: ${quality}, format: ${format}`);

    if (apiResponse.medias && Array.isArray(apiResponse.medias) && apiResponse.medias.length > 0) {
      let filteredMedias = [...apiResponse.medias];

      // 1. FILTER BY FORMAT
      if (format === 'mp3') {
        // Look for audio-only first
        const audioOnly = filteredMedias.filter(m => m.extension === 'mp3' || m.type === 'audio');
        if (audioOnly.length > 0) filteredMedias = audioOnly;
      } else {
        // Look for video if format is mp4
        const videoOnly = filteredMedias.filter(m => m.extension === 'mp4' || m.type === 'video');
        if (videoOnly.length > 0) filteredMedias = videoOnly;
      }

      // 2. SORT BY QUALITY (Higher first)
      filteredMedias.sort((a, b) => {
        const heightA = parseInt((a.quality || a.label || a.height || '').toString().replace('p', '')) || 0;
        const heightB = parseInt((b.quality || b.label || b.height || '').toString().replace('p', '')) || 0;
        return heightB - heightA;
      });

      // 3. FIND BEST MATCH FOR REQUESTED QUALITY
      if (quality && format !== 'mp3') {
        const target = parseInt(quality);
        // Try to find exact or slightly lower
        const match = filteredMedias.find(m => {
          const h = parseInt((m.quality || m.label || m.height || '').toString().replace('p', '')) || 0;
          return h <= target;
        });
        if (match?.url) return match.url;
      }

      // Fallback: First valid URL
      const firstValidMedia = filteredMedias.find(media => media.url);
      if (firstValidMedia) return firstValidMedia.url;
    }

    // Secondary Check: formats structure (some APIs use this)
    if (apiResponse.formats && typeof apiResponse.formats === 'object') {
      // Simplify: just grab the first valid URL for now if medias failed
      const formats = apiResponse.formats;
      const firstFormat = Object.values(formats)[0] as any;
      if (firstFormat?.url) return firstFormat.url;
    }

    // Handle simple URL response
    if (apiResponse.url) return apiResponse.url;

    return null;
  } catch (error) {
    console.error('Error parsing API response:', error);
    return null;
  }
}
