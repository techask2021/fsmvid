import HeroSectionStyles from "@/components/hero-section-styles";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import MediaMisterAd from "@/components/media-mister-ad";

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
        className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden"
      >
        <HeroSectionStyles />
        <div className="container relative z-10 flex flex-col items-center justify-center min-h-[40vh] text-center px-6 py-16">
        <Badge
          variant="secondary"
          className="mb-6 bg-white/20 backdrop-blur-md text-white border-white/30 shadow-lg px-6 py-3 text-sm font-semibold hover:bg-white/30 transition-all duration-300 animate-fade-in"
        >
          <Sparkles className="w-4 h-4 mr-2 animate-spin-slow" />
          Free Online Downloader
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-5xl text-white animate-fade-in-up">
          <span className="inline-block animate-fade-in-up delay-200">
            {title}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-4xl leading-relaxed animate-fade-in-up delay-600">
          {subtitle}
        </p>
        <div className="w-full max-w-4xl animate-fade-in-up delay-1000" id="downloader">
          <MediaMisterAd />
          {children}
        </div>
      </div>
      </section>
      
    </>
  );
}
