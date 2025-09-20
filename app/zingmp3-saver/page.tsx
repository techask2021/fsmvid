import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const Zingmp3SEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.Zingmp3SEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "ZingMP3 Downloader | Save Vietnamese Music",
  description: "Download songs and albums from Zing MP3 (zingmp3.vn) for free. Enjoy your favorite Vietnamese music offline.",
  openGraph: {
    title: "ZingMP3 Downloader | Save Vietnamese Music",
    description: "Download songs and albums from Zing MP3 (zingmp3.vn) for free. Enjoy your favorite Vietnamese music offline.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/zingmp3-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zing MP3 Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/zingmp3-saver'),
  }
}

export default function Zingmp3Page() {
  const platform = "zingmp3";
  return (
    <>
      <ToolsHero
        title="ZingMP3 Downloader"
        subtitle="Download songs and albums from Zing MP3 (zingmp3.vn) for free."
        platform="zingmp3"
      >
        <PlatformDownloader platform="zingmp3" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="zingmp3"
            title="How to Download ZingMP3 Media?"
            steps={[
              "Find the Zing MP3 song or album URL on zingmp3.vn.",
              "Paste the URL into the input field on this page.",
              "Click the 'Process' button to fetch the audio details.",
              "Select your preferred audio quality (e.g., MP3 128kbps, 320kbps).",
              "Click 'Download Now' to save the Zing MP3 audio."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <Zingmp3SEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <Zingmp3FAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Zing MP3 Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download songs and albums from Zing MP3 (zingmp3.vn) for free. Enjoy your favorite Vietnamese music offline.",
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
function Zingmp3FAQSection() {
  const faqs = [
    { 
      question: "Can I download high-quality 320kbps or lossless files with the FSMVID downloader?", 
      answer: "Our tool downloads music in the highest quality available from the source URL, which often includes the 320kbps MP3 format." 
    },
    { 
      question: "Does the FSMVID downloader work on my iPhone/Android phone?", 
      answer: "Yes. Our tool is browser-based and works on any device with a web browser, including all smartphones and tablets, without needing an app." 
    },
    { 
      question: "Is it possible to download an entire playlist from ZingMP3 at once?", 
      answer: "Our tool is currently optimized for downloading individual tracks to ensure speed and stability. To save a playlist, paste the URL of each song into the downloader individually." 
    },
    { 
      question: "Do I need to register or create an account to use the FSMVID ZingMP3 Downloader?", 
      answer: "No. Our tool is anonymous and requires no registration or personal information." 
    },
    { 
      question: "What is the difference between downloading and streaming?", 
      answer: "Streaming lets you listen to music in real-time with an internet connection. Downloading saves a permanent file to your device for offline access anytime." 
    }
  ];

  return <FAQSection faqs={faqs} />;
}
