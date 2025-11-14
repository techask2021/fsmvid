import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
import Link from "next/link";

const faqItemBackgrounds = [
  "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/70 dark:to-blue-800/70",
  "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/70 dark:to-green-800/70",
  "bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/70 dark:to-purple-800/70",
  "bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/70 dark:to-pink-800/70",
  "bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-900/70 dark:to-cyan-800/70",
  "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/70 dark:to-amber-800/70",
];

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
      question: "Is the tool safe to use?",
      answer:
        "Yes. FSMVID is a web-based tool that doesn't require installing any software on your device. That's inherently safer than desktop video download software that could contain malware or unwanted programs. We don't collect your personal data, we don't track what you download, and we don't sell your information. The video download process is secure, and download links expire quickly for privacy reasons.",
    },
    {
      question: "Is it legal to download FB videos?",
      answer:
        "The legal answer is: it depends on what you do with them. Downloading Facebook videos for personal viewing is generally fine. Downloading a funny video your friend shared to watch offline? That's not going to get you in trouble. What's NOT legal: downloading someone else's Facebook video and reposting it as your own content. That's copyright infringement, plain and simple. The same goes for using downloaded videos commercially without permission. The creator owns the copyright regardless of whether you can technically download the file. If you're downloading for business purposes, marketing campaigns, or public use, get permission from the creator first.",
    },
  ];

  return (
    <div className="w-full"> {/* Changed from section and removed padding/background */}
      <div className="container px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-700 px-4 py-1 text-xs font-semibold">
            <HelpCircle className="w-3 h-3 mr-2" /> {/* Icon should inherit text color */}
            Help Center
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our video downloader service.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${faqItemBackgrounds[index % faqItemBackgrounds.length]} rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/50 dark:border-slate-700/50`}
              >
                <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base pr-4">{faq.question}</h3>
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-50 dark:bg-gray-700 rounded-full flex items-center justify-center group-open:bg-blue-600 dark:group-open:bg-blue-500 transition-colors duration-200">
                        <svg
                          className="w-3 h-3 text-blue-600 dark:text-blue-300 group-open:text-white dark:group-open:text-gray-100 group-open:rotate-45 transition-all duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-100 dark:border-slate-700 pt-4">
                      <p className="text-gray-900 dark:text-gray-300 leading-relaxed text-sm">{faq.answer}</p>
                    </div>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 shadow-sm">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Still Have Questions?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Our support team is here to help! Contact us if you need assistance or have suggestions for new features.
              </p>
            <div className="flex justify-center"> {/* Simplified to ensure centering of one item */}
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-400 text-white h-12 px-8 rounded-2xl shadow-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
              >
                Contact Support
              </Link>
              {/* "Request Feature" Badge removed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
