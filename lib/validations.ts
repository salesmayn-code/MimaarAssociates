import { z } from "zod"

const imageUrl = z.string().refine((value) => value.startsWith("/") || /^https?:\/\//.test(value), "Image URL must be an absolute URL or local path")

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
})

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export const projectSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  category: z.string().min(2).max(100),
  description: z.string().min(10).max(500),
  content: z.string().optional(),
  isFeatured: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  completedAt: z.string().datetime().optional().nullable(),
  images: z.array(z.object({
    url: imageUrl,
    alt: z.string().optional(),
    order: z.number().int().optional().default(0),
  })).optional().default([]),
})

export const serviceSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  description: z.string().min(10).max(500),
  icon: z.string().min(1).max(50),
  order: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
})

export const testimonialSchema = z.object({
  name: z.string().min(2).max(100),
  role: z.string().optional(),
  content: z.string().min(10).max(1000),
  rating: z.number().int().min(1).max(5).optional().default(5),
  avatar: imageUrl.optional().nullable(),
  isActive: z.boolean().optional().default(true),
})

export const settingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
})

export type ContactFormData = z.infer<typeof contactSchema>
export type NewsletterFormData = z.infer<typeof newsletterSchema>
export type ProjectFormData = z.infer<typeof projectSchema>
export type ServiceFormData = z.infer<typeof serviceSchema>
export type TestimonialFormData = z.infer<typeof testimonialSchema>
