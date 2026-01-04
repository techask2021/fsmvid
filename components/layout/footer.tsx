import Link from "next/link"
import { Download, Globe, Heart } from "lucide-react"

export default function Footer() {
  const footerSections = [
    {
      title: "Popular Platforms",
      links: [
        { name: "YouTube Downloader", href: "/youtube-video-saver" },
        { name: "TikTok Downloader", href: "/tiktok-video-saver" },
        { name: "Instagram Downloader", href: "/instagram-media-saver" },
        { name: "Facebook Downloader", href: "/facebook-media-grabber" },
        { name: "Twitter Downloader", href: "/twitter-video-saver" },
      ],
    },
    {
      title: "More Platforms",
      links: [
        { name: "Pinterest Downloader", href: "/pinterest-media-saver" },
        { name: "LinkedIn Downloader", href: "/linkedin-content-saver" },
        { name: "Snapchat Downloader", href: "/snapchat-story-saver" },
        { name: "Reddit Downloader", href: "/reddit-video-saver" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "FAQ", href: "/faq" },
        { name: "Contact", href: "/contact" },
        { name: "Bulk Download", href: "/bulk-download" },
      ],
    },
    {
      title: "Account",
      links: [
        { name: "Login", href: "/login" },
        { name: "Sign Up", href: "/signup" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms-of-service" },
        { name: "DMCA", href: "/copyright-claims" },
        { name: "Refund Policy", href: "/refund-policy" },
      ],
    },
  ]

  return (
    <footer className="bg-[#050b1a] py-20 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2" />

      <div className="container px-6 mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform duration-500">
                <Download className="h-6 w-6" />
              </div>
              <span className="text-2xl font-black italic tracking-tighter uppercase text-white">FSMVID</span>
            </Link>
            <p className="text-slate-400 font-medium text-xs leading-relaxed italic border-l-2 border-white/10 pl-6">
              The fastest and most reliable free social media video downloader. Download videos from 30+ platforms instantly with our cloud-native engine.
            </p>
            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-blue-400 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/5">
              <Globe className="w-3.5 h-3.5" /> Free Social Media Video Downloader
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 border-b border-white/5 pb-3 italic">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-slate-400 hover:text-blue-500 transition-all text-xs font-bold hover:translate-x-2 inline-block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/30">
            <span>© 2026 FSMVID - All Rights Reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Terms</Link>
            <Link href="/refund-policy" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
