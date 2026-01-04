"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Shield, Zap, Globe, Award, Info, HelpCircle, Settings, Edit3, TrendingUp, ListChecks, AlertTriangle, ThumbsUp, BookOpen } from "lucide-react";

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

export function ToolSeoContent({ platformName }: { platformName: string }) {
  const whatIsFsmvidIntro = (
    <div className="space-y-4 border-l-2 border-blue-600/10 pl-6">
      <p className="text-slate-500 font-medium italic leading-relaxed text-sm">
        FSMVID is a powerful and user-friendly online tool that allows you to download videos, images, and short
        clips from {platformName}. With support for over 20 platforms including YouTube, TikTok,
        Instagram, Facebook, Twitter, and many more, FSMVID has become the go-to solution for content creators,
        marketers, and everyday users.
      </p>
      <p className="text-slate-500 font-medium italic leading-relaxed text-sm">
        Our platform is completely free to use, requires no registration, and processes downloads quickly and
        securely. Whether you're looking to save a funny TikTok video, download a YouTube tutorial, or backup
        your Instagram posts, FSMVID makes it simple and efficient.
      </p>
    </div>
  );

  const whatIsFsmvidFeatures = [
    "No software installation required",
    "Works on all devices and browsers",
    "Multiple quality options available",
    "Supports various file formats",
  ];

  const whyUseIntro = (
    <p className="text-slate-500 font-medium italic leading-relaxed text-sm mb-6">
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
    <p className="text-slate-500 font-medium italic leading-relaxed text-sm mb-6">
      Using the FSMVID social media video downloader app couldn't be simpler. Seriously, if you can copy and paste, you can use this tool to download social media videos. Here's the process:
    </p>
  );

  const howFsmvidWorksSteps = [
    { step: "1", title: "URL Analysis", desc: `Our system analyzes the ${platformName} URL to identify the content.`, color: "bg-blue-600/10 text-blue-600" },
    { step: "2", title: "Content Extraction", desc: "We securely connect to extract the video or image data.", color: "bg-emerald-600/10 text-emerald-600" },
    { step: "3", title: "Quality Processing", desc: "We process the content to provide multiple quality and format options.", color: "bg-purple-600/10 text-purple-600" },
    { step: "4", title: "Secure Download", desc: "We provide secure download links that expire for privacy protection.", color: "bg-orange-600/10 text-orange-600" },
  ];

  return (
    <div className="w-screen bg-slate-50 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <section className="py-24">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-blue-600/10 text-blue-600 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
              Deep Dive
            </Badge>
            <h2 className="text-xl md:text-3xl font-black tracking-tighter italic uppercase text-slate-900 leading-[0.9]">
              {platformName} <span className="text-blue-600">Video Seeker</span>
            </h2>
          </div>

          <div className="space-y-12 max-w-4xl mx-auto">
            <SectionCard
              icon={Info}
              iconBgGradient="from-blue-600/10 to-blue-600/10"
              cardBgClass="bg-white"
            >
              <div className="text-center">
                <Badge className="mb-4 bg-blue-600/10 text-blue-600 border-none px-4 py-1 text-[8px] font-black uppercase tracking-widest">
                  Platform Node
                </Badge>
                <h2 className="text-2xl md:text-4xl font-black tracking-tighter italic uppercase text-slate-900 mb-6 px-10 leading-tight">Free {platformName} Video Downloader</h2>
                <p className="text-sm md:text-base text-slate-500 font-medium italic mb-4 leading-relaxed">
                  Spotted an awesome video on {platformName} you need to save? Whether it's a hilarious TikTok, an informative YouTube tutorial, or a Facebook memory – we all need to download videos sometimes.
                </p>
                <p className="text-sm md:text-base text-slate-500 font-medium italic mb-4 leading-relaxed">
                  That's where FSMVID comes in – your new best friend for all things social media video downloading.
                </p>
              </div>
            </SectionCard>

            <SectionCard
              title={`System Overview`}
              icon={Star}
              iconBgGradient="from-blue-600/10 to-blue-600/10"
              cardBgClass="bg-white"
            >
              {whatIsFsmvidIntro}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {whatIsFsmvidFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="font-black italic uppercase tracking-tight text-slate-900 text-[10px]">{feature}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title={`Why Process ${platformName}?`}
              icon={Award}
              iconBgGradient="from-blue-600/10 to-blue-600/10"
              cardBgClass="bg-white"
            >
              {whyUseIntro}
              <div className="space-y-4">
                {whyUseReasons.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 group/item hover:bg-white hover:shadow-lg transition-all">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0 group-hover/item:scale-150 transition-transform"></div>
                    <div>
                      <strong className="text-slate-900 font-black italic uppercase tracking-tight text-xs block mb-1">{item.title}</strong>
                      <span className="text-slate-500 text-[11px] font-medium italic">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard
              title={`Processing Pipeline`}
              icon={Zap}
              iconBgGradient="from-blue-600/10 to-blue-600/10"
              cardBgClass="bg-white"
            >
              {howFsmvidWorksIntro}
              <div className="space-y-6 mt-4">
                {howFsmvidWorksSteps.map((item) => (
                  <div key={item.step} className="flex items-start gap-6 group/step">
                    <div className={`flex items-center justify-center w-10 h-10 ${item.color} rounded-xl font-black italic shadow-sm shrink-0 group-hover/step:scale-110 transition-transform`}>
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-black italic uppercase tracking-tighter text-slate-900 mb-1 text-sm">{item.title}</h4>
                      <p className="text-slate-500 font-medium italic text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </section>
    </div>
  );
}
