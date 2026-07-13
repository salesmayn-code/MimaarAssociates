"use client"

import { useState } from "react"
import { Plus, Save, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Setting = { id: string; key: string; value: string }
export function SettingsManager({ initialSettings }: { initialSettings: Setting[] }) {
  const [settings, setSettings] = useState(initialSettings), [saving, setSaving] = useState(false)
  const save = async () => { setSaving(true); const valid = settings.filter((setting) => setting.key.trim()); const response = await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(valid.map(({ key, value }) => ({ key, value }))) }); if (response.ok) { setSettings(await response.json()); toast.success("Settings saved") } else toast.error("Could not save settings"); setSaving(false) }
  return <div className="space-y-6"><div><h1 className="text-3xl font-semibold">Site settings</h1><p className="text-muted-foreground">Update company details and website configuration values.</p></div><Card><CardContent className="space-y-3 p-5">{settings.map((setting, index) => <div key={setting.id || index} className="flex gap-2"><Input className="max-w-xs" value={setting.key} placeholder="setting_key" onChange={(event) => setSettings((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, key: event.target.value } : item))} /><Input value={setting.value} placeholder="Value" onChange={(event) => setSettings((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, value: event.target.value } : item))} /><Button size="icon" variant="ghost" onClick={() => setSettings((current) => current.filter((_, itemIndex) => itemIndex !== index))}><Trash2 className="size-4 text-destructive" /></Button></div>)}<Button variant="outline" onClick={() => setSettings((current) => [...current, { id: "", key: "", value: "" }])}><Plus className="mr-2 size-4" />Add setting</Button></CardContent></Card><Button onClick={save} disabled={saving}><Save className="mr-2 size-4" />{saving ? "Saving…" : "Save settings"}</Button></div>
}
