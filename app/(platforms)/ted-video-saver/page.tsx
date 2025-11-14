import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/download/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"
import ToolsHero from "@/components/content/Tools-hero";
import PlatformFeatures from "@/components/platform/platform-features";
import PlatformHowTo from "@/components/platform/platform-how-to";

// Lazy load non-critical components
const TedSEOContent = lazy(() => import("@/components/seo/seo-content").then(mod => ({ default: mod.TedSEOContent })))
const RelatedTools = lazy(() => import("@/components/platform/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "TED Talk Downloader | Save TED Videos",
  description: "Download inspiring TED Talks and videos from TED.com for free. Watch educational and thought-provoking content offline.",
  openGraph: {
    title: "TED Talk Downloader | Save TED Videos",
    description: "Download inspiring TED Talks and videos from TED.com for free. Watch educational and thought-provoking content offline.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/ted-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TED Talk Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/ted-video-saver'),
  }
}

export default function TedPage() {
  const platform = "ted";
  return (
    <>
      <ToolsHero
        title="TED Talk Downloader"
        subtitle="Download inspiring TED Talks and videos from TED.com for free."
        platform="ted"
      >
        <PlatformDownloader platform="ted" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="ted"
            title="How to Download TED Media?"
            steps={[
              "Find the TED Talk URL on ted.com.",
              "Paste the URL into the input field on this page.",
              "Click the 'Process' button to fetch video details.",
              "Select your preferred video quality and subtitle options if available.",
              "Click 'Download Now' to save the TED Talk."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <TedSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <TedFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "TED Talk Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download inspiring TED Talks and videos from TED.com for free. Watch educational and thought-provoking content offline.",
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
function TedFAQSection() {
  return (
    <FAQSection
      faqs={[
        { 
          question: "Is it legal to download TED Talks?", 
          answer: "Generally, downloading for personal, non-commercial use is allowed, especially with the official TED app. For other uses, check TED's usage policy. Always respect copyright and intellectual property rights." 
        },
        { 
          question: "Can I share downloaded TED Talks with others?", 
          answer: "You can share for educational or personal purposes, but always credit TED and follow their guidelines. Do not redistribute downloaded content commercially without proper permissions." 
        },
        { 
          question: "Are there TED Video Downloaders for Mac and Linux?", 
          answer: "Yes, most desktop solutions (like 4K Video Downloader and JDownloader) support Windows, macOS, and Linux. Our FSMVID tool works in any web browser on any operating system." 
        },
        { 
          question: "Can I download TED Talks in other languages?", 
          answer: "Many TED Talks include subtitles and transcripts in multiple languages, which can also be downloaded or viewed separately. The video content remains the same, but you can access translated subtitles." 
        },
        { 
          question: "What video quality options are available?", 
          answer: "You can typically download TED Talks in various qualities from 360p to 1080p HD, depending on what's available for each specific talk. Higher quality means larger file sizes." 
        },
        { 
          question: "Is FSMVID free to use?", 
          answer: "Yes, our TED Talk downloader is completely free for personal and educational use. No registration or payment required. We prioritize user experience over aggressive advertising." 
        },
        { 
          question: "Can I download audio-only versions of TED Talks?", 
          answer: "Yes, you can download TED Talks as MP3 audio files for listening on the go. This is great for commutes, workouts, or when you want to save storage space." 
        },
        { 
          question: "What should I do if my download fails?", 
          answer: "Check your internet connection, ensure the downloader isn't blocked in your region, and try a different method or tool. If the issue persists, try refreshing the page and attempting again." 
        },
        { 
          question: "Are there any safety concerns with TED downloaders?", 
          answer: "Avoid suspicious downloader websites and stick to well-reviewed sources like FSMVID. Beware of pop-ups, ads, and unnecessary browser extensions. Keep your software updated for security." 
        },
        { 
          question: "Can I use downloaded TED Talks in presentations?", 
          answer: "Yes, you can use clips with proper attribution in presentations, educational materials, or other creative projects. Always credit TED and the speaker appropriately." 
        }
      ]}
    />
  );
}
