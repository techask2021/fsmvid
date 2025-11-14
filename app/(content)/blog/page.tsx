import type { Metadata } from "next"
nexport const runtime = "edge";
import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { getAllPosts, urlFor } from "@/lib/blog/blog-client"
import { formatDate } from "@/lib/utils/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, User, ArrowRight, TrendingUp, BookOpen } from "lucide-react"


// Loading fallback for posts grid
const PostsLoadingFallback = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm dark:bg-slate-800/50">
        <div className="aspect-video bg-muted/30 animate-pulse"></div>
        <div className="p-6 space-y-4">
          <div className="h-4 bg-muted/30 animate-pulse rounded w-3/4"></div>
          <div className="h-6 bg-muted/30 animate-pulse rounded"></div>
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
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Video Downloading Tips, Tutorials, Reviews",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  // Convert to number after awaiting searchParams
  const params = await searchParams
  const pageParam = params?.page;
  const currentPage = Number(pageParam) || 1;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section with Image Background */}
      <section 
        className="relative py-16 md:py-20 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/freelance-young-asian-businesswoman-casual-wear-using-laptop-working-living-room-home.jpg)',
        }}
      >
        {/* Dark overlay that preserves image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/65 to-indigo-900/70"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:20px_20px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <Badge className="mb-6 bg-white/20 backdrop-blur-md text-white border-white/30 shadow-lg px-6 py-2 text-sm font-semibold hover:bg-white/30 transition-all duration-300">
              <BookOpen className="w-4 h-4 mr-2 inline" />
              Knowledge Base
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
              Our Blog
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Latest news, tutorials, and insights about video downloading and social media content.
              <br />
              <span className="text-blue-200 font-medium">Stay updated with the latest trends and tips.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Suspense fallback={<PostsLoadingFallback />}>
            <BlogPostsContent currentPage={currentPage} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

// Separated component for better code splitting
async function BlogPostsContent({ currentPage }: { currentPage: number }) {
  try {
    const { posts, totalPages } = await getAllPosts(currentPage, 10);
    
    if (posts.length === 0) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">No posts found</h2>
          <p className="mb-8">We haven't published any blog posts yet. Check back soon!</p>
        </div>
      );
    }
    
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {posts.map((post, index) => {
            const postCategoryTitle = post.categories && post.categories.length > 0 && post.categories[0]?.title ? post.categories[0].title : "Article";
            const isFirstPost = index === 0;
            
            return (
              <Card 
                key={post._id} 
                className="border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl dark:bg-slate-800/50 transition-all duration-300 hover:-translate-y-2 group"
              >
                <Link href={`/blog/${post.slug.current}`} className="block">
                  <div className="aspect-video relative overflow-hidden">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(340).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800">
                        <span className="text-gray-400 dark:text-gray-500 text-sm">No image</span>
                      </div>
                    )}
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`${
                          postCategoryTitle === "Tips & Tricks"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : postCategoryTitle === "Tutorial"
                              ? "bg-green-600 hover:bg-green-700"
                              : postCategoryTitle === "Guide" 
                                ? "bg-purple-600 hover:bg-purple-700"
                                : "bg-gray-600 hover:bg-gray-700"
                        } text-white shadow-md text-xs font-semibold`}
                      >
                        {postCategoryTitle}
                      </Badge>
                    </div>

                    {/* Featured badge for first post */}
                    {isFirstPost && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-700 shadow-md text-xs font-semibold">
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                </Link>
                
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>5 min read</span>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${post.slug.current}`} className="block">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  
                  {post.excerpt && (
                    <p className="text-gray-600 dark:text-gray-300 mb-5 text-sm line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      {post.author?.image ? (
                        <Image
                          src={urlFor(post.author.image).width(40).height(40).url()}
                          alt={post.author.name}
                          width={28}
                          height={28}
                          className="rounded-full mr-2 border-2 border-gray-200 dark:border-gray-600"
                          loading="lazy"
                          sizes="28px"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-2 border-2 border-gray-200 dark:border-gray-600">
                          <span className="text-xs font-bold text-white">
                            {post.author?.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">By {post.author?.name}</span>
                    </div>
                    
                    <Link 
                      href={`/blog/${post.slug.current}`} 
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm group-hover:gap-2 transition-all duration-200"
                    >
                      Read more
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                className={currentPage === i + 1 ? "bg-blue-600 hover:bg-blue-700" : ""}
                asChild
              >
                <Link href={`/blog?page=${i + 1}`}>{i + 1}</Link>
              </Button>
            ))}
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Blog Content Unavailable</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6">We're currently experiencing issues loading our blog content. Please check back later.</p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }
}
