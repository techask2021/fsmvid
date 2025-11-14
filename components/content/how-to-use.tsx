"use client" 

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" 
import { Copy, Link, Download, ArrowRight } from "lucide-react" 

const steps = [
  {
    icon: Copy,
    title: "Copy URL",
    description: "Copy the URL of the video you want to download from your favorite social media platform.",
    gradient: "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700", 
    step: "01",
  },
  {
    icon: Link, 
    title: "Paste URL",
    description: "Paste the URL into our downloader tool and click the process button.",
    gradient: "from-green-500 to-green-600 dark:from-green-600 dark:to-green-700", 
    step: "02",
  },
  {
    icon: Download,
    title: "Download",
    description: "Choose your preferred quality and format, then download your video instantly.",
    gradient: "from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700", 
    step: "03",
  },
]

export default function HowToUse() { 
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-32 left-32 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl dark:bg-purple-800/10"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl dark:bg-blue-800/10"></div>
      </div>

      <div className="container px-6 relative z-10 mx-auto"> 
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-500/10 dark:text-purple-300 dark:hover:bg-purple-500/20 px-6 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300">
            Simple Process
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">How to Download Videos?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Download your favorite videos in just three simple steps. It's fast, easy, and completely free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group"> 
              <Card className="border border-gray-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-slate-800/50 overflow-hidden h-full"> 
                <CardContent className="p-8 sm:p-10 text-center relative z-10 flex flex-col items-center h-full"> 
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${step.gradient} text-white text-xs sm:text-sm font-bold shadow-lg`}
                    >
                      {step.step}
                    </span>
                  </div>

                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${step.gradient} text-white shadow-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <step.icon className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg flex-grow"> 
                    {step.description}
                  </p>
                </CardContent>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-4 z-20 items-center justify-center"> 
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-full shadow-xl border-2 border-white dark:border-slate-700">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 sm:mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800 dark:via-slate-800/70 dark:to-slate-900 rounded-2xl sm:rounded-3xl p-8 sm:p-12 max-w-5xl mx-auto shadow-2xl border border-gray-200/50 dark:border-slate-700/50 hover:shadow-3xl transition-all duration-500">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">Why Our Process is Better</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                  {'<10s'} {/* Corrected JSX syntax for < character */}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">Average processing time</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                  100%
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">Success rate</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                  0
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">Registration required</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
