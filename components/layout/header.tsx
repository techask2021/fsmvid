"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Menu, Sun, Moon, ChevronDown } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet" // Added SheetClose, SheetDescription
import { useState, useEffect } from "react"
import { ModeToggle } from "@/components/shared/mode-toggle"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

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
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact"}
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 transition-all duration-500 ${
        isScrolled ? "border-b border-gray-200 dark:border-gray-700 shadow-lg" : "border-b border-gray-100 dark:border-gray-800 shadow-sm"
      }`}
    >
      <div className="container flex h-20 items-center justify-between px-6">
        {/* Enhanced Logo */}
        <Link href="/" className="flex items-center space-x-4 group">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
              <Download className="h-6 w-6 group-hover:animate-pulse" />
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            {/* Floating particles */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 dark:from-gray-100 dark:via-blue-300 dark:to-indigo-400 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 dark:group-hover:from-blue-400 dark:group-hover:to-indigo-400 transition-all duration-300">
              FSMVID
            </span>
            <span className="hidden text-xs text-gray-500 dark:text-gray-400 sm:block font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              Free Social Media Video Downloader
            </span>
          </div>
        </Link>

        {/* Enhanced Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className="flex items-center px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 relative group"
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300" />
                )}
                {/* Hover underline effect */}
                <span className="absolute inset-x-2 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
              </Link>

              {/* Dropdown Menu */}
              {item.hasDropdown && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Enhanced Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <div className="hidden sm:flex">
            <ModeToggle />
          </div>

          {/* Enhanced Mobile Menu - Only render on client to prevent hydration errors */}
          {isMounted && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-11 w-11 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:scale-105"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 p-0"> {/* Remove default padding to use SheetHeader correctly */}
                <SheetHeader className="p-6 pb-0"> {/* Added SheetHeader for proper structure */}
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle> {/* Visually hidden title */}
                  <SheetDescription className="sr-only">A list of navigation links and actions.</SheetDescription> {/* Visually hidden description */}
                </SheetHeader>
                {/* Mobile Menu Header (visual part) - adjust spacing if needed after adding SheetHeader */}
                <div className="p-6 flex items-center space-x-3 mb-2 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white shadow-lg">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">FSMVID</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Free Video Downloader</p>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-2 px-6"> {/* Add padding if removed from SheetContent */}
                  {navItems.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
                      >
                        {item.name}
                        {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                      </Link>

                      {/* Mobile Dropdown Items */}
                      {item.hasDropdown && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Mobile CTA Section */}
                <div className="mt-8 p-6 pt-6 border-t border-gray-200 dark:border-gray-700"> {/* Add padding if removed from SheetContent */}
                  <SheetClose asChild>
                    <Link href="/#downloader" passHref>
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-900 text-white py-3 rounded-xl shadow-lg hover:shadow-xl font-semibold transition-all duration-300 group"
                      >
                        <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                        Start Downloading
                      </Button>
                    </Link>
                  </SheetClose>

                  {/* Mobile Theme Toggle */}
                  {/* Using ModeToggle here as well, though it's a dropdown. 
                      The original was a simple button. This might need further UI adjustment 
                      if the dropdown isn't desired in the mobile sheet.
                      For now, let's make it functional.
                  */}
                  <div className="w-full mt-3">
                    <ModeToggle />
                  </div>
                </div>

                {/* Mobile Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 FSMVID. All rights reserved.</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Made for content creators worldwide</p>
                </div>
              </SheetContent>
            </Sheet>
          )}
          {/* Fallback button for SSR - matches the Sheet trigger button */}
          {!isMounted && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-11 w-11 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:scale-105"
              disabled
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
        </div>
      </div>

      {/* Progress bar for scroll */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ${
          isScrolled ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      ></div>
    </header>
  )
}
