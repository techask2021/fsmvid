import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";
// Lazy load non-critical components
const KuaishouSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.KuaishouSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Kuaishou Video Downloader | Save Kuaishou Videos",
  description: "Download videos from Kuaishou for free. Save your favorite short videos for offline viewing and sharing.",
  openGraph: {
    title: "Kuaishou Video Downloader | Save Kuaishou Videos",
    description: "Download videos from Kuaishou for free. Save your favorite short videos for offline viewing and sharing.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/kuaishou-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kuaishou Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/kuaishou-video-saver'),
  }
}

export default function KuaishouPage() {
  const platform = "kuaishou";
  return (
    <>
      <ToolsHero
        title="Kuaishou Video Downloader"
        subtitle="Download videos from Kuaishou for free."
      >
        <PlatformDownloader platform="kuaishou" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="kuaishou"
            title="How to Download Kuaishou Media?"
            steps={[
              "Find the Kuaishou video URL.",
              "Paste the URL into the input field on this page.",
              "Click the 'Process' button to fetch video details.",
              "Select your preferred video quality.",
              "Click 'Download Now' to save the Kuaishou video."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <KuaishouSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <KuaishouFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Kuaishou Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Download videos from Kuaishou for free. Save your favorite short videos for offline viewing and sharing.",
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
function KuaishouFAQSection() {
  return (
    <FAQSection
      faqs={[
        { question: "Is it legal to download Kuaishou videos?", answer: "The legality of downloading videos depends on several factors, including copyright laws in your region and the specific terms of use. Generally, downloading videos for personal use falls into a legal gray area, but users should be mindful of copyright laws and terms of use. We always recommend respecting content creators' rights and using downloaded content responsibly." },
        { question: "What devices are compatible with our downloader?", answer: "Our tool works on all major platforms, including mobile devices (Android, iOS) and desktop computers (Windows, macOS), accessible through any browser. Whether you're using Chrome, Firefox, Safari, or Edge, our downloader provides a consistent experience across all platforms." },
        { question: "Can I download videos in 4K quality?", answer: "While Kuaishou supports various quality levels, you can select video quality ranging from 144p up to 1080p Full HD. The available quality options depend on how the original video was uploaded to the platform. Our system automatically detects and offers the highest quality available for each video." },
        { question: "Do I need to create an account or register?", answer: "No login is required – you won't need to worry about personal information leaking. We've designed our service to be completely anonymous and user-friendly. Simply visit our site, paste your link, and start downloading immediately." },
        { question: "How many videos can I download?", answer: "There are no daily limits or download restrictions. You can download as many videos as you want, whenever you want. Our free service is designed to support heavy users who want to build extensive video collections." },
        { question: "Is my download history stored or tracked?", answer: "We respect your privacy and our downloader does not store or track your download history, keeping your data safe. Your downloading activity remains completely private, and we don't collect any personal information about your usage patterns." }
      ]}
    />
  );
}
