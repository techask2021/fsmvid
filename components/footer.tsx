import Link from "next/link"
import { Download } from "lucide-react"

export default function Footer() {
  const footerSections = [
    {
      title: "Popular Platforms",
      links: [
        { name: "YouTube Downloader", href: "/youtube-video-saver" }, // Adjusted to likely match existing paths
        { name: "TikTok Downloader", href: "/tiktok-video-saver" }, // Adjusted
        { name: "Instagram Downloader", href: "/instagram-media-saver" }, // Adjusted
        { name: "Facebook Downloader", href: "/facebook-media-grabber" }, // Adjusted
        { name: "Twitter Downloader", href: "/twitter-video-saver" }, // Adjusted
      ],
    },
    {
      title: "More Platforms",
      links: [
        { name: "Pinterest Downloader", href: "/pinterest-media-saver" }, // Adjusted
        { name: "LinkedIn Downloader", href: "/linkedin-content-saver" }, // Adjusted
        { name: "Snapchat Downloader", href: "/snapchat-story-saver" }, // Adjusted
        { name: "Reddit Downloader", href: "/reddit-video-saver" }, // Adjusted
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "FAQ", href: "/faq" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" }, // Adjusted
        { name: "Terms of Service", href: "/terms-of-service" }, // Adjusted
        { name: "DMCA", href: "/copyright-claims" }, // Adjusted (DMCA often relates to copyright)
        { name: "Cookie Policy", href: "/privacy-policy#cookies" }, // Assuming cookies are part of privacy policy
      ],
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Download className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold">FSMVID</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              The fastest and most reliable free social media video downloader. Download videos from 20+ platforms
              instantly.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white mb-4 text-sm">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 FSMVID. All rights reserved.</p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">Made for content creators worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
