"use client"

import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, X } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import Image from "next/image"

const projects = [
  {
    title: "Luxury Residential Complex",
    category: "Residential Development",
    image: "/luxury-residential-complex-with-modern-architectur.jpg",
    description: "Modern residential complex with premium amenities in DHA Phase II",
  },
  {
    title: "Commercial Plaza",
    category: "Commercial Construction",
    image: "/modern-commercial-plaza-building-with-glass-facade.jpg",
    description: "State-of-the-art commercial plaza with retail and office spaces",
  },
  {
    title: "Villa Renovation",
    category: "Renovation Project",
    image: "/renovated-luxury-villa-with-modern-interior-design.jpg",
    description: "Complete renovation of luxury villa with contemporary design",
  },
  {
    title: "Office Interior Design",
    category: "Interior Design",
    image: "/modern-office-interior-with-elegant-furniture-and-.jpg",
    description: "Professional office space design with modern furnishing",
  },
]

export function ProjectsSection() {
  const [category, setCategory] = useState("All")
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null)
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((project) => project.category)))], [])
  const filteredProjects = category === "All" ? projects : projects.filter((project) => project.category === category)

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Our Recent Projects</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Showcasing our expertise through successful construction and design projects
            </p>
          </div>
        </FadeIn>

        <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Project categories">
          {categories.map((item) => <Button key={item} type="button" variant={category === item ? "default" : "outline"} size="sm" onClick={() => setCategory(item)}>{item}</Button>)}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className={`group relative overflow-hidden rounded-2xl border-0 aspect-[4/3] ${index === 0 ? "lg:col-span-2" : ""}`}>
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  fill
                  sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="space-y-3 text-white">
                    <div className="text-sm text-secondary font-medium tracking-wider uppercase">{project.category}</div>
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-white/80 leading-relaxed line-clamp-2">{project.description}</p>
                    <Button type="button" variant="link" onClick={() => setSelected(project)} className="text-secondary p-0 h-auto font-semibold hover:text-white transition-colors">
                      View Details
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline"><a href="#projects">Browse projects</a></Button>
          </div>
        </FadeIn>

        {selected && <div className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}>
          <div className="relative max-h-full w-full max-w-4xl overflow-auto rounded-2xl bg-card p-4" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="absolute right-6 top-6 z-10 rounded-full bg-background/90 p-2" onClick={() => setSelected(null)} aria-label="Close project preview"><X className="h-5 w-5" /></button>
            <Image src={selected.image} alt={selected.title} width={1200} height={900} className="max-h-[65vh] w-full rounded-xl object-cover" />
            <div className="p-4"><p className="text-sm font-medium text-secondary">{selected.category}</p><h3 className="mt-1 text-2xl font-bold">{selected.title}</h3><p className="mt-3 text-muted-foreground">{selected.description}</p></div>
          </div>
        </div>}
      </div>
    </section>
  )
}
