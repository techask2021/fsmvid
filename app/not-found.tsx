import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileQuestion, Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero-like Section */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative p-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  <FileQuestion className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white drop-shadow-md">
              Page Not Found
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Oops! The page you're looking for doesn't exist or has been moved.
              <br />
              Let's get you back on track.
            </p>
          </div>
        </div>
        
        {/* Decorative fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-slate-950 to-transparent"></div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden bg-white dark:bg-slate-800">
              <div className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <Search className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">What you can do:</h3>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• Check the URL for typos</li>
                        <li>• Go back to the homepage</li>
                        <li>• Browse our blog for helpful content</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      size="lg" 
                      asChild
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                    >
                      <Link href="/">
                        <Home className="w-5 h-5 mr-2" />
                        Go Home
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      asChild
                      className="flex-1 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700"
                    >
                      <Link href="/blog">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Browse Blog
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Links */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Quick Links:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/blog", label: "Blog" },
                  { href: "/faq", label: "FAQ" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
