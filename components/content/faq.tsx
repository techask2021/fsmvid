import { Badge } from "@/components/ui/badge";
import { HelpCircle, Plus, Globe, ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function FAQSection() {
  const faqs = [
    {
      question: "How do I download a video from any social media platform?",
      answer:
        "It's actually simpler. Copy the video URL from whatever platform you're on—YouTube, TikTok, Instagram, wherever. Paste that URL into FSMVID's input box, select your preferred quality and format, and hit download. The whole process takes maybe 10 seconds.",
    },
    {
      question: "Is there any free video downloader?",
      answer:
        "Yes, and you're looking at one. FSMVID is completely free with no catches. No \"3 downloads per day\" limits, no premium features locked behind paywalls, no forced account creation.",
    },
    {
      question: "Which social media platforms are supported?",
      answer:
        "We support over 30 platforms, with additional platforms to be added soon. The major ones are YouTube, TikTok, Instagram, Facebook, Twitter (X), Pinterest, Reddit, LinkedIn, Snapchat, Dailymotion, Twitch, IMDb, Telegram, and Threads.",
    },
    {
      question: "What file formats can I download?",
      answer:
        "We support the formats that actually matter: MP4 is our default format and works on virtually everything—phones, computers, tablets, smart TVs. MKV if you want the absolute highest quality and plan to archive or edit the video. WebM for lightweight files perfect for web use. MP3 for audio-only downloads when you don't need the video part. Our built-in video converter automatically selects the format according to your preference.",
    },
    {
      question: "Is there a limit to how many videos I can download?",
      answer:
        "Nope. Download one video or a hundred—there's no artificial limit. We're not going to hit you with a \"you've reached your daily limit\" message after three downloads like some video download utilities do.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "Absolutely not. No account, no registration, no email required. Just visit the site and start downloading. Creating accounts for every online tool is annoying and unnecessary. Your email is valuable—don't give it away for basic video download software that should work without all that friction.",
    },
    {
      question: "How do I download videos on my mobile device?",
      answer:
        "The same way as on a desktop. FSMVID works identically on mobile browsers—Safari on iPhone, Chrome on Android, and any other browser you use. Open your mobile browser, go to FSMVID, paste the video URL, select your format and quality, and download. The video saves to your device's storage. On iPhone, it goes to your Files app. On Android, it goes to your Downloads folder.",
    },
    {
      question: "Can I download multiple social media videos at once?",
      answer:
        "Yes, FSMVID includes a bulk download feature. Simply paste your list of social media links to process and save multiple videos simultaneously using our free social media video downloader.",
    },
    {
      question: "Is the tool safe to use?",
      answer:
        "Yes. FSMVID is a web-based tool that doesn't require installing any software on your device. That's inherently safer than desktop video download software that could contain malware or unwanted programs. We don't collect your personal data, we don't track what you download, and we don't sell your information. The video download process is secure, and download links expire quickly for privacy reasons.",
    },
    {
      question: "Is it legal to download social media videos?",
      answer:
        "The legal answer is: it depends on what you do with them. Downloading videos for personal viewing is generally fine. Downloading a funny video your friend shared to watch offline? That's not going to get you in trouble. What's NOT legal: downloading someone else's content and reposting it as your own. That's copyright infringement. The same goes for using downloaded videos commercially without permission. The creator owns the copyright regardless of whether you can technically download the file.",
    },
  ];

  return (
    <div className="w-full">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-blue-600/10 text-blue-600 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-2">
            <HelpCircle className="w-3 h-3" />
            Help Center
          </Badge>
          <h2 className="text-xl md:text-3xl font-black tracking-tighter italic uppercase text-slate-900 leading-[0.9]">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto font-medium italic pt-4 mt-2 leading-relaxed">
            Find answers to common questions about our video downloader service.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="border border-slate-200 shadow-2xl shadow-slate-200/40 rounded-[2.5rem] bg-white overflow-hidden group hover:translate-y-[-4px] transition-all duration-500">
              <CardContent className="p-0">
                <details className="group/details">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none bg-slate-900 group-open/details:bg-[#050b1a] transition-colors duration-500">
                    <div className="flex items-center gap-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-blue-400 group-hover/details:bg-blue-600 group-hover/details:text-white transition-all duration-500 group-hover/details:rotate-12">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <h3 className="font-black italic uppercase tracking-tighter text-white text-[11px] md:text-sm group-hover/details:text-blue-400 transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-open/details:bg-blue-600 group-open/details:border-blue-600 transition-all duration-300 shadow-lg">
                      <Plus className="w-4 h-4 text-white group-open/details:rotate-45 transition-all duration-300" />
                    </div>
                  </summary>
                  <div className="p-6 bg-white">
                    <div className="border-l-4 border-blue-600/10 pl-6 space-y-3">
                      <div className="flex items-center gap-2 text-[7px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2">
                        <MessageSquare className="w-2.5 h-2.5" /> Technical Breakdown
                      </div>
                      <p className="text-slate-500 font-medium italic leading-relaxed text-xs md:text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </details>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support Redesign */}
        <div className="mt-20">
          <Card className="max-w-4xl mx-auto rounded-[3.5rem] bg-slate-900 text-white overflow-hidden shadow-3xl shadow-slate-900/20 group relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

            <CardContent className="p-10 md:p-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
              <div className="space-y-6 max-w-lg">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-[0.2em] text-blue-400">
                  <Globe className="w-3 h-3" /> 24/7 SUPPORT NODES
                </div>
                <h3 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase leading-[0.9]">
                  Still have <span className="text-blue-600">Questions?</span>
                </h3>
                <p className="text-slate-400 font-medium italic text-base leading-relaxed">
                  Our professional support squad is ready to assist with any technical blockers or platform requests.
                </p>
              </div>

              <Button asChild className="h-20 px-12 rounded-[2.5rem] bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-600/40 transition-all active:scale-95 group/btn shrink-0">
                <Link href="/contact" className="flex items-center gap-6">
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Connect Node</span>
                    <span className="text-sm font-black uppercase tracking-widest">Contact Support</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover/btn:rotate-12 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
