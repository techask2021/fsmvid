import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/download/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"
import ToolsHero from "@/components/content/Tools-hero";
import PlatformFeatures from "@/components/platform/platform-features";
import PlatformHowTo from "@/components/platform/platform-how-to";

// Lazy load non-critical components
const TikTokSEOContent = lazy(() => import("@/components/seo/seo-content").then(mod => ({ default: mod.TikTokSEOContent })))
const RelatedTools = lazy(() => import("@/components/platform/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "TikTok Video Downloader | Download TikTok Videos Without Watermark",
  description:
    "Tiktok Video Downloader tool for download TikTok videos without watermark in HD quality. Free online TikTok video saver tool for saving TikTok content easily.",
  openGraph: {
    title: "TikTok Video Downloader | Download TikTok Videos Without Watermark",
    description:
      "Tiktok Video Downloader tool for download TikTok videos without watermark in HD quality. Free online TikTok video saver tool for saving TikTok content easily.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/tiktok-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TikTok Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/tiktok-video-saver'),
  }
}

export default function TikTokPage() {
  const platform = "tiktok";
  return (
    <>
      <ToolsHero
        title="TikTok Video Downloader"
        subtitle="Download TikTok videos without watermark in high quality for free."
        platform="tiktok"
      >
        <PlatformDownloader platform="tiktok" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="tiktok"
            title="How to Download TikTok Videos?"
            steps={[
              "Open the TikTok app or website and find the video you want to download.",
              "Tap on the Share button and select 'Copy Link' or 'Copy URL'.",
              "Paste the URL into our TikTok downloader above and click Download.",
              "Choose your preferred quality and download your TikTok video without watermark.",
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <TikTokSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <TikTokFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "TikTok Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Tiktok Video Downloader tool for download TikTok videos without watermark in HD quality. Free online TikTok video saver tool for saving TikTok content easily.",
            }),
          }}
        />

        {/* Related Tools Section */}
        <Suspense fallback={<ContentLoading />}>
          <RelatedTools currentPlatform={platform} />
        </Suspense>
      </div>
      
    </>
  );
}

// Extract FAQ section to its own component for better code splitting
function TikTokFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "Can I download TikTok videos without watermark?",
          answer:
            "Yes, our TikTok video saver removes the watermark from videos, giving you clean videos for personal use.",
        },
        {
          question: "What video quality can I download TikTok videos in?",
          answer: "We offer various quality options including HD when available from the original source.",
        },
        {
          question: "Can I download private TikTok videos?",
          answer: "No, our tool can only download publicly available TikTok videos.",
        },
        {
          question: "How do I save TikTok videos with music?",
          answer:
            "Our TikTok video saver preserves the original audio track, so all downloaded videos include the music and sounds from the original TikTok.",
        },
        {
          question: "Is it legal to download TikTok videos?",
          answer: 
            "Downloading TikTok videos for personal use is generally acceptable. However, you should respect copyright laws and not redistribute content without permission.",
        },
      ]}
    />
  );
}
