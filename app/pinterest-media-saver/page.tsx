import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";
// Lazy load non-critical components
const PinterestSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.PinterestSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Pinterest Video Downloader | Download Pinterest Images & Videos",
  description:
    "Pinterest Video Downloader to download Pinterest images and videos in high quality for free. Save Pinterest content easily with our Pinterest media saver tool.",
  openGraph: {
    title: "Pinterest Video Downloader | Download Pinterest Images & Videos",
    description:
      "Pinterest Video Downloader to download Pinterest images and videos in high quality for free. Save Pinterest content easily with our Pinterest media saver tool.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/pinterest-media-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pinterest Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/pinterest-media-saver'),
  }
}

export default function PinterestPage() {
  const platform = "pinterest";
  return (
    <>
      <ToolsHero
        title="Pinterest Video Downloader"
        subtitle="Download Pinterest images and videos in high quality for free. The easiest way to save Pinterest content."
      >
        <PlatformDownloader platform="pinterest" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="pinterest"
            title="How to Download Pinterest Content?"
            steps={[
              "Visit Pinterest and find the pin containing the image or video you want to download.",
              "Copy the pin URL from the address bar or share button.",
              "Paste the URL into our Pinterest media saver above and click Download.",
              "Choose your preferred quality and download your Pinterest content.",
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <PinterestSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <PinterestFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Pinterest Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Pinterest Video Downloader to download Pinterest images and videos in high quality for free. Save Pinterest content easily with our Pinterest media saver tool.",
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
function PinterestFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "What Pinterest content can I download?",
          answer:
            "Our Pinterest media saver supports images, videos, and GIFs from public pins. You can download single pins or multiple pins from boards.",
        },
        {
          question: "Can I download entire Pinterest boards?",
          answer:
            "Currently, our tool downloads individual pins. To download an entire board, you would need to download each pin separately.",
        },
        {
          question: "Can I download Pinterest Story Pins?",
          answer:
            "Yes, our Pinterest media saver can download content from Story Pins, including all images and videos in the story.",
        },
        {
          question: "Will I get the highest quality Pinterest images?",
          answer:
            "Yes, our tool downloads Pinterest images in their original high resolution, which is often better quality than what's displayed on Pinterest itself.",
        },
      ]}
    />
  );
}
