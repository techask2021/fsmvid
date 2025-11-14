"use client"; 

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Shield, Zap, Globe, Award, Info, HelpCircle, Settings, Edit3, TrendingUp, ListChecks, AlertTriangle, ThumbsUp, BookOpen } from "lucide-react";

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

export function ToolSeoContent({ platformName }: { platformName: string }) {
  const whatIsFsmvidIntro = (
    <>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        FSMVID is a powerful and user-friendly online tool that allows you to download videos, images, and short
        clips from {platformName}. With support for over 20 platforms including YouTube, TikTok,
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
      might want to download content from {platformName}. Our website usage rating shows these are the top reasons people download social media videos:
    </p>
  );

  const whyUseReasons = [
    { title: "Offline viewing", desc: `Save ${platformName} videos to watch when you don't have internet (like during that long flight or subway commute)` },
    { title: "Content collections", desc: `Maybe you're building a personal library of workout videos or cooking tutorials from ${platformName}` },
    { title: "Preserving memories", desc: `That adorable video from ${platformName} might disappear if they decide to delete their account` },
    { title: "Educational purposes", desc: `Downloading lectures or tutorials from ${platformName} for your studies` },
    { title: "Content creation", desc: `Saving inspiration for your own videos from ${platformName} (just remember to respect copyright!)` },
  ];
  
  const howFsmvidWorksIntro = (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Using the FSMVID social media video downloader app couldn't be simpler. Seriously, if you can copy and paste, you can use this tool to download social media videos. Here's the process:
    </p>
  );

  const howFsmvidWorksSteps = [
    { step: "1", title: "URL Analysis", desc: `Our system analyzes the ${platformName} URL to identify the content.`, color: "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700" },
    { step: "2", title: "Content Extraction", desc: "We securely connect to extract the video or image data.", color: "from-green-500 to-green-600 dark:from-green-600 dark:to-green-700" },
    { step: "3", title: "Quality Processing", desc: "We process the content to provide multiple quality and format options.", color: "from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700" },
    { step: "4", title: "Secure Download", desc: "We provide secure download links that expire for privacy protection.", color: "from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700" },
  ];

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
                About FSMVID
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Free {platformName} Video Downloader</h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Spotted an awesome video on {platformName} you need to save? Whether it's a hilarious TikTok, an informative YouTube tutorial, or a Facebook memory – we all need to download videos sometimes.
              </p>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                That's where FSMVID comes in – your new best friend for all things social media video downloading.
              </p>
            </div>
          </SectionCard>

          <SectionCard 
            title={`What is FSMVID's ${platformName} Downloader?`} 
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
            title={`Why Use a ${platformName} Video Downloader?`} 
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
            title={`How to Download from ${platformName}`} 
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
        </div>
      </div>
    </div>
  );
}
