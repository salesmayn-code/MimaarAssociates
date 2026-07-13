import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Home, Palette, Wrench, Sofa, Truck, MapPin, ArrowRight } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-children"

const services = [
  {
    icon: MapPin,
    title: "Real Estate Consultant",
    description: "Expert guidance for property investment, buying, and selling in prime locations across Islamabad.",
  },
  {
    icon: Building2,
    title: "Builders and Developers",
    description: "Complete construction solutions from foundation to finishing with quality craftsmanship.",
  },
  {
    icon: Home,
    title: "Architectural Design",
    description: "Innovative and functional architectural designs tailored to your vision and requirements.",
  },
  {
    icon: Wrench,
    title: "Renovation",
    description: "Transform your existing spaces with modern renovation and restoration services.",
  },
  {
    icon: Palette,
    title: "Interior Design",
    description: "Create beautiful, functional interiors that reflect your style and enhance your lifestyle.",
  },
  {
    icon: Truck,
    title: "Building Material Suppliers",
    description: "High-quality construction materials sourced from trusted suppliers at competitive prices.",
  },
  {
    icon: Sofa,
    title: "Furnishing and Furniture",
    description:
      "Complete furnishing solutions with premium furniture and decor for residential and commercial spaces.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Our Professional Services</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Comprehensive construction and real estate solutions to bring your vision to life
          </p>
        </div>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <Card className="group h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:[transform:perspective(900px)_rotateX(2deg)_rotateY(-2deg)]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                      <service.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
