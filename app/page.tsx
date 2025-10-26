import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import PlatformDownloader from "@/components/platform-downloader"
import HeroSectionStyles from "@/components/hero-section-styles"; 
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card" 
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Zap, Sparkles, Star, Download, Play, ArrowRight, Settings, Globe, Clock, Award, Calendar, User, TrendingUp } from "lucide-react" 
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { getFeaturedPosts, urlFor } from "@/lib/blog-client"
import AdSenseBanner from "@/components/adsense-banner"

const PlatformGrid = lazy(() => import("@/components/platform-grid"))
const HowToUse = lazy(() => import("@/components/how-to-use"))
const FAQ = lazy(() => import("@/components/faq"))
const HomeSEOContent = lazy(() => import("@/components/seo-content/home").then(mod => ({ default: mod.HomeSEOContent })))

const GridLoading = () => <div className="h-80 w-full bg-muted/30 animate-pulse rounded-lg"></div>
const ContentLoading = () => <div className="h-40 w-full bg-muted/30 animate-pulse rounded-lg"></div>

export const metadata: Metadata = {
  title: "FSMVID | Free Social Media Video Downloader",
  description:
    "Free online video downloader and converter tool that works. Download videos from 30+ platforms including YouTube, TikTok, Facebook, Instagram, Twitter with no software installation. Web-based video download utility with 4K quality, multiple formats (MP4, MKV, WebM, MP3), and built-in format conversion. No registration required—completely free video download software.",
  keywords: [
    "Free Social Media Video Downloader", "video downloader", "online video downloader", "video download software", "video download utility", "video converter", "download utilities", "social media downloader", "YouTube downloader", "TikTok downloader", "Facebook downloader", "Twitter downloader", "Instagram downloader", "media downloader tool", "format converter", "video converter tool",
  ],
  openGraph: {
    title: "FSMVID | Free Social Media Video Downloader",
    description: "Free online video downloader and converter that supports 30+ platforms. No software installation, no registration—just a straightforward web-based video download utility. Download in 4K, 1080p, 720p with built-in format conversion to MP4, MKV, WebM, and MP3.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://fsmvid.com",
    siteName: "FSMVID",
    images: [ { url: "/images/free-social-media-video-downloader.jpg", width: 1200, height: 630, alt: "FSMVID | Free Social Media Video Downloader", }, ],
    locale: "en_US",
    type: "website",
  },
}

