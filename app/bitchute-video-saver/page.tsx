import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const BitChuteSEOContent = lazy(() => import("@/components/seo-content/bitchute").then(mod => ({ default: mod.BitChuteSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "BitChute Video Downloader | Save BitChute Videos",
  description: "BitChute Video Downloader tool is your helper tool to download videos from BitChute for free. Save your favorite content from BitChute for offline viewing.",
  openGraph: {
    title: "BitChute Video Downloader | Save BitChute Videos",
    description: "BitChute Video Downloader tool is your helper tool to download videos from BitChute for free. Save your favorite content from BitChute for offline viewing.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/bitchute-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BitChute Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/bitchute-video-saver'),
  }
}

export default function BitchutePage() {
  const platform = "bitchute";
  return (
    <>
      <ToolsHero
        title="BitChute Video Downloader"
        subtitle="Download videos from BitChute for free."
        platform="bitchute"
      >
  

        <PlatformDownloader platform="bitchute" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="bitchute"
            title="How to Download BitChute Videos?"
            steps={[
              "Copy the BitChute video URL from your browser.",
              "Paste the URL into the input field above.",
              "Click the 'Process' button to fetch video information.",
              "Select your preferred video quality if options are available.",
              "Click 'Download Now' to save the BitChute video."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <BitChuteSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <BitchuteFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "BitChute Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "BitChute Video Downloader tool is your helper tool to download videos from BitChute for free. Save your favorite content from BitChute for offline viewing.",
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
function BitchuteFAQSection() {
  return (
    <FAQSection
      faqs={[
        { question: "Is fsmvid completely free to use?", answer: "Yes, fsmvid provides unlimited BitChute video downloads without hidden fees, subscription requirements, or daily limits." },
        { question: "Do I need to create an account?", answer: "No registration process exists—simply visit the website and begin downloading immediately." },
        { question: "Which devices support fsmvid?", answer: "Any device with a modern web browser works perfectly, including Windows PCs, Mac computers, Linux systems, Android phones, iPhones, iPads, and Chromebooks." },
        { question: "Can I extract only the audio from BitChute videos?", answer: "Absolutely. Select 'Audio-only' during the download process and choose from MP3, FLAC, or WAV formats depending on your needs." },
        { question: "Are there file size limitations?", answer: "No restrictions exist beyond your device's available storage space. Download lengthy documentaries, educational series, or entire playlists without artificial limits." },
        { question: "How fast are the downloads?", answer: "Speed depends on your internet connection and the original file size. fsmvid's GPU-accelerated backend optimizes performance, often achieving download speeds up to 10 times faster than basic downloaders." }
      ]}
    />
  );
}
