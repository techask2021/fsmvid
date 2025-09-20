import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const TelegramSEOContent = lazy(() => import("@/components/seo-content/index").then(mod => ({ default: mod.TelegramSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

// Force static page generation
export const dynamic = 'force-static'
export const revalidate = 86400 // 24 hours

export const metadata: Metadata = {
  title: "Telegram Video Downloader | Download Telegram Videos & Photos",
  description:
    "Telegram Video Downloader online tool to download Telegram videos, photos, and files in high quality for free. Save Telegram content easily with our Telegram video downloader tool.",
  openGraph: {
    title: "Telegram Media Downloader | Download Telegram Videos & GIFs",
    description:
      "Telegram Media Downloader online tool to download Telegram videos, photos, and files in high quality for free. Save Telegram content easily with our Telegram media downloader tool.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/telegram-media-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Telegram Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/telegram-media-saver'),
  }
}

export default function TelegramPage() {
  const platform = "telegram";
  
  return (
    <>
      <ToolsHero
        title="Telegram Video Downloader"
        subtitle="Download Telegram videos, photos, and files in high quality for free."
      >
        <PlatformDownloader platform="telegram" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="telegram"
            title="How to Download Telegram Videos?"
            steps={[
              "Visit Telegram and find the message containing the content you want to download.",
              "Copy the post URL from the address bar or share button.",
              "Paste the URL into our Telegram media saver above and click Download.",
              "Choose your preferred quality and download your Telegram content.",
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>




        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <TelegramSEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <TelegramFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Telegram Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Telegram Video Downloader online tool to download Telegram videos, photos, and files in high quality for free. Save Telegram content easily with our Telegram video downloader tool.",
            }),
          }}
        />

        {/* Related Tools Section */}
        <Suspense fallback={<ContentLoading />}>
          <RelatedTools currentPlatform={platform} />
        </Suspense>
      </div>
    </>
  );
}

// Extract FAQ section to its own component for better code splitting
function TelegramFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "What Telegram content can I download?",
          answer:
            "Our Telegram media saver supports videos, photos, documents, audio files, and animations (GIFs) from public channels and groups.",
        },
        {
          question: "Can I download content from private Telegram channels?",
          answer:
            "No, our tool can only download content from public Telegram channels and groups. Private content requires membership and cannot be accessed via public links.",
        },
        {
          question: "How do I get a Telegram link to download content?",
          answer:
            "In the Telegram app or web version, click on the message containing the media, then click 'Share' and select 'Copy Link'. This works for messages in public channels and groups.",
        },
        {
          question: "Can I download Telegram voice messages?",
          answer:
            "Yes, our Telegram media saver can download voice messages as audio files from public channels and groups.",
        },
      ]}
    />
  );
}
