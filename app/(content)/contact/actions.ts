"use server"

import { z } from "zod"
import { Resend } from "resend"

export interface FormState {
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    subject?: string[]
    message?: string[]
    _form?: string[]
  }
}

const schema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  message: z.string().min(1, { message: "Message is required." }),
  token: z.string(),
})

export async function sendEmail(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    token: formData.get("g-recaptcha-response"),
  })

  if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, subject, message, token } = validatedFields.data

  const recaptchaResponse = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    }
  )

  const recaptchaData = await recaptchaResponse.json()

  if (!recaptchaData.success) {
    return {
      message: "reCAPTCHA verification failed.",
      errors: {
        _form: ["reCAPTCHA verification failed. Please try again."],
      },
    }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: "support@fsmvid.com",
      replyTo: email,
      to: "amtrip2020@gmail.com",
      subject: `Contact Form: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })
    return { message: "Email sent successfully!" }
  } catch (error) {
    return {
      message: "Failed to send email.",
      errors: {
        _form: [error instanceof Error ? error.message : "Unknown error"],
      },
    }
  }
}
