
"use client"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
    Zap,
    Shield,
    Download,
    Infinity,
    Clock,
    CloudDownload,
    Check,
    Sparkles,
    ArrowRight,
    Youtube,
    Instagram,
    Twitter,
    PlayCircle,
    EyeOff,
    Lock,
    Cpu,
    Smartphone,
    Globe,
    Laptop,
    Chrome,
    Facebook,
    Video,
    Share2
} from "lucide-react";
import Link from "next/link";
import HeroSectionStyles from "@/components/content/hero-section-styles";
import Image from "next/image";
import CreditPurchaseCalculator from "@/components/content/credit-purchase-calculator";
import { useAuth } from "@/components/auth/auth-provider";
import Script from "next/script";

export default function BulkDownloadLandingPage() {
    const { user } = useAuth();

    const getBulkPlanAction = (pricingTier: any) => {
        if (pricingTier.price === "Free") {
            return user ? "/dashboard" : "/signup";
        }

        const planParam = encodeURIComponent(pricingTier.name.toLowerCase());
        const targetUrl = `/payment/manual?plan=${planParam}`;

        if (!user) {
            return `/login?redirectTo=${encodeURIComponent(targetUrl)}`;
        }
        return targetUrl;
    };

    // Schema.org structured data for SEO
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "FSMVID Bulk Video Downloader",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Windows, macOS, Linux, Android, iOS",
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "lowPrice": "0",
            "highPrice": "49.99",
            "offerCount": "4",
            "offers": [
                {
                    "@type": "Offer",
                    "name": "Free Plan",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                {
                    "@type": "Offer",
                    "name": "Bulk Pro",
                    "price": "9.99",
                    "priceCurrency": "USD"
                },
                {
                    "@type": "Offer",
                    "name": "Creator Suite",
                    "price": "24.99",
                    "priceCurrency": "USD"
                },
                {
                    "@type": "Offer",
                    "name": "Archive Elite",
                    "price": "49.99",
                    "priceCurrency": "USD"
                }
            ]
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "12547",
            "bestRating": "5",
            "worstRating": "1"
        },
        "description": "Professional bulk video downloader for YouTube, Instagram, TikTok, and 30+ platforms. Download entire playlists, profiles, and feeds with 1 credit per 2 videos. Fast, secure, and supports 4K quality.",
        "featureList": [
            "Bulk download from YouTube, Instagram, TikTok",
            "1 Credit = 2 Videos pricing",
            "4K and HD quality support",
            "Download entire playlists and profiles",
            "Chrome extension available",
            "Works on PC, Mac, Android",
            "No watermarks",
            "Fast cloud processing"
        ],
        "screenshot": "https://fsmvid.com/images/Bulk Video Downloader.png",
        "softwareVersion": "2.0",
        "author": {
            "@type": "Organization",
            "name": "FSMVID"
        }
    };

    return (
        <>
            <Script
                id="bulk-download-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                {/* Elite SaaS Hero - Standardized */}
                <section className="relative min-h-[50vh] overflow-hidden flex flex-col items-center justify-center pt-32 pb-20 px-4 mb-8 group">
                    <HeroSectionStyles />

                    {/* Background Image with Dark Overlay */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/Bulk Video Downloader.png"
                            alt="Bulk Video Downloader Information"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-20 dark:opacity-40"
                            priority
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-blue-900/80 transition-all duration-700 group-hover:bg-blue-900/70 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                    </div>

                    {/* Atmospheric Orbs */}
                    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full -translate-y-1/2" />
                    <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full translate-y-1/2" />

                    <div className="container relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
                        <Badge className="mb-8 bg-blue-600/90 text-white border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Zap className="w-3.5 h-3.5 mr-2" />
                            Mass Media Archiving
                        </Badge>

                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic leading-tight mb-8 uppercase text-white drop-shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                            Bulk Video <span className="text-blue-400">Downloader</span>
                        </h1>

                        <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
                            <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed drop-shadow-md italic">
                                The most powerful <span className="text-blue-300 font-black">bulk video downloader online</span>. Save entire playlists, profiles, and feeds from YouTube, Instagram, and TikTok in one click.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 pt-4">
                                <Button asChild className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-900/20 active:scale-95 transition-all">
                                    <Link href="/signup" className="flex items-center gap-2">
                                        Start Bulk Downloading <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEO CONTENT SECTION - INDUSTRIAL LAYOUT - OPTIMIZED */}
                <section className="bg-white dark:bg-slate-950 py-12">
                    <div className="container max-w-5xl mx-auto px-4 space-y-10">

                        {/* Introduction Block */}
                        <div className="text-center max-w-3xl mx-auto space-y-4">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none">
                                The Complete <span className="text-blue-600">Bulk Video Downloader</span> Solution
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed">
                                Whether you need a <strong>bulk video downloader for PC</strong>, a robust <strong>bulk video downloader for Android</strong>, or a seamless <strong>bulk video downloader chrome extension</strong>, FSMVID provides the ultimate toolset for mass media acquisition.
                            </p>
                        </div>

                        {/* Feature Cards Grid (Optimized Keywords) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {[
                                {
                                    icon: Youtube,
                                    title: "Bulk Video Downloader YouTube",
                                    desc: "Archive entire channels and playlists. The fastest way to save educational content and entertainment series in 4K.",
                                    color: "text-red-500",
                                    bg: "bg-red-500/10"
                                },
                                {
                                    icon: Instagram,
                                    title: "Bulk Video Downloader Instagram",
                                    desc: "Download all Reels, Stories, and posts from any public profile. Perfect for content creators and social media managers.",
                                    color: "text-pink-500",
                                    bg: "bg-pink-500/10"
                                },
                                {
                                    icon: Video,
                                    title: "Bulk Video Downloader TikTok",
                                    desc: "Mass download TikTok videos without watermarks. Backup entire profiles effortlessly with our specialize batch engine.",
                                    color: "text-slate-900 dark:text-white",
                                    bg: "bg-slate-200 dark:bg-slate-800"
                                },
                                {
                                    icon: Facebook,
                                    title: "Bulk Video Downloader Facebook",
                                    desc: "Save videos from Facebook pages and groups in batch. Ensure you never lose access to important community content.",
                                    color: "text-blue-600",
                                    bg: "bg-blue-600/10"
                                },
                                {
                                    icon: Twitter,
                                    title: "Bulk Video Downloader Twitter",
                                    desc: "Archive media from X (Twitter) profiles and threads efficiently. Capture news and updates in real-time.",
                                    color: "text-sky-500",
                                    bg: "bg-sky-500/10"
                                },
                                {
                                    icon: Share2,
                                    title: "Bulk Video Downloader Pinterest",
                                    desc: "Save pins, boards, and inspiration collections. Ideal for designers and visual archivists.",
                                    color: "text-red-600",
                                    bg: "bg-red-600/10"
                                }
                            ].map((item, index) => (
                                <Card key={index} className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800 hover:scale-[1.02] transition-all duration-300">
                                    <CardContent className="p-5">
                                        <div className={`w-10 h-10 mb-3 rounded-lg ${item.bg} flex items-center justify-center shadow-sm group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500`}>
                                            <item.icon className={`w-5 h-5 ${item.color}`} />
                                        </div>
                                        <h3 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-base mb-2">{item.title}</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-xs">{item.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Detailed SEO Content Section */}
                        <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
                            <CardContent className="p-8 space-y-6">
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/10 to-blue-600/10 text-blue-600 shadow-sm mr-4 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">
                                        Why Use a <span className="text-blue-600">Bulk Video Downloader Online</span>?
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4 text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-xs md:text-sm">
                                        <p className="border-l-2 border-blue-600/10 pl-4">
                                            Managing media content one file at a time is inefficient. A <strong>bulk video downloader online</strong> tool like FSMVID streamlines your workflow by processing multiple links simultaneously. Whether you are archiving a project or backing up your social media, speed is essential.
                                        </p>
                                        <p className="border-l-2 border-blue-600/10 pl-4">
                                            Unlike a basic <strong>bulk video downloader extension</strong> that might slow down your browser, our cloud-based engine handles the heavy processing. This means you get faster downloads without taxing your system's resources, making it the ideal <strong>bulk video downloader for PC</strong> users.
                                        </p>
                                    </div>
                                    <div className="space-y-4 text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-xs md:text-sm">
                                        <p className="border-l-2 border-blue-600/10 pl-4">
                                            For mobile users, our platform acts as a powerful <strong>bulk video downloader for Android</strong>. You don't need to install suspicious apps; simply open your browser and start archiving. We support all major platforms, including a specialized <strong>bulk video downloader for Instagram</strong> and <strong>bulk video downloader for TikTok</strong>.
                                        </p>
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                                            <p className="font-bold mb-1 text-slate-900 dark:text-slate-200 text-xs">Pro Tip:</p>
                                            <p>Use our service to backup your favorite creators' content. Our <strong>bulk video downloader YouTube</strong> integration supports playlists, ensuring you never miss a video.</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Technical Specs / Safety */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-emerald-600/10 p-2 rounded-lg mr-3">
                                            <Shield className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <h3 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-lg">Safe & Secure</h3>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-xs">
                                        Is using a <strong>bulk video downloader safe</strong>? With FSMVID, yes. detailed encryption and proxy layers protect your identity. We are the trusted <strong>bulk video downloader chrome extension</strong> alternative that respects your privacy.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-purple-600/10 p-2 rounded-lg mr-3">
                                            <Zap className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <h3 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-lg">High Speed Engine</h3>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-xs">
                                        Our industrial-grade nodes allow for lightning-fast speeds, making us the premier <strong>bulk video downloader for PC</strong>. Download gigabytes of data in minutes, not hours.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </section>

                {/* NETWORK TIERS (PRICING) - Compact Version */}
                <section className="py-12 bg-slate-50 border-y border-slate-200 dark:bg-slate-900 dark:border-slate-800 relative overflow-hidden">
                    <div className="container mx-auto max-w-7xl px-4 relative z-10">
                        <div className="text-center mb-10 space-y-4">
                            <Badge className="bg-blue-600/10 text-blue-600 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
                                Flexible Pricing
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-tight">Bulk Download <span className="text-blue-600">Packages</span></h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    name: "Basic Saver",
                                    price: "Free",
                                    features: ["5 Credits / Month", "1 Video / Task Limit", "Max File Size: 150MB", "Standard Speed", "320p Max Quality"],
                                    cta: "Start Free",
                                    featured: false
                                },
                                {
                                    name: "Bulk Pro",
                                    price: "$9.99",
                                    features: ["300 Credits / Month", "Batch Size: 10 URLs", "Max Video Size: 1GB", "Max ZIP Size: 2GB", "Ultra-HD Access", "Direct ZIP Export"],
                                    cta: "Get Bulk Pro",
                                    featured: true
                                },
                                {
                                    name: "Archive Elite",
                                    price: "$19.99",
                                    features: ["1000 Credits / Month", "Batch Size: 50 URLs", "Max Video Size: 2GB", "Max ZIP Size: 4GB", "Direct ZIP Export", "24/7 Priority Support"],
                                    cta: "Get Ultimate",
                                    featured: false
                                }
                            ].map((tier, i) => (
                                <Card key={i} className={`relative p-8 rounded-[2rem] flex flex-col border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:translate-y-[-4px] ${tier.featured ? 'bg-blue-600 text-white shadow-xl scale-105 z-10' : 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-lg'}`}>
                                    {tier.featured && (
                                        <Badge className="absolute top-6 right-6 bg-white text-blue-600 border-none px-3 py-1 text-[8px] font-black uppercase tracking-widest shadow-lg">Popular</Badge>
                                    )}
                                    <h4 className={`text-lg font-black uppercase tracking-widest mb-2 italic leading-none ${tier.featured ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{tier.name}</h4>
                                    <div className="mb-8">
                                        <span className="text-4xl font-black tracking-tighter italic leading-none">{tier.price}</span>
                                        {tier.price !== 'Free' && <span className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-2">/ Cycle</span>}
                                    </div>
                                    <ul className="space-y-3 mb-8 flex-grow">
                                        {tier.features.map((f, j) => (
                                            <li key={j} className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest opacity-80 italic ${tier.featured ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                                                <Check className="w-3 h-3 shrink-0" /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button asChild className={`w-full h-10 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 ${tier.featured ? 'bg-white text-blue-600 hover:bg-slate-50' : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900'}`}>
                                        <Link href={getBulkPlanAction(tier)}>
                                            {tier.cta}
                                        </Link>
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Credit Calculator Section */}
                <CreditPurchaseCalculator />

                {/* FAQ SECTION - Optimized */}
                <section className="py-16 bg-white dark:bg-slate-950 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <div className="text-center mb-12 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-tight">Common <span className="text-blue-600">Questions</span></h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium italic text-sm">Answers regarding our <strong>bulk video downloader online</strong> service.</p>
                        </div>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {[
                                {
                                    q: "How do your credits work?",
                                    a: "Our system uses 'vCredits' as a currency for processing power. Each operation (like downloading a video or converting a format) costs a specific number of credits based on complexity and file size. You purchase credits in packs or subscribe to a monthly refill plan."
                                },
                                {
                                    q: "How much does each credit cost?",
                                    a: "Credit cost depends on your package. In our 'Bulk Pro' plan ($9.99 for 300 credits), each credit costs approximately $0.033. Larger packs like 'Archive Elite' offer significant bulk discounts, bringing the cost down further to under $0.02 per credit."
                                },
                                {
                                    q: "How many videos can I download per 1 credit?",
                                    a: "Our system is highly efficient: 1 Credit typically allows you to download 2 Standard Videos (up to 1080p). Exceptionally large files (4K/Long-form) may cost 1 full credit or more depending on bandwidth."
                                },
                                {
                                    q: "How do I use this bulk video downloader for PC?",
                                    a: "Simply log in to your dashboard on your desktop browser. Our interface is optimized for PC use, allowing you to paste lists of URLs and manage large batch downloads efficiently."
                                },
                                {
                                    q: "Is there a bulk video downloader for Android app?",
                                    a: "You don't need a separate app. Our platform is fully responsive and acts as a web-based bulk video downloader for Android, working perfectly in mobile Chrome or Firefox."
                                },
                                {
                                    q: "Does the bulk video downloader Instagram tool save private accounts?",
                                    a: "We respect privacy laws. You can only bulk download content from public Instagram profiles or accounts that you have authorized access to."
                                },
                                {
                                    q: "Can I use this as a bulk video downloader Chrome extension replacement?",
                                    a: "Absolutely. Browsers extensions often slow down your computer. Our cloud-based solution offers the same functionality—saving videos in batches—without installing 3rd party software."
                                }
                            ].map((faq, i) => (
                                <AccordionItem key={i} value={`item-${i}`} className="border-none bg-slate-50 dark:bg-slate-900/80 rounded-[1.5rem] px-6 transition-all hover:bg-white hover:shadow-lg border border-transparent hover:border-slate-100 dark:hover:border-slate-700 overflow-hidden group">
                                    <AccordionTrigger className="hover:no-underline py-5">
                                        <span className="text-left font-black tracking-tight text-slate-800 dark:text-white uppercase text-xs italic leading-tight group-hover:text-blue-600 transition-colors">{faq.q}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-6 text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic text-xs border-t border-slate-200 dark:border-slate-800 pt-4">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* FINAL CTA - Optimized */}
                <section className="container mx-auto max-w-5xl px-4 mb-20">
                    <div className="text-center p-8 md:p-10 rounded-[2rem] bg-blue-600 relative overflow-hidden shadow-2xl shadow-blue-600/30 group">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-white/20 transition-all duration-1000" />
                        <div className="relative z-10 space-y-6">
                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter italic leading-none uppercase">Start Your Bulk Download</h2>
                            <p className="text-blue-100 text-sm font-medium max-w-lg mx-auto italic">Access the most advanced <strong>bulk video downloader online</strong>.</p>
                            <Button asChild className="h-10 px-6 rounded-full bg-white hover:bg-slate-50 text-blue-600 font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all">
                                <Link href="/signup" className="flex items-center gap-3">Start Downloading <ArrowRight className="w-3 h-3" /></Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
