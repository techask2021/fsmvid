"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Link, Settings, Download, Save } from "lucide-react"
import { useState } from "react"

interface PlatformHowToProps {
  platform: string
  title: string
  steps: string[]
}

export default function PlatformHowTo({ platform, title, steps }: PlatformHowToProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  // Different icons and colors for each step
  const stepConfig = [
    { icon: Copy, color: "bg-blue-600", name: "copy" },
    { icon: Link, color: "bg-green-600", name: "paste" },
    { icon: Settings, color: "bg-purple-600", name: "process" },
    { icon: Download, color: "bg-orange-600", name: "select" },
    { icon: Save, color: "bg-red-600", name: "download" },
  ]

  // Different accents and icons for steps
  const accents = [
    { text: "text-blue-600", bg: "bg-blue-600/10" },
    { text: "text-emerald-600", bg: "bg-emerald-600/10" },
    { text: "text-purple-600", bg: "bg-purple-600/10" },
    { text: "text-orange-600", bg: "bg-orange-600/10" },
    { text: "text-pink-600", bg: "bg-pink-600/10" },
  ]

  const getGridClass = (stepCount: number) => {
    switch (stepCount) {
      case 1: return "grid-cols-1 max-w-sm"
      case 2: return "grid-cols-1 md:grid-cols-2 max-w-2xl"
      case 3: return "grid-cols-1 md:grid-cols-3 max-w-4xl"
      case 4: return "grid-cols-1 md:grid-cols-4 max-w-5xl"
      default: return "grid-cols-1 md:grid-cols-5 max-w-6xl"
    }
  }

  return (
    <div className="w-screen bg-slate-50 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <section className="py-24">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-blue-600/10 text-blue-600 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
              Step by Step Guide
            </Badge>
            <h2 className="text-xl md:text-3xl font-black tracking-tighter italic uppercase text-slate-900 leading-[0.9]">
              {title}
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto font-medium italic pt-4 mt-2 leading-relaxed">
              Follow our simple guide to download {platform.toLowerCase()} videos quickly and easily
            </p>
          </div>

          <div className={`grid gap-8 mx-auto ${getGridClass(steps.length)}`}>
            {steps.map((step, index) => {
              const accent = accents[index % accents.length]
              const Icon = stepConfig[index % stepConfig.length].icon
              return (
                <Card
                  key={index}
                  className="border border-slate-100 shadow-lg shadow-slate-200/40 bg-white rounded-[1.5rem] overflow-hidden h-full group hover:translate-y-[-5px] transition-all duration-500"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <CardContent className="p-5 flex flex-col items-center h-full text-center space-y-4">
                    <div className="w-full flex justify-between items-center border-b border-slate-100 pb-3">
                      <span className="text-[7px] font-black uppercase tracking-[0.4em] text-slate-400">Step 0{index + 1}</span>
                      <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                        <Icon className={`w-5 h-5 ${accent.text}`} />
                      </div>
                    </div>

                    <div className="space-y-3 w-full">
                      <p className="text-slate-500 font-medium leading-relaxed italic text-xs border-l-2 border-blue-600/10 pl-4 text-left">
                        {step}
                      </p>
                    </div>

                    <div className="pt-6 w-full mt-auto">
                      <div className={`h-1.5 w-16 bg-slate-50 mx-auto rounded-full group-hover:w-24 group-hover:${accent.bg} transition-all duration-700`} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
