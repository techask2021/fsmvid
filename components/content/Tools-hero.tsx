import HeroSectionStyles from "@/components/content/hero-section-styles";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import AdSenseBanner from "@/components/ads/adsense-banner";

interface ToolsHeroProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  platform?: string;
}

export default function ToolsHero({ title, subtitle, children, platform }: ToolsHeroProps) {
  return (
    <>
      <section
        className="relative min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 bg-blue-600 overflow-hidden"
      >
        <HeroSectionStyles />

        {/* Atmospheric Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full translate-y-1/2" />

        <div className="container relative z-10 flex flex-col items-center justify-center text-center px-6">
          <Badge
            className="mb-8 bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Free Online Downloader
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic leading-[0.85] mb-8 uppercase text-white animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            {title}
          </h1>
          <p className="text-sm md:text-base text-white/90 font-medium leading-relaxed drop-shadow-md max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
            {subtitle}
          </p>
          <div className="w-full max-w-4xl animate-in fade-in zoom-in-95 duration-1000 delay-400 mt-2 mb-2" id="downloader">
            <AdSenseBanner />
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
