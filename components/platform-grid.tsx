"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getUrlSlug } from "@/lib/platform-detector"

const initialPlatformsData = [
  { name: "YouTube", icon: "/icons/youtube.svg", slug: getUrlSlug("youtube"), description: "Download YouTube videos in high quality", popular: true },
  { name: "TikTok", icon: "/icons/tiktok.svg", slug: getUrlSlug("tiktok"), description: "Save TikTok videos without watermark", popular: true },
  { name: "Facebook", icon: "/icons/facebook.svg", slug: getUrlSlug("facebook"), description: "Download Facebook videos and photos", popular: true },
  { name: "Twitter", icon: "/icons/twitter.svg", slug: getUrlSlug("twitter"), description: "Save Twitter videos and GIFs", popular: true },
  { name: "Instagram", icon: "/icons/instagram.svg", slug: getUrlSlug("instagram"), description: "Download Instagram photos and videos", popular: true },
  { name: "Dailymotion", icon: "/icons/dailymotion.svg", slug: getUrlSlug("dailymotion"), description: "Download Dailymotion videos easily", popular: false },
  { name: "Telegram", icon: "/icons/telegram.svg", slug: getUrlSlug("telegram"), description: "Save Telegram media files", popular: false },
  { name: "Tumblr", icon: "/icons/tumblr.svg", slug: getUrlSlug("tumblr"), description: "Download Tumblr photos and videos", popular: false },
  { name: "Snapchat", icon: "/icons/snapchat.svg", slug: getUrlSlug("snapchat"), description: "Save Snapchat stories", popular: false },
  { name: "Pinterest", icon: "/icons/pinterest.svg", slug: getUrlSlug("pinterest"), description: "Download Pinterest images in full quality", popular: true },
  { name: "LinkedIn", icon: "/icons/linkedin.svg", slug: getUrlSlug("linkedin"), description: "Save LinkedIn videos and content", popular: false },
  { name: "Imgur", icon: "/icons/imgur.svg", slug: getUrlSlug("imgur"), description: "Download Imgur images and GIFs", popular: false },
  { name: "Rumble", icon: "/icons/rumble.svg", slug: getUrlSlug("rumble"), description: "Download Rumble videos easily", popular: false },
  { name: "9GAG", icon: "/icons/9gag.svg", slug: getUrlSlug("9gag"), description: "Donwload 9GAG Videos", popular: false },
  { name: "BitChute", icon: "/icons/bitchute.svg", slug: getUrlSlug("bitchute"), description: "Download BitChute videos", popular: false },
  { name: "CapCut", icon: "/icons/capcut.svg", slug: getUrlSlug("capcut"), description: "Download CapCut videos & templates", popular: false },
  { name: "Douyin", icon: "/icons/douyin.svg", slug: getUrlSlug("douyin"), description: "Download Douyin videos (抖音)", popular: false },
  { name: "ESPN", icon: "/icons/espn.svg", slug: getUrlSlug("espn"), description: "Download ESPN sports videos", popular: false },
  { name: "Febspot", icon: "/icons/febspot.svg", slug: getUrlSlug("febspot"), description: "Download Febspot videos", popular: false },
  { name: "iFunny", icon: "/icons/ifunny.svg", slug: getUrlSlug("ifunny"), description: "Download iFunny videos & memes", popular: false },
  { name: "IMDb", icon: "/icons/imdb.svg", slug: getUrlSlug("imdb"), description: "Download IMDb trailers & clips", popular: false },
  { name: "Mixcloud", icon: "/icons/mixcloud.svg", slug: getUrlSlug("mixcloud"), description: "Download Mixcloud audio tracks", popular: false },
  { name: "Reddit", icon: "/icons/reddit.svg", slug: getUrlSlug("reddit"), description: "Download Reddit videos & GIFs", popular: true },
  { name: "SoundCloud", icon: "/icons/soundcloud.svg", slug: getUrlSlug("soundcloud"), description: "Download SoundCloud tracks", popular: false },
  { name: "Spotify", icon: "/icons/spotify.svg", slug: getUrlSlug("spotify"), description: "Download Spotify songs & playlists", popular: false },
  { name: "TED", icon: "/icons/ted.svg", slug: getUrlSlug("ted"), description: "Download TED Talks", popular: false },
  { name: "Threads", icon: "/icons/threads.svg", slug: getUrlSlug("threads"), description: "Download Threads videos & images", popular: false },
  { name: "Weibo", icon: "/icons/weibo.svg", slug: getUrlSlug("weibo"), description: "Download Weibo videos (微博)", popular: false },
  { name: "Xiaohongshu", icon: "/icons/xiaohongshu.svg", slug: getUrlSlug("xiaohongshu"), description: "Download Xiaohongshu content (小红书)", popular: false },
  { name: "Zing MP3", icon: "/icons/zingmp3.svg", slug: getUrlSlug("zingmp3"), description: "Download Zing MP3 songs", popular: false },
  { name: "Kuaishou", icon: "/icons/kuaishou.svg", slug: getUrlSlug("kuaishou"), description: "Download Kuaishou / Kwai videos", popular: false },
  { name: "Bluesky", icon: "/icons/bsky.svg", slug: getUrlSlug("bsky"), description: "Download Bluesky content", popular: false },
  { name: "Bilibili", icon: "/icons/bilibili.svg", slug: getUrlSlug("bilibili"), description: "Download Bilibili videos (哔哩哔哩)", popular: false },
  { name: "Deezer", icon: "/icons/deezer.svg", slug: getUrlSlug("deezer"), description: "Download Deezer music & playlists", popular: false },
  { name: "Castbox", icon: "/icons/castbox.svg", slug: getUrlSlug("castbox"), description: "Download Castbox podcasts", popular: false },
  { name: "Truth Social", icon: "/icons/truth-social.svg", slug: getUrlSlug("truthsocial"), description: "Download Truth Social videos", popular: false }
];

