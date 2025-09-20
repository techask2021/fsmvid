"use client"
import { Badge } from "@/components/ui/badge"
import { HelpCircle } from "lucide-react"

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
  const faqColors = [
    "bg-blue-50 dark:bg-blue-900/20",
    "bg-green-50 dark:bg-green-900/20",
    "bg-purple-50 dark:bg-purple-900/20",
    "bg-pink-50 dark:bg-pink-900/20",
    "bg-cyan-50 dark:bg-cyan-900/20",
    "bg-yellow-50 dark:bg-yellow-900/20",
  ]

  return (
    <div className="w-screen bg-white dark:bg-gray-950 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <section className="py-16">
        <div className={`container px-6 mx-auto ${className}`}>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30 px-4 py-2 text-sm font-medium">
              <HelpCircle className="w-3 h-3 mr-2" />
              Help Center
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
            <p className="text-lg text-gray-900 dark:text-white max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about our video downloader service.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`${
                    faqColors[index % faqColors.length]
                  } rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50`}
                >
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-base pr-4">{faq.question}</h3>
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-open:bg-blue-600 dark:group-open:bg-blue-500 transition-colors duration-200">
                        <svg
                          className="w-3 h-3 text-blue-600 dark:text-blue-400 group-open:text-white group-open:rotate-45 transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                    </summary>
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                        <p className="text-gray-900 dark:text-white leading-relaxed text-sm">{faq.answer}</p>
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
