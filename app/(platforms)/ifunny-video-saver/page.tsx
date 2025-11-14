import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/download/platform-downloader"
import { getCanonicalUrl } from "@/lib/seo/seo-utils"
import { FAQSection } from "@/components/ui/faq-section"

import ToolsHero from "@/components/content/Tools-hero";
import PlatformFeatures from "@/components/platform/platform-features";
import PlatformHowTo from "@/components/platform/platform-how-to";

// Lazy load non-critical components
const IfunnySEOContent = lazy(() => import("@/components/seo/seo-content").then(mod => ({ default: mod.IfunnySEOContent })))
const RelatedTools = lazy(() => import("@/components/platform/related-tools"))

// Loading fallbacks
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg mb-8"></div>
const FAQLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg mb-16"></div>

export const metadata: Metadata = {
  title: "iFunny Video Downloader Online | Save iFunny Content",
  description: "Free iFunny Video Downloader Online grabs iFunny videos, GIFs, memes in seconds—HD, no watermark. Best iFunny GIF downloader & meme saver for mobile & desktop.",
  openGraph: {
    title: "iFunny Video Downloader Online | Save iFunny Content",
    description: "Free iFunny Video Downloader Online grabs iFunny videos, GIFs, memes in seconds—HD, no watermark. Best iFunny GIF downloader & meme saver for mobile & desktop.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/ifunny-video-saver`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "iFunny Video Downloader Online",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl('/ifunny-video-saver'),
  }
}

export default function IfunnyPage() {
  const platform = "ifunny";
  return (
    <>
      <ToolsHero
        title="iFunny Video Downloader Online"
        subtitle="Download videos, GIFs, and memes from iFunny.co for free."
        platform="ifunny"
      >

        <PlatformDownloader platform="ifunny" />
      </ToolsHero>
      <div className="container mx-auto px-4">
        <Suspense fallback={<ContentLoading />}>
          <PlatformHowTo
            platform="ifunny"
            title="How to Download iFunny Videos & Memes?"
            steps={[
              "Find the iFunny content URL (e.g., from ifunny.co).",
              "Paste the URL into the input field on this page.",
              "Click the 'Process' button to fetch the content.",
              "Select your preferred format if options are available.",
              "Click 'Download Now' to save the iFunny content."
            ]}
          />
        </Suspense>
        <Suspense>
          <PlatformFeatures />
        </Suspense>


        
        {/* SEO Content Section */}
        <Suspense fallback={<ContentLoading />}>
          <IfunnySEOContent />
        </Suspense>

        

        <Suspense fallback={<FAQLoading />}>
          <IfunnyFAQSection />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "iFunny Video Downloader Online",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
              },
              description:
                "Free iFunny Video Downloader Online grabs iFunny videos, GIFs, memes in seconds—HD, no watermark. Best iFunny GIF downloader & meme saver for mobile & desktop.",
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
function IfunnyFAQSection() {
  return (
    <FAQSection
      faqs={[
        { question: "Is the iFunny Video Downloader Online Free to Use?", answer: "Our iFunny video downloader online is completely free with no hidden fees, subscriptions, or premium tiers. We believe everyone deserves access to their favorite funny content without financial barriers." },
        { question: "What Devices Can I Use to Download iFunny Content?", answer: "Our tool works on virtually every device with internet access. This includes Windows computers, Mac computers, Android smartphones and tablets, iPhones, iPads, and even Linux systems. All you need is a web browser." },
        { question: "Are There Any Download Limits?", answer: "We don't impose strict download limits because we understand that funny content is meant to be enjoyed and shared. However, we ask that you use our service responsibly and respect the original content creators' rights." },
        { question: "What Video Formats Can I Download?", answer: "Our iFunny downloader online supports multiple formats, including MP4 (most common for videos), JPEG, and PNG for images, and GIF for animated content. We also offer different quality options ranging from standard to HD resolution." },
        { question: "How Fast Are the Downloads?", answer: "Download speed depends on your internet connection and the file size, but our servers are optimized for quick processing. Most iFunny videos download within 30 seconds, while images and GIFs are typically ready in under 10 seconds." },
        { question: "Can I Download Private iFunny Content?", answer: "Our tool can only download publicly available content from iFunny. If a post is private or restricted, you won't be able to download it – this protects users' privacy and respects iFunny's security measures." },
        { question: "Is It Safe to Use Your iFunny Video Downloader?", answer: "Yes, our service prioritizes your safety and privacy. We don't store your downloaded files on our servers, don't track your activity, and don't require personal information. The downloads happen directly between you and iFunny's servers." },
        { question: "Can I Use This Tool on Mobile Browsers?", answer: "Definitely! Our iFunny video downloader online is fully optimized for mobile browsers. Whether you're using Chrome, Safari, Firefox, or any other mobile browser, you'll have the same smooth experience as desktop users." },
        { question: "What Should I Do If a Download Fails?", answer: "If you encounter download issues, first check that the iFunny URL is correct and the content is still available. Sometimes posts get deleted or made private after you copy the link. If problems persist, try refreshing our page and attempting the download again." },
        { question: "Can I download iFunny Stories or Temporary Content?", answer: "Our tool works with permanent iFunny posts. Temporary content like stories might not be downloadable, depending on how iFunny structures these features." }
      ]}
    />
  );
}
