import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { isAdmin } from "@/lib/admin"

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const projects = await db.project.findMany({
    include: { images: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(projects)
}
