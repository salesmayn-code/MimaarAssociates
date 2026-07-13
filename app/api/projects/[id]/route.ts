import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { isAdmin } from "@/lib/admin"
import { projectSchema } from "@/lib/validations"

type RouteContext = {
  params: Promise<{ id: string }>
}

// Check if a string looks like a CUID (starts with 'c' and is 25 chars) or UUID
function isCuidOrUuid(value: string): boolean {
  return (
    /^c[a-z0-9]{24}$/.test(value) ||
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
  )
}

export async function GET(req: Request, context: RouteContext) {
  try {
    const { id } = await context.params

    const where = isCuidOrUuid(id)
      ? { id, isActive: true }
      : { slug: id, isActive: true }

    const project = await db.project.findFirst({
      where,
      include: { images: { orderBy: { order: "asc" } } },
    })

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("[PROJECT_GET]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request, context: RouteContext) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await context.params
    const body = await req.json()

    const result = projectSchema.partial().safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    // Check project exists
    const existing = await db.project.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    const { images, ...projectData } = result.data

    if (images !== undefined) {
      // Use a transaction to delete old images and create new ones
      const project = await db.$transaction(async (tx) => {
        await tx.projectImage.deleteMany({ where: { projectId: id } })

        return tx.project.update({
          where: { id },
          data: {
            ...projectData,
            images: {
              create: images.map((img) => ({
                url: img.url,
                alt: img.alt || null,
                order: img.order ?? 0,
              })),
            },
          },
          include: { images: { orderBy: { order: "asc" } } },
        })
      })

      return NextResponse.json(project)
    }

    // Update without touching images
    const project = await db.project.update({
      where: { id },
      data: projectData,
      include: { images: { orderBy: { order: "asc" } } },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("[PROJECT_PUT]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request, context: RouteContext) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await context.params

    const existing = await db.project.findUnique({ where: { id } })

    if (!existing) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    // Soft delete
    await db.project.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[PROJECT_DELETE]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
