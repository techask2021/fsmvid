import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";
// Lazy load non-critical components
const SpotifySEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.SpotifySEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Spotify Music Downloader | Save Spotify Songs & Playlists",
  description: "Download songs, playlists, and podcasts from Spotify for free. Listen to your favorite Spotify music offline.",
  openGraph: {
    title: "Spotify Music Downloader | Save Spotify Songs & Playlists",
    description: "Download songs, playlists, and podcasts from Spotify for free. Listen to your favorite Spotify music offline.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/spotify-mp3-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Spotify Music Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/spotify-mp3-saver'),
  }
}

export default function SpotifyPage() {
  const platform = "spotify";
  return (
    <>
      <ToolsHero
        title="Spotify Music Downloader"
        subtitle="Download songs, playlists, and podcasts from Spotify for free."
      >
        <PlatformDownloader platform="spotify" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="spotify"
            title="How to Download Spotify Media?"
            steps={[
              "Find the Spotify song, album, or playlist URL (e.g., from open.spotify.com).",
              "Paste the URL into the input field on this page.",
              "Click the 'Process' button to fetch the audio details.",
              "Select your preferred audio quality (e.g., MP3).",
              "Click 'Download Now' to save the Spotify audio."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <SpotifySEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <SpotifyFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Spotify Music Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download songs, playlists, and podcasts from Spotify for free. Listen to your favorite Spotify music offline.",
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
function SpotifyFAQSection() {
  return (
    <FAQSection
      faqs={[
        { question: "What About Audio Quality?", answer: "Our downloader maintains the original quality of your music and removes ads, ensuring you get the best possible listening experience." },
        { question: "Does the Tool Work with Free Spotify Accounts?", answer: "Yes, our downloader works with both free and premium Spotify accounts. You don't need a paid subscription to use our service effectively." },
        { question: "Is There a Download Limit?", answer: "We don't impose strict limits on our free users, though we encourage responsible usage to ensure our service remains available for everyone." }
      ]}
    />
  );
}
