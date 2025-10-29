"use client"

import type React from "react"
import Link from "next/link"
import { useState, lazy, Suspense, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Download, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert" // AlertTitle might not be used here
import { detectPlatform } from "@/lib/platform-detector"
import type { DownloadResult } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useDownloadLimit } from "@/hooks/use-download-limit"
import { DownloadLimitModal } from "./download-limit-modal"
import { DownloadHintBanner } from "./download-hint-banner"

// Lazy load the download results component
const DownloadResults = lazy(() => import("./download-results"))

export default function UniversalDownloader() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [downloadData, setDownloadData] = useState<DownloadResult | null>(null)
  const { toast } = useToast()
  
  // Download limit tracking (only on homepage)
  const pathname = usePathname()
  const isHomepage = !!(pathname === '/')
  const { limitState, checkLimit, handleBypass, handleProceed } = useDownloadLimit()
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [currentPlatform, setCurrentPlatform] = useState("")
  const [platformUrl, setPlatformUrl] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('[DEBUG] handleSubmit called')
    console.log('[DEBUG] pathname:', pathname)
    console.log('[DEBUG] isHomepage:', isHomepage)

    if (!url) {
      setError("Please enter a URL")
      return
    }

    setLoading(true)
    setError("")
    setDownloadData(null)
    setShowHint(false) // Hide hint when starting new download

    try {
      const platform = detectPlatform(url)
      console.log('[DEBUG] Detected platform:', platform)

      if (!platform) {
        throw new Error("Unsupported platform or invalid URL")
      }

      // Check download limit (only on homepage)
      console.log('[DEBUG] About to check if homepage...', { isHomepage, pathname })
      if (isHomepage) {
        console.log('[Download Limit] ✅ IS HOMEPAGE - Checking limit for platform:', platform)
        const limitStatus = checkLimit(platform, true)
        console.log('[Download Limit] Status:', limitStatus)
        setCurrentPlatform(platform)
        
        // Get platform URL for modal (don't call handleProceed, just construct URL)
        const platformUrl = `/` + platform.toLowerCase() + '-video-saver'
        setPlatformUrl(platformUrl)
        
        // Show modal if limit reached
        if (limitStatus.shouldShowModal) {
          console.log('[Download Limit] SHOWING MODAL!')
          setShowLimitModal(true)
          // Don't block the download, just show modal
        }
        
        // Show hint if on second download
        if (limitStatus.shouldShowHint && limitStatus.remainingDownloads > 0) {
          console.log('[Download Limit] SHOWING HINT! Remaining:', limitStatus.remainingDownloads)
          setShowHint(true)
        }
      }

      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, platform }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to download content")
      }

      const data = await response.json()
      setDownloadData(data)

      saveToRecentDownloads(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while downloading")
    } finally {
      setLoading(false)
    }
  }

  const saveToRecentDownloads = (data: DownloadResult) => {
    try {
      const recentDownloads = JSON.parse(localStorage.getItem("recentDownloads") || "[]")
      recentDownloads.unshift({
        url: data.url,
        platform: data.platform,
        title: data.title,
        thumbnail: data.thumbnail,
        timestamp: new Date().toISOString(),
      })
      const updatedDownloads = recentDownloads.slice(0, 10)
      localStorage.setItem("recentDownloads", JSON.stringify(updatedDownloads))
    } catch (error) {
      console.error("Error saving to recent downloads:", error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Link copied",
          description: "Download link copied to clipboard",
        })
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto shadow-lg bg-white/5 border-white/10 backdrop-blur-lg" id="download" data-downloader="true"> {/* Optional: Added some glassmorphism to card */}
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-center text-white/90">Download Any Content</CardTitle> {/* Adjusted text color */}
        </CardHeader>
        <CardContent className="pt-4">
          {/* Show hint banner if on download #2 */}
          {showHint && limitState && isHomepage && (
            <DownloadHintBanner
              remainingDownloads={limitState.remainingDownloads}
              platformName={currentPlatform}
              platformUrl={platformUrl}
              onDismiss={() => setShowHint(false)}
            />
          )}

          <form onSubmit={handleSubmit} translate="no" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="url"
              placeholder="Paste URL from any platform here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-white/20 backdrop-blur-sm border-white/30 focus:border-cyan-300 h-14 text-base rounded-2xl placeholder:text-blue-200 focus:ring-4 focus:ring-cyan-300/20 text-white transition-all duration-300 flex-1"
              aria-label="Content URL"
              translate="no"
            />
            <Button 
              type="submit" 
              disabled={loading} 
              size="lg"
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-400 text-white h-14 px-8 rounded-2xl shadow-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group w-full sm:w-auto" 
              aria-label="Download content" 
              translate="no"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Download
                </>
              )}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-900/30 border-red-500/50 text-red-100">
              <AlertCircle className="h-4 w-4 text-red-200" />
              {/* <AlertTitle className="text-red-200 font-semibold">Error</AlertTitle>  Removed title as it's not in original */}
              <AlertDescription className="text-red-200/90">{error}</AlertDescription>
            </Alert>
          )}

          {downloadData && downloadData.downloadOptions.length > 0 && (
            <Suspense fallback={<div className="animate-pulse h-64 bg-muted/30 rounded-md"></div>}>
              <DownloadResults data={downloadData} onCopyToClipboard={copyToClipboard} />
            </Suspense>
          )}

          {downloadData && downloadData.downloadOptions.length === 0 && (
            <Alert className="bg-yellow-900/30 border-yellow-500/50 text-yellow-100"> {/* Styled no options alert */}
              <AlertCircle className="h-4 w-4 text-yellow-200" />
              <AlertDescription className="text-yellow-200/90">No download options available for this content.</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>

    {/* Download Limit Modal - only show on homepage */}
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
    </>
  )
}
