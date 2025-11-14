import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, Mail, CheckCircle, FileText, RefreshCw, Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "Copyright Claims | FSMVID | Free Social Media Video Downloader",
  description: "Learn about our copyright policies and how to report copyright infringement at FSMVID.",
}

export default function CopyrightClaimsPage() {
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
            <Shield className="w-4 h-4 mr-2" />
            Copyright & DMCA
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Copyright Claims
          </h1>
          <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed">
            We respect intellectual property rights and take copyright infringement seriously.
            <br />
            <span className="text-lg">Learn how to report copyright violations.</span>
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 text-white border border-white/20">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Last updated: {currentDate}</span>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-slate-800 dark:to-slate-700 py-8 border-y-4 border-orange-300 dark:border-orange-600">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Important Notice</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                <strong>Users of this website are not allowed to download or convert any copyrighted material.</strong> 
                {" "}Copyright infringement is against our terms of service. We may remove any content we believe violates intellectual property rights.
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
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Our Copyright Policy</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
              <p className="leading-relaxed">
                We <strong>respect the intellectual property rights of others</strong>. Copyright infringement is against our terms of service.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
              <p className="leading-relaxed">
                Users of this website are <strong>not allowed to download or convert any copyrighted material</strong>.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
              <p className="leading-relaxed">
                We may in our sole discretion <strong>remove any content</strong> we have reason to believe violates any of the intellectual property rights of others.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">DMCA Compliance</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              We are not subject to United States law, but we <strong>voluntarily comply with the Digital Millennium Copyright Act (DMCA)</strong>. 
              Pursuant to Title 17, Section 512(c)(2) of the United States Code.
            </p>
            <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="leading-relaxed">
                If you believe that any of your copyrighted material is being infringed on this website, a notification should be sent by email to 
                <a href="mailto:Support@fsmvid.com" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"> Support@fsmvid.com</a>. 
                Make sure that the supposed infringement is not covered by laws such as Fair Use or free speech.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>


      <Card className="mb-8 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reporting Copyright Infringement</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            To be effective, the notification must be a written communication that includes the following:
          </p>
          
          <div className="space-y-4">
            <Card className="border-l-4 border-l-blue-600 bg-blue-50 dark:bg-slate-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-lg flex-shrink-0">1.</span>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    A <strong>physical or electronic signature</strong> of the person that owns the copyright or a person authorized to act on behalf of the owner.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-600 bg-purple-50 dark:bg-slate-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 dark:text-purple-400 font-bold text-lg flex-shrink-0">2.</span>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>Identification of the copyrighted work</strong> claimed to have been infringed, please describe the work and include a location (URL) where possible.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600 bg-green-50 dark:bg-slate-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 font-bold text-lg flex-shrink-0">3.</span>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <strong>Identification of the infringing material</strong> that is to be removed or access to which is to be disabled, and information sufficient to permit us to locate the material.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-600 bg-orange-50 dark:bg-slate-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-orange-600 dark:text-orange-400 font-bold text-lg flex-shrink-0">4.</span>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    The <strong>address, telephone number, and email address</strong> where you can be contacted.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-cyan-600 bg-cyan-50 dark:bg-slate-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold text-lg flex-shrink-0">5.</span>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    A <strong>good-faith belief statement</strong> that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-600 bg-red-50 dark:bg-slate-800">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-600 dark:text-red-400 font-bold text-lg flex-shrink-0">6.</span>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    A statement that the information in the notification is <strong>accurate, and under penalty of perjury</strong>, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-yellow-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-yellow-600 mt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Note:</strong> All notifications not relevant to us or ineffective under the law will receive no response or action.
            </p>
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contact Us</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            If you have any questions about our Copyright Claims Policy or need to report an infringement, please contact us at:
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <a href="mailto:Support@fsmvid.com" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-lg">
                Support@fsmvid.com
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
