import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/download/platform-downloader"
import { type Platform } from "@/lib/download/platform-detector"
import { getCanonicalUrl } from "@/lib/seo/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"
import ToolsHero from "@/components/content/Tools-hero";
import PlatformFeatures from "@/components/platform/platform-features";
import PlatformHowTo from "@/components/platform/platform-how-to";


// Define a non-nullable platform type specifically for the Tumblr platform
type TumblrPlatform = "tumblr";

// Lazy load non-critical components
const TumblrSEOContent = lazy(() => import("@/components/seo/seo-content").then(mod => ({ default: mod.TumblrSEOContent })))
const RelatedTools = lazy(() => import("@/components/platform/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

// Static generation for Cloudflare Pages compatibility
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Tumblr Video Downloader | Download Tumblr Videos & GIFs",
  description:
    "Tumblr Video Downloader tool to download Tumblr videos, GIFs, and photos in high quality for free. Save Tumblr content easily with our Tumblr video downloader tool.",
  openGraph: {
    title: "Tumblr Video Downloader | Download Tumblr Videos & GIFs",
    description:
      "Tumblr Video Downloader tool to download Tumblr videos, GIFs, and photos in high quality for free. Save Tumblr content easily with our Tumblr video downloader tool.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/tumblr-content-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tumblr Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/tumblr-content-saver'),
  }
}

// This page doesn't have dynamic parameters, but adding this function 
// explicitly tells Next.js to statically generate this page at build time
export function generateStaticParams() {
  return [];
}

// Create wrapper components for each section to enable better streaming

function HeroSection({ platform }: { platform: TumblrPlatform }) {
  return (
    <ToolsHero
      title="Tumblr Video Downloader"
      subtitle="Download Tumblr videos, GIFs, and photos in high quality for free."
    >
      <PlatformDownloader platform={platform} />
    </ToolsHero>
  );
}

function InfoSection({ platform }: { platform: TumblrPlatform }) {
  return (
    <Suspense fallback={<ContentLoading />}>
      <PlatformHowTo
        platform={platform}
        title="How to Download Tumblr Content?"
        steps={[
          "Visit Tumblr and find the post containing the content you want to download.",
          "Copy the post URL from the address bar or share button.",
          "Paste the URL into our Tumblr content saver above and click Download.",
          "Choose your preferred quality and download your Tumblr content.",
        ]}
      />
    </Suspense>
  );
}







function SEOSection() {
  return (
    <Suspense fallback={<ContentLoading />}>
      <TumblrSEOContent />
    </Suspense>
  );
}



function FAQComponent() {
  return (
    <Suspense fallback={<FAQLoading />}>
      <TumblrFAQSection />
    </Suspense>
  );
}

function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Tumblr Video Downloader",
          applicationCategory: "UtilityApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
          },
          description:
            "Tumblr Video Downloader tool to download Tumblr videos, GIFs, and photos in high quality for free. Save Tumblr content easily with our Tumblr video downloader tool.",
        }),
      }}
    />
  );
}

function RelatedToolsSection({ platform }: { platform: TumblrPlatform }) {
  return (
    <Suspense fallback={<ContentLoading />}>
      <RelatedTools currentPlatform={platform} />
    </Suspense>
  );
}

export default function TumblrPage() {
  const platform: TumblrPlatform = "tumblr";
  return (
    <>
      <HeroSection platform={platform} />

      <div className="container mx-auto px-4">
        <InfoSection platform={platform} />
        <Suspense>
          <PlatformFeatures />
        </Suspense>
        <SEOSection />
        <FAQComponent />
        <StructuredData />
        <RelatedToolsSection platform={platform} />
      </div>
    </>
  )
}

// Extract FAQ section to its own component for better code splitting
function TumblrFAQSection() {
  return (
    <FAQSection
      faqs={[
        {
          question: "What Tumblr content can I download?",
          answer: "Our Tumblr content saver supports photos, videos, GIFs, and audio posts from public Tumblr blogs.",
        },
        {
          question: "Can I download content from private Tumblr blogs?",
          answer:
            "No, our tool can only download content from public Tumblr blogs. Private blogs require login credentials and cannot be accessed via public links.",
        },
        {
          question: "Can I download multiple photos from a single Tumblr post?",
          answer:
            "Yes, our Tumblr content saver can download all photos from a photoset post. Each photo will be available as a separate download.",
        },
        {
          question: "How do I download Tumblr GIFs?",
          answer:
            "The process is the same as downloading other content. Copy the post URL, paste it into our Tumblr content saver, and download the GIF in MP4 format for better quality and smaller file size.",
        },
      ]}
    />
  );
}
