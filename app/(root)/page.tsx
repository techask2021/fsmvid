import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/download/platform-downloader"
import HeroSectionStyles from "@/components/content/hero-section-styles";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Zap, Sparkles, Star, Download, Play, ArrowRight, Settings, Globe, Clock, Award, Calendar, User, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils/utils"
import { getFeaturedPosts, urlFor } from "@/lib/blog/blog-client"
import AdSenseBanner from "@/components/ads/adsense-banner"
import { BlogCard } from "@/components/shared/blog-card"

const PlatformGrid = lazy(() => import("@/components/platform/platform-grid"))
const HowToUse = lazy(() => import("@/components/content/how-to-use"))
const FAQ = lazy(() => import("@/components/content/faq"))
const HomeSEOContent = lazy(() => import("@/components/seo/seo-content/home").then(mod => ({ default: mod.HomeSEOContent })))

const GridLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg"></div>
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg"></div>

export const metadata: Metadata = {
  title: "FSMVID | Free Social Media Video Downloader",
  description:
    "Free Social Media Video Downloader, The best online video downloader and converter tool. Download videos from YouTube, TikTok, Facebook, Instagram, Twitter, and 30+ social media platforms. Fast video download website with multiple formats (MP4, MKV, WebM, MP3), and built-in video converter. No software installation, no registration required—100% free social media downloader.",
  keywords: [
    "Free Social Media Video Downloader", "video downloader", "online video downloader", "video download software", "video download utility", "video converter", "download utilities", "social media downloader", "YouTube downloader", "TikTok downloader", "Facebook downloader", "Twitter downloader", "Instagram downloader", "media downloader tool", "format converter", "video converter tool",
  ],
  openGraph: {
    title: "FSMVID | Free Social Media Video Downloader",
    description: "Free Social Media Video Downloader - The best online video downloader and converter tool. Download videos from YouTube, TikTok, Facebook, Instagram, Twitter, and 30+ social media platforms. Fast video download website with multiple formats (MP4, MKV, WebM, MP3), and built-in video converter. No software installation, no registration required—100% free social media downloader.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://fsmvid.com",
    siteName: "FSMVID",
    images: [{ url: "/images/free-social-media-video-downloader.jpg", width: 1200, height: 630, alt: "FSMVID | Free Social Media Video Downloader", },],
    locale: "en_US",
    type: "website",
  },
}

export const revalidate = 10;

const featuresForNewSection = [
  { icon: Zap, title: "Lightning Fast", description: "Download videos in seconds with our optimized processing system and global CDN network.", iconBg: "bg-blue-600/10", iconColor: "text-blue-600" },
  { icon: Shield, title: "Secure & Private", description: "Your privacy is our priority. We don't store downloads or collect personal information.", iconBg: "bg-blue-600/10", iconColor: "text-blue-600" },
  { icon: Settings, title: "Multiple Formats", description: "Choose from various formats and quality options from 144p to 4K resolution.", iconBg: "bg-blue-600/10", iconColor: "text-blue-600" },
  { icon: Globe, title: "All Platforms", description: "Support for 20+ major social media platforms in one convenient, easy-to-use tool.", iconBg: "bg-blue-600/10", iconColor: "text-blue-600" },
]

