import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Clock, MapPin, Megaphone, PenTool, TrendingUp, Sparkles, MessageCircle, Headphones, Globe, CheckCircle, Shield } from "lucide-react"
import ContactForm from "./contact-form"

export const metadata: Metadata = {
  title: "Contact Us | FSMVID | Free Social Media Video Downloader",
  description: "Get in touch with the FSMVID team. We're here to help with any questions, suggestions, or concerns you may have. Explore guest post and advertising opportunities.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-white/20 backdrop-blur-md text-white border-white/30 shadow-lg px-6 py-2 text-sm font-semibold hover:bg-white/30 transition-all">
              <MessageCircle className="w-4 h-4 mr-2" />
              Let's Connect
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Get In Touch With Us
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Have questions? Want to partner with us? We'd love to hear from you.
              <br />
              <span className="text-lg">Our team typically responds within 24 hours.</span>
            </p>
          </div>

          {/* Quick Contact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Headphones, label: "24/7 Support", value: "Always Here" },
              { icon: Clock, label: "Response Time", value: "< 24 Hours" },
              { icon: MessageCircle, label: "Happy Clients", value: "50K+" },
              { icon: Globe, label: "Global Reach", value: "150+ Countries" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 hover:bg-white/20 transition-all">
                <stat.icon className="w-8 h-8 text-cyan-300 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Business Opportunities Section */}
      <section className="bg-gray-50 dark:bg-slate-900 py-16">
        <div className="container max-w-6xl mx-auto px-4">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border-2 border-blue-200 dark:border-blue-700 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-blue-900">
                🚀 Partner With Us
              </h2>
              <p className="text-lg text-gray-700">
                Reach thousands of engaged users interested in social media tools and video content
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {/* Guest Post */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PenTool className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Guest Posts</h3>
                <p className="text-gray-600 text-center mb-4">
                  Share your expertise with our audience. Monthly or yearly packages available.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ High-quality backlinks</li>
                  <li>✓ Targeted audience</li>
                  <li>✓ SEO-friendly content</li>
                  <li>✓ Long-term visibility</li>
                </ul>
              </div>

              {/* Ad Placement */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Megaphone className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Ad Placement</h3>
                <p className="text-gray-600 text-center mb-4">
                  Premium advertising spots to showcase your products or services.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ Banner ads</li>
                  <li>✓ Sponsored content</li>
                  <li>✓ Custom placements</li>
                  <li>✓ Flexible terms</li>
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Why Choose Us?</h3>
                <p className="text-gray-600 text-center mb-4">
                  Get maximum exposure and ROI with our growing platform.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ Active user base</li>
                  <li>✓ Niche audience</li>
                  <li>✓ Competitive rates</li>
                  <li>✓ Detailed analytics</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Interested in growing your brand with us?
              </p>
              <p className="text-gray-600">
                Fill out the form below and select "Guest Post Inquiry" or "Ad Placement" as your subject
              </p>
            </div>
          </CardContent>
        </Card>
        </div>
      </section>
      
      {/* Main Contact Section */}
      <section className="bg-white dark:bg-slate-950 py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Contact Information */}
        <div>
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Quick Contact Info
          </Badge>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Let's Start a Conversation</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Whether you have a question, need support, or want to explore partnership opportunities, 
            we're here to help! Fill out the form and our team will respond within 24 hours.
          </p>

          <div className="space-y-4 mb-8">
            <Card className="border-l-4 border-l-blue-600 hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Email Us</h3>
                    <a href="mailto:support@fsmvid.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                      support@fsmvid.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600 hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Response Time</h3>
                    <p className="text-gray-600 dark:text-gray-300">Within 24 hours • Mon-Fri: 9AM - 5PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-600 hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Global Service</h3>
                    <p className="text-gray-600 dark:text-gray-300">Available worldwide in 150+ countries</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-800 dark:to-slate-700 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Copyright Claims</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
                    For copyright concerns or infringement notices, please visit our dedicated 
                    <Link href="/copyright-claims" className="text-orange-600 dark:text-orange-400 hover:underline font-semibold mx-1">
                      Copyright Claims page
                    </Link>
                    or email us directly.
                  </p>
                  <a href="mailto:support@fsmvid.com" 
                     className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold text-sm">
                    support@fsmvid.com →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Contact Form */}
        <div>
          <Badge className="mb-6 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 px-4 py-2">
            <CheckCircle className="w-4 h-4 mr-2" />
            Send Us a Message
          </Badge>
          <ContactForm />
          <p className="text-sm text-center mt-4 text-gray-500 dark:text-gray-400">
            By submitting this form, you agree to our <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Privacy Policy</Link>
            {" "}and consent to us processing your information.
          </p>
        </div>
      </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Why Our Clients Trust Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join thousands of satisfied users worldwide
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your data is safe with us. We never share your information.",
                color: "from-green-500 to-emerald-600"
              },
              {
                icon: Headphones,
                title: "Dedicated Support",
                description: "Our team is always ready to help you succeed.",
                color: "from-blue-500 to-cyan-600"
              },
              {
                icon: TrendingUp,
                title: "Proven Results",
                description: "50,000+ happy clients and growing every day.",
                color: "from-purple-500 to-pink-600"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 
