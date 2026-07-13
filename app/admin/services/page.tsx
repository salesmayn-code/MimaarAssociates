import { db } from "@/lib/db"
import { ServicesManager } from "@/components/admin/services-manager"
export default async function ServicesPage() { const services = await db.service.findMany({ orderBy: { order: "asc" } }); return <ServicesManager initialServices={services} /> }
