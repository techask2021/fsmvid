import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"
import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const DeezerSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.DeezerSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Deezer Music Downloader | Download Deezer Songs in High Quality",
  description: "Download your favorite songs and playlists from Deezer in high quality for free. Save Deezer music in MP3 320kbps or FLAC lossless format with our easy-to-use Deezer music downloader.",
  openGraph: {
    title: "Deezer Music Downloader | Download Deezer Songs in High Quality",
    description: "Download your favorite songs and playlists from Deezer in high quality for free. Save Deezer music in MP3 320kbps or FLAC lossless format with our easy-to-use Deezer music downloader.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/deezer-music-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Deezer Music Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/deezer-music-saver'),
  }
}

export default function DeezerPage() {
  const platform = "deezer";
  return (
    <>
      <ToolsHero
        title="Deezer Music Downloader"
        subtitle="Download music from Deezer in high quality for free. Save your favorite songs and playlists in MP3 or FLAC format."
        platform="deezer"
      >
        <PlatformDownloader platform="deezer" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="deezer"
            title="How to Download Music from Deezer?"
            steps={[
              "Find the song, album, or playlist on Deezer that you want to download.",
              "Click on the three dots and select 'Share' then 'Copy Link'.",
              "Paste the Deezer URL into the input field above.",
              "Click the 'Process' button to fetch the track information.",
              "Click 'Download Now' to save the music to your device."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>

        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <DeezerSEOContent />
        </Suspense>

        <Suspense fallback={<FAQLoading />}>
          <DeezerFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Deezer Music Downloader",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download your favorite songs and playlists from Deezer in high quality for free. Save Deezer music in MP3 320kbps or FLAC lossless format with our easy-to-use Deezer music downloader.",
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
function DeezerFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "How can I download music from Deezer for free?",
          answer: "Use FSMVid's Deezer music downloader. Simply copy the song or playlist link from Deezer, paste it into our tool, select your preferred quality, and download the music to your device - all completely free."
        },
        {
          question: "Is it legal to download music from Deezer?",
          answer: "Downloading Deezer music for personal, non-commercial use is generally acceptable. However, distributing or selling downloaded content without permission violates copyright laws. Always respect artists' rights and support them through legitimate means."
        },
        {
          question: "What audio quality can I download Deezer music in?",
          answer: "FSMVid supports multiple quality options including MP3 128kbps, MP3 320kbps for high quality, and FLAC lossless format for audiophiles seeking the best possible sound quality."
        },
        {
          question: "Can I download Deezer playlists?",
          answer: "Yes, you can download entire playlists from Deezer. Simply copy the playlist URL and paste it into our downloader. You may need to download tracks individually depending on the playlist size."
        },
        {
          question: "Do I need a Deezer Premium account to download music?",
          answer: "No, you don't need a Deezer Premium subscription to use our downloader. However, the quality available may depend on what Deezer makes accessible for the specific track."
        },
        {
          question: "Can I download Deezer music on mobile devices?",
          answer: "Absolutely! FSMVid works seamlessly on all devices including smartphones and tablets. Just open your mobile browser, visit our site, and follow the same simple steps to download Deezer music."
        },
        {
          question: "What's the difference between MP3 and FLAC downloads?",
          answer: "MP3 is a compressed format that saves storage space while maintaining good quality. FLAC is lossless, preserving 100% of the original audio quality but with larger file sizes. Choose MP3 320kbps for everyday listening or FLAC for audiophile-quality audio."
        },
        {
          question: "Can I download music from Deezer in other countries?",
          answer: "Yes, FSMVid works globally. However, some Deezer tracks may have regional restrictions due to licensing agreements and may not be downloadable in certain countries."
        },
        {
          question: "How do I add downloaded Deezer music to my music library?",
          answer: "Once downloaded, you can import the music files into any media player like iTunes, Windows Media Player, VLC, or transfer them to your smartphone. The files include metadata for easy organization."
        },
        {
          question: "Are there any download limits?",
          answer: "FSMVid does not impose download limits. You can download as many Deezer tracks as you need for your personal music collection."
        },
        {
          question: "Why should I choose Deezer over other music platforms?",
          answer: "Deezer offers over 90 million tracks, FLAC lossless audio quality, comprehensive international music catalogs, and unique features like Flow for music discovery. It's an excellent choice for music enthusiasts worldwide."
        }
      ]}
    />
  );
}

