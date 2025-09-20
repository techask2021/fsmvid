import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPostBySlug, getFeaturedPosts, getAllCategories, urlFor, getPostNavigation } from "@/lib/blog-client"
import { formatDate } from "@/lib/utils"
import { PortableText } from "@portabletext/react"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Tag, Share2 } from "lucide-react"

// Loading fallbacks
const SidebarLoading = () => <div className="space-y-8">
  <div className="h-52 bg-muted/30 animate-pulse rounded-lg"></div>
  <div className="h-52 bg-muted/30 animate-pulse rounded-lg"></div>
</div>;

const RelatedPostsLoading = () => <div className="mt-8 pt-6 border-t">
  <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="h-56 bg-muted/30 animate-pulse rounded-lg"></div>
    ))}
  </div>
</div>;

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug).catch(() => null)
    
    if (!post) {
      return {
        title: 'Post Not Found',
      }
    }
    
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author.name],
        images: post.mainImage 
          ? [
              {
                url: urlFor(post.mainImage).width(1200).height(630).url(),
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ]
          : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post',
      description: 'Content currently unavailable',
    };
  }
}

const DownloadCTA = () => (
  <div className="my-8 p-6 bg-primary/10 rounded-lg">
    <h3 className="text-2xl font-bold mb-3">Download Videos Now!</h3>
    <p className="mb-4">Use our free online downloader to save your favorite videos from YouTube, TikTok, Instagram, and more.</p>
    <Button asChild size="lg">
      <Link href="/#downloader">Try Our Downloader</Link>
    </Button>
  </div>
);

const PortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8 relative aspect-video">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || 'Blog post image'}
          fill
          className="object-cover rounded-md"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 800px"
        />
        {value.alt && (
          <div className="text-center text-sm mt-2">{value.alt}</div>
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-6 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
    normal: ({ children, index }: any) => {
      // Process text content to add links
      let processedChildren = processTextForLinks(children);
      
      // Insert the CTA after a few paragraphs
      if (index === 3) {
        return (
          <>
            <p className="mb-4 leading-relaxed">{processedChildren}</p>
            <DownloadCTA />
          </>
        );
      }
      return <p className="mb-4 leading-relaxed">{processedChildren}</p>;
    },
    blockquote: ({ children }: any) => {
      let processedChildren = processTextForLinks(children);
      return <blockquote className="border-l-4 border-primary pl-4 italic my-6">{processedChildren}</blockquote>;
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => {
      let processedChildren = processTextForLinks(children);
      return <li>{processedChildren}</li>;
    },
    number: ({ children }: any) => {
      let processedChildren = processTextForLinks(children);
      return <li>{processedChildren}</li>;
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <Link 
          href={value.href} 
          rel={rel} 
          className="text-primary underline hover:text-primary/80"
        >
          {children}
        </Link>
      )
    },
    strong: ({ children }: any) => {
      let processedChildren = processTextForLinks(children);
      return <strong className="font-semibold">{processedChildren}</strong>;
    },
    em: ({ children }: any) => {
      let processedChildren = processTextForLinks(children);
      return <em className="italic">{processedChildren}</em>;
    },
    code: ({ children }: any) => (
      <code className="bg-muted px-1 py-0.5 rounded font-mono text-sm">{children}</code>
    ),
  },
}

