import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/download/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/content/Tools-hero";
import PlatformFeatures from "@/components/platform/platform-features";
import PlatformHowTo from "@/components/platform/platform-how-to";

// Lazy load non-critical components
const ImgurSEOContent = lazy(() => import("@/components/seo/seo-content").then(mod => ({ default: mod.ImgurSEOContent })))
const RelatedTools = lazy(() => import("@/components/platform/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Imgur Video Downloader | Download Imgur Videos in High Quality",
  description:
    "Imgur Video Downloader online tool to download Imgur videos in high quality for free. Save Imgur content easily with our Imgur video downloader tool.",
  openGraph: {
    title: "Imgur Video Downloader | Download Imgur Videos in High Quality",
    description:
      "Imgur Video Downloader online tool to download Imgur videos in high quality for free. Save Imgur content easily with our Imgur video downloader tool.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/imgur-media-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Imgur Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/imgur-media-saver'),
  }
}

export default function ImgurPage() {
  const platform = "imgur";
  return (
    <>
      <ToolsHero
        title="Imgur Video Downloader"
        subtitle="Download Imgur videos in high quality for free. The easiest way to save Imgur content."
        platform="imgur"
      >
        <PlatformDownloader platform="imgur" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="imgur"
            title="How to Download Imgur Images, GIFs & Videos?"
            steps={[
              "Visit Imgur and find the image, GIF, or video you want to download.",
              "Copy the URL from the address bar or share button.",
              "Paste the URL into our Imgur media saver above and click Download.",
              "Choose your preferred quality and download your Imgur content.",
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>

   

        <Suspense fallback={<ContentLoading />}>
          <ImgurSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <ImgurFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Imgur Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Imgur Video Downloader online tool to download Imgur videos in high quality for free. Save Imgur content easily with our Imgur video downloader tool.",
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
function ImgurFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "What Imgur content can I download?",
          answer: "Our Imgur media saver supports images, GIFs, videos, and entire albums/galleries. You can download single items or multiple items from albums.",
        },
        {
          question: "Can I download entire Imgur albums?",
          answer:
            "Yes, our tool can download all images and media from Imgur albums. Each item will be available as a separate download.",
        },
        {
          question: "What's the highest quality available for Imgur downloads?",
          answer:
            "Our tool downloads Imgur content in its original uploaded quality, which is typically the highest resolution available.",
        },
        {
          question: "Can I download Imgur GIFs as MP4 videos?",
          answer:
            "Yes, our Imgur media saver converts GIFs to MP4 format, which allows for better quality and smaller file sizes compared to the original GIF format.",
        },
      ]}
    />
  );
}
