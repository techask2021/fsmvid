import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Copyright Claims | FSMVID | Free Social Media Video Downloader",
  description: "Learn about our copyright policies and how to report copyright infringement at FSMVID.",
}

export default function CopyrightClaimsPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Copyright Claims</h1>
      <p className="text-center text-muted-foreground mb-8">Last updated: {currentDate}</p>
      
      <Card className="mb-8">
        <CardContent className="prose prose-lg max-w-none p-6">
          <p className="mb-4">
            We respect the intellectual property rights of others.
            Copyright infringement is against our terms of service.
          </p>
          
          <p className="mb-4">
            Users of this website are not allowed to download or convert any copyrighted material.
          </p>
          
          <p className="mb-6">
            We may in our sole discretion remove any content we have reason to believe violates any of the intellectual property rights of others.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">DMCA Compliance</h2>
          <p className="mb-4">
            We are not subject to United States law, but we voluntarily comply with the Digital Millennium Copyright Act (DMCA). 
            Pursuant to Title 17, Section 512(c)(2) of the United States Code.
          </p>
          
          <p className="mb-4">
            If you believe that any of your copyrighted material is being infringed on this website, a notifications should be sent by email to 
            <a href="mailto:support@fsmvid.com" className="text-blue-600 hover:underline"> support@fsmvid.com</a>, 
            make sure that the supposed infringement is not covered by laws such as Fair Use or free speech.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Reporting Copyright Infringement</h2>
          <p className="mb-4">To be effective, the notification must be a written communication that includes the following:</p>
          
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              A physical or electronic signature of the person that owns the copyright or a person authorized to act on behalf of the owner.
            </li>
            <li>
              Identification of the copyrighted work claimed to have been infringed, please describe the work and include a location (URL) where possible.
            </li>
            <li>
              Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information sufficient to permit us to locate the material.
            </li>
            <li>
              The address, telephone number, and email address where you can be contacted.
            </li>
            <li>
              A statement that the complaining party has a good-faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
            </li>
            <li>
              A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
            </li>
          </ol>
          
          <p className="mt-4 mb-6">
            All notifications not relevant to us or ineffective under the law will receive no response or action.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about our Copyright Claims Policy, please contact us at:
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
