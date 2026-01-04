import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/download/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"
import ToolsHero from "@/components/content/Tools-hero";
import PlatformFeatures from "@/components/platform/platform-features";
import PlatformHowTo from "@/components/platform/platform-how-to";

// Lazy load non-critical components
const InstagramSEOContent = lazy(() => import("@/components/seo/seo-content").then(mod => ({ default: mod.InstagramSEOContent })))
const RelatedTools = lazy(() => import("@/components/platform/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Instagram Video Downloader | Download Instagram Photos, Videos & Reels",
  description:
    "Instagram Video Downloader tool to download Instagram photos, videos, reels, and stories in high quality for free. Save Instagram content easily with our Instagram media saver.",
  openGraph: {
    title: "Instagram Video Downloader | Download Instagram Photos, Videos & Reels",
    description:
      "Instagram Video Downloader tool to download Instagram photos, videos, reels, and stories in high quality for free. Save Instagram content easily with our Instagram media saver.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/instagram-media-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Instagram Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/instagram-media-saver'),
  }
}

export default function InstagramPage() {
  const platform = "instagram";
  return (
    <>
      <ToolsHero
        title="Instagram Video Downloader"
        subtitle="Download Instagram photos, videos, reels, and stories in high quality for free."
        platform="instagram"
      >
        <PlatformDownloader platform="instagram" />
      </ToolsHero>
      <div>
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="instagram"
            title="How to Download Instagram Content?"
            steps={[
              "Open Instagram and find the post, reel, or story you want to download.",
              "Click on the three dots (⋯) and select 'Copy Link' or copy the URL from your browser's address bar.",
              "Paste the URL into our Instagram media saver above and click Download.",
              "Choose your preferred quality and download your Instagram content.",
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>







        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <InstagramSEOContent />
        </Suspense>



        <Suspense fallback={<FAQLoading />}>
          <InstagramFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Instagram Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Instagram Video Downloader tool to download Instagram photos, videos, reels, and stories in high quality for free. Save Instagram content easily with our Instagram media saver.",
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
function InstagramFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "What Instagram content can I download?",
          answer:
            "Our Instagram media saver supports photos, videos, reels, IGTV videos, and public stories. You can download single posts or entire carousels (multiple photos/videos in one post).",
        },
        {
          question: "Can I download Instagram Stories?",
          answer:
            "Yes, you can download public Instagram stories. However, stories from private accounts or close friends stories cannot be downloaded.",
        },
        {
          question: "How do I download Instagram Reels?",
          answer:
            "The process is the same as downloading regular posts. Copy the Reel URL, paste it into our Instagram media saver, and download in your preferred quality.",
        },
        {
          question: "Can I download Instagram profile pictures?",
          answer:
            "Yes, you can download Instagram profile pictures in full size by entering the profile URL into our Instagram media saver.",
        },
        {
          question: "Is it legal to download Instagram content?",
          answer:
            "Downloading Instagram content for personal use is generally acceptable. However, you should respect copyright laws and not redistribute content without permission from the original creator.",
        },
      ]}
    />
  );
}
