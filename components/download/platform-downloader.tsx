"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { AlertCircle, Check, Copy, Download, Loader2, Play, ArrowRight } from "lucide-react"
import { toast } from "sonner"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDownloadLimit } from "@/hooks/use-download-limit"
import { DownloadLimitModal } from "./download-limit-modal"
import { DownloadHintBanner } from "./download-hint-banner"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { detectPlatform } from "@/lib/download/platform-detector"

interface DownloadOption {
  url: string
  quality: string
  format: string
  size?: string
  hasAudio: boolean
  noWatermark?: boolean
}

interface ApiResponse {
  status: "success" | "error"
  message?: string
  details?: any
  title?: string
  thumbnail?: string
  author?: string
  duration?: number
  formats?: {
    [key: string]: {
      [key: string]: {
        url: string
        size?: string
      }
    }
  }
  medias?: {
    url: string
    ext?: string
    type?: string
    label?: string
    quality?: string
    size?: string
    height?: number
    audioQuality?: string
    mimeType?: string
    formatId?: number
    codecs?: string
    bandwidth?: number
    resolution?: string
    extension?: string
    noWatermark?: boolean
  }[]
}

/**
 * Get correct platform page URL based on actual routes
 */
function getPlatformPageUrl(platform: string): string {
  const platformUrls: Record<string, string> = {
    youtube: '/youtube-video-saver',
    tiktok: '/tiktok-video-saver',
    instagram: '/instagram-media-saver',
    facebook: '/facebook-media-grabber',
    twitter: '/twitter-video-saver',
    reddit: '/reddit-video-saver',
    dailymotion: '/dailymotion-video-saver',
    snapchat: '/snapchat-story-saver',
    pinterest: '/pinterest-media-saver',
    tumblr: '/tumblr-content-saver',
    linkedin: '/linkedin-content-saver',
    threads: '/threads-video-saver',
    soundcloud: '/soundcloud-mp3-saver',
    spotify: '/spotify-mp3-saver',
    mixcloud: '/mixcloud-mp3-saver',
    rumble: '/rumble-video-grabber',
    bluesky: '/bluesky-video-saver',
    bsky: '/bluesky-video-saver',
    telegram: '/telegram-media-saver',
    imgur: '/imgur-media-saver',
    weibo: '/weibo-video-saver',
    douyin: '/douyin-video-saver',
    kuaishou: '/kuaishou-video-saver',
    bilibili: '/bilibili-video-saver',
    '9gag': '/9gag-video-saver',
    imdb: '/imdb-video-saver',
    espn: '/espn-video-saver',
    ted: '/ted-video-saver',
    capcut: '/capcut-video-saver',
    febspot: '/febspot-video-saver',
    ifunny: '/ifunny-video-saver',
    bitchute: '/bitchute-video-saver',
    xiaohongshu: '/xiaohongshu-video-saver',
    castbox: '/castbox-podcast-saver',
    deezer: '/deezer-music-saver',
    zingmp3: '/zingmp3-saver',
  }

  return platformUrls[platform.toLowerCase()] || '/'
}

