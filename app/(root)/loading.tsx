import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Hero section skeleton */}
        <div className="text-center space-y-6">
          <Skeleton className="h-8 w-40 mx-auto" />
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Downloader skeleton */}
        <div className="w-full max-w-3xl mx-auto">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>

        {/* Features skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-64 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
