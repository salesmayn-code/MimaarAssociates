import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { isAdmin } from "@/lib/admin"

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const subscribers = await db.subscriber.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(subscribers)
}
