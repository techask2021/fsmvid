import type { MetadataRoute } from "next"
import { getUrlSlug, Platform } from "@/lib/platform-detector"
import { getAllPosts } from "@/lib/blog-client"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fsmvid.com"

  const platforms = [
    "youtube",
    "tiktok",
    "facebook",
    "twitter",
    "instagram",
    "vimeo",
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
    "capcut",
    "douyin",
    "espn",
    "febspot",
    "ifunny",
    "imdb",
    "mixcloud",
    "reddit",
    "soundcloud",
    "spotify",
    "ted",
    "threads",
    "weibo",
    "xiaohongshu",
    "zingmp3",
    "bsky",
    "kuaishou",
  ] as Platform[]

  const routes = platforms.map((platform) => ({
    url: `${baseUrl}/${getUrlSlug(platform)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Get blog posts for sitemap - with error handling
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const { posts } = await getAllPosts(1, 100)
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

    // Add the main blog page
    blogRoutes.push({
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const, 
      priority: 0.8,
    })
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
    // Still add the main blog page even if posts fail to load
    blogRoutes = [{
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }]
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...routes,
    ...blogRoutes,
  ]
}