const colorStyles = [
  "bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:from-red-100 hover:to-red-200 dark:from-red-800/20 dark:to-red-700/20 dark:border-red-600/50 dark:hover:from-red-700/30 dark:hover:to-red-600/30",
  "bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:from-pink-100 hover:to-pink-200 dark:from-pink-800/20 dark:to-pink-700/20 dark:border-pink-600/50 dark:hover:from-pink-700/30 dark:hover:to-pink-600/30",
  "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200 dark:from-blue-800/20 dark:to-blue-700/20 dark:border-blue-600/50 dark:hover:from-blue-700/30 dark:hover:to-blue-600/30",
  "bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 hover:from-sky-100 hover:to-sky-200 dark:from-sky-800/20 dark:to-sky-700/20 dark:border-sky-600/50 dark:hover:from-sky-700/30 dark:hover:to-sky-600/30",
  "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200 dark:from-purple-800/20 dark:to-purple-700/20 dark:border-purple-600/50 dark:hover:from-purple-700/30 dark:hover:to-purple-600/30",
  "bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 hover:from-teal-100 hover:to-teal-200 dark:from-teal-800/20 dark:to-teal-700/20 dark:border-teal-600/50 dark:hover:from-teal-700/30 dark:hover:to-teal-600/30",
  "bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200 dark:from-green-800/20 dark:to-green-700/20 dark:border-green-600/50 dark:hover:from-green-700/30 dark:hover:to-green-600/30",
  "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:from-yellow-100 hover:to-yellow-200 dark:from-yellow-800/20 dark:to-yellow-700/20 dark:border-yellow-600/50 dark:hover:from-yellow-700/30 dark:hover:to-yellow-600/30",
];

const platforms = initialPlatformsData.map((platform, index) => ({
  ...platform,
  color: colorStyles[index % colorStyles.length],
}));

export default function PlatformGrid() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden"> {/* Changed background */}
      {/* Background decoration from new UI - kept for visual flair if desired, adjust opacity/colors if needed */}
      <div className="absolute inset-0 opacity-50 dark:opacity-30"> {/* Adjusted opacity for subtlety on white/dark bg */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl dark:bg-blue-800/10"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl dark:bg-purple-800/10"></div>
      </div>

      <div className="container px-6 relative z-10 mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-500/10 dark:text-green-300 dark:hover:bg-green-500/20 px-6 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300">
            Supported Platforms
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Choose Your Platform</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Download videos from all your favorite social media platforms with a single tool. We support {platforms.length}+ platforms
            and counting.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {platforms.map((platform) => (
            <Link key={platform.name} href={`/${platform.slug}`} passHref>
              <Card
                className={`${platform.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group relative overflow-hidden h-full flex flex-col border-2`}
              >
                {platform.popular && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-2.5 py-1 shadow-lg z-10 rounded-full">
                    Popular
                  </Badge>
                )}
                <CardContent className="p-6 text-center flex flex-col flex-grow items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mb-4 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300 filter group-hover:drop-shadow-lg">
                    <Image 
                      src={platform.icon || "/placeholder.svg"} 
                      alt={`${platform.name} icon`}
                      width={32} 
                      height={32}
                      className="opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2 text-base sm:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {platform.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                    {platform.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
