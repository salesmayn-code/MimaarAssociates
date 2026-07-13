"use client"

import Image, { type ImageProps } from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function ParallaxImage(props: ImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])
  return <div ref={ref} className="h-full overflow-hidden"><motion.div style={{ y }} className="relative h-[112%] -mt-[6%]"><Image {...props} className={`h-full w-full object-cover ${props.className ?? ""}`} /></motion.div></div>
}
