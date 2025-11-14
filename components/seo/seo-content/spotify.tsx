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

export const SpotifySEOContent = () => {
  const platform = "spotify";

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
                        About Spotify MP3 Downloader
                    </Badge>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Spotify MP3 Downloader</h1>
                </div>
                <p className="text-lg md:text-xl text-gray-900 dark:text-white mb-4 leading-relaxed">
                    Music has become the soundtrack to our daily lives, and Spotify stands as one of the most popular streaming platforms worldwide. But what happens when you want to enjoy your favorite tracks offline without paying for premium subscriptions? That's where our Spotify MP3 downloader comes into play, transforming your music experience at <InterlinkText currentPlatform={platform}>fsmvid</InterlinkText>.
                </p>
                <p className="text-lg md:text-xl text-gray-900 dark:text-white mb-4 leading-relaxed">
                    If you're planning a road trip through areas with poor internet connectivity, or simply want to build your personal music collection. Our free tool makes downloading Spotify tracks in MP3 format incredibly simple and efficient.
                </p>
            </SectionCard>

            <SectionCard
                title="What Makes Our Spotify MP3 Downloader Special?"
                icon={Star}
                iconBgGradient="from-blue-500 to-indigo-600"
                cardBgClass="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    At <InterlinkText currentPlatform={platform}>fsmvid</InterlinkText>, we understand that you need more than just another conversion tool. You need a reliable, fast, and user-friendly solution that delivers high-quality results every time. Our Spotify to MP3 downloader stands out from the competition with features designed specifically for music lovers like you.
                </p>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-6">
                    Time is precious, and we respect that. Our Spotify downloader processes your tracks at incredible speeds. You won't have to wait around wondering when your downloads will complete.
                </p>
            </SectionCard>

            <SectionCard
                title="How to Use Our Free Spotify MP3 Downloader?"
                icon={Zap}
                iconBgGradient="from-purple-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Using our tool couldn't be simpler. We've designed the interface with you in mind, ensuring that even first-time users can navigate effortlessly:
                </p>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">Copy the Spotify URL</h3>
                        <p>Find your desired track, album, or playlist on <a href="https://www.spotify.com/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Spotify</a> and copy the link.</p>
                    </div>
                    <div>
                        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">Paste into fsmvid</h3>
                        <p>Navigate to our downloader and paste the URL into the designated field.</p>
                    </div>
                    <div>
                        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">Select Quality</h3>
                        <p>Choose your preferred audio quality (up to 320kbps).</p>
                    </div>
                    <div>
                        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">Process & Download</h3>
                        <p>Click the “Download Now” button and download your MP3 files.</p>
                    </div>
                </div>
                <p className="text-gray-900 dark:text-white leading-relaxed mt-6">
                    The entire process takes just a few clicks, and you'll have your music ready for offline listening in no time.
                </p>
            </SectionCard>

            <SectionCard
                title="Key Features That Set Us Apart"
                icon={Award}
                iconBgGradient="from-green-500 to-emerald-600"
                cardBgClass="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <SubSectionTitle>Complete Metadata Preservation</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    When you download tracks using our Spotify music downloader, we ensure that all important information stays intact. Artist names, album titles, track numbers, and album artwork are preserved, keeping your music library organized and professional-looking.
                </p>

                <SubSectionTitle>Cross-Platform Compatibility</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Your downloaded MP3 files work seamlessly across all devices and platforms. Whether you're using Windows, Mac, iOS, Android, or any other system, your music will play perfectly without compatibility issues.
                </p>

                <SubSectionTitle>No Registration Required</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    We believe in keeping things simple. You don't need to create accounts, provide personal information, or jump through hoops to use our service.
                </p>

                <SubSectionTitle>Ad-Free Experience</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-6">
                    Unlike many other downloaders, we don't bombard you with intrusive advertisements or pop-ups. Our focus remains on providing you with a clean, efficient conversion experience.
                </p>
            </SectionCard>

            <SectionCard
                title="Understanding Different Conversion Options"
                icon={Settings}
                iconBgGradient="from-amber-500 to-yellow-600"
                cardBgClass="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <SubSectionTitle>Audio Quality Settings</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    We offer multiple quality options to suit your needs:
                </p>
                {renderStyledList([
                    "128 kbps: Perfect for casual listening and when storage space is limited.",
                    "192 kbps: Balanced quality for most users.",
                    "256 kbps: High quality for better sound reproduction.",
                    "320 kbps: Maximum quality for audiophiles and premium sound systems."
                ])}

                <SubSectionTitle>Output Format Flexibility</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-6">
                    While MP3 remains our primary format due to its universal compatibility, we also support other popular formats like AAC, FLAC, and WAV for users with specific requirements.
                </p>
            </SectionCard>

            <SectionCard
                title="Why Choose Offline Music?"
                icon={ThumbsUp}
                iconBgGradient="from-teal-500 to-cyan-600"
                cardBgClass="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <SubSectionTitle>Unreliable Internet Connections</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Whether you're traveling through rural areas, flying long distances, or dealing with unstable internet connections, having offline music ensures uninterrupted entertainment. Our free Spotify downloader gives you the freedom to enjoy music anywhere.
                </p>

                <SubSectionTitle>Data Usage Concerns</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Streaming music constantly can consume significant amounts of mobile data, leading to expensive bills or throttled connections. Downloaded MP3 files eliminate this concern.
                </p>

                <SubSectionTitle>Better Control Over Your Music</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    With downloaded files, you have complete control over your music library. You can organize tracks however you prefer, create custom playlists across different platforms, and never worry about songs disappearing from streaming services.
                </p>

                <SubSectionTitle>Enhanced Audio Experience</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-6">
                    Many users find that locally stored files provide better audio consistency compared to streaming, especially in areas with fluctuating internet speeds that can affect streaming quality.
                </p>
            </SectionCard>

            <SectionCard
                title="Advanced Tips for Better Results"
                icon={BookOpen}
                iconBgGradient="from-purple-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <SubSectionTitle>Optimizing Your Downloads</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    To get the best results from our Spotify MP3 downloader, consider these tips:
                </p>
                {renderStyledList([
                    "Choose the highest quality setting that fits your storage capacity.",
                    "Ensure a stable internet connection during conversion.",
                    "Organize your downloads into folders by artist or genre.",
                    "Regularly back up your downloaded music library."
                ])}

                <SubSectionTitle>Managing Large Collections</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-6">
                    For users with extensive music libraries:
                </p>
                {renderStyledList([
                    "Use descriptive file names for easy organization.",
                    "Consider external storage solutions for large collections.",
                    "Create backup copies of your most important tracks."
                ])}
            </SectionCard>

            <SectionCard
                title="Support and Community"
                icon={HelpCircle}
                iconBgGradient="from-red-500 to-rose-600"
                cardBgClass="bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    We believe in supporting our users throughout their music downloading journey. While our tool is designed to be intuitive, we understand that questions may arise.
                </p>
                <SubSectionTitle>Troubleshooting Common Issues</SubSectionTitle>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    If you encounter problems:
                </p>
                {renderStyledList([
                    "Check your internet connection stability.",
                    "Verify that the Spotify URL is correct and accessible.",
                    "Clear your browser cache and try again.",
                    "Ensure you have sufficient storage space for downloads."
                ])}
                <SubSectionTitle>Best Practices for Success</SubSectionTitle>
                {renderStyledList([
                    "Use the most recent Spotify URLs for best compatibility.",
                    "Allow conversions to complete fully before starting new ones.",
                    "Keep your browser updated for optimal performance.",
                    "Use a reliable internet connection for consistent results."
                ])}
            </SectionCard>

            <SectionCard
                title="Final Thoughts"
                icon={Globe}
                iconBgGradient="from-sky-500 to-blue-600"
                cardBgClass="bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
                    Music has the power to transform moments, create memories, and enhance our daily experiences. With our Spotify MP3 downloader at <InterlinkText currentPlatform={platform}>fsmvid</InterlinkText>, you're not just downloading songs – you're claiming ownership of your musical journey.
                </p>
                <p className="text-gray-900 dark:text-white leading-relaxed mb-6">
                    We've built this tool with your needs in mind, focusing on simplicity, quality, and reliability. Our downloader adapts to your requirements while maintaining the highest standards of performance.
                </p>
            </SectionCard>
        </div>
      </div>
    </div>
  );
};
