import type { MetadataRoute } from "next"
export const runtime = "edge";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fsmvid.com"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/login",
        "/signup",
        "/forgot-password",
        "/payment/",
        "/api/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
