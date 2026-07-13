"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, FileText, FolderKanban, LayoutDashboard, Mail, MessageSquareQuote, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  ["Overview", "/admin", LayoutDashboard], ["Projects", "/admin/projects", FolderKanban],
  ["Services", "/admin/services", Building2], ["Contacts", "/admin/contacts", Mail],
  ["Testimonials", "/admin/testimonials", MessageSquareQuote], ["Subscribers", "/admin/subscribers", Users],
  ["Settings", "/admin/settings", Settings],
] as const

export function AdminSidebar() {
  const pathname = usePathname()
  return <aside className="relative h-full w-64 shrink-0 border-r bg-card">
    <div className="flex h-16 items-center gap-2 border-b px-6 font-semibold"><Building2 className="size-5 text-secondary" /> Mimaar Admin</div>
    <nav className="space-y-1 p-3">{items.map(([label, href, Icon]) => <Link key={href} href={href} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted", pathname === href && "bg-primary text-primary-foreground hover:bg-primary")}><Icon className="size-4" />{label}</Link>)}</nav>
    <div className="absolute bottom-4 px-6 text-xs text-muted-foreground"><FileText className="mr-1 inline size-3" />Management portal</div>
  </aside>
}
