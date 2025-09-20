import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";
// Lazy load non-critical components
const ImdbSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.ImdbSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "IMDb Video Downloader | Save Movie Trailers & Clips",
  description: "Easily download trailers, scenes & bonus content using our IMDb Video Downloader. Save your favorite IMDb videos in HD for offline viewing—100% free.",
  openGraph: {
    title: "IMDb Video Downloader | Save Movie Trailers & Clips",
    description: "Easily download trailers, scenes & bonus content using our IMDb Video Downloader. Save your favorite IMDb videos in HD for offline viewing—100% free.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/imdb-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IMDb Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/imdb-video-saver'),
  }
}

export default function ImdbPage() {
  const platform = "imdb";
  return (
    <>
      <ToolsHero
        title="IMDb Video Downloader"
        subtitle="Download movie trailers, clips, and behind-the-scenes videos from IMDb.com for free."
      >

        <PlatformDownloader platform="imdb" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="imdb"
            title="How to Download IMDb Videos?"
            steps={[
              "Find the IMDb video URL on imdb.com.",
              "Paste the URL into the input field on this page.",
              "Click the 'Process' button to fetch video details.",
              "Select your preferred video quality if options are available.",
              "Click 'Download Now' to save the IMDb video."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <ImdbSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <ImdbFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "IMDb Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Easily download trailers, scenes & bonus content using our IMDb Video Downloader. Save your favorite IMDb videos in HD for offline viewing—100% free.",
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
function ImdbFAQSection() {
  return (
    <FAQSection
      faqs={[
        { question: "Is the Fsmvid IMDb video downloader completely safe to use?", answer: "We prioritize user security and have implemented robust safety measures throughout our platform. Our downloader uses secure HTTPS protocols to protect your data during the download process. We never require personal information, account registration, or software installation that could compromise your device's security." },
        { question: "Can I download IMDb videos in different quality options?", answer: "Yes, we offer comprehensive quality options to match your specific needs and device capabilities. You can choose from standard definition (SD) for smaller file sizes, high definition (HD) options including 720p and 1080p for superior viewing quality, and even 4K or 8K resolution when available from the source." },
        { question: "Are there any limitations on the number of videos I can download?", answer: "We believe in providing unrestricted access to IMDb content for our users. There are no arbitrary limits on the number of videos you can download using our tool. Whether you want to save a single movie trailer or build an extensive collection of IMDb content, you're free to download as much as your device storage allows. We only ask that users respect copyright laws and use downloaded content responsibly." },
        { question: "How long does the download process typically take?", answer: "Download speeds depend on several factors, including your internet connection speed, the video's file size, and the current server load. Generally, standard movie trailers (2-3 minutes) download within 30-60 seconds on average broadband connections. Longer videos or higher quality downloads may take additional time, but our optimized servers ensure efficient processing." },
        { question: "Can I use this downloader on mobile devices?", answer: "Our IMDb video downloader is fully optimized for mobile devices, including smartphones and tablets. Whether you're using an iPhone, Android device, or tablet, you can access our tool through your mobile browser and download videos directly to your device." },
        { question: "What should I do if a download fails or doesn't work?", answer: "If you encounter download issues, try these troubleshooting steps: First, verify that you've copied the complete and correct IMDb video URL. Ensure your internet connection is stable throughout the download process. Clear your browser's cache and cookies, then attempt the download again. If problems persist, try using a different browser or switching to an incognito/private browsing mode." },
        { question: "Is it legal to download videos from IMDb?", answer: "This is an important consideration for all users. The legality of downloading videos depends on various factors, including your location, the specific content, and how you intend to use the downloaded material. We strongly encourage users to respect copyright laws and intellectual property rights. Our tool should be used responsibly and by applicable laws in your jurisdiction." }
      ]}
    />
  );
}
