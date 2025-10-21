import "server-only"
import { cache } from "react"
import type { Platform } from "@/lib/platform-detector"
import type { DownloadResult } from "@/lib/api"

// Cached fetch function for reusing requests across RSCs
export const fetchWithCache = cache(async (url: string, options?: RequestInit) => {
  const res = await fetch(url, {
    ...options,
    // Add next.js revalidation options
    next: {
      revalidate: 3600, // Revalidate every hour
    },
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
})

// Server action for downloading content
export async function downloadContentServer(url: string, platform: Platform): Promise<DownloadResult> {
  "use server"

  try {
    // Use our proxy endpoint instead of calling the ZM API directly
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/proxy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, platform }),
      // Add cache control
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Failed to download from ${platform}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error downloading from ${platform}:`, error)
    throw error
  }
}
