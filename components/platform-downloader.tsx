"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, Check, Copy, Download, Loader2, Play, ArrowRight } from "lucide-react"
import { toast } from "sonner"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { detectPlatform } from "@/lib/platform-detector"
import { HlsPlayer } from "@/components/hls-player"

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

  const getPlaceholder = (platform: string) => {
    const placeholders: { [key: string]: string } = {
      youtube: "https://www.youtube.com/watch?v=...",
      tiktok: "https://www.tiktok.com/@user/video/...",
      facebook: "https://www.facebook.com/user/videos/...",
      twitter: "https://twitter.com/user/status/...",
      instagram: "https://www.instagram.com/p/...",
      vimeo: "https://vimeo.com/...",
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
      let potentialUrl = currentInput.substring(startIndex);
      const spaceIndex = potentialUrl.search(/\s/);
      if (spaceIndex !== -1) {
        potentialUrl = potentialUrl.substring(0, spaceIndex);
      }
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
      
      // Debug logging for Reddit URLs
      if (finalUrlToProcess.includes('reddit.com') || finalUrlToProcess.includes('redd.it')) {
        console.log('Reddit URL detected:', finalUrlToProcess);
        console.log('Detected platform:', detectedPlatform);
        console.log('Current platform:', platform);
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

      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ url: finalUrlToProcess, platform: detectedPlatform || platform }), 
      })

      const data: ApiResponse = await response.json()

      if (!response.ok) {
        const errorMessage = data.message || (data.details ? JSON.stringify(data.details) : "Unknown error");
        if (response.status === 500) {
          setError(platform !== "universal" ? "We couldn't process this URL. Try using our Universal downloader instead." : "We couldn't process this URL. The video may be private, removed, or from an unsupported source.");
        } else if (response.status === 404) {
          setError("The video could not be found. It may have been deleted or made private.");
        } else if (errorMessage.includes("Invalid API response format")) {
          setError(platform !== "universal" ? "This URL format isn't supported. Try our Universal downloader." : "This URL format isn't supported. Please use a valid video link.");
        } else if (errorMessage.includes("timeout")) {
          setError("The request timed out. Please try again later.");
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
              if (['tiktok', 'facebook', 'twitter', 'instagram', 'vimeo', 'telegram', 'tumblr', 'snapchat', 'pinterest', 'linkedin', 'dailymotion', 'rumble', 'youtube'].includes(platform)) return true;
              if (platform === 'imgur') return (format.toLowerCase() === 'mp4' || format.toLowerCase() === 'webm' || (media.mimeType && media.mimeType.includes('video')));
              return !!(media.audioQuality || (media.mimeType && media.mimeType.includes('mp4a')) || (media.codecs && media.codecs.includes('mp4a')) || media.formatId === 18 || quality.toLowerCase().includes('audio') || format.toLowerCase() === 'mp3' || format.toLowerCase() === 'm4a');
            })();
            if (platform === 'tiktok') {
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

      if (platform === 'tiktok') {
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
      if (defaultOption) setDownloadUrl(defaultOption.url)
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
      try {
        setDownloadLoading(true)
        toast.info("Starting download...", { duration: 3000 })
        let filename = `${platform}_download.${selectedFormat?.toLowerCase() || 'mp4'}`
        const detectedPlatform = detectPlatform(url);
        
        // Check if this is a YouTube/googlevideo URL - download directly without proxy
        const isYouTubeUrl = downloadUrl.includes('googlevideo.com') || downloadUrl.includes('youtube.com/videoplayback') || platform === 'youtube' || (platform === 'universal' && detectedPlatform === 'youtube');
        
        if (isYouTubeUrl) {
          // For YouTube, use a free third-party download service
          toast.info("Preparing YouTube download...", { duration: 3000 });
          
          try {
            // Store the video URL in session storage for reference
            sessionStorage.setItem('lastYouTubeUrl', url);
            sessionStorage.setItem('lastYouTubeDownloadUrl', downloadUrl);
            
            // Extract video ID from URL
            const videoId = url.split('watch?v=')[1]?.split('&')[0] || 
                           url.split('youtu.be/')[1]?.split('?')[0] ||
                           url.split('youtube.com/shorts/')[1]?.split('?')[0];
            
            if (videoId) {
              // Use y2mate free YouTube download service (no auth required)
              const youtubeDownloadService = `https://y2mate.com/en/download-youtube/${videoId}`;
              window.open(youtubeDownloadService, '_blank');
            } else {
              // Fallback if we can't extract video ID
              window.open(url, '_blank');
            }
            
            toast.success("YouTube download service opened! Complete the download there.", { duration: 5000 });
            setDownloadLoading(false);
            return;
          } catch (ytError) {
            console.error('YouTube download service error:', ytError);
            // Fallback: Open video URL directly
            window.open(url, '_blank');
            setDownloadLoading(false);
            return;
          }
        }
        
        if ((downloadUrl.includes('.m3u8') || selectedFormat?.toLowerCase() === 'streaming') && (platform === 'dailymotion' || platform === 'bsky' || platform === 'reddit' || (platform === 'universal' && detectedPlatform === 'reddit'))) {
          filename = filename.replace(/\.(mp4|streaming)$/, '.m3u8');
          toast.info("Downloading m3u8 streaming file...", { duration: 8000 });
          const response = await fetch('/api/hls-download', { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ url: downloadUrl, title: `${platform === 'universal' ? detectedPlatform : platform}_${Date.now()}` }), });
          if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.error || 'Download failed'); }
          const blob = await response.blob(); const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a'); link.href = blobUrl; link.download = `${platform === 'universal' ? detectedPlatform : platform}_stream_${Date.now()}.m3u8`; document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(blobUrl);
          toast.success("Download successful! Use VLC Media Player to open.");
          setDownloadLoading(false); return;
        } 
        else if (downloadUrl.includes('.m3u8') || selectedFormat?.toLowerCase() === 'streaming') {
          filename = filename.replace(/\.(mp4|streaming)$/, '.m3u8');
          toast.info("This is a streaming format (m3u8).", { duration: 6000 });
          if (!confirm("This is a streaming format. Download m3u8 file? (Cancel to copy link)")) { setDownloadLoading(false); copyToClipboard(); return; }
        }
        const response = await fetch('/api/download', { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ url: downloadUrl, filename, platform }), })
        if (!response.ok) throw new Error('Download failed')
        const blob = await response.blob(); const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a'); link.href = blobUrl; link.download = filename; document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(blobUrl);
        toast.success("Download successful!")
      } catch (error) {
        console.error('Download error:', error); toast.error("Download failed. Try direct link.");
        window.open(downloadUrl, "_blank")
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
              <Tabs defaultValue="download" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-black/20 dark:bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20">
                  <TabsTrigger value="download" className="data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-sm text-blue-200 hover:text-white rounded-lg transition-all duration-200 py-1.5 text-sm">Download Options</TabsTrigger>
                  <TabsTrigger value="link" className="data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-sm text-blue-200 hover:text-white rounded-lg transition-all duration-200 py-1.5 text-sm">Direct Link</TabsTrigger>
                </TabsList>
                
                {showPlayer && platform === 'dailymotion' && downloadUrl && (
                  <div className="mt-4 mb-2">
                    <HlsPlayer src={downloadUrl} title={videoTitle} poster={thumbnail} />
                  </div>
                )}
                
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
                                        {platform === 'tiktok' 
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
                              if (platform === 'tiktok') {
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
                  {(platform === 'dailymotion' || platform === 'bsky' || platform === 'reddit' || (platform === 'universal' && detectPlatform(url) === 'reddit')) && selectedFormat === 'streaming' && (
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md text-sm text-blue-700 dark:text-blue-300 mb-2">
                      <div className="font-semibold mb-1">{platform === 'dailymotion' ? 'Dailymotion' : platform === 'bsky' ? 'Bluesky' : (platform === 'universal' && detectPlatform(url) === 'reddit') ? 'Reddit' : 'Reddit'} videos use HLS streaming format:</div>
                      <ol className="list-decimal ml-5 mt-1">
                        <li>Use "Download Now" to save the streaming file or "Copy Link" to get the URL</li>
                        <li>For direct MP4 download, you can use an external tool like VLC Player or FFmpeg</li>
                        <li>Streaming files (m3u8) need special players or converters to be viewed offline</li>
                      </ol>
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
                        {(platform === 'dailymotion' || platform === 'bsky' || platform === 'reddit' || (platform === 'universal' && detectPlatform(url) === 'reddit')) && (selectedFormat?.toLowerCase() === 'streaming' || downloadUrl?.includes('.m3u8'))
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
                        copyToClipboard(e);
                      }} 
                      disabled={!downloadUrl}
                      data-test-id="copy-link-button"
                      className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-300 dark:text-gray-400"> 
                    You can copy this direct download link and use it in another download manager.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </form>
    </div> 
  )
}
