import type { Metadata } from "next"
export const runtime = "edge"
import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { getAllPosts, urlFor } from "@/lib/blog/blog-client"
import { formatDate } from "@/lib/utils/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, User, ArrowRight, TrendingUp, BookOpen, Sparkles } from "lucide-react"
import HeroSectionStyles from "@/components/content/hero-section-styles";
import { BlogCard } from "@/components/shared/blog-card"

const PostsLoadingFallback = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-100 dark:border-slate-800">
        <div className="aspect-video bg-muted/30 animate-pulse"></div>
        <div className="p-10 space-y-4">
          <div className="h-4 bg-muted/30 animate-pulse rounded w-3/4"></div>
          <div className="h-8 bg-muted/30 animate-pulse rounded"></div>
          <div className="h-20 bg-muted/30 animate-pulse rounded"></div>
        </div>
      </div>
    ))}
  </div>
)

export const metadata: Metadata = {
  title: "Video Downloading Tips, Tutorials, Reviews",
  description: "FSMVID Blog – Tips, Tutorials & Reviews for Downloading Videos from YouTube, TikTok, Instagram, and 30+ Social Media Sites. Learn how to save videos online, discover expert guides, and stay updated with the latest trends in social video content.",
  openGraph: {
    title: "Video Downloading Tips, Tutorials, Reviews",
    description: "FSMVID Blog – Tips, Tutorials & Reviews for Downloading Videos from YouTube, TikTok, Instagram, and 30+ Social Media Sites. Learn how to save videos online, discover expert guides, and stay updated with the latest trends in social video content.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
    siteName: "FSMVID",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Video Downloading Tips, Tutorials, Reviews", },],
    locale: "en_US",
    type: "website",
  },
}

export const revalidate = 60;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const pageParam = params?.page;
  const currentPage = Number(pageParam) || 1;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
      {/* SaaS Elite Blog Hero */}
      <section className="relative min-h-[60vh] overflow-hidden flex flex-col items-center justify-center pt-48 pb-20 px-4 group">
        <HeroSectionStyles />

        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/freelance-young-asian-businesswoman-casual-wear-using-laptop-working-living-room-home.jpg"
            alt="Blog Hero Background"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-slate-950/60 transition-all duration-700 group-hover:bg-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-transparent opacity-50" />
        </div>

        {/* Atmospheric Orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full translate-y-1/2" />

        <div className="container relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
          <Badge className="mb-8 bg-blue-600 text-white border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <BookOpen className="w-3.5 h-3.5 mr-2" />
            Knowledge Base Repository
          </Badge>

          <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic leading-tight mb-8 uppercase text-white drop-shadow-2xl">
            Our <span className="text-blue-400">Blog</span>
          </h1>

          <div className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed drop-shadow-md">
              Latest news, tutorials, and insights about video downloading and social media content.
            </p>
            <p className="text-xs md:text-sm text-blue-300 font-black uppercase tracking-[0.3em] italic drop-shadow-sm">
              Stay updated with the latest trends and tips.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content Registry */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <Suspense fallback={<PostsLoadingFallback />}>
            <BlogPostsContent currentPage={currentPage} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

async function BlogPostsContent({ currentPage }: { currentPage: number }) {
  try {
    const { posts, totalPages } = await getAllPosts(currentPage, 10);

    if (posts.length === 0) {
      return (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
          <h2 className="text-2xl font-black italic uppercase mb-4">No Data Segments Found</h2>
          <p className="text-slate-500 font-medium italic">We haven&apos;t published any blog posts yet. Check back soon!</p>
        </div>
      );
    }

    return (
      <div className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard
              key={post._id}
              post={post}
              isFirstPost={index === 0}
              urlFor={urlFor}
              formatDate={formatDate}
            />
          ))}
        </div>

        {/* Pagination Gateway */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 pt-12">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                className={`h-12 w-12 rounded-2xl font-black text-[10px] transition-all ${currentPage === i + 1 ? 'bg-blue-600 border-none shadow-xl shadow-blue-600/20' : 'border-slate-100 dark:border-slate-800 hover:border-blue-600'}`}
                asChild
              >
                <Link href={`/blog?page=${i + 1}`}>{i + 1}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return (
      <Card className="max-w-2xl mx-auto rounded-[3rem] border-none shadow-2xl p-12 text-center">
        <h2 className="text-3xl font-black italic uppercase mb-6">Network Signal Interrupted</h2>
        <p className="text-slate-500 font-medium italic mb-10">We&apos;re currently experiencing issues loading our blog content. Please check back later.</p>
        <Button asChild className="h-16 px-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-widest shadow-2xl shadow-blue-600/20">
          <Link href="/">Reconnect To Terminal</Link>
        </Button>
      </Card>
    );
  }
}
