import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"
import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";
// Lazy load non-critical components
const BlueskySEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.BlueskySEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Bluesky Video Saver | Save Posts, Images & Videos",
  description: "Download content from Bluesky (bsky.app) for free. Save posts, images, and videos from the decentralized social network.",
  openGraph: {
    title: "Bluesky Video Saver | Save Posts, Images & Videos",
    description: "Download content from Bluesky (bsky.app) for free. Save posts, images, and videos from the decentralized social network.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/bluesky-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bluesky Video Saver",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/bluesky-video-saver'),
  }
}

export default function BlueskyPage() {
  const platform = "bsky";
  return (
    <>
      <ToolsHero
        title="Bluesky Video Saver"
        subtitle="Download content from Bluesky (bsky.app) for free."
      >
        <PlatformDownloader platform="bsky" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="bsky"
            title="How to Download Bluesky Media?"
            steps={[
              "Find the Bluesky post URL on bsky.app.",
              "Paste the URL into the input field on this page.",
              "Click the 'Process' button to fetch the content.",
              "Select your preferred format if options are available (e.g., images, video).",
              "Click 'Download Now' to save the Bluesky content."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <BlueskySEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <BlueskyFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Bluesky Content Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download content from Bluesky (bsky.app) for free. Save posts, images, and videos from the decentralized social network.",
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
function BlueskyFAQSection() {
  const faqs = [
    { 
      question: "What format do Bluesky videos download in?", 
      answer: "Most high-quality video downloaders, including FSMVID, save videos in the MP4 format. MP4 is a universally compatible format that plays on virtually all modern devices, video players, and editing software." 
    },
    { 
      question: "What is the quality of the downloaded video?", 
      answer: "The quality of the downloaded video is directly dependent on the quality of the original upload. A reliable downloader will always grab the highest resolution version of the video that Bluesky makes available. For example, if the original video was uploaded in 720p, the tool will provide a 720p download." 
    },
    { 
      question: "Can I use a Bluesky Video Saver on my phone?", 
      answer: "Yes. Web-based tools like FSMVID are designed to be fully functional on mobile devices. You can use them in any modern web browser on both Android and iOS smartphones and tablets without needing to install an app. Browser extensions, on the other hand, are typically limited to desktop browsers." 
    },
    { 
      question: "Will the downloaded video have a watermark?", 
      answer: "Reputable tools like the FSMVID Bluesky Video Saver provide downloads that are completely free of watermarks. Some other free online tools may add their own logo or branding to the downloaded video as a form of promotion, which can be undesirable for users who want a clean copy of the original content." 
    },
    { 
      question: "Can I download videos from private Bluesky accounts?", 
      answer: "FSMVID is designed for the most common and legitimate use case: downloading publicly available videos. This approach respects user privacy and aligns with the intended use of the platform." 
    }
  ];

  return <FAQSection faqs={faqs} />;
}
