import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"
import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const NineGagSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.NineGagSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "9GAG Video Saver | Download Videos and Images",
  description:
    "9GAG Video Saver help you to download funny videos, GIFs, and images from 9GAG for free. Save your favorite 9GAG content easily.",
  openGraph: {
    title: "9GAG Video Saver | Download Videos and Images",
    description:
      "9GAG Video Saver help you to download funny videos, GIFs, and images from 9GAG for free. Save your favorite 9GAG content easily.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/9gag-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "9GAG Video Saver",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/9gag-video-saver'),
  }
}

export default function NineGagPage() {
  const platform = "9gag";
  return (
    <>
      <ToolsHero
        title="9GAG Video Saver"
        subtitle="Download funny videos, GIFs, and images from 9GAG for free."
        platform="9gag"
      >


        <PlatformDownloader platform="9gag" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="9gag"
            title="How to Download 9GAG Videos?"
            steps={[
              "Copy the 9GAG post URL from your browser or app.",
              "Paste the URL into the input field above.",
              "Click the 'Process' button to fetch the media.",
              "Select your preferred quality/format if options are available.",
              "Click 'Download Now' to save the media to your device."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <NineGagSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <NineGagFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "9GAG Video Saver",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "9GAG Video Saver help you to download funny videos, GIFs, and images from 9GAG for free. Save your favorite 9GAG content easily.",
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
function NineGagFAQSection() {
  return (
    <FAQSection
      faqs={[
       { question: "Is it free to download from 9GAG?", answer: "Yes, our 9GAG saver is completely free to use." },
  { question: "What types of 9GAG content can I download?", answer: "You can download videos, animated GIFs, and images from 9GAG posts." },
  { question: "Can I download 9GAG videos without a watermark?", answer: "Yes, our 9GAG Video Saver allows you to download videos without any watermarks, ensuring a clean viewing experience." },
  { question: "Is it legal to download videos from 9GAG?", answer: "Downloading videos for personal use is generally acceptable. However, it's important to respect copyright laws and 9GAG's terms of service." },
  { question: "Do I need to install any software to use the 9GAG Video Saver?", answer: "No, our tool is web-based and requires no software installation. Simply paste the 9GAG video URL to start downloading." },
  { question: "Can I use the 9GAG Video Saver on my mobile device?", answer: "Absolutely! Our 9GAG Video Saver is optimized for both desktop and mobile browsers, allowing you to download content on the go." },
  { question: "What video formats are supported by the 9GAG Video Saver?", answer: "Our tool primarily supports MP4 format, ensuring compatibility with most devices and media players." },
  { question: "Is there a limit to the number of videos I can download?", answer: "No, you can download as many 9GAG videos as you like without any restrictions." },
  { question: "How do I download a video using the 9GAG Video Saver?", answer: "Simply copy the URL of the 9GAG video you wish to download, paste it into our tool, and click the 'Download' button." },
  { question: "Does the 9GAG Video Saver support batch downloads?", answer: "Currently, our tool supports downloading one video at a time. We're working on adding batch download functionality in the future." }
      ]}
    />
  );
}
