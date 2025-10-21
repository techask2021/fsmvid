"use client"; 

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Shield, Zap, Globe, Award, Info, HelpCircle, Settings, Edit3, TrendingUp, ListChecks, AlertTriangle, ThumbsUp, BookOpen } from "lucide-react";

const howFsmvidWorksSteps = [
  { step: "1", title: "URL Analysis", desc: "Our system analyzes the URL to identify the platform and content type.", color: "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700" },
  { step: "2", title: "Content Extraction", desc: "We securely connect to extract the video or image data.", color: "from-green-500 to-green-600 dark:from-green-600 dark:to-green-700" },
  { step: "3", title: "Quality Processing", desc: "We process the content to provide multiple quality and format options.", color: "from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700" },
  { step: "4", title: "Secure Download", desc: "We provide secure download links that expire for privacy protection.", color: "from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700" },
];

export function HomeSEOContent() {
  const whatIsFsmvidIntro = (
    <>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        FSMVID is a powerful and user-friendly online tool that allows you to download videos, images, and short
        clips from various social media platforms. With support for over 20 platforms including YouTube, TikTok,
        Instagram, Facebook, Twitter, and many more, FSMVID has become the go-to solution for content creators,
        marketers, and everyday users.
      </p>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        Our platform is completely free to use, requires no registration, and processes downloads quickly and
        securely. Whether you're looking to save a funny TikTok video, download a YouTube tutorial, or backup
        your Instagram posts, FSMVID makes it simple and efficient.
      </p>
    </>
  );

  const whatIsFsmvidFeatures = [
    "No software installation required",
    "Works on all devices and browsers",
    "Multiple quality options available",
    "Supports various file formats",
  ];

  const whyUseIntro = (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Social media platforms are designed for online viewing, but there are many legitimate reasons why you
      might want to download content. Our website usage rating shows these are the top reasons people download social media videos:
    </p>
  );

  const whyUseReasons = [
    { title: "Offline viewing", desc: "Save social media videos to watch when you don't have internet (like during that long flight or subway commute)" },
    { title: "Content collections", desc: "Maybe you're building a personal library of workout videos or cooking tutorials from various social media sources" },
    { title: "Preserving memories", desc: "That adorable video from social media might disappear if they decide to delete their account" },
    { title: "Educational purposes", desc: "Downloading lectures or tutorials from social media for your studies" },
    { title: "Content creation", desc: "Saving inspiration for your own videos from social media (just remember to respect copyright!)" },
  ];
  
  const howFsmvidWorksIntro = (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Using the FSMVID social media video downloader app couldn't be simpler. Seriously, if you can copy and paste, you can use this tool to download social media videos. Here's the process:
    </p>
  );

  const supportedPlatformsIntro = (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      FSMVID supports a wide range of social media platforms. Our tool isn't a one-trick pony and works with an impressive array:
    </p>
  );

  const supportedPlatformsList = [
    { name: "YouTube", href: "/youtube-video-saver" },
    { name: "TikTok", href: "/tiktok-video-saver" },
    { name: "Instagram", href: "/instagram-media-saver" },
    { name: "Facebook", href: "/facebook-media-grabber" },
    { name: "Twitter", href: "/twitter-video-saver" },
    { name: "Dailymotion", href: "/dailymotion-video-saver" },
    { name: "Pinterest", href: "/pinterest-media-saver" },
    { name: "LinkedIn", href: "/linkedin-content-saver" },
    { name: "Snapchat", href: "/snapchat-story-saver" },
    { name: "Reddit", href: "/reddit-video-saver" },
    { name: "Imdb", href: "/imdb-video-saver" }, 
  ];

  const renderStyledList = (items: string[]) => (
    <ul className="space-y-2 mb-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-3 mt-1 shrink-0" />
          <span className="text-gray-700 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: item }}></span>
        </li>
      ))}
    </ul>
  );

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

  return (
    <div className="w-full">
      <div className="container px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="space-y-8 md:space-y-10 py-12 md:py-16"> {/* Added py padding here */}
          <SectionCard 
            icon={Info} // Using Info icon for the intro card
            iconBgGradient="from-green-500 to-emerald-600" // Changed to green gradient
            cardBgClass="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70" // Changed to green gradient
          >
            <div className="text-center">
              <Badge className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20 px-4 py-1 text-xs font-semibold">
                About FSMVID
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Free Social Media Video Downloader</h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Spotted an awesome video on social media you need to save? Whether it's a hilarious TikTok, an informative YouTube tutorial, or a Facebook memory – we all need to download videos sometimes.
              </p>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                That's where FSMVID comes in – your new best friend for all things social media video downloading.
              </p>
            </div>
          </SectionCard>

          <SectionCard 
            title="What is FSMVID?" 
            icon={Star} 
            iconBgGradient="from-blue-500 to-indigo-600"
            cardBgClass="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/70"
          >
            {whatIsFsmvidIntro}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-6">
              {whatIsFsmvidFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 shrink-0" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard 
            title="Why Use a Social Media Video Downloader?" 
            icon={Award} 
            iconBgGradient="from-green-500 to-emerald-600"
            cardBgClass="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/70"
          >
            {whyUseIntro}
            <div className="space-y-3">
              {whyUseReasons.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mt-1.5 shrink-0"></div>
                  <div>
                    <strong className="text-gray-800 dark:text-gray-100">{item.title}:</strong>
                    <span className="ml-1">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard 
            title="How FSMVID Works" 
            icon={Zap} 
            iconBgGradient="from-purple-500 to-pink-600"
            cardBgClass="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70"
          >
            {howFsmvidWorksIntro}
            <div className="space-y-5 mt-4">
              {howFsmvidWorksSteps.map((item) => (
                <div key={item.step} className="flex items-start space-x-4">
                  <div className={`flex items-center justify-center w-8 h-8 bg-gradient-to-br ${item.color} text-white rounded-lg font-bold shadow-sm shrink-0`}>
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard 
            title="Supported Platforms" 
            icon={Globe} 
            iconBgGradient="from-cyan-500 to-blue-600"
            cardBgClass="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/70"
          >
            {supportedPlatformsIntro}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {supportedPlatformsList.map((platform) => (
                <Link href={platform.href} key={platform.name} className="block bg-white dark:bg-slate-700/50 rounded-lg p-2.5 shadow-sm border border-gray-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 shrink-0" />
                    <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{platform.name}</span>
                  </div>
                </Link>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">...and many more! Our full list of supported platforms is available on the main page.</p>
          </SectionCard>

          <SectionCard title="Feature Spotlight: What Makes FSMVID Special?" icon={ThumbsUp} iconBgGradient="from-teal-500 to-cyan-600" cardBgClass="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70">
            <p>Let's talk about what makes the FSMVID social media video downloader stand out from the crowd. Because let's face it, there are other video downloader options out there – but they're not all created equal. Our app rating proves this distinction.</p>
            <SubSectionTitle>No Registration Required</SubSectionTitle>
            <p>First things first – <strong>you don't need to create an account or register to use the FSMVID app</strong>. Just visit the website or use the Android app and start downloading social media videos. No email required, no personal details needed, no invasive tracking – just pure, unadulterated video downloading freedom. This is a core part of our high rating.</p>
            
            <SubSectionTitle>Quality Options for Social Media Videos</SubSectionTitle>
            <p>Want to save storage space on your Android device or need the absolute best quality for a presentation? FSMVID gives you options to download videos your way:</p>
            {renderStyledList([
              "Download social media videos in HD (720p, 1080p)",
              "Choose 4K when available for social media videos",
              "Select lower resolutions to save space when you download videos",
              "Audio-only option for music videos from social media (MP3 format)"
            ])}
            
            <SubSectionTitle>Format Flexibility for Social Media Videos</SubSectionTitle>
            <p>Different devices and purposes require different formats. Whether you're editing on a Mac, watching on an Android tablet, or archiving for the future, FSMVID has you covered:</p>
            {renderStyledList([
              "MP4 – The universal video format, compatible with almost everything.",
              "MKV – For those who want to preserve the highest quality and multiple audio tracks.",
              "WebM – A lightweight format perfect for web use and embedding.",
              "MP3 – For audio-only downloads from video sources."
            ])}

            <SubSectionTitle>Fast Downloads of Social Media Videos</SubSectionTitle>
            <p>Life's too short to wait forever for downloads. Our optimized servers and efficient processing mean you get your social media videos quickly. We're constantly working to improve our app speed and maintain a top rating for performance.</p>

            <SubSectionTitle>Mobile-Friendly Interface for Social Media Video Downloads</SubSectionTitle>
            <p>Need to download videos on the go? No problem! FSMVID works perfectly on mobile browsers for both Android and iOS. The interface is responsive and easy to navigate, making mobile social media video downloads a breeze. Our Android app further enhances this experience.</p>

            <SubSectionTitle>Completely Free Social Media Video Downloader</SubSectionTitle>
            <p>Perhaps the best feature – <strong>it's 100% free to use the FSMVID app</strong>. No hidden fees, no subscription charges, no premium-only features. Just unlimited social media video downloads, anytime you want. This commitment to free access is central to our mission and user rating.</p>
          </SectionCard>

          <SectionCard title="The FSMVID Experience vs. Other Social Media Video Downloaders" icon={BookOpen} iconBgGradient="from-indigo-500 to-purple-600" cardBgClass="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/70">
            <p>I've tried a ton of different social media video downloaders, from dedicated Android apps to obscure websites. Here's why I believe FSMVID offers a superior experience, reflected in its consistently high rating:</p>
            <SubSectionTitle>FSMVID App vs. Desktop Software</SubSectionTitle>
            {renderStyledList([
                "Installation: The FSMVID social media video downloader requires no installation for its web version. Desktop software often requires downloads and setup.",
                "Updates: The web version is always up-to-date with the latest platform support and features. Desktop software needs manual updates.",
                "Cross-platform: Use FSMVID on any device with a browser (Windows, Mac, Linux, Android, iOS). Desktop software is OS-specific.",
                "Rating: Our user satisfaction rating consistently beats many desktop alternatives due to ease of use and accessibility."
            ])}
            <SubSectionTitle>FSMVID vs. Other Online Social Media Video Downloaders</SubSectionTitle>
            {renderStyledList([
                "Speed: In my experience, the FSMVID app processes social media videos faster than many competitors.",
                "Platform support: Many online downloaders specialize in one or two platforms. FSMVID is a versatile, all-in-one solution.",
                "Quality options: Some downloaders only offer one quality level. FSMVID provides choices.",
                "Rating & Trust: Check our user rating and reviews; we prioritize transparency and reliability over intrusive ads or misleading practices common elsewhere."
            ])}
            <SubSectionTitle>FSMVID Website vs. Browser Extensions</SubSectionTitle>
            {renderStyledList([
                "Privacy: Browser extensions can sometimes be a privacy risk, requesting broad permissions. FSMVID (website and dedicated Android app) is more direct and transparent.",
                "Resource usage: Extensions can slow down your browser. Our web tool is lightweight.",
                "Compatibility: Extensions can break with browser updates. FSMVID is consistently maintained."
            ])}
            <p className="mt-4">IMO, the web-based approach of FSMVID, complemented by its optional Android app, is just smarter, safer, and more convenient for most users wanting to download social media videos.</p>
          </SectionCard>

          <SectionCard title="Smart Ways to Use Your Downloaded Social Media Videos" icon={Edit3} iconBgGradient="from-rose-500 to-pink-600" cardBgClass="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/70">
            <SubSectionTitle>Create Your Own Social Media Video Collections</SubSectionTitle>
            <p>I've created themed collections of my favorite comedy skits from TikTok, workout routines from Instagram, and even cooking tutorials from YouTube. It's like having a personalized, offline library of the best social media content.</p>
            <SubSectionTitle>Offline Learning with Social Media Videos</SubSectionTitle>
            <p>Downloading educational content means you can learn anywhere, anytime – even without Wi-Fi. This is perfect for students or anyone looking to upskill using resources from platforms like YouTube or specialized course sites that allow video embedding from social media.</p>
            <SubSectionTitle>Social Media Content Creation</SubSectionTitle>
            <p>Many content creators download inspiration videos, soundbites (with permission!), or B-roll footage from various social media sources. FSMVID can be a valuable tool in your creative arsenal, helping you efficiently gather materials for your next viral hit. Always ensure you have the rights or are following fair use guidelines.</p>
            <SubSectionTitle>Family Archives of Social Media Videos</SubSectionTitle>
            <p>Social media platforms come and go, and accounts can be deleted. Downloading those precious family moments shared on Facebook or Instagram ensures they're preserved forever, independent of the platform's fate or the original poster's account status.</p>
          </SectionCard>
          
          <SectionCard title="Tips and Tricks for Power Users of the FSMVID Website" icon={Settings} iconBgGradient="from-amber-500 to-yellow-600" cardBgClass="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-800/70">
            <p>Ready to take your FSMVID social media video download experience to the next level? Here are a few tips from a seasoned user:</p>
            <SubSectionTitle>Social Media Video Quality Selection</SubSectionTitle>
            {renderStyledList([
                "For videos you'll download and watch on a big screen (like a TV or projector), always go for the highest available quality (1080p, 4K).",
                "For mobile viewing on Android or iOS, 720p often provides a good balance between quality and file size.",
                "For audio content from social media (like podcasts or music), the MP3 format is usually your best bet for compatibility and small file size."
            ])}
            <SubSectionTitle>Organizing Downloaded Social Media Videos</SubSectionTitle>
            <p>Create a folder system on your Android or other device to keep your downloaded social media videos organized by platform, topic, or date. This makes it much easier to find what you're looking for later.</p>
            <SubSectionTitle>Download Timing for Social Media Videos</SubSectionTitle>
            <p>If you're downloading popular social media videos during peak internet usage times, you might experience slower speeds. Try downloading during off-peak hours for potentially faster results. Our app rating often reflects our consistent speed, but local conditions matter.</p>
          </SectionCard>

          <SectionCard title="Common Issues and Quick Fixes When Downloading Social Media Videos" icon={AlertTriangle} iconBgGradient="from-red-500 to-rose-600" cardBgClass="bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/70">
            <p>Even the best social media video downloader tools sometimes hit snags, often due to changes on the social media platforms themselves. Here’s how to troubleshoot common issues with the FSMVID app:</p>
            <SubSectionTitle>"Video Unavailable" Messages When Downloading Social Media Content</SubSectionTitle>
            {renderStyledList([
                "Check if the social media video is private or restricted by age/location. FSMVID can only access publicly available content.",
                "Try copying the URL again directly from the browser's address bar or the 'Share' button on the social media app.",
                "Verify that the social media platform hasn't removed the video or the user account isn't deleted.",
                "On Android, try clearing the app cache for your browser or the FSMVID app if you're using it."
            ])}
            <SubSectionTitle>Slow Downloads of Social Media Videos</SubSectionTitle>
            {renderStyledList([
                "Check your own internet connection. A slow local connection will impact any download.",
                "Try a different browser or the dedicated Android app if available. Sometimes browser extensions can interfere.",
                "Consider a lower quality option if speed is critical and you don't need the highest resolution.",
                "Check the app rating section or community forums; sometimes specific social media platforms throttle downloads."
            ])}
            <SubSectionTitle>Format Compatibility Issues with Downloaded Social Media Videos</SubSectionTitle>
            <p>If a downloaded social media video won't play on your device:</p>
            {renderStyledList([
                "Try downloading in a different format, like MP4, which is widely supported.",
                "Consider using a versatile media player like VLC, available for most platforms including Android.",
                "Convert the video using a free online or desktop converter tool if you need a very specific format.",
                "Check our compatibility rating guide for tips on formats for different devices."
            ])}
            <SubSectionTitle>Mobile-Specific Issues When Downloading Social Media Videos</SubSectionTitle>
            {renderStyledList([
                "Make sure you're using a current, up-to-date browser on your Android or iOS device.",
                "Clear your browser cache and cookies if you encounter persistent errors.",
                "On Android, make sure the FSMVID app (if you're using it) or your browser has proper storage permissions.",
                "On iOS, downloads typically go to your 'Files' app. Check there, not directly in your Photos app.",
                "Check our mobile rating section for any platform-specific tips for Android or iOS."
            ])}
          </SectionCard>

          <SectionCard title="The Future of Social Media Video Downloading" icon={TrendingUp} iconBgGradient="from-lime-500 to-green-600" cardBgClass="bg-gradient-to-br from-lime-50 to-green-50 dark:from-slate-800 dark:to-slate-800/70">
            <p>The world of social media and video sharing is constantly evolving, and so is FSMVID. We're always looking for ways to improve our social media video downloader app and provide more value to our users. Here’s a glimpse of what we’re working on, driven by user feedback and our high rating goals:</p>
            {renderStyledList([
                "<strong>More social media platforms:</strong> We aim to expand our support to even more niche and emerging social media sites.",
                "<strong>AI-enhanced features:</strong> Think smart suggestions for quality/format based on your device (like Android vs. desktop), or even basic in-app video to GIF conversion.",
                "<strong>Faster processing:</strong> We're continually optimizing our backend to make downloads from social media even quicker.",
                "<strong>Enhanced mobile experience:</strong> Further improvements to our Android app and mobile website usability.",
                "<strong>Rating-based improvements:</strong> We actively monitor user feedback and app rating to prioritize features and fixes."
            ])}
            <p className="mt-4">The FSMVID team is committed to staying ahead of the curve and maintaining our status as a top-rated social media video downloader.</p>
          </SectionCard>

          <SectionCard title="Final Thoughts on Social Media Video Downloading" icon={Star} iconBgGradient="from-sky-500 to-blue-600" cardBgClass="bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/70"> 
            <p>In a digital world where social media content seems increasingly temporary, the ability to download and save videos provides a sense of permanence and control. Whether you're an avid social media user, a content creator, an educator, or just someone who loves collecting great videos, a reliable downloader is an invaluable tool.</p>
            <p>FSMVID strives to be that tool for you – simple, fast, free, and versatile. We understand the diverse needs of users looking to download videos from myriad social media platforms, whether on their desktop or Android device. Our high rating reflects our commitment to these principles.</p>
            <p>So next time you find yourself thinking, "I wish I could download this social media video," remember FSMVID. We're here to make it happen, easily and efficiently. Happy downloading!</p>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}
