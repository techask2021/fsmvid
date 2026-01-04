import { Metadata } from "next"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Zap,
  Code,
  Shield,
  Download
} from "lucide-react";
import HeroSectionStyles from "@/components/content/hero-section-styles";

export const metadata: Metadata = {
  title: "About Us | FSMVID - Free Social Media Video Downloader",
  description: "Learn about our mission, who we are, and what we offer at FSMVID - your trusted social media content downloader.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* SaaS Elite About Hero - DARK HIGH CONTRAST */}
      <section className="relative min-h-[70vh] overflow-hidden flex flex-col items-center justify-center pt-48 pb-24 px-4 bg-slate-950 border-b border-white/5">
        <HeroSectionStyles />

        {/* Atmospheric Orbs - High Contrast for Dark Mode */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full translate-y-1/2" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none" />

        <div className="container relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
          <Badge className="mb-8 bg-blue-600/20 backdrop-blur-xl text-blue-400 border border-blue-500/30 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            Identity Verified
          </Badge>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-[0.85] mb-8 uppercase text-white animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            OUR MISSION <br />
            <span className="text-blue-600 underline decoration-blue-600/20 underline-offset-8">PROTOCOL</span>
          </h1>

          <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
            <p className="text-base md:text-lg text-slate-400 font-medium leading-relaxed italic border-l-4 border-blue-600 pl-8">
              Redefining the boundaries of digital media acquisition.
              We build the infrastructure for the next generation of creators.
            </p>
          </div>
        </div>
      </section>

      {/* Core Mission & Identity - CONTRAST LIGHT SECTION */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-2xl shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-800/80 rounded-[3rem] p-10 group overflow-hidden relative border border-slate-100 dark:border-slate-700">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 blur-3xl rounded-full" />
              <div className="relative z-10 space-y-6">
                <Badge className="bg-blue-600/10 text-blue-600 border-none px-4 py-1 text-[8px] font-black uppercase tracking-widest">Core Mission</Badge>
                <h2 className="text-2xl md:text-4xl font-black italic uppercase italic tracking-tighter text-slate-900 dark:text-white leading-tight">WE EMPOWER <br /><span className="text-blue-600">CREATORS.</span></h2>
                <p className="text-sm text-slate-500 font-medium italic leading-relaxed border-l-2 border-slate-100 pl-6">
                  FSMVID was born from a simple observation: the digital world is moving faster than our ability to save it. We provide the tools to capture, archive, and master your digital environment.
                </p>
              </div>
            </Card>

            <Card className="border-none shadow-2xl shadow-slate-200/40 dark:shadow-none bg-slate-900 dark:bg-slate-950 text-white rounded-[3rem] p-10 group overflow-hidden relative">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full" />
              <div className="relative z-10 space-y-6">
                <Badge className="bg-white/10 text-white border-none px-4 py-1 text-[8px] font-black uppercase tracking-widest">Identity</Badge>
                <h2 className="text-2xl md:text-4xl font-black italic uppercase italic tracking-tighter leading-tight">WHO WE <br /><span className="text-blue-600">ARE.</span></h2>
                <p className="text-sm text-slate-400 font-medium italic leading-relaxed border-l-2 border-white/5 pl-6">
                  A collective of engineers, creators, and archival specialists dedicated to high-performance media utility development. We don&apos;t just build downloaders; we build digital bridges.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 bg-white dark:bg-slate-950 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-blue-600/10 text-blue-600 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
              System Capabilities
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-tight">What <span className="text-blue-600">We Offer</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Cross-Platform Support",
              "High-Resolution Extraction",
              "Streamlined Interface",
              "Zero Auth Requirement",
              "Ultra-Fast Processing",
              "Privacy-Centric Protocol"
            ].map((offer, i) => (
              <Card key={i} className="border-none shadow-xl shadow-slate-200/20 dark:shadow-none bg-white dark:bg-slate-800/50 rounded-[2rem] p-6 group hover:bg-slate-900 hover:text-white border border-slate-100 dark:border-slate-700 transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 shrink-0 rounded-xl bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                    <Zap className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] leading-tight mt-1.5">{offer}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Protocol - CONTRAST SECTION */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-blue-600/10 text-blue-600 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
              Value Registry
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-tight">The Core Principles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Precision", icon: Sparkles, desc: "Surgical accuracy in extraction." },
              { title: "Performance", icon: Zap, desc: "Industrial-grade speed." },
              { title: "Archival", icon: Download, desc: "Permanent media preservation." },
              { title: "Security", icon: ShieldCheck, desc: "Uncompromising tunnel protection." }
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-3xl shadow-slate-200/20 dark:shadow-none bg-white dark:bg-slate-800/80 rounded-[2.5rem] p-8 group hover:translate-y-[-8px] transition-all duration-500 border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                <div className="bg-slate-50 dark:bg-slate-900 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black italic uppercase tracking-tighter mb-2 italic">{item.title}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legal & Contact Node */}
      <section className="py-20 bg-white dark:bg-slate-950 px-6">
        <div className="container mx-auto max-w-5xl space-y-16">
          <Card className="border-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] dark:shadow-none bg-slate-900 text-white rounded-[3.5rem] p-12 md:p-16 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-600/30 transition-all duration-700" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-blue-600 text-white border-none px-4 py-1 text-[8px] font-black uppercase tracking-widest">Compliance</Badge>
                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight">LEGAL <br /><span className="text-blue-600">OVERSIGHT.</span></h2>
                <p className="text-sm text-slate-400 font-medium italic leading-relaxed border-l-2 border-white/5 pl-6">
                  Archival integrity and respect for digital rights are cornerstones of our operational protocol. We build bridges, not barriers.
                </p>
              </div>
              <div className="relative h-[250px] rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center p-8 overflow-hidden">
                <ShieldCheck className="w-24 h-24 text-blue-600 animate-pulse" />
              </div>
            </div>
          </Card>

          <div className="text-center space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Have <span className="text-blue-600 underline decoration-blue-600/20 underline-offset-8">Questions?</span></h2>
              <p className="text-slate-500 font-medium italic text-base">Initialize a direct transmission to our support nodes.</p>
            </div>

            <Button asChild className="h-16 px-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-[10px] tracking-[0.3em] shadow-3xl shadow-blue-600/40 hover:scale-105 active:scale-95 transition-all">
              <Link href="/contact" className="flex items-center gap-4">
                Initialize Contact Transmission <MessageCircle className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