const featuresForNewSection = [
  { icon: Zap, title: "Lightning Fast", description: "Download videos in seconds with our optimized processing system and global CDN network.", iconBg: "bg-gradient-to-br from-yellow-500 to-orange-500", hoverBg: "hover:bg-gradient-to-br hover:from-yellow-50 hover:to-orange-50", },
  { icon: Shield, title: "Secure & Private", description: "Your privacy is our priority. We don't store downloads or collect personal information.", iconBg: "bg-gradient-to-br from-green-500 to-emerald-500", hoverBg: "hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50", },
  { icon: Settings, title: "Multiple Formats", description: "Choose from various formats and quality options from 144p to 4K resolution.", iconBg: "bg-gradient-to-br from-purple-500 to-violet-500", hoverBg: "hover:bg-gradient-to-br hover:from-purple-50 hover:to-violet-50", },
  { icon: Globe, title: "All Platforms", description: "Support for 20+ major social media platforms in one convenient, easy-to-use tool.", iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500", hoverBg: "hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50", },
]

export default async function Home() {
  // Check if Sanity is properly configured before fetching posts
  const hasSanityConfig = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && 
                         process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder-project-id'
  
  const featuredPosts = hasSanityConfig 
    ? await getFeaturedPosts(5).catch(() => []) 
    : []; // Fetch 5 posts or empty array if Sanity not configured
  
  return (
    <div>
      {/* New Hero Section */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        <HeroSectionStyles /> 
        <div className="container relative z-10 flex flex-col items-center justify-center min-h-[60vh] text-center px-6 py-8">
          <Badge variant="secondary" className="mb-4 bg-white/20 backdrop-blur-md text-white border-white/30 shadow-lg px-6 py-3 text-sm font-semibold hover:bg-white/30 transition-all duration-300 animate-fade-in">
            <Sparkles className="w-4 h-4 mr-2 animate-spin-slow" />
            Free Online Downloader
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight max-w-5xl text-white animate-fade-in-up">
            <span className="inline-block animate-fade-in-up delay-200">Free Social Media</span><br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-200 bg-clip-text text-transparent inline-block animate-fade-in-up delay-400">Video Downloader</span>
          </h1>
          <div className="max-w-4xl mb-8 space-y-5 animate-fade-in-up delay-600">
            {/* Opening Hook */}
            <p className="text-base md:text-lg text-white font-medium leading-relaxed drop-shadow-lg">
              You're scrolling and find that <span className="text-cyan-300">perfect video</span>—a business tutorial, YouTube marketing masterclass, or Instagram tutorial you need offline. <span className="text-cyan-200">But the platform won't let you save it.</span> <span className="text-cyan-300 font-semibold">That's why FSMVid exists.</span>
            </p>
            
            {/* Solution & Features paragraph */}
            <p className="text-sm md:text-base text-blue-100 leading-relaxed bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <span className="font-bold text-cyan-300">FSMVid</span> is a free online video downloader that converts <span className="text-cyan-300">YouTube to MP4</span>, downloads HD videos, and extracts <span className="text-cyan-300">MP3 audio</span> from multiple platforms—<span className="font-bold text-white">no software needed</span>. Whether you need a YouTube to MP3 converter for podcasts, a video converter for presentations, or downloads for digital marketing and content creation, we handle it all.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-4 animate-fade-in-up delay-800">
            {[
              { icon: CheckCircle, text: "No registration required" }, { icon: CheckCircle, text: "100% free forever" },
              { icon: CheckCircle, text: "High quality downloads" }, { icon: CheckCircle, text: "Multiple formats" },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-3 shadow-lg border border-white/20 text-sm font-medium text-white hover:bg-white/20 transition-all duration-300 hover:scale-105" style={{ animationDelay: `${1000 + index * 100}ms` }}>
                <feature.icon className="w-4 h-4 text-cyan-300" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
          <div className="w-full max-w-4xl mb-1 animate-fade-in-up delay-1000" id="downloader">
            <AdSenseBanner />
            <PlatformDownloader platform="universal" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl animate-fade-in-up delay-1200">
            {[
              { number: "50M+", label: "Happy Users", icon: Star }, { number: "1B+", label: "Downloads", icon: Download },
              { number: "20+", label: "Platforms", icon: Play }, { number: "99.9%", label: "Uptime", icon: CheckCircle },
            ].map((stat, index) => (
              <div key={index} className="text-center group" style={{ animationDelay: `${1400 + index * 100}ms` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md shadow-xl mb-4 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 border border-white/20 group-hover:bg-white/20">
                  <stat.icon className="w-8 h-8 text-cyan-300" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-white">{stat.number}</div>
                <div className="text-blue-200 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
      <HowToUse />

     
      <section className="py-8 md:py-12 bg-white dark:bg-slate-950">
        <Suspense fallback={<GridLoading />}>
          <PlatformGrid />
        </Suspense>
      </section>

      <Suspense fallback={<ContentLoading />}>

      <section className="py-12 md:py-20 bg-gray-50 dark:bg-slate-950 relative overflow-hidden"> 
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-800/5 to-transparent dark:from-blue-500/10"></div>
        <div className="container px-6 relative z-10 mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20 px-6 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Why Choose Our Downloader?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the fastest and most reliable way to download content from your favorite social media platforms.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuresForNewSection.map((feature, index) => (
              <Card key={index} className={`border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white dark:bg-slate-800/50 group cursor-pointer ${feature.hoverBg} dark:hover:bg-slate-700/50`}>
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.iconBg} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <div className={`absolute inset-0 w-16 h-16 rounded-2xl ${feature.iconBg} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 mx-auto`}></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800 dark:via-slate-800/70 dark:to-slate-900 p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg mr-4 group-hover:scale-110 transition-transform duration-300"><Clock className="w-7 h-7" /></div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Lightning Fast Processing</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">Our advanced servers process your downloads in under 10 seconds, making us the fastest downloader available worldwide.</p>
            </Card>
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-800 dark:via-slate-800/70 dark:to-slate-900 p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg mr-4 group-hover:scale-110 transition-transform duration-300"><Award className="w-7 h-7" /></div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Premium Quality</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">Download videos in their original quality, from 144p to 4K resolution, with no compression or quality loss.</p>
            </Card>
          </div>
        </div>
      </section>
        
      </Suspense>
        
      <section className="w-full py-12 md:py-16 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Suspense fallback={<ContentLoading />}>
            <HomeSEOContent />
          </Suspense>
        </div>
      </section>

       
      {/* Updated Call to Action Section */}
      <section className="w-full py-12 relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-center">
        <HeroSectionStyles /> {/* Re-added HeroSectionStyles for the animated background effects */}
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Download Your Favorite Videos?</h2>
          <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-blue-100 mb-4 max-w-2xl mx-auto">Our free tool makes it easy to save videos from any platform in just a few clicks.</p>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">No registration, no software installation, and completely free to use!</p>
          <a href="#downloader" 
             className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-400 text-white h-12 px-8 rounded-2xl shadow-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
            Download Now
          </a>
        </div>
      </section>

      {/* New Blog Section using featuredPosts */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-50 text-orange-700 hover:bg-orange-50 dark:bg-orange-500/10 dark:text-orange-300 dark:hover:bg-orange-500/20 px-4 py-1 text-xs font-semibold">
              <TrendingUp className="w-3 h-3 mr-2" />
              Knowledge Base
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Latest from Our Blog</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest tips, tutorials, and news about video downloading and social media trends.
            </p>
          </div>

          {featuredPosts.length === 0 ? (
            <div className="text-center py-10 col-span-full"><p className="dark:text-gray-300">No featured blog posts available at the moment. Check back soon!</p></div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => {
                const isFirstPost = index === 0;
                const displayTitle = post.title || "Untitled Post";
                const displayExcerpt = post.excerpt || "Read our latest blog post for more details.";
                const displayImageUrl = post.mainImage ? urlFor(post.mainImage).width(400).height(isFirstPost ? 225 : 200).url() : `/placeholder.svg?height=${isFirstPost ? 225 : 200}&width=400`;
                const displaySlug = post.slug?.current || '#';
                
                const postDate = post.publishedAt ? formatDate(post.publishedAt) : null;
                const postAuthorName = post.author?.name || "FSMVID Team";
                // Use the first category title if available, otherwise a default.
                const postCategoryTitle = post.categories && post.categories.length > 0 && post.categories[0]?.title ? post.categories[0].title : "Article";
                const postReadTime = "5 min read"; // Placeholder, as this is not in the fetched data

                return (
                  <Card
                    key={post._id}
                    className={`border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:bg-slate-800 transition-all duration-300 hover:-translate-y-1 overflow-hidden group ${
                      isFirstPost ? "lg:col-span-2 lg:row-span-1" : "" 
                    }`}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={displayImageUrl}
                        alt={displayTitle}
                        width={400}
                        height={isFirstPost ? 225 : 200}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                          isFirstPost ? "h-48 md:h-60" : "h-40 md:h-48"
                        }`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge
                           className={`${
                            postCategoryTitle === "Tips & Tricks"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : postCategoryTitle === "Tutorial"
                                ? "bg-green-600 hover:bg-green-700"
                                : postCategoryTitle === "Guide" 
                                  ? "bg-purple-600 hover:bg-purple-700"
                                  : "bg-gray-600 hover:bg-gray-700" // Default for "Article" or others
                          } text-white shadow-sm text-xs`}
                        >
                          {postCategoryTitle}
                        </Badge>
                      </div>

                      {isFirstPost && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-700 shadow-sm text-xs">
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mb-4">
                        {postDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {postDate}
                          </div>
                        )}
                        {postDate && <span className="hidden sm:inline">•</span>} {/* Separator if date is shown */}
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {postReadTime} {/* Placeholder */}
                        </div>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {postAuthorName}
                        </div>
                      </div>

                      <h3
                        className={`font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
                          isFirstPost ? "text-xl" : "text-lg"
                        }`}
                      >
                        {displayTitle}
                      </h3>

                      <p
                        className={`text-gray-600 dark:text-gray-300 mb-4 leading-relaxed ${
                          isFirstPost ? "text-base line-clamp-3" : "text-sm line-clamp-2"
                        }`}
                      >
                        {displayExcerpt}
                      </p>

                      <Link
                        href={`/blog/${displaySlug}`}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm group-hover:gap-2 transition-all duration-200"
                      >
                        Read Full Article
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white px-8 py-3 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              asChild
            >
              <Link href="/blog">
                <ArrowRight className="w-4 h-4 mr-2" />
                View All Articles
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-white dark:bg-slate-950"> {/* Changed background back to white */}
        <div className="container mx-auto px-4">
          {/* The h2 and div below were removed as they were duplicate titles for the FAQ section */}
          <div className="max-w-3xl mx-auto"><Suspense fallback={<ContentLoading />}><FAQ /></Suspense></div>
        </div>
      </section>


        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "WebApplication", name: "FSMVID", applicationCategory: "UtilityApplication", operatingSystem: "Web",
            offers: { "@type": "Offer", },
            description: "FSMVID is a powerful and user-friendly free social media video downloader tool that allows you to download videos, images, and shorts from popular platforms including YouTube, TikTok, Facebook, Twitter, Instagram, and more. Download high-quality content from any social media platform with our fast, free online downloader tool - no registration required.",
        }),}}/>
      </div>
  )
}
