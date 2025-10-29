"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Download, Sparkles } from "lucide-react"

interface DownloadLimitModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  platform: string
  platformUrl: string
  count: number
  limit: number
  resetTimestamp: number // Unix timestamp when limit resets
  onProceed: () => void
}

/**
 * Friendly modal to encourage users to visit platform-specific pages
 * 
 * Shows after 3 downloads on homepage
 * Offers unlimited downloads on platform pages
 */
export function DownloadLimitModal({
  open,
  onOpenChange,
  platform,
  platformUrl,
  count,
  limit,
  resetTimestamp,
  onProceed,
}: DownloadLimitModalProps) {
  const platformName = getPlatformDisplayName(platform)
  const platformEmoji = getPlatformEmoji(platform)
  const [countdown, setCountdown] = useState('')

  // Live countdown timer
  useEffect(() => {
    if (!open) return

    const updateCountdown = () => {
      const now = Date.now()
      const diff = resetTimestamp - now

      if (diff <= 0) {
        setCountdown('0m 0s')
        return
      }

      const minutes = Math.floor(diff / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setCountdown(`${minutes}m ${seconds}s`)
    }

    updateCountdown() // Initial update
    const interval = setInterval(updateCountdown, 1000) // Update every second

    return () => clearInterval(interval)
  }, [open, resetTimestamp])

  const handleProceed = () => {
    // Open platform page in new tab
    window.open(platformUrl, '_blank', 'noopener,noreferrer')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="text-4xl">{platformEmoji}</div>
            <DialogTitle className="text-2xl">
              Great Job! 🎉
            </DialogTitle>
          </div>
          <div className="text-base space-y-3 pt-2">
            <p className="text-lg font-medium text-foreground">
              You've completed {limit} downloads on the homepage!
            </p>
            <p className="text-muted-foreground">
              For <span className="font-semibold text-primary">unlimited {platformName} downloads</span>, visit our dedicated page with enhanced features:
            </p>
          </div>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">No Limits</p>
              <p className="text-sm text-muted-foreground">Download as many videos as you want</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Download className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Platform-Optimized</p>
              <p className="text-sm text-muted-foreground">Better quality and faster downloads</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Always Available</p>
              <p className="text-sm text-muted-foreground">No waiting, no reset timers</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Homepage downloads reset in:
          </p>
          <p className="text-2xl font-bold text-primary tabular-nums">
            {countdown || '60m 0s'}
          </p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            onClick={handleProceed}
            className="w-full gap-2"
            size="lg"
          >
            Go to {platformName} Downloader
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/**
 * Get platform display name
 */
function getPlatformDisplayName(platform: string): string {
  const names: Record<string, string> = {
    youtube: 'YouTube',
    tiktok: 'TikTok',
    instagram: 'Instagram',
    facebook: 'Facebook',
    twitter: 'Twitter (X)',
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

  return names[platform.toLowerCase()] || platform
}

/**
 * Get platform emoji
 */
function getPlatformEmoji(platform: string): string {
  const emojis: Record<string, string> = {
    youtube: '🎬',
    tiktok: '🎵',
    instagram: '📸',
    facebook: '👥',
    twitter: '🐦',
    reddit: '🤖',
    dailymotion: '🎥',
    snapchat: '👻',
    pinterest: '📌',
    tumblr: '📝',
    linkedin: '💼',
    threads: '🧵',
    soundcloud: '🎧',
    spotify: '🎶',
    mixcloud: '🎛️',
    vimeo: '🎞️',
    rumble: '📹',
    bluesky: '🦋',
    bsky: '🦋',
    truthsocial: '🇺🇸',
    telegram: '✈️',
    imgur: '🖼️',
    weibo: '🐦',
    douyin: '🎵',
    kuaishou: '⚡',
    bilibili: '📺',
    '9gag': '😂',
    imdb: '🎭',
    espn: '⚽',
    ted: '💡',
    capcut: '✂️',
    febspot: '🎵',
    ifunny: '😄',
    bitchute: '📹',
    xiaohongshu: '📕',
    castbox: '🎙️',
    deezer: '🎵',
    zingmp3: '🎵',
  }

  return emojis[platform.toLowerCase()] || '🎬'
}

