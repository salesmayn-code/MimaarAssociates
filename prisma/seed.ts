import { hash } from "bcryptjs"
import { db } from "../lib/db"

async function main() {
  console.log("🌱 Starting seed...")

  // ─── Seed Admin User ─────────────────────────────────────────────────────────

  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@mimaarassociates.com"
  const adminPassword = process.env.SEED_ADMIN_PASSWORD
  if (!adminPassword) throw new Error("SEED_ADMIN_PASSWORD must be set before running the seed script")
  const passwordHash = await hash(adminPassword, 12)

  const admin = await db.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin",
      email: adminEmail,
      passwordHash,
      role: "SUPER_ADMIN",
    },
  })

  console.log(`✅ Admin user upserted: ${admin.email}`)

  // ─── Seed Services ───────────────────────────────────────────────────────────

  // Delete existing services to avoid duplicate key errors on re-seed
  await db.service.deleteMany()

  await db.service.createMany({
    data: [
      {
        title: "Real Estate Consultant",
        slug: "real-estate-consultant",
        description:
          "Expert guidance on real estate investments, property valuations, and market analysis. We help you make informed decisions whether you are buying, selling, or investing in residential and commercial properties across Pakistan.",
        icon: "MapPin",
        order: 1,
      },
      {
        title: "Builders and Developers",
        slug: "builders-and-developers",
        description:
          "End-to-end construction and development services for residential complexes, commercial plazas, and mixed-use developments. Our experienced team delivers projects on time, within budget, and to the highest quality standards.",
        icon: "Building2",
        order: 2,
      },
      {
        title: "Architectural Design",
        slug: "architectural-design",
        description:
          "Innovative and sustainable architectural designs tailored to your vision. From concept sketches to detailed blueprints, our architects blend aesthetics with functionality to create spaces that inspire.",
        icon: "Home",
        order: 3,
      },
      {
        title: "Renovation",
        slug: "renovation",
        description:
          "Transform your existing spaces with our professional renovation services. Whether it's a complete home makeover or targeted upgrades, we breathe new life into properties while preserving their character.",
        icon: "Wrench",
        order: 4,
      },
      {
        title: "Interior Design",
        slug: "interior-design",
        description:
          "Create stunning interiors that reflect your personality and lifestyle. Our interior designers curate every detail — from color palettes and lighting to furniture and accessories — for a cohesive and elegant look.",
        icon: "Palette",
        order: 5,
      },
      {
        title: "Building Material Suppliers",
        slug: "building-material-suppliers",
        description:
          "Premium quality construction materials sourced from trusted manufacturers. We supply cement, steel, fixtures, tiles, and more at competitive prices with reliable delivery to your project site.",
        icon: "Truck",
        order: 6,
      },
      {
        title: "Furnishing and Furniture",
        slug: "furnishing-and-furniture",
        description:
          "Complete furnishing solutions including custom-made and imported furniture. From living rooms to executive offices, we provide high-quality pieces that combine comfort, durability, and timeless design.",
        icon: "Sofa",
        order: 7,
      },
    ],
  })

  console.log("✅ 7 services created")

  // ─── Seed Projects ───────────────────────────────────────────────────────────

  // Delete existing projects (cascades to images) to avoid duplicate key errors
  await db.project.deleteMany()

  const projects = [
    {
      title: "Luxury Residential Complex",
      slug: "luxury-residential-complex",
      category: "Residential",
      description:
        "A premium 120-unit residential complex featuring modern architecture, lush green landscapes, and world-class amenities including a swimming pool, gymnasium, and community center.",
      content:
        "This flagship project by Mimaar Associates showcases our commitment to quality living. Spread over 5 acres, the complex features three high-rise towers with panoramic city views. Each unit is designed with open-plan living areas, imported marble flooring, and smart home integration. The development includes underground parking, 24/7 security, a children's play area, and a rooftop garden lounge.",
      isFeatured: true,
      isActive: true,
      completedAt: new Date("2025-06-15"),
      images: [
        {
          url: "/luxury-residential-complex-with-modern-architectur.jpg",
          alt: "Luxury Residential Complex — Exterior View",
          order: 1,
        },
        {
          url: "/modern-construction-site-with-cranes-and-buildings.jpg",
          alt: "Luxury Residential Complex — Construction Phase",
          order: 2,
        },
      ],
    },
    {
      title: "Commercial Plaza",
      slug: "commercial-plaza",
      category: "Commercial",
      description:
        "A state-of-the-art commercial plaza with 50+ retail units, corporate office floors, and a food court, located in the heart of the business district.",
      content:
        "Designed to be a landmark in the commercial hub, this plaza combines glass-curtain facade architecture with energy-efficient systems. The ground and first floors house premium retail spaces, while the upper floors offer Grade-A office suites. Features include high-speed elevators, centralized HVAC, fire safety systems, and ample visitor parking.",
      isFeatured: true,
      isActive: true,
      completedAt: new Date("2025-03-20"),
      images: [
        {
          url: "/modern-commercial-plaza-building-with-glass-facade.jpg",
          alt: "Commercial Plaza — Glass Facade Exterior",
          order: 1,
        },
      ],
    },
    {
      title: "Villa Renovation",
      slug: "villa-renovation",
      category: "Renovation",
      description:
        "Complete renovation of a classic 8-bedroom villa, blending traditional charm with contemporary luxury including a redesigned landscape and modern interiors.",
      content:
        "This villa renovation project preserved the original structural character while introducing modern comforts. Key upgrades include Italian marble flooring, a redesigned open kitchen, spa-style bathrooms, and a landscaped garden with a fountain. Smart lighting and climate control systems were integrated throughout the property for enhanced comfort and energy savings.",
      isFeatured: false,
      isActive: true,
      completedAt: new Date("2024-11-10"),
      images: [
        {
          url: "/renovated-luxury-villa-with-modern-interior-design.jpg",
          alt: "Villa Renovation — Modern Interior Design",
          order: 1,
        },
      ],
    },
    {
      title: "Office Interior Design",
      slug: "office-interior-design",
      category: "Interior Design",
      description:
        "A contemporary office interior designed for a leading tech company, featuring collaborative workspaces, ergonomic furniture, and biophilic design elements.",
      content:
        "This project transformed a 10,000 sq. ft. raw shell into a vibrant, productive workspace. The design philosophy centered on openness and collaboration, with glass partitions, breakout zones, and a café-style pantry. Biophilic elements such as indoor planters, living walls, and natural wood finishes bring warmth to the modern aesthetic. Custom-built furniture and acoustic panels ensure both style and functionality.",
      isFeatured: true,
      isActive: true,
      completedAt: new Date("2025-01-05"),
      images: [
        {
          url: "/modern-office-interior-with-elegant-furniture-and-.jpg",
          alt: "Office Interior — Elegant Furniture and Design",
          order: 1,
        },
        {
          url: "/professional-construction-team-working-on-a-modern.jpg",
          alt: "Office Interior — Team at Work",
          order: 2,
        },
      ],
    },
  ]

  for (const project of projects) {
    const { images, ...projectData } = project

    const createdProject = await db.project.create({
      data: {
        ...projectData,
        images: {
          createMany: {
            data: images,
          },
        },
      },
    })

    console.log(`✅ Project created: ${createdProject.title}`)
  }

  // ─── Seed Testimonials ────────────────────────────────────────────────────────

  await db.testimonial.deleteMany()

  await db.testimonial.createMany({
    data: [
      {
        name: "Ahmed Khan",
        role: "Property Investor",
        content:
          "Mimaar Associates turned our dream home into reality. Their attention to detail and professionalism throughout the project was exceptional. The team delivered on time and the quality exceeded our expectations.",
        rating: 5,
        avatar: "/placeholder-user.jpg",
      },
      {
        name: "Sara Malik",
        role: "Business Owner",
        content:
          "We hired Mimaar Associates for our office interior design project. The result was beyond what we imagined — a modern, functional space that our employees love working in. Highly recommended!",
        rating: 5,
        avatar: "/placeholder-user.jpg",
      },
      {
        name: "Usman Ali",
        role: "Homeowner",
        content:
          "The renovation of our villa was handled with utmost care and creativity. Mimaar Associates preserved the character of our home while adding contemporary touches that made it feel brand new. Outstanding work!",
        rating: 4,
        avatar: "/placeholder-user.jpg",
      },
    ],
  })

  console.log("✅ 3 testimonials created")

  // ─── Seed Site Settings ───────────────────────────────────────────────────────

  await db.siteSetting.deleteMany()

  await db.siteSetting.createMany({
    data: [
      { key: "company_name", value: "Mimaar Associates" },
      { key: "company_phone", value: "+92 300 1234567" },
      { key: "company_email", value: "info@mimaarassociates.com" },
      {
        key: "company_address",
        value: "Office No. 12, 2nd Floor, Commercial Area, DHA Phase 5, Lahore, Pakistan",
      },
    ],
  })

  console.log("✅ Site settings created")

  console.log("🌱 Seed completed successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
