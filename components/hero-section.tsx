import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, Building, ChevronDown } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { TextReveal } from "@/components/animations/text-reveal"
import Image from "next/image"

export function HeroSection() {
  return (
    <section id="home" className="relative py-20 lg:py-32 bg-gradient-to-br from-background to-muted min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="text-4xl lg:text-6xl font-bold text-balance leading-tight flex flex-wrap gap-x-[0.25em]">
                <TextReveal text="Building Dreams," className="text-foreground" />
                <TextReveal text="Creating Futures" className="text-secondary" />
              </div>
              <FadeIn delay={0.2}>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Professional construction, real estate consulting, and architectural design services in Islamabad. Your
                  trusted partner for quality building solutions.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="#contact">Get Started<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                  <a href="#projects">View Portfolio</a>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center p-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-sm">
                  <div className="flex justify-center mb-2">
                    <Award className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-primary">15+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-sm">
                  <div className="flex justify-center mb-2">
                    <Building className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-primary">200+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Projects Done</div>
                </div>
                <div className="text-center p-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-sm">
                  <div className="flex justify-center mb-2">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-primary">500+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Happy Clients</div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4} className="relative h-full">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src="/modern-construction-site-with-cranes-and-buildings.jpg"
                  alt="Construction site in Islamabad"
                  className="w-full h-full object-cover"
                  width={1200}
                  height={900}
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border">
                <div className="text-sm text-muted-foreground">Located in</div>
                <div className="font-semibold text-primary">DHA II, Islamabad</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
        <a href="#services" className="text-muted-foreground hover:text-secondary transition-colors" aria-label="Scroll down">
          <ChevronDown className="h-8 w-8" />
        </a>
      </div>
    </section>
  )
}
