import Image from "next/image"
import HeroSectionStyles from "@/components/content/hero-section-styles"
import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, Cookie, Link as LinkIcon, RefreshCw, Mail, CheckCircle, Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | FSMVID | Free Social Media Video Downloader",
  description: "Learn about our privacy practices and how we handle your information at FSMVID.",
}

export default function PrivacyPolicyPage() {
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
            Your Privacy Matters
          </Badge>

          <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic leading-tight mb-8 uppercase text-white drop-shadow-2xl">
            Privacy <span className="text-blue-400">Policy</span>
          </h1>

          <div className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed drop-shadow-md">
              We believe in transparency. Learn how we protect and handle your data.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-slate-200 border border-white/10 mt-4">
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="text-xs font-bold uppercase tracking-wider">Last updated: {currentDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Points Section */}
      <section className="bg-gray-50 dark:bg-slate-950 py-12">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Lock, title: "No Personal Data", description: "Use anonymously without providing personal info", gradient: "from-blue-600/10 to-blue-600/10" },
              { icon: Shield, title: "Secure & Safe", description: "Industry-standard security measures", gradient: "from-green-600/10 to-green-600/10" },
              { icon: Eye, title: "Transparent", description: "Clear about what we collect and why", gradient: "from-purple-600/10 to-purple-600/10" }
            ].map((item, index) => (
              <Card key={index} className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800 hover:scale-[1.02] transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-sm group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500`}>
                    <item.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-lg mb-3">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white dark:bg-slate-950 py-16">
        <div className="container max-w-4xl mx-auto px-4 space-y-8">

          {/* Introduction */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-blue-600/10 text-blue-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Introduction</h2>
              </div>
              <div className="space-y-4 text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm">
                <p className="border-l-2 border-blue-600/10 pl-6">
                  At Fsmvid, accessible from <a href="https://fsmvid.com" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">https://fsmvid.com</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Fsmvid and how we use it.
                </p>
                <p className="border-l-2 border-blue-600/10 pl-6">
                  If you have additional questions or require more information about our Privacy Policy, do not hesitate to <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">contact us</Link>.
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p>
                    This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Fsmvid. This policy is not applicable to any information collected offline or via channels other than this website.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consent */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/10 to-purple-600/10 text-purple-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Consent</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm border-l-2 border-purple-600/10 pl-6">
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/10 to-cyan-600/10 text-cyan-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm">
                <p className="border-l-2 border-cyan-600/10 pl-6">
                  The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                </p>
                <p className="border-l-2 border-cyan-600/10 pl-6">
                  If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                </p>
                <p className="border-l-2 border-cyan-600/10 pl-6">
                  When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/10 to-green-600/10 text-green-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">How We Use Your Information</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm mb-6">
                We use the information we collect in various ways, including to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Provide, operate, and maintain our website",
                  "Improve, personalize, and expand our website",
                  "Understand and analyze how you use our website",
                  "Develop new products, services, features, and functionality",
                  "Communicate with you for customer service and updates",
                  "Send you emails",
                  "Find and prevent fraud"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" />
                    <span className="text-[10px] md:text-xs font-black italic uppercase tracking-tight text-slate-900 dark:text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Log Files */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600/10 to-orange-600/10 text-orange-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Log Files</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm border-l-2 border-orange-600/10 pl-6">
                Fsmvid follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card id="cookies" className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800 scroll-mt-20">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600/10 to-pink-600/10 text-pink-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <Cookie className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Cookies and Web Beacons</h2>
              </div>
              <div className="space-y-4 text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm">
                <p className="border-l-2 border-pink-600/10 pl-6">
                  Like any other website, Fsmvid uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p>
                    For more general information on cookies, please read <a href="https://www.privacypolicyonline.com/what-are-cookies/" target="_blank" rel="noopener noreferrer" className="text-pink-600 dark:text-pink-400 hover:underline font-bold">"What Are Cookies" from Cookie Consent</a>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DART Cookie */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-600/10 to-red-600/10 text-red-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <Cookie className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Google DoubleClick DART Cookie</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm border-l-2 border-red-600/10 pl-6">
                Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">https://policies.google.com/technologies/ads</a>
              </p>
            </CardContent>
          </Card>

          {/* Advertising Partners */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600/10 to-indigo-600/10 text-indigo-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Our Advertising Partners</h2>
              </div>
              <div className="space-y-4 text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm">
                <p className="border-l-2 border-indigo-600/10 pl-6">
                  Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p className="font-bold mb-2 text-slate-900 dark:text-slate-200">Google</p>
                  <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold">
                    https://policies.google.com/technologies/ads
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advertising Partners Policies */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/10 to-cyan-600/10 text-cyan-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <LinkIcon className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Advertising Partners Privacy Policies</h2>
              </div>
              <div className="space-y-4 text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm">
                <p className="border-l-2 border-cyan-600/10 pl-6">
                  You may consult this list to find the Privacy Policy for each of the advertising partners of Fsmvid.
                </p>
                <p className="border-l-2 border-cyan-600/10 pl-6">
                  Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Fsmvid, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p>
                    <strong className="text-slate-900 dark:text-slate-200">Note:</strong> Fsmvid has no access to or control over these cookies that are used by third-party advertisers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Third Party Policies */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600/10 to-orange-600/10 text-orange-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Third Party Privacy Policies</h2>
              </div>
              <div className="space-y-4 text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm">
                <p className="border-l-2 border-orange-600/10 pl-6">
                  Fsmvid's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                </p>
                <p className="border-l-2 border-orange-600/10 pl-6">
                  You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CCPA Rights */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-blue-600/10 text-blue-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <Scale className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">CCPA Privacy Rights</h2>
              </div>
              <div className="space-y-4 text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm">
                <p className="mb-4">
                  Under the CCPA, among other rights, California consumers have the right to:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                    <p className="leading-relaxed">Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                    <p className="leading-relaxed">Request that a business delete any personal data about the consumer that a business has collected.</p>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                    <p className="leading-relaxed">Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</p>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border-l-4 border-blue-600 mt-4">
                  <p className="font-medium text-blue-800 dark:text-blue-200">
                    If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please <Link href="/contact" className="underline font-bold">contact us</Link>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GDPR Rights */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/10 to-green-600/10 text-green-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">GDPR Data Protection Rights</h2>
              </div>
              <div className="space-y-4 text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm">
                <p className="mb-4">
                  We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <p className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200 uppercase text-xs tracking-wider">The right to access</strong> – You have the right to request copies of your personal data. We may charge you a small fee for this service.</p>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <p className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200 uppercase text-xs tracking-wider">The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <p className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200 uppercase text-xs tracking-wider">The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</p>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <p className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200 uppercase text-xs tracking-wider">The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <p className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200 uppercase text-xs tracking-wider">The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</p>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <p className="leading-relaxed"><strong className="text-slate-900 dark:text-slate-200 uppercase text-xs tracking-wider">The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border-l-4 border-green-600 mt-4">
                  <p className="font-medium text-green-800 dark:text-green-200">
                    If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please <Link href="/contact" className="underline font-bold">contact us</Link>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Children's Information */}
          <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600/10 to-pink-600/10 text-pink-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Children's Information</h2>
              </div>
              <div className="space-y-4 text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm">
                <p className="border-l-2 border-pink-600/10 pl-6">
                  Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                </p>
                <div className="bg-pink-50 dark:bg-pink-900/10 p-4 rounded-xl border-l-4 border-pink-600">
                  <p>
                    <strong className="text-pink-800 dark:text-pink-200">Important:</strong> Fsmvid does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                  </p>
                </div>
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
                If you have any questions about this Privacy Policy, please contact us at:
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
