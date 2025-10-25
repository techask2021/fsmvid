import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"
import ToolsHero from "@/components/Tools-hero";
import PlatformFeatures from "@/components/platform-features";
import PlatformHowTo from "@/components/platform-how-to";

// Lazy load non-critical components
const TruthSocialSEOContent = lazy(() => import("@/components/seo-content").then(mod => ({ default: mod.TruthSocialSEOContent })))
const RelatedTools = lazy(() => import("@/components/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "Truth Social Video Downloader | Download Truth Social Videos Free",
  description:
    "Truth Social Video Downloader tool to download videos from Truth Social in high quality. Free online Truth Social video saver for saving content easily.",
  openGraph: {
    title: "Truth Social Video Downloader | Download Truth Social Videos Free",
    description:
      "Truth Social Video Downloader tool to download videos from Truth Social in high quality. Free online Truth Social video saver for saving content easily.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/truthsocial-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Truth Social Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/truthsocial-video-saver'),
  }
}

export default function TruthSocialPage() {
  const platform = "truthsocial";
  return (
    <>
      <ToolsHero
        title="Truth Social Video Downloader"
        subtitle="Download Truth Social videos in high quality for free."
        platform="truthsocial"
      >
        <PlatformDownloader platform="truthsocial" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="truthsocial"
            title="How to Download Truth Social Videos?"
            steps={[
              "Open Truth Social and find the post with the video you want to download.",
              "Copy the post URL from your browser's address bar.",
              "Paste the URL into our Truth Social downloader above and click Download.",
              "Choose your preferred quality and download your Truth Social video.",
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <TruthSocialSEOContent />
        </Suspense>

        <Suspense fallback={<FAQLoading />}>
          <TruthSocialFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Truth Social Video Downloader",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Truth Social Video Downloader tool to download videos from Truth Social in high quality. Free online Truth Social video saver for saving content easily.",
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
function TruthSocialFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "Is it free to download Truth Social videos?",
          answer:
            "Yes! FSMVID is completely free to use. There are no hidden costs, subscription fees, or download limits.",
        },
        {
          question: "Do I need to install any software?",
          answer: "No installation needed! Our tool works directly in your web browser on any device.",
        },
        {
          question: "What video quality can I download?",
          answer:
            "Our tool downloads videos in their original quality as posted on Truth Social, ensuring you get the best possible version.",
        },
        {
          question: "Can I download private posts?",
          answer:
            "No, our tool only works with publicly accessible posts. Private or restricted content cannot be downloaded, respecting user privacy.",
        },
        {
          question: "Is it safe to use this downloader?",
          answer:
            "Absolutely! We don't store your data, URLs, or downloaded videos. Your privacy is our priority.",
        },
        {
          question: "Does it work on mobile devices?",
          answer:
            "Yes! Our Truth Social downloader is fully responsive and works perfectly on smartphones and tablets, both iOS and Android.",
        },
        {
          question: "Why is the download taking time?",
          answer:
            "Download speed depends on your internet connection and the video file size. Our tool uses advanced proxy technology to ensure reliable downloads even for larger files.",
        },
        {
          question: "Can I download multiple videos at once?",
          answer:
            "Currently, you can download one video at a time. Simply paste each URL separately for individual downloads.",
        },
      ]}
    />
  );
}
