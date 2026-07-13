import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { isAdmin } from "@/lib/admin"

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const now = new Date()
  const weekAgo = new Date(now)
  weekAgo.setDate(now.getDate() - 7)
  const monthAgo = new Date(now)
  monthAgo.setDate(now.getDate() - 29)

  const [projects, contacts, subscribers, recentContacts, submissions] = await Promise.all([
    db.project.count(),
    db.contactSubmission.count({ where: { createdAt: { gte: weekAgo } } }),
    db.subscriber.count({ where: { isActive: true } }),
    db.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    db.contactSubmission.findMany({ where: { createdAt: { gte: monthAgo } }, select: { createdAt: true } }),
  ])

  const counts = new Map<string, number>()
  for (let offset = 29; offset >= 0; offset--) {
    const date = new Date(now)
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - offset)
    counts.set(date.toISOString().slice(0, 10), 0)
  }
  submissions.forEach(({ createdAt }) => {
    const key = createdAt.toISOString().slice(0, 10)
    counts.set(key, (counts.get(key) || 0) + 1)
  })

  return NextResponse.json({
    stats: { projects, contacts, subscribers, pageViews: null },
    recentContacts,
    chart: Array.from(counts, ([date, contacts]) => ({ date, contacts })),
  })
}
