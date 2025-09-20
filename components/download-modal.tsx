"use client"

import { useEffect } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

interface DownloadModalProps {
  directUrl: string
  vlcUrl: string
  resolution: string
  instructions: string[]
  onClose: () => void
}

export function DownloadModal({
  directUrl,
  vlcUrl,
  resolution,
  instructions,
  onClose,
}: DownloadModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [onClose])

  const handleCopy = () => {
    navigator.clipboard.writeText(directUrl)
    toast.success("URL copied to clipboard")
  }

  const handleOpenInVlc = () => {
    window.location.href = vlcUrl
    setTimeout(() => {
      toast.info(
        "Opening in VLC. If VLC doesn't open, copy the URL manually."
      )
    }, 1000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose}
    >
      <div
        className="w-11/12 max-w-lg rounded-lg bg-white p-6 text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-4 text-lg font-medium">Download Video as MP4</h3>
        <p className="mb-2">
          {resolution !== "unknown"
            ? `Video resolution: ${resolution}`
            : "Video quality: Best available"}
        </p>
        <ul className="mb-4 list-inside list-disc space-y-1">
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
        <label className="mb-1 block font-bold">
          Video stream URL (copy this for external tools):
        </label>
        <input
          type="text"
          readOnly
          value={directUrl}
          className="mb-4 w-full rounded border border-gray-300 p-2"
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleCopy}
            className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Copy URL
          </Button>
          <Button
            onClick={handleOpenInVlc}
            className="flex-1 bg-orange-500 text-white hover:bg-orange-600"
          >
            Open in VLC
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white hover:bg-gray-600"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
