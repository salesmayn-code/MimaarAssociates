"use client"

import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const onScroll = () => setVisible(window.scrollY > 500); window.addEventListener("scroll", onScroll, { passive: true }); onScroll(); return () => window.removeEventListener("scroll", onScroll) }, [])
  if (!visible) return null
  return <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 z-40 rounded-full bg-secondary p-3 text-secondary-foreground shadow-lg transition hover:scale-105" aria-label="Back to top"><ArrowUp className="h-5 w-5" /></button>
}
