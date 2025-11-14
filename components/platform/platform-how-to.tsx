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

  // Dynamic grid classes based on number of steps
  const getGridClass = (stepCount: number) => {
    switch (stepCount) {
      case 1:
        return "grid-cols-1 max-w-sm"
      case 2:
        return "grid-cols-1 md:grid-cols-2 max-w-2xl"
      case 3:
        return "grid-cols-1 md:grid-cols-3 max-w-4xl"
      case 4:
        return "grid-cols-1 md:grid-cols-4 max-w-5xl"
      case 5:
      default:
        return "grid-cols-1 md:grid-cols-5 max-w-6xl"
    }
  }

  return (
    <div className="w-screen bg-gray-50 dark:bg-gray-900 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <section className="py-16">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-500/20 px-4 py-2 text-sm font-medium">
              Step by Step Guide
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Follow our simple guide to download {platform.toLowerCase()} videos quickly and easily
            </p>
          </div>

          <div className={`grid gap-6 mx-auto ${getGridClass(steps.length)}`}>
            {steps.map((step, index) => {
              const config = stepConfig[index] || stepConfig[0]
              const StepIcon = config.icon
              return (
                <Card
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800 group cursor-pointer"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <CardContent className="p-6 text-center relative">
                    {/* Step Number Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>

                    {/* Icon - Different color for each step */}
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${config.color} text-white shadow-lg mb-4 transition-all duration-300 ${
                        activeStep === index ? "scale-110 shadow-xl" : "group-hover:scale-105"
                      }`}
                    >
                      <StepIcon className="w-6 h-6" />
                    </div>

                    {/* Step Text */}
                    <p
                      className={`text-gray-700 dark:text-gray-300 text-sm leading-relaxed transition-colors duration-300 ${
                        activeStep === index ? "text-gray-900 dark:text-white font-medium" : ""
                      }`}
                    >
                      {step}
                    </p>
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
