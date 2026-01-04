"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Shield, Zap, Globe, Award, Info, HelpCircle, Settings, Edit3, TrendingUp, ListChecks, AlertTriangle, ThumbsUp, BookOpen } from "lucide-react";
import { InterlinkText } from "@/lib/interlink-tools";

const SectionCard = ({ title, icon: Icon, children, iconBgGradient = "from-blue-600/10 to-blue-600/10", cardBgClass = "bg-white", titleClassName = "text-xl md:text-2xl" }: { title?: string, icon?: React.ElementType, children: React.ReactNode, iconBgGradient?: string, cardBgClass?: string, titleClassName?: string }) => (
    <Card className={`border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card ${cardBgClass} dark:bg-slate-900 dark:border-slate-800`}>
        <CardContent className="p-8 md:p-10">
            {title && (
                <div className="flex items-center mb-8">
                    {Icon && (
                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${iconBgGradient} text-blue-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500`}>
                            <Icon className="w-6 h-6" />
                        </div>
                    )}
                    <h2 className={`font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none ${titleClassName}`}>{title}</h2>
                </div>
            )}
            <div className="space-y-4 text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm">
                {children}
            </div>
        </CardContent>
    </Card>
);

const SubSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-[10px] font-black italic uppercase tracking-[0.15em] text-slate-900 dark:text-slate-200 mt-8 mb-4 flex items-center gap-3">
        <span className="w-6 h-[1.5px] bg-blue-600 rounded-full" />
        {children}
    </h3>
);

const renderStyledList = (items: (string | React.ReactNode)[]) => (
    <ul className="space-y-3 mb-4">
        {items.map((item, index) => (
            <li key={index} className="flex items-start bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-[10px] md:text-xs font-black italic uppercase tracking-tight text-slate-900 dark:text-slate-200">
                    {typeof item === 'string' ? <span dangerouslySetInnerHTML={{ __html: item }} /> : item}
                </span>
            </li>
        ))}
    </ul>
);

export const ImdbSEOContent = () => {
  const platform = "imdb";

  return (
    <div className="w-screen bg-slate-50 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <section className="py-24">
        <div className="container px-6 mx-auto max-w-7xl">
                                                            <div className="text-center mb-16 space-y-4">
                        <Badge className="bg-blue-600/10 text-blue-600 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
                            Deep Dive
                        </Badge>
                        <h2 className="text-xl md:text-3xl font-black tracking-tighter italic uppercase text-slate-900 leading-[0.9]">
                            Imdb Video <span className="text-blue-600">Downloader</span>
                        </h2>
                    </div>
                              

<div className="space-y-12 max-w-4xl mx-auto">
            <SectionCard
                icon={Info}
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
            >
                            <div className="space-y-4">
<p className="text-slate-500 font-medium italic leading-relaxed text-sm border-l-2 border-blue-600/10 pl-6">
                                    Are you frustrated with buffering issues when trying to watch movie trailers, celebrity interviews, or behind-the-scenes content on IMDb?
                                </p>
<p className="text-slate-500 font-medium italic leading-relaxed text-sm border-l-2 border-blue-600/10 pl-6">
                                    Do you want to save your favorite IMDb videos for offline viewing without depending on internet connectivity? You&apos;ve found the perfect solution!
                                </p>
<p className="text-slate-500 font-medium italic leading-relaxed text-sm border-l-2 border-blue-600/10 pl-6">
                                    Our free IMDb video downloader at <InterlinkText currentPlatform={platform}>fsmvid</InterlinkText>, transforms how you access and enjoy IMDb content by letting you download videos directly to your device.
                                </p>
<p className="text-slate-500 font-medium italic leading-relaxed text-sm border-l-2 border-blue-600/10 pl-6">
                                    We understand the challenges movie enthusiasts face when streaming content online. Slow internet connections, annoying advertisements, and limited offline access can ruin your entertainment experience. That&apos;s why we&apos;ve developed this powerful tool that puts you in complete control of your IMDb video collection.
                                </p>
                            </div>
                        </SectionCard>

            <SectionCard
                title="Why Choose fsmvid's IMDb Video Downloader?"
                icon={Star}
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
            >
                <SubSectionTitle>Experience Unmatched Convenience</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    If you're planning a long flight and want to catch up on the latest movie trailers, or perhaps you've discovered an exclusive interview with your favorite actor that you'd love to watch repeatedly. With our IMDb video downloader, you can save these videos directly to your smartphone, tablet, or laptop with just a few simple clicks.
                </p>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Our tool eliminates the frustration of poor streaming quality and unexpected interruptions. Whether you're commuting, traveling, or simply relaxing at home without reliable internet, you'll have instant access to your downloaded IMDb content. No more waiting for videos to buffer or worrying about data usage limits.
                </p>

                <SubSectionTitle>Skip the Ads, Enjoy Pure Content</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    One of the most annoying aspects of online video streaming is dealing with advertisements that interrupt your viewing experience. When you download IMDb videos using our tool, you get clean, ad-free content that you can enjoy without any distractions. This means uninterrupted movie trailers, interviews, and exclusive content exactly as intended.
                </p>

                <SubSectionTitle>Superior Video Quality Options</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-6">
                    We believe you shouldn't compromise on video quality when downloading content. Our IMDb video downloader supports multiple resolution options, from standard definition to crystal-clear HD formats. You can download and save IMDb videos in various qualities like SD, HD 480P/720P, Full HD 1080P, 4K, and 8K if available. Choose the quality that best matches your device capabilities and storage preferences.
                </p>
            </SectionCard>

            <SectionCard
                title="How Our IMDb Video Downloader Works?"
                icon={Zap}
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
            >
                <SubSectionTitle>Simple Three-Step Process</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    We've designed our IMDb video downloader with simplicity in mind. Here's how you can start downloading your favorite IMDb videos in minutes:
                </p>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">Find Your Video</h3>
                        <p>Navigate to <a href="https://www.imdb.com/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">IMDb</a> and locate the video you want to download. This could be a movie trailer, celebrity interview, behind-the-scenes footage, or any other video content available on the platform.</p>
                    </div>
                    <div>
                        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">Copy the Video URL</h3>
                        <p>Once you've found your desired video, copy its URL from your browser's address bar. This link contains all the information our downloader needs to process your request.</p>
                    </div>
                    <div>
                        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">Download with fsmvid</h3>
                        <p>Visit our IMDb video downloader page, paste the copied URL into the input field, select your preferred video format and quality, then click the “Download Now” button. Your video will begin downloading immediately to your chosen device.</p>
                    </div>
                </div>
                <SubSectionTitle>Cross-Platform Compatibility</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-6">
                    It does not matter if your operating system is Android or iOS, Windows, Mac, or Linux. All you need to download the video from IMDb is a web browser and a video link! Our tool works seamlessly across all devices and operating systems, ensuring everyone can access their favorite IMDb content regardless of their preferred technology.
                </p>
            </SectionCard>

            <SectionCard
                title="Key Features That Set Us Apart"
                icon={Award}
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
            >
                <SubSectionTitle>User-Friendly Interface</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    We've invested considerable effort in creating an intuitive interface that anyone can use, regardless of their technical expertise. Clean layouts, clear instructions, and straightforward navigation ensure you'll never feel overwhelmed or confused when using our IMDb video downloader.
                </p>

                <SubSectionTitle>Multiple Format Support</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Understanding that different users have varying needs, our downloader supports numerous video formats, including MP4, AVI, MOV, and more. This flexibility ensures compatibility with your preferred media players and devices.
                </p>

                <SubSectionTitle>Fast Download Speeds</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Time is valuable, and we respect that. Our optimized servers deliver fast download speeds, allowing you to quickly save multiple IMDb videos without lengthy waiting periods. Large files that might take hours to stream can be downloaded in minutes.
                </p>

                <SubSectionTitle>Complete Safety and Security</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Your digital security is our top priority. Our IMDb video downloader employs advanced security protocols to protect your device from malware and unwanted software. We never require personal information registration, ensuring your privacy remains intact throughout the download process.
                </p>

                <SubSectionTitle>No Software Installation Required</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-6">
                    Unlike many video downloaders that require software installation, our web-based tool works directly in your browser. This means no cluttered desktop applications, no automatic updates, and no concerns about system compatibility issues.
                </p>
            </SectionCard>

            <SectionCard
                title="Popular IMDb Content You Can Download"
                icon={BookOpen}
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
            >
                <SubSectionTitle>Movie Trailers and Teasers</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Stay updated with the latest Hollywood releases by downloading high-quality movie trailers. From blockbuster action films to indie productions, you can build a comprehensive collection of trailers to watch whenever inspiration strikes.
                </p>

                <SubSectionTitle>Celebrity Interviews and Red Carpet Events</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Access exclusive interviews with your favorite actors, directors, and industry professionals. These personal insights and behind-the-scenes conversations provide unique perspectives on the entertainment industry.
                </p>

                <SubSectionTitle>Behind-the-Scenes Content</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Discover how your favorite movies are made with behind-the-scenes footage, director commentaries, and production diaries. This content offers fascinating glimpses into the creative process behind major film productions.
                </p>

                <SubSectionTitle>Awards Show Highlights</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-6">
                    Never miss memorable moments from prestigious awards ceremonies. Download acceptance speeches, performance highlights, and red carpet coverage to relive these special entertainment industry celebrations.
                </p>
            </SectionCard>

            <SectionCard
                title="Technical Specifications and Requirements"
                icon={Settings}
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
            >
                <SubSectionTitle>Minimum System Requirements</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Our IMDb video downloader works with minimal system requirements, making it accessible to users with older devices. You need:
                </p>
                {renderStyledList([
                    "Any modern web browser (Chrome, Firefox, Safari, Edge).",
                    "A stable internet connection is required for the download process.",
                    "Sufficient storage space for your chosen video files."
                ])}

                <SubSectionTitle>Supported Video Formats</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    We support all major video formats to ensure maximum compatibility:
                </p>
                {renderStyledList([
                    "MP4: Most universally compatible format.",
                    "AVI: High-quality format preferred by many users.",
                    "MOV: Apple's QuickTime format.",
                    "WMV: Windows Media Video format.",
                    "FLV: Flash Video format for smaller file sizes."
                ])}
            </SectionCard>

            <SectionCard
                title="Best Practices for Using IMDb Video Downloader"
                icon={ThumbsUp}
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
            >
                <SubSectionTitle>Organize Your Downloaded Content</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Create a systematic folder structure on your device to organize downloaded IMDb videos. Consider categorizing by genre, release date, or content type (trailers, interviews, behind-the-scenes). This organization makes it easier to locate specific videos later and prevents your downloads from becoming cluttered.
                </p>

                <SubSectionTitle>Choose Appropriate Quality Settings</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Balance video quality with storage space requirements. For mobile viewing, 720p HD often provides excellent quality without consuming excessive storage. Reserve 1080p or 4K downloads for content you plan to watch on larger screens or keep permanently in your collection.
                </p>

                <SubSectionTitle>Regular Maintenance</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-6">
                    Periodically review your downloaded video collection and remove content you no longer need. This practice keeps your device storage optimized and ensures you have space for new downloads.
                </p>
            </SectionCard>

            <SectionCard
                title="Final Thoughts"
                icon={Globe}
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
            >
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    The <InterlinkText currentPlatform={platform}>Fsmvid</InterlinkText> IMDb video downloader represents the perfect solution for movie enthusiasts who want complete control over their entertainment experience. By eliminating the frustrations of streaming limitations, connectivity issues, and intrusive advertisements, we've created a tool that truly enhances how you consume IMDb content.
                </p>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Whether you're a casual movie fan who occasionally downloads trailers or a dedicated cinephile building an extensive video library, our downloader adapts to your specific needs. The combination of user-friendly design, robust security measures, and comprehensive format support makes it the ideal choice for accessing IMDb content offline.
                </p>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-6">
                    Don't let poor internet connections or streaming limitations prevent you from enjoying your favorite IMDb videos. Take control of your entertainment experience today with our free, reliable, and secure IMDb video downloader. Start building your collection of movie trailers, interviews, and exclusive content that you can access anytime, anywhere, without restrictions.
                </p>
            </SectionCard>
          </div>
        </div>
      </section>
    </div>
  );
};