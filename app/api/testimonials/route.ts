import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { isAdmin } from "@/lib/admin"
import { testimonialSchema } from "@/lib/validations"

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("[TESTIMONIALS_GET]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const result = testimonialSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const testimonial = await db.testimonial.create({
      data: result.data,
    })

    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    console.error("[TESTIMONIALS_POST]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json(
        { error: "Testimonial ID is required" },
        { status: 400 }
      )
    }

    const result = testimonialSchema.partial().safeParse(data)

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const existing = await db.testimonial.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      )
    }

    const testimonial = await db.testimonial.update({
      where: { id },
      data: result.data,
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("[TESTIMONIALS_PUT]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    let id = searchParams.get("id")

    if (!id) {
      try {
        const body = await req.json()
        id = body.id
      } catch {
        // No body provided
      }
    }

    if (!id) {
      return NextResponse.json(
        { error: "Testimonial ID is required" },
        { status: 400 }
      )
    }

    const existing = await db.testimonial.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      )
    }

    // Soft delete
    await db.testimonial.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[TESTIMONIALS_DELETE]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
