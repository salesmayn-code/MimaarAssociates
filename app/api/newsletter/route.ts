import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { Resend } from "resend"
import { newsletterSchema } from "@/lib/validations"
import { newsletterLimiter, getClientIp } from "@/lib/rate-limit"
import { newsletterWelcomeEmail } from "@/lib/email-templates"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM_ADDRESS = process.env.EMAIL_FROM || "Mimaar Associates <onboarding@resend.dev>"

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = getClientIp(req)
    const { success: withinLimit } = await newsletterLimiter.check(3, ip)

    if (!withinLimit) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    // Parse and validate
    const body = await req.json()
    const result = newsletterSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { email } = result.data

    // Check if already subscribed
      const existing = await db.subscriber.findUnique({
      where: { email },
    })

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json(
          { success: true, message: "Already subscribed" },
          { status: 200 }
        )
      }

      // Reactivate inactive subscriber
      await db.subscriber.update({
        where: { email },
        data: { isActive: true },
      })

      // Send welcome email on reactivation
      if (resend) {
        await resend.emails.send({
          from: FROM_ADDRESS,
          to: email,
          subject: "Welcome Back to Mimaar Associates!",
          html: newsletterWelcomeEmail(),
        })
      }

      return NextResponse.json(
        { success: true, message: "Subscription reactivated" },
        { status: 200 }
      )
    }

    // Create new subscriber
    await db.subscriber.create({
      data: { email },
    })

    // Send welcome email
    if (resend) {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        subject: "Welcome to Mimaar Associates Newsletter!",
        html: newsletterWelcomeEmail(),
      })
    }

    return NextResponse.json(
      { success: true, message: "Successfully subscribed" },
      { status: 201 }
    )
  } catch (error) {
    console.error("[NEWSLETTER_POST]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
