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

export function RumbleSEOContent() {
  const platform = "rumble";
  
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
                    About Rumble Video Downloader
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Rumble Video Downloader</h1>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    <InterlinkText currentPlatform={platform}>
                        Looking for a way to keep your favorite Rumble video for offline viewing? Whether you're heading somewhere with spotty internet or building a personal collection, our online Rumble video downloader tool makes it simple and hassle-free.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <InterlinkText currentPlatform={platform}>
                        Here at FSMVID, we provide a straightforward solution to download videos from Rumble to your device. No complicated software, no sketchy downloads - just an easy-to-use downloader that actually works.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="What Makes Rumble Different From Other Video Platforms?" 
                icon={Star} 
                iconBgGradient="from-blue-500 to-indigo-600"
                cardBgClass="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Rumble has become a popular alternative in the video-sharing universe. Unlike its competitors, this platform offers content creators more freedom and better monetization options.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        But there's a challenge - Rumble doesn't provide a built-in download button for most content, leaving you without an easy way to save videos for later viewing.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        That's where a reliable video downloader tool comes in handy. Once you've used our solution, you'll wonder how you ever managed without it!
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Why You Might Want to Download Rumble Videos?" 
                icon={HelpCircle} 
                iconBgGradient="from-cyan-500 to-blue-600"
                cardBgClass="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Before we explore how our tool works, let's discuss why you might want to save Rumble videos:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    <strong>Offline viewing</strong>,
                    " - Watch videos without an internet connection",
                    <strong>Creating a personal archive</strong>,
                    " - Build your collection of favorite content",
                    <strong>Saving videos</strong>,
                    " - Keep content that might be removed later",
                    <strong>Sharing content</strong>,
                    " - Send videos to friends who don't use Rumble",
                    <strong>Using clips</strong>,
                    " - Incorporate segments into your own projects"
                ])}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        I personally download tutorial videos before long flights. Nothing worse than wanting to learn something new at 30,000 feet only to stare at that spinning buffer wheel, right? :/
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="How Our Free Rumble Video Downloading Tool Works?" 
                icon={Zap} 
                iconBgGradient="from-purple-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Our tool at FSMVID makes the process ridiculously simple:
                    </InterlinkText>
                </p>
                <SubSectionTitle>Step 1: Find the Video URL</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        First, grab the web address of the Rumble video you want to download. Just find your video and copy the URL from your browser's address bar.
                    </InterlinkText>
                </p>
                <SubSectionTitle>Step 2: Paste the URL</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Once you've copied the link, come back to FSMVID and paste the URL into our downloader tool. It's that big input box you can't miss on our homepage.
                    </InterlinkText>
                </p>
                <SubSectionTitle>Step 3: Choose Your Quality</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        After pasting the URL, our system analyzes the available quality options. Depending on the original video, you might see options ranging from 240p all the way up to crisp 1080p HD.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Pro tip: If you're short on storage space, go for a lower quality. If video clarity matters more than size, grab that HD version!
                </p>
                <SubSectionTitle>Step 4: Download and Enjoy</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Hit that download button, and your Rumble video starts downloading to your device. Depending on your internet speed and the file size, it might take anywhere from a few seconds to a couple of minutes.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        That's it! No account creation, no premium subscriptions - just straightforward video downloading that actually works.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="What Makes Our Rumble Video Downloader Special?" 
                icon={Award} 
                iconBgGradient="from-green-500 to-emerald-600"
                cardBgClass="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        You might be thinking, "There are other video downloaders out there - what makes yours different?" Good question! Here's what sets our FSMVID tool apart:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    <strong>Completely free</strong>,
                    " - No hidden fees or premium tiers",
                    <strong>No registration required</strong>,
                    " - Just paste and download",
                    <strong>No app installation</strong>,
                    " - Works right in your browser",
                    <strong>Multiple quality options</strong>,
                    " - Choose what works for you",
                    <strong>Fast processing</strong>,
                    " - Get your videos quickly",
                    <strong>Clean interface</strong>,
                    " - No confusing buttons or ads"
                ])}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        I've tried plenty of other downloading services before helping create this one, and let me tell you - the number of fake download buttons out there is ridiculous! We built FSMVID specifically to avoid all that nonsense.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Troubleshooting Your Video Downloads" 
                icon={AlertTriangle} 
                iconBgGradient="from-red-500 to-rose-600"
                cardBgClass="bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Even the best tools can sometimes hit a snag. If you're having trouble with your Rumble video download, here are some quick fixes:
                    </InterlinkText>
                </p>
                <SubSectionTitle>Connection Issues</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Is your download slow or failing? Your internet connection might be the culprit. Try:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    "Switching from Wi-Fi to a wired connection if possible.",
                    "Restarting your router if speeds seem unusually slow.",
                    "Trying at a different time when your network might be less congested."
                ])}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        I once spent hours trying to figure out why nothing would download, only to discover my roommate was backing up their entire photo library online!
                    </InterlinkText>
                </p>
                <SubSectionTitle>Browser Compatibility</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Not all browsers handle downloads equally well. If you're running into issues:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    "Try using Chrome or Firefox, which tend to work best with our tool.",
                    "Make sure your browser is updated to the latest version.",
                    "Disable any aggressive ad blockers temporarily."
                ])}
                <SubSectionTitle>Quality Selection Problems</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Can't see all quality options for a video? This usually happens because:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    "The original Rumble video might only be available in limited qualities.",
                    "The content creator may have restricted certain quality options.",
                    "The video might be using a less common encoding format."
                ])}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        When this happens, grab the highest quality available - you can always compress it later if needed.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Creative Ways to Use Your Downloaded Videos" 
                icon={Edit3} 
                iconBgGradient="from-rose-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Now that you've mastered downloading videos from Rumble, let's talk about some cool ways to use your saved content:
                    </InterlinkText>
                </p>
                <SubSectionTitle>Create Compilation Videos</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Got a collection of videos on similar topics? Why not edit them together into a themed compilation? This is great for:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    "Educational content on specific subjects.",
                    "Funny moments from your favorite creators.",
                    "Evidence-based materials for research projects."
                ])}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Just remember to give proper credit to the original creators!
                    </InterlinkText>
                </p>
                <SubSectionTitle>Offline Learning Libraries</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Build your personal knowledge base by downloading tutorial videos and educational content. You can:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    "Organize videos by subject for easy reference.",
                    "Create playlists for different learning goals.",
                    "Have instant access to information even without internet."
                ])}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        This has saved me countless times when trying to fix something with spotty service!
                    </InterlinkText>
                </p>
                <SubSectionTitle>Digital Time Capsules</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Some content inevitably disappears from online platforms. By downloading videos that matter to you, you're essentially creating:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    "Archives of important moments or announcements.",
                    "Backups of content that might be removed.",
                    "Personal collections of videos that resonate with you."
                ])}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Think of it as creating your own personal museum of digital content.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Tips for Managing Your Downloaded Rumble Videos" 
                icon={ListChecks} 
                iconBgGradient="from-green-500 to-emerald-600"
                cardBgClass="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Once you've built up a collection of downloaded videos, keeping them organized becomes important. Here are some quick suggestions:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    <strong>Create dedicated folders</strong>,
                    " - Organize by creator, topic, or date",
                    <strong>Rename files</strong>,
                    " - Give videos descriptive names for easy finding",
                    <strong>Back up your favorite videos</strong>,
                    " - Protect against device failures",
                    <strong>Use media organization software</strong>,
                    " - For larger collections"
                ])}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        I started with just a few downloaded tutorials and somehow ended up with hundreds of videos within months! A little organization goes a long way.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Alternatives When You Need Options" 
                icon={BookOpen} 
                iconBgGradient="from-indigo-500 to-purple-600"
                cardBgClass="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        We strive for 100% uptime, but technology sometimes has other plans. If you ever need an alternative solution to save Rumble videos, here are a few options:
                    </InterlinkText>
                </p>
                {renderStyledList([
                    "Browser extensions that add download functionality.",
                    "Screen recording software as a last resort.",
                    "Specialized video downloading applications."
                ])}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        These alternatives often come with drawbacks - either they're not free, they install extra software on your system, or they result in lower quality videos. That's why we built FSMVID to be as reliable as possible.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Final Thoughts on Rumble Video Downloading" 
                icon={Star} 
                iconBgGradient="from-sky-500 to-blue-600"
                cardBgClass="bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Saving videos from Rumble doesn't have to be complicated or expensive. With FSMVID's free tool, you can build your personal library of content without any technical headaches.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Downloaded videos are perfect for those long commutes, flights, or areas with spotty internet. There's something incredibly satisfying about having your favorite content ready to watch anytime, anywhere - no buffering, no interruptions.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Ready to try it yourself? Head to our homepage, paste that video URL, and see just how easy video downloading can be. And if you find our tool helpful, maybe share it with a friend who could use it too. :)
                    </InterlinkText>
                </p>
            </SectionCard>
        </div>
      </div>
    </div>
  );
}
