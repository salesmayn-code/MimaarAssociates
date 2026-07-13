import { db } from "@/lib/db"
import { DashboardClient } from "@/components/admin/dashboard-client"

export default async function AdminPage() {
  const [projects, subscribers, recentContacts, contacts] = await Promise.all([
    db.project.count(), db.subscriber.count({ where: { isActive: true } }),
    db.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    db.contactSubmission.findMany({ where: { createdAt: { gte: new Date(Date.now() - 30 * 86400000) } }, select: { createdAt: true } }),
  ])
  const weekAgo = new Date(Date.now() - 7 * 86400000)
  const newContacts = contacts.filter(({ createdAt }) => createdAt >= weekAgo).length
  return <DashboardClient initial={{ projects, subscribers, newContacts, recentContacts, contacts }} />
}
