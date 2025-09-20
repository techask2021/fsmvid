import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"
import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";
// Lazy load non-critical components
const ThreadsSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.ThreadsSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Threads Downloader | Save Threads Videos & Images",
  description: "Download videos and images from Instagram Threads (threads.net) for free. Save your favorite Threads content.",
  openGraph: {
    title: "Threads Downloader | Save Threads Videos & Images",
    description: "Download videos and images from Instagram Threads (threads.net) for free. Save your favorite Threads content.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/threads-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Threads Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/threads-video-saver'),
  }
}

export default function ThreadsPage() {
  const platform = "threads";
  return (
    <>
      <ToolsHero
        title="Threads Downloader"
        subtitle="Download videos and images from Instagram Threads (threads.net) for free."
      >
        <PlatformDownloader platform="threads" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="threads"
            title="How to Download Threads Media?"
            steps={[
              "Find the Threads post URL on threads.net.",
              "Paste the URL into the input field on this page.",
              "Click the 'Process' button to fetch the media.",
              "Select your preferred format if options are available.",
              "Click 'Download Now' to save the Threads content."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <ThreadsSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <ThreadsFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Threads Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download videos and images from Instagram Threads (threads.net) for free. Save your favorite Threads content.",
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
function ThreadsFAQSection() {
  return (
    <FAQSection
      faqs={[
        { 
          question: "Can I save media from a private Threads account?", 
          answer: "No. Reputable and ethical Threads video saver tools, including FSMVID, can only access and save content from public profiles. This is a fundamental privacy and security feature that respects the choices users make about who can see their content. If a profile is set to private, its content is not publicly accessible and therefore cannot be saved by these tools." 
        },
        { 
          question: "Will the saved videos or photos have a watermark?", 
          answer: "The FSMVID Threads Video Saver provides media files without adding any extra watermarks. You receive the video or photo exactly as it was uploaded to Threads, ensuring a clean, original-quality copy for your personal use." 
        },
        { 
          question: "Are there any limits on the number of videos I can save with FSMVID?", 
          answer: "No. The FSMVID service is completely free to use and does not impose any limits on the number of videos, photos, or voice notes you can save. There are no daily caps, hidden fees, or restrictions on usage." 
        },
        { 
          question: "Can I convert Threads videos to MP3 audio files?", 
          answer: "While some highly specialized tools offer direct video-to-MP3 conversion, the primary function of the FSMVID Threads Video Saver is to save media in its original, high-quality format (e.g., MP4 for videos, JPG for photos). However, our tool fully supports the direct download of Threads voice notes, saving them as audio files for you to listen to anytime." 
        },
        { 
          question: "What is the best quality I can save from Threads?", 
          answer: "FSMVID is designed to fetch and provide the highest quality media directly from the Threads servers. This often includes Full HD (1080p) for videos and can even support 4K resolution if the original uploaded file was of that quality. Our goal is to ensure you can save the content with zero loss in quality." 
        }
      ]}
    />
  );
}
