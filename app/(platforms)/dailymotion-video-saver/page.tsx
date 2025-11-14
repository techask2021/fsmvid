import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/download/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/content/Tools-hero";
import PlatformFeatures from "@/components/platform/platform-features";
import PlatformHowTo from "@/components/platform/platform-how-to";

// Lazy load non-critical components
const DailymotionSEOContent = lazy(() => import("@/components/seo/seo-content").then(mod => ({ default: mod.DailymotionSEOContent })))
const RelatedTools = lazy(() => import("@/components/platform/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Dailymotion Video Downloader | Download Dailymotion Videos in HD",
  description:
    "Our Dailymotion Video Downloader is a free tool that allows you to download Dailymotion videos in high quality. Extract and save Dailymotion videos easily with our Dailymotion video saver tool.",
  openGraph: {
    title: "Dailymotion Video Downloader | Download Dailymotion Videos in HD",
    description:
      "Our Dailymotion Video Downloader is a free tool that allows you to download Dailymotion videos in high quality. Extract and save Dailymotion videos easily with our Dailymotion video saver tool.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/dailymotion-video-saver`,
    siteName: "FSMVID",
    images: [ 
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dailymotion Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/dailymotion-video-saver'),
  }
}

export default function DailymotionPage() {
  const platform = "dailymotion";
  
  return (
    <>
      <ToolsHero
        title="Dailymotion Video Downloader"
        subtitle="Download Dailymotion videos in high quality for free."
        platform="dailymotion"
      >
        <PlatformDownloader platform="dailymotion" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="dailymotion"
            title="How to Download Dailymotion Videos?"
            steps={[
              "Visit Dailymotion.com and find the video you want to download.",
              "Copy the video URL from the address bar or share button.",
              "Paste the URL into our Dailymotion video downloader above and click Download.",
              "Choose your preferred quality and format, then download your video.",
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>



        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <DailymotionSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <DailymotionFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Dailymotion Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Our Dailymotion Video Downloader is a free tool that allows you to download Dailymotion videos in high quality. Extract and save Dailymotion videos easily with our Dailymotion video downloader tool.",
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
function DailymotionFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "What quality options are available for Dailymotion videos?",
          answer:
            "Our Dailymotion video saver offers various quality options including 240p, 380p, 480p, 720p, and 1080p when available from the original source.",
        },
        {
          question: "Can I download age-restricted Dailymotion videos?",
          answer: "Our tool can download most age-restricted videos that are publicly available on Dailymotion.",
        },
        {
          question: "Can I download Dailymotion live streams?",
          answer:
            "No, our tool can only download regular videos, not live streams. However, you can download the recorded version after the live stream has ended.",
        },
        {
          question: "Is it legal to download Dailymotion videos?",
          answer:
            "Downloading videos for personal use is generally acceptable, but redistributing copyrighted content without permission is not. Always respect copyright laws and Dailymotion's terms of service.",
        },
      ]}
    />
  );
}
