import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Check,
  Sparkles,
  ArrowRight,
  Youtube,
  Instagram,
  Twitter,
  PlayCircle,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Zap,
  Code,
  Shield,
  Layers,
  Search,
  BookOpen
} from "lucide-react";
import HeroSectionStyles from "@/components/content/hero-section-styles";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | FSMVID",
  description:
    "Find answers to common questions about our Free Social Media Video Downloader tool and how to download content from various social media platforms.",
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-blue-500/30">
      {/* Elite FAQ Hero - Match Privacy Policy Style */}
      <section className="relative min-h-[50vh] overflow-hidden flex flex-col items-center justify-center pt-32 pb-20 px-4 mb-8 group">
        <HeroSectionStyles />

        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/pages.png"
            alt="FAQ Hero Background"
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
            <HelpCircle className="w-3.5 h-3.5 mr-2" />
            Help Center
          </Badge>

          <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic leading-tight mb-8 uppercase text-white drop-shadow-2xl">
            Frequently Asked <span className="text-blue-400">Questions</span>
          </h1>

          <div className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed drop-shadow-md">
              Find quick answers to common questions about our video downloader tool.
              <br />
              <span className="text-base text-blue-200 italic">Everything you need to know in one place.</span>
            </p>
          </div>
        </div>
      </section>

      <div className="container relative z-20 max-w-6xl mx-auto px-6 -mt-16 pb-32">
        {/* Quick Protocol Navigation Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {[
            { icon: Zap, title: "Operations", desc: "How to use our high-speed extraction nodes.", color: "text-blue-500" },
            { icon: ShieldCheck, title: "Security", desc: "Our end-to-end encryption protocols.", color: "text-emerald-500" }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-900/80 backdrop-blur-2xl p-6 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none hover:translate-y-[-10px] transition-all duration-700 group flex items-start gap-6 cursor-default">
              <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl group-hover:bg-blue-600 transition-all duration-500 shadow-inner group-hover:scale-110 group-hover:rotate-6">
                <item.icon className="w-5 h-5 text-slate-900 dark:text-white group-hover:text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Specialized FAQ Modules */}
        <Tabs defaultValue="general" className="w-full">
          <div className="flex justify-center mb-24">
            <TabsList className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl p-2 rounded-[2.5rem] shadow-3xl dark:shadow-none border border-slate-200 dark:border-white/5 h-auto inline-grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="general" className="rounded-full h-12 px-6 font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl shadow-blue-600/30 transition-all">General</TabsTrigger>
              <TabsTrigger value="technical" className="rounded-full h-12 px-6 font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl shadow-blue-600/30 transition-all">Technical</TabsTrigger>
              <TabsTrigger value="bulk" className="rounded-full h-12 px-6 font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl shadow-blue-600/30 transition-all">Bulk</TabsTrigger>
              <TabsTrigger value="legal" className="rounded-full h-12 px-6 font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl shadow-blue-600/30 transition-all">Legal</TabsTrigger>
              <TabsTrigger value="platforms" className="rounded-full h-12 px-6 font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl shadow-blue-600/30 transition-all">Platforms</TabsTrigger>
            </TabsList>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {/* GENERAL PROTOCOL */}
            <TabsContent value="general">
              <Card className="border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] dark:shadow-none rounded-[2.5rem] bg-white dark:bg-slate-900/50 backdrop-blur-xl overflow-hidden border border-slate-100 dark:border-white/5">
                <div className="p-6 md:p-8 border-b border-slate-50 dark:border-white/5 bg-slate-50/30 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600/10 p-3 rounded-xl">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <Badge className="bg-blue-600/10 text-blue-600 border-none px-3 py-0.5 text-[8px] font-black uppercase tracking-widest mb-1">Core Node</Badge>
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Operational FAQ</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 md:p-8">
                  <Accordion type="single" collapsible className="w-full space-y-6">
                    {[
                      { q: "Is this service free to use?", a: "Yes, our downloader tool is completely free to use. There are no hidden fees or subscriptions required." },
                      { q: "Which platforms are supported?", a: "We support downloading content from YouTube, TikTok, Facebook, Twitter, Instagram, Dailymotion, Telegram, Tumblr, Snapchat, Pinterest, LinkedIn, Imgur, and Rumble." },
                      { q: "What types of content can I download?", a: "Depending on the platform, you can download videos, images, GIFs, and other media content. Each platform has different content types available for download." },
                      { q: "Do I need to create an account to use the service?", a: "No, you don't need to create an account or register to use our downloader tool. Simply paste the URL and start downloading." },
                      { q: "Is there a limit to how many downloads I can make?", a: "There are no strict limits on the number of downloads, but we do implement fair usage policies to ensure the service remains available to everyone." }
                    ].map((faq, i) => (
                      <AccordionItem key={i} value={`item-${i}`} className="border-none bg-slate-50/50 dark:bg-white/[0.03] rounded-2xl px-6 transition-all hover:bg-white dark:hover:bg-white/5 hover:shadow-xl hover:translate-x-1 border border-transparent hover:border-slate-100 dark:hover:border-white/10 group">
                        <AccordionTrigger className="hover:no-underline font-black italic uppercase text-xs tracking-[0.15em] py-4 text-slate-800 dark:text-slate-100 text-left">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic pb-6 text-sm border-l-2 border-blue-600/30 pl-6 ml-1">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TECHNICAL PROTOCOL */}
            <TabsContent value="technical">
              <Card className="border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] dark:shadow-none rounded-[2.5rem] bg-white dark:bg-slate-900/50 backdrop-blur-xl overflow-hidden border border-slate-100 dark:border-white/5">
                <div className="p-6 md:p-8 border-b border-slate-50 dark:border-white/5 bg-slate-50/30 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-600/10 p-3 rounded-xl">
                      <Code className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <Badge className="bg-purple-600/10 text-purple-600 border-none px-3 py-0.5 text-[8px] font-black uppercase tracking-widest mb-1">Engines Node</Badge>
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Technical Protocols</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 md:p-8">
                  <Accordion type="single" collapsible className="w-full space-y-6">
                    {[
                      { q: "Why isn't my download working?", a: "There could be several reasons: the content might be private, the URL might be incorrect, or the platform might have updated its structure. Try refreshing the page and checking your URL. If issues persist, contact our support." },
                      { q: "What quality options are available?", a: "We offer various quality options depending on the original content and platform. For videos, we typically provide options from low to high definition (HD) when available." },
                      { q: "Can I download content on mobile devices?", a: "Yes, our downloader works on all devices including smartphones and tablets. The process is the same - just paste the URL and download." },
                      { q: "How do I save the downloaded content?", a: "After clicking the download button, your browser will either automatically save the file to your default download location or prompt you to choose where to save it." },
                      { q: "What browsers are supported?", a: "Our downloader works with all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend keeping your browser updated to the latest version for the best experience." }
                    ].map((faq, i) => (
                      <AccordionItem key={i} value={`item-${i}`} className="border-none bg-slate-50/50 dark:bg-white/[0.03] rounded-[2rem] px-8 transition-all hover:bg-white dark:hover:bg-white/5 hover:shadow-xl hover:translate-x-2 border border-transparent hover:border-slate-100 dark:hover:border-white/10 group">
                        <AccordionTrigger className="hover:no-underline font-black italic uppercase text-xs tracking-[0.15em] py-6 text-slate-800 dark:text-slate-100 text-left">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic pb-8 text-base border-l-2 border-purple-600/30 pl-6 ml-1">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* BULK PROTOCOL */}
            <TabsContent value="bulk">
              <Card className="border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] dark:shadow-none rounded-[2.5rem] bg-white dark:bg-slate-900/50 backdrop-blur-xl overflow-hidden border border-slate-100 dark:border-white/5">
                <div className="p-6 md:p-8 border-b border-slate-50 dark:border-white/5 bg-slate-50/30 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600/10 p-3 rounded-xl">
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <Badge className="bg-blue-600/10 text-blue-600 border-none px-3 py-0.5 text-[8px] font-black uppercase tracking-widest mb-1">Efficiency Node</Badge>
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Bulk Operations</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 md:p-8">
                  <Accordion type="single" collapsible className="w-full space-y-6">
                    {[
                      { q: "How many URLs can I process at once?", a: "The bulk downloader is designed to handle multiple links simultaneously. While there is no hard cap, processing 10-20 links per batch ensures the best stability and speed." },
                      { q: "Can I mix URLs from different platforms?", a: "Currently, our bulk engine works best when processing URLs from the same platform in a single batch (e.g., all Instagram or all TikTok) to ensure consistent quality selection." },
                      { q: "How do I download the entire batch?", a: "Once the processing is complete for all links in your batch, you can download them one by one or use a download manager to capture all generated direct links." },
                      { q: "Why is the bulk process slower than single download?", a: "Batch processing requires our server nodes to establish multiple concurrent handshakes with social media APIs. Large 4K or HD files will naturally take longer to synchronize and process." },
                      { q: "Can I choose different qualities for each bulk link?", a: "In bulk mode, you select a global quality preference (e.g., 'Best Available') which our engine will attempt to apply to every video in the batch automatically." }
                    ].map((faq, i) => (
                      <AccordionItem key={i} value={`item-${i}`} className="border-none bg-slate-50/50 dark:bg-white/[0.03] rounded-2xl px-6 transition-all hover:bg-white dark:hover:bg-white/5 hover:shadow-xl hover:translate-x-1 border border-transparent hover:border-slate-100 dark:hover:border-white/10 group">
                        <AccordionTrigger className="hover:no-underline font-black italic uppercase text-xs tracking-[0.15em] py-4 text-slate-800 dark:text-slate-100 text-left">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic pb-6 text-sm border-l-2 border-blue-600/30 pl-6 ml-1">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* LEGAL PROTOCOL */}
            <TabsContent value="legal">
              <Card className="border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] dark:shadow-none rounded-[2.5rem] bg-white dark:bg-slate-900/50 backdrop-blur-xl overflow-hidden border border-slate-100 dark:border-white/5">
                <div className="p-6 md:p-8 border-b border-slate-50 dark:border-white/5 bg-slate-50/30 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-600/10 p-3 rounded-xl">
                      <Shield className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <Badge className="bg-emerald-600/10 text-emerald-600 border-none px-3 py-0.5 text-[8px] font-black uppercase tracking-widest mb-1">Policy Node</Badge>
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Legal Repository</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 md:p-8">
                  <Accordion type="single" collapsible className="w-full space-y-6">
                    {[
                      { q: "Is it legal to download content?", a: "Our tool is designed for downloading content for personal use only. Please respect copyright laws and the terms of service of the platforms you're downloading from. Do not download or distribute copyrighted content without permission." },
                      { q: "Can I use downloaded content commercially?", a: "Generally, no. Most content on social media platforms is protected by copyright, and downloading it doesn't give you the right to use it commercially. Always obtain proper permissions or licenses from the content creator before using downloaded content for commercial purposes." },
                      { q: "Do you store the content I download?", a: "No, we don't store any of the content you download. Our service acts as a bridge between you and the platform, but we don't keep copies of the downloaded files on our servers." },
                      { q: "What data do you collect about users?", a: "We collect minimal data necessary for the service to function, such as temporary logs of download requests. We don't collect personal information or track individual user behavior. Please refer to our Privacy Policy for more details." }
                    ].map((faq, i) => (
                      <AccordionItem key={i} value={`item-${i}`} className="border-none bg-slate-50/50 dark:bg-white/[0.03] rounded-[2rem] px-8 transition-all hover:bg-white dark:hover:bg-white/5 hover:shadow-xl hover:translate-x-2 border border-transparent hover:border-slate-100 dark:hover:border-white/10 group">
                        <AccordionTrigger className="hover:no-underline font-black italic uppercase text-xs tracking-[0.15em] py-6 text-slate-800 dark:text-slate-100 text-left">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic pb-8 text-base border-l-2 border-emerald-600/30 pl-6 ml-1">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* PLATFORMS PROTOCOL */}
            <TabsContent value="platforms">
              <Card className="border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] dark:shadow-none rounded-[2.5rem] bg-white dark:bg-slate-900/50 backdrop-blur-xl overflow-hidden border border-slate-100 dark:border-white/5">
                <div className="p-6 md:p-8 border-b border-slate-50 dark:border-white/5 bg-slate-50/30 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-600/10 p-3 rounded-xl">
                      <Sparkles className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <Badge className="bg-orange-600/10 text-orange-600 border-none px-3 py-0.5 text-[8px] font-black uppercase tracking-widest mb-1">Network Node</Badge>
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Platform Handshakes</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 md:p-8">
                  <Accordion type="single" collapsible className="w-full space-y-6">
                    {[
                      { q: "How do I download YouTube videos?", a: "Copy the YouTube video URL, paste it into our downloader, select quality/format, and click download. For more detailed instructions, visit our YouTube downloader page." },
                      { q: "Can I download TikTok videos without watermark?", a: "Yes, our TikTok downloader removes the watermark from videos, giving you clean videos for personal use." },
                      { q: "How do I download Instagram stories?", a: "You can download public Instagram stories by copying the profile URL and pasting it into our downloader. Note that private stories cannot be downloaded." },
                      { q: "Can I download Facebook private videos?", a: "No, our tool can only download publicly available Facebook videos. Private videos requiring login cannot be accessed by our downloader." },
                      { q: "How do I download Twitter/X videos?", a: "Copy the tweet URL containing the video, paste it into our downloader, and click download. Our tool works with both Twitter.com and X.com URLs." }
                    ].map((faq, i) => (
                      <AccordionItem key={i} value={`item-${i}`} className="border-none bg-slate-50/50 dark:bg-white/[0.03] rounded-[2rem] px-8 transition-all hover:bg-white dark:hover:bg-white/5 hover:shadow-xl hover:translate-x-2 border border-transparent hover:border-slate-100 dark:hover:border-white/10 group">
                        <AccordionTrigger className="hover:no-underline font-black italic uppercase text-xs tracking-[0.15em] py-6 text-slate-800 dark:text-slate-100 text-left">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic pb-8 text-base border-l-2 border-orange-600/30 pl-6 ml-1">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        {/* Support CTA Node - DARK HIGH-END SECTION */}
        <Card className="mt-16 border-none shadow-[0_60px_120px_-20px_rgba(37,99,235,0.3)] dark:shadow-none rounded-[2.5rem] bg-slate-900 text-white overflow-hidden p-8 md:p-12 text-center relative group">
          {/* Animated Background Orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/30 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-600/40 transition-all duration-1000" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 group-hover:bg-indigo-600/30 transition-all duration-1000" />

          <div className="relative z-10 space-y-6">
            <div className="bg-white/5 backdrop-blur-2xl inline-flex p-3 rounded-2xl mb-2">
              <MessageCircle className="w-6 h-6 text-blue-400 shadow-glow" />
            </div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter italic uppercase leading-[0.9]">
              STILL UNABLE TO <br /><span className="text-blue-500 underline decoration-blue-500/20 underline-offset-8">SYNCHRONIZE?</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-xl mx-auto italic text-sm leading-relaxed">
              If your specific query is not indexed in our archive, initialize a direct liaison with our support nodes for a human response.
            </p>
            <div className="pt-4">
              <Button
                asChild
                className="h-14 px-10 rounded-[1.5rem] bg-white hover:bg-white/90 text-slate-900 font-black uppercase text-[10px] tracking-[0.25em] shadow-3xl hover:shadow-white/10 active:scale-95 transition-all duration-500"
              >
                <Link href="/contact" className="flex items-center gap-6">
                  OPEN COMMS CHANNEL <ArrowRight className="w-4 h-4 text-blue-600" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