// Function to process text for links
const processTextForLinks = (children: React.ReactNode): React.ReactNode => {
  if (typeof children !== 'string') return children;
  
  // Tool names and their corresponding URLs
  const toolMappings: { [key: string]: string } = {
    'YouTube': '/youtube-video-saver',
    'YouTube Video Saver': '/youtube-video-saver',
    'YouTube Downloader': '/youtube-video-saver',
    'Instagram': '/instagram-media-saver',
    'Instagram Media Saver': '/instagram-media-saver',
    'Instagram Downloader': '/instagram-media-saver',
    'TikTok': '/tiktok-video-saver',
    'TikTok Video Saver': '/tiktok-video-saver',
    'TikTok Downloader': '/tiktok-video-saver',
    'Facebook': '/facebook-media-grabber',
    'Facebook Media Grabber': '/facebook-media-grabber',
    'Facebook Downloader': '/facebook-media-grabber',
    'Twitter': '/twitter-video-saver',
    'Twitter Video Saver': '/twitter-video-saver',
    'Twitter Downloader': '/twitter-video-saver',
    'Pinterest': '/pinterest-media-saver',
    'Pinterest Media Saver': '/pinterest-media-saver',
    'Pinterest Downloader': '/pinterest-media-saver',
    'Vimeo': '/vimeo-video-extractor',
    'Vimeo Video Extractor': '/vimeo-video-extractor',
    'Vimeo Downloader': '/vimeo-video-extractor',
    'Dailymotion': '/dailymotion-video-saver',
    'Dailymotion Video Saver': '/dailymotion-video-saver',
    'Rumble': '/rumble-video-grabber',
    'Rumble Video Grabber': '/rumble-video-grabber',
    'Tumblr': '/tumblr-content-saver',
    'Tumblr Content Saver': '/tumblr-content-saver',
    'LinkedIn': '/linkedin-content-saver',
    'LinkedIn Content Saver': '/linkedin-content-saver',
    'Imgur': '/imgur-media-saver',
    'Imgur Media Saver': '/imgur-media-saver',
    'Telegram': '/telegram-media-saver',
    'Telegram Media Saver': '/telegram-media-saver',
    'Snapchat': '/snapchat-story-saver',
    'Snapchat Story Saver': '/snapchat-story-saver',
  };

  // Split the text into parts to create React elements
  let parts = children.split(/(FSMVID|YouTube|Instagram|TikTok|Facebook|Twitter|Pinterest|Vimeo|Dailymotion|Rumble|Tumblr|LinkedIn|Imgur|Telegram|Snapchat|YouTube Video Saver|YouTube Downloader|Instagram Media Saver|Instagram Downloader|TikTok Video Saver|TikTok Downloader|Facebook Media Grabber|Facebook Downloader|Twitter Video Saver|Twitter Downloader|Pinterest Media Saver|Pinterest Downloader|Vimeo Video Extractor|Vimeo Downloader|Dailymotion Video Saver|Rumble Video Grabber|Tumblr Content Saver|LinkedIn Content Saver|Imgur Media Saver|Telegram Media Saver|Snapchat Story Saver)/g);
  
  // Create React elements with links
  return parts.map((part, index) => {
    // Check if this part is a tool name
    if (part in toolMappings) {
      return (
        <Link 
          key={index} 
          href={toolMappings[part]} 
          className="text-primary hover:underline"
        >
          {part}
        </Link>
      );
    }
    
    // Check if this part is "FSMVID"
    if (part === "FSMVID") {
      return (
        <Link 
          key={index} 
          href="/" 
          className="text-primary hover:underline"
        >
          {part}
        </Link>
      );
    }
    
    // Return regular text
    return part;
  });
};

