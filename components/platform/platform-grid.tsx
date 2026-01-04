"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getUrlSlug } from "@/lib/download/platform-detector"

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
];

const platforms = initialPlatformsData;

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
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter italic uppercase text-slate-900 leading-[0.9]">Choose Your Platform</h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto font-medium italic border-t border-slate-100 pt-4 mt-2 leading-relaxed">
            Download videos from all your favorite social media platforms with a single tool. We support {platforms.length}+ platforms and counting.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {platforms.map((platform) => (
            <Link key={platform.name} href={`/${platform.slug}`} passHref className="group">
              <Card
                className="border border-blue-500 shadow-md hover:shadow-2xl bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl overflow-hidden h-full flex flex-col group-hover:translate-y-[-5px] transition-all duration-500 group-hover:shadow-blue-600/30 relative"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative pt-4 pr-4 flex justify-end h-8">
                  {platform.popular && (
                    <Badge className="bg-white text-blue-600 border-none text-[8px] px-2 py-0.5 font-black uppercase tracking-widest rounded-lg shadow-lg">
                      Popular
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6 pt-2 text-center flex flex-col items-center flex-1 relative z-10">
                  <div className="w-11 h-11 mb-3 flex items-center justify-center rounded-xl bg-white shadow-lg border border-blue-400 group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src={platform.icon || "/placeholder.svg"}
                      alt={`${platform.name} icon`}
                      width={24}
                      height={24}
                      className="transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black italic uppercase tracking-tighter text-white transition-colors text-sm sm:text-base">
                      {platform.name}
                    </h3>
                    <p className="text-xs text-blue-100 font-medium leading-relaxed italic line-clamp-2">
                      {platform.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
