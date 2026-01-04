"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Download,
  Menu,
  Sun,
  Moon,
  ChevronDown,
  ShieldAlert,
  LogOut,
  User as UserIcon,
  Zap,
  LayoutDashboard,
  Flame,
  ExternalLink,
  CreditCard,
  Settings,
  UserCircle
} from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { ModeToggle } from "@/components/shared/mode-toggle"
import { useAuth } from "@/components/auth/auth-provider"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { user, login, logout } = useAuth();

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Platforms",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "YouTube", href: "/youtube-video-saver" },
        { name: "TikTok", href: "/tiktok-video-saver" },
        { name: "Instagram", href: "/instagram-media-saver" },
        { name: "Facebook", href: "/facebook-media-grabber" },
        { name: "Twitter", href: "/twitter-video-saver" },
        { name: "Pinterest", href: "/pinterest-media-saver" },
      ],
    },
    { name: "Bulk Download", href: "/bulk-download", icon: Zap },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 pointer-events-none">
      <div className="container mx-auto max-w-7xl px-4 py-4 sm:py-6">
        <div className={`transition-all duration-700 pointer-events-auto flex items-center justify-between px-4 sm:px-6 ${isScrolled
          ? "bg-white/80 dark:bg-slate-950/90 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 rounded-[2rem] shadow-2xl py-2 scale-[0.97] mt-1"
          : "bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-[2.5rem] py-4 shadow-xl"
          }`}>
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-4 group shrink-0 relative">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-xl group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Download className="h-6 w-6 group-hover:animate-bounce" />
              </div>
              <div className="absolute -inset-2 bg-blue-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent tracking-tighter group-hover:tracking-normal transition-all duration-300 italic uppercase">
                FSMVID
              </span>
              <div className="hidden sm:flex items-center gap-1.5 overflow-hidden h-4">
                <span className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] animate-in slide-in-from-left-4 duration-500">
                  Premium
                </span>
                <div className="h-1 w-1 bg-slate-300 rounded-full" />
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] group-hover:text-blue-400 transition-colors">
                  Edge
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center bg-slate-100/50 dark:bg-white/5 p-1.5 rounded-[1.5rem] border border-slate-200/30 dark:border-white/5 shadow-inner">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all duration-300 rounded-[1.2rem] text-slate-500 hover:text-blue-600 hover:bg-white dark:hover:bg-white/10 dark:text-slate-400 shadow-sm hover:shadow-md`}
                >
                  {item.icon && <item.icon className="w-3.5 h-3.5 mr-2 opacity-70" />}
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-1 opacity-50 group-hover:rotate-180 transition-transform" />}
                </Link>

                {item.hasDropdown && (
                  <div className="absolute top-full left-0 mt-4 w-64 bg-white/90 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 p-3 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full" />
                    {item.dropdownItems?.map((drop) => (
                      <Link
                        key={drop.name}
                        href={drop.href}
                        className="flex items-center justify-between px-5 py-4 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white rounded-2xl transition-all group/item"
                      >
                        {drop.name}
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center bg-slate-100/50 dark:bg-white/5 p-1 rounded-2xl border border-slate-200/30">
              <ModeToggle />
            </div>

            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 hidden lg:block" />

            {/* Auth System */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="relative group/account">
                  <Button
                    variant="ghost"
                    className="h-9 px-2 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200/30 hover:bg-white dark:hover:bg-white/10 transition-all flex items-center gap-3 overflow-hidden shadow-sm"
                  >
                    <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                      {user.email[0].toUpperCase()}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 hidden md:block">{user.role}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400 group-hover/account:rotate-180 transition-transform hidden sm:block" />
                  </Button>

                  {/* Account Dropdown */}
                  <div className="absolute top-full right-0 mt-3 w-64 bg-white/90 dark:bg-slate-950/95 backdrop-blur-2xl rounded-[2.5rem] shadow-3xl border border-slate-100 dark:border-slate-800 opacity-0 invisible group-hover/account:opacity-100 group-hover/account:visible transition-all duration-500 transform translate-y-4 group-hover/account:translate-y-0 p-3 z-50 overflow-hidden">
                    <div className="p-5 border-b dark:border-slate-800 mb-2 bg-slate-50/50 dark:bg-white/5 rounded-t-[1.5rem]">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1.5">Network Identity</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.email}</p>
                    </div>
                    <div className="space-y-1">
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white rounded-xl transition-all">
                        <LayoutDashboard className="w-4 h-4" /> Operational Hub
                      </Link>
                      <Link href="/dashboard?tab=subscription" className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-amber-500 hover:text-white rounded-xl transition-all">
                        <CreditCard className="w-4 h-4" /> Financial Hub
                      </Link>
                      <Link href="/dashboard?tab=settings" className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 rounded-xl transition-all">
                        <Settings className="w-4 h-4" /> System Settings
                      </Link>
                      {user.role === 'admin' && (
                        <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-xl transition-all border-t dark:border-slate-800 mt-1 pt-2">
                          <ShieldAlert className="w-4 h-4" /> Admin Terminal
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all text-left mt-1"
                      >
                        <LogOut className="w-4 h-4" /> Terminate Sync
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  asChild
                  className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-full h-9 px-5 font-black text-[8px] uppercase tracking-[0.2em] shadow-lg hover:shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all group relative overflow-hidden"
                >
                  <Link href="/login">
                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative flex items-center transition-colors">
                      <UserCircle className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Login / Signup</span>
                    </span>
                  </Link>
                </Button>
              )}

              {/* Mobile Menu Trigger */}
              {isMounted && (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm active:scale-90 transition-transform">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[380px] p-0 border-l-0 bg-white dark:bg-slate-950">
                    <div className="p-10 border-b dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full" />
                      <h2 className="text-3xl font-black tracking-tighter italic text-slate-900 dark:text-white">FSMVID <span className="text-blue-600">HUB</span></h2>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Mobile Interface v1.08</p>
                    </div>
                    <nav className="p-6 space-y-3">
                      {navItems.map(item => (
                        <Link key={item.name} href={item.href} className={`flex items-center justify-between p-5 text-xs font-black uppercase tracking-[0.2em] rounded-3xl transition-all bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-white/10 hover:shadow-lg border border-transparent hover:border-slate-100 dark:hover:border-white/5`}>
                          <span className="flex items-center">
                            {item.icon && <item.icon className="w-4 h-4 mr-4 opacity-50" />}
                            {item.name}
                          </span>
                          <ChevronDown className="w-4 h-4 -rotate-90 opacity-20" />
                        </Link>
                      ))}
                      {user && (
                        <>
                          <Link href="/dashboard" className="flex items-center justify-between p-5 text-xs font-black uppercase tracking-[0.2em] rounded-3xl transition-all bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                            <span className="flex items-center">
                              <LayoutDashboard className="w-4 h-4 mr-4" /> Dashboard
                            </span>
                          </Link>
                          {user.role === 'admin' && (
                            <Link href="/admin" className="flex items-center justify-between p-5 text-xs font-black uppercase tracking-[0.2em] rounded-3xl transition-all bg-indigo-50/50 dark:bg-indigo-900/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
                              <span className="flex items-center">
                                <ShieldAlert className="w-4 h-4 mr-4" /> Admin Terminal
                              </span>
                            </Link>
                          )}
                        </>
                      )}
                    </nav>
                    <div className="absolute bottom-0 left-0 w-full p-10 space-y-4 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950">
                      {!user && (
                        <Button asChild className="w-full h-14 rounded-3xl font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900">
                          <Link href="/login">Establish Session</Link>
                        </Button>
                      )}
                      {user && (
                        <Button variant="outline" className="w-full h-14 rounded-3xl font-black uppercase text-[10px] tracking-[0.3em] border-red-200 text-red-600 hover:bg-red-50" onClick={logout}>Terminate Sync</Button>
                      )}
                      <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-widest">© 2024 Node-One Network</p>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
