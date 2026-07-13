import { db } from "@/lib/db"
import { TestimonialsManager } from "@/components/admin/testimonials-manager"
export default async function TestimonialsPage() { const testimonials = await db.testimonial.findMany({ orderBy: { createdAt: "desc" } }); return <TestimonialsManager initialTestimonials={testimonials} /> }
