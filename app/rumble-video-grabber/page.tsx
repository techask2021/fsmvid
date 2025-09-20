import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const RumbleSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.RumbleSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Rumble Video Downloader | Download Rumble Videos in High Quality",
  description:
    "Rumble Video Downloader online tool to help you download Rumble videos in high quality for free. Save Rumble videos easily with our Rumble video downloader tool.",
  openGraph: {
    title: "Rumble Video Downloader | Download Rumble Videos in High Quality",
    description:
      "Rumble Video Downloader online tool to help you download Rumble videos in high quality for free. Save Rumble videos easily with our Rumble video downloader tool.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/rumble-video-grabber`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rumble Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/rumble-video-grabber'),
  }
}

export default function RumblePage() {
  const platform = "rumble";
  return (
    <>
      <ToolsHero
        title="Rumble Video Downloader"
        subtitle="Download Rumble videos in high quality for free. The easiest way to save Rumble content."
        platform="rumble"
      >
        <PlatformDownloader platform="rumble" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="rumble"
            title="How to Download Rumble Videos?"
            steps={[
              "Visit Rumble.com and find the video you want to download.",
              "Copy the video URL from the address bar or share button.",
              "Paste the URL into our Rumble video downloader above and click Download.",
              "Choose your preferred quality and format, then download your video.",
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>

        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <RumbleSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <RumbleFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Rumble Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Rumble Video Downloader online tool to help you download Rumble videos in high quality for free. Save Rumble videos easily with our Rumble video downloader tool.",
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
function RumbleFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "What is Rumble?",
          answer:
            "Rumble is a video platform that provides an alternative to YouTube and other mainstream video hosting sites. It focuses on free speech and creator rights.",
        },
        {
          question: "What video quality can I download Rumble videos in?",
          answer:
            "Our Rumble video downloader offers various quality options including HD (720p and 1080p) when available from the original source.",
        },
        {
          question: "Can I download Rumble videos on mobile?",
          answer:
            "Yes, our Rumble video downloader works on all devices including smartphones and tablets. Simply copy the video URL and paste it into our tool.",
        },
        {
          question: "Is it legal to download Rumble videos?",
          answer:
            "Downloading videos for personal use is generally acceptable, but redistributing copyrighted content without permission is not. Always respect copyright laws and Rumble's terms of service.",
        },
      ]}
    />
  );
}
