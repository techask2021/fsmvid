import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"

interface BlogCardProps {
    post: any;
    isFirstPost?: boolean;
    urlFor: (source: any) => any;
    formatDate: (date: string) => string;
}

export function BlogCard({ post, isFirstPost, urlFor, formatDate }: BlogCardProps) {
    const displayTitle = post.title || "Untitled Post";
    const displayExcerpt = post.excerpt || "Read our latest blog post for more details.";
    const displayImageUrl = post.mainImage ? urlFor(post.mainImage).width(800).height(450).url() : `/placeholder.svg?height=450&width=800`;
    const displaySlug = post.slug?.current || '#';
    const postDate = post.publishedAt ? formatDate(post.publishedAt) : null;
    const postAuthorName = post.author?.name || "FSMVID Team";
    const postCategoryTitle = post.categories && post.categories.length > 0 && post.categories[0]?.title ? post.categories[0].title : "Article";

    return (
        <Card
            className="border border-slate-100 shadow-md shadow-slate-200/20 rounded-xl bg-white overflow-hidden group hover:translate-y-[-4px] transition-all duration-300 flex flex-col"
        >
            <Link href={`/blog/${displaySlug}`} className="relative aspect-video overflow-hidden">
                <Image
                    src={displayImageUrl}
                    alt={displayTitle}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute top-4 left-4">
                    <Badge className="bg-slate-900/60 backdrop-blur-md text-white border-none px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest">
                        {postCategoryTitle}
                    </Badge>
                </div>
            </Link>

            <CardContent className="p-5 flex flex-col space-y-3">
                <div className="flex items-center gap-3 text-[8px] font-bold uppercase tracking-widest text-slate-400">
                    {postDate && <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-blue-600" /> {postDate}</div>}
                    <div className="flex items-center gap-1.5"><User className="w-3 h-3 text-blue-600" /> {postAuthorName}</div>
                </div>

                <Link href={`/blog/${displaySlug}`}>
                    <h3 className="font-black italic tracking-tighter uppercase leading-tight group-hover:text-blue-600 transition-colors text-slate-900 text-base">
                        {displayTitle}
                    </h3>
                </Link>

                <p className="text-slate-500 text-[10px] font-medium leading-relaxed line-clamp-2 italic border-l-2 border-slate-100 pl-4">
                    {displayExcerpt}
                </p>

                <div className="pt-2">
                    <Link
                        href={`/blog/${displaySlug}`}
                        className="inline-flex items-center gap-2 text-blue-600 font-black uppercase text-[9px] tracking-widest group-hover:gap-3 transition-all"
                    >
                        Access Article <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
