import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";
// Lazy load non-critical components
const LinkedInSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.LinkedInSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "LinkedIn Video Downloader | Download LinkedIn Videos & Images",
  description:
    "LinkedIn Video Downloader tool to download LinkedIn videos and images in high quality for free. Save LinkedIn content easily with our LinkedIn content saver tool.",
  openGraph: {
    title: "LinkedIn Video Downloader | Download LinkedIn Videos & Images",
    description:
      "LinkedIn Video Downloader to download LinkedIn videos and images in high quality for free. Save LinkedIn content easily with our LinkedIn content saver tool.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/linkedin-content-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LinkedIn Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/linkedin-content-saver'),
  }
}

export default function LinkedInPage() {
  const platform = "linkedin";
  return (
    <>
      <ToolsHero
        title="LinkedIn Video Downloader"
        subtitle="Download LinkedIn videos and images in high quality for free. The easiest way to save LinkedIn content."
      >
        <PlatformDownloader platform="linkedin" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="linkedin"
            title="How to Download LinkedIn Content?"
            steps={[
              "Visit LinkedIn and find the post containing the video or image you want to download.",
              "Click on the three dots (...) in the top right corner of the post and select 'Copy link to post'.",
              "Paste the URL into our LinkedIn content saver above and click Download.",
              "Choose your preferred quality and download your LinkedIn content.",
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


    
        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <LinkedInSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <LinkedInFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "LinkedIn Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "LinkedIn Video Downloader to download LinkedIn videos and images in high quality for free. Save LinkedIn content easily with our LinkedIn content saver tool.",
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
function LinkedInFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "What LinkedIn content can I download?",
          answer:
            "Our LinkedIn content saver supports videos, images, and slideshows from public posts and articles. Private content or content that requires login cannot be downloaded.",
        },
        {
          question: "Can I download LinkedIn Learning videos?",
          answer:
            "No, our tool cannot download LinkedIn Learning videos as they are protected content that requires a subscription.",
        },
        {
          question: "Can I download LinkedIn profile pictures?",
          answer:
            "Yes, our LinkedIn content saver can download profile pictures in their original high resolution by entering the profile URL.",
        },
        {
          question: "Is it legal to download LinkedIn content?",
          answer:
            "Downloading content for personal use is generally acceptable, but redistributing or using content commercially without permission may violate copyright laws and LinkedIn's terms of service.",
        },
      ]}
    />
  );
}
