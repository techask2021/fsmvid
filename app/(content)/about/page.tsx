import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About Us | FSMVID - Free Social Media Video Downloader",
  description: "Learn about our mission, who we are, and what we offer at FSMVID - your trusted social media content downloader.",
}

export default function AboutPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">About FSMVID</h1>
      
      <Card className="mb-8">
        <CardContent className="prose prose-lg max-w-none p-6">
          <h2 className="text-2xl font-bold mt-4 mb-4">Our Mission</h2>
          <p>
            At Fsmvid, we are dedicated to making it easy for you to save and enjoy your favorite social media content. 
            Our mission is to offer a fast, secure, and hassle-free tool that allows you to download videos, images, 
            and audio from various platforms for personal use. We aim to simplify your digital experience while 
            respecting your privacy and security.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Who We Are</h2>
          <p>
            We are a passionate team of developers, designers, and tech enthusiasts who share a common goal: to create 
            tools that enhance your online experience. With expertise in web development, cybersecurity, and user 
            experience, we built Fsmvid to address the growing need for a reliable way to save social media content offline.
          </p>
          <p>
            Our commitment is to provide a service that is not only efficient but also transparent and respectful of 
            your privacy. We believe in delivering value without compromising on quality or integrity.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Support for popular platforms like YouTube, Instagram, TikTok, Facebook, and Twitter</li>
            <li>High-quality downloads with multiple format options</li>
            <li>An intuitive, user-friendly interface that requires no technical skills</li>
            <li>No need for registration or account creation</li>
            <li>Fast and reliable download speeds</li>
            <li>A privacy-first approach—we don't track or store your download history</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Core Values</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">Simplicity</h3>
          <p>
            We believe in keeping things simple. Our tool is designed to be easy to use, ensuring that anyone can 
            download content without any hassle.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Privacy</h3>
          <p>
            Your privacy is our priority. We don't collect unnecessary data, and we ensure your downloads remain 
            private and secure.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Quality</h3>
          <p>
            We strive to deliver high-quality downloads and a dependable service that you can trust every time you use it.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Respect</h3>
          <p>
            We respect copyright laws and intellectual property rights. Our service is intended for personal use, 
            and we encourage users to follow fair use principles.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Legal Compliance</h2>
          <p>
            Fsmvid is designed to help users download content for personal use only. We do not host or store any 
            content on our servers. We are committed to complying with all applicable laws and regulations, including 
            copyright and intellectual property rights.
          </p>
          <p>
            If you have any questions about our service or need to report content that may violate copyright, please 
            visit our Copyright Claims page or contact us directly.
          </p>
        </CardContent>
      </Card>

      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
        <p className="text-muted-foreground mb-6">
          If you'd like to know more about our service or have any questions, feel free to reach out to us.
        </p>
        <div className="flex justify-center">
          <Link href="/contact" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
} 
