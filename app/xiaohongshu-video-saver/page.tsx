import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const XiaohongshuSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.XiaohongshuSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Xiaohongshu Downloader | Save Little Red Book Content (小红书)",
  description: "Download videos and images from Xiaohongshu (Little Red Book / 小红书) for free. Save your favorite lifestyle and fashion content.",
  openGraph: {
    title: "Xiaohongshu Downloader | Save Little Red Book Content (小红书)",
    description: "Download videos and images from Xiaohongshu (Little Red Book / 小红书) for free. Save your favorite lifestyle and fashion content.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/xiaohongshu-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Xiaohongshu Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/xiaohongshu-video-saver'),
  }
}

export default function XiaohongshuPage() {
  const platform = "xiaohongshu";
  return (
    <>
      <ToolsHero
        title="Xiaohongshu Downloader"
        subtitle="Download videos and images from Xiaohongshu (Little Red Book / 小红书) for free."
        platform="xiaohongshu"
      >
        <PlatformDownloader platform="xiaohongshu" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="xiaohongshu"
            title="How to Download Xiaohongshu Media?"
            steps={[
              "Find the Xiaohongshu post URL (e.g., from xiaohongshu.com).",
              "Paste the URL into the input field on this page.",
              "Click the 'Process' button to fetch the media.",
              "Select your preferred format if options are available.",
              "Click 'Download Now' to save the Xiaohongshu content."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <XiaohongshuSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <XiaohongshuFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Xiaohongshu Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download videos and images from Xiaohongshu (Little Red Book / 小红书) for free. Save your favorite lifestyle and fashion content.",
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
function XiaohongshuFAQSection() {
  const faqs = [
    { 
      question: "Can I download Xiaohongshu videos in HD?", 
      answer: "Yes, the FSMVID downloader is designed to retrieve the highest quality version of the video available from Xiaohongshu's servers. This often includes high-definition (HD) options such as 720p or 1080p, ensuring the downloaded content is clear and detailed." 
    },
    { 
      question: "Does the FSMVID downloader work on iPhone and Android?", 
      answer: "Absolutely. Because FSMVID is a web-based tool, it operates directly within a browser. This means it is universally compatible with any modern device, including iPhones, iPads, Android phones and tablets, as well as Windows and Mac computers. No app installation is necessary." 
    },
    { 
      question: "Will the downloaded Xiaohongshu video have a watermark?", 
      answer: "No. One of the core features of the FSMVID Xiaohongshu Video Downloader is that it provides clean, watermark-free downloads. The tool processes the video to remove any platform-specific branding, delivering the content in its original state." 
    },
    { 
      question: "Is the FSMVID Xiaohongshu Video Downloader completely free?", 
      answer: "Yes, the tool is 100% free to use. There are no hidden costs, subscription fees, or limits on the number of videos that can be downloaded." 
    },
    { 
      question: "Do I need to create an account to download videos?", 
      answer: "No account registration or login is required to use the FSMVID downloader. The process is designed to be anonymous and immediate. Users can simply paste the video link and download instantly, ensuring maximum privacy and convenience." 
    }
  ];

  return <FAQSection faqs={faqs} />;
}
