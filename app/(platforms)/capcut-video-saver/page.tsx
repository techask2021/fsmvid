import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/download/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/content/Tools-hero";
import PlatformFeatures from "@/components/platform/platform-features";
import PlatformHowTo from "@/components/platform/platform-how-to";

// Lazy load non-critical components
const CapcutSEOContent = lazy(() => import("@/components/seo/seo-content").then(mod => ({ default: mod.CapcutSEOContent })))
const RelatedTools = lazy(() => import("@/components/platform/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "CapCut Video Downloader | Save CapCut Templates & Videos",
  description: "CapCut Video Downloader help you to download video templates and edited videos from CapCut for free. Easily save CapCut content without watermarks where possible.",
  openGraph: {
    title: "CapCut Video Downloader | Save CapCut Templates & Videos",
    description: "CapCut Video Downloader help you to download video templates and edited videos from CapCut for free. Easily save CapCut content without watermarks where possible.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/capcut-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CapCut Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/capcut-video-saver'),
  }
}

export default function CapcutPage() {
  const platform = "capcut";
  return (
    <>
      <ToolsHero
        title="CapCut Video Downloader"
        subtitle="Download video templates and edited videos from CapCut for free."
        platform="capcut"
      >

        <PlatformDownloader platform="capcut" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="capcut"
            title="How to Download CapCut Videos?"
            steps={[
              "Find the CapCut video or template URL.",
              "Paste the URL into the input field above.",
              "Click the 'Process' button to fetch the content information.",
              "Select your preferred format if options are available.",
              "Click 'Download Now' to save the CapCut content."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <CapcutSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <CapcutFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "CapCut Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "CapCut Video Downloader help you to download video templates and edited videos from CapCut for free. Easily save CapCut content without watermarks where possible.",
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
function CapcutFAQSection() {
  return (
    <FAQSection
      faqs={[
        { question: "Is FSMVid's CapCut Video Downloader completely free?", answer: "Yes, FSMVid's CapCut Video Downloader is entirely free to use. There are no hidden fees, subscription requirements, or download limits. You can save as many videos as needed without any charges." },
        { question: "What video formats are supported for download?", answer: "The downloader supports popular formats including MP4, AVI, and MOV. MP4 is recommended for most users due to its universal compatibility and efficient compression." },
        { question: "Can I download CapCut videos without watermarks?", answer: "FSMVid's downloader preserves the original video without adding any watermarks or branding, ensuring your content remains professional and clean." },
        { question: "Is it safe to use online video downloaders?", answer: "FSMVid's CapCut Video Downloader operates over secure HTTPS connections and doesn't store your videos or personal information. The service prioritizes user privacy and data security." },
        { question: "Why isn't my CapCut video link working?", answer: "Ensure the link is complete and correctly copied. Some links may expire or have restricted access. Try copying the link again from the source, or check if the video is publicly accessible." },
        { question: "Can I download private CapCut videos?", answer: "The downloader can only access publicly available CapCut videos. Private or restricted content cannot be downloaded without proper permissions from the original creator." },
        { question: "What should I do if the download fails?", answer: "Clear your browser cache, check your internet connection, and try again. If problems persist, try using a different browser or contact FSMVid support for assistance." },
        { question: "Are there any download limits?", answer: "FSMVid doesn't impose specific download limits, but be respectful of server resources. Avoid automated downloading tools and download videos at reasonable intervals." },
        { question: "Can I download CapCut videos on mobile devices?", answer: "Yes, FSMVid's CapCut Video Downloader works on all devices with web browsers, including smartphones and tablets. The responsive design ensures optimal performance across all screen sizes." },
        { question: "How long are downloaded videos stored on FSMVid servers?", answer: "FSMVid doesn't store your downloaded videos. The processing happens in real-time, and files are transmitted directly to your device without server storage." }
      ]}
    />
  );
}
