"use client"

import { useState } from "react"
import { Download, Loader2, Play } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DownloadModal } from "./download-modal"

interface HlsPlayerProps {
  src: string
  title?: string
  poster?: string
  onClose?: () => void
}

interface ModalData {
  directUrl: string
  vlcUrl: string
  resolution: string
  instructions: string[]
}

export function HlsPlayer({
  src,
  title = "Video",
  poster,
  onClose,
}: HlsPlayerProps) {
  const [downloading, setDownloading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<ModalData | null>(null)

  const handleDownload = async () => {
    try {
      setDownloading(true)
      toast.info("Preparing video for download...", { duration: 5000 })

      const response = await fetch("/api/mp4-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: src,
          title: title.replace(/\s+/g, "_").toLowerCase(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to prepare video for download")
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to prepare download")
      }

      toast.success("Video stream ready!", { duration: 3000 })
      setModalData({
        directUrl: data.directUrl,
        vlcUrl: data.vlcUrl,
        resolution: data.resolution,
        instructions: data.instructions,
      })
      setIsModalOpen(true)
    } catch (err) {
      console.error("Download error:", err)
      toast.error("Download failed. Try using an external downloader.")
    } finally {
      setDownloading(false)
    }
  }

  const openInVlc = () => {
    // Create a special link to open in VLC
    const vlcUrl = `vlc://${src}`
    window.location.href = vlcUrl
    
    // Fallback if VLC protocol handler is not registered
    setTimeout(() => {
      toast.info("Opening in VLC. If VLC doesn't open, copy the direct link and open it manually in VLC.", {
        duration: 5000,
      })
    }, 1000)
  }

  return (
    <>
      <Card className="relative overflow-hidden rounded-lg">
        <div className="p-6 text-center">
          <h3 className="mb-2 text-lg font-medium">{title}</h3>

          {poster && (
            <div className="aspect-video mb-4 overflow-hidden rounded-md bg-black">
              <img
                src={poster}
                alt={title}
                className="h-full w-full object-contain"
              />
            </div>
          )}

          <p className="mb-4 text-muted-foreground">
            Direct video playback is not available. Please use the download
            options below.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1"
            >
              {downloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" /> Download MP4
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={openInVlc}
              className="flex-1"
            >
              <Play className="mr-2 h-4 w-4" /> Open in VLC
            </Button>
          </div>
        </div>
      </Card>
      {isModalOpen && modalData && (
        <DownloadModal {...modalData} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}
