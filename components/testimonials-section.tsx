"use client"

import React, { useEffect, useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"

const testimonials = [
  {
    name: "Muhammad Ali",
    role: "Homeowner, DHA Phase II",
    content: "Mimaar Associates built our dream home with unparalleled attention to detail. The gold-standard quality and professionalism they brought to every phase of construction was truly remarkable.",
    rating: 5,
  },
  {
    name: "Basit Khan",
    role: "CEO, TechVentures",
    content: "The interior design team transformed our office space into a modern, inspiring environment. Their commitment to the timeline and budget was impressive. Highly recommended!",
    rating: 5,
  },
  {
    name: "Saleh",
    role: "Property Investor",
    content: "I've partnered with Mimaar Associates on multiple commercial projects. Their deep understanding of the Islamabad market and flawless execution make them the best in the business.",
    rating: 5,
  },
  {
    name: "Ahmed",
    role: "Villa Owner",
    content: "Our villa renovation was handled perfectly. The navy and gold accents they suggested added an elegant, premium feel to our living space. A fantastic experience overall.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  return (
    <section id="testimonials" className="py-24 bg-[#0F172A] text-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Client Testimonials</h2>
            <div className="h-1 w-20 bg-secondary mx-auto mb-6 rounded-full" />
            <p className="text-xl text-slate-300 text-pretty max-w-2xl mx-auto">
              Don't just take our word for it. Hear what our valued clients have to say about our work.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4">
                    <Card className="h-full bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-secondary/50 transition-colors duration-300">
                      <CardContent className="p-8 flex flex-col h-full relative">
                        <Quote className="absolute top-6 right-6 h-12 w-12 text-secondary/10 rotate-180" />
                        
                        <div className="flex gap-1 mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                          ))}
                        </div>
                        
                        <p className="text-slate-300 leading-relaxed mb-8 flex-grow relative z-10 italic">
                          "{testimonial.content}"
                        </p>
                        
                        <div className="mt-auto">
                          <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
                          <p className="text-secondary text-sm font-medium">{testimonial.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-6 mt-12">
              <Button 
                variant="outline" 
                size="icon"
                onClick={scrollPrev}
                className="rounded-full border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all h-10 w-10"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous slide</span>
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === selectedIndex ? "w-8 bg-secondary" : "w-2 bg-slate-700 hover:bg-slate-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <Button 
                variant="outline" 
                size="icon"
                onClick={scrollNext}
                className="rounded-full border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all h-10 w-10"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next slide</span>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
