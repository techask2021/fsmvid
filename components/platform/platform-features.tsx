"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Shield, Play, Zap, CheckCircle, Star } from "lucide-react"

export default function PlatformFeatures() {
  const features = [
    {
      icon: Download,
      text: "High-quality downloads",
      color: "bg-blue-600",
      description: "Download in original quality",
    },
    {
      icon: Shield,
      text: "No watermarks",
      color: "bg-green-600",
      description: "Clean downloads without watermarks",
    },
    {
      icon: Play,
      text: "Multiple format options",
      color: "bg-purple-600",
      description: "Choose from various formats",
    },
    {
      icon: Zap,
      text: "Fast processing",
      color: "bg-yellow-600",
      description: "Lightning-fast downloads",
    },
    {
      icon: CheckCircle,
      text: "No registration required",
      color: "bg-emerald-600",
      description: "Start downloading immediately",
    },
    {
      icon: Star,
      text: "100% free to use",
      color: "bg-orange-600",
      description: "Completely free service",
    },
  ]

  return (
    <div className="w-screen bg-white relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <section className="py-24">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="text-center mb-20 space-y-4">
            <Badge className="bg-blue-600/10 text-blue-600 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
              Why Choose Us
            </Badge>
            <h2 className="text-xl md:text-3xl font-black tracking-tighter italic uppercase text-slate-900 leading-[0.9]">Why Choose Our <span className="text-blue-600">Downloader?</span></h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto font-medium italic border-t border-slate-100 pt-6 mt-4 leading-relaxed">
              Our tool is packed with features to make your life easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border border-slate-100 shadow-xl shadow-slate-200/20 bg-white rounded-2xl overflow-hidden group hover:translate-y-[-5px] transition-all duration-500"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 shadow-md group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-black italic uppercase tracking-tight text-slate-900">{feature.text}</h3>
                  <p className="text-slate-500 text-[10px] font-medium leading-relaxed italic">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
