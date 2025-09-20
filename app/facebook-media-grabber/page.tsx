import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"
import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const FacebookSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.FacebookSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Facebook Video Downloader | Download Facebook Videos & Reels",
  description:
    "Facebook Video Downloader tool to download Facebook videos, photos, and stories, reels, IGTV videos, and live videos in high quality for free. Easy-to-use Facebook media grabber tool.",
  openGraph: {
    title: "Facebook Video Downloader | Download Facebook Videos & Reels",
    description:
      "Facebook Video Downloader tool to download Facebook videos, photos, and stories, reels, IGTV videos, and live videos in high quality for free. Easy-to-use Facebook media grabber tool.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/facebook-media-grabber`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Facebook Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/facebook-media-grabber'),
  }
}

export default function FacebookPage() {
  const platform = "facebook";
  return (
    <>
      <ToolsHero
        title="Facebook Video Downloader"
        subtitle="Download Facebook videos, photos, stories, and reels in high quality for free."
        platform="facebook"
      >
        <PlatformDownloader platform="facebook" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="facebook"
            title="How to Download Facebook Media?"
            steps={[
              "Open Facebook and find the video, photo, or story you want to download.",
              "Click on the three dots (...) in the top right corner of the post and select 'Copy link'.",
              "Paste the URL into our Facebook media grabber above and click Download.",
              "Choose your preferred quality and download your Facebook content.",
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <FacebookSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <FacebookFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Facebook Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Facebook Video Downloader tool to download Facebook videos, photos, and stories, reels, IGTV videos, and live videos in high quality for free. Easy-to-use Facebook media grabber tool.",
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
function FacebookFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "What Facebook content can I download?",
          answer:
            "Our Facebook media grabber supports videos, photos, stories, reels, and live videos (after they've ended). You can download almost any public content from Facebook.",
        },
        {
          question: "Can I download private Facebook content?",
          answer:
            "No, our tool can only download publicly available Facebook content. Private posts, videos, or photos that require login cannot be downloaded.",
        },
        {
          question: "What video quality can I download Facebook videos in?",
          answer:
            "We offer various quality options including HD when available from the original source. You can choose the quality that best suits your needs.",
        },
        {
          question: "How do I download Facebook Reels?",
          answer:
            "The process is the same as downloading regular videos. Copy the Reel URL, paste it into our Facebook media grabber, and download in your preferred quality.",
        },
        {
          question: "Is it legal to download Facebook videos?",
          answer: 
            "Downloading Facebook videos for personal use is generally acceptable. However, you should respect copyright laws and not redistribute content without permission.",
        },
      ]}
    />
  );
}
