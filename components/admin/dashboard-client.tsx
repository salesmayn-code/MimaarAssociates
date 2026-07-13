"use client"

import Link from "next/link"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { FolderKanban, Mail, MousePointer2, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Contact = { id: string; name: string; email: string; status: string; createdAt: Date }
type Props = { initial: { projects: number; subscribers: number; newContacts: number; recentContacts: Contact[]; contacts: { createdAt: Date }[] } }
const statusClass: Record<string, string> = { NEW: "bg-blue-100 text-blue-800", READ: "bg-amber-100 text-amber-800", RESPONDED: "bg-emerald-100 text-emerald-800", ARCHIVED: "bg-zinc-100 text-zinc-700" }

export function DashboardClient({ initial }: Props) {
  const chart = Array.from({ length: 30 }, (_, index) => {
    const date = new Date(Date.now() - (29 - index) * 86400000)
    const dateKey = date.toISOString().slice(0, 10)
    return { date: date.toLocaleDateString(undefined, { month: "short", day: "numeric" }), contacts: initial.contacts.filter(({ createdAt }) => new Date(createdAt).toISOString().slice(0, 10) === dateKey).length }
  })
  const stats = [
    ["Total projects", initial.projects, FolderKanban], ["New contacts", initial.newContacts, Mail], ["Subscribers", initial.subscribers, Users], ["Page views", "Not connected", MousePointer2],
  ] as const
  return <div className="space-y-8">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1><p className="text-muted-foreground">Your Mimaar Associates website at a glance.</p></div><div className="flex gap-2"><Button asChild variant="outline"><Link href="/admin/contacts">View messages</Link></Button><Button asChild><Link href="/admin/projects">Add project</Link></Button></div></div>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([label, value, Icon]) => <Card key={label}><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-muted-foreground">{label}{label === "New contacts" ? " this week" : ""}</p><p className="mt-1 text-2xl font-semibold">{value}</p></div><Icon className="size-5 text-secondary" /></CardContent></Card>)}</section>
    <Card><CardHeader><CardTitle>Contact submissions</CardTitle><p className="text-sm text-muted-foreground">Last 30 days</p></CardHeader><CardContent className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={chart}><XAxis dataKey="date" tickLine={false} axisLine={false} interval={4} /><YAxis allowDecimals={false} tickLine={false} axisLine={false} /><Tooltip /><Bar dataKey="contacts" fill="var(--secondary)" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></CardContent></Card>
    <Card><CardHeader className="flex-row items-center justify-between"><div><CardTitle>Recent contacts</CardTitle><p className="mt-1 text-sm text-muted-foreground">Latest contact form submissions</p></div><Button asChild variant="ghost" size="sm"><Link href="/admin/contacts">View all</Link></Button></CardHeader><CardContent className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead></TableRow></TableHeader><TableBody>{initial.recentContacts.map((contact) => <TableRow key={contact.id}><TableCell className="font-medium">{contact.name}</TableCell><TableCell>{contact.email}</TableCell><TableCell><Badge variant="secondary" className={statusClass[contact.status]}>{contact.status}</Badge></TableCell><TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell></TableRow>)}{!initial.recentContacts.length && <TableRow><TableCell colSpan={4} className="h-24 text-center text-muted-foreground">No contact submissions yet.</TableCell></TableRow>}</TableBody></Table></CardContent></Card>
  </div>
}
