import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Shield, AlertTriangle, Mail, CheckCircle, RefreshCw, Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | FSMVID | Free Social Media Video Downloader",
  description: "Read the terms and conditions governing the use of FSMVID's services.",
}

export default function TermsOfServicePage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container max-w-5xl mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-4 bg-white/20 backdrop-blur-md text-white border-white/30 shadow-lg px-6 py-2 text-sm font-semibold">
            <FileText className="w-4 h-4 mr-2" />
            Legal Agreement
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using our service.
            <br />
            <span className="text-lg">Your use of FSMVID constitutes acceptance of these terms.</span>
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 text-white border border-white/20">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Last updated: {currentDate}</span>
          </div>
        </div>
      </section>

      {/* Important Notice Section */}
      <section className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-slate-800 dark:to-slate-700 py-8 border-y-4 border-orange-300 dark:border-orange-600">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Important Notice</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                <strong>Your continued use of this website constitutes your acceptance of these terms of service.</strong> 
                {" "}Please review them carefully. By using FSMVID, you agree to be bound by these terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white dark:bg-slate-950 py-16">
        <div className="container max-w-4xl mx-auto px-4">
      
      <Card className="mb-8 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Terms and Conditions</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Card className="border-l-4 border-l-blue-600 bg-blue-50 dark:bg-slate-800 mb-3">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    This website is intended for <strong>personal use only</strong>.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-600 bg-green-50 dark:bg-slate-800 mb-3">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    You may use our website as a <strong>recording service only and only as permitted by law</strong>.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-red-600 bg-red-50 dark:bg-slate-800 mb-3">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    You <strong>may not use our services to download or convert any copyrighted material</strong>.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-orange-600 bg-orange-50 dark:bg-slate-800 mb-3">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    You are <strong>solely responsible for any misuse</strong> of these services and any copyright violations that may occur by using our website.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-purple-600 bg-purple-50 dark:bg-slate-800 mb-3">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    You are responsible for <strong>reading the terms of service of the websites</strong> you are downloading any media from, as you might be breaking their terms of service by using our services.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-yellow-600 bg-yellow-50 dark:bg-slate-800 mb-3">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We are <strong>not to be held responsible</strong> for any misuse of the services provided on this website and any damages that might occur by using these services.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-cyan-600 bg-cyan-50 dark:bg-slate-800 mb-3">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We reserve the right to <strong>amend these terms at any time</strong>.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-indigo-600 bg-indigo-50 dark:bg-slate-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Your continued use of this website <strong>constitutes your acceptance</strong> of these terms of service.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Questions About Our Terms?</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            If you have any questions about these Terms of Service, please don't hesitate to contact us:
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <a href="mailto:support@fsmvid.com" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-lg">
                support@fsmvid.com
              </a>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Or visit our{" "}
              <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                Contact Page
              </Link>
              {" "}for more ways to reach us.
            </p>
          </div>
        </CardContent>
      </Card>
        </div>
      </section>
    </div>
  )
} 
