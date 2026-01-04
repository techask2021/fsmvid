"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Link as LinkIcon, Download, ArrowRight, Sparkles } from "lucide-react"

const steps = [
  {
    icon: Copy,
    title: "Copy URL",
    description: "Copy the URL of the video you want to download from your favorite social media platform.",
    accent: "text-blue-600",
    bg: "bg-blue-600/10",
    step: "01",
  },
  {
    icon: LinkIcon,
    title: "Paste URL",
    description: "Paste the URL into our downloader tool and click the process button.",
    accent: "text-emerald-600",
    bg: "bg-emerald-600/10",
    step: "02",
  },
  {
    icon: Download,
    title: "Download",
    description: "Choose your preferred quality and format, then download your video instantly.",
    accent: "text-purple-600",
    bg: "bg-purple-600/10",
    step: "03",
  },
]

export default function HowToUse() {
  return (
    <section className="py-16 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full" />
      </div>

      <div className="container px-6 relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-12 space-y-3">
          <Badge className="bg-blue-600/10 text-blue-600 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
            <Sparkles className="w-3 h-3 mr-2" />
            How It Works
          </Badge>
          <h2 className="text-xl md:text-3xl font-black tracking-tighter italic uppercase text-slate-900 leading-[0.9]">
            How to Download Videos?
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto font-medium italic border-t border-slate-100 pt-4 mt-2 leading-relaxed">
            Download your favorite videos in just three simple steps. Fast, easy, and completely free of charge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <Card className="border border-slate-100 shadow-lg shadow-slate-200/40 bg-white rounded-[1.5rem] overflow-hidden h-full group hover:translate-y-[-5px] transition-all duration-500 hover:shadow-xl">
                <CardContent className="p-5 flex flex-col items-center h-full text-center space-y-4">
                  <div className="w-full flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-[7px] font-black uppercase tracking-[0.4em] text-slate-400">Step {step.step}</span>
                    <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      <step.icon className={`w-5 h-5 ${step.accent}`} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-black italic uppercase tracking-tighter text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed italic text-xs border-l-2 border-blue-600/10 pl-4 text-left">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-6 w-full mt-auto">
                    <div className="h-1.5 w-16 bg-white/5 mx-auto rounded-full group-hover:w-24 group-hover:bg-blue-600/40 transition-all duration-700" />
                  </div>
                </CardContent>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-6 z-20 items-center justify-center opacity-10">
                  <ArrowRight className="w-12 h-12 text-white animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Technical Validation Nodes - HIGH CONTRAST */}
        <div className="mt-16">
          <Card className="border border-slate-100 shadow-2xl bg-white rounded-[2.5rem] p-8 max-w-4xl mx-auto relative overflow-hidden group">
            <h3 className="text-lg font-black italic uppercase tracking-widest text-center mb-8 text-slate-900 underline decoration-blue-600/10 underline-offset-8">Terminal Benchmarks</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { value: "<10s", label: "Average processing time", color: "text-blue-600" },
                { value: "100%", label: "Success rate per node", color: "text-emerald-600" },
                { value: "0", label: "Registration required", color: "text-purple-600" }
              ].map((metric, i) => (
                <div key={i} className="text-center group/item">
                  <div className={`text-2xl font-black italic tracking-tighter mb-1 group-hover/item:scale-110 transition-all duration-500 ${metric.color}`}>
                    {metric.value}
                  </div>
                  <div className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">{metric.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
