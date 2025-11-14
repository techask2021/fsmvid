"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPlatformName } from "@/lib/download/platform-detector"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface RecentDownload {
  url: string
  platform: string
  title: string
  thumbnail: string
  timestamp: string
}

export default function RecentDownloads() {
  const [downloads, setDownloads] = useState<RecentDownload[]>([])

  useEffect(() => {
    try {
      const storedDownloads = localStorage.getItem("recentDownloads")
      if (storedDownloads) {
        setDownloads(JSON.parse(storedDownloads))
      }
    } catch (error) {
      console.error("Error loading recent downloads:", error)
    }
  }, [])

  const clearDownloads = () => {
    localStorage.removeItem("recentDownloads")
    setDownloads([])
  }

  if (downloads.length === 0) {
    return null
  }

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Downloads</CardTitle>
        <Button variant="outline" size="sm" onClick={clearDownloads}>
          <Trash2 className="h-4 w-4 mr-2" />
          Clear History
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {downloads.map((download, index) => (
            <div key={index} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted/50">
              <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={download.thumbnail || "/placeholder.svg?height=64&width=64"}
                  alt={download.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{download.title}</p>
                <p className="text-sm text-muted-foreground">
                  {getPlatformName(download.platform as any)} • {new Date(download.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
