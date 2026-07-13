"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"
import { DarkModeToggle } from "@/components/shared/dark-mode-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0.1, 0.4] })
    const sections = ["home", "services", "about", "projects", "contact"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
      <div className="container mx-auto px-4">
        {/* Top contact bar */}
        <div className={`hidden md:flex items-center justify-end text-sm text-muted-foreground border-b border-border transition-all duration-300 ${scrolled ? "h-0 py-0 overflow-hidden opacity-0" : "py-2 opacity-100"}`}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-secondary" />
              <span>0300 527 4224</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-secondary" />
              <span>mimaarassociates@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">Mimaar Associates</div>
            <div className="hidden md:block ml-2 text-sm text-muted-foreground tracking-wider">SUPPLY AND SERVICES</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className={activeSection === "home" ? "text-secondary" : "text-foreground hover:text-secondary transition-colors"}>
              Home
            </a>
            <a href="#services" className={activeSection === "services" ? "text-secondary" : "text-foreground hover:text-secondary transition-colors"}>
              Services
            </a>
            <a href="#about" className={activeSection === "about" ? "text-secondary" : "text-foreground hover:text-secondary transition-colors"}>
              About
            </a>
            <a href="#projects" className={activeSection === "projects" ? "text-secondary" : "text-foreground hover:text-secondary transition-colors"}>
              Projects
            </a>
            <a href="#contact" className={activeSection === "contact" ? "text-secondary" : "text-foreground hover:text-secondary transition-colors"}>
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-2"><DarkModeToggle /><Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90" size="sm"><a href="#contact">Get Quote</a></Button></div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden py-4 border-t border-border absolute top-full left-0 w-full bg-background/95 backdrop-blur px-4 shadow-lg border-b"
            >
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-foreground hover:text-secondary transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Home
                </a>
                <a href="#services" className="text-foreground hover:text-secondary transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Services
                </a>
                <a href="#about" className="text-foreground hover:text-secondary transition-colors" onClick={() => setIsMenuOpen(false)}>
                  About
                </a>
                <a href="#projects" className="text-foreground hover:text-secondary transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Projects
                </a>
                <a href="#contact" className="text-foreground hover:text-secondary transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </a>
                <Button asChild className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90" size="sm"><a href="#contact" onClick={() => setIsMenuOpen(false)}>Get Quote</a></Button>
                <div className="flex items-center justify-between border-t border-border pt-3"><span className="text-sm text-muted-foreground">Appearance</span><DarkModeToggle /></div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
