"use client"

import ReCAPTCHA from "react-google-recaptcha"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface RecaptchaButtonProps {
  formAction: (formData: FormData) => void
  formRef: React.RefObject<HTMLFormElement | null>
}

export function RecaptchaButton({ formAction, formRef }: RecaptchaButtonProps) {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!formRef.current) return

    setLoading(true)
    const formData = new FormData(formRef.current)
    const token = await recaptchaRef.current?.executeAsync()
    if (token) {
      formData.set("g-recaptcha-response", token)
      formAction(formData)
    }
    setLoading(false)
  }

  return (
    <>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      />
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md flex items-center justify-center gap-2"
      >
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </>
  )
}
