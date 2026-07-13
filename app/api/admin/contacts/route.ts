import { NextResponse } from "next/server"
import { ContactStatus } from "@prisma/client"
import { db } from "@/lib/db"
import { isAdmin } from "@/lib/admin"

export async function GET(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const status = new URL(req.url).searchParams.get("status")
  const contacts = await db.contactSubmission.findMany({
    where: status && status !== "ALL" ? { status: status as ContactStatus } : undefined,
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(contacts)
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id, status, notes } = await req.json()
  if (!id) return NextResponse.json({ error: "Contact ID is required" }, { status: 400 })
  if (status && !Object.values(ContactStatus).includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }
  const contact = await db.contactSubmission.update({
    where: { id },
    data: { ...(status ? { status } : {}), ...(notes !== undefined ? { notes } : {}) },
  })
  return NextResponse.json(contact)
}