export default function PlatformDownloader({ platform }: { platform: string }) {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [downloadOptions, setDownloadOptions] = useState<DownloadOption[]>([])
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null)
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [videoTitle, setVideoTitle] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [fileSize, setFileSize] = useState<number | null>(null) // File size in bytes
  const [isLargeFile, setIsLargeFile] = useState(false) // Track if file is large (>25MB)
  const [activeTab, setActiveTab] = useState<"download" | "link">("download") // Track active tab

  // Download limit tracking (only on homepage/universal downloader)
  const pathname = usePathname()
  // isHomepage should ONLY depend on pathname, not platform prop
  // This ensures requests from homepage always show Homepage: true
  const isHomepage = pathname === '/'
  const { limitState, checkLimit, handleBypass, handleProceed } = useDownloadLimit()
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [currentPlatform, setCurrentPlatform] = useState("")
  const [platformUrl, setPlatformUrl] = useState("")

  const getPlaceholder = (platform: string) => {
    const placeholders: { [key: string]: string } = {
      youtube: "https://www.youtube.com/watch?v=...",
      tiktok: "https://www.tiktok.com/@user/video/...",
      facebook: "https://www.facebook.com/user/videos/...",
      twitter: "https://twitter.com/user/status/...",
      instagram: "https://www.instagram.com/p/...",
      dailymotion: "https://www.dailymotion.com/video/...",
      telegram: "https://t.me/channel/...",
      tumblr: "https://user.tumblr.com/post/...",
      snapchat: "https://www.snapchat.com/add/...",
      pinterest: "https://www.pinterest.com/pin/...",
      linkedin: "https://www.linkedin.com/feed/update/...",
      imgur: "https://imgur.com/gallery/...",
      rumble: "https://rumble.com/...",
      "9gag": "https://9gag.com/gag/...",
      bitchute: "https://www.bitchute.com/video/...",
      bsky: "https://bsky.app/profile/user.bsky.social/post/...",
      capcut: "https://www.capcut.com/template-detail/...",
      douyin: "https://www.douyin.com/video/...",
      espn: "https://www.espn.com/watch/player/_/id/...",
      febspot: "https://febspot.com/video/...",
      ifunny: "https://ifunny.co/video/...",
      imdb: "https://www.imdb.com/video/...",
      kuaishou: "https://www.kuaishou.com/short-video/...",
      mixcloud: "https://www.mixcloud.com/user/...",
      reddit: "https://www.reddit.com/r/subreddit/comments/...",
      soundcloud: "https://soundcloud.com/artist/track-name",
      spotify: "https://open.spotify.com/track/...",
      ted: "https://www.ted.com/talks/...",
      threads: "https://www.threads.net/@user/post/...",
      weibo: "https://weibo.com/tv/show/...",
      xiaohongshu: "https://www.xiaohongshu.com/explore/...",
      zingmp3: "https://zingmp3.vn/bai-hat/...",
      bilibili: "https://www.bilibili.com/video/...",
      deezer: "https://www.deezer.com/track/...",
      castbox: "https://castbox.fm/episode/id...",
      universal: "Enter any video URL...",
    }
    return placeholders[platform] || `Enter ${platform} URL...`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setDownloadOptions([])
    setSelectedFormat(null)
    setSelectedQuality(null)
    setDownloadUrl(null)
    setShowPlayer(false)

    let currentInput = url.trim();
    if (!currentInput) {
      setError("Please enter a URL.");
      setLoading(false);
      return;
    }

    // Enhanced URL extraction - handles text before URL (including Chinese characters in brackets)
    let extractedUrl = currentInput; 
    const httpIndex = currentInput.toLowerCase().indexOf('http://');
    const httpsIndex = currentInput.toLowerCase().indexOf('https://');
    
    let startIndex = -1;
    if (httpsIndex !== -1) {
      startIndex = httpsIndex;
    } else if (httpIndex !== -1) {
      startIndex = httpIndex;
    }

    if (startIndex !== -1) {
      // Extract URL starting from http(s)://
      let potentialUrl = currentInput.substring(startIndex);
      
      // Stop at whitespace, newline, or common text delimiters
      const stopPatterns = [
        /\s/,           // Whitespace
        /[\n\r]/,       // Newlines
        /[【】]/,       // Chinese brackets (in case they appear after URL)
        /[\[\]]/,       // Square brackets
        /[<>]/,         // Angle brackets
      ];
      
      let earliestStop = potentialUrl.length;
      stopPatterns.forEach(pattern => {
        const match = potentialUrl.search(pattern);
        if (match !== -1 && match < earliestStop) {
          earliestStop = match;
        }
      });
      
      if (earliestStop < potentialUrl.length) {
        potentialUrl = potentialUrl.substring(0, earliestStop);
      }
      
      // Clean up any trailing characters that aren't part of URLs
      potentialUrl = potentialUrl.replace(/[，。！？；：、,\s]+$/, '').trim();
      
      extractedUrl = potentialUrl;
      setUrl(extractedUrl); 
    }
    
    try {
      new URL(extractedUrl); 
    } catch {
      setError("Could not find a valid URL in the pasted text. Please ensure it starts with http:// or https://.");
      setLoading(false);
      return;
    }

    const finalUrlToProcess = extractedUrl;

    try {
      const detectedPlatform = detectPlatform(finalUrlToProcess)
      console.log(`🔍 Detected platform: ${detectedPlatform} for URL: ${finalUrlToProcess}`)

      // Check download limit (only on homepage/universal downloader)
      if (isHomepage && detectedPlatform) {
        const limitStatus = checkLimit(detectedPlatform, isHomepage)
        setCurrentPlatform(detectedPlatform)
        
        // Get platform URL for modal - use correct route mapping
        const detectedPlatformUrl = getPlatformPageUrl(detectedPlatform)
        setPlatformUrl(detectedPlatformUrl)
        
        // If limit exceeded, show modal and BLOCK download
        if (!limitStatus.allowed) {
          setShowLimitModal(true)
          setLoading(false)
          return // STOP - don't proceed with download
        }
        
        // Show hint if on second download (1 remaining)
        if (limitStatus.shouldShowHint && limitStatus.remainingDownloads > 0) {
          setShowHint(true)
        }
      }

      if (platform !== "universal" && detectedPlatform !== platform) {
        if (platform === 'pinterest' && (url.includes('pin.it') || url.includes('pinterest.com') || url.includes('pinterest.'))) {
          // Allow Pinterest
        } 
        else if (platform === 'dailymotion' && (url.includes('dai.ly') || url.includes('dailymotion.com'))) {
          // Allow Dailymotion
        }
        else {
          setError(`This URL doesn't appear to be from ${platform}. Please use the correct downloader.`)
          setLoading(false)
          return
        }
      }


      // All other platforms use ZM API proxy
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          url: finalUrlToProcess,
          platform: detectedPlatform || platform,
          isHomepage: isHomepage // Pass homepage flag for rate limiting
        }),
      })

      const data: ApiResponse = await response.json()

      if (!response.ok) {
        const errorMessage = data.message || (data.details ? JSON.stringify(data.details) : "Unknown error");
        
        // YouTube 403 Fallback - Open video player in new tab
        if (response.status === 403 && (detectedPlatform === 'youtube' || platform === 'youtube')) {
          // Open YouTube watch page, not the direct video URL
          const youtubeWatchUrl = finalUrlToProcess.includes('youtube.com') || finalUrlToProcess.includes('youtu.be')
            ? finalUrlToProcess
            : url
          window.open(youtubeWatchUrl, '_blank', 'noopener,noreferrer')
          toast.info("YouTube blocked our download. We've opened the video - click the 3-dot menu and select 'Download' to save it!", { duration: 10000 })
          setLoading(false)
          return
        }
        
        if (response.status === 429) {
          // Rate limit - show friendly message
          setError("Our service is experiencing high traffic right now. Please wait a moment and try again, or visit our dedicated platform page for better service.");
        } else if (response.status === 500) {
          setError(platform !== "universal" ? "We couldn't process this URL. Try using our Universal downloader instead." : "We couldn't process this URL. The video may be private, removed, or from an unsupported source.");
        } else if (response.status === 404) {
          setError("The video could not be found. It may have been deleted or made private.");
        } else if (errorMessage.includes("Invalid API response format")) {
          setError(platform !== "universal" ? "This URL format isn't supported. Try our Universal downloader." : "This URL format isn't supported. Please use a valid video link.");
        } else if (errorMessage.includes("timeout")) {
          setError("The request timed out. Please try again later.");
        } else if (errorMessage.includes("Too many requests")) {
          setError("We're processing lots of requests right now! Please wait a moment, or try our platform-specific downloader for faster service.");
        } else {
          setError(`We encountered an issue: ${errorMessage}`);
        }
        setLoading(false);
        return;
      }

      if (data.status === "error" || (!data.formats && !data.medias)) {
        setError(data.message || "Failed to process this URL. Please check and try again.")
        setLoading(false)
        return
      }

      const options: DownloadOption[] = []
      if (data.formats) {
        Object.entries(data.formats).forEach(([format, qualities]) => {
          Object.entries(qualities).forEach(([quality, details]) => {
            options.push({ url: details.url, format, quality, size: details.size, hasAudio: false })
          })
        })
      } 
      else if (data.medias) {
        const uniqueKeys = new Set();
        data.medias.forEach((media) => {
          if (media.url) {
            const format = media.ext || media.type || "mp4";
            let quality = media.label || media.quality || `${media.height}p`;
            const hasAudio = (() => {
              if (['tiktok', 'facebook', 'twitter', 'instagram', 'telegram', 'tumblr', 'snapchat', 'pinterest', 'linkedin', 'dailymotion', 'rumble', 'youtube'].includes(platform)) return true;
              if (platform === 'imgur') return (format.toLowerCase() === 'mp4' || format.toLowerCase() === 'webm' || (media.mimeType && media.mimeType.includes('video')));
              return !!(media.audioQuality || (media.mimeType && media.mimeType.includes('mp4a')) || (media.codecs && media.codecs.includes('mp4a')) || media.formatId === 18 || quality.toLowerCase().includes('audio') || format.toLowerCase() === 'mp3' || format.toLowerCase() === 'm4a');
            })();
            // Check if platform is TikTok or if universal mode detected TikTok
            const isTikTokVideo = platform === 'tiktok' || (platform === 'universal' && detectedPlatform === 'tiktok');
            if (isTikTokVideo) {
              if (quality.includes('no_watermark') || quality.includes('hd_no_watermark')) { quality = quality.includes('hd') ? 'HD' : 'SD'; media.noWatermark = true; }
              else if (quality.includes('watermark')) { quality = quality.includes('hd') ? 'HD with Watermark' : 'SD with Watermark'; media.noWatermark = false; }
              if (format.toLowerCase() === 'mp3' || format.toLowerCase() === 'm4a') { quality = 'Audio'; media.noWatermark = undefined; }
            } else if (platform === 'dailymotion' && media.resolution && media.resolution.includes('x')) { quality = `${media.resolution.split('x')[1]}p`; }
            
            let key = `${format} (${quality})`;
            let counter = 1;
            if ((platform === 'dailymotion' || platform === 'bsky' || platform === 'reddit') && (media.extension === 'm3u8' || media.url.includes('.m3u8'))) key = `streaming (${quality})`;
            while(uniqueKeys.has(key)) { counter++; key = `${format} (${quality} ${counter})`; }
            uniqueKeys.add(key);
            options.push({ url: media.url, format: (platform === 'dailymotion' || platform === 'bsky' || platform === 'reddit') && (media.extension === 'm3u8' || media.url.includes('.m3u8')) ? 'streaming' : format, quality: key.replace(`${key.split(' (')[0]} (`, '').replace(')', ''), size: media.size || "Unknown", hasAudio: Boolean(hasAudio), noWatermark: media.noWatermark === true });
          }
        })
      }

      // Check if platform is TikTok or if universal mode detected TikTok
      const isTikTokVideo = platform === 'tiktok' || (platform === 'universal' && detectedPlatform === 'tiktok');
      if (isTikTokVideo) {
        const qualityMap = new Map();
        options.forEach(option => {
          const qualityKey = option.quality;
          if (option.format.toLowerCase() === 'mp3' || option.format.toLowerCase() === 'm4a') return;
          if (!qualityMap.has(qualityKey) || (option.noWatermark === true && qualityMap.get(qualityKey).noWatermark !== true)) {
            qualityMap.set(qualityKey, option);
          }
        });
        const audioOptions = options.filter(opt => opt.format.toLowerCase() === 'mp3' || opt.format.toLowerCase() === 'm4a');
        const videoOptions = Array.from(qualityMap.values());
        setDownloadOptions([...audioOptions, ...videoOptions]);
      } else {
        setDownloadOptions(options);
      }

      if (options.length === 0) { setError("No download options available for this URL."); setLoading(false); return }

      options.sort((a, b) => {
        if (a.hasAudio && !b.hasAudio) return -1; if (!a.hasAudio && b.hasAudio) return 1;
        if (a.format === 'mp4' && b.format !== 'mp4') return -1; if (a.format !== 'mp4' && b.format === 'mp4') return 1;
        const aNum = parseInt(a.quality.replace(/[^\d]/g, '')) || 0; const bNum = parseInt(b.quality.replace(/[^\d]/g, '')) || 0;
        return bNum - aNum;
      });

      setDownloadOptions(options)
      const formats = [...new Set(options.map((option) => option.format))]
      setSelectedFormat(formats[0])
      const qualities = options.filter((option) => option.format === formats[0]).map((option) => option.quality);
      const qualitiesWithAudio = qualities.filter(quality => options.find(opt => opt.format === formats[0] && opt.quality === quality)?.hasAudio);
      const defaultQuality = qualitiesWithAudio.length > 0 ? qualitiesWithAudio[0] : qualities[0];
      setSelectedQuality(defaultQuality);
      const defaultOption = options.find((option) => option.format === formats[0] && option.quality === defaultQuality);
      if (defaultOption) {
        setDownloadUrl(defaultOption.url)

        // Extract file size from the size string (e.g., "65.3 MB" -> 68484672 bytes)
        if (defaultOption.size && defaultOption.size !== "Unknown") {
          const sizeStr = defaultOption.size.toString().toLowerCase()
          let sizeInBytes = 0

          console.log(`[FILE SIZE DEBUG] Original size string: "${defaultOption.size}"`)

          if (sizeStr.includes('gb')) {
            sizeInBytes = parseFloat(sizeStr) * 1024 * 1024 * 1024
          } else if (sizeStr.includes('mb')) {
            sizeInBytes = parseFloat(sizeStr) * 1024 * 1024
          } else if (sizeStr.includes('kb')) {
            sizeInBytes = parseFloat(sizeStr) * 1024
          } else if (!isNaN(parseInt(sizeStr))) {
            // If it's just a number, assume it's bytes
            sizeInBytes = parseInt(sizeStr)
          }

          console.log(`[FILE SIZE DEBUG] Parsed to ${sizeInBytes} bytes (${Math.round(sizeInBytes / 1024 / 1024)}MB)`)

          setFileSize(sizeInBytes)

          // Mark as large file if >= 25MB (25 * 1024 * 1024 = 26214400 bytes)
          const isLarge = sizeInBytes >= 26214400
          setIsLargeFile(isLarge)

          console.log(`[FILE SIZE DEBUG] Is large file (>=25MB)? ${isLarge}`)

          if (isLarge) {
            const sizeMB = Math.round(sizeInBytes / 1024 / 1024)
            console.info(`[LARGE FILE] Detected ${sizeMB}MB file for ${detectedPlatform || platform}`)
          }
        } else {
          console.log(`[FILE SIZE DEBUG] No size available or size is "Unknown"`)
        }
      }
      setVideoTitle(data.title || `${platform} Video`);
      if (data.thumbnail) setThumbnail(data.thumbnail);
    } catch (err) {
      setError("An error occurred. Please try again later.")
      console.error(err)
    }
    setLoading(false)
  }

  const handleFormatChange = (format: string) => {
    setSelectedFormat(format)
    const qualities = downloadOptions.filter((option) => option.format === format).map((option) => option.quality);
    const qualitiesWithAudio = qualities.filter(quality => downloadOptions.find(opt => opt.format === format && opt.quality === quality)?.hasAudio);
    const defaultQuality = qualitiesWithAudio.length > 0 ? qualitiesWithAudio[0] : qualities[0];
    setSelectedQuality(defaultQuality);
    const option = downloadOptions.find((option) => option.format === format && option.quality === defaultQuality);
    if (option) setDownloadUrl(option.url)
  }

  const handleQualityChange = (quality: string) => {
    setSelectedQuality(quality)
    const option = downloadOptions.find((option) => option.format === selectedFormat && option.quality === quality)
    if (option) setDownloadUrl(option.url)
  }

  const handleDownload = async () => {
    if (downloadUrl) {
      // Prepare variables outside try-catch for use in error handling
      const detectedPlatform = detectPlatform(url);
      const platformName = platform === 'universal' ? (detectedPlatform || 'download') : platform;

      // Sanitize video title for use in filename
      const sanitizedTitle = videoTitle
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, '') // Remove invalid filename characters
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .trim()
        .substring(0, 100); // Limit length to 100 characters

      // Create filename with title or fallback to platform_timestamp
      const baseFilename = sanitizedTitle || `${platformName}_${Date.now()}`;
      let filename = `${baseFilename}.${selectedFormat?.toLowerCase() || 'mp4'}`;

      try {
        setDownloadLoading(true)
        toast.info("Starting download...", { duration: 3000 })
        
        // We're working on improving YouTube direct downloads
        // For now, users can use the direct download link from the "Direct Link" tab
        // Store the video URL in session storage for reference
        sessionStorage.setItem('lastDownloadUrl', downloadUrl);

        if ((downloadUrl.includes('.m3u8') || selectedFormat?.toLowerCase() === 'streaming') && (platform === 'dailymotion' || platform === 'bsky' || platform === 'reddit' || (platform === 'universal' && (detectedPlatform === 'reddit' || detectedPlatform === 'dailymotion' || detectedPlatform === 'bsky')))) {
          filename = filename.replace(/\.(mp4|streaming)$/, '.m3u8');
          toast.info("Downloading m3u8 streaming file...", { duration: 8000 });
          const response = await fetch('/api/hls-download', { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ url: downloadUrl, title: sanitizedTitle || `${platform === 'universal' ? detectedPlatform : platform}_${Date.now()}`, isHomepage }), });
          if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.error || 'Download failed'); }
          const blob = await response.blob(); const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a'); link.href = blobUrl; link.download = `${sanitizedTitle || `${platform === 'universal' ? detectedPlatform : platform}_stream_${Date.now()}`}.m3u8`; document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(blobUrl);
          toast.success("Download successful! Use VLC Media Player to open.");
          setDownloadLoading(false); return;
        } 
        else if (downloadUrl.includes('.m3u8') || selectedFormat?.toLowerCase() === 'streaming') {
          filename = filename.replace(/\.(mp4|streaming)$/, '.m3u8');
          toast.info("This is a streaming format (m3u8).", { duration: 6000 });
          if (!confirm("This is a streaming format. Download m3u8 file? (Cancel to copy link)")) { setDownloadLoading(false); copyToClipboard(); return; }
        }
        // Use CLIENT-SIDE parallel download for Mixcloud (bypasses Netlify size limits!)
        const isMixcloud = platform === 'mixcloud' || (platform === 'universal' && detectedPlatform === 'mixcloud');
        
        if (isMixcloud) {
          try {
            toast.info("Downloading with parallel chunks in browser (faster!)...", { duration: 4000 });
            
            // Step 1: Get file size
            const headResponse = await fetch(downloadUrl, { 
              method: 'HEAD',
              mode: 'cors',
              credentials: 'omit'
            });
            
            const contentLength = headResponse.headers.get('Content-Length');
            if (!contentLength) {
              throw new Error('Cannot determine file size');
            }
            
            const fileSize = parseInt(contentLength, 10);
            const numChunks = 4;
            const chunkSize = Math.floor(fileSize / numChunks);
            
            toast.info(`Downloading ${Math.round(fileSize / 1024 / 1024)}MB in 4 parallel chunks...`, { duration: 3000 });
            
            // Step 2: Download all chunks in parallel (IN BROWSER, not server!)
            const chunkPromises = [];
            
            for (let i = 0; i < numChunks; i++) {
              const startByte = i * chunkSize;
              const endByte = i === numChunks - 1 ? fileSize - 1 : startByte + chunkSize - 1;
              
              const chunkPromise = fetch(downloadUrl, {
                headers: {
                  'Range': `bytes=${startByte}-${endByte}`,
                },
                mode: 'cors',
                credentials: 'omit'
              }).then(async (response) => {
                if (!response.ok && response.status !== 206) {
                  throw new Error(`Chunk ${i + 1} failed: ${response.status}`);
                }
                const arrayBuffer = await response.arrayBuffer();
                return {
                  index: i,
                  data: new Uint8Array(arrayBuffer)
                };
              });
              
              chunkPromises.push(chunkPromise);
            }
            
            // Step 3: Wait for all chunks
            const chunks = await Promise.all(chunkPromises);
            chunks.sort((a, b) => a.index - b.index);
            
            toast.info("Combining chunks...", { duration: 2000 });
            
            // Step 4: Combine chunks
            const totalLength = chunks.reduce((sum, chunk) => sum + chunk.data.length, 0);
            const combinedBuffer = new Uint8Array(totalLength);
            
            let offset = 0;
            for (const chunk of chunks) {
              combinedBuffer.set(chunk.data, offset);
              offset += chunk.data.length;
            }
            
            // Step 5: Create blob and download
            const blob = new Blob([combinedBuffer], { type: 'audio/mp4' });
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
            
            toast.success(`Download complete! (${Math.round(totalLength / 1024 / 1024)}MB)`);
            setDownloadLoading(false);
            return;
            
          } catch (mixcloudError) {
            console.error('Client-side parallel download failed:', mixcloudError);
            toast.error("Parallel download failed. Using standard method...");
            // Fall through to standard download
          }
        }
        
        // Standard download for other platforms
        const response = await fetch('/api/download', { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ url: downloadUrl, filename, platform, isHomepage }), })

        // Check if it's a large file (413 status)
        if (response.status === 413) {
          const data = await response.json()
          const sizeMB = data.sizeMB || Math.round((data.fileSize || 0) / 1024 / 1024)

          // Update file size state
          if (data.fileSize) {
            setFileSize(data.fileSize)
            setIsLargeFile(true)
          }

          // Switch to Direct Link tab
          setActiveTab("link")
          setDownloadLoading(false)

          // Show friendly message
          toast.info(`Large file detected (${sizeMB}MB). Switched to Direct Link tab for smooth downloads.`, {
            duration: 5000
          })
          return
        }

        if (!response.ok) throw new Error('Download failed')
        const blob = await response.blob(); const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a'); link.href = blobUrl; link.download = filename; document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(blobUrl);
        toast.success("Download successful!");
      } catch (error) {
        console.error('Download error:', error); 
        
        // YouTube 403 Fallback - Open direct video link in new tab when download fails
        if (detectedPlatform === 'youtube' || platform === 'youtube') {
          // Open the direct video URL (googlevideo.com) so user can save it
          window.open(downloadUrl, '_blank', 'noopener,noreferrer')
          toast.info("YouTube blocked the download. We've opened the direct video link - right-click and select 'Save video as...' to download!", { duration: 10000 })
          setDownloadLoading(false)
          return
        }
        
        toast.error("Download failed. Trying alternative method...");
        // Try direct download without opening new tab
        try {
          const response = await fetch(downloadUrl, {
            mode: 'cors',
            credentials: 'omit'
          });
          if (response.ok) {
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${sanitizedTitle || `${platformName}_${Date.now()}`}.${selectedFormat?.toLowerCase() || 'mp4'}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
            toast.success("Download successful!");
          } else {
            throw new Error('Direct download failed');
          }
        } catch (directError) {
          console.error('Direct download also failed:', directError);
          // Last resort: force download attribute (may open in new tab for some browsers/URLs)
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `${sanitizedTitle || `${platformName}_${Date.now()}`}.${selectedFormat?.toLowerCase() || 'mp4'}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.info("If download didn't start, right-click the video and select 'Save video as...'");
        }
      } finally {
        setDownloadLoading(false)
      }
    }
  }

  const copyToClipboard = (e?: React.MouseEvent) => {
    if (e) { e.stopPropagation(); e.preventDefault(); }
    if (downloadUrl) {
      navigator.clipboard.writeText(downloadUrl); setCopied(true);
      toast.success("Download link copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const handleStreamPlayback = () => {
    if (downloadUrl && (downloadUrl.includes('.m3u8') || selectedFormat === 'streaming')) setShowPlayer(true);
  }

  const allFormats = [...new Set(downloadOptions.map((option) => option.format))]
  
  // Sort formats: video formats first, then audio formats
  const availableFormats = allFormats.sort((a, b) => {
    const videoFormats = ['mp4', 'webm', 'mkv', 'avi', 'mov', 'flv', 'wmv', '3gp']
    const audioFormats = ['mp3', 'm4a', 'aac', 'wav', 'flac', 'ogg']
    
    const aIsVideo = videoFormats.includes(a.toLowerCase())
    const bIsVideo = videoFormats.includes(b.toLowerCase())
    const aIsAudio = audioFormats.includes(a.toLowerCase())
    const bIsAudio = audioFormats.includes(b.toLowerCase())
    
    // Video formats come first
    if (aIsVideo && !bIsVideo) return -1
    if (!aIsVideo && bIsVideo) return 1
    
    // Audio formats come second
    if (aIsAudio && !bIsAudio && !aIsVideo && !bIsVideo) return -1
    if (!aIsAudio && bIsAudio && !aIsVideo && !bIsVideo) return 1
    
    // Within same category, sort alphabetically
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })
  const availableQualities = selectedFormat ? downloadOptions.filter((option) => option.format === selectedFormat).map((option) => option.quality) : []

  return (
    <div data-downloader="true">
      {/* Show hint banner if on download #2 (only on homepage/universal) */}
      {showHint && limitState && isHomepage && (
        <DownloadHintBanner
          remainingDownloads={limitState.remainingDownloads}
          platformName={currentPlatform}
          platformUrl={platformUrl}
          onDismiss={() => setShowHint(false)}
        />
      )}
 
      <form onSubmit={handleSubmit} translate="no" className="space-y-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-500">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <Label htmlFor="url" className="block text-sm font-medium mb-3 text-left text-blue-100">
                Enter Video URL
              </Label>
              <Input
                id="url" type="text" placeholder={getPlaceholder(platform)} value={url}
                onChange={(e) => setUrl(e.target.value)} required
                className="bg-white/20 backdrop-blur-sm border-white/30 focus:border-cyan-300 h-14 text-base rounded-2xl placeholder:text-blue-200 focus:ring-4 focus:ring-cyan-300/20 text-white transition-all duration-300 w-full" 
                disabled={loading} translate="no"
              />
            </div>
            <div className="flex items-end">
              <Button
                type="submit" size="lg"
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-400 text-white h-14 px-10 rounded-2xl shadow-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group w-full lg:w-auto" 
                disabled={loading}
              >
                {loading ? ( <Loader2 className="h-5 w-5 animate-spin" /> ) : (
                  <>
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Process
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {error && (
            <Alert variant="destructive" className="bg-red-900/30 border-red-500/50 text-red-100">
              <AlertCircle className="h-4 w-4 text-red-200" />
              <AlertTitle className="text-red-200 font-semibold">Unable to Process Video</AlertTitle>
              <AlertDescription className="text-red-200/90">
                <p>{error}</p>
                <ul className="mt-2 text-sm list-disc pl-4 space-y-1 text-gray-200 dark:text-gray-300">
                  <li>Make sure the URL is from a public video that can be accessed without login</li>
                  <li>Try copying the URL directly from your browser's address bar</li>
                  <li>Some videos may be protected by the platform and cannot be downloaded</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {downloadOptions.length > 0 && (
            <div className="space-y-4 mt-6 p-6 bg-black/10 dark:bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "download" | "link")} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-black/20 dark:bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20">
                  <TabsTrigger value="download" className="data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-sm text-blue-200 hover:text-white rounded-lg transition-all duration-200 py-1.5 text-sm">Download Options</TabsTrigger>
                  <TabsTrigger value="link" className="data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-sm text-blue-200 hover:text-white rounded-lg transition-all duration-200 py-1.5 text-sm">Direct Link</TabsTrigger>
                </TabsList>

                <TabsContent value="download" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="format" translate="no" className="block text-sm font-medium mb-1 text-left text-white/90">Format</Label>
                      <Select value={selectedFormat || ""} onValueChange={handleFormatChange}>
                        <SelectTrigger id="format" className="bg-black/20 dark:bg-white/10 backdrop-blur-sm border-white/30 focus:border-cyan-300 h-12 text-base rounded-xl placeholder:text-white/70 focus:ring-4 focus:ring-cyan-300/20 text-white transition-all duration-300 w-full [&>span]:text-white [&>span[data-placeholder]]:text-white/70">
                          <SelectValue placeholder="Select format" className="font-medium text-white" style={{ color: 'white' }}>
                            {selectedFormat ? (
                              <span className="text-white" style={{ color: 'white' }}>{selectedFormat.toUpperCase()}</span>
                            ) : (
                              <span className="text-white/70" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Select format</span>
                            )}
                          </SelectValue> 
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800/95 backdrop-blur-md border-slate-600 text-white shadow-xl">
                          <SelectGroup>
                            <SelectLabel className="text-slate-300 px-2 py-1.5 text-sm font-medium">Available Formats</SelectLabel>
                            {availableFormats.map((format) => (
                              <SelectItem 
                                key={format} 
                                value={format}
                                className="text-white hover:bg-slate-700/80 hover:text-white focus:bg-slate-700/80 focus:text-white data-[state=checked]:bg-slate-700/90 data-[state=checked]:text-white cursor-pointer"
                              >
                                {format.toUpperCase()}
                                {(platform === 'dailymotion' || platform === 'bsky' || platform === 'reddit') && format === 'streaming' && ' (m3u8 format)'}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quality" translate="no" className="block text-sm font-medium mb-1 text-left text-white/90">Quality</Label>
                      <Select value={selectedQuality || ""} onValueChange={handleQualityChange}>
                        <SelectTrigger id="quality" className="bg-black/20 dark:bg-white/10 backdrop-blur-sm border-white/30 focus:border-cyan-300 h-12 text-base rounded-xl placeholder:text-white/70 focus:ring-4 focus:ring-cyan-300/20 text-white transition-all duration-300 w-full [&>span]:text-white [&>span[data-placeholder]]:text-white/70">
                          <SelectValue placeholder="Select quality" className="font-medium text-white" style={{ color: 'white' }}>
                            {selectedQuality ? (
                                  <span className="text-white" style={{ color: 'white' }}>
                                    {selectedQuality}
                                    {selectedFormat && selectedQuality && (
                                      <>
                                        {(platform === 'tiktok' || (platform === 'universal' && detectPlatform(url) === 'tiktok'))
                                          ? (selectedFormat.toLowerCase() === 'mp3' || selectedFormat.toLowerCase() === 'm4a'
                                              ? "" 
                                              : (downloadOptions.find(opt => opt.format === selectedFormat && opt.quality === selectedQuality)?.noWatermark === false ? " • With Watermark" : " • No Watermark"))
                                          : (platform === 'youtube' || (platform === 'universal' && detectPlatform(url) === 'youtube'))
                                              ? (Boolean(downloadOptions.find(opt => opt.format === selectedFormat && opt.quality === selectedQuality)?.hasAudio) ? " • With Audio" : " • No Audio")
                                              : ""
                                        }
                                      </>
                                    )}
                                  </span>
                                ) : (
                                  <span className="text-white/70" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Select quality</span>
                                )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800/95 backdrop-blur-md border-slate-600 text-white shadow-xl">
                          <SelectGroup>
                            <SelectLabel className="text-slate-300 px-2 py-1.5 text-sm font-medium">Available Qualities</SelectLabel>
                            {availableQualities.map((quality, index) => {
                              const option = downloadOptions.find(opt => opt.format === selectedFormat && opt.quality === quality);
                              const sizeInfo = option?.size && option.size !== "Unknown" ? ` (${option.size})` : "";
                              let extraInfo = "";
                              if (platform === 'tiktok' || (platform === 'universal' && detectPlatform(url) === 'tiktok')) {
                                if (option?.format.toLowerCase() === 'mp3' || option?.format.toLowerCase() === 'm4a') extraInfo = "";
                                else extraInfo = option?.noWatermark === false ? " • With Watermark" : " • No Watermark";
                              } else if (platform === 'youtube' || (platform === 'universal' && detectPlatform(url) === 'youtube')) {
                                extraInfo = Boolean(option?.hasAudio) ? " • With Audio" : " • No Audio";
                              }
                              return ( 
                                <SelectItem 
                                  key={`${quality}-${index}`} 
                                  value={quality}
                                  className="text-white hover:bg-slate-700/80 hover:text-white focus:bg-slate-700/80 focus:text-white data-[state=checked]:bg-slate-700/90 data-[state=checked]:text-white cursor-pointer"
                                > 
                                  {quality}{sizeInfo}{extraInfo} 
                                </SelectItem> 
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {(platform === 'dailymotion' || platform === 'bsky' || platform === 'reddit' || (platform === 'universal' && (detectPlatform(url) === 'reddit' || detectPlatform(url) === 'dailymotion' || detectPlatform(url) === 'bsky'))) && selectedFormat === 'streaming' && (
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md text-sm text-blue-700 dark:text-blue-300 mb-2">
                      <div className="font-semibold mb-1">{platform === 'dailymotion' ? 'Dailymotion' : platform === 'bsky' ? 'Bluesky' : platform === 'reddit' ? 'Reddit' : (platform === 'universal' && detectPlatform(url) === 'dailymotion') ? 'Dailymotion' : (platform === 'universal' && detectPlatform(url) === 'bsky') ? 'Bluesky' : 'Reddit'} videos use HLS streaming format:</div>
                      <ol className="list-decimal ml-5 mt-1">
                        <li>Use "Download Now" to save the streaming file or "Copy Link" to get the URL</li>
                        <li>For direct MP4 download, you can use an external tool like VLC Player or FFmpeg</li>
                        <li>Streaming files (m3u8) need special players or converters to be viewed offline</li>
                      </ol>
                    </div>
                  )}

                  {/* Info message for large files - auto-switch to Direct Link */}
                  {isLargeFile && fileSize && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-md border border-blue-200 dark:border-blue-800 mb-3">
                      <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
                        💡 Large File Detected ({Math.round(fileSize / 1024 / 1024)}MB)
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-300">
                        Clicking "Download Now" will switch you to the <strong>"Direct Link"</strong> tab for the best download experience with large files.
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={handleDownload}
                    disabled={!downloadUrl || downloadLoading}
                    className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-400 text-white h-14 px-10 rounded-2xl shadow-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
                    size="lg"
                  >
                    {downloadLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-3 group-hover:animate-bounce" /> 
                        {(platform === 'dailymotion' || platform === 'bsky' || platform === 'reddit' || (platform === 'universal' && (detectPlatform(url) === 'reddit' || detectPlatform(url) === 'dailymotion' || detectPlatform(url) === 'bsky'))) && (selectedFormat?.toLowerCase() === 'streaming' || downloadUrl?.includes('.m3u8'))
                          ? 'Download Streaming File (m3u8)'
                          : selectedFormat?.toLowerCase() === 'streaming' || downloadUrl?.includes('.m3u8')
                            ? 'Download Streaming File (m3u8)'
                            : 'Download Now'}
                      </>
                    )}
                  </Button>
                </TabsContent>
                <TabsContent value="link" className="space-y-4" data-test-id="direct-link-tab">
                  <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                    <Input
                      value={downloadUrl || ""}
                      readOnly
                      className="flex-1 bg-black/20 dark:bg-white/10 border-white/30 text-white rounded-xl"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        copyToClipboard(e)
                      }}
                      disabled={!downloadUrl}
                      data-test-id="copy-link-button"
                      className="border-cyan-400/50 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 hover:text-cyan-100 hover:border-cyan-300 transition-colors"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {/* Show different messages based on platform and file size */}
                    {(() => {
                      const detectedPlatform = detectPlatform(url)
                      const isWeibo = platform === 'weibo' || (platform === 'universal' && detectedPlatform === 'weibo')
                      const sizeMB = fileSize ? Math.round(fileSize / 1024 / 1024) : null

                      // Weibo-specific message
                      if (isWeibo) {
                        return (
                          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
                            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                              🐦 Weibo Direct CDN Link - How to Use
                            </p>
                            <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1 list-disc ml-5">
                              <li><strong>Step 1:</strong> Click the copy button above to copy the video URL</li>
                              <li><strong>Step 2:</strong> Open a NEW browser tab and paste the URL in the address bar</li>
                              <li><strong>Step 3:</strong> Press Enter - the video will start downloading automatically</li>
                              {sizeMB && <li>File size: {sizeMB}MB {isLargeFile && '(Large file)'}</li>}
                              <li className="font-semibold text-blue-800 dark:text-blue-200">💡 Tip: This direct method works best for Weibo videos up to 1GB!</li>
                            </ul>
                          </div>
                        )
                      }

                      // Large file warning for all platforms
                      if (isLargeFile && sizeMB) {
                        return (
                          <div className="p-3 bg-yellow-50 dark:bg-yellow-950/50 rounded-md border border-yellow-200 dark:border-yellow-800">
                            <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
                              ⚠️ Large File Detected ({sizeMB}MB)
                            </p>
                            <ul className="text-sm text-yellow-600 dark:text-yellow-300 space-y-1 list-disc ml-5">
                              <li>We recommend using this direct link for files over 25MB</li>
                              <li>Copy and paste into your browser or use a download manager (IDM, DownThemAll)</li>
                              <li>The "Download Now" button may timeout for very large files</li>
                              <li className="font-semibold text-yellow-800 dark:text-yellow-200">✨ We care about you - supports files up to 1GB!</li>
                            </ul>
                          </div>
                        )
                      }

                      // Default message for normal files
                      return (
                        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
                          <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                            💡 How to use this direct link:
                          </p>
                          <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1 list-disc ml-5">
                            <li>Copy the link using the button above</li>
                            <li>Paste it into your browser address bar or any download manager</li>
                            <li>The video will start downloading directly</li>
                            {sizeMB && <li>File size: {sizeMB}MB</li>}
                          </ul>
                        </div>
                      )
                    })()}
                    <p className="text-sm text-gray-300 dark:text-gray-400">
                      We care about providing you with the best experience. This direct link gives you full control over your download. For better stability with large files, consider using a download manager like IDM or DownThemAll.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </form>

      {/* Download Limit Modal - only show on homepage/universal */}
      {isHomepage && limitState && (
        <DownloadLimitModal
          open={showLimitModal}
          onOpenChange={setShowLimitModal}
          platform={currentPlatform}
          platformUrl={platformUrl}
          count={limitState.count}
          limit={limitState.limit}
          resetTimestamp={limitState.resetTimestamp}
          onProceed={() => {
            handleProceed(currentPlatform)
            setShowLimitModal(false)
          }}
        />
      )}
    </div> 
  )
}
