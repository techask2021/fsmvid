import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/download/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/content/Tools-hero";
import PlatformFeatures from "@/components/platform/platform-features";
import PlatformHowTo from "@/components/platform/platform-how-to";

// Lazy load non-critical components
const SoundcloudSEOContent = lazy(() => import("@/components/seo/seo-content").then(mod => ({ default: mod.SoundcloudSEOContent })))
const RelatedTools = lazy(() => import("@/components/platform/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "SoundCloud Downloader | Save SoundCloud Tracks",
  description: "Download tracks, playlists, and podcasts from SoundCloud for free. Listen to your favorite SoundCloud audio offline.",
  openGraph: {
    title: "SoundCloud Downloader | Save SoundCloud Tracks",
    description: "Download tracks, playlists, and podcasts from SoundCloud for free. Listen to your favorite SoundCloud audio offline.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/soundcloud-mp3-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SoundCloud Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/soundcloud-mp3-saver'),
  }
}

export default function SoundcloudPage() {
  const platform = "soundcloud";
  return (
    <>
      <ToolsHero
        title="SoundCloud Downloader"
        subtitle="Download tracks, playlists, and podcasts from SoundCloud for free."
        platform="soundcloud"
      >
        <PlatformDownloader platform="soundcloud" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="soundcloud"
            title="How to Download SoundCloud Media?"
            steps={[
              "Find the SoundCloud track or playlist URL on soundcloud.com.",
              "Paste the URL into the input field on this page.",
              "Click the 'Process' button to fetch the audio details.",
              "Select your preferred audio quality (e.g., MP3).",
              "Click 'Download Now' to save the SoundCloud audio."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <SoundcloudSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <SoundcloudFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "SoundCloud Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download tracks, playlists, and podcasts from SoundCloud for free. Listen to your favorite SoundCloud audio offline.",
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
function SoundcloudFAQSection() {
  return (
    <FAQSection
      faqs={[
        { question: "What formats does the SoundCloud MP3 downloader support?", answer: "Our FSMVid SoundCloud to MP3 downloader supports multiple high-quality formats, including MP3, WAV, and FLAC. You can choose the format that best suits your device compatibility and quality preferences. MP3 remains the most popular choice due to its universal compatibility, while WAV and FLAC offer superior audio quality for audiophiles." },
        { question: "Is there a limit to how many tracks I can download?", answer: "We believe in providing unlimited access to our users. Our platform doesn't impose strict limits on the number of tracks you can download. However, to ensure optimal service for all users, we may implement fair usage policies during peak times. Our service is 100% free with no hidden fees, subscriptions, or premium tiers." },
        { question: "Does the SoundCloud MP3 downloader maintain song quality?", answer: "Absolutely! Our converter preserves the original audio quality from SoundCloud while giving you options to select your preferred bitrate. We support downloads up to 320kbps in MP3 format and offer lossless options like FLAC for the highest possible quality. The final quality depends on the original upload quality on SoundCloud." },
        { question: "Is it safe to use online SoundCloud downloaders?", answer: "Our website is completely safe to use. There are no viruses or harmful software on our site, and we don't track what users do. We prioritize user security and privacy, employing modern encryption and security measures to protect your data during the download process." },
        { question: "What should I do if a download fails?", answer: "If you encounter download issues, first verify that the SoundCloud track is publicly available and hasn't been removed by the artist. Try refreshing the page and attempting the download again. If problems persist, check your internet connection and clear your browser cache." },
        { question: "Can I use the downloader on mobile devices?", answer: "Absolutely! Our platform is fully optimized for mobile devices, allowing you to download SoundCloud content directly to your smartphone or tablet. The mobile interface is streamlined for touch navigation while maintaining all desktop functionality." },
        { question: "Are downloaded files compatible with all music players?", answer: "Our MP3 downloads are compatible with virtually all music players and devices. For users requiring specific formats, we offer WAV and FLAC options. Most modern devices and software support these formats, ensuring broad compatibility across your audio ecosystem." }
      ]}
    />
  );
}
