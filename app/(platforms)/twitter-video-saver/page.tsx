import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/download/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"
import ToolsHero from "@/components/content/Tools-hero";
import PlatformFeatures from "@/components/platform/platform-features";
import PlatformHowTo from "@/components/platform/platform-how-to";

// Lazy load non-critical components
const TwitterSEOContent = lazy(() => import("@/components/seo/seo-content").then(mod => ({ default: mod.TwitterSEOContent })))
const RelatedTools = lazy(() => import("@/components/platform/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Twitter Video Downloader | Download Twitter Videos & GIFs",
  description:
    "Twitter Video Downloader tool to download Twitter videos and GIFs in high quality for free. Save Twitter content easily with our Twitter video saver tool.",
  openGraph: {
    title: "Twitter Video Downloader | Download Twitter Videos & GIFs",
    description:
      "Twitter Video Downloader tool to download Twitter videos and GIFs in high quality for free. Save Twitter content easily with our Twitter video saver tool.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/twitter-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Twitter Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/twitter-video-saver'),
  }
}

export default function TwitterPage() {
  const platform = "twitter";
  return (
    <>
      <ToolsHero
        title="Twitter Video Downloader"
        subtitle="Download Twitter videos and GIFs in high quality for free."
        platform="twitter"
      >
        <PlatformDownloader platform="twitter" />
      </ToolsHero>
      <div>
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="twitter"
            title="How to Download Twitter Videos?"
            steps={[
              "Find the tweet containing the video or GIF you want to download.",
              "Click on the Share button and select 'Copy link to Tweet'.",
              "Paste the URL into our Twitter video saver above and click Download.",
              "Choose your preferred quality and download your Twitter video or GIF.",
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <TwitterSEOContent />
        </Suspense>



        <Suspense fallback={<FAQLoading />}>
          <TwitterFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Twitter Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Twitter Video Downloader tool to download Twitter videos and GIFs in high quality for free. Save Twitter content easily with our Twitter video saver tool.",
            }),
          }}
        />

        {/* Related Tools Section */}
        <Suspense fallback={<ContentLoading />}>
          <RelatedTools currentPlatform={platform} />
        </Suspense>
      </div>
    </>
  );
}

// Extract FAQ section to its own component for better code splitting
function TwitterFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "Can I download Twitter Spaces recordings?",
          answer:
            "Yes, our Twitter video saver can download Spaces recordings that have been made public by the host.",
        },
        {
          question: "What's the highest quality available for Twitter videos?",
          answer:
            "Our tool downloads Twitter videos in the highest quality available, which is typically up to 720p for most Twitter videos.",
        },
        {
          question: "Can I download Twitter GIFs as MP4 videos?",
          answer:
            "Yes, our Twitter video saver converts Twitter GIFs to MP4 format, which allows for better quality and smaller file sizes.",
        },
        {
          question: "Does this work with the new X.com domain?",
          answer:
            "Yes, our Twitter video saver works with both Twitter.com and X.com URLs. You can use either domain to download videos.",
        },
      ]}
    />
  );
}
