import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"
import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const YouTubeSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.YouTubeSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "YouTube Video Downloader | Download YouTube Videos in HD Quality",
  description:
    "Youtube Video Downloader helps you to download YouTube videos in high quality for free. Save YouTube videos in MP4, MP3, and other formats with our easy-to-use downloader.",
  openGraph: {
    title: "YouTube Video Saver | Download YouTube Videos in HD Quality",
    description:
      "Youtube Video Downloader help you to download YouTube videos in high quality for free. Save YouTube videos in MP4, MP3, and other formats with our easy-to-use downloader.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/youtube-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "YouTube Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/youtube-video-saver'),
  }
}

export default function YouTubePage() {
  const platform = "youtube";
  
  return (
    <>
      <ToolsHero
        title="YouTube Video Downloader"
        subtitle="Download YouTube videos in HD quality for free. Fast and easy YouTube video downloader - no registration required."
      >
        <PlatformDownloader platform="youtube" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="youtube"
            title="How to Download YouTube Videos?"
            steps={[
              "Find the YouTube video you want to download.",
              "Copy the video URL from the address bar or share button.",
              "Paste the URL into our YouTube downloader above and click Download.",
              "Choose your preferred quality and format, then download your video.",
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <YouTubeSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <YouTubeFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "YouTube Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Youtube Video Downloader help you to download YouTube videos in high quality for free. Save YouTube videos in MP4, MP3, and other formats with our easy-to-use downloader.",
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
function YouTubeFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "Is it legal to download YouTube videos?",
          answer:
            "Downloading YouTube videos for personal use is generally acceptable, but redistributing copyrighted content is not. Always respect copyright laws and YouTube's terms of service.",
        },
        {
          question: "What formats can I download YouTube videos in?",
          answer:
            "Our YouTube downloader supports various formats including MP4, WebM, and MP3 for audio extraction. You can choose the quality that best suits your needs.",
        },
        {
          question: "Can I download age-restricted YouTube videos?",
          answer:
            "Our tool can only download publicly available videos that don't require age verification or login.",
        },
        {
          question: "How do I download YouTube videos on mobile?",
          answer:
            "The process is the same on mobile devices. Copy the video URL from the YouTube app, paste it into our downloader, and select your preferred format.",
        },
        {
          question: "Can I download YouTube playlists?",
          answer:
            "Currently, our tool supports downloading individual videos. For playlists, you'll need to download each video separately.",
        },
      ]}
    />
  );
}
