"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Shield, Zap, Globe, Award, Info, HelpCircle, Settings, Edit3, TrendingUp, ListChecks, AlertTriangle, ThumbsUp, BookOpen } from "lucide-react";
import { InterlinkText } from "@/lib/interlink-tools";

const SectionCard = ({ title, icon: Icon, children, iconBgGradient = "from-gray-500 to-gray-600", cardBgClass = "bg-gray-50 dark:bg-slate-800", titleClassName = "text-xl lg:text-2xl" }: {title?: string, icon?: React.ElementType, children: React.ReactNode, iconBgGradient?: string, cardBgClass?: string, titleClassName?: string }) => (
    <Card className={`border border-gray-200 dark:border-slate-700 shadow-sm ${cardBgClass}`}>
      <CardContent className="p-6 md:p-8">
        {title && Icon && (
          <div className="flex items-center mb-6">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${iconBgGradient} text-white shadow-sm mr-4`}>
              <Icon className="w-5 h-5" />
            </div>
            <h2 className={`${titleClassName} font-semibold text-gray-900 dark:text-white`}>{title}</h2>
          </div>
        )}
        <div className="space-y-4 text-gray-900 dark:text-white leading-relaxed">
          {children}
        </div>
      </CardContent>
    </Card>
);

const SubSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3 pt-2">{children}</h3>
);

const renderStyledList = (items: (string | React.ReactNode)[]) => (
    <ul className="space-y-2 mb-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-3 mt-1 shrink-0" />
          {typeof item === 'string' ? <span className="text-gray-900 dark:text-white leading-relaxed" dangerouslySetInnerHTML={{ __html: item }}></span> : <span className="text-gray-900 dark:text-white leading-relaxed">{item}</span>}
        </li>
      ))}
    </ul>
);

export const ImdbSEOContent = () => {
  const platform = "imdb";

  return (
    <div className="w-full">
      <div className="container px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="space-y-8 md:space-y-10 py-12 md:py-16">
            <SectionCard
                icon={Info}
                iconBgGradient="from-green-500 to-emerald-600"
                cardBgClass="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <div className="text-center">
                    <Badge className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20 px-4 py-1 text-xs font-semibold">
                        About IMDb Video Downloader
                    </Badge>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Free IMDb Video Downloader</h1>
                </div>
                <p className="text-lg md:text-xl text-gray-900 dark:text-white mb-4 leading-relaxed">
                    Are you frustrated with buffering issues when trying to watch movie trailers, celebrity interviews, or behind-the-scenes content on IMDb?
                </p>
                <p className="text-lg md:text-xl text-gray-900 dark:text-white mb-4 leading-relaxed">
                    Do you want to save your favorite IMDb videos for offline viewing without depending on internet connectivity? You've found the perfect solution!
                </p>
                <p className="text-lg md:text-xl text-gray-900 dark:text-white mb-4 leading-relaxed">
                    Our free IMDb video downloader at <InterlinkText currentPlatform={platform}>fsmvid</InterlinkText>, transforms how you access and enjoy IMDb content by letting you download videos directly to your device.
                </p>
                <p className="text-lg md:text-xl text-gray-900 dark:text-white mb-4 leading-relaxed">
                    We understand the challenges movie enthusiasts face when streaming content online. Slow internet connections, annoying advertisements, and limited offline access can ruin your entertainment experience. That's why we've developed this powerful tool that puts you in complete control of your IMDb video collection.
                </p>
            </SectionCard>

            <SectionCard
                title="Why Choose fsmvid's IMDb Video Downloader?"
                icon={Star}
                iconBgGradient="from-blue-500 to-indigo-600"
                cardBgClass="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/70"
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
                iconBgGradient="from-purple-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
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
                iconBgGradient="from-green-500 to-emerald-600"
                cardBgClass="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70"
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
                iconBgGradient="from-purple-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
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
                iconBgGradient="from-amber-500 to-yellow-600"
                cardBgClass="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-800/70"
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
                iconBgGradient="from-teal-500 to-cyan-600"
                cardBgClass="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70"
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
                iconBgGradient="from-sky-500 to-blue-600"
                cardBgClass="bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70"
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
    </div>
  );
};
