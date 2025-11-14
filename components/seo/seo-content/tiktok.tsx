"use client"; 

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Shield, Zap, Globe, Award, Info, HelpCircle, Settings, Edit3, TrendingUp, ListChecks, AlertTriangle, ThumbsUp, BookOpen, Smartphone, Users, X } from "lucide-react";

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

export const TikTokSEOContent = () => {
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
                    TikTok Video Downloader
                </Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">TikTok Video Downloader</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Looking for a reliable way to save your favorite TikTok content? You're not alone. With over 1 billion users scrolling through endless feeds daily, TikTok has become the go-to platform for short-form content.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    But here's the catch—the app doesn't make it easy to download videos for offline viewing.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    That's exactly why we built FSMVID. Our <a href="/tiktok-video-saver" className="text-blue-600 hover:underline dark:text-blue-400 font-semibold">TikTok video downloader</a> gives you complete control over the content you love, whether you want to save tutorials for later, build a collection of inspiring clips, or share videos with friends who don't use the platform.
                </p>
            </SectionCard>

            <SectionCard 
                title="Why Do People Download TikTok Videos?" 
                icon={Users} 
                iconBgGradient="from-blue-500 to-indigo-600"
                cardBgClass="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Here's something interesting: 74% of TikTok users have wanted to download videos at some point. Yet only 41% actually know how to do it properly.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The reasons vary:
                </p>
                
                <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white">Reason</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white">Percentage</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white">Use Case</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">Offline Access</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">16%</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">Flights, commutes, spotty internet areas</td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-800">
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">Creative Projects</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">12%</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">Inspiration, reference material</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">Personal Collections</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">9%</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">Building favorite moments library</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    The problem? TikTok's built-in save feature doesn't really solve these needs.
                </p>
            </SectionCard>

            <SectionCard 
                title="The Problem With TikTok's Built-In Save Feature" 
                icon={X} 
                iconBgGradient="from-red-500 to-rose-600"
                cardBgClass="bg-gradient-to-br from-red-50 to-rose-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    TikTok allows you to save videos directly within the app. Sounds convenient, right? Not quite.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    Here's what's wrong:
                </p>
                {renderStyledList([
                    "<strong>Requires internet connection:</strong> Saved videos don't work offline, which defeats the purpose if you're trying to watch during a flight or in areas with poor connectivity.",
                    "<strong>Watermark stays:</strong> Every saved video keeps that TikTok watermark. It's distracting, especially if you want clean footage for your own projects.",
                    "<strong>Limited sharing:</strong> You can't really use or share these videos outside the app. The native feature locks you into TikTok's ecosystem.",
                    "<strong>Content disappears:</strong> If a creator deletes their content, it also vanishes from your saved collection. That amazing tutorial or hilarious clip? Gone forever."
                ])}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                    Our TikTok video downloader solves every single one of these issues. You get actual video files you can watch anywhere, share however you want, and keep permanently on your device.
                </p>
            </SectionCard>

            <SectionCard 
                title="How to Download TikTok Videos Without a Watermark?" 
                icon={Zap} 
                iconBgGradient="from-purple-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Removing watermarks is our most popular feature by far. Nobody wants that TikTok logo covering their content, especially for professional projects or clean social media posts.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    Here's how it works:
                </p>
                <ol className="space-y-3 mb-6 list-decimal pl-6">
                    <li className="text-gray-700 dark:text-gray-300">
                        Open TikTok and find the video you want to save.
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                        Tap the "Share" button on the right side.
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                        Select "Copy Link" from the menu.
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                        Head over to the <a href="/" className="text-blue-600 hover:underline dark:text-blue-400 font-semibold">FSMVID downloader</a>.
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                        Paste the link into our tool.
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                        Choose your preferred quality (HD recommended).
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                        Select the "Remove Watermark" option.
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                        Hit download and you're done.
                    </li>
                </ol>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The entire process takes 10 seconds. Our servers process requests almost instantly, even for longer videos.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    And unlike other tools that leave unwanted artifacts or reduce quality, our watermark removal technology preserves your video's appearance, keeping it crisp, clear, and professional.
                </p>
            </SectionCard>

            <SectionCard 
                title="Download TikTok Videos in HD Quality" 
                icon={Star} 
                iconBgGradient="from-indigo-500 to-purple-600"
                cardBgClass="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Quality matters. We've seen it in our user data—video quality is the top priority when people choose a download tool.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    That's why we offer multiple resolution options:
                </p>

                <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white">Quality</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white">Resolution</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white">Best For</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300"><strong>1080p Full HD</strong></td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">1920×1080</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">Maximum quality (recommended)</td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-800">
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300"><strong>720p HD</strong></td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">1280×720</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">Balance of quality & file size</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300"><strong>480p</strong></td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">854×480</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">Faster downloads, slower connections</td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-800">
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300"><strong>360p</strong></td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">640×360</td>
                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">Minimal storage use</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Most users go with 1080p, and that's what we recommend. Storage is relatively inexpensive these days, and there's no point in downloading videos if they appear pixelated or blurry.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Our MP4 format works universally—on iPhone, Android, Windows, Mac, and any other device you're using. No compatibility issues, no special players needed. Just download and watch.
                </p>
            </SectionCard>

            <SectionCard 
                title="Why FSMVID Stands Out From Other TikTok Downloaders?" 
                icon={ThumbsUp} 
                iconBgGradient="from-teal-500 to-cyan-600"
                cardBgClass="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We won't pretend to be the only TikTok downloader out there. Competition exists. But here's why thousands of users keep coming back to FSMVID:
                </p>

                <SubSectionTitle>Lightning-Fast Processing Speed</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Nobody has time to sit around waiting for downloads to complete. Our servers handle requests in seconds, not minutes. Even 3-minute videos process almost instantly.
                </p>

                <SubSectionTitle>No Registration Required</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Other services require your email, phone number, and sometimes even payment information. We don't. Just visit the site, paste your link, and download: zero barriers, zero data collection.
                </p>

                <SubSectionTitle>Works on Any Device</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    iPhone? Android? Desktop? Doesn't matter. Our tool adapts automatically to whatever screen you're using. The mobile experience is just as smooth as the desktop.
                </p>

                <SubSectionTitle>Unlimited Downloads</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We don't limit the number of videos you can save. Download one video or one hundred—we don't care. There are no daily limits, no premium tiers, no hidden restrictions.
                </p>

                <SubSectionTitle>Safe and Secure</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Our servers don't store your videos or track your activity. We process your download request, and that's it. Your privacy matters to us.
                </p>
            </SectionCard>

            <SectionCard 
                title="Creative Ways to Use Downloaded TikTok Videos" 
                icon={Edit3} 
                iconBgGradient="from-rose-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Once you've saved a few videos, you might wonder what to do with them. Here are some popular use cases we've seen:
                </p>

                <SubSectionTitle>Build a Personal Learning Library</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    TikTok is full of incredible educational content, including cooking tutorials, fitness routines, language lessons, business tips, and DIY projects. Download the best ones and create your own reference library. Watch offline whenever you need a refresher.
                </p>

                <SubSectionTitle>Create Inspiration Collections</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Found a series of videos that motivates you? It could be entrepreneurship content, fitness transformations, or creative projects. Save them all and organize them by theme. It's like having a personalized inspiration board that works offline.
                </p>

                <SubSectionTitle>Study Content Creation Techniques</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Want to improve your own TikTok game? Download videos from creators you admire. Study their editing, transitions, pacing, and storytelling. Frame-by-frame analysis is way easier when you have the video saved locally.
                </p>

                <SubSectionTitle>Share With Non-TikTok Users</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Not everyone has TikTok installed, especially older family members. Downloading videos lets you share memorable content through text messages, WhatsApp, email, or any other platform.
                </p>

                <SubSectionTitle>Preserve Important Memories</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Perhaps you or your friends created TikToks documenting special moments—such as graduations, weddings, or travel adventures. Creators sometimes delete old content, and TikTok accounts get banned. Downloading ensures those memories don't disappear.
                </p>
            </SectionCard>

            <SectionCard 
                title="How to Download TikTok Videos on iPhone and Android?" 
                icon={Smartphone} 
                iconBgGradient="from-blue-500 to-indigo-600"
                cardBgClass="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The process works identically on both platforms, but let me break it down for each:
                </p>

                <SubSectionTitle>For iPhone Users</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    TikTok's iOS app makes link copying straightforward. Tap the Share arrow, select "Copy Link," then open Safari or Chrome and visit FSMVID.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Paste the link, choose your settings, and tap download. The video saves to your Photos app automatically.
                </p>

                <SubSectionTitle>For Android Users</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Same basic process. Share button, copy link, paste into FSMVID. Android gives you more control over where files are saved—you can choose specific folders in your file manager if you want to stay organized.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Both platforms work flawlessly with our downloader. No special apps to install, no complicated workarounds.
                </p>
            </SectionCard>

            <SectionCard 
                title="Downloading Private vs Public TikTok Videos" 
                icon={Shield} 
                iconBgGradient="from-amber-500 to-orange-600"
                cardBgClass="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Here's an important distinction: our tool only works with public videos.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    If someone has set their account to private, their videos aren't accessible through download tools. This is by design—privacy settings exist for a reason, and we respect that.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    For public videos, though? Fair game. If you can view it without being logged in, you can download it.
                </p>
            </SectionCard>

            <SectionCard 
                title="Best Practices for Downloading TikTok Content" 
                icon={Settings} 
                iconBgGradient="from-green-500 to-teal-600"
                cardBgClass="bg-gradient-to-br from-green-50 to-teal-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    After helping thousands of users save millions of videos, we've picked up some helpful tips:
                </p>
                {renderStyledList([
                    "<strong>Use WiFi when possible:</strong> Video files can be large, especially in HD. Save your mobile data for when you actually need it.",
                    "<strong>Organize downloads by category:</strong> Create folders for different types of content, such as cooking, fitness, comedy, and education. In the future, you will thank the present you.",
                    "<strong>Check storage space regularly:</strong> Videos add up fast. If you're downloading dozens of videos, ensure you've sufficient space.",
                    "<strong>Verify links before downloading:</strong> A typo in the URL results in the download failing. Double-check that you copied the full link.",
                    "<strong>Keep a backup of important videos:</strong> Phone storage can fail. If you have videos you absolutely want to keep, back them up to cloud storage or an external drive."
                ])}
            </SectionCard>

            <SectionCard 
                title="Comparing Video Download Tools and Options" 
                icon={BookOpen} 
                iconBgGradient="from-purple-500 to-violet-600"
                cardBgClass="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    You've got choices when it comes to saving TikTok content. Let's be honest about what's out there:
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Some tools require software installation. That's annoying and potentially risky if you don't know the source.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Others work through browser extensions. Again, you're trusting third parties with access to your browsing data.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Mobile apps exist, too, but many come loaded with ads or require subscriptions.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    FSMVID is different. It's web-based (no installation required), works immediately (no registration needed), and costs nothing (no subscriptions required). You get a clean, straightforward tool that does exactly what it promises.
                </p>
            </SectionCard>

            <SectionCard 
                title="Understanding Copyright and Fair Use" 
                icon={HelpCircle} 
                iconBgGradient="from-orange-500 to-red-600"
                cardBgClass="bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Real talk: just because you can download something doesn't mean you should do whatever you want with it.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    TikTok creators own their content. Downloading for personal use—watching offline, keeping in a private collection—is generally fine. But reposting someone else's video as your own? Not cool. And potentially illegal.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    If you want to use downloaded content publicly, get permission from the creator. Credit them properly. Respect their work.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Our tool gives you the technical ability to download videos. What you do with them is your responsibility.
                </p>
            </SectionCard>

            <SectionCard 
                title="Troubleshooting Common Download Issues" 
                icon={AlertTriangle} 
                iconBgGradient="from-red-500 to-rose-600"
                cardBgClass="bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    Sometimes downloads don't work perfectly. Here are the usual culprits and fixes:
                </p>
                <ul className="space-y-3 mb-6">
                    <li className="text-gray-700 dark:text-gray-300">
                        <strong>"Invalid URL" error:</strong> You probably didn't copy the full link. Go back to TikTok, copy again, and ensure you have everything.
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                        <strong>Download starts but fails midway:</strong> This is typically caused by a connection issue. Check your internet, try again.
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                        <strong>Video won't play after downloading:</strong> This may be due to a codec issue, although it is rare with MP4 files. Try a different video player.
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                        <strong>The download is extremely slow:</strong> This could be due to your internet speed or our servers being overloaded with heavy traffic. Try again in a few minutes.
                    </li>
                    <li className="text-gray-700 dark:text-gray-300">
                        <strong>The watermark isn't removed:</strong> Make sure you select the "Remove Watermark" option before downloading. If you forgot, download again with the correct setting.
                    </li>
                </ul>
            </SectionCard>

            <SectionCard 
                title="The Future of Video Downloading" 
                icon={TrendingUp} 
                iconBgGradient="from-indigo-500 to-blue-600"
                cardBgClass="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    TikTok continually updates its platform, which means download tools must adapt constantly. We're committed to staying current.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    As TikTok adds new features—such as longer videos, different formats, and enhanced quality options—we update our tool to support them. You shouldn't have to worry about whether a download will work. It should just work.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We're also exploring features such as batch downloading (saving multiple videos at once) and playlist support. If there's something you'd like to see, we're listening.
                </p>
            </SectionCard>

            <SectionCard 
                title="Getting Started With FSMVID" 
                icon={Star} 
                iconBgGradient="from-lime-500 to-green-600"
                cardBgClass="bg-gradient-to-br from-lime-50 to-green-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Ready to start saving your favorite TikTok content?
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The process couldn't be simpler. Find a video you love. Copy the link. Paste it into our downloader. Choose your quality and watermark preferences. Hit download. Done.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    No account creation. No payment information. No email verification. Just a straightforward tool that does exactly what you need it to do.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    We also offer downloaders for other platforms:
                </p>
                {renderStyledList([
                    <><a href="/instagram-media-saver" className="text-blue-600 hover:underline dark:text-blue-400 font-semibold">Instagram downloader</a> for Reels and posts</>,
                    <><a href="/youtube-video-saver" className="text-blue-600 hover:underline dark:text-blue-400 font-semibold">YouTube downloader</a> for long-form content</>,
                    <><a href="/facebook-media-grabber" className="text-blue-600 hover:underline dark:text-blue-400 font-semibold">Facebook downloader</a> for social videos</>
                ])}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                    The same simple process, the same reliable results.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                    So next time you come across a TikTok that's too good to lose, you know exactly what to do. Head to FSMVID, paste that link, and make that content yours to keep.
                </p>
            </SectionCard>
        </div>
      </div>
    </div>
  );
};

