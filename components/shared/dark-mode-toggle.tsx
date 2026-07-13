"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <span className="h-9 w-9" />
  const dark = resolvedTheme === "dark"
  return <button type="button" onClick={() => setTheme(dark ? "light" : "dark")} className="rounded-md p-2 text-foreground hover:bg-muted" aria-label={`Switch to ${dark ? "light" : "dark"} mode`}>{dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
}
