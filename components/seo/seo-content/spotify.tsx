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

export const SpotifySEOContent = () => {
  const platform = "spotify";

  return (
    <div className="w-screen bg-slate-50 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <section className="py-24">
        <div className="container px-6 mx-auto max-w-7xl">
                                                            <div className="text-center mb-16 space-y-4">
                        <Badge className="bg-blue-600/10 text-blue-600 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
                            Deep Dive
                        </Badge>
                        <h2 className="text-xl md:text-3xl font-black tracking-tighter italic uppercase text-slate-900 leading-[0.9]">
                            Spotify Video <span className="text-blue-600">Downloader</span>
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
                                    Music has become the soundtrack to our daily lives, and Spotify stands as one of the most popular streaming platforms worldwide. But what happens when you want to enjoy your favorite tracks offline without paying for premium subscriptions? That&apos;s where our Spotify MP3 downloader comes into play, transforming your music experience at <InterlinkText currentPlatform={platform}>fsmvid</InterlinkText>.
                                </p>
<p className="text-slate-500 font-medium italic leading-relaxed text-sm border-l-2 border-blue-600/10 pl-6">
                                    If you&apos;re planning a road trip through areas with poor internet connectivity, or simply want to build your personal music collection. Our free tool makes downloading Spotify tracks in MP3 format incredibly simple and efficient.
                                </p>
                            </div>
                        </SectionCard>

            <SectionCard
                title="What Makes Our Spotify MP3 Downloader Special?"
                icon={Star}
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
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
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
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
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
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
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
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
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
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
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
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
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
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
                iconBgGradient="from-blue-600/10 to-blue-600/10"
                cardBgClass="bg-white"
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
      </section>
    </div>
  );
};