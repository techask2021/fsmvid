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
            Your Privacy Matters
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed">
            We believe in transparency. Learn how we protect and handle your data.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 text-white border border-white/20">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Last updated: {currentDate}</span>
          </div>
        </div>
      </section>

      {/* Key Points Section */}
      <section className="bg-gray-50 dark:bg-slate-900 py-12">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Lock, title: "No Personal Data", description: "Use anonymously without providing personal info" },
              { icon: Shield, title: "Secure & Safe", description: "Industry-standard security measures" },
              { icon: Eye, title: "Transparent", description: "Clear about what we collect and why" }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
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
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Introduction</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              At Fsmvid, accessible from <a href="https://fsmvid.com" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">https://fsmvid.com</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Fsmvid and how we use it.
            </p>
            <p className="leading-relaxed">
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">contact us</Link>.
            </p>
            <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="leading-relaxed">
                This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Fsmvid. This policy is not applicable to any information collected offline or via channels other than this website.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Consent</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Information We Collect</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <p className="leading-relaxed">
              If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
            </p>
            <p className="leading-relaxed">
              When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">How We Use Your Information</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
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
              <div key={index} className="flex items-start gap-3 bg-green-50 dark:bg-slate-800 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800 dark:text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Log Files</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Fsmvid follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Cookies and Web Beacons</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              Like any other website, Fsmvid uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>
            <div className="bg-purple-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-purple-600">
              <p className="leading-relaxed">
                For more general information on cookies, please read <a href="https://www.privacypolicyonline.com/what-are-cookies/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline font-semibold">"What Are Cookies" from Cookie Consent</a>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Google DoubleClick DART Cookie</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">https://policies.google.com/technologies/ads</a>
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Our Advertising Partners</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.
            </p>
            <div className="bg-indigo-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-indigo-600">
              <p className="font-semibold mb-2">Google</p>
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                https://policies.google.com/technologies/ads
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <LinkIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Advertising Partners Privacy Policies</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              You may consult this list to find the Privacy Policy for each of the advertising partners of Fsmvid.
            </p>
            <p className="leading-relaxed">
              Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Fsmvid, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
            </p>
            <div className="bg-cyan-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-cyan-600">
              <p className="leading-relaxed">
                <strong>Note:</strong> Fsmvid has no access to or control over these cookies that are used by third-party advertisers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Third Party Privacy Policies</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              Fsmvid's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
            <p className="leading-relaxed">
              You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
            </p>
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              Under the CCPA, among other rights, California consumers have the right to:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-blue-50 dark:bg-slate-800 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
              </div>
              <div className="flex items-start gap-3 bg-blue-50 dark:bg-slate-800 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">Request that a business delete any personal data about the consumer that a business has collected.</p>
              </div>
              <div className="flex items-start gap-3 bg-blue-50 dark:bg-slate-800 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</p>
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-slate-700 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="leading-relaxed font-semibold">
                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact us</Link>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">GDPR Data Protection Rights</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-green-50 dark:bg-slate-800 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed"><strong>The right to access</strong> – You have the right to request copies of your personal data. We may charge you a small fee for this service.</p>
              </div>
              <div className="flex items-start gap-3 bg-green-50 dark:bg-slate-800 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed"><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p>
              </div>
              <div className="flex items-start gap-3 bg-green-50 dark:bg-slate-800 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed"><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</p>
              </div>
              <div className="flex items-start gap-3 bg-green-50 dark:bg-slate-800 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed"><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>
              </div>
              <div className="flex items-start gap-3 bg-green-50 dark:bg-slate-800 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed"><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</p>
              </div>
              <div className="flex items-start gap-3 bg-green-50 dark:bg-slate-800 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed"><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p>
              </div>
            </div>
            <div className="bg-green-100 dark:bg-slate-700 p-4 rounded-lg border-l-4 border-green-600">
              <p className="leading-relaxed font-semibold">
                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please <Link href="/contact" className="text-green-600 dark:text-green-400 hover:underline">contact us</Link>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Children's Information</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <div className="bg-pink-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-pink-600">
              <p className="leading-relaxed">
                <strong>Important:</strong> Fsmvid does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
              </p>
            </div>
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
            If you have any questions about this Privacy Policy, please contact us at:
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
