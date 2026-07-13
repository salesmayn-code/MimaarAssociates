import { db } from "@/lib/db"
import { SubscribersList } from "@/components/admin/subscribers-list"
export default async function SubscribersPage() { const subscribers = await db.subscriber.findMany({ orderBy: { createdAt: "desc" } }); return <SubscribersList subscribers={subscribers} /> }
