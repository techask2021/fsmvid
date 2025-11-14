import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/download/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/content/Tools-hero";
import PlatformFeatures from "@/components/platform/platform-features";
import PlatformHowTo from "@/components/platform/platform-how-to";

// Lazy load non-critical components
const MixcloudSEOContent = lazy(() => import("@/components/seo/seo-content").then(mod => ({ default: mod.MixcloudSEOContent })))
const RelatedTools = lazy(() => import("@/components/platform/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Mixcloud Downloader | Save DJ Sets & Radio Shows",
  description: "Download DJ mixes, radio shows, and podcasts from Mixcloud for free. Listen to your favorite Mixcloud audio content offline.",
  openGraph: {
    title: "Mixcloud Downloader | Save DJ Sets & Radio Shows",
    description: "Download DJ mixes, radio shows, and podcasts from Mixcloud for free. Listen to your favorite Mixcloud audio content offline.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/mixcloud-mp3-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mixcloud Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/mixcloud-mp3-saver'),
  }
}

export default function MixcloudPage() {
  const platform = "mixcloud";
  return (
    <>
      <ToolsHero
        title="Mixcloud Downloader"
        subtitle="Download DJ mixes, radio shows, and podcasts from Mixcloud for free."
        platform="mixcloud"
      >
        <PlatformDownloader platform="mixcloud" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="mixcloud"
            title="How to Download Mixcloud Media?"
            steps={[
              "Find the Mixcloud show, set, or track URL on mixcloud.com.",
              "Paste the URL into the input field on this page.",
              "Click the 'Process' button to fetch the audio details.",
              "Click 'Download Now' to save the Mixcloud audio."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <MixcloudSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <MixcloudFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Mixcloud Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download DJ mixes, radio shows, and podcasts from Mixcloud for free. Listen to your favorite Mixcloud audio content offline.",
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
function MixcloudFAQSection() {
  return (
    <FAQSection
      faqs={[
        { question: "What audio quality can I expect from downloads?", answer: "Our tool allows you to download music from Mixcloud in high quality (up to 320kbps) in MP3 format. This quality level provides excellent audio fidelity suitable for most listening environments and playback devices." },
        { question: "Do I need to create an account to use fsmvid's downloader?", answer: "No account creation is necessary. Our tool works immediately without registration, subscriptions, or personal information requirements." },
        { question: "Is there a download limit?", answer: "We don't impose artificial download limits on our free service. However, we encourage responsible use and remind users to respect copyright laws and content creators' rights." },
        { question: "What devices are compatible with downloaded MP3 files?", answer: "MP3 files downloaded through our tool are compatible with virtually all modern devices, including smartphones, tablets, computers, MP3 players, car audio systems, and smart speakers." },
        { question: "Can I use downloaded content for commercial purposes?", answer: "Downloaded content should be used for personal purposes only unless you have explicit permission from copyright holders. Commercial use typically requires proper licensing agreements." },
        { question: "How long does the download process take?", answer: "The tool is designed to be fast, with most downloads completing within seconds to minutes, depending on track length and your internet connection speed." },
        { question: "What should I do if a download fails?", answer: "If you encounter download issues, verify that the Mixcloud URL is correct and complete. Ensure your internet connection is stable and try again. Contact our support team if problems persist." },
        { question: "Are there any geographical restrictions?", answer: "Our downloader works globally, but content availability may vary based on regional licensing agreements and local copyright laws." }
      ]}
    />
  );
}
