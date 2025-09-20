import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Mock fetchPlatformData function (replace with your actual data fetching logic)
async function fetchPlatformData(platform: string) {
  // Simulate an API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (platform === "ios") {
    return {
      title: "iOS Platform",
      description: "Information about the iOS platform.",
    }
  } else if (platform === "android") {
    return {
      title: "Android Platform",
      description: "Information about the Android platform.",
    }
  } else {
    return {
      title: "Unknown Platform",
      description: "No information available for this platform.",
    }
  }
}

// This is a server component that fetches platform data
async function PlatformData({ platform }: { platform: string }) {
  // Fetch data for this platform (this will be suspended)
  const data = await fetchPlatformData(platform)

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">{data.title}</h3>
      <p>{data.description}</p>
      {/* More platform-specific content */}
    </div>
  )
}

// Loading fallback
function PlatformSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  )
}

// Parent component that uses Suspense
export default function PlatformSection({ platform }: { platform: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<PlatformSkeleton />}>
          <PlatformData platform={platform} />
        </Suspense>
      </CardContent>
    </Card>
  )
}
