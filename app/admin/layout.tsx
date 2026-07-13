import { requireAdmin } from "@/lib/auth-utils"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminTopbar } from "@/components/admin/admin-topbar"
import { Toaster } from "@/components/ui/sonner"

export const dynamic = "force-dynamic"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin()
  return <div className="flex min-h-screen bg-muted/30"><div className="hidden md:block"><AdminSidebar /></div><div className="min-w-0 flex-1"><AdminTopbar name={session.user?.name} /><main className="mx-auto max-w-7xl p-4 md:p-8">{children}</main></div><Toaster richColors /></div>
}
