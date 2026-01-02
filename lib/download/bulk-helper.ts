import { getBestQualityUrl } from './download-helper'; // Reuse your existing helper

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
export async function fetchVideoMetadata(videoUrl: string, platform?: string): Promise<ProcessedVideo> {
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
        // 1. Fetch metadata using the 3rd party API (exactly like your proxy)
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

        const data = await response.json();

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
        // We pass platform if available, otherwise undefined
        const downloadUrl = getBestQualityUrl(data, platform);

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
        const cleanTitle = title.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
        const extension = 'mp4'; // Default to mp4 for now, your getBestQualityUrl might need format tweaking if audio

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
