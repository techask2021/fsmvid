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

export const BlueskySEOContent: React.FC = () => {
  const platform = "bluesky";
  
  return (
    <div className="w-full">
      <div className="container px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="space-y-8 md:space-y-10 py-12 md:py-16">
            <SectionCard 
                icon={Info}
                iconBgGradient="from-blue-500 to-purple-600"
                cardBgClass="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <Badge className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20 px-4 py-1 text-xs font-semibold">
                    About Bluesky Video Saver
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Bluesky Video Saver</h1>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    As Bluesky solidifies its place as a vibrant hub for artists, creators, and filmmakers, users frequently encounter a significant limitation: the platform offers no built-in feature to download videos.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Whether it's a stunning animation, a critical news clip, or a memorable moment you want to keep, the inability to save content directly can be frustrating. The solution is a dedicated Bluesky Video Saver, a specialized tool designed to bridge this gap.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    This comprehensive guide will walk you through everything you need to know about saving videos from Bluesky, starting with the simplest, safest, and most efficient option available: the free FSMVID Bluesky Video Saver.
                </p>
            </SectionCard>

            <SectionCard 
                title="Why Use a Bluesky Video Saver? 4 Key Reasons" 
                icon={Star} 
                iconBgGradient="from-green-500 to-emerald-600"
                cardBgClass="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        The need to download a video from Bluesky extends far beyond simple convenience. For content creators, marketers, archivists, and everyday users, a Bluesky Video Saver serves several critical functions that enhance the platform's utility.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    The core motivations are tied to control, accessibility, and the creative potential locked within the platform's visual content.
                </p>

                <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-lg">Offline Viewing and Access</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            The most immediate benefit is the ability to watch videos without an internet connection. This is invaluable for commuters, travelers, or anyone in an area with unreliable Wi-Fi. Saving a video to a device ensures that important or entertaining content is always accessible, regardless of connectivity status.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-lg">Content Archiving and Preservation</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            Digital content is often ephemeral. Posts can be deleted by the creator, accounts can be suspended, or platforms can change their policies. For users who value preservation, a Bluesky Video Saver acts as an essential archiving tool, allowing them to create a personal library of important moments, reference material, or content they fear might disappear.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-lg">Repurposing and Content Creation</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            For social media managers, marketers, and content creators, Bluesky is a source of inspiration and raw material. Downloading videos allows them to analyze trending content, create reaction videos, compile highlights, or make memes and GIFs for their own audiences.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-lg">Easy Cross-Platform Sharing</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            Sharing a Bluesky video on other platforms like Instagram, Facebook, or even in a private message can be cumbersome. Many platforms do not support direct embedding of Bluesky links. Downloading the video file is often the most reliable way to share it directly, ensuring the content is displayed natively and reaches a wider audience without forcing viewers to click an external link.
                        </p>
                    </div>
                </div>
            </SectionCard>

            <SectionCard 
                title="How to Save Bluesky Videos in 3 Simple Steps with FSMVID?" 
                icon={Zap} 
                iconBgGradient="from-purple-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        Saving your favorite videos from Bluesky should not be a complicated process. The FSMVID Bluesky Video Saver is a 100% free, web-based tool designed for maximum simplicity and security.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    It requires no software installation, no browser extensions, and no user account, and it delivers high-quality, watermark-free downloads every time.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Follow these three straightforward steps to save any public Bluesky video to your device.
                </p>

                <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-lg">Step 1: Copy the Bluesky Post URL</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            First, you need the unique web address of the Bluesky post containing the video. Navigate to the post on either the Bluesky mobile app or the website. Look for the "Share" icon, which typically looks like a curved arrow or three dots, and tap or click on it. From the menu that appears, select "Copy link to post".
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-lg">Step 2: Paste the URL into FSMVID</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            Next, open your web browser and go to the FSMVID Bluesky Video Saver page. You will see a clean, simple interface with a single input field. Paste the Bluesky post link you copied in the previous step into this box.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-lg">Step 3: Download Your Video</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            After pasting the link, click the "Process Video" or "Download" button. The FSMVID tool will quickly analyze the link and prepare the video file for download. Once processing is complete, a "Download Video" button will appear. Click this button to save the video directly to your computer, smartphone, or tablet in the high-quality MP4 format.
                        </p>
                    </div>
                </div>
            </SectionCard>

            <SectionCard 
                title="What Are the Best Bluesky Video Saver Tools? A Complete Breakdown" 
                icon={Settings} 
                iconBgGradient="from-amber-500 to-yellow-600"
                cardBgClass="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The landscape of Bluesky Video Saver tools can be broken down into three distinct categories, each with its own set of advantages and disadvantages.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Understanding these differences is key to choosing a method that is not only effective but also safe and suited to your needs. While some options offer convenience, they often come with hidden trade-offs in security and privacy.
                </p>

                <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-lg">Type 1: Web-Based Downloaders (The Easiest Method)</h4>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Web-based downloaders are the most straightforward and accessible tools for saving Bluesky videos. They function through a simple copy-and-paste mechanism: you provide the post URL, and the website processes it to deliver a downloadable video file. This method requires no software installation and works universally across all devices with a web browser, including desktops, laptops, Android phones, and iPhones.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            <strong>Examples:</strong> <InterlinkText currentPlatform={platform}>FSMVID is a prime example of this category, prioritizing a clean, ad-free, and secure user experience.</InterlinkText> Other tools in this space include Typefully, Nuelink, and Circleboom.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <strong className="text-green-600 dark:text-green-400">Pros:</strong>
                                <ul className="mt-2 space-y-1">
                                    <li>• Universal Compatibility: Works on any operating system or device.</li>
                                    <li>• No Installation: Eliminates the risk of installing malicious software.</li>
                                    <li>• Enhanced Security: These tools only interact with the single URL you provide, minimizing data exposure.</li>
                                </ul>
                            </div>
                            <div>
                                <strong className="text-red-600 dark:text-red-400">Cons:</strong>
                                <ul className="mt-2 space-y-1">
                                    <li>• Requires navigating to a separate website for each download.</li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mt-4">
                            <strong>Verdict:</strong> For the vast majority of users, web-based downloaders represent the ideal balance of simplicity, security, and functionality. FSMVID stands out in this category by offering a fast, free, and reliable service without watermarks or the need for a user account.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-lg">Type 2: Browser Extensions (The Convenient Method)</h4>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Browser extensions offer a more integrated experience by adding a "Download" button directly onto the Bluesky website. When you are browsing Bluesky and find a video you want to save, you can simply click this button to initiate the download. This one-click convenience is appealing for users who need to download videos frequently.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            <strong>Examples:</strong> Several extensions named "Bluesky Video Downloader" are available on the Chrome Web Store and as Firefox add-ons.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <strong className="text-green-600 dark:text-green-400">Pros:</strong>
                                <ul className="mt-2 space-y-1">
                                    <li>• Seamless Integration: The download process is extremely convenient and fast.</li>
                                </ul>
                            </div>
                            <div>
                                <strong className="text-red-600 dark:text-red-400">Cons:</strong>
                                <ul className="mt-2 space-y-1">
                                    <li>• Software Installation: Requires adding third-party software to your browser.</li>
                                    <li>• Security and Privacy Risks: To function, these extensions require permission to "access your data for bsky.app". This level of access creates a potential vulnerability. Some security analysis tools have even flagged certain downloader extensions as having a "very high risk likelihood" of containing malware.</li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mt-4">
                            <strong>Verdict:</strong> The convenience of browser extensions comes at a significant potential cost to your security and privacy. Granting a third-party tool the ability to read all data on a website you are visiting is a risk that many users unknowingly take. The architectural design of a web-based tool like FSMVID, which only processes a specific URL provided by the user, is inherently safer. It offers a smarter, more secure choice without compromising on the core functionality of downloading a video.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-lg">Type 3: Developer Tools & APIs (The Power-User Method)</h4>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            For developers, data analysts, and serious archivists, more advanced solutions exist in the form of APIs and command-line interface (CLI) tools. These are designed for programmatic and bulk downloading, allowing users to automate the process of saving large numbers of videos.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            <strong>Examples:</strong> Apify offers a "Bluesky Video Downloader" that can be scheduled, run via an API, and integrated with other services like Google Drive or Zapier. Open-source projects like Vidsky on GitHub also provide client-side apps for developers to use or modify.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <strong className="text-green-600 dark:text-green-400">Pros:</strong>
                                <ul className="mt-2 space-y-1">
                                    <li>• Automation: Capable of downloading videos at scale without manual intervention.</li>
                                    <li>• Data Extraction: Can often extract metadata alongside the video, providing output in formats like JSON or CSV.</li>
                                </ul>
                            </div>
                            <div>
                                <strong className="text-red-600 dark:text-red-400">Cons:</strong>
                                <ul className="mt-2 space-y-1">
                                    <li>• Technical Expertise Required: Not suitable for non-technical users.</li>
                                    <li>• Potential Costs: Services like Apify operate on a pay-per-use model, which can become expensive for large volumes of downloads.</li>
      </ul>
                            </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mt-4">
                            <strong>Verdict:</strong> These are powerful but highly specialized tools. For the average user simply looking to save a few videos, they are unnecessarily complex and costly. This further reinforces the value of a simple, free, and accessible tool like FSMVID.
                        </p>
                    </div>
                </div>
            </SectionCard>

            <SectionCard 
                title="Is It Legal to Download Videos from Bluesky? Understanding Copyright" 
                icon={Shield} 
                iconBgGradient="from-green-500 to-emerald-600"
                cardBgClass="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Using a Bluesky Video Saver is a technical process, but the legality of that action depends entirely on what you intend to do with the downloaded content. The tools themselves are neutral, much like a photocopier or a screen recorder; it is the user's intent that determines whether their actions respect copyright law. This section provides a clear overview of the key considerations, but it is not a substitute for formal legal advice.
                </p>

                <SubSectionTitle>What Bluesky's Terms of Service Say?</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    According to Bluesky's official Terms of Service, users retain ownership of the intellectual property rights for the content they post, including videos. However, by uploading content, users grant Bluesky a broad, worldwide, royalty-free license to use, reproduce, modify, and display that content as needed to operate and promote the service.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Crucially, this license is between the user and Bluesky. It does not transfer any rights to other users. The platform's Community Guidelines explicitly prohibit actions that infringe on intellectual property, including copyright violations.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    This means that Bluesky's own rules require users to respect the rights of creators, and the platform provides no permission for you to download another person's content for redistribution.
                </p>

                <SubSectionTitle>Copyright Law 101: The Creator is the Owner</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The foundation of copyright law is straightforward: the moment an individual creates an original work and fixes it in a tangible medium—such as by recording and posting a video—they automatically own the copyright to that work.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    This protection is automatic and does not require formal registration. Nearly all content shared on social media, from photos and text to videos, is considered a protected work under copyright law.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Therefore, downloading someone else's video and then re-uploading it to your own account, using it in a marketing campaign, or distributing it publicly in any way without explicit permission from the creator is a potential copyright infringement.
                </p>

                <SubSectionTitle>The Golden Rule: Personal Use vs. Public Redistribution</SubSectionTitle>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The risk associated with downloading a Bluesky video can be understood by separating the action into two distinct use cases:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">Personal Use (Generally Low-Risk)</h5>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            Saving a video to your personal device for private, offline viewing is widely considered a low-risk activity. This is often compared to "time-shifting," like recording a television show to watch later. While a technical copy is made, the intent is for personal, non-commercial use, and it is highly unlikely to face any legal challenge as long as the video is not shared or distributed.
                        </p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                        <h5 className="font-semibold text-red-800 dark:text-red-200 mb-2">Public Redistribution (High-Risk)</h5>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            The risk level increases dramatically the moment you share the downloaded video with others. Re-uploading the video to your own Bluesky profile, posting it on other social media platforms, or incorporating it into a commercial project without the creator's consent is a clear and high-risk copyright violation.
                        </p>
                    </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Simply giving credit to the original creator is not a substitute for obtaining permission; attribution does not equal a license.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    A concept known as "Fair Use" allows for the limited use of copyrighted material without permission for purposes such as commentary, criticism, parody, or news reporting. However, fair use is a complex and subjective legal defense that can only be definitively determined by a judge in a court of law. It should not be relied upon as a blanket permission for re-uploading content.
                </p>
            </SectionCard>

            <SectionCard 
                title="Frequently Asked Questions about Saving Bluesky Videos" 
                icon={HelpCircle} 
                iconBgGradient="from-orange-500 to-red-600"
                cardBgClass="bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-lg">What format do Bluesky videos download in?</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            Most high-quality video downloaders, including FSMVID, save videos in the MP4 format. MP4 is a universally compatible format that plays on virtually all modern devices, video players, and editing software.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-lg">What is the quality of the downloaded video?</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            The quality of the downloaded video is directly dependent on the quality of the original upload. A reliable downloader will always grab the highest resolution version of the video that Bluesky makes available. For example, if the original video was uploaded in 720p, the tool will provide a 720p download.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-lg">Can I use a Bluesky Video Saver on my phone?</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            Yes. Web-based tools like FSMVID are designed to be fully functional on mobile devices. You can use them in any modern web browser on both Android and iOS smartphones and tablets without needing to install an app. Browser extensions, on the other hand, are typically limited to desktop browsers.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-lg">Will the downloaded video have a watermark?</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            Reputable tools like the FSMVID Bluesky Video Saver provide downloads that are completely free of watermarks. Some other free online tools may add their own logo or branding to the downloaded video as a form of promotion, which can be undesirable for users who want a clean copy of the original content.
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-lg">Can I download videos from private Bluesky accounts?</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            FSMVID is designed for the most common and legitimate use case: downloading publicly available videos. This approach respects user privacy and aligns with the intended use of the platform.
                        </p>
                    </div>
                </div>
            </SectionCard>

            <SectionCard 
                title="Beyond Bluesky: Download Videos from Any Platform with FSMVID" 
                icon={Globe} 
                iconBgGradient="from-cyan-500 to-blue-600"
                cardBgClass="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <InterlinkText currentPlatform={platform}>
                        The power and simplicity of the FSMVID toolset are not limited to just one platform. Now that you have seen how effortless it is to save Bluesky videos, you can apply the same straightforward process to download content from all your other favorite social media networks.
                    </InterlinkText>
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    FSMVID offers a comprehensive suite of free video downloaders, ensuring you have a reliable solution for any platform.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Whether you are a social media manager archiving content, a creator gathering inspiration, or just a user saving memorable clips, FSMVID has you covered.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300">
                            Need to save a clip from X (formerly Twitter)? Check out our <a href="/twitter-video-saver" className="text-blue-400 hover:underline dark:text-blue-300">Twitter Video Downloader</a>.
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300">
                            Archiving a memory from Facebook? Use our <a href="/facebook-media-grabber" className="text-blue-600 hover:underline dark:text-blue-400">Facebook Video Saver</a>.
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300">
                            Capturing professional content from LinkedIn? Our <a href="/linkedin-content-saver" className="text-blue-700 hover:underline dark:text-blue-500">LinkedIn Video Downloader</a> is here to help.
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300">
                            Saving a viral moment from TikTok? Our <a href="/tiktok-video-saver" className="text-gray-800 hover:underline dark:text-gray-200">TikTok Video Downloader</a> makes it easy.
                        </p>
                    </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Explore the full range of FSMVID tools to create a complete, secure, and unified workflow for all your social media video saving needs.
                </p>
            </SectionCard>

            <SectionCard 
                title="Your Go-To Bluesky Video Saver" 
                icon={ThumbsUp} 
                iconBgGradient="from-purple-500 to-pink-600"
                cardBgClass="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
            >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Navigating the world of social media content requires tools that are both powerful and trustworthy. While Bluesky is a fantastic platform for visual content, its lack of a native download feature necessitates a third-party solution.
                </p>
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Ready to save your first Bluesky video?
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        Visit the FSMVID Bluesky Video Saver today and see how easy it is!
                    </p>
                </div>
            </SectionCard>
        </div>
      </div>
    </div>
  );
};
