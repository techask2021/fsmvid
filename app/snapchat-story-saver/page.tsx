import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const SnapchatSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.SnapchatSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Snapchat Video Downloader | Download Snapchat Stories & Videos",
  description:
    "Snapchat Video Downloader tool to download Snapchat stories and videos in high quality for free. Save Snapchat content easily with our Snapchat story saver tool.",
  openGraph: {
    title: "Snapchat Video Downloader | Download Snapchat Stories & Videos",
    description:
      "Snapchat Video Downloader tool to download Snapchat stories and videos in high quality for free. Save Snapchat content easily with our Snapchat story saver tool.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/snapchat-story-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Snapchat Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/snapchat-story-saver'),
  }
}

export default function SnapchatPage() {
  const platform = "snapchat";
  return (
    <>
      <ToolsHero
        title="Snapchat Video Downloader"
        subtitle="Download Snapchat stories and snaps in high quality for free."
        platform="snapchat"
      >
        <PlatformDownloader platform="snapchat" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="snapchat"
            title="How to Download Snapchat Content?"
            steps={[
              "Open Snapchat and find the public story or Spotlight video you want to download.",
              "Copy the share link by tapping the share button and selecting 'Copy Link'.",
              "Paste the URL into our Snapchat story saver above and click Download.",
              "Choose your preferred quality and download your Snapchat content.",
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>



        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <SnapchatSEOContent />
        </Suspense>

       

        <Suspense fallback={<FAQLoading />}>
          <SnapchatFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Snapchat Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Snapchat Video Downloader tool to download Snapchat stories and videos in high quality for free. Save Snapchat content easily with our Snapchat story saver tool.",
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
function SnapchatFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "Is it legal to download Snapchat content?",
          answer:
            "Downloading Snapchat content is generally acceptable, but downloading copyrighted content is not. Always respect copyright laws and Snapchat's terms of service.",
        },
        {
          question: "What Snapchat content can I download?",
          answer:
            "Our Snapchat story saver supports public stories, Spotlight videos, and public profile content. Private stories or direct snaps cannot be downloaded.",
        },
        {
          question: "Can I download my friends' private Snapchat stories?",
          answer:
            "No, our tool can only download publicly available Snapchat content. Private stories are protected and cannot be downloaded through our service.",
        },
        {
          question: "How do I get a Snapchat link to download content?",
          answer:
            "In the Snapchat app, you can share public stories and Spotlight videos by tapping the share button and selecting 'Copy Link'. This only works for public content.",
        },
        {
          question: "Will the person know if I download their Snapchat story?",
          answer:
            "No, the creator won't be notified when you download their public story or Spotlight video using our tool.",
        },
      ]}
    />
  );
}
