import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"
import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const BilibiliSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.BilibiliSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Bilibili Video Downloader Without Watermark | Save Bilibili Videos",
  description: "Download your favorite anime and gaming videos with our Bilibili Video Downloader Without Watermark. Easily save videos directly from Bilibili for free, preserving the original quality without any watermark.",
  openGraph: {
    title: "Bilibili Video Downloader Without Watermark | Save Bilibili Videos",
    description: "Download your favorite anime and gaming videos with our Bilibili Video Downloader Without Watermark. Easily save videos directly from Bilibili for free, preserving the original quality without any watermark.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/bilibili-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bilibili Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/bilibili-video-saver'),
  }
}

export default function BilibiliPage() {
  const platform = "bilibili";
  return (
    <>
      <ToolsHero
        title="Bilibili Video Downloader Without Watermark"
        subtitle="Download videos from Bilibili in high quality for free. Save your favorite anime, gaming, and entertainment videos."
        platform="bilibili"
      >
        <PlatformDownloader platform="bilibili" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="bilibili"
            title="How to Download Bilibili Videos?"
            steps={[
              "Find the Bilibili video URL from the website or app.",
              "Copy the video link by clicking the Share button.",
              "Paste the URL into the input field above.",
              "Click the 'Process' button to fetch video information.",
              "Click 'Download Now' to save the Bilibili video without watermark."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>

        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <BilibiliSEOContent />
        </Suspense>

        <Suspense fallback={<FAQLoading />}>
          <BilibiliFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Bilibili Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download your favorite anime and gaming videos with our Bilibili Video Downloader Without Watermark. Easily save videos directly from Bilibili for free, preserving the original quality without any watermark.",
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
function BilibiliFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "How can I download Bilibili videos without a watermark for free?",
          answer: "Use reliable online tools like FSMVid, which offer free Bilibili video downloads without watermarks. Simply copy the video link from Bilibili and paste it into the downloader tool."
        },
        {
          question: "Is it legal to download Bilibili videos without watermarks?",
          answer: "Downloading Bilibili videos for personal use is generally acceptable. However, using downloaded content for commercial purposes requires permission from the original creators. Always respect copyright laws and Bilibili's terms of service."
        },
        {
          question: "What's the best quality available for Bilibili video downloads?",
          answer: "FSMVid supports downloads from 480p up to 4K quality when available from the source. The quality depends on the original upload quality of the video."
        },
        {
          question: "Can I download Bilibili videos on my mobile device?",
          answer: "Yes, FSMVid works seamlessly on mobile devices, allowing you to download Bilibili videos directly to your smartphone or tablet without installing any apps."
        },
        {
          question: "Do I need to install software to download Bilibili videos?",
          answer: "No, FSMVid is a web-based tool that works directly in your browser without requiring any software installation. Just paste the link and download."
        },
        {
          question: "Can I download Bilibili anime episodes?",
          answer: "You can download publicly available Bilibili content. However, some official anime (Bangumi) may have regional restrictions or require Bilibili membership."
        },
        {
          question: "Are there any risks in downloading Bilibili videos?",
          answer: "Using reputable tools like FSMVid minimizes risks. Avoid suspicious websites and never provide your Bilibili account credentials to downloading services."
        },
        {
          question: "Can I download videos with subtitles from Bilibili?",
          answer: "The video content will be downloaded, but Bilibili's danmaku (bullet comments) and some subtitles may not be included as they are often overlaid separately by the platform."
        },
        {
          question: "How many Bilibili videos can I download per day?",
          answer: "FSMVid does not limit the number of videos you can download. You can download as many Bilibili videos as you need for personal use."
        },
        {
          question: "Can I edit downloaded Bilibili videos?",
          answer: "Yes, once downloaded, you can edit the videos using any video editing software. The watermark-free versions provide a clean starting point for creative projects."
        }
      ]}
    />
  );
}

