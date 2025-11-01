import type { Metadata } from "next"
import { Suspense, lazy, type SVGProps } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPostBySlug, getFeaturedPosts, getAllCategories, urlFor, getPostNavigation } from "@/lib/blog-client"
import { formatDate } from "@/lib/utils"
import { PortableText } from "@portabletext/react"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Tag, TrendingUp, Download, Twitter, Facebook, Linkedin, Mail } from "lucide-react"

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
  params: Promise<{
    slug: string
  }>
}

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug).catch(() => null)
    
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

const WhatsAppIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.52 3.48A11.9 11.9 0 0 0 12.02 0C5.39 0 .04 5.34.04 11.94c0 2.1.55 4.16 1.6 5.97L0 24l6.27-1.63a11.92 11.92 0 0 0 5.75 1.47h.01c6.63 0 12.01-5.35 12.01-11.94a11.86 11.86 0 0 0-3.52-8.42ZM12.03 21.8a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.73.97 1-3.64-.24-.37a9.78 9.78 0 0 1-1.53-5.2A9.68 9.68 0 0 1 12 2.2a9.68 9.68 0 0 1 9.72 9.79 9.69 9.69 0 0 1-9.7 9.81Zm5.33-7.32c-.29-.14-1.69-.83-1.95-.92-.26-.1-.45-.14-.64.14-.19.27-.75.92-.92 1.11-.18.19-.34.21-.63.07-.29-.13-1.21-.45-2.3-1.44-.85-.76-1.42-1.7-1.59-1.98-.17-.28-.02-.43.13-.57.14-.14.33-.35.5-.52.17-.17.22-.3.33-.5.11-.2.05-.37-.02-.52-.07-.14-.64-1.53-.88-2.11-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.5.07-.77.36-.27.29-1.02 1-1.02 2.44 0 1.44 1.04 2.84 1.18 3.04.14.2 2.17 3.32 5.27 4.66.74.32 1.3.51 1.7.65.72.23 1.37.19 1.89.12.58-.09 1.74-.71 1.99-1.34.25-.62.25-1.16.18-1.28-.07-.12-.26-.19-.54-.33Z" />
  </svg>
);

const PinterestIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 4.99 3.11 9.26 7.51 10.97-.1-.94-.2-2.35.04-3.37.22-.92 1.39-5.84 1.39-5.84s-.35-.7-.35-1.76c0-1.65.96-2.88 2.15-2.88 1.01 0 1.49.76 1.49 1.67 0 1.02-.65 2.54-.99 3.95-.28 1.18.6 2.15 1.78 2.15 2.14 0 3.77-2.25 3.77-5.49 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.21 0 1.03.4 2.14.9 2.74.1.12.11.23.08.35-.03.11-.22.93-.32 1.15-.05.12-.17.17-.29.12-1.09-.45-1.77-1.86-1.77-3 0-2.44 1.78-5.25 5.12-5.25 2.69 0 4.79 1.92 4.79 4.49 0 2.68-1.69 4.84-4.04 4.84-.79 0-1.53-.41-1.79-.89l-.49 1.86c-.18.68-.66 1.54-1 2.06.75.23 1.54.35 2.36.35 6.63 0 12-5.37 12-12S18.63 0 12 0Z" />
  </svg>
);

const MediumIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 1043.63 592.71" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M588.67 296.35c0 163.61-131.24 296.35-293.37 296.35C133.16 592.7 1.92 459.96 1.92 296.35 1.92 132.74 133.16 0 295.3 0c162.13 0 293.37 132.74 293.37 296.35Zm327.26 0c0 153.25-60.77 277.37-135.77 277.37-75 0-135.77-124.12-135.77-277.37 0-153.25 60.77-277.37 135.77-277.37 75 0 135.77 124.12 135.77 277.37Zm127.7 0c0 143.89-22.53 260.56-50.34 260.56-27.81 0-50.33-116.67-50.33-260.56 0-143.89 22.53-260.56 50.33-260.56 27.81 0 50.33 116.67 50.33 260.56Z" />
  </svg>
);

const PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const assetRef: string = value?.asset?._ref || ''
      const refMatch = assetRef.match(/-(\d+)x(\d+)-/)
      const originalWidth = refMatch ? parseInt(refMatch[1], 10) : 1200
      const originalHeight = refMatch ? parseInt(refMatch[2], 10) : 675
      const aspectRatio = originalHeight > 0 ? originalWidth / originalHeight : 16 / 9
      const displayWidth = Math.min(originalWidth, 1400)

      return (
        <figure className="my-8">
          <div
            className="relative w-full overflow-hidden rounded-lg"
            style={{ aspectRatio }}
          >
        <Image
              src={urlFor(value).width(displayWidth).url()}
          alt={value.alt || 'Blog post image'}
          fill
              className="object-contain"
          loading="lazy"
              sizes="(max-width: 1024px) 100vw, 960px"
        />
          </div>
        {value.alt && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.alt}
            </figcaption>
          )}
        </figure>
      )
    },
    table: ({ value }: any) => {
      const rows = value?.rows ?? []
      if (!rows.length) {
        return null
      }

      const getCells = (row: any) => (Array.isArray(row) ? row : row?.cells) ?? []
      const headerCells = getCells(rows[0])
      const dataRows = rows.slice(1)

      return (
        <div className="my-10 overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-xl border border-primary/30 bg-primary/5 shadow-lg">
              <table className="min-w-full text-sm md:text-base">
                {headerCells.length > 0 && (
                  <thead className="bg-primary/10">
                    <tr>
                      {headerCells.map((cell: any, cellIndex: number) => (
                        <th
                          key={cellIndex}
                          className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-xs md:text-sm text-primary"
                          scope="col"
                        >
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody className="divide-y divide-primary/10">
                  {dataRows.map((row: any, rowIndex: number) => {
                    const cells = getCells(row)
                    return (
                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-background/95' : 'bg-primary/5'}>
                        {cells.map((cell: any, cellIndex: number) =>
                          cellIndex === 0 ? (
                            <th
                              key={cellIndex}
                              scope="row"
                              className="px-4 py-3 text-left font-semibold text-foreground"
                            >
                              {cell}
                            </th>
                          ) : (
                            <td
                              key={cellIndex}
                              className="px-4 py-3 text-left text-muted-foreground"
                            >
                              {cell}
                            </td>
                          )
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
      </div>
          </div>
      </div>
      )
    },
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
      // Sanity uses "href" for some link types and "url" for others
      const href = value?.href || value?.url || '#'
      const isExternal = href.startsWith('http://') || href.startsWith('https://')
      const rel = isExternal ? 'noreferrer noopener' : undefined
      
      // Use regular <a> tag for external links, Next.js Link for internal links
      if (isExternal) {
        return (
          <a 
            href={href} 
            rel={rel}
            target="_blank"
            className="text-primary underline hover:text-primary/80"
          >
            {children}
          </a>
        )
      }
      
      return (
        <Link 
          href={href} 
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
    const { slug } = await params
    const post = await getPostBySlug(slug).catch(() => null)
    
    if (!post) {
      notFound()
    }
    
    // Get previous and next posts for navigation
    const { previous, next } = await getPostNavigation(slug);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fsmvid.com'
    const shareUrl = `${baseUrl}/blog/${slug}`
    const encodedShareUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(post.title)
    const primaryCategory = post.categories?.[0]?.title
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background relative">
        {/* Subtle pattern overlay */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(0_0_0_/_0.05)_1px,_transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,_rgb(255_255_255_/_0.03)_1px,_transparent_0)] bg-[size:24px_24px] pointer-events-none z-0"></div>
        
        {/* Hero Header with Gradient */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50 relative z-10">
          <div className="container mx-auto px-4 py-6">
          {/* Breadcrumbs */}
            <nav className="mb-4">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                    Home
                  </Link>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="h-3.5 w-3.5" />
                  <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="truncate max-w-[200px] text-foreground/70">{post.title}</span>
                </li>
              </ol>
            </nav>
          </div>
          </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8 relative">
              {/* Floating Share Bar */}
              <div className="hidden xl:block fixed z-50" style={{ left: 'max(20px, calc((100vw - 1280px) / 2 - 112px))', top: '140px' }}>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Share</span>
                  <div className="h-8 w-[2px] bg-border/70"></div>
                  {[
                    {
                      name: "Twitter",
                      href: `https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedTitle}`,
                      className: "border-sky-500/40 bg-sky-500/10 text-sky-600 hover:bg-sky-500/20 hover:border-sky-500",
                      Icon: Twitter,
                    },
                    {
                      name: "Facebook",
                      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`,
                      className: "border-blue-600/40 bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 hover:border-blue-600",
                      Icon: Facebook,
                    },
                    {
                      name: "LinkedIn",
                      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedShareUrl}&title=${encodedTitle}`,
                      className: "border-slate-500/40 bg-slate-500/10 text-slate-600 hover:bg-slate-500/20 hover:border-slate-500",
                      Icon: Linkedin,
                    },
                    {
                      name: "WhatsApp",
                      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedShareUrl}`,
                      className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 hover:border-emerald-500",
                      Icon: WhatsAppIcon,
                    },
                    {
                      name: "Email",
                      href: `mailto:?subject=${encodedTitle}&body=${encodedShareUrl}`,
                      className: "border-orange-500/40 bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 hover:border-orange-500",
                      Icon: Mail,
                    },
                    {
                      name: "Pinterest",
                      href: `https://pinterest.com/pin/create/button/?url=${encodedShareUrl}&description=${encodedTitle}`,
                      className: "border-rose-500/40 bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 hover:border-rose-500",
                      Icon: PinterestIcon,
                    },
                    {
                      name: "Medium",
                      href: `https://medium.com/p/import?url=${encodedShareUrl}`,
                      className: "border-violet-500/40 bg-violet-500/10 text-violet-600 hover:bg-violet-500/20 hover:border-violet-500",
                      Icon: MediumIcon,
                    },
                  ].map(({ name, href, className, Icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all shadow-lg hover:shadow-xl ${className}`}
                      title={`Share on ${name}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/40 via-primary/10 to-purple-400/40 rounded-[26px] blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                <article className="relative bg-card/95 backdrop-blur border border-border/60 rounded-[22px] shadow-[0_20px_45px_-25px_rgba(15,23,42,0.45)] overflow-hidden">
                <div className="px-6 md:px-10 pt-8 md:pt-12">
                  {/* Article Header */}
                    <header className="space-y-6">
                      <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                        {post.title}
                      </h1>
                    {post.excerpt && (
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                        {post.excerpt}
                      </p>
                    )}

                      {/* Author & Meta Info */}
                      <div className="flex flex-wrap items-center gap-4">
                      {post.author && (
                        <div className="flex items-center gap-3">
                          {post.author.image ? (
                            <Image
                              src={urlFor(post.author.image).width(48).height(48).url()}
                              alt={post.author.name}
                              width={48}
                              height={48}
                              className="rounded-full border-2 border-primary/20"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center border-2 border-primary/20">
                              <span className="text-lg font-bold text-primary-foreground">
                                {post.author.name.charAt(0).toUpperCase()}
                              </span>
                      </div>
                          )}
                          <div>
                            <div className="text-sm font-semibold text-foreground">{post.author.name}</div>
                            <div className="text-xs text-muted-foreground">Author</div>
                      </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4" />
                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>5 min read</span>
                      </div>
                    </div>
                  </header>

                  {/* Featured Image */}
                  {post.mainImage && (
                    <div className="relative aspect-[2/1] mt-6 mb-10 overflow-hidden border border-border/40 rounded-[28px] -mx-6 md:-mx-10">
                      <Image 
                        src={urlFor(post.mainImage).width(1600).height(800).url()} 
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent"></div>
                      {/* Categories on Image */}
                      <div className="absolute top-6 left-8 flex flex-wrap gap-3">
                    {post.categories?.map((category: any) => (
                          <Badge key={category._id} className="bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-lg px-4 py-2 text-sm">
                            <Tag className="h-4 w-4 mr-1" />
                        {category.title}
                      </Badge>
                    ))}
                  </div>
                    </div>
                  )}

                  {/* Main Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none hyphens-none break-words prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-a:text-primary">
                      <div className="w-full break-words leading-relaxed">
                      {post.content ? (
                        <PortableText 
                          value={post.content} 
                          components={{
                            ...PortableTextComponents,
                            block: {
                              ...PortableTextComponents.block,
                              normal: ({ children }: any) => (
                                    <p className="mb-5 break-words hyphens-none text-[17px] leading-[1.8]">{children}</p>
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
            </div>

              {/* Article Navigation */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {previous && (
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 bg-gradient-to-br from-card to-muted/30">
                    <Link href={`/blog/${previous.slug.current}`} className="block p-6">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <ChevronLeft className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">Previous Article</div>
                          <div className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{previous.title}</div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                )}
                
                {next && (
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 bg-gradient-to-br from-card to-muted/30 md:col-start-2">
                    <Link href={`/blog/${next.slug.current}`} className="block p-6">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 text-right">
                          <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">Next Article</div>
                          <div className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{next.title}</div>
                        </div>
                        <div className="mt-1 p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <ChevronRight className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                    </Link>
                  </Card>
                )}
              </div>

              {/* Related Posts */}
              <Suspense fallback={<RelatedPostsLoading />}>
                <RelatedPostsSection slug={slug} />
              </Suspense>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-4 space-y-6">
                <Suspense fallback={<SidebarLoading />}>
                  <BlogSidebar slug={slug} />
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
  const relatedPosts = await getFeaturedPosts(4).catch(() => []);
  
  // Filter out the current post and limit to 3
  const filteredPosts = relatedPosts.filter(post => post.slug.current !== slug).slice(0, 3);
  
  if (filteredPosts.length === 0) return null;
  
  return (
    <div className="mt-12 pt-8 border-t border-border/50">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1 bg-primary rounded-full"></div>
        <h3 className="text-3xl font-bold">Related Articles</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((relatedPost) => (
          <Link key={relatedPost._id} href={`/blog/${relatedPost.slug.current}`} className="group block">
            <Card className="h-full overflow-hidden border border-border/50 hover:border-primary/30 shadow-md transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl bg-card">
              <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary/5 to-muted/30">
                {relatedPost.mainImage ? (
                  <Image
                    src={urlFor(relatedPost.mainImage).width(600).height(400).url()}
                    alt={relatedPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">No image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Date badge at top right */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 dark:bg-black/80 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-foreground shadow-lg">
                    <CalendarIcon className="h-3 w-3" />
                    {formatDate(relatedPost.publishedAt)}
                  </span>
              </div>
                
                {/* Title at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="text-xl font-bold text-white line-clamp-2 drop-shadow-lg">
                  {relatedPost.title}
                </h4>
                </div>
              </div>
              
              <CardContent className="p-6">
                {relatedPost.excerpt && (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {relatedPost.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Read more</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
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
    <aside className="space-y-6">
      <Button variant="outline" asChild className="w-full justify-start">
        <Link href="/blog" className="flex items-center">
          <ChevronLeft className="h-4 w-4 mr-2" />
        Back to all posts
      </Link>
      </Button>

      <Card className="bg-gradient-to-br from-card to-muted/30 border-border/50 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            Popular Articles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredPopularPosts.map((popularPost) => (
            <div key={popularPost._id} className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-border/60 bg-muted">
                {popularPost.mainImage ? (
                  <Image
                    src={urlFor(popularPost.mainImage).width(80).height(80).url()}
                    alt={popularPost.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="64px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
                )}
              </div>
              <Link href={`/blog/${popularPost.slug.current}`} className="font-semibold text-sm leading-snug hover:text-primary transition-colors line-clamp-2 flex-1">
                  {popularPost.title}
                </Link>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-muted/30 border-border/50 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Download className="h-5 w-5 text-primary" />
            </div>
            Downloading Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Link href="/youtube-video-saver" className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/20 group">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/icons/youtube.svg"
                  alt="YouTube"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">YouTube Downloader</h3>
                <p className="text-xs text-muted-foreground">Download YouTube videos easily</p>
              </div>
            </Link>

            <Link href="/instagram-media-saver" className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/20 group">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">Instagram Downloader</h3>
                <p className="text-xs text-muted-foreground">Save Instagram photos & videos</p>
              </div>
            </Link>

            <Link href="/tiktok-video-saver" className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/20 group">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/icons/tiktok.svg"
                  alt="TikTok"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">TikTok Downloader</h3>
                <p className="text-xs text-muted-foreground">Download TikTok videos</p>
              </div>
            </Link>

            <Link href="/facebook-media-grabber" className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/20 group">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">Facebook Downloader</h3>
                <p className="text-xs text-muted-foreground">Download Facebook videos</p>
              </div>
            </Link>

            <Link href="/twitter-video-saver" className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/20 group">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/icons/twitter.svg"
                  alt="Twitter"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">Twitter Downloader</h3>
                <p className="text-xs text-muted-foreground">Save Twitter videos</p>
              </div>
            </Link>

            <Link href="/pinterest-media-saver" className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/20 group">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/icons/pinterest.svg"
                  alt="Pinterest"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">Pinterest Downloader</h3>
                <p className="text-xs text-muted-foreground">Download Pinterest videos</p>
              </div>
            </Link>

            <Link href="/reddit-video-saver" className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/20 group">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/icons/reddit.svg"
                  alt="Reddit"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">Reddit Downloader</h3>
                <p className="text-xs text-muted-foreground">Save Reddit videos</p>
              </div>
            </Link>

            <Link href="/telegram-media-saver" className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/20 group">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/icons/telegram.svg"
                  alt="Telegram"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">Telegram Downloader</h3>
                <p className="text-xs text-muted-foreground">Download Telegram media</p>
              </div>
            </Link>

            <Link href="/snapchat-story-saver" className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/20 group">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/icons/snapchat.svg"
                  alt="Snapchat"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">Snapchat Downloader</h3>
                <p className="text-xs text-muted-foreground">Save Snapchat stories</p>
              </div>
            </Link>

            <Link href="/douyin-video-saver" className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/20 group">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/icons/douyin.svg"
                  alt="Douyin"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">Douyin Downloader</h3>
                <p className="text-xs text-muted-foreground">Download Douyin videos</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
