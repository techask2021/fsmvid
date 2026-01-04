import Image from "next/image"
import HeroSectionStyles from "@/components/content/hero-section-styles"
import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Shield, AlertTriangle, Mail, CheckCircle, RefreshCw, Scale, Link as LinkIcon } from "lucide-react"

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
            <FileText className="w-3.5 h-3.5 mr-2" />
            Legal Agreement
          </Badge>

          <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic leading-tight mb-8 uppercase text-white drop-shadow-2xl">
            Terms of <span className="text-blue-400">Service</span>
          </h1>

          <div className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed drop-shadow-md">
              Please read these terms carefully before using our service.
              <br />
              <span className="text-base text-blue-200 italic">Your use of FSMVID constitutes acceptance of these terms.</span>
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
                <strong className="text-orange-600 dark:text-orange-400">Your continued use of this website constitutes your acceptance of these terms of service.</strong> Please review them carefully. By using FSMVID, you agree to be bound by these terms.
              </p>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-blue-600/10 text-blue-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <Scale className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Terms and Conditions</h2>
              </div>

              <div className="space-y-4">
                {[
                  { icon: CheckCircle, color: "text-blue-500", text: "This website is intended for <strong>personal use only</strong>." },
                  { icon: CheckCircle, color: "text-green-500", text: "You may use our website as a <strong>recording service only and only as permitted by law</strong>." },
                  { icon: AlertTriangle, color: "text-red-500", text: "You <strong>may not use our services to download or convert any copyrighted material</strong>." },
                  { icon: Shield, color: "text-orange-500", text: "You are <strong>solely responsible for any misuse</strong> of these services and any copyright violations that may occur by using our website." },
                  { icon: FileText, color: "text-purple-500", text: "You are responsible for <strong>reading the terms of service of the websites</strong> you are downloading any media from, as you might be breaking their terms of service by using our services." },
                  { icon: Shield, color: "text-yellow-500", text: "We are <strong>not to be held responsible</strong> for any misuse of the services provided on this website and any damages that might occur by using these services." },
                  { icon: RefreshCw, color: "text-cyan-500", text: "We reserve the right to <strong>amend these terms at any time</strong>." },
                  { icon: CheckCircle, color: "text-indigo-500", text: "Your continued use of this website <strong>constitutes your acceptance</strong> of these terms of service." },
                  { icon: RefreshCw, color: "text-blue-500", text: "<strong>Refund Policy</strong>: All purchases are subject to our <a href='/refund-policy' class='text-blue-600 underline'>Refund Policy</a>. Generally, refunds are only available if no credits have been used. Once credits are consumed, the service is non-refundable." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-sm transition-all duration-300">
                    <item.icon className={`w-5 h-5 ${item.color} mt-0.5 shrink-0`} />
                    <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: item.text }} />
                  </div>
                ))}
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
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Questions About Our Terms?</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm mb-6">
                If you have any questions about these Terms of Service, please don't hesitate to contact us:
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <a href="mailto:support@fsmvid.com" className="text-blue-600 dark:text-blue-400 hover:underline font-bold text-lg">
                    support@fsmvid.com
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
