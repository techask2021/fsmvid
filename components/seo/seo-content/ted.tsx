"use client"; 

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Shield, Zap, Globe, Award, Info, HelpCircle, Settings, Edit3, TrendingUp, ListChecks, AlertTriangle, ThumbsUp, BookOpen, ExternalLink } from "lucide-react";
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

export const TedSEOContent = () => {
  const platform = "ted";
  
  return (
    <div className="w-full">
      <div className="container px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="space-y-8 md:space-y-10 py-12 md:py-16">
            <SectionCard 
                icon={Info}
                iconBgGradient="from-red-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-red-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <div className="text-center">
                    <Badge className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20 px-4 py-1 text-xs font-semibold">
                        About TED Video Downloader
                    </Badge>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">TED Talk Downloader</h1>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        <InterlinkText currentPlatform={platform}>
                            TED Talks have become a global phenomenon, sparking ideas, challenging perceptions, and inspiring millions. If you're a student, educator, professional, or lifelong learner, there's always a TED Talk that resonates with you.
                        </InterlinkText>
                    </p>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        <InterlinkText currentPlatform={platform}>
                            But what if you want to watch these talks offline, use them in a presentation, or share them with your class? That's where FSMVID.com steps in with our reliable TED Video Downloader.
                        </InterlinkText>
                    </p>
                </div>
            </SectionCard>

            <SectionCard 
                title="What Is a TED Video Downloader?" 
                icon={Star} 
                iconBgGradient="from-blue-500 to-indigo-600"
                cardBgClass="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        A TED Video Downloader is a tool or software that allows users to save TED Talks from the official 
                    </InterlinkText>
                    <a href="https://www.ted.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400 inline-flex items-center">
                        TED.com
                        <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                    <InterlinkText currentPlatform={platform}>
                        {" "}website or YouTube channel directly to their devices.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        There are various types of downloaders available, ranging from browser-based online tools to desktop software and even mobile apps.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Why Download TED Videos?" 
                icon={HelpCircle} 
                iconBgGradient="from-green-500 to-emerald-600"
                cardBgClass="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        TED Talks have become a global phenomenon, with speakers from all walks of life sharing their insights on technology, entertainment, design, science, and more. However, streaming isn't always practical.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <strong>Here are a few reasons why you might want to download TED videos:</strong>
                </p>
                {renderStyledList([
                    <><strong>Offline Access:</strong> Whether you're commuting, flying, or simply have unreliable internet, downloaded videos ensure uninterrupted learning.</>,
                    <><strong>Enhanced Learning:</strong> Teachers and students often need to include video content in lessons or projects. Having files on hand makes this seamless.</>,
                    <><strong>Personal Archive:</strong> Save talks that resonate with you or are relevant to your research for easy access later.</>,
                    <><strong>Content Creation:</strong> Use clips (with proper attribution) in presentations, mashups, or other creative projects.</>
                ])}
            </SectionCard>

            <SectionCard 
                title="FSMVID.com's TED Video Downloader" 
                icon={Award} 
                iconBgGradient="from-purple-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        At FSMVID.com, we're committed to making educational content more accessible. Our TED Video Downloader stands out for its:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    <><strong>User-Friendly Interface:</strong> No tech skills needed—just copy, paste, and download.</>,
                    <><strong>Multiple Formats:</strong> Download TED Talks as MP4 video or MP3 audio files.</>,
                    <><strong>High-Quality Downloads:</strong> Maintain the original video and audio clarity.</>,
                    <><strong>No Registration Required:</strong> Start downloading instantly—no accounts or sign-ups.</>,
                    <><strong>Free to Use:</strong> Enjoy unlimited downloads at zero cost.</>
                ])}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    <InterlinkText currentPlatform={platform}>
                        We regularly update our tool to ensure compatibility with the latest TED website changes, so you can always count on FSMVID.com.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="How to Download TED Videos with FSMVID Downloader?" 
                icon={Zap} 
                iconBgGradient="from-orange-500 to-red-600"
                cardBgClass="bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Follow these simple steps to save your favorite TED Talks in minutes:
                    </InterlinkText>
                </p>
                <ol className="space-y-3 mb-6 list-decimal pl-6">
                    <li>
                        <strong>1. Browse TED.com:</strong>
                        <span className="ml-2">Navigate to 
                        <a href="https://www.ted.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400 ml-1">
                            TED.com
                            <ExternalLink className="w-3 h-3 ml-1 inline" />
                        </a> and select the talk you want to download.</span>
                    </li>
                    <li>
                        <strong>2. Copy the URL:</strong>
                        <span className="ml-2">Click on the address bar and copy the full URL (e.g., https://www.ted.com/talks/sir_ken_robinson_do_schools_kill_creativity).</span>
                    </li>
                    <li>
                        <strong>3. Visit FSMVID:</strong>
                        <span className="ml-2">Open FSMVID.com in your browser and find the TED Video Downloader tool.</span>
                    </li>
                    <li>
                        <strong>4. Paste the URL:</strong>
                        <span className="ml-2">Paste the copied URL into the input box.</span>
                    </li>
                    <li>
                        <strong>5. Select Format & Quality:</strong>
                        <span className="ml-2">Choose whether you want to download the video (MP4) or just the audio (MP3). Pick your preferred quality (from 360p to 1080p if available).</span>
                    </li>
                    <li>
                        <strong>6. Download:</strong>
                        <span className="ml-2">Hit the "Download Now" button and wait a few seconds. The tool will process your request and provide a download link.</span>
                    </li>
                    <li>
                        <strong>7. Save the File:</strong>
                        <span className="ml-2">Save the file to your device and watch it anytime, anywhere.</span>
                    </li>
                </ol>
            </SectionCard>

            <SectionCard 
                title="Other Methods For Downloading TED Talks" 
                icon={Settings} 
                iconBgGradient="from-teal-500 to-cyan-600"
                cardBgClass="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Let's walk through several safe and effective other methods for downloading TED Talks.
                    </InterlinkText>
                </p>
                
                <SubSectionTitle>1. Using the Official TED App</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                    TED offers its app for Android and iOS devices, which includes a built-in download feature.
                </p>
                <ol className="space-y-2 mb-4 list-decimal pl-6">
                    <li>Install the TED App from Google Play or the Apple App Store.</li>
                    <li>Browse or search for the TED Talk you want to download.</li>
                    <li>Tap the download icon (usually a downward arrow) beside the video.</li>
                    <li>Access your downloaded videos from the app's library, even offline.</li>
                </ol>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="mb-2"><strong>Pros:</strong> Legal, safe, and easy to use.</p>
                    <p><strong>Cons:</strong> Downloads are only accessible within the app and can't be transferred to other devices or shared.</p>
                </div>

                <SubSectionTitle>2. Desktop Software Applications</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                    For frequent or batch downloading, dedicated programs like 4K Video Downloader, JDownloader, and YTD Video Downloader offer robust features.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-3"><strong>How to use desktop software:</strong></p>
                <ol className="space-y-2 mb-4 list-decimal pl-6">
                    <li>Download and install your chosen downloader.</li>
                    <li>Copy the TED Talk URL.</li>
                    <li>Open the software and paste the link.</li>
                    <li>Choose format and resolution.</li>
                    <li>Start the download and wait for completion.</li>
                </ol>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="mb-2"><strong>Pros:</strong> Faster, supports batch downloads, and is often more reliable.</p>
                    <p><strong>Cons:</strong> Requires installation and may cost money for premium features.</p>
                </div>

                <SubSectionTitle>3. Browser Extensions</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Some browser extensions, such as Video DownloadHelper (for Chrome and Firefox), make grabbing videos from TED.com a breeze.
                </p>
                <ol className="space-y-2 mb-4 list-decimal pl-6">
                    <li>Install the extension from your browser's add-on store.</li>
                    <li>Navigate to the TED Talk you wish to download.</li>
                    <li>Click the extension icon to see available download options.</li>
                    <li>Select the desired format and save the file.</li>
                </ol>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="mb-2"><strong>Pros:</strong> Convenient and quick for regular downloads.</p>
                    <p><strong>Cons:</strong> May not work on all websites, and browser compatibility can change.</p>
                </div>
            </SectionCard>

            <SectionCard 
                title="Comparing the Best TED Video Downloaders" 
                icon={ListChecks} 
                iconBgGradient="from-indigo-500 to-purple-600"
                cardBgClass="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Let's compare some of the most popular methods based on functionality, ease of use, safety, and quality.
                    </InterlinkText>
                </p>
                
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 mb-6">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">Method</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">Pros</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">Cons</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">Best For</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Official TED App</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Safe, legal, easy, offline access within the app</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">No file export, app-only</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Mobile users</td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-900">
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Online Downloader Sites</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">No installation, multiple formats</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Ads, safety concerns, and legality vary</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Occasional downloads</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Desktop Software</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Batch downloads, high quality, customizable</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Installation required, may cost money</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Frequent users</td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-900">
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Browser Extensions</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Quick, convenient, integrates with browser</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">May break, limited to browser</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Regular browser users</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </SectionCard>

            <SectionCard 
                title="TED Download Trends and Top Talks" 
                icon={TrendingUp} 
                iconBgGradient="from-pink-500 to-rose-600"
                cardBgClass="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                    <p className="text-blue-800 dark:text-blue-200 font-semibold mb-2">Did you know?</p>
                    <p className="text-blue-700 dark:text-blue-300">
                        According to TED's official stats, there are over 3,900 TED Talks available in more than 100 languages as of 2024.
                    </p>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        The most popular talks have been viewed tens of millions of times. Here are a few all-time favorites you might want to download:
                    </InterlinkText>
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Sir Ken Robinson: Do Schools Kill Creativity?</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">75M+ views</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Amy Cuddy: Your Body Language May Shape Who You Are</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">67M+ views</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Simon Sinek: How Great Leaders Inspire Action</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">60M+ views</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Brené Brown: The Power of Vulnerability</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">63M+ views</p>
                    </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <InterlinkText currentPlatform={platform}>
                        With FSMVID.com, you can save these iconic talks or discover new gems from the TED library.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Tips for High-Quality Downloads" 
                icon={Star} 
                iconBgGradient="from-yellow-500 to-orange-600"
                cardBgClass="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Here are some essential tips to ensure you get the best quality downloads:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    <><strong>Choose the right resolution:</strong> For presentations, opt for 720p or higher.</>,
                    <><strong>Select the format that fits your needs:</strong> MP4 is universally compatible, while MP3 is great for audio-only.</>,
                    <><strong>Beware of malware:</strong> Only download software from reputable sources.</>,
                    <><strong>Check file sizes:</strong> Higher quality means larger files, so ensure you have enough storage space.</>
                ])}
            </SectionCard>

            <SectionCard 
                title="How to Use Downloaded TED Videos Effectively?" 
                icon={Edit3} 
                iconBgGradient="from-emerald-500 to-teal-600"
                cardBgClass="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Once you've downloaded your favorite TED Talks, here are some creative and practical ways to make the most of them:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    <><strong>Build a Personal Library:</strong> Curate a collection of talks on specific topics—leadership, innovation, mental health, etc.—that inspire you.</>,
                    <><strong>Create Playlists for Learning:</strong> Sequence TED Talks to follow a learning path or curriculum.</>,
                    <><strong>Share with Students or Colleagues:</strong> Use in lessons, workshops, or team meetings to spark discussion.</>,
                    <><strong>Use Clips in Presentations:</strong> With proper attribution, embed relevant segments in your slides to illustrate points.</>,
                    <><strong>Listen on the Go:</strong> Convert videos to audio for learning during commutes, workouts, or chores.</>
                ])}
            </SectionCard>

            <SectionCard 
                title="Common Issues and Troubleshooting" 
                icon={AlertTriangle} 
                iconBgGradient="from-red-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-red-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Encountering an issue? Here are common problems and fixes:
                    </InterlinkText>
                </p>
                
                <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">Download Fails or is Slow</h4>
                        <ul className="space-y-1 text-sm">
                            <li>• Check your internet connection</li>
                            <li>• Ensure the downloader website or app is not blocked in your region</li>
                            <li>• Try a different method or tool</li>
                        </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">Video Won't Play</h4>
                        <ul className="space-y-1 text-sm">
                            <li>• Make sure you have a compatible media player (e.g., VLC Media Player)</li>
                            <li>• Re-download in a different format if needed</li>
                        </ul>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">Low-Quality Video</h4>
                        <ul className="space-y-1 text-sm">
                            <li>• Select a higher resolution option if available</li>
                            <li>• Some online downloaders only offer limited quality—try desktop software for better results</li>
                        </ul>
                    </div>
                </div>
            </SectionCard>

            <SectionCard 
                title="Safety and Privacy Tips" 
                icon={Shield} 
                iconBgGradient="from-blue-500 to-indigo-600"
                cardBgClass="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Stay safe while downloading TED Talks with these important tips:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    "Avoid suspicious downloader websites. Stick to well-reviewed and trusted sources like FSMVID.",
                    "Beware of pop-ups and ads. Don't install unnecessary browser extensions or click on unfamiliar links.",
                    "Keep your software updated. Regular updates patch security vulnerabilities."
                ])}
            </SectionCard>

            <SectionCard 
                title="Beyond TED: What Else Can FSMVID Do?" 
                icon={Globe} 
                iconBgGradient="from-cyan-500 to-blue-600"
                cardBgClass="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        FSMVID isn't limited to TED Talks. It also supports downloading media from other popular platforms, making it a versatile tool.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <strong>Other platforms supported include:</strong>
                </p>
                {renderStyledList([
                    <a href="/youtube-video-saver" className="text-red-600 hover:underline dark:text-red-400">YouTube</a>,
                    <a href="/facebook-media-grabber" className="text-blue-600 hover:underline dark:text-blue-400">Facebook</a>,
                    <a href="/instagram-media-saver" className="text-pink-600 hover:underline dark:text-pink-400">Instagram</a>,
                    <a href="/twitter-video-saver" className="text-blue-400 hover:underline dark:text-blue-300">Twitter</a>,
                    <a href="/tiktok-video-saver" className="text-gray-800 hover:underline dark:text-gray-200">TikTok</a>
                ])}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    <InterlinkText currentPlatform={platform}>
                        This multi-platform support means you can use one familiar interface (just paste the URL!) for saving videos from various sources.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="The Bottom Line on TED Video Downloaders" 
                icon={ThumbsUp} 
                iconBgGradient="from-green-500 to-emerald-600"
                cardBgClass="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        TED Talks are an incredible resource for anyone seeking inspiration, education, or a fresh perspective. With the right TED Video Downloader, you can take these talks anywhere—whether you're offline, teaching a class, or building your own library of wisdom.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Always use trusted tools, respect copyright rules, and make the most of the world's leading ideas at your fingertips.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        By downloading and curating your favorite TED Talks, you ensure that knowledge and inspiration are never more than a click away.
                    </InterlinkText>
                </p>
            </SectionCard>
        </div>
      </div>
    </div>
  );
};