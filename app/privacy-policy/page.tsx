import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privacy Policy | FSMVID | Free Social Media Video Downloader",
  description: "Learn about our privacy practices and how we handle your information at FSMVID.",
}

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Privacy Policy</h1>
      <p className="text-center text-muted-foreground mb-8">Last updated: {currentDate}</p>
      
      <Card className="mb-8">
        <CardContent className="prose prose-lg max-w-none p-6">
          <h2 className="text-2xl font-bold mt-4 mb-4">Summary</h2>
          <p>
            You may use Fsmvid anonymously and without providing any personal information at all, but like most websites we 
            collect non personally identifying information that are made available by web browsers and web servers and this 
            information is only used to better understand how visitors use our website.
          </p>
          <p>
            We also collect potentially personally identifying information like your IP address (the Internet address of 
            your computer) for the purpose of limiting the usage of our services to prevent abuse and keep our services 
            available to everyone.
          </p>
          <p>
            We don't store any personal information on our servers unless required for the operation of our services and 
            it's usually for a limited time only, we also don't share your personal information with anyone.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Automatically Collected Information</h2>
          <p>
            Some of the information that is collected on Fsmvid and used by the third party services that we use:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Date and time of each request</li>
            <li>Referring site</li>
            <li>Language preference</li>
          </ul>
          <p>
            This information is stored temporarly in log files on our servers for a short period of time for the purpose 
            of providing our services.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Cookies</h2>
          <p>
            Cookies are text files stored on your computer, we use cookies which help us provide you with a good experience, 
            improve our service, and personalize ads and content that may be delivered to you while you use the website, 
            we also use third party services that make use of cookies to collect traffic data and provide advertising services.
          </p>
          <p>
            We collect anonymous usage information on the website visitors through the use of Google Analytics which may 
            use tracking cookies to gather anonymous browser, operating system, geographic, and web site navigation 
            information, to opt out of Google Analytics Install Google Analytics Opt-out Browser Add-on.
          </p>
          <p>
            We provide advertisements through PropellerAds, which uses cookies to deliver relevant advertisements, 
            PropellerAds cookies do not collect personally identifiable information, you can check out the privacy policy 
            page for more info, and you can opt-out using this opt-out page.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Links</h2>
          <p>
            This website may contain links to other sites, please be aware that we are not responsible for the contents 
            or privacy of such websites, you are encouraged to read the privacy policies of any other site that collects 
            personally identifiable information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Privacy Policy Changes</h2>
          <p>
            Fsmvid may change its privacy policy when necessary, a notification will be posted clearly on the homepage 
            for any major changes, the date of the last update will be shown on the top of the page. Your continued use 
            of this site after any change in this privacy policy will constitute your acceptance of such change.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
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
