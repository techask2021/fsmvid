"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  title: string
  description: string
  primaryAction?: {
    text: string
    href: string
    onClick?: () => void
  }
  secondaryAction?: {
    text: string
    href: string
  }
  image?: string
  pattern?: "dots" | "grid" | "waves" | "none"
}

export function HeroSection({
  title,
  description,
  primaryAction,
  secondaryAction,
  image = "/placeholder.svg?height=400&width=800",
  pattern = "dots",
}: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-background w-full -mt-1">
      {/* Background Pattern */}
      {pattern === "dots" && (
        <div className="absolute inset-0 z-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          ></div>
        </div>
      )}
      {pattern === "grid" && (
        <div className="absolute inset-0 z-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(#000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      )}
      {pattern === "waves" && (
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      )}

      <div className="mx-auto py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 container">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
            <p className="mt-4 max-w-3xl text-lg">{description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryAction && (
                <Button size="lg" asChild>
                  <Link href={primaryAction.href} onClick={primaryAction.onClick}>
                    {primaryAction.text} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              {secondaryAction && (
                <Button variant="outline" size="lg" asChild>
                  <Link href={secondaryAction.href}>{secondaryAction.text}</Link>
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="overflow-hidden rounded-lg shadow-xl">
              <img
                src={image || "/placeholder.svg"}
                alt="Hero image"
                className="h-auto w-full object-cover"
                width={800}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
