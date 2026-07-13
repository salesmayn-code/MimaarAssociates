"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Unable to send your message.")
      form.reset(); setStatus("success"); setMessage("Thank you — we will be in touch shortly.")
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Unable to send your message.") }
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Ready to start your project? Contact us today for a free consultation
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <FadeIn direction="right">
            <div className="space-y-8">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <MapPin className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Office Address</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Office No. UG-100, Defence Residency Shops
                          <br />
                          DHA II, Islamabad
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <Phone className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Phone Numbers</h3>
                        <div className="space-y-1 text-muted-foreground">
                          <p>0300 527 4224</p>
                          <p>0315 506 5255</p>
                          <p>0345 509 7196</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <Mail className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Email</h3>
                        <p className="text-muted-foreground">mimaarassociates@gmail.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <Clock className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Business Hours</h3>
                        <div className="space-y-1 text-muted-foreground">
                          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                          <p>Saturday: 9:00 AM - 4:00 PM</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="overflow-hidden rounded-xl border border-border shadow-sm">
                  <iframe
                    title="Mimaar Associates location in DHA II, Islamabad"
                    src="https://www.google.com/maps?q=Defence%20Residency%20Shops%2C%20DHA%20II%2C%20Islamabad&output=embed"
                    className="h-64 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="left" delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
              <form className="space-y-6" onSubmit={onSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input id="name" name="name" required minLength={2} placeholder="Your full name" className="focus-visible:ring-secondary focus-visible:border-secondary" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <Input id="phone" name="phone" placeholder="Your phone number" className="focus-visible:ring-secondary focus-visible:border-secondary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input id="email" name="email" type="email" required placeholder="your.email@example.com" className="focus-visible:ring-secondary focus-visible:border-secondary" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium">
                    Service Interested In
                  </label>
                  <Input id="service" name="service" placeholder="e.g., Construction, Interior Design, Real Estate" className="focus-visible:ring-secondary focus-visible:border-secondary" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" name="message" required minLength={10} placeholder="Tell us about your project requirements..." rows={4} className="focus-visible:ring-secondary focus-visible:border-secondary" />
                </div>

                <Button type="submit" disabled={status === "sending"} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" size="lg">
                  {status === "sending" ? "Sending…" : status === "success" ? "Message Sent" : "Send Message"}
                </Button>
                {status !== "idle" && <p className={`text-sm ${status === "error" ? "text-destructive" : "text-green-700 dark:text-green-400"}`} aria-live="polite">{message}</p>}
              </form>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
