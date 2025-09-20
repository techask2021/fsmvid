import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const FebspotSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.FebspotSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Febspot Video Downloader | Save Febspot Videos",
  description: "Use our free Febspot Video Downloader to easily save your favorite Febspot videos for offline viewing—fast, secure, and 100% free to use.",
  openGraph: {
    title: "Febspot Video Downloader | Save Febspot Videos",
    description: "Use our free Febspot Video Downloader to easily save your favorite Febspot videos for offline viewing—fast, secure, and 100% free to use.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/febspot-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Febspot Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/febspot-video-saver'),
  }
}

export default function FebspotPage() {
  const platform = "febspot";
  return (
    <>
      <ToolsHero
        title="Febspot Video Downloader"
        subtitle="Download videos from Febspot for free."
        platform="febspot"
      >

        <PlatformDownloader platform="febspot" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="febspot"
            title="How to Download Febspot Videos?"
            steps={[
              "Copy the Febspot video URL from febspot.com.",
              "Paste the URL into the input field on this page.",
              "Click the 'Process' button to analyze the video.",
              "Choose your desired video quality and format.",
              "Click 'Download Now' to save the Febspot video to your device."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <FebspotSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <FebspotFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Febspot Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Use our free Febspot Video Downloader to easily save your favorite Febspot videos for offline viewing—fast, secure, and 100% free to use.",
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
function FebspotFAQSection() {
  return (
    <FAQSection
      faqs={[
        { question: "Is the Febspot Video Downloader Free?", answer: "Yes, using our service never entails paying any costs. We provide this tool completely free of charge because we believe everyone should have access to their favorite content offline. There are no hidden fees, premium tiers, or subscription requirements." },
        { question: "What File Formats Can I Download?", answer: "Our Febspot video downloader supports all popular video and audio formats. The most commonly used formats include MP4 for videos (which works on virtually all devices), MP3 for audio-only downloads, and various other formats depending on your specific needs." },
        { question: "Are There Any Download Limits?", answer: "No! We don't impose any artificial limits on the number of videos you can download. Whether you want to download one video or build an entire offline library, our service accommodates your needs without restrictions." },
        { question: "How Fast Are the Downloads?", answer: "Download speeds depend on several factors, including your internet connection, the video's file size, and server load. However, most users experience fast download times, with standard definition videos downloading within 1-2 minutes and HD content typically completing within 3-5 minutes." },
        { question: "Is It Safe to Use?", answer: "Our service has no ads or pop-ups, providing a clean, uninterrupted downloading experience, which also means it's safe to use. We've implemented comprehensive security measures to protect your device and data throughout the download process." },
        { question: "Can I Use This on Mobile Devices?", answer: "Yes! Our Febspot video downloader is fully optimized for mobile devices. Whether you're using an Android phone, an iPhone, or a tablet, you'll experience the same smooth functionality as desktop users." },
        { question: "What If a Download Fails?", answer: "If you encounter any issues during download, try these troubleshooting steps: Check your internet connection: Ensure you have a stable connection. Verify the video URL: Make sure the link is correct and the video is still available. Clear your browser cache: This resolves many temporary issues. Try a different browser: Sometimes, browser-specific issues can occur. Update your browser: Older browser versions may have compatibility issues." },
        { question: "Can I Download Private or Restricted Videos?", answer: "Our downloader can only access publicly available content. We respect content creators' privacy settings and platform policies, so private or restricted videos cannot be downloaded through our service." },
        { question: "Do Downloaded Videos Have Watermarks?", answer: "No, we don't add any watermarks to your downloaded videos. The content you download will be exactly as it appears on the original platform, without any additional branding or modifications from our service." },
        { question: "How Long Do Downloads Take?", answer: "Download times vary based on video length, quality, and your internet speed. Here's a general timeline: Short videos (under 5 minutes): 30 seconds to 2 minutes. Medium videos (5-20 minutes): 2-5 minutes. Long videos (20+ minutes): 5-15 minutes. HD content: Generally takes 20-50% longer than standard definition." }
      ]}
    />
  );
}
