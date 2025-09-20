import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";
// Lazy load non-critical components
const WeiboSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.WeiboSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Weibo Video Downloader | Save Weibo Videos (微博)",
  description: "Download videos from Weibo (weibo.com / weibo.cn) for free. Save your favorite videos from the popular Chinese microblogging site.",
  openGraph: {
    title: "Weibo Video Downloader | Save Weibo Videos (微博)",
    description: "Download videos from Weibo (weibo.com / weibo.cn) for free. Save your favorite videos from the popular Chinese microblogging site.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/weibo-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Weibo Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/weibo-video-saver'),
  }
}

export default function WeiboPage() {
  const platform = "weibo";
  return (
    <>
      <ToolsHero
        title="Weibo Video Downloader"
        subtitle="Download videos from Weibo (weibo.com / weibo.cn) for free."
      >
        <PlatformDownloader platform="weibo" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="weibo"
            title="How to Download Weibo Media?"
            steps={[
              "Find the Weibo video URL on weibo.com or weibo.cn.",
              "Paste the URL into the input field on this page.",
              "Click the 'Process' button to fetch video details.",
              "Select your preferred video quality if options are available.",
              "Click 'Download Now' to save the Weibo video."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <WeiboSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <WeiboFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Weibo Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download videos from Weibo (weibo.com / weibo.cn) for free. Save your favorite videos from the popular Chinese microblogging site.",
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
function WeiboFAQSection() {
  const faqs = [
    { 
      question: "Is it Legal to Download Videos from Weibo?", 
      answer: "The legality of downloading videos is nuanced. Weibo's terms of service assert exclusive rights over the content hosted on its platform, primarily to prevent large-scale scraping and re-hosting by competitors. However, downloading a video for personal, non-commercial use—such as offline viewing or as part of a private collection—is generally considered fair use in many jurisdictions." 
    },
    { 
      question: "Is it Safe to Use a Weibo Video Downloader?", 
      answer: "Safety depends entirely on the method chosen. Installing unknown desktop software or browser extensions carries inherent risks, as these programs can contain malware or spyware. Concerns over data security and monitoring on social platforms are valid, making third-party software installation a significant consideration." 
    },
    { 
      question: "How Can I Download Weibo Videos Without a Watermark?", 
      answer: "The presence of a watermark on a downloaded video is typically determined by the original uploader's settings within Weibo, not by the downloader tool. If the creator chose to have Weibo embed a watermark into the video file, any downloader will save the video with that watermark. It cannot be 'removed' because it is part of the video stream itself." 
    },
    { 
      question: "Can I Download Videos in High Quality (HD, 1080p, 2K)?", 
      answer: "Yes. FSMVID is designed to provide users with a choice of available resolutions. When a video is uploaded to Weibo in high definition (HD), the tool will detect and offer those quality options for download." 
    },
    { 
      question: "Can I Download Private or Geo-Restricted Weibo Videos?", 
      answer: "No external downloader tool can access content that is not publicly available. If a Weibo video is set to private, is part of a members-only group, or is geographically restricted to certain regions, it cannot be downloaded." 
    }
  ];

  return <FAQSection faqs={faqs} />;
}
