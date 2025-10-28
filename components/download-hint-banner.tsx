"use client"

import { Info, X, ArrowRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

interface DownloadHintBannerProps {
  remainingDownloads: number
  platformName: string
  platformUrl: string
  onDismiss?: () => void
}

/**
 * Subtle hint banner shown after download #2
 * Encourages users to visit platform pages for unlimited downloads
 */
export function DownloadHintBanner({
  remainingDownloads,
  platformName,
  platformUrl,
  onDismiss,
}: DownloadHintBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  if (dismissed) return null

  // Get friendly platform name
  const getPlatformDisplayName = (platform: string): string => {
    const names: Record<string, string> = {
      youtube: 'YouTube',
      tiktok: 'TikTok',
      instagram: 'Instagram',
      facebook: 'Facebook',
      twitter: 'Twitter',
      reddit: 'Reddit',
      dailymotion: 'Dailymotion',
      snapchat: 'Snapchat',
      pinterest: 'Pinterest',
      tumblr: 'Tumblr',
      linkedin: 'LinkedIn',
      threads: 'Threads',
      soundcloud: 'SoundCloud',
      spotify: 'Spotify',
      mixcloud: 'Mixcloud',
      vimeo: 'Vimeo',
      rumble: 'Rumble',
      bluesky: 'Bluesky',
      bsky: 'Bluesky',
      truthsocial: 'Truth Social',
      telegram: 'Telegram',
      imgur: 'Imgur',
      weibo: 'Weibo',
      douyin: 'Douyin',
      kuaishou: 'Kuaishou',
      bilibili: 'Bilibili',
      '9gag': '9GAG',
      imdb: 'IMDB',
      espn: 'ESPN',
      ted: 'TED',
      capcut: 'CapCut',
      febspot: 'Febspot',
      ifunny: 'iFunny',
      bitchute: 'BitChute',
      xiaohongshu: 'Xiaohongshu',
      castbox: 'Castbox',
      deezer: 'Deezer',
      zingmp3: 'ZingMP3',
    }
    return names[platform?.toLowerCase()] || 'platform-specific'
  }

  const displayName = getPlatformDisplayName(platformName)

  return (
    <Alert className="border-orange-500/50 bg-orange-50 dark:bg-orange-950/20 mb-4 animate-in slide-in-from-top-2">
      <Info className="h-4 w-4 text-orange-600 dark:text-orange-400" />
      <AlertDescription className="flex items-center justify-between gap-2 ml-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-foreground">
            💡 <span className="font-semibold text-orange-700 dark:text-orange-300">{remainingDownloads} download{remainingDownloads !== 1 ? 's' : ''} remaining</span> on the homepage.
          </span>
          <Link 
            href={platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Visit {displayName} Downloader for unlimited downloads
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}

