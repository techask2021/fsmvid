import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terms of Service | FSMVID | Free Social Media Video Downloader",
  description: "Read the terms and conditions governing the use of FSMVID's services.",
}

export default function TermsOfServicePage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Terms of Service</h1>
      <p className="text-center text-muted-foreground mb-8">Last updated: {currentDate}</p>
      
      <Card className="mb-8">
        <CardContent className="prose prose-lg max-w-none p-6">
          <p className="mb-6 font-semibold">
            Your continued use of this website constitutes your acceptance of these terms of service.
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-600 rounded-full"></span>
              <span>This website is intended for personal use only.</span>
            </li>
            
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-600 rounded-full"></span>
              <span>You may use our website as a recording service only and only as permitted by law.</span>
            </li>
            
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-600 rounded-full"></span>
              <span>You may not use our services to download or convert any copyrighted material.</span>
            </li>
            
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-600 rounded-full"></span>
              <span>Your are solely responsible for any misuse of these services and any copyright violations that may occur by using our website.</span>
            </li>
            
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-600 rounded-full"></span>
              <span>You are responsible for reading the terms of service of the websites you are downloading any media from, as you might be breaking their terms of service by using our services.</span>
            </li>
            
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-600 rounded-full"></span>
              <span>We are not to be held responsible for any misuse of the services provided on this website and any damages that might occur by using these services.</span>
            </li>
            
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-600 rounded-full"></span>
              <span>We reserve the right to amend these terms at any time.</span>
            </li>
            
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-600 rounded-full"></span>
              <span>Your continued use of this website constitutes your acceptance of these terms of service.</span>
            </li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:support@fsmvid.com" className="text-blue-600 hover:underline">support@fsmvid.com</a>
          </p>
          <p>
            Or visit our <Link href="/contact" className="text-blue-600 hover:underline">Contact Page</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 
