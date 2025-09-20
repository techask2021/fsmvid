import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Clock, MapPin } from "lucide-react"
import ContactForm from "./contact-form"

export const metadata: Metadata = {
  title: "Contact Us | FSMVID | Free Social Media Video Downloader",
  description: "Get in touch with the FSMVID team. We're here to help with any questions, suggestions, or concerns you may have.",
}

export default function ContactPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Left Column - Contact Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          <p className="text-muted-foreground mb-8">
            Have a question, suggestion, or concern? We're here to help! Fill
            out the form and our team will get back to you as soon as
            possible.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email Us</h3>
                <p className="text-muted-foreground">support@fsmvid.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Support Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 9AM - 5PM EST</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Location</h3>
                <p className="text-muted-foreground">Our service is available worldwide</p>
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Copyright Claims</h3>
            <p className="mb-4">
              For copyright concerns or infringement notices, please visit
              our dedicated Copyright Claims page or contact:
            </p>
            <a href="mailto:support@fsmvid.com" className="text-blue-600 hover:underline">
              support@fsmvid.com
            </a>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div>
          <ContactForm />
          <p className="text-sm text-center mt-4 text-gray-500">
            By submitting this form, you agree to our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            and consent to us processing your information.
          </p>
        </div>
      </div>
    </div>
  )
} 
