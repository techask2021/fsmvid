import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";
// Lazy load non-critical components
const VimeoSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.VimeoSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Vimeo Video Downloader | Download Vimeo Videos in HD Quality",
  description:
    "Our Vimeo Video Downloader is a free tool that allows you to download Vimeo videos in high quality. Extract and save Vimeo videos easily with our Vimeo video extractor tool.",
  openGraph: {
    title: "Vimeo Video Downloader | Download Vimeo Videos in HD Quality",
    description:
      "Our Vimeo Video Downloader is a free tool that allows you to download Vimeo videos in high quality. Extract and save Vimeo videos easily with our Vimeo video extractor tool.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/vimeo-video-extractor`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vimeo Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/vimeo-video-extractor'),
  }
}

export default function VimeoPage() {
  const platform = "vimeo";
  
  return (
    <>
      <ToolsHero
        title="Vimeo Video Downloader"
        subtitle="Download Vimeo videos in high quality for free."
      >
        <PlatformDownloader platform="vimeo" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="vimeo"
            title="How to Download Vimeo Videos?"
            steps={[
              "Visit Vimeo.com and find the video you want to download.",
              "Copy the video URL from the address bar or share button.",
              "Paste the URL into our Vimeo video extractor above and click Download.",
              "Choose your preferred quality and format, then download your video.",
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <VimeoSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <VimeoFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Vimeo Video Extractor",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Vimeo Video Downloader is a free tool that allows you to download Vimeo videos in high quality. Extract and save Vimeo videos easily with our Vimeo video extractor tool.",
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
function VimeoFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "What quality options are available for Vimeo videos?",
          answer:
            "Our Vimeo video extractor offers various quality options including SD (360p, 480p), HD (720p, 1080p), and even 4K when available from the original source.",
        },
        {
          question: "Can I download password-protected Vimeo videos?",
          answer:
            "No, our tool can only download publicly available Vimeo videos. Password-protected or private videos cannot be downloaded.",
        },
        {
          question: "Can I download Vimeo videos with subtitles?",
          answer:
            "Currently, our tool downloads the video only. Subtitles and captions are not included in the download.",
        },
        {
          question: "Is it legal to download Vimeo videos?",
          answer:
            "Downloading videos for personal use is generally acceptable, but redistributing copyrighted content without permission is not. Always respect copyright laws and Vimeo's terms of service.",
        },
      ]}
    />
  );
}
