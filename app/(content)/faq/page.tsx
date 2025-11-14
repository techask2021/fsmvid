import type { Metadata } from "next"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HelpCircle, Zap, Shield, Code, MessageCircle, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | FSMVID",
  description:
    "Find answers to common questions about our Free Social Media Video Downloader tool and how to download content from various social media platforms.",
}

export default function FAQPage() {
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
            <HelpCircle className="w-4 h-4 mr-2" />
            Help Center
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed">
            Find quick answers to common questions about our video downloader tool.
            <br />
            <span className="text-lg">Everything you need to know in one place.</span>
          </p>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-gray-50 dark:bg-slate-900 py-8">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Zap, title: "General", description: "Basic questions about our service", color: "from-blue-500 to-cyan-600" },
              { icon: Code, title: "Technical", description: "How our tool works", color: "from-purple-500 to-pink-600" },
              { icon: Shield, title: "Legal", description: "Terms and privacy info", color: "from-green-500 to-emerald-600" }
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={`w-12 h-12 mb-3 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="bg-white dark:bg-slate-950 py-16">
        <div className="container mx-auto px-4">

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="general" className="mb-8">
          <TabsList className="grid grid-cols-4 mb-4 h-auto p-2 bg-gray-100 dark:bg-slate-800">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card className="border-0 shadow-xl">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  General Questions
                </CardTitle>
                <CardDescription className="text-base">Common questions about our downloader service</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is this service free to use?</AccordionTrigger>
                    <AccordionContent>
                      Yes, our downloader tool is completely free to use. There are no hidden fees or subscriptions required.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Which platforms are supported?</AccordionTrigger>
                    <AccordionContent>
                      We support downloading content from YouTube, TikTok, Facebook, Twitter, Instagram, Dailymotion, Telegram,
                      Tumblr, Snapchat, Pinterest, LinkedIn, Imgur, and Rumble.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>What types of content can I download?</AccordionTrigger>
                    <AccordionContent>
                      Depending on the platform, you can download videos, images, GIFs, and other media content. Each platform
                      has different content types available for download.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Do I need to create an account to use the service?</AccordionTrigger>
                    <AccordionContent>
                      No, you don't need to create an account or register to use our downloader tool. Simply paste the URL and start downloading.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>Is there a limit to how many downloads I can make?</AccordionTrigger>
                    <AccordionContent>
                      There are no strict limits on the number of downloads, but we do implement fair usage policies to ensure the service remains available to everyone.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="technical">
            <Card className="border-0 shadow-xl">
              <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  Technical Questions
                </CardTitle>
                <CardDescription className="text-base">Questions about technical aspects of our service</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Why isn't my download working?</AccordionTrigger>
                    <AccordionContent>
                      There could be several reasons: the content might be private, the URL might be incorrect, or the platform
                      might have updated its structure. Try refreshing the page and checking your URL. If issues persist,
                      contact our support.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>What quality options are available?</AccordionTrigger>
                    <AccordionContent>
                      We offer various quality options depending on the original content and platform. For videos, we typically
                      provide options from low to high definition (HD) when available.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I download content on mobile devices?</AccordionTrigger>
                    <AccordionContent>
                      Yes, our downloader works on all devices including smartphones and tablets. The process is the same - just paste the URL and download.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I save the downloaded content?</AccordionTrigger>
                    <AccordionContent>
                      After clicking the download button, your browser will either automatically save the file to your default download location or prompt you to choose where to save it.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>What browsers are supported?</AccordionTrigger>
                    <AccordionContent>
                      Our downloader works with all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend keeping your browser updated to the latest version for the best experience.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="legal">
            <Card className="border-0 shadow-xl">
              <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                  Legal Questions
                </CardTitle>
                <CardDescription className="text-base">Questions about legal aspects of downloading content</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is it legal to download content?</AccordionTrigger>
                    <AccordionContent>
                      Our tool is designed for downloading content for personal use only. Please respect copyright laws and the
                      terms of service of the platforms you're downloading from. Do not download or distribute copyrighted
                      content without permission.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I use downloaded content commercially?</AccordionTrigger>
                    <AccordionContent>
                      Generally, no. Most content on social media platforms is protected by copyright, and downloading it doesn't give you the right to use it commercially. Always obtain proper permissions or licenses from the content creator before using downloaded content for commercial purposes.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Do you store the content I download?</AccordionTrigger>
                    <AccordionContent>
                      No, we don't store any of the content you download. Our service acts as a bridge between you and the platform, but we don't keep copies of the downloaded files on our servers.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>What data do you collect about users?</AccordionTrigger>
                    <AccordionContent>
                      We collect minimal data necessary for the service to function, such as temporary logs of download requests. We don't collect personal information or track individual user behavior. Please refer to our Privacy Policy for more details.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="platforms">
            <Card className="border-0 shadow-xl">
              <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-red-50 dark:from-slate-800 dark:to-slate-700">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  Platform-Specific Questions
                </CardTitle>
                <CardDescription className="text-base">Questions about downloading from specific platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I download YouTube videos?</AccordionTrigger>
                    <AccordionContent>
                      Copy the YouTube video URL from your browser's address bar, paste it into our downloader tool, select your preferred quality and format, and click download. For more detailed instructions, visit our <a href="/youtube-video-saver" className="text-primary hover:underline">YouTube downloader page</a>.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I download TikTok videos without watermark?</AccordionTrigger>
                    <AccordionContent>
                      Yes, our TikTok downloader removes the watermark from videos, giving you clean videos for personal use. Visit our <a href="/tiktok-video-saver" className="text-primary hover:underline">TikTok downloader page</a> for more information.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I download Instagram stories?</AccordionTrigger>
                    <AccordionContent>
                      You can download public Instagram stories by copying the profile URL and pasting it into our downloader. Note that private stories cannot be downloaded. Visit our <a href="/instagram-media-saver" className="text-primary hover:underline">Instagram downloader page</a> for more details.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I download Facebook private videos?</AccordionTrigger>
                    <AccordionContent>
                      No, our tool can only download publicly available Facebook videos. Private videos that require login credentials cannot be accessed by our downloader. Check out our <a href="/facebook-media-grabber" className="text-primary hover:underline">Facebook downloader page</a> for more information.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I download Twitter/X videos?</AccordionTrigger>
                    <AccordionContent>
                      Copy the tweet URL containing the video, paste it into our downloader tool, and click download. Our tool works with both Twitter.com and X.com URLs. Visit our <a href="/twitter-video-saver" className="text-primary hover:underline">Twitter downloader page</a> for more information.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="mt-12 border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">Still Have Questions?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Couldn't find the answer you're looking for? Our friendly support team is here to help! 
              Get in touch and we'll respond within 24 hours.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg"
              asChild
            >
              <Link href="/contact">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Support
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
        </div>
      </section>
    </div>
  )
}
