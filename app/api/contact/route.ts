import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { name, email, subject, message, recaptchaToken } = await request.json()

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        // Verify reCAPTCHA
        if (!recaptchaToken) {
            return NextResponse.json(
                { error: 'reCAPTCHA verification required' },
                { status: 400 }
            )
        }

        const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
        if (!recaptchaSecret) {
            console.error('[Contact] reCAPTCHA secret key not configured')
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            )
        }

        // Verify reCAPTCHA token with Google
        const recaptchaResponse = await fetch(
            'https://www.google.com/recaptcha/api/siteverify',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
            }
        )

        const recaptchaData = await recaptchaResponse.json()

        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            console.error('[Contact] reCAPTCHA verification failed:', recaptchaData)
            return NextResponse.json(
                { error: 'reCAPTCHA verification failed. Please try again.' },
                { status: 400 }
            )
        }

        // Here you would typically send an email or save to database
        // For now, we'll just log it
        console.log('[Contact] New message received:', {
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString(),
            recaptchaScore: recaptchaData.score
        })

        // TODO: Implement email sending logic here
        // Example using Resend, SendGrid, or similar service

        return NextResponse.json(
            {
                success: true,
                message: 'Message sent successfully! We will respond within 24 hours.'
            },
            { status: 200 }
        )

    } catch (error: any) {
        console.error('[Contact] Error processing contact form:', error)
        return NextResponse.json(
            { error: 'Failed to send message. Please try again later.' },
            { status: 500 }
        )
    }
}
