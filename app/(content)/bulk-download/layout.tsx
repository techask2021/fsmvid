import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Bulk Video Downloader | Download Videos from YouTube, Instagram, TikTok | FSMVID",
    description: "Professional bulk video downloader for PC, Android & Chrome. Download entire playlists from YouTube, Instagram, TikTok. Fast, secure HD quality downloads.",
    keywords: "bulk video downloader, bulk video downloader online, bulk video downloader for pc, bulk video downloader youtube, bulk video downloader instagram, bulk video downloader tiktok, bulk video downloader android, bulk video downloader chrome extension, download multiple videos, playlist downloader",
    openGraph: {
        title: "Bulk Video Downloader | Download Videos | FSMVID",
        description: "Download entire playlists and profiles from 30+ platforms. 1 credit = 2 videos. Supports HD quality.",
        type: "website",
        images: [
            {
                url: "/images/Bulk Video Downloader.png",
                width: 1200,
                height: 630,
                alt: "FSMVID Bulk Video Downloader"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Bulk Video Downloader | FSMVID",
        description: "Download multiple videos from YouTube, Instagram, TikTok in bulk",
        images: ["/images/Bulk Video Downloader.png"]
    }
}

export default function BulkDownloadLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
