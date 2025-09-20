export type Platform =
  | "youtube"
  | "tiktok"
  | "facebook"
  | "twitter"
  | "instagram"
  | "vimeo"
  | "dailymotion"
  | "telegram"
  | "tumblr"
  | "snapchat"
  | "pinterest"
  | "linkedin"
  | "imgur"
  | "rumble"
  | "9gag"
  | "bitchute"
  | "capcut"
  | "douyin"
  | "espn"
  | "febspot"
  | "ifunny"
  | "imdb"
  | "mixcloud"
  | "reddit"
  | "soundcloud"
  | "spotify"
  | "ted"
  | "threads"
  | "weibo"
  | "xiaohongshu"
  | "zingmp3"
  | "kuaishou"
  | "bsky" // Bluesky
  | null

export function detectPlatform(url: string): Platform {
  if (!url) return null

  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.toLowerCase()

    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) return "youtube"
    if (hostname.includes("tiktok.com")) return "tiktok"
    if (hostname.includes("facebook.com") || hostname.includes("fb.com") || hostname.includes("fb.watch"))
      return "facebook"
    if (hostname.includes("twitter.com") || hostname.includes("x.com")) return "twitter"
    if (hostname.includes("instagram.com")) return "instagram"
    if (hostname.includes("vimeo.com")) return "vimeo"
    if (
      hostname.includes("dailymotion.com") ||
      url.includes('dailymotion.com/video/') ||
      url.includes('dai.ly/') ||
      url.match(/^https?:\/\/dai\.ly\/\w+/)
    ) {
      return "dailymotion"
    }
    if (hostname.includes("t.me") || hostname.includes("telegram.me")) return "telegram"
    if (hostname.includes("tumblr.com")) return "tumblr"
    if (hostname.includes("snapchat.com")) return "snapchat"
    if (hostname.includes("pinterest.com") || hostname.includes("pin.it")) return "pinterest"
    if (hostname.includes("linkedin.com")) return "linkedin"
    if (hostname.includes("imgur.com")) return "imgur"
    if (hostname.includes("rumble.com")) return "rumble"
    if (hostname.includes("9gag.com")) return "9gag"
    if (hostname.includes("bitchute.com")) return "bitchute"
    if (hostname.includes("capcut.com")) return "capcut"
    if (hostname.includes("douyin.com")) return "douyin"
    if (hostname.includes("espn.com") || hostname.includes("es.pn")) return "espn"
    if (hostname.includes("febspot.com")) return "febspot"
    if (hostname.includes("ifunny.co")) return "ifunny"
    if (hostname.includes("imdb.com")) return "imdb"
    if (hostname.includes("mixcloud.com")) return "mixcloud"
    if (hostname.includes("reddit.com") || hostname.includes("redd.it") || url.includes("reddit.com") || url.includes("redd.it")) return "reddit"
    if (hostname.includes("soundcloud.com")) return "soundcloud"
    if (hostname.includes("spotify.com") || hostname.includes("open.spotify.com")) return "spotify"
    if (hostname.includes("ted.com")) return "ted"
    if (hostname.includes("threads.net") || hostname.includes("threads.com")) return "threads" // Added threads.com
    if (hostname.includes("weibo.com") || hostname.includes("weibo.cn")) return "weibo"
    if (hostname.includes("xiaohongshu.com")) return "xiaohongshu"
    if (hostname.includes("zingmp3.vn")) return "zingmp3"
    if (hostname.includes("bsky.app")) return "bsky"
    if (hostname.includes("kuaishou.com") || hostname.includes("kwai.com")) return "kuaishou"

    return null
  } catch (error) {
    return null
  }
}

export function getPlatformName(platform: Platform): string {
  switch (platform) {
    case "youtube":
      return "YouTube"
    case "tiktok":
      return "TikTok"
    case "facebook":
      return "Facebook"
    case "twitter":
      return "Twitter"
    case "instagram":
      return "Instagram"
    case "vimeo":
      return "Vimeo"
    case "dailymotion":
      return "Dailymotion"
    case "telegram":
      return "Telegram"
    case "tumblr":
      return "Tumblr"
    case "snapchat":
      return "Snapchat"
    case "pinterest":
      return "Pinterest"
    case "linkedin":
      return "LinkedIn"
    case "imgur":
      return "Imgur"
    case "rumble":
      return "Rumble"
    case "9gag":
      return "9GAG"
    case "bitchute":
      return "BitChute"
    case "capcut":
      return "CapCut"
    case "douyin":
      return "Douyin"
    case "espn":
      return "ESPN"
    case "febspot":
      return "Febspot"
    case "ifunny":
      return "iFunny"
    case "imdb":
      return "IMDb"
    case "mixcloud":
      return "Mixcloud"
    case "reddit":
      return "Reddit"
    case "soundcloud":
      return "SoundCloud"
    case "spotify":
      return "Spotify"
    case "ted":
      return "TED"
    case "threads":
      return "Threads"
    case "weibo":
      return "Weibo"
    case "xiaohongshu":
      return "Xiaohongshu" // (小红书)
    case "zingmp3":
      return "Zing MP3"
    case "bsky":
      return "Bluesky"
    case "kuaishou":
      return "Kuaishou"
    default:
      return ""
  }
}

