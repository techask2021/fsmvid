import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const EspnSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.EspnSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "ESPN Video Downloader Online | Save Sports Highlights",
  description: "Download sports highlights, game replays, and interviews using our ESPN Video Downloader Online for free. Easily save your favorite ESPN moments directly to your device and enjoy them anytime, anywhere.",
  openGraph: {
    title: "ESPN Video Downloader Online | Save Sports Highlights",
    description: "Download sports highlights, game replays, and interviews using our ESPN Video Downloader Online for free. Easily save your favorite ESPN moments directly to your device and enjoy them anytime, anywhere.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/espn-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ESPN Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/espn-video-saver'),
  }
}

export default function EspnPage() {
  const platform = "espn";
  return (
    <>
      <ToolsHero
        title="ESPN Video Downloader Online"
        subtitle="Download sports highlights, game replays, and interviews from ESPN for free."
        platform="espn"
      >


        <PlatformDownloader platform="espn" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="espn"
            title="How to Download ESPN Videos?"
            steps={[
              "Find the ESPN video URL on espn.com or es.pn.",
              "Paste the URL into the input field above.",
              "Click the 'Process' button to fetch video details.",
              "Select your preferred video quality.",
              "Click 'Download Now' to save the ESPN video."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <EspnSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <EspnFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ESPN Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download sports highlights, game replays, and interviews using our ESPN Video Downloader Online for free. Easily save your favorite ESPN moments directly to your device and enjoy them anytime, anywhere.",
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
function EspnFAQSection() {
  return (
    <FAQSection
      faqs={[
        { question: "Is the ESPN video downloader online completely free?", answer: "Yes, fsmvid's ESPN video downloader online is 100% free. You can download ESPN videos as you'd like without paying a single penny. We don't have hidden fees, premium tiers, or subscription requirements." },
        { question: "What video formats can I download ESPN videos in?", answer: "Our ESPN video downloader online supports all major formats, including MP4, AVI, MOV, and MKV. MP4 is recommended for best compatibility across all devices." },
        { question: "Can I download ESPN+ exclusive content?", answer: "Yes, our tool works with both regular ESPN content and ESPN+ exclusive videos. Our ESPN Plus downloader supports a range of video formats and resolutions, including 1080p and 720p." },
        { question: "How long do downloaded ESPN videos last?", answer: "Forever! Unlike ESPN's official download feature, which expires after 30 days, videos downloaded through our tool are yours permanently. ESPN's official downloads remain on your device only as long as you are an active ESPN+ subscriber and connect to the internet with your device at least once every 30 days, but our downloads have no such restrictions." },
        { question: "Is it safe to use online video downloaders?", answer: "Our ESPN video downloader online is completely safe. We don't require software installation, don't store your data, and scan all downloads for security issues before delivery." },
        { question: "Can I download full ESPN games?", answer: "Yes, if the full game is available on ESPN's platform, our downloader can save it. Keep in mind that full games result in larger file sizes, so ensure you have adequate storage and internet bandwidth." },
        { question: "What's the maximum video length I can download?", answer: "There's no artificial limit on video length with our ESPN video downloader online. Whether it's a 30-second highlight or a 3-hour game broadcast, we can handle it." },
        { question: "Do downloaded videos include watermarks?", answer: "You can download ESPN videos without watermarks and save videos directly from the ESPN server using our tool. The downloaded videos are identical to what you see on ESPN's platform." },
        { question: "Can I use this tool on my smartphone?", answer: "Absolutely! Our ESPN video downloader online is fully responsive and works perfectly on mobile devices. Download directly to your phone's storage for offline viewing." },
        { question: "What if the video URL doesn't work?", answer: "Ensure you're using the direct ESPN video URL, not a shortened link or redirect. If problems persist, try refreshing the ESPN page and copying the URL again." },
        { question: "Are there any download limits?", answer: "We don't impose artificial download limits. You can use our ESPN video downloader online as frequently as needed to build your sports video collection." },
        { question: "Can I share downloaded ESPN videos?", answer: "Downloaded videos are for personal use. While you can share them privately with friends and family, avoid public distribution or commercial use." }
      ]}
    />
  );
}