export default async function BlogPostPage({ params }: Props) {
  try {
    const post = await getPostBySlug(params.slug).catch(() => null)
    
    if (!post) {
      notFound()
    }
    
    // Get previous and next posts for navigation
    const { previous, next } = await getPostNavigation(params.slug);
    
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-4">
          {/* Breadcrumbs */}
          <div className="bg-gray-100 dark:bg-gray-800 -mx-4 px-4 py-2 mb-4">
            <nav className="container mx-auto">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground dark:text-gray-300">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="h-4 w-4" />
                  <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="h-4 w-4" />
                  <span className="truncate max-w-[200px] dark:text-gray-300">{post.title}</span>
                </li>
              </ol>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <article className="bg-card rounded-lg shadow-sm overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 py-8">
                  {/* Article Header */}
                  <header className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
                    {post.excerpt && (
                      <p className="text-lg text-muted-foreground mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>5 min read</span>
                      </div>
                      {post.author && (
                        <div className="flex items-center">
                          <span>By {post.author.name}</span>
                        </div>
                      )}
                    </div>
                  </header>

                  {/* Featured Image */}
                  {post.mainImage && (
                    <div className="relative aspect-[2/1] mb-8">
                      <Image 
                        src={urlFor(post.mainImage).width(1200).height(600).url()} 
                        alt={post.title}
                        fill
                        className="object-cover rounded-lg"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                      />
                    </div>
                  )}

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.categories?.map((category: any) => (
                      <Badge key={category._id} variant="secondary">
                        <Tag className="h-3 w-3 mr-1" />
                        {category.title}
                      </Badge>
                    ))}
                  </div>

                  {/* Main Content */}
                  <div className="prose prose-lg dark:prose-invert max-w-none hyphens-none break-words">
                    <div className="w-full break-words">
                      {post.content ? (
                        <PortableText 
                          value={post.content} 
                          components={{
                            ...PortableTextComponents,
                            block: {
                              ...PortableTextComponents.block,
                              normal: ({ children }: any) => (
                                <p className="mb-4 break-words hyphens-none">{children}</p>
                              ),
                            }
                          }}
                        />
                      ) : (
                        <>
                          <p>No content available for this post.</p>
                          <DownloadCTA />
                        </>
                      )}
                    </div>
                  </div>

                </div>
              </article>

              {/* Article Navigation */}
              <div className="mt-8 flex justify-between">
                {previous ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center"
                    asChild
                  >
                    <Link href={`/blog/${previous.slug.current}`}>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous Article
                    </Link>
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {next ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center"
                    asChild
                  >
                    <Link href={`/blog/${next.slug.current}`}>
                      Next Article
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                ) : (
                  <div></div>
                )}
              </div>

              {/* Related Posts */}
              <Suspense fallback={<RelatedPostsLoading />}>
                <RelatedPostsSection slug={params.slug} />
              </Suspense>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-4 space-y-6">
                <Suspense fallback={<SidebarLoading />}>
                  <BlogSidebar slug={params.slug} />
                </Suspense>
              </div>
            </aside>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading blog post:', error);
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <Card>
            <CardHeader>
              <CardTitle>Blog Post Unavailable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">We're having trouble loading this blog post. Please try again later.</p>
              <Button asChild>
                <Link href="/blog">Return to Blog</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

// Split components for better code splitting and deferred loading
async function MainPostContent({ post }: { post: any }) {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>5 min read</span>
        </div>
        {post.author && (
          <div>
            <span>By {post.author.name}</span>
          </div>
        )}
      </div>

      <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
        {post.mainImage ? (
          <Image 
            src={urlFor(post.mainImage).width(1200).height(675).url()} 
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {post.categories?.map((category: any) => (
          <Badge key={category._id} variant="secondary">
            <Tag className="h-3 w-3 mr-1" />
            {category.title}
          </Badge>
        ))}
      </div>
      
      {post.excerpt && (
        <div className="text-xl mb-6 font-medium text-muted-foreground">
          {post.excerpt}
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none">
        {post.content ? (
          <PortableText 
            value={post.content} 
            components={PortableTextComponents} 
          />
        ) : (
          <>
            <p>No content available for this post.</p>
            <DownloadCTA />
          </>
        )}
      </div>
    </>
  );
}

async function RelatedPostsSection({ slug }: { slug: string }) {
  // Get related posts based on categories, excluding current post
  const relatedPosts = await getFeaturedPosts(3).catch(() => []);
  
  // Filter out the current post
  const filteredPosts = relatedPosts.filter(post => post.slug.current !== slug);
  
  if (filteredPosts.length === 0) return null;
  
  return (
    <div className="mt-8 pt-6 border-t">
      <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPosts.map((relatedPost) => (
          <Link key={relatedPost._id} href={`/blog/${relatedPost.slug.current}`}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <div className="aspect-video relative">
                {relatedPost.mainImage ? (
                  <Image
                    src={urlFor(relatedPost.mainImage).width(400).height(225).url()}
                    alt={relatedPost.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 line-clamp-2 hover:text-primary">
                  {relatedPost.title}
                </h4>
                {relatedPost.excerpt && (
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {formatDate(relatedPost.publishedAt)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

async function BlogSidebar({ slug }: { slug: string }) {
  // Get popular posts excluding current post
  const popularPosts = await getFeaturedPosts(5).catch(() => []);
  const filteredPopularPosts = popularPosts.filter(post => post.slug.current !== slug);
  
  return (
    <aside className="space-y-8">
      <Link href="/blog" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to all posts
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Popular Articles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredPopularPosts.map((popularPost) => (
            <div key={popularPost._id} className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                {popularPost.mainImage ? (
                  <Image
                    src={urlFor(popularPost.mainImage).width(64).height(64).url()}
                    alt={popularPost.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="64px"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">No image</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/blog/${popularPost.slug.current}`} className="font-medium hover:text-primary line-clamp-2 text-sm">
                  {popularPost.title}
                </Link>
                {popularPost.excerpt && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {popularPost.excerpt}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">{formatDate(popularPost.publishedAt)}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Downloading Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Link href="/youtube-video-saver" className="flex items-center gap-3 p-2 hover:bg-accent rounded-md transition-colors">
              <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">YouTube Downloader</h3>
                <p className="text-xs text-muted-foreground">Download YouTube videos easily</p>
              </div>
            </Link>

            <Link href="/instagram-media-saver" className="flex items-center gap-3 p-2 hover:bg-accent rounded-md transition-colors">
              <div className="w-8 h-8 bg-pink-100 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-pink-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Instagram Downloader</h3>
                <p className="text-xs text-muted-foreground">Save Instagram photos & videos</p>
              </div>
            </Link>

            <Link href="/tiktok-video-saver" className="flex items-center gap-3 p-2 hover:bg-accent rounded-md transition-colors">
              <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">TikTok Downloader</h3>
                <p className="text-xs text-muted-foreground">Download TikTok videos</p>
              </div>
            </Link>

            <Link href="/facebook-media-grabber" className="flex items-center gap-3 p-2 hover:bg-accent rounded-md transition-colors">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Facebook Downloader</h3>
                <p className="text-xs text-muted-foreground">Download Facebook videos</p>
              </div>
            </Link>

            <Link href="/twitter-video-saver" className="flex items-center gap-3 p-2 hover:bg-accent rounded-md transition-colors">
              <div className="w-8 h-8 bg-sky-100 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-sky-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Twitter Downloader</h3>
                <p className="text-xs text-muted-foreground">Save Twitter videos</p>
              </div>
            </Link>

            <Link href="/pinterest-media-saver" className="flex items-center gap-3 p-2 hover:bg-accent rounded-md transition-colors">
              <div className="w-8 h-8 bg-red-50 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Pinterest Downloader</h3>
                <p className="text-xs text-muted-foreground">Download Pinterest videos</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
