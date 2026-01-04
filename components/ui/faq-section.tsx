"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, MessageSquare, HelpCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  faqs: FAQItem[]
  className?: string
}

export function FAQSection({ title = "Frequently Asked Questions", faqs, className }: FAQSectionProps) {
  return (
    <div className="w-screen bg-white relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <section className="py-24">
        <div className={`container px-6 mx-auto max-w-7xl ${className}`}>
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-blue-600/10 text-blue-600 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-2">
              <HelpCircle className="w-3 h-3" />
              Help Center
            </Badge>
            <h2 className="text-xl md:text-3xl font-black tracking-tighter italic uppercase text-slate-900 leading-[0.9]">
              {title.split(' ').map((word, i, arr) => (
                <span key={i} className={i === arr.length - 1 ? "text-blue-600" : ""}>
                  {word}
                </span>
              ))}
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto font-medium italic pt-4 mt-2 leading-relaxed">
              Find answers to common questions about our video downloader service.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-slate-200 shadow-2xl shadow-slate-200/40 rounded-[2.5rem] bg-white overflow-hidden group hover:translate-y-[-4px] transition-all duration-500">
                <CardContent className="p-0">
                  <details className="group/details">
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none bg-slate-900 group-open/details:bg-[#050b1a] transition-colors duration-500">
                      <div className="flex items-center gap-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-blue-400 group-hover/details:bg-blue-600 group-hover/details:text-white transition-all duration-500 group-hover/details:rotate-12">
                          <HelpCircle className="w-5 h-5" />
                        </div>
                        <h3 className="font-black italic uppercase tracking-tighter text-white text-[11px] md:text-sm group-hover/details:text-blue-400 transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-open/details:bg-blue-600 group-open/details:border-blue-600 transition-all duration-300 shadow-lg">
                        <Plus className="w-4 h-4 text-white group-open/details:rotate-45 transition-all duration-300" />
                      </div>
                    </summary>
                    <div className="p-6 bg-white">
                      <div className="border-l-4 border-blue-600/10 pl-6 space-y-3">
                        <div className="flex items-center gap-2 text-[7px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2">
                          <MessageSquare className="w-2.5 h-2.5" /> Technical Breakdown
                        </div>
                        <p className="text-slate-500 font-medium italic leading-relaxed text-xs md:text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
