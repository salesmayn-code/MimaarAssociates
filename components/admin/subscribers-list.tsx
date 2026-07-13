"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Subscriber = { id: string; email: string; isActive: boolean; createdAt: string | Date }
export function SubscribersList({ subscribers }: { subscribers: Subscriber[] }) { return <div className="space-y-6"><div><h1 className="text-3xl font-semibold">Subscribers</h1><p className="text-muted-foreground">Newsletter signups from your website.</p></div><Card><CardContent className="overflow-x-auto p-0"><Table><TableHeader><TableRow><TableHead>Email</TableHead><TableHead>Status</TableHead><TableHead>Subscribed</TableHead></TableRow></TableHeader><TableBody>{subscribers.map((subscriber) => <TableRow key={subscriber.id}><TableCell className="font-medium">{subscriber.email}</TableCell><TableCell><Badge variant="secondary" className={subscriber.isActive ? "bg-emerald-100 text-emerald-800" : "bg-zinc-100 text-zinc-700"}>{subscriber.isActive ? "Active" : "Inactive"}</Badge></TableCell><TableCell>{new Date(subscriber.createdAt).toLocaleDateString()}</TableCell></TableRow>)}{!subscribers.length && <TableRow><TableCell colSpan={3} className="h-24 text-center text-muted-foreground">No newsletter subscribers yet.</TableCell></TableRow>}</TableBody></Table></CardContent></Card></div> }
