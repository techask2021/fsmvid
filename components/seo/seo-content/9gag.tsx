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

export const NineGagSEOContent = () => {
  const platform = "9gag";

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
                    About 9GAG Video Saver
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">FSMVID 9GAG Video Saver</h1>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    <InterlinkText currentPlatform={platform}>
                        9GAG has become the go-to platform for viral memes, funny videos, and entertaining content that keeps millions engaged daily.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <InterlinkText currentPlatform={platform}>
                        However, what happens when you find that perfect video that makes you laugh every time, but you can't access it offline? That's where FSMVID's 9GAG Video Saver comes to the rescue.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="What is FSMVID's 9GAG Video Saver?" 
                icon={Star} 
                iconBgGradient="from-blue-500 to-indigo-600"
                cardBgClass="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        FSMVID's 9GAG Video Saver is a powerful, user-friendly tool designed specifically to help you save and download videos from 9GAG effortlessly.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    <InterlinkText currentPlatform={platform}>
                        Unlike generic video savers, our tool is optimized for 9GAG's unique video format and delivery system, ensuring you get the highest quality saves every time.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Key Features That Set FSMVID Apart" 
                icon={Award} 
                iconBgGradient="from-green-500 to-emerald-600"
                cardBgClass="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                {renderStyledList([
                    <strong>High-Quality Video Saves:</strong>,
                    "Save videos in their original quality, including HD and 4K when available.",
                    <strong>Lightning-Fast Processing:</strong>,
                    "Get your videos saved in seconds, not minutes.",
                    <strong>Multiple Format Support:</strong>,
                    "Save videos in MP4, WebM, or extract audio as MP3.",
                    <strong>No Registration Required:</strong>,
                    "Start saving videos immediately without creating accounts.",
                    <strong>Mobile-Friendly:</strong>,
                    "Works seamlessly on smartphones, tablets, and desktop computers."
                ])}
            </SectionCard>

            <SectionCard 
                title="Why Choose FSMVID for 9GAG Video Saving?" 
                icon={ThumbsUp} 
                iconBgGradient="from-teal-500 to-cyan-600"
                cardBgClass="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <SubSectionTitle>1. Unmatched Reliability</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Our servers are optimized for consistent performance, ensuring your video saves completely successfully every time. We maintain a 99.9% uptime rate, so you can rely on FSMVID whenever you need it.
                    </InterlinkText>
                </p>
                <SubSectionTitle>2. Privacy-First Approach</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <InterlinkText currentPlatform={platform}>
                        We don't store your saved videos or track your browsing habits. Your privacy is our priority, and all video saves are processed securely through encrypted connections.
                    </InterlinkText>
                </p>
                <SubSectionTitle>3. Cross-Platform Compatibility</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Whether you're using Windows, Mac, Linux, iOS, or Android, FSMVID works flawlessly across all platforms and browsers.
                    </InterlinkText>
                </p>
                <SubSectionTitle>4. Regular Updates</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    <InterlinkText currentPlatform={platform}>
                        As 9GAG updates its platform, we continuously update our video saver to ensure compatibility and optimal performance.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="How to Use FSMVID's 9GAG Video Saver?" 
                icon={Zap} 
                iconBgGradient="from-purple-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <ol className="space-y-3 mb-6 list-decimal pl-6">
                    <li>
                        <strong>Find Your Video:</strong> Navigate to 9GAG and locate the video you want to save. The video can be from any section - whether it's trending, fresh, or from a specific category.
                    </li>
                    <li>
                        <strong>Copy the Video URL:</strong>
                        <ul className="list-disc pl-5 mt-1">
                            <li>On desktop: Right-click the video and select "Copy link address" or copy the URL from your browser's address bar.</li>
                            <li>On mobile: Tap the share button and select "Copy link."</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Visit FSMVID:</strong> Open your browser and go to FSMVID.com. Our clean, intuitive interface makes the video saving process straightforward.
                    </li>
                    <li>
                        <strong>Paste and Process:</strong> Paste the 9GAG video URL into our save box and click "Save Video." Our system will automatically detect the available video formats and quality options.
                    </li>
                    <li>
                        <strong>Choose Your Preferences:</strong> Select your preferred video quality (720p, 1080p, or 4K) and format (MP4, WebM, or MP3 for audio only).
                    </li>
                    <li>
                        <strong>Save and Enjoy:</strong> Click the save button and download the file to your device. Your video is now ready for offline viewing!
                    </li>
                </ol>
            </SectionCard>

            <SectionCard 
                title="Technical Specifications" 
                icon={Settings} 
                iconBgGradient="from-amber-500 to-yellow-600"
                cardBgClass="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <SubSectionTitle>Supported Video Formats:</SubSectionTitle>
                {renderStyledList([
                    "Input: 9GAG's native video formats (MP4, WebM, GIF).",
                    "Output: MP4 (H.264), WebM (VP9), MP3 (320kbps)."
                ])}
                <SubSectionTitle>Quality Options:</SubSectionTitle>
                {renderStyledList([
                    "240p - Mobile-friendly, small file sizes.",
                    "480p - Standard definition for general use.",
                    "720p - HD quality for a better viewing experience.",
                    "1080p - Full HD for maximum quality.",
                    "4K - When available from the source."
                ])}
                <SubSectionTitle>File Size Optimization:</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    <InterlinkText currentPlatform={platform}>
                        Our compression algorithms ensure optimal file sizes without quality loss, making your saved videos perfect for sharing or storage.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Legal and Ethical Usage" 
                icon={Shield} 
                iconBgGradient="from-red-500 to-rose-600"
                cardBgClass="bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <SubSectionTitle>Important Guidelines:</SubSectionTitle>
                {renderStyledList([
                    "Respect Copyright: Only save content you have permission to use.",
                    "Personal Use: Saved videos should primarily be for personal, non-commercial use.",
                    "Attribution: When sharing saved content, provide proper attribution to the original creators.",
                    "Fair Use: Understand fair use policies in your jurisdiction."
                ])}
                <SubSectionTitle>FSMVID's Commitment:</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    <InterlinkText currentPlatform={platform}>
                        We encourage responsible video saving and respect for content creators' rights. Our tool is designed for personal use and legitimate purposes only.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Troubleshooting Common Issues" 
                icon={AlertTriangle} 
                iconBgGradient="from-red-500 to-rose-600"
                cardBgClass="bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <SubSectionTitle>Video Won't Save?</SubSectionTitle>
                {renderStyledList([
                    "Check URL: Ensure you've copied the complete 9GAG video URL.",
                    "Browser Cache: Clear your browser cache and cookies.",
                    "Internet Connection: Verify your internet connection is stable.",
                    "Video Availability: Some videos may be region-restricted or removed."
                ])}
                <SubSectionTitle>Save Speed Slow?</SubSectionTitle>
                {renderStyledList([
                    "Server Load: Try saving during off-peak hours.",
                    "File Size: Larger, higher-quality videos require more processing time.",
                    "Internet Speed: Check your internet connection speed."
                ])}
                <SubSectionTitle>Quality Options Missing?</SubSectionTitle>
                {renderStyledList([
                    "Source Limitation: 9GAG videos are only available in the quality in which they were uploaded.",
                    "Mobile vs Desktop: Some quality options may vary between mobile and desktop versions."
                ])}
                <p className="text-gray-700 dark:text-gray-300 mb-6 font-semibold">
                    Note: We don't store any saved content on our servers. All video saves are processed in real-time and delivered directly to your device.
                </p>
            </SectionCard>

            <SectionCard 
                title="Getting Started Today" 
                icon={TrendingUp} 
                iconBgGradient="from-lime-500 to-green-600"
                cardBgClass="bg-gradient-to-br from-lime-50 to-green-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Ready to start building your collection of favorite 9GAG videos? FSMVID makes it easier than ever to save, organize, and enjoy your favorite content offline.
                    </InterlinkText>
                </p>
                <SubSectionTitle>Tips for Best Results:</SubSectionTitle>
                {renderStyledList([
                    "Organize Saved Videos: Create folders by category, date, or topic.",
                    "Check Quality: Always preview quality options before saving.",
                    "Backup Important Videos: Keep copies of your favorite saved videos.",
                    "Share Responsibly: Respect copyright and attribution when sharing.",
                    "Stay Updated: Follow our blog for new features and tips."
                ])}
            </SectionCard>

            <SectionCard 
                title="Final Thoughts" 
                icon={Star} 
                iconBgGradient="from-sky-500 to-blue-600"
                cardBgClass="bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <InterlinkText currentPlatform={platform}>
                        FSMVID's 9GAG Video Saver represents the perfect balance of simplicity, power, and reliability.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Whether you're a casual user wanting to save a few funny videos or a content creator building a media library, our tool provides everything you need to save and manage 9GAG videos effectively.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <InterlinkText currentPlatform={platform}>
                        The internet is full of amazing content that deserves to be preserved and enjoyed offline.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    <InterlinkText currentPlatform={platform}>
                        With FSMVID, you have the power to build your entertainment library, share laughter with friends and family, and never lose access to the content that brings joy to your day.
                    </InterlinkText>
                </p>
            </SectionCard>
        </div>
      </div>
    </div>
  );
};
