"use client"

import { motion, useInView } from "framer-motion"
import { type ReactNode, useRef } from "react"

export function SlideIn({ children, from = "left", delay = 0, className }: { children: ReactNode; from?: "left" | "right"; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })
  const x = from === "left" ? -48 : 48

  return <motion.div ref={ref} className={className} initial={{ opacity: 0, x }} animate={inView ? { opacity: 1, x: 0 } : undefined} transition={{ duration: 0.6, delay, ease: "easeOut" }}>{children}</motion.div>
}
