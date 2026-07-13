import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { Resend } from "resend"
import { contactSchema } from "@/lib/validations"
import { contactLimiter, getClientIp } from "@/lib/rate-limit"
import {
  contactNotificationEmail,
  contactConfirmationEmail,
} from "@/lib/email-templates"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM_ADDRESS = process.env.EMAIL_FROM || "Mimaar Associates <onboarding@resend.dev>"
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "mimaarassociates@gmail.com"

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = getClientIp(req)
    const { success: withinLimit } = await contactLimiter.check(5, ip)

    if (!withinLimit) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    // Parse and validate
    const body = await req.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = result.data

    // Save to database
    const submission = await db.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        service: data.service || null,
        message: data.message,
      },
    })

    // Send notification email to admin
    if (resend) {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: ADMIN_EMAIL,
        subject: `New Contact Form Submission from ${data.name}`,
        html: contactNotificationEmail({
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service,
          message: data.message,
        }),
      })

      // Send confirmation email to user
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: data.email,
        subject: "Thank you for contacting Mimaar Associates",
        html: contactConfirmationEmail({ name: data.name }),
      })
    }

    return NextResponse.json(
      { success: true, id: submission.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("[CONTACT_POST]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
