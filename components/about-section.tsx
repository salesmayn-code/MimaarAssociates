import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { CountUp } from "@/components/animations/count-up"
import { ParallaxImage } from "@/components/animations/parallax-image"

const features = [
  "Licensed and insured professionals",
  "Quality materials and craftsmanship",
  "Timely project completion",
  "Competitive pricing",
  "Customer satisfaction guarantee",
  "Local expertise in Islamabad market",
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="up">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-balance">Why Choose Mimaar Associates?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With years of experience in the construction and real estate industry, we have established ourselves as
                  a trusted name in Islamabad. Our commitment to excellence and customer satisfaction sets us apart.
                </p>
              </div>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button size="lg">Learn More About Us</Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-xl border border-border/50">
                <ParallaxImage
                  src="/professional-construction-team-working-on-a-modern.jpg"
                  alt="Professional construction team"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-secondary text-secondary-foreground p-6 rounded-xl shadow-lg border border-secondary-foreground/10">
                <div className="text-3xl font-bold flex items-center">
                  <CountUp end={15} />+
                </div>
                <div className="text-sm font-medium opacity-90">Years of Excellence</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
