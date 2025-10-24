import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { getAllPosts, urlFor } from "@/lib/blog-client"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
;

// Loading fallback for posts grid
const PostsLoadingFallback = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
        <div className="aspect-video bg-muted/30 animate-pulse"></div>
        <div className="p-5 space-y-4">
          <div className="h-6 bg-muted/30 animate-pulse rounded"></div>
          <div className="h-24 bg-muted/30 animate-pulse rounded"></div>
        </div>
      </div>
    ))}
  </div>
)

export const metadata: Metadata = {
  title: "Video Downloading Tips, Tutorials, Reviews | FSMVID Blog",
  description: "FSMVID Blog – Tips, Tutorials & Reviews for Downloading Videos from YouTube, TikTok, Instagram, and 30+ Social Media Sites. Learn how to save videos online, discover expert guides, and stay updated with the latest trends in social video content.",
  openGraph: {
    title: "Video Downloading Tips, Tutorials, Reviews | FSMVID Blog",
    description: "FSMVID Blog – Tips, Tutorials & Reviews for Downloading Videos from YouTube, TikTok, Instagram, and 30+ Social Media Sites. Learn how to save videos online, discover expert guides, and stay updated with the latest trends in social video content.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
    siteName: "FSMVID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Video Downloading Tips, Tutorials, Reviews | FSMVID Blog",
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
  searchParams: { page?: string }
}) {
  // Convert to number after awaiting searchParams
  const pageParam = searchParams?.page;
  const currentPage = Number(pageParam) || 1;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Latest news, tutorials, and insights about video downloading and social media content.
        </p>
      </div>


      <Suspense fallback={<PostsLoadingFallback />}>
        <BlogPostsContent currentPage={currentPage} />
      </Suspense>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <Card key={post._id} className="border border-gray-200 overflow-hidden shadow-sm hover:shadow transition-shadow">
              <Link href={`/blog/${post.slug.current}`} className="block">
                <div className="aspect-video relative">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).height(340).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}
                </div>
              </Link>
              
              <CardContent className="p-5">
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-3 w-3 mr-1" />
                  <span>5 min read</span>
                </div>
                
                <Link href={`/blog/${post.slug.current}`} className="block">
                  <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors">{post.title}</h2>
                </Link>
                
                {post.excerpt && (
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{post.excerpt}</p>
                )}
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    {post.author?.image ? (
                      <Image
                        src={urlFor(post.author.image).width(40).height(40).url()}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        className="rounded-full mr-2"
                        loading="lazy"
                        sizes="24px"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                        <span className="text-xs font-medium">
                          {post.author?.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="text-xs">By {post.author?.name}</span>
                  </div>
                  
                  <Link href={`/blog/${post.slug.current}`} className="text-primary text-sm font-medium hover:underline">
                    Read more
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
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
