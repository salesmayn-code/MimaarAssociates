import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { isAdmin } from "@/lib/admin"
import { projectSchema } from "@/lib/validations"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = Math.min(parseInt(searchParams.get("limit") || "12", 10), 50)
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = { isActive: true }

    if (category) {
      where.category = category
    }

    if (featured === "true") {
      where.isFeatured = true
    }

    const [projects, total] = await Promise.all([
      db.project.findMany({
        where,
        include: { images: { orderBy: { order: "asc" } } },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.project.count({ where }),
    ])

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("[PROJECTS_GET]", error)
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
    const result = projectSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { images, ...projectData } = result.data

    const project = await db.project.create({
      data: {
        ...projectData,
        images: {
          create: images.map((img) => ({
            url: img.url,
            alt: img.alt || null,
            order: img.order,
          })),
        },
      },
      include: { images: { orderBy: { order: "asc" } } },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("[PROJECTS_POST]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
