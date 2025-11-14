import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Download } from "lucide-react"
import { getPlatformName, getUrlSlug, type Platform } from "@/lib/download/platform-detector"

interface RelatedToolsProps {
  currentPlatform: Platform
  limit?: number
}

export default function RelatedTools({ currentPlatform, limit = 6 }: RelatedToolsProps) {
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
    <div className="w-screen bg-gray-50 dark:bg-gray-900 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      <section className="py-16">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container px-6 mx-auto relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-500/10 dark:text-purple-300 dark:hover:bg-purple-500/20 px-4 py-2 text-sm font-medium">
              More Tools
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Related Tools</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover more video downloaders for your favorite social media platforms
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {relatedPlatforms.map((platform, index) => {
              const platformName = getPlatformName(platform)
              const platformSlug = getUrlSlug(platform)
              const iconFileName = `${platform}.svg`

              return (
                <Link href={`/${platformSlug}`} key={platform} className="group">
                  <Card className="h-full border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800 overflow-hidden relative">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div
                            className={`flex items-center justify-center w-12 h-12 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300`}
                          >
                            {/* Simplified icon approach - just use Download icon as fallback */}
                            <img
                              src={`/icons/${iconFileName}`}
                              alt={platformName}
                              className="h-6 w-6"
                              loading="lazy"
                            />
                            {/* Fallback icon positioned behind the image */}
                            <Download className="h-6 w-6 text-white absolute opacity-0" />
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {platformName} Downloader
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          Download {platformName} videos, images, and content for free with high quality
                        </p>
                      </div>

                      {/* Features badges */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Badge variant="secondary" className="text-xs bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/20">
                          <Download className="w-3 h-3 mr-1" />
                          Free
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-500/20">
                          HD Quality
                        </Badge>
                      </div>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Call to action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 max-w-3xl mx-auto shadow-sm border border-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Need a Different Platform?</h3>
              <p className="text-gray-600 mb-4">
                We support 30+ social media platforms. Can't find what you're looking for?
              </p>
              <Link href="/#platform-grid">
                <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium hover:bg-blue-200 transition-colors duration-300 cursor-pointer">
                  View All Platforms
                </Badge>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
