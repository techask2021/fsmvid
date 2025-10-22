import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"
import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const CastboxSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.CastboxSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Castbox Podcast Downloader | Download Castbox Podcasts Offline",
  description: "Download your favorite podcasts from Castbox for offline listening. Free Castbox podcast downloader to save podcast episodes in high quality MP3 format.",
  openGraph: {
    title: "Castbox Podcast Downloader | Download Castbox Podcasts Offline",
    description: "Download your favorite podcasts from Castbox for offline listening. Free Castbox podcast downloader to save podcast episodes in high quality MP3 format.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/castbox-podcast-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Castbox Podcast Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/castbox-podcast-saver'),
  }
}

export default function CastboxPage() {
  const platform = "castbox";
  return (
    <>
      <ToolsHero
        title="Castbox Podcast Downloader"
        subtitle="Download podcasts from Castbox for offline listening. Save your favorite episodes in high quality MP3 format."
        platform="castbox"
      >
        <PlatformDownloader platform="castbox" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="castbox"
            title="How to Download Castbox Podcasts?"
            steps={[
              "Find the podcast episode on Castbox that you want to download.",
              "Click on the share icon and select 'Copy Link'.",
              "Paste the Castbox URL into the input field above.",
              "Click the 'Process' button to fetch the podcast information.",
              "Click 'Download Now' to save the podcast to your device."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>

        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <CastboxSEOContent />
        </Suspense>

        <Suspense fallback={<FAQLoading />}>
          <CastboxFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Castbox Podcast Downloader",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download your favorite podcasts from Castbox for offline listening. Free Castbox podcast downloader to save podcast episodes in high quality MP3 format.",
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
function CastboxFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "How can I download podcasts from Castbox for free?",
          answer: "Use FSMVid's Castbox podcast downloader. Simply copy the episode link from Castbox, paste it into our tool, and download the podcast to your device - all completely free."
        },
        {
          question: "Is it legal to download podcasts from Castbox?",
          answer: "Downloading podcasts for personal, offline listening is generally acceptable. However, redistributing or using downloaded content commercially requires permission from the podcast creators. Always respect creators' rights."
        },
        {
          question: "What audio quality can I download Castbox podcasts in?",
          answer: "FSMVid downloads Castbox podcasts in high-quality MP3 format, typically 128-192kbps, which is perfect for voice content and provides excellent clarity."
        },
        {
          question: "Can I download entire podcast series from Castbox?",
          answer: "You can download individual episodes from any podcast. For series, you'll need to download each episode separately using our tool."
        },
        {
          question: "Do I need a Castbox account to download podcasts?",
          answer: "No, you don't need a Castbox account to use our downloader. Just copy the podcast episode link and download it directly."
        },
        {
          question: "Can I download Castbox podcasts on my mobile device?",
          answer: "Yes! FSMVid works seamlessly on smartphones and tablets. Just open your mobile browser, visit our site, and download podcasts directly to your phone."
        },
        {
          question: "How do I listen to downloaded Castbox podcasts offline?",
          answer: "Once downloaded, you can play the MP3 files in any podcast app or music player on your device. They work offline without requiring internet connection."
        },
        {
          question: "Are there any download limits on Castbox podcasts?",
          answer: "FSMVid does not impose download limits. You can download as many podcast episodes as you need for your personal podcast library."
        },
        {
          question: "Can I download premium or exclusive Castbox content?",
          answer: "Our tool can only download publicly available podcast episodes. Premium or subscription-based content requires proper authentication and cannot be downloaded."
        },
        {
          question: "What file format are Castbox podcasts downloaded in?",
          answer: "Podcasts are downloaded in MP3 format, which is universally compatible with all devices, podcast players, and music apps."
        },
        {
          question: "How can I organize my downloaded Castbox podcasts?",
          answer: "Create folders by podcast name, topic, or date. Use podcast management apps or music players to create playlists and organize your downloaded episodes efficiently."
        }
      ]}
    />
  );
}