export function getUrlSlug(platform: Platform): string {
  switch (platform) {
    case "youtube":
      return "youtube-video-saver"
    case "tiktok":
      return "tiktok-video-saver"
    case "facebook":
      return "facebook-media-grabber"
    case "twitter":
      return "twitter-video-saver"
    case "instagram":
      return "instagram-media-saver"
    case "vimeo":
      return "vimeo-video-extractor"
    case "dailymotion":
      return "dailymotion-video-saver"
    case "telegram":
      return "telegram-media-saver"
    case "tumblr":
      return "tumblr-content-saver"
    case "snapchat":
      return "snapchat-story-saver"
    case "pinterest":
      return "pinterest-media-saver"
    case "linkedin":
      return "linkedin-content-saver"
    case "imgur":
      return "imgur-media-saver"
    case "rumble":
      return "rumble-video-grabber"
    case "9gag":
      return "9gag-video-saver"
    case "bitchute":
      return "bitchute-video-saver"
    case "capcut":
      return "capcut-video-saver"
    case "douyin":
      return "douyin-video-saver"
    case "espn":
      return "espn-video-saver"
    case "febspot":
      return "febspot-video-saver"
    case "ifunny":
      return "ifunny-video-saver"
    case "imdb":
      return "imdb-video-saver"
    case "mixcloud":
      return "mixcloud-mp3-saver"
    case "reddit":
      return "reddit-video-saver"
    case "soundcloud":
      return "soundcloud-mp3-saver"
    case "spotify":
      return "spotify-mp3-saver"
    case "ted":
      return "ted-video-saver"
    case "threads":
      return "threads-video-saver"
    case "weibo":
      return "weibo-video-saver"
    case "xiaohongshu":
      return "xiaohongshu-video-saver"
    case "zingmp3":
      return "zingmp3-saver"
    case "bsky":
      return "bluesky-video-saver"
    case "kuaishou":
      return "kuaishou-video-saver"
    default:
      return ""
  }
}

export function getPlatformFromSlug(slug: string): Platform {
  switch (slug) {
    case "youtube-video-saver":
      return "youtube"
    case "tiktok-video-saver":
      return "tiktok"
    case "facebook-media-grabber":
      return "facebook"
    case "twitter-video-saver":
      return "twitter"
    case "instagram-media-saver":
      return "instagram"
    case "vimeo-video-extractor":
      return "vimeo"
    case "dailymotion-video-saver":
      return "dailymotion"
    case "telegram-media-saver":
      return "telegram"
    case "tumblr-content-saver":
      return "tumblr"
    case "snapchat-story-saver":
      return "snapchat"
    case "pinterest-media-saver":
      return "pinterest"
    case "linkedin-content-saver":
      return "linkedin"
    case "imgur-media-saver":
      return "imgur"
    case "rumble-video-grabber":
      return "rumble"
    case "9gag-video-saver":
      return "9gag"
    case "bitchute-video-saver":
      return "bitchute"
    case "capcut-video-saver":
      return "capcut"
    case "douyin-video-saver":
      return "douyin"
    case "espn-video-saver":
      return "espn"
    case "febspot-video-saver":
      return "febspot"
    case "ifunny-video-saver":
      return "ifunny"
    case "imdb-video-saver":
      return "imdb"
    case "mixcloud-mp3-saver":
      return "mixcloud"
    case "reddit-video-saver":
      return "reddit"
    case "soundcloud-mp3-saver":
      return "soundcloud"
    case "spotify-mp3-saver":
      return "spotify"
    case "ted-video-saver":
      return "ted"
    case "threads-video-saver":
      return "threads"
    case "weibo-video-saver":
      return "weibo"
    case "xiaohongshu-video-saver":
      return "xiaohongshu"
    case "zingmp3-saver":
      return "zingmp3"
    case "bluesky-video-saver":
      return "bsky"
    case "kuaishou-video-saver":
      return "kuaishou"
    default:
      return null
  }
}
