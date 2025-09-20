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
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          {children}
        </div>
      </CardContent>
    </Card>
);

const SubSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3 pt-2">{children}</h3>
);

const renderStyledList = (items: (string | React.ReactNode)[]) => (
    <ul className="space-y-2 mb-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-3 mt-1 shrink-0" />
          {typeof item === 'string' ? <span className="text-gray-700 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: item }}></span> : <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>}
        </li>
      ))}
    </ul>
);

export const YouTubeSEOContent = () => {
  const platform = "youtube";
  
  return (
    <div className="w-full">
      <div className="container px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="space-y-8 md:space-y-10 py-12 md:py-16">
            <SectionCard 
                icon={Info}
                iconBgGradient="from-green-500 to-emerald-600"
                cardBgClass="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <Badge className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20 px-4 py-1 text-xs font-semibold">
                    About YouTube Video Downloader
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">YouTube Video Downloader</h1>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    <InterlinkText currentPlatform={platform}>
                        Ever wanted to watch a favorite YouTube video offline? Or save a crucial tutorial before it disappears? YouTube video downloaders make this possible.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <InterlinkText currentPlatform={platform}>
                        This guide explores YouTube downloaders, highlighting FSMVID – a free tool designed for easy YouTube video downloading.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="What Is a YouTube Video Downloader?" 
                icon={Star} 
                iconBgGradient="from-blue-500 to-indigo-600"
                cardBgClass="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        A YouTube video downloader is a tool allowing you to save YouTube videos directly to your device for offline viewing. Simple, yet incredibly useful.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Imagine seamless playback on flights or in areas with poor internet – no buffering, just your downloaded HD videos ready to watch.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <strong>Why download YouTube videos? Key benefits include:</strong>
                </p>
                {renderStyledList([
                    "Easy reference for tutorials or educational content.",
                    "Archiving videos that might be removed later.",
                    "Saving mobile data by watching pre-downloaded content.",
                    "Uninterrupted HD viewing in low-connectivity zones.",
                    "Converting videos to audio (MP3) for listening on the go."
                ])}
            </SectionCard>

            <SectionCard 
                title="FSMVID: Your Free YouTube Downloader Solution" 
                icon={Award} 
                iconBgGradient="from-green-500 to-emerald-600"
                cardBgClass="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        FSMVID is a user-friendly YouTube video downloader tool currently under development, focused on simplicity and efficiency.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    <InterlinkText currentPlatform={platform}>
                        It stands out by being completely 
                    </InterlinkText>
                    <strong>free</strong>
                    <InterlinkText currentPlatform={platform}>
                        , avoiding intrusive ads, and requiring no software installation. Just paste the YouTube URL and download.
                    </InterlinkText>
                </p>
                <SubSectionTitle>Key Features of FSMVID YouTube Video Downloader</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Here's what makes FSMVID a great choice for downloading YouTube content:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    <strong>Multiple Resolution Options:</strong>,
                    "Download in qualities from 360p up to 1080p HD and even 4K (if available).",
                    <strong>Format Flexibility:</strong>,
                    "Choose MP4 or WebM video formats, or extract audio as MP3.",
                    <strong>No Registration Required:</strong>,
                    "Use instantly without creating an account or sharing personal info.",
                    <strong>Browser-Based Convenience:</strong>,
                    "Works directly in your web browser on any device – no installation needed."
                ])}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    <InterlinkText currentPlatform={platform}>
                        The processing speed is also a major plus – FSMVID typically converts YouTube links quickly while preserving original HD quality.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="How to Use FSMVID: Quick Steps to Download YouTube Videos" 
                icon={Zap} 
                iconBgGradient="from-purple-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Downloading with FSMVID is straightforward. Follow these simple steps:
                    </InterlinkText>
                </p>
                <ol className="space-y-3 mb-6 list-decimal pl-6">
                    <li>
                        <strong>1. Find Your Video:</strong>
                        <span>Open YouTube and navigate to the video you wish to download.</span>
                    </li>
                    <li>
                        <strong>2. Copy the URL:</strong>
                        <span>Select and copy the full video URL from your browser's address bar.</span>
                    </li>
                    <li>
                        <strong>3. Visit FSMVID:</strong>
                        <span>Go to the FSMVID YouTube downloader page in your browser.</span>
                    </li>
                    <li>
                        <strong>4. Paste and Process:</strong>
                        <span>Paste the copied URL into the input field and click the download button.</span>
                    </li>
                    <li>
                        <strong>5. Choose Format & Quality:</strong>
                        <span>Select your desired video/audio format and resolution from the options provided.</span>
                    </li>
                    <li>
                        <strong>6. Download:</strong>
                        <span>Click the download button next to your choice to save the file.</span>
                    </li>
                </ol>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        It's that easy! No technical expertise is needed to download your favorite YouTube content.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Remember to use downloaders like FSMVID responsibly:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    "Download only for personal, private offline viewing.",
                    "Respect copyright and intellectual property rights.",
                    "Do not redistribute downloaded content.",
                    "Support creators through official channels when possible."
                ])}
            </SectionCard>

            <SectionCard 
                title="When to Use a YouTube Video Downloader?" 
                icon={HelpCircle} 
                iconBgGradient="from-cyan-500 to-blue-600"
                cardBgClass="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Here are scenarios where a tool like FSMVID proves invaluable:
                    </InterlinkText>
                </p>
                <SubSectionTitle>Travel Companion</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300">
                    <InterlinkText currentPlatform={platform}>
                        Download videos before long flights or trips through areas with poor connectivity for uninterrupted entertainment or learning.
                    </InterlinkText>
                </p>
                <SubSectionTitle>Learning Aid</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300">
                    <InterlinkText currentPlatform={platform}>
                        Save tutorials to easily pause, rewind, and replay specific sections without buffering issues, enhancing the learning process.
                    </InterlinkText>
                </p>
                <SubSectionTitle>Content Preservation</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300">
                    <InterlinkText currentPlatform={platform}>
                        Archive important or favorite videos to ensure you retain access even if they are removed from YouTube later.
                    </InterlinkText>
                </p>
                <SubSectionTitle>Data Saving</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300">
                    <InterlinkText currentPlatform={platform}>
                        Download videos using WiFi to watch later without consuming your mobile data plan, especially useful for HD content.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Why Choose FSMVID as Your YouTube Video Downloader?" 
                icon={ThumbsUp} 
                iconBgGradient="from-teal-500 to-cyan-600"
                cardBgClass="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        With countless download options available, here's why FSMVID stands out:
                    </InterlinkText>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold mb-2">Simplicity First</h3>
                        <p>
                            <InterlinkText currentPlatform={platform}>
                                No confusing interfaces or multiple steps – just paste, select, and download.
                            </InterlinkText>
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold mb-2">Ad-Free Experience</h3>
                        <p>
                            <InterlinkText currentPlatform={platform}>
                                We prioritize user experience over aggressive advertising that plagues many downloaders.
                            </InterlinkText>
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold mb-2">Privacy Respected</h3>
                        <p>
                            <InterlinkText currentPlatform={platform}>
                                No data collection or tracking – we don't store your download history or personal information.
                            </InterlinkText>
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold mb-2">Reliability</h3>
                        <p>
                            <InterlinkText currentPlatform={platform}>
                                Continuous updates to maintain compatibility with YouTube's changing platform.
                            </InterlinkText>
                        </p>
                    </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    <strong>Reliability is our cornerstone.</strong>
                    {" "}
                    <InterlinkText currentPlatform={platform}>
                        We continuously update our downloader to ensure it works with YouTube's latest changes.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Beyond YouTube: What Else Can FSMVID Do?" 
                icon={Globe} 
                iconBgGradient="from-cyan-500 to-blue-600"
                cardBgClass="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        FSMVID isn't limited to YouTube. It also supports downloading media from other popular platforms, making it a versatile tool.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <strong>Other platforms supported include:</strong>
                </p>
                {renderStyledList([
                    <a href="/facebook-media-grabber" className="text-blue-600 hover:underline dark:text-blue-400">Facebook</a>,
                    <a href="/instagram-media-saver" className="text-pink-600 hover:underline dark:text-pink-400">Instagram</a>,
                    <a href="/twitter-video-saver" className="text-blue-400 hover:underline dark:text-blue-300">Twitter</a>,
                    <a href="/tiktok-video-saver" className="text-gray-800 hover:underline dark:text-gray-200">TikTok</a>,
                    <a href="/vimeo-video-extractor" className="text-teal-600 hover:underline dark:text-teal-400">Vimeo</a>
                ])}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    <InterlinkText currentPlatform={platform}>
                        This multi-platform support means you can use one familiar interface (just paste the URL!) for saving videos from various sources.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Tips for Getting the Most Out of FSMVID" 
                icon={Settings} 
                iconBgGradient="from-amber-500 to-yellow-600"
                cardBgClass="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Maximize your experience with these helpful tips:
                    </InterlinkText>
                </p>
                <SubSectionTitle>Optimize Storage Space</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300">
                    <InterlinkText currentPlatform={platform}>
                        Consider downloading in 720p HD instead of 1080p HD or 4K if device storage is limited. 720p often provides excellent quality with smaller file sizes.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-3">
                    <InterlinkText currentPlatform={platform}>
                        For content where audio is key (lectures, podcasts), download the MP3 version to save even more space. This applies to other platforms too, like using our 
                    </InterlinkText>
                    <a href="/tiktok-video-saver" className="text-gray-800 hover:underline dark:text-gray-200">TikTok video downloader</a>.
                </p>
                <SubSectionTitle>Create an Organized Library</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300">
                    <InterlinkText currentPlatform={platform}>
                        Organize downloaded videos into folders (e.g., "Tutorials," "Music," "Documentaries") to easily find what you need later.
                    </InterlinkText>
                </p>
                <SubSectionTitle>Plan Downloads for Off-Peak Times</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300">
                    <InterlinkText currentPlatform={platform}>
                        If you have bandwidth limitations or share your network, consider downloading larger files during times when internet usage is lower.
                    </InterlinkText>
                </p>
                <SubSectionTitle>Verify Your Downloads</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300">
                    <InterlinkText currentPlatform={platform}>
                        Quickly check downloaded files to ensure they saved correctly and play properly before you rely on them (e.g., before a flight).
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Common Issues and Simple Solutions" 
                icon={AlertTriangle} 
                iconBgGradient="from-red-500 to-rose-600"
                cardBgClass="bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Encountering an issue? Here are common problems and fixes:
                    </InterlinkText>
                </p>
                <ul className="space-y-4 mb-6">
                    <li>
                        <strong>Problem: Download button unresponsive after pasting URL.</strong><br />
                        Solution: Refresh the page (F5 or Cmd+R). If that fails, try clearing your browser's cache and cookies for the site.
                    </li>
                    <li>
                        <strong>Problem: Video downloads in lower quality than selected (e.g., not HD).</strong><br />
                        Solution: The source video on YouTube might not actually be available in the selected higher resolution, even if listed.
                    </li>
                    <li>
                        <strong>Problem: Download seems stuck processing (especially for long videos).</strong><br />
                        Solution: Allow extra time for longer videos. If it takes more than a few minutes after pasting the URL, refresh and try again.
                    </li>
                    <li>
                        <strong>Problem: Downloaded video file won't play correctly.</strong><br />
                        Solution: Ensure you have a compatible media player. VLC Media Player (free, open-source) handles most formats reliably.
                    </li>
                </ul>
            </SectionCard>

            <SectionCard 
                title="Alternatives to FSMVID: How Do Others Compare?" 
                icon={BookOpen} 
                iconBgGradient="from-indigo-500 to-purple-600"
                cardBgClass="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        While FSMVID offers a clean experience, other options exist:
                    </InterlinkText>
                </p>
                <SubSectionTitle>Desktop Software</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300">
                    <InterlinkText currentPlatform={platform}>
                        Apps like 4K Video Downloader offer features like batch downloads but require installation and often have paid premium versions for full functionality (like highest HD quality).
                    </InterlinkText>
                </p>
                <SubSectionTitle>Browser Extensions</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300">
                    <InterlinkText currentPlatform={platform}>
                        Extensions offer convenience but can sometimes struggle with YouTube's changes, may have privacy implications, or might be flagged by browser security.
                    </InterlinkText>
                </p>
                <SubSectionTitle>Other Web-Based Services</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300">
                    <InterlinkText currentPlatform={platform}>
                        Many other online downloaders exist, but be cautious – some are filled with aggressive ads, misleading pop-ups, or potential security risks. FSMVID aims for a safer, cleaner approach.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-6 mb-6">
                    <InterlinkText currentPlatform={platform}>
                        FSMVID prioritizes simplicity, safety, and reliability for downloading YouTube videos without unnecessary complications.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="The Bottom Line on YouTube Video Downloaders" 
                icon={Star} 
                iconBgGradient="from-sky-500 to-blue-600"
                cardBgClass="bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Tools like FSMVID empower users to enjoy YouTube content flexibly – offline during travel, for focused learning, or as a personal backup.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Choosing a reliable, user-friendly downloader that respects your privacy and encourages responsible use is key. FSMVID aims to be that solution.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Next time you find a YouTube video you need offline, remember that saving it for later enjoyment is just a few clicks away.
                    </InterlinkText>
                </p>
            </SectionCard>
        </div>
      </div>
    </div>
  );
};
