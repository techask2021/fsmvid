import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPlatformName, getUrlSlug, type Platform } from "@/lib/download/platform-detector"

interface RelatedToolsProps {
  currentPlatform: Platform
  limit?: number
}

export default function RelatedTools({ currentPlatform, limit = 18 }: RelatedToolsProps) {
  // List of all available platforms
  const allPlatforms: Platform[] = [
    "youtube",
    "tiktok",
    "facebook",
    "twitter",
    "instagram",
    "dailymotion",
    "telegram",
    "tumblr",
    "snapchat",
    "pinterest",
    "linkedin",
    "imgur",
    "rumble",
    "9gag",
    "bitchute",
    "bsky",
    "capcut",
    "douyin",
    "espn",
    "febspot",
    "ifunny",
    "imdb",
    "kuaishou",
    "mixcloud",
    "reddit",
    "soundcloud",
    "spotify",
    "ted",
    "threads",
    "weibo",
    "xiaohongshu",
    "zingmp3",
    "bilibili",
    "deezer",
    "castbox",
  ]

  // Filter out the current platform and get random related platforms
  const relatedPlatforms = allPlatforms
    .filter((platform) => platform !== currentPlatform)
    .sort(() => 0.5 - Math.random()) // Shuffle array
    .slice(0, limit) // Take only the number specified by limit

  // If no platforms after filtering, return null
  if (relatedPlatforms.length === 0) {
    return null
  }

  return (
    <div className="w-screen bg-slate-50 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      <section className="py-24">
        <div className="container px-6 mx-auto relative z-10 max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-blue-600/10 text-blue-600 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
              Explore
            </Badge>
            <h2 className="text-xl md:text-3xl font-black tracking-tighter italic uppercase text-slate-900 leading-[0.9]">
              Related <span className="text-blue-600">Tools</span>
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto font-medium italic pt-4 mt-2 leading-relaxed">
              Discover more video downloaders for your favorite social media platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mx-auto">
            {relatedPlatforms.map((platform) => {
              const platformName = getPlatformName(platform)
              const platformSlug = getUrlSlug(platform)
              const iconFileName = `${platform}.svg`

              return (
                <Link href={`/${platformSlug}`} key={platform} className="group">
                  <Card className="border border-blue-500 shadow-md hover:shadow-2xl bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl overflow-hidden h-full flex flex-col group-hover:translate-y-[-5px] transition-all duration-500 group-hover:shadow-blue-600/30 relative">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardContent className="p-4 pt-6 text-center flex flex-col items-center flex-1 relative z-10">
                      <div className="w-11 h-11 mb-3 flex items-center justify-center rounded-xl bg-white shadow-lg border border-blue-400 group-hover:scale-110 transition-transform duration-500">
                        <img
                          src={`/icons/${iconFileName}`}
                          alt={platformName}
                          className="h-6 w-6"
                          loading="lazy"
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-black italic uppercase tracking-tighter text-white transition-colors text-[10px] sm:text-xs">
                          {platformName}
                        </h3>
                        <p className="text-[9px] text-blue-100 font-medium leading-relaxed italic line-clamp-1">
                          Downloader
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
