import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const RedditSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.RedditSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Reddit Video Downloader | Save Reddit Videos & GIFs",
  description: "Download videos and animated GIFs from Reddit posts for free. Easily save content from various subreddits.",
  openGraph: {
    title: "Reddit Video Downloader | Save Reddit Videos & GIFs",
    description: "Download videos and animated GIFs from Reddit posts for free. Easily save content from various subreddits.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/reddit-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Reddit Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/reddit-video-saver'),
  }
}

export default function RedditPage() {
  const platform = "reddit";
  return (
    <>
      <ToolsHero
        title="Reddit Video Downloader"
        subtitle="Download videos and animated GIFs from Reddit posts for free."
        platform="reddit"
      >
        <PlatformDownloader platform="reddit" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="reddit"
            title="How to Download Reddit Media?"
            steps={[
              "Find the Reddit post URL containing the video or GIF.",
              "Paste the URL into the input field on this page.",
              "Click the 'Process' button to fetch the media.",
              "Select your preferred format (e.g., MP4 for videos).",
              "Click 'Download Now' to save the Reddit content."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <RedditSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <RedditFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Reddit Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download videos and animated GIFs from Reddit posts for free. Easily save content from various subreddits.",
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
function RedditFAQSection() {
  return (
    <FAQSection
      faqs={[
        { question: "What formats can I download Reddit videos in?", answer: "Our Reddit video downloader primarily provides MP4 files, which are compatible with virtually all devices and media players. We also offer audio extraction in MP3 format for audio-only content." },
        { question: "Can I download Reddit videos with audio?", answer: "Yes, modern Reddit video downloaders like RapidSave and similar tools can download Reddit videos with sound and audio in HD quality. Our fsmvid tool ensures audio is preserved in all downloads." },
        { question: "Is it free to download Reddit videos?", answer: "Absolutely! Our Reddit video downloader is completely free to use. There are no hidden fees, subscription requirements, or download limits." },
        { question: "Do I need to install any software?", answer: "No installation required. Our web-based Reddit video downloader works directly in your browser, making it compatible with any device or operating system." },
        { question: "Can I download videos from private subreddits?", answer: "You can only download videos from subreddits you have access to. Private or restricted subreddits require appropriate permissions, and our tool respects these privacy settings." },
        { question: "How long are downloaded videos stored?", answer: "Videos are downloaded directly to your device, so storage duration depends on your personal file management. We don't store any videos on our servers, ensuring your privacy and giving you complete control over your downloaded content." },
        { question: "Can I download videos on mobile devices?", answer: "Yes! There are dedicated mobile apps like Viddit that allow you to download videos from Reddit with audio directly on your smartphone. Our web tool also works on mobile browsers." }
      ]}
    />
  );
}
