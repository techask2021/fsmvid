import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";
// Lazy load non-critical components
const DouyinSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.DouyinSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Douyin Video Downloader Without Watermark | Save Douyin Videos",
  description: "Download your favorite short videos with our Douyin Video Downloader Without Watermark. Easily save videos directly from Douyin for free, preserving the original quality without any watermark.",
  openGraph: {
    title: "Douyin Video Downloader Without Watermark | Save Douyin Videos",
    description: "Download your favorite short videos with our Douyin Video Downloader Without Watermark. Easily save videos directly from Douyin for free, preserving the original quality without any watermark.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/douyin-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Douyin Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/douyin-video-saver'),
  }
}

export default function DouyinPage() {
  const platform = "douyin";
  return (
    <>
      <ToolsHero
        title="Douyin Video Downloader Without Watermark"
        subtitle="Download videos from Douyin for free."
      >

        <PlatformDownloader platform="douyin" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="douyin"
            title="How to Download Douyin Videos?"
            steps={[
              "Find the Douyin video URL from the app or website.",
              "Paste the URL into the input field above.",
              "Click the 'Process' button to fetch video information.",
              "Select your preferred format, often MP4 without watermark.",
              "Click 'Download Now' to save the Douyin video."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <DouyinSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <DouyinFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Douyin Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download your favorite short videos with our Douyin Video Downloader Without Watermark. Easily save videos directly from Douyin for free, preserving the original quality without any watermark.",
            }),
          }}
        />
        
        {/* Related Tools Section */}
        <Suspense fallback={<ContentLoading />}>
          <RelatedTools currentPlatform={platform} />
        </Suspense>
      </div>
    </>
  )
}
// Extract FAQ section to its own component for better code splitting
function DouyinFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "How can I download Douyin videos without a watermark for free?",
          answer: "Use reliable online tools like FSMVid, which offer free Douyin video downloads without watermarks. Simply copy the video link from Douyin and paste it into the downloader tool."
        },
        {
          question: "Is it legal to download Douyin videos without watermarks?",
          answer: "Downloading Douyin videos for personal use is generally acceptable. However, using downloaded content for commercial purposes requires permission from the original creators."
        },
        {
          question: "What's the best quality available for Douyin video downloads?",
          answer: "Most tools support HD and Full HD downloads, with some offering up to 4K quality when available from the source."
        },
        {
          question: "Can I download Douyin videos on my mobile device?",
          answer: "Yes, most modern Douyin downloaders work seamlessly on mobile devices, allowing you to download videos directly to your smartphone or tablet."
        },
        {
          question: "Do I need to install software to download Douyin videos?",
          answer: "No, web-based tools like FSMVid work directly in your browser without requiring any software installation."
        },
        {
          question: "How many videos can I download per day?",
          answer: "No, Douyin Video Downloaders typically do not limit the number of videos you can download. You can download as many videos as you like."
        },
        {
          question: "Can I download Douyin videos in MP3 format?",
          answer: "Yes, our tool offers audio extraction features that allow you to download just the audio from Douyin videos in MP3 format."
        },
        {
          question: "Are there any risks in downloading Douyin videos?",
          answer: "Using reputable tools like FSMVid minimizes risks. Avoid suspicious websites and never provide personal information to downloading services."
        },
        {
          question: "Can I edit downloaded Douyin videos?",
          answer: "Yes, once downloaded, you can edit the videos using any video editing software. The watermark-free versions provide a clean starting point for creative projects."
        }
      ]}
    />
  );
}
