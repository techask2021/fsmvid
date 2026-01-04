import { getBestQualityUrl } from './download-helper';
import { getCachedResponse, setCachedResponse } from '@/lib/api/redis-cache';

interface ProcessedVideo {
    url: string;
    filename: string;
    metadata: any;
    success: boolean;
    error?: string;
}

/**
 * Helper to fetch metadata for a single video using your existing proxy API logic.
 * This runs on the server (Worker) to prepare for bulk processing.
 */
export async function fetchVideoMetadata(videoUrl: string, platform?: string, quality?: string, format?: string): Promise<ProcessedVideo> {
    const apiUrl = process.env.NEXT_PUBLIC_ZM_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_ZM_API_KEY;

    if (!apiUrl || !apiKey) {
        return {
            url: videoUrl,
            filename: 'video',
            metadata: null,
            success: false,
            error: 'API configuration missing'
        };
    }

    try {
        // 1. Try Cache First (Upstash Redis)
        const cached = await getCachedResponse(videoUrl);
        let data: any;

        if (cached) {
            data = typeof cached === 'string' ? JSON.parse(cached) : cached;
        } else {
            // 2. Fetch metadata using the 3rd party API (exactly like your proxy)
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'apikey': apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: videoUrl })
            });

            if (!response.ok) {
                return {
                    url: videoUrl,
                    filename: 'error',
                    metadata: null,
                    success: false,
                    error: `API error: ${response.status}`
                };
            }

            data = await response.json();

            // Store in Cache (1 hour)
            if (data && !data.error) {
                await setCachedResponse(videoUrl, data, 3600);
            }
        }

        if (data.error || (data.message && data.message.toLowerCase().includes("no medias"))) {
            return {
                url: videoUrl,
                filename: 'error',
                metadata: data,
                success: false,
                error: data.message || 'No media found'
            };
        }

        // 2. Use your existing logic to get the best URL
        const downloadUrl = getBestQualityUrl(data, platform, quality, format);

        if (!downloadUrl) {
            return {
                url: videoUrl,
                filename: 'error',
                metadata: data,
                success: false,
                error: 'Could not extract download URL'
            };
        }

        // 3. Determine filename
        const title = data.title || 'video';
        // Remove only characters illegal in filenames across Windows/Mac/Linux
        // and allow spaces for readability.
        let cleanTitle = title
            .replace(/[<>:"/\\|?*\x00-\x1F]/g, '') // remove illegal chars
            .trim()
            .substring(0, 100); // allow slightly longer names

        if (!cleanTitle || cleanTitle.replace(/_/g, '').length === 0) {
            cleanTitle = `video_${Date.now().toString().slice(-6)}`;
        }

        const extension = format === 'mp3' ? 'mp3' : 'mp4';

        return {
            url: downloadUrl, // This is the direct CDN link
            filename: `${cleanTitle}.${extension}`,
            metadata: data,
            success: true
        };

    } catch (error: any) {
        return {
            url: videoUrl,
            filename: 'error',
            metadata: null,
            success: false,
            error: error.message
        };
    }
}
