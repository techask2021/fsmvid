"use client"

import { useActionState, useEffect, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { sendEmail, FormState } from "./actions"
import { RecaptchaButton } from "@/components/forms/recaptcha"
import { trackLeadGeneration } from "@/components/shared/analytics"

const initialState: FormState = {
  message: "",
}

export default function ContactForm() {
  const { toast } = useToast()
  const [state, formAction] = useActionState(sendEmail, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: "Success!",
        description: state.message,
      })
      
      // Track lead generation events for business inquiries
      const formElement = formRef.current
      if (formElement) {
        const subjectField = formElement.querySelector('select[name="subject"]') as HTMLSelectElement
        const subject = subjectField?.value
        
        // Track generate_lead event for business-related contacts
        if (subject && ['guest-post', 'ad-placement', 'partnership'].includes(subject)) {
          trackLeadGeneration(subject, {
            form_location: 'contact_page',
            subject_name: subject === 'guest-post' ? 'Guest Post Inquiry' : 
                          subject === 'ad-placement' ? 'Ad Placement' : 
                          'Business Partnership'
          })
        }
      }
      
      formRef.current?.reset()
    } else if (state.message && state.errors) {
      toast({
        title: "Error!",
        description: state.message,
        variant: "destructive",
      })
    }
  }, [state, toast])

  return (
    <Card>
      <CardContent className="p-6">
        <form ref={formRef} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {state.errors?.name && (
              <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {state.errors?.email && (
              <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="subject" className="block mb-2 font-medium">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a subject</option>
              <option value="guest-post">🎯 Guest Post Inquiry</option>
              <option value="ad-placement">📢 Ad Placement</option>
              <option value="partnership">🤝 Business Partnership</option>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="feedback">Feedback</option>
              <option value="copyright">Copyright Issue</option>
              <option value="other">Other</option>
            </select>
            {state.errors?.subject && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.subject[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-medium">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="How can we help you?"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
            {state.errors?.message && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.message[0]}
              </p>
            )}
          </div>

          {state.errors?._form && (
            <p className="text-red-500 text-sm">{state.errors._form[0]}</p>
          )}

          <RecaptchaButton
            formAction={formAction}
            formRef={formRef}
          />
        </form>
      </CardContent>
    </Card>
  )
}
