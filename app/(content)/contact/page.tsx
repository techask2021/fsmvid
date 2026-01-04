"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Mail,
  Clock,
  MessageCircle,
  Globe,
  Send,
  ArrowRight,
  CheckCircle,
  Shield,
  Megaphone,
  TrendingUp,
  Target,
  BarChart3
} from "lucide-react"
import HeroSectionStyles from "@/components/content/hero-section-styles"
import { useState, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RecaptchaButton } from "@/components/forms/recaptcha"

export default function ContactPage() {
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleFormAction = async (formData: FormData) => {
    try {
      const recaptchaToken = formData.get("g-recaptcha-response")

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          recaptchaToken
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: data.message || "We'll get back to you within 24 hours."
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
        formRef.current?.reset()
      } else {
        throw new Error(data.error || 'Failed to send message')
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section - Match Privacy Policy Style */}
      <section className="relative min-h-[50vh] overflow-hidden flex flex-col items-center justify-center pt-32 pb-20 px-4 mb-8 group">
        <HeroSectionStyles />

        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/pages.png"
            alt="Contact Hero Background"
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
            <MessageCircle className="w-3.5 h-3.5 mr-2" />
            Let's Connect
          </Badge>

          <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic leading-tight mb-8 uppercase text-white drop-shadow-2xl">
            Get In Touch <span className="text-blue-400">With Us</span>
          </h1>

          <div className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed drop-shadow-md">
              Have questions? Want to partner with us? We'd love to hear from you.
              <br />
              <span className="text-base text-blue-200 italic">Our team typically responds within 24 hours.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="container max-w-6xl mx-auto px-4 -mt-16 mb-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Clock, title: "Always Here", subtitle: "24/7 Support", color: "text-blue-500" },
            { icon: Clock, title: "< 24 Hours", subtitle: "Response Time", color: "text-green-500" },
            { icon: MessageCircle, title: "50K+", subtitle: "Happy Clients", color: "text-purple-500" },
            { icon: Globe, title: "150+", subtitle: "Countries", color: "text-orange-500" }
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-xl bg-white dark:bg-slate-900 rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col items-center gap-3">
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 dark:text-white">{stat.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.subtitle}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Partner With Us Section */}
      <section className="container max-w-6xl mx-auto px-4 mb-16">
        <Card className="border-none shadow-xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 border-none px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                <Megaphone className="w-3.5 h-3.5 mr-2" />
                Partner With Us
              </Badge>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
                Reach thousands of engaged users interested in social media tools and video content!
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Megaphone,
                  title: "Guest Posts",
                  description: "Share your expertise with our audience. Monthly or yearly packages available.",
                  features: ["High-quality backlinks", "Targeted audience", "SEO-friendly content", "Long-term visibility"],
                  color: "blue"
                },
                {
                  icon: Target,
                  title: "Ad Placement",
                  description: "Premium advertising spots to showcase your products or services.",
                  features: ["Banner ads", "Sponsored content", "Custom placements", "Flexible terms"],
                  color: "purple"
                },
                {
                  icon: TrendingUp,
                  title: "Why Choose Us?",
                  description: "Get maximum exposure and ROI with our growing platform.",
                  features: ["Active user base", "Niche audience", "Competitive rates", "Detailed analytics"],
                  color: "green"
                }
              ].map((option, i) => (
                <Card key={i} className="border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-lg transition-all">
                  <div className={`bg-${option.color}-100 dark:bg-${option.color}-900/30 w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                    <option.icon className={`w-6 h-6 text-${option.color}-600 dark:text-${option.color}-400`} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">{option.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{option.description}</p>
                  <ul className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                <strong>Interested in growing your brand with us?</strong>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                Fill out the form below and select "Guest Post Inquiry" or "Ad Placement" as your subject
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Main Contact Section */}
      <section className="container max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
            <CardContent className="p-8 md:p-10">
              <div className="mb-8">
                <Badge className="mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-none px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                  <Send className="w-3.5 h-3.5 mr-2" />
                  Quick Contact Info
                </Badge>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
                  Let's Start a Conversation
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Whether you have a question, need support, or want to explore partnership opportunities, we're here to help! Fill out the form and our team will respond within 24 hours.
                </p>
              </div>

              <form ref={formRef} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={formData.name}
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={formData.email}
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Subject
                  </Label>
                  <input type="hidden" name="subject" value={formData.subject} />
                  <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                    <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guest-post">🎯 Guest Post Inquiry</SelectItem>
                      <SelectItem value="ad-placement">📢 Ad Placement</SelectItem>
                      <SelectItem value="business-partnership">🤝 Business Partnership</SelectItem>
                      <SelectItem value="general">💬 General Inquiry</SelectItem>
                      <SelectItem value="technical">🔧 Technical Support</SelectItem>
                      <SelectItem value="feedback">💭 Feedback</SelectItem>
                      <SelectItem value="copyright">⚖️ Copyright Issue</SelectItem>
                      <SelectItem value="other">📝 Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    defaultValue={formData.message}
                    className="min-h-[150px] rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <RecaptchaButton formAction={handleFormAction} formRef={formRef} />

                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                  By submitting this form, you agree to our{" "}
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and consent to us processing your information.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info Cards */}
          <div className="space-y-6">
            {[
              {
                icon: Mail,
                title: "Email Us",
                value: "support@fsmvid.com",
                description: "Send us an email anytime",
                color: "blue"
              },
              {
                icon: Clock,
                title: "Response Time",
                value: "Within 24 hours • Mon-Fri, 8AM - 5PM EST",
                description: "We aim to respond quickly",
                color: "green"
              },
              {
                icon: Globe,
                title: "Global Service",
                value: "Available in 150+ countries",
                description: "Serving users worldwide",
                color: "purple"
              }
            ].map((info, i) => (
              <Card key={i} className="border-none shadow-xl bg-white dark:bg-slate-900 rounded-2xl p-6 hover:shadow-2xl transition-all">
                <div className="flex items-start gap-4">
                  <div className={`bg-${info.color}-100 dark:bg-${info.color}-900/30 p-3 rounded-xl shrink-0`}>
                    <info.icon className={`w-6 h-6 text-${info.color}-600 dark:text-${info.color}-400`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{info.title}</p>
                    <p className="text-lg font-black text-slate-900 dark:text-white mb-1">{info.value}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{info.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            {/* Copyright Claims Card */}
            <Card className="border-none shadow-xl bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6 border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 dark:bg-orange-900/40 p-3 rounded-xl shrink-0">
                  <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1">
                    Copyright Claims
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                    For copyright concerns or infringement notices, please visit our dedicated{" "}
                    <Link href="/copyright-claims" className="text-orange-600 dark:text-orange-400 font-bold hover:underline">
                      Copyright Claims page
                    </Link>{" "}
                    or email us directly.
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Email: <span className="font-bold">support@fsmvid.com</span>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="bg-slate-900 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4">
            Need Quick <span className="text-blue-400">Information?</span>
          </h2>
          <p className="text-slate-400 mb-8">
            Visit our FAQ page for instant answers to common questions.
          </p>
          <Button asChild className="h-14 px-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase text-sm tracking-wider shadow-xl transition-all active:scale-95">
            <Link href="/faq" className="flex items-center gap-3">
              Visit FAQ <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
