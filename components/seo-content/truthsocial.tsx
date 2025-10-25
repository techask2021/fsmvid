"use client"; 

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Shield, Zap, Globe, Award, Info, Settings, TrendingUp, ThumbsUp, BookOpen, Users, Video, ExternalLink as ExternalLinkIcon } from "lucide-react";
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

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="nofollow noopener noreferrer" 
    className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
  >
    {children}
    <ExternalLinkIcon className="w-3 h-3" />
  </a>
);

export const TruthSocialSEOContent = () => {
  const platform = "truthsocial";
  
  return (
    <div className="w-full">
      <div className="container px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="space-y-8 md:space-y-10 py-12 md:py-16">
            <SectionCard 
                icon={Info}
                iconBgGradient="from-red-500 to-rose-600"
                cardBgClass="bg-gradient-to-br from-red-50 to-rose-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <Badge className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20 px-4 py-1 text-xs font-semibold">
                    About Truth Social Video Downloader
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Truth Social Video Downloader</h1>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Need a reliable way to save important videos from Truth Social? Our FSMVID Truth Social video downloader makes it incredibly simple to download and preserve video content from this growing social platform without any complicated steps.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Whether you're archiving political speeches, news updates, or community discussions, our free tool helps you download Truth Social videos in their original quality – no watermarks, no subscriptions, no software installation required. Let's explore everything you need to know about downloading Truth Social content!
                </p>
            </SectionCard>

            <SectionCard 
                title="What is Truth Social? Platform Overview" 
                icon={Globe} 
                iconBgGradient="from-indigo-500 to-purple-600"
                cardBgClass="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <ExternalLink href="https://truthsocial.com/">Truth Social</ExternalLink> is a social media platform launched in February 2022 that positions itself as a champion of free speech and open dialogue. The platform was created as an alternative to mainstream social networks, with a focus on allowing users to share their perspectives without heavy content moderation.
                </p>
                <SubSectionTitle>Who Created Truth Social?</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Truth Social was created by <ExternalLink href="https://en.wikipedia.org/wiki/Trump_Media_%26_Technology_Group">Trump Media & Technology Group (TMTG)</ExternalLink>, a media and technology company founded by Donald Trump, the 45th President of the United States.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The platform was developed following Trump's suspension from major social media platforms in January 2021.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The platform officially launched on February 21, 2022, initially available only on iOS devices through the Apple App Store.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The Android version was released later in 2022, followed by a web browser version that expanded accessibility to desktop users. According to <ExternalLink href="https://en.wikipedia.org/wiki/Truth_Social">Wikipedia</ExternalLink>, the platform had over 2 million active users within its first few months of operation.
                </p>
                <SubSectionTitle>Truth Social's Mission and Purpose</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The platform's stated mission is to create a space for open, free, and honest global conversation without discriminating against political ideology.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Truth Social markets itself as an alternative to "Big Tech" platforms, emphasizing reduced content moderation and prioritizing free speech principles.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The platform's interface is similar to Twitter (now X), featuring posts called "Truths" (equivalent to tweets), "Re-Truths" (similar to retweets), and standard social media features like following, commenting, and sharing.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Users can post text, images, videos, and links, making it a multimedia platform for political discourse and news sharing.
                </p>
                <SubSectionTitle>Key Features of Truth Social</SubSectionTitle>
                {renderStyledList([
                    "<strong>Video Posting:</strong> Users can upload and share videos up to several minutes long, perfect for political speeches and announcements.",
                    "<strong>Direct Messaging:</strong> Private conversations between users through an encrypted messaging system.",
                    "<strong>Verification System:</strong> Blue checkmarks for verified accounts, particularly for public figures and organizations.",
                    "<strong>Trending Topics:</strong> Real-time tracking of popular discussions and hashtags on the platform.",
                    "<strong>Web and Mobile Access:</strong> Available on iOS, Android, and desktop browsers for universal access."
                ])}
                <SubSectionTitle>Who Uses Truth Social?</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The platform primarily attracts conservative political commentators, Republican politicians, journalists covering political news, and supporters of free speech principles. Many political figures, media personalities, and news organizations maintain active presences on Truth Social alongside their accounts on other major platforms.
                </p>
            </SectionCard>

            <SectionCard 
                title="Why Download Videos from Truth Social?" 
                icon={Star} 
                iconBgGradient="from-blue-500 to-indigo-600"
                cardBgClass="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    As Truth Social has become an important platform for political discourse, having a way to preserve video content is increasingly valuable for various professional and personal purposes.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Unlike other social media platforms, Truth Social doesn't offer a built-in video download feature. This creates a challenge when you want to save important political speeches, news announcements, or community content for later viewing or archival purposes.
                </p>
                <SubSectionTitle>The Challenge of Saving Truth Social Content</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Content on Truth Social can become inaccessible if posts are deleted, accounts are suspended, or if you simply lose the original link. This makes having a reliable video downloader essential for:
                </p>
                {renderStyledList([
                    "<strong>Journalists and Researchers:</strong> Need to archive source material for investigative reporting and fact-checking without worrying about content disappearing.",
                    "<strong>Political Analysts:</strong> Want to preserve public statements and announcements for accurate analysis and historical records.",
                    "<strong>Educators:</strong> Looking to create teaching materials about current events and social media communication.",
                    "<strong>News Organizations:</strong> Must save video evidence for stories and maintain comprehensive archives of public statements.",
                    "<strong>Individual Users:</strong> Simply want to watch videos offline during travel or in areas with poor connectivity."
                ])}
                <SubSectionTitle>Why Standard Methods Don't Work?</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    You can't simply right-click and save videos from Truth Social like you might with regular web videos. The platform uses specialized streaming technology that prevents direct downloads. That's exactly where our Truth Social video downloader becomes essential – we've built a solution that handles these technical challenges while keeping the process simple for you.
                </p>
            </SectionCard>

            <SectionCard 
                title="How to Download Truth Social Videos in 3 Simple Steps?" 
                icon={Settings} 
                iconBgGradient="from-green-500 to-emerald-600"
                cardBgClass="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Our Truth Social video downloader is designed to be incredibly user-friendly. Even if you've never downloaded videos before, you'll find the process straightforward and quick. Here's your step-by-step guide:
                </p>
                <ol className="space-y-4 mb-6 list-none pl-0">
                    <li className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                        <div>
                            <strong className="text-gray-900 dark:text-white">Find Your Video on Truth Social</strong>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">Open <a href="https://truthsocial.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Truth Social</a> on your browser or app and navigate to the post containing the video you want to download. Click on the post to view it in full screen mode.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</div>
                        <div>
                            <strong className="text-gray-900 dark:text-white">Copy the Post Link</strong>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">Look for the three-dot menu (⋯) on the video post. Click it and select "Copy link to Truth" from the dropdown menu. This copies the unique URL (like truthsocial.com/@username/postid) to your clipboard.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</div>
                        <div>
                            <strong className="text-gray-900 dark:text-white">Download Your Video</strong>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">Return to <a href="/truthsocial-video-saver" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Truth Social Video Downloader tool</a>, paste the copied URL into the download field above, and click the Download button. Your video will start downloading within seconds – in original quality!</p>
                        </div>
                    </li>
                </ol>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    It really is that simple! The entire process takes less than 30 seconds from start to finish. Our video downloader handles all the technical complexity behind the scenes, so you just paste the link and get your video.
                </p>
                <SubSectionTitle>Works on All Your Devices</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Whether you're using an iPhone, Android phone, Windows PC, Mac, or tablet, our Truth Social downloader works perfectly. The tool is completely browser-based, which means it adapts automatically to your screen size and device type – just like our TikTok, Instagram, YouTube, Facebook, Twitter, Reddit, and Pinterest downloaders work across all devices.
                    </InterlinkText>
                </p>
            </SectionCard>

            <SectionCard 
                title="Why Users Trust FSMVID's Truth Social Downloader" 
                icon={ThumbsUp} 
                iconBgGradient="from-teal-500 to-cyan-600"
                cardBgClass="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    When it comes to downloading Truth Social videos, you need a tool that's reliable, fast, and respects your privacy. Here's why thousands of users choose our video downloader:
                </p>
                <SubSectionTitle>Reliable Downloads Every Time</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Our Truth Social downloader consistently works where other tools fail. We've built a robust system that ensures your downloads succeed, even when Truth Social updates their platform. You won't encounter frustrating error messages or failed downloads – just reliable video saving every single time.
                </p>
                <SubSectionTitle>Original Quality Preservation</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We download videos in their exact original quality as posted on Truth Social. If a video was uploaded in 1080p Full HD, that's exactly what you'll get. No compression, no quality reduction, no loss of detail. This is crucial for journalists and researchers who need accurate source material.
                </p>
                <SubSectionTitle>Lightning-Fast Processing Speed</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Nobody wants to wait forever for a simple download. Our system is optimized for speed, processing your requests almost instantly. You won't be stuck waiting minutes for a video – our average processing time is under 5 seconds. Perfect for when you need to quickly save breaking news or important announcements.
                </p>
                <SubSectionTitle>No Registration or Personal Information Required</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Unlike other download services that demand your email address or force you to create accounts, our Truth Social video downloader is completely open. Just visit, paste your link, download. We never ask for personal information, and we never will. Your privacy is protected from start to finish.
                </p>
                <SubSectionTitle>100% Free Forever</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    There are no premium tiers, no hidden costs, and no subscription plans. Download as many Truth Social videos as you need, whenever you need them, completely free. We believe in providing valuable tools without putting them behind paywalls. No tricks, no limitations – just unlimited free downloads.
                </p>
            </SectionCard>

            <SectionCard 
                title="Understanding Truth Social Video Formats and Quality" 
                icon={Video} 
                iconBgGradient="from-purple-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    When you download videos from Truth Social using our tool, you're getting high-quality MP4 files that work universally across all devices and platforms. Let's break down what you can expect:
                </p>
                <SubSectionTitle>Video Format: MP4</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    All Truth Social videos download as MP4 files, which is the universal standard for digital video. This means your downloaded videos will play on iPhones, Android devices, Windows computers, Macs, smart TVs, and virtually any device with a screen. You can also easily edit MP4 files if needed for your projects.
                </p>
                <SubSectionTitle>Quality Options Available</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The video quality you receive depends on the original upload quality on Truth Social. Our video downloader automatically detects and downloads the highest available quality:
                </p>
                {renderStyledList([
                    "<strong>1080p Full HD:</strong> High-definition videos with crystal-clear detail, perfect for professional use and detailed analysis.",
                    "<strong>720p HD:</strong> Standard high-definition quality that balances file size with excellent viewing quality.",
                    "<strong>480p SD:</strong> Standard definition for videos uploaded from mobile devices or older content."
                ])}
                <SubSectionTitle>Audio Quality</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Audio is preserved at its original quality without any degradation. This is especially important for political speeches and news content where clear audio is essential. You'll hear everything exactly as it was posted on Truth Social, with no muffled sound or audio artifacts.
                </p>
                <SubSectionTitle>File Sizes and Storage</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    File sizes vary depending on video length and quality. A typical 1-minute video in HD quality is usually 10-30 MB. Longer speeches or announcements will naturally be larger. For example, a 10-minute political speech in 1080p might be 100-200 MB. We recommend checking your device storage before downloading multiple long videos, especially if you're building a research archive.
                </p>
            </SectionCard>

            <SectionCard 
                title="Practical Uses for Downloaded Truth Social Videos" 
                icon={BookOpen} 
                iconBgGradient="from-rose-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Once you've used our tool to download videos, you unlock numerous possibilities for how to use and preserve this content responsibly:
                </p>
                <SubSectionTitle>Journalistic Documentation and Fact-Checking</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    News organizations and independent journalists use our video downloader to archive public statements for investigative reporting.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Having local copies ensures you can fact-check claims even if original posts are deleted. This creates accountability in public discourse and helps maintain accurate records of what was actually said.
                </p>
                <SubSectionTitle>Academic Research and Political Analysis</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Researchers studying political communication, social media trends, and public discourse rely on archived video content.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Our tool enables building comprehensive databases of social media content for academic papers, dissertations, and studies about modern political communication.
                </p>
                <SubSectionTitle>Educational Material Creation</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Teachers and educators download videos to create lesson materials about current events, media literacy, and critical thinking.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Having offline access means you can use these materials in classrooms without relying on internet connectivity or platform availability.
                </p>
                <SubSectionTitle>Personal Archival and Offline Viewing</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Sometimes you just want to save an important political speech or community discussion for later viewing when you don't have internet access – during flights, in remote areas, or simply to save mobile data. Downloaded videos give you complete freedom to watch content on your schedule, without buffering or connection issues.
                </p>
                <SubSectionTitle>Cross-Platform Sharing and Documentation</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Not everyone uses Truth Social. Downloaded videos can be shared with colleagues, friends, or family through email, messaging apps, or other platforms.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    This is particularly useful for sharing important announcements with people who don't have Truth Social accounts.
                </p>
            </SectionCard>

            <SectionCard 
                title="Truth Social vs Other Social Media Platforms" 
                icon={TrendingUp} 
                iconBgGradient="from-amber-500 to-yellow-600"
                cardBgClass="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    If you regularly download videos from social media, you might wonder how Truth Social compares to other platforms. Understanding these differences helps you appreciate why specialized download tools are necessary for each platform.
                </p>
                <SubSectionTitle>Truth Social vs Twitter/X</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Truth Social's interface is heavily inspired by Twitter (now called X), with similar features like posts, reposts, and following systems. However, Truth Social emphasizes reduced content moderation compared to Twitter's approach. Both platforms host political content and news, making them important sources for journalists and researchers. Our downloader works with both platforms, allowing you to archive political statements regardless of where they're posted.
                </p>
                <SubSectionTitle>Truth Social vs Facebook</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Facebook is a much larger, established platform with billions of users, while Truth Social focuses on a specific audience interested in free speech and political discourse. Facebook has extensive video features including live streaming, while Truth Social's video capabilities are more focused on shorter announcements and statements. Both platforms require specialized download tools to save video content.
                </p>
                <SubSectionTitle>Truth Social vs Other Platforms</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Each social media platform has unique characteristics. Entertainment-focused platforms offer different content types compared to Truth Social's political and news-oriented videos. The audiences and content purposes vary significantly, though all platforms benefit from having reliable download tools available for archiving and offline viewing.
                </p>
                <SubSectionTitle>All-in-One Download Solution</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The best part? Our FSMVID platform supports downloads from Truth Social and 30+ other major platforms. Whether you need to archive political content or entertainment videos, we provide one comprehensive tool for all your social media download needs across the web.
                </p>
            </SectionCard>

            <SectionCard 
                title="Legal and Ethical Guidelines for Downloads" 
                icon={Shield} 
                iconBgGradient="from-red-500 to-rose-600"
                cardBgClass="bg-gradient-to-br from-red-50 to-rose-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    While our tool makes downloading technically simple, it's important to understand proper and responsible use of downloaded content. Here are the key points to remember:
                </p>
                <SubSectionTitle>Copyright and Fair Use Principles</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Videos posted on Truth Social remain the intellectual property of their creators. Under U.S. <ExternalLink href="https://www.copyright.gov/fair-use/">fair use doctrine</ExternalLink>, downloading videos for personal viewing, educational purposes, news reporting, or commentary typically falls under protected use. However, re-uploading content to other platforms for commercial purposes without permission violates copyright law and platform terms of service.
                </p>
                <SubSectionTitle>Responsible Use Best Practices</SubSectionTitle>
                {renderStyledList([
                    "<strong>Only download publicly available content</strong> – Never attempt to access private or restricted posts.",
                    "<strong>Credit original creators</strong> when sharing or referencing downloaded content in your work.",
                    "<strong>Maintain journalistic integrity</strong> – Don't edit videos in misleading ways that misrepresent the original context.",
                    "<strong>Use for legitimate purposes</strong> – Journalism, research, education, and personal viewing are appropriate uses.",
                    "<strong>Don't monetize others' content</strong> without permission – Avoid commercial exploitation of downloaded videos.",
                    "<strong>Respect platform terms of service</strong> – Use downloads in ways that align with Truth Social's intended use."
                ])}
                <SubSectionTitle>Legitimate and Protected Use Cases</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Many entirely legitimate reasons exist for downloading Truth Social videos.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    These include journalists archiving source material, researchers collecting data for studies, educators creating teaching materials, individuals preserving content for reference, and fact-checkers maintaining records of public statements. These uses generally align with fair use principles under copyright law.
                </p>
                <SubSectionTitle>Understanding Platform Terms</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Truth Social, like all social media platforms, has terms of service that govern how users interact with content.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    While the platform emphasizes free speech, it still maintains intellectual property protections for creators.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    When you download videos, you're creating personal copies of publicly available content – similar to taking screenshots or bookmarking posts. The key is using these downloads responsibly and within legal boundaries.
                </p>
            </SectionCard>

            <SectionCard 
                title="Pro Tips for Successful Truth Social Downloads" 
                icon={Award} 
                iconBgGradient="from-indigo-500 to-purple-600"
                cardBgClass="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    After helping thousands of users download Truth Social videos, we've gathered these practical tips to ensure the best experience:
                </p>
                {renderStyledList([
                    "<strong>Always copy the complete URL</strong> including the 'https://' part – incomplete URLs won't work properly.",
                    "<strong>Use WiFi for larger video files</strong> to avoid consuming mobile data, especially for long speeches or news segments.",
                    "<strong>Verify the post link before pasting</strong> – Make sure you clicked on the actual post to get the correct URL format (truthsocial.com/@username/postid).",
                    "<strong>Organize downloads by date or topic</strong> for easier reference later, especially if you're building a research archive.",
                    "<strong>Check your device storage regularly</strong> – Video files can accumulate quickly and take up significant space. A 10-minute HD video can be 100-200 MB.",
                    "<strong>Download important content promptly</strong> – Posts can be deleted or accounts suspended, so save critical content when you find it.",
                    "<strong>Keep descriptive filenames</strong> to make videos easier to find. Include dates and speaker names in your file organization system.",
                    "<strong>Test with a short video first</strong> if you're new to the tool – this helps you understand the process before downloading longer content.",
                    "<strong>Bookmark this page</strong> for quick access whenever you need to download Truth Social videos in the future."
                ])}
                <SubSectionTitle>What To Do If a Download Doesn't Start?</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    While our video downloader is highly reliable, occasionally downloads might not start due to network issues or temporary platform changes. If this happens, try these steps: wait a few seconds and click download again, refresh the page and paste a fresh link, check that you copied the complete URL with https://, verify the post is still available on Truth Social, or try using a different browser if the problem persists.
                </p>
                <SubSectionTitle>Building an Organized Video Archive</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    For journalists and researchers building extensive archives, create a systematic organization structure on your computer.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Use folders organized by date (YYYY-MM-DD format works well for sorting), speaker names, topics, or events. Maintain a spreadsheet with metadata like download date, original post URL, speaker, topic, and keywords.
                </p>
            </SectionCard>

            <SectionCard 
                title="Why FSMVID Delivers the Best Results?" 
                icon={Star} 
                iconBgGradient="from-sky-500 to-blue-600"
                cardBgClass="bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Downloading from Truth Social can be challenging with many tools failing to deliver results. Here's why FSMVID succeeds where others fall short:
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <strong>Proven reliability you can count on.</strong> We've built a robust system that consistently works, even when Truth Social updates their platform. Our tool undergoes regular testing and updates to ensure continuous functionality. You won't encounter frustrating failures or cryptic error messages – just reliable downloads every time.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <strong>Speed matters for breaking news.</strong> When important political announcements happen, you need fast downloads to archive time-sensitive content. Our optimized system processes requests in seconds, not minutes. This speed advantage is critical for journalists working on deadline or researchers documenting rapidly developing stories.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <strong>Privacy and security come first.</strong> We never log your URLs, track your downloads, or collect any personal information. Your research and archival activities remain completely private. No accounts required, no tracking cookies, no data collection. We believe privacy is a fundamental right, not a premium feature.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <strong>Continuous maintenance and updates.</strong> Social platforms change frequently – new security measures, updated streaming protocols, interface modifications. We monitor Truth Social and update our downloader immediately when changes occur, ensuring uninterrupted service. You'll never wake up to find our tool suddenly stopped working.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <strong>Multi-platform expertise.</strong> Our experience handling downloads from 30+ platforms means we understand the nuances of different social media architectures. This expertise translates directly into better performance and reliability for your Truth Social downloads.
                </p>
            </SectionCard>

            <SectionCard 
                title="Ready to Start Downloading?" 
                icon={TrendingUp} 
                iconBgGradient="from-lime-500 to-green-600"
                cardBgClass="bg-gradient-to-br from-lime-50 to-green-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Now that you understand what Truth Social is, how our downloader works, and why it's the most reliable option available, you're ready to start preserving important political content. The process is genuinely simple and takes less than 30 seconds:
                </p>
                <ol className="space-y-2 mb-6 list-decimal pl-6">
                    <li>Find the Truth Social video you want to download</li>
                    <li>Click the three-dot menu and select "Copy link to Truth"</li>
                    <li>Paste the link into our downloader at the top of this page</li>
                    <li>Click Download and save your video in seconds!</li>
                </ol>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Whether you're a journalist archiving public statements, a researcher building databases, an educator creating teaching materials, or simply someone who wants to save important videos for offline viewing, our free tool provides the perfect solution.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Remember: FSMVID supports downloads from Truth Social and 30+ other major social media platforms. Bookmark our site as your one-stop solution for all video download needs!
                </p>
            </SectionCard>
        </div>
      </div>
    </div>
  );
};
