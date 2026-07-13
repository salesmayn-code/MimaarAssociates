import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { isAdmin } from "@/lib/admin"
import { serviceSchema } from "@/lib/validations"

export async function GET() {
  try {
    const services = await db.service.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    })

    return NextResponse.json(services)
  } catch (error) {
    console.error("[SERVICES_GET]", error)
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
    const result = serviceSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const service = await db.service.create({
      data: result.data,
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error("[SERVICES_POST]", error)
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
        { error: "Service ID is required" },
        { status: 400 }
      )
    }

    const result = serviceSchema.partial().safeParse(data)

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const existing = await db.service.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      )
    }

    const service = await db.service.update({
      where: { id },
      data: result.data,
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error("[SERVICES_PUT]", error)
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

    // Also check request body if id not in query params
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
        { error: "Service ID is required" },
        { status: 400 }
      )
    }

    const existing = await db.service.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      )
    }

    // Soft delete
    await db.service.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[SERVICES_DELETE]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
