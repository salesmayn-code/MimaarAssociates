"use client"

import { signOut } from "next-auth/react"
import { LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export function AdminTopbar({ name }: { name?: string | null }) {
  return <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-8">
    <Sheet><SheetTrigger asChild><Button variant="ghost" size="icon" className="md:hidden"><Menu className="size-5" /></Button></SheetTrigger><SheetContent side="left" className="w-64 p-0"><AdminSidebar /></SheetContent></Sheet>
    <p className="text-sm text-muted-foreground">Manage your website content</p>
    <div className="flex items-center gap-3"><span className="hidden text-sm font-medium sm:block">{name || "Administrator"}</span><Button variant="ghost" size="icon" onClick={() => signOut({ callbackUrl: "/login" })} aria-label="Sign out"><LogOut className="size-4" /></Button></div>
  </header>
}
