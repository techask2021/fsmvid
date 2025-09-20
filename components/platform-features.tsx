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
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-500/20 px-4 py-2 text-sm font-medium">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose Our Downloader?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our tool is packed with features to make your life easier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800 group cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                {/* Professional Lucide Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${feature.color} text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>

                {/* Feature Text */}
                <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {feature.text}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
