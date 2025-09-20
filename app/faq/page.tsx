import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | FSMVID",
  description:
    "Find answers to common questions about our Free Social Media Video Downloader tool and how to download content from various social media platforms.",
}

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our Free Social Media Video Downloader tool and how to use it effectively.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="general" className="mb-8">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Questions</CardTitle>
                <CardDescription>Common questions about our downloader service</CardDescription>
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
                      We support downloading content from YouTube, TikTok, Facebook, Twitter, Instagram, Vimeo, Dailymotion, Telegram,
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
            <Card>
              <CardHeader>
                <CardTitle>Technical Questions</CardTitle>
                <CardDescription>Questions about technical aspects of our service</CardDescription>
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
            <Card>
              <CardHeader>
                <CardTitle>Legal Questions</CardTitle>
                <CardDescription>Questions about legal aspects of downloading content</CardDescription>
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
            <Card>
              <CardHeader>
                <CardTitle>Platform-Specific Questions</CardTitle>
                <CardDescription>Questions about downloading from specific platforms</CardDescription>
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
        
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            If you couldn't find the answer to your question, feel free to contact us.
          </p>
          <div className="flex justify-center">
            <a href="/contact" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
