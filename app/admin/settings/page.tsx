import { db } from "@/lib/db"
import { SettingsManager } from "@/components/admin/settings-manager"
export default async function SettingsPage() { const settings = await db.siteSetting.findMany({ orderBy: { key: "asc" } }); return <SettingsManager initialSettings={settings} /> }