export default async function Home() {
  const hasSanityConfig = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder-project-id'

  const featuredPosts = hasSanityConfig
    ? await getFeaturedPosts(6).catch(() => [])
    : [];

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950/50">
      {/* SaaS Elite Hero Section - VIBRANT BRANDED BLUE */}
      <section className="relative min-h-[85vh] overflow-hidden flex flex-col items-center justify-center pt-32 pb-16 px-4 bg-blue-600 border-b border-white/10">
        <HeroSectionStyles />

        {/* Atmospheric Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full translate-y-1/2" />

        <div className="container relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
          <Badge className="mb-8 bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4 mr-2" />
            Free Online Downloader
          </Badge>

          <div className="flex flex-col items-center justify-center mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic leading-[0.85] mb-8 uppercase text-white">
              Free Social Media <br />
              <span className="text-blue-100 underline decoration-white/20 underline-offset-8">Video Downloader</span>
            </h1>

            <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
              <p className="text-base md:text-lg text-white font-medium leading-relaxed drop-shadow-lg max-w-2xl mx-auto">
                You're scrolling and find that <span className="text-blue-200 font-bold">perfect video</span>—a business tutorial, YouTube marketing masterclass, or Instagram tutorial you need offline. <span className="text-blue-100/80">But the platform won't let you save it.</span> <span className="text-white font-black underline decoration-blue-400">That's why FSMVid exists.</span>
              </p>

              <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 shadow-2xl">
                <p className="text-sm md:text-base text-white/90 leading-relaxed font-medium">
                  <span className="font-black text-blue-100 underline decoration-blue-100/20 underline-offset-4">FSMVid</span> is a free online video downloader that converts <span className="text-white font-bold italic">YouTube to MP4</span>, downloads HD videos, and extracts <span className="text-white font-bold italic">MP3 audio</span> from multiple platforms—<span className="underline decoration-white/20 underline-offset-4">no software needed</span>. Whether you need a YouTube to MP3 converter for podcasts, a video converter for presentations, or downloads for digital marketing and content creation, we handle it all.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16 animate-in fade-in slide-in-from-bottom-16 duration-700 delay-300">
            {[
              { icon: CheckCircle, text: "No registration required" },
              { icon: CheckCircle, text: "100% free forever" },
              { icon: CheckCircle, text: "High quality downloads" },
              { icon: CheckCircle, text: "Multiple formats" },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/20 transition-all shadow-xl">
                <feature.icon className="w-4 h-4 text-blue-200" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="w-full max-w-4xl mb-16 animate-in fade-in zoom-in-95 duration-1000 delay-400" id="downloader">
            <div className="mb-8 p-4 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-center overflow-hidden">
              <AdSenseBanner />
            </div>
            <Card className="border-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] rounded-[3rem] overflow-hidden bg-white/10 backdrop-blur-3xl p-1 border border-white/20 shadow-2xl">
              <CardContent className="p-1">
                <PlatformDownloader platform="universal" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-4xl animate-in fade-in slide-in-from-top-4 duration-700 delay-500">
            {[
              { number: "50M+", label: "Happy Users", icon: Star, color: "text-amber-300" },
              { number: "1B+", label: "Downloads", icon: Download, color: "text-white" },
              { number: "20+", label: "Platforms", icon: Play, color: "text-emerald-300" },
              { number: "99.9%", label: "Uptime", icon: CheckCircle, color: "text-white" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4 group-hover:scale-110 transition-all duration-500 border border-white/10 shadow-xl">
                  <stat.icon className={`w-6 h-6 ${stat.color} drop-shadow-xl`} />
                </div>
                <div className="text-xl md:text-2xl font-black italic tracking-tighter mb-1 text-white">{stat.number}</div>
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-100/60 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowToUse />

      <Suspense fallback={<GridLoading />}>
        <PlatformGrid />
      </Suspense>

      <Suspense fallback={<ContentLoading />}>
        <section className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="container px-6 relative z-10 mx-auto max-w-7xl">
            <div className="text-center mb-20 space-y-4">
              <Badge className="bg-blue-600/10 text-blue-600 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
                Why Choose Us
              </Badge>
              <h2 className="text-xl md:text-3xl font-black tracking-tighter italic uppercase text-slate-900 leading-[0.9]">Why Choose Our <span className="text-blue-600">Downloader?</span></h2>
              <p className="text-sm text-slate-500 max-w-2xl mx-auto font-medium italic border-t border-slate-100 pt-6 mt-4 leading-relaxed">
                Experience the fastest and most reliable way to download content from your favorite social media platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuresForNewSection.map((feature, index) => (
                <Card key={index} className="border border-slate-100 shadow-xl shadow-slate-200/20 bg-white rounded-2xl overflow-hidden group hover:translate-y-[-5px] transition-all duration-500">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 shadow-md group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-sm font-black italic uppercase tracking-tight text-slate-900">{feature.title}</h3>
                    <p className="text-slate-500 text-[10px] font-medium leading-relaxed italic">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-none shadow-2xl shadow-slate-900/20 bg-slate-900 text-white rounded-2xl p-6 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base font-black italic uppercase tracking-tight">Bulk Download System</h3>
                  </div>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed italic border-l-4 border-blue-600 pl-4">Save entire playlists or multiple links at once using our powerful Free Social Media Video Downloader engine.</p>
                </div>
              </Card>

              <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 bg-white rounded-2xl p-6 group overflow-hidden relative">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/5 blur-[100px] rounded-full" />
                <div className="relative z-10 space-y-3 text-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shadow-xl group-hover:-rotate-6 transition-transform text-white">
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-black italic uppercase tracking-tight">Premium Quality</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed italic border-l-4 border-indigo-600 pl-4">Download videos in their original quality from 144p to 4K resolution with our Free Social Media Video Downloader.</p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </Suspense>

      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <Suspense fallback={<ContentLoading />}>
            <HomeSEOContent />
          </Suspense>
        </div>
      </section>

      {/* SaaS Elite CTA Section */}
      <section className="w-full py-24 relative overflow-hidden bg-[#050b1a] text-center border-y border-white/5">
        <HeroSectionStyles />
        <div className="absolute inset-0 bg-blue-600/10 blur-[150px] rounded-full scale-150" />

        <div className="container mx-auto px-6 relative z-10 max-w-5xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl md:text-3xl font-black tracking-tighter italic text-white uppercase leading-[0.85]">
              Ready to Download <br />
              <span className="text-blue-400 underline decoration-blue-600/20 underline-offset-8">Your Favorite Videos?</span>
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)]"></div>
          </div>

          <div className="space-y-6">
            <p className="text-base text-slate-400 font-medium max-w-xl mx-auto italic leading-relaxed">
              Our free tool makes it easy to save videos from any platform in just a few clicks.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                "No registration", "No software", "100% Free"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300 font-black uppercase text-[9px] tracking-[0.4em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,1)]" /> {text}
                </div>
              ))}
            </div>
          </div>

          <Button asChild size="lg" className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-widest shadow-[0_15px_40px_-15px_rgba(37,99,235,0.5)] active:scale-95 transition-all group">
            <Link href="#downloader" className="flex items-center gap-4">
              Download Now <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-32 bg-slate-50">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-blue-600/10 text-blue-600 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
              Knowledge Base
            </Badge>
            <h2 className="text-xl md:text-3xl font-black tracking-tighter italic uppercase text-slate-900 leading-[0.9]">Latest from <span className="text-blue-600">Free Social Media Video Downloader</span></h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto font-medium italic border-t border-slate-100 pt-6 mt-4 leading-relaxed">
              Stay updated with the latest tips, tutorials, and news about our Free Social Media Video Downloader and media trends.
            </p>
          </div>

          {featuredPosts.length === 0 ? (
            <div className="text-center py-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[4rem] bg-white shadow-inner">
              <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Scanning network for latest transmissions...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <BlogCard
                  key={post._id}
                  post={post}
                  isFirstPost={index === 0}
                  urlFor={urlFor}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild variant="outline" className="h-12 px-10 rounded-full border-2 border-slate-100 hover:border-blue-600 hover:bg-white text-slate-400 hover:text-blue-600 font-black uppercase text-[10px] tracking-widest transition-all shadow-lg group">
              <Link href="/blog" className="flex items-center gap-4">
                View All Posts <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <Suspense fallback={<ContentLoading />}>
            <FAQ />
          </Suspense>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "WebApplication", name: "FSMVID", applicationCategory: "UtilityApplication", operatingSystem: "Web",
          offers: { "@type": "Offer", },
          description: "FSMVID is a powerful and user-friendly free social media video downloader tool that allows you to download videos, images, and shorts from popular platforms including YouTube, TikTok, Facebook, Twitter, Instagram, and more. Download high-quality content from any social media platform with our fast, free online downloader tool - no registration required.",
        }),
      }} />
    </div>
  )
}
