import Image from "next/image"
import HeroSectionStyles from "@/components/content/hero-section-styles"
import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, Mail, CheckCircle, FileText, RefreshCw, Scale, Link as LinkIcon } from "lucide-react"

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Elite SaaS Hero */}
      <section className="relative min-h-[50vh] overflow-hidden flex flex-col items-center justify-center pt-32 pb-20 px-4 mb-8 group">
        <HeroSectionStyles />

        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/pages.png"
            alt="Hero Background"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-slate-950/60 transition-all duration-700 group-hover:bg-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-transparent opacity-50" />
        </div>

        {/* Atmospheric Orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full translate-y-1/2" />

        <div className="container relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
          <Badge className="mb-8 bg-blue-600 text-white border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Shield className="w-3.5 h-3.5 mr-2" />
            Copyright & DMCA
          </Badge>

          <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic leading-tight mb-8 uppercase text-white drop-shadow-2xl">
            Copyright <span className="text-blue-400">Claims</span>
          </h1>

          <div className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed drop-shadow-md">
              We respect intellectual property rights and take copyright infringement seriously.
              <br />
              <span className="text-base text-blue-200 italic">Learn how to report copyright violations.</span>
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-slate-200 border border-white/10 mt-4">
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="text-xs font-bold uppercase tracking-wider">Last updated: {currentDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white dark:bg-slate-950 py-16">
        <div className="container max-w-4xl mx-auto px-4 space-y-8">

          {/* Important Notice */}
          <Card className="border border-orange-200 shadow-xl shadow-orange-500/10 rounded-2xl overflow-hidden group/card bg-orange-50 dark:bg-orange-950/20 dark:border-orange-900/50">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/40 text-orange-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Important Notice</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-medium italic leading-relaxed text-sm">
                <strong className="text-orange-600 dark:text-orange-400">Users of this website are not allowed to download or convert any copyrighted material.</strong> Copyright infringement is against our terms of service. We may remove any content we believe violates intellectual property rights.
              </p>
            </CardContent>
          </Card>

          {/* Our Copyright Policy */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/10 to-green-600/10 text-green-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Our Copyright Policy</h2>
              </div>

              <div className="space-y-4">
                {[
                  { icon: CheckCircle, color: "text-green-500", text: "We <strong>respect the intellectual property rights of others</strong>. Copyright infringement is against our terms of service." },
                  { icon: AlertTriangle, color: "text-red-500", text: "Users of this website are <strong>not allowed to download or convert any copyrighted material</strong>." },
                  { icon: Shield, color: "text-blue-500", text: "We may in our sole discretion <strong>remove any content</strong> we have reason to believe violates any of the intellectual property rights of others." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-sm transition-all duration-300">
                    <item.icon className={`w-5 h-5 ${item.color} mt-0.5 shrink-0`} />
                    <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: item.text }} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* DMCA Compliance */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-blue-600/10 text-blue-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <Scale className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">DMCA Compliance</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm mb-6 border-l-2 border-blue-600/10 pl-6">
                We are not subject to United States law, but we <strong>voluntarily comply with the Digital Millennium Copyright Act (DMCA)</strong>. Pursuant to Title 17, Section 512(c)(2) of the United States Code.
              </p>
              <div className="bg-slate-50 dark:bg-blue-900/10 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm">
                  If you believe that any of your copyrighted material is being infringed on this website, a notification should be sent by email to <a href="mailto:Support@fsmvid.com" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">Support@fsmvid.com</a>. Make sure that the supposed infringement is not covered by laws such as Fair Use or free speech.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Reporting Copyright Infringement */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-600/10 to-red-600/10 text-red-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <FileText className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Reporting Copyright Infringement</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm mb-6">
                To be effective, the notification must be a written communication that includes the following:
              </p>

              <div className="space-y-4">
                {[
                  { num: "1.", text: "A <strong>physical or electronic signature</strong> of the person that owns the copyright or a person authorized to act on behalf of the owner." },
                  { num: "2.", text: "<strong>Identification of the copyrighted work</strong> claimed to have been infringed, please describe the work and include a location (URL) where possible." },
                  { num: "3.", text: "<strong>Identification of the infringing material</strong> that is to be removed or access to which is to be disabled, and information sufficient to permit us to locate the material." },
                  { num: "4.", text: "The <strong>address, telephone number, and email address</strong> where you can be contacted." },
                  { num: "5.", text: "A <strong>good-faith belief statement</strong> that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law." },
                  { num: "6.", text: "A statement that the information in the notification is <strong>accurate, and under penalty of perjury</strong>, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-sm transition-all duration-300">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 text-xs font-black shrink-0 mt-0.5">{item.num}</span>
                    <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: item.text }} />
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-xl border-l-4 border-yellow-500 mt-8">
                <p className="text-slate-600 dark:text-slate-300 font-medium italic leading-relaxed text-sm">
                  <strong className="text-yellow-600 dark:text-yellow-400">Note:</strong> All notifications not relevant to us or ineffective under the law will receive no response or action.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Us */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-blue-600/10 text-blue-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <Mail className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Contact Us</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm mb-6">
                If you have any questions about our Copyright Claims Policy or need to report an infringement, please contact us at:
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <a href="mailto:Support@fsmvid.com" className="text-blue-600 dark:text-blue-400 hover:underline font-bold text-lg">
                    Support@fsmvid.com
                  </a>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">
                    Or visit our <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">Contact Page</Link> for more ways to reach us.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  )
}
