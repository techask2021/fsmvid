import Image from "next/image"
import type React from "react"

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  size?: number
}

export function YoutubeIcon({ className, size = 24, ...props }: IconProps) {
  return (
    <div className={className} {...props}>
      <Image 
        src="/icons/youtube.svg" 
        alt="YouTube" 
        width={size} 
        height={size} 
        className="w-full h-full" 
        loading="lazy"
        sizes={`${size}px`}
      />
    </div>
  )
}

export function TiktokIcon({ className, size = 24, ...props }: IconProps) {
  return (
    <div className={className} {...props}>
      <Image 
        src="/icons/tiktok.svg" 
        alt="TikTok" 
        width={size} 
        height={size} 
        className="w-full h-full" 
        loading="lazy"
        sizes={`${size}px`}
      />
    </div>
  )
}

export function FacebookIcon({ className, size = 24, ...props }: IconProps) {
  return (
    <div className={className} {...props}>
      <Image 
        src="/icons/facebook.svg" 
        alt="Facebook" 
        width={size} 
        height={size} 
        className="w-full h-full" 
        loading="lazy"
        sizes={`${size}px`}
      />
    </div>
  )
}

export function TwitterIcon({ className, size = 24, ...props }: IconProps) {
  return (
    <div className={className} {...props}>
      <Image 
        src="/icons/twitter.svg" 
        alt="Twitter" 
        width={size} 
        height={size} 
        className="w-full h-full" 
        loading="lazy"
        sizes={`${size}px`}
      />
    </div>
  )
}

export function InstagramIcon({ className, size = 24, ...props }: IconProps) {
  return (
    <div className={className} {...props}>
      <Image 
        src="/icons/instagram.svg" 
        alt="Instagram" 
        width={size} 
        height={size} 
        className="w-full h-full" 
        loading="lazy"
        sizes={`${size}px`}
      />
    </div>
  )
}

export function DailymotionIcon({ className, size = 24, ...props }: IconProps) {
  return (
    <div className={className} {...props}>
      <Image 
        src="/icons/dailymotion.svg" 
        alt="Dailymotion" 
        width={size} 
        height={size} 
        className="w-full h-full" 
        loading="lazy"
        sizes={`${size}px`}
      />
    </div>
  )
}

export function TelegramIcon({ className, size = 24, ...props }: IconProps) {
  return (
    <div className={className} {...props}>
      <Image 
        src="/icons/telegram.svg" 
        alt="Telegram" 
        width={size} 
        height={size} 
        className="w-full h-full" 
        loading="lazy"
        sizes={`${size}px`}
      />
    </div>
  )
}

export function TumblrIcon({ className, size = 24, ...props }: IconProps) {
  return (
    <div className={className} {...props}>
      <Image 
        src="/icons/tumblr.svg" 
        alt="Tumblr" 
        width={size} 
        height={size} 
        className="w-full h-full" 
        loading="lazy"
        sizes={`${size}px`}
      />
    </div>
  )
}

export function SnapchatIcon({ className, size = 24, ...props }: IconProps) {
  return (
    <div className={className} {...props}>
      <Image 
        src="/icons/snapchat.svg" 
        alt="Snapchat" 
        width={size} 
        height={size} 
        className="w-full h-full" 
        loading="lazy"
        sizes={`${size}px`}
      />
    </div>
  )
}

export function PinterestIcon({ className, size = 24, ...props }: IconProps) {
  return (
    <div className={className} {...props}>
      <Image 
        src="/icons/pinterest.svg" 
        alt="Pinterest" 
        width={size} 
        height={size} 
        className="w-full h-full" 
        loading="lazy"
        sizes={`${size}px`}
      />
    </div>
  )
}

export function LinkedinIcon({ className, size = 24, ...props }: IconProps) {
  return (
    <div className={className} {...props}>
      <Image 
        src="/icons/linkedin.svg" 
        alt="LinkedIn" 
        width={size} 
        height={size} 
        className="w-full h-full" 
        loading="lazy"
        sizes={`${size}px`}
      />
    </div>
  )
}

export function ImgurIcon({ className, size = 24, ...props }: IconProps) {
  return (
    <div className={className} {...props}>
      <Image 
        src="/icons/imgur.svg" 
        alt="Imgur" 
        width={size} 
        height={size} 
        className="w-full h-full" 
        loading="lazy"
        sizes={`${size}px`}
      />
    </div>
  )
}

export function RumbleIcon({ className, size = 24, ...props }: IconProps) {
  return (
    <div className={className} {...props}>
      <Image 
        src="/icons/rumble.svg" 
        alt="Rumble" 
        width={size} 
        height={size} 
        className="w-full h-full" 
        loading="lazy"
        sizes={`${size}px`}
      />
    </div>
  )
}
