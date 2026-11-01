# Mimaar Associates — Website & Admin Platform

A company website and content-management platform for Mimaar Associates, a
real-estate, construction, and architectural-design firm. The public site
presents services, projects, testimonials, and contact channels; a protected
admin area lets the team manage that content without code changes.

The application is built with Next.js 14, React 18, TypeScript, Prisma 5, and
PostgreSQL, and is delivered to an Ubuntu VM through a Jenkins pipeline using
PM2 and Nginx.

## Features

### Public site

- Landing page with hero, services, featured projects, testimonials, and contact
  sections.
- Project and service listings backed by the database rather than hard-coded
  content.
- Contact form with server-side validation, rate limiting, database persistence,
  and Resend email notifications.
- Newsletter signup with duplicate handling, reactivation, and welcome email.
- Responsive layout, dark mode, and animation built on Tailwind CSS, Radix UI,
  and Framer Motion.

### Admin platform

- Credentials authentication with NextAuth v5 and bcrypt password hashing.
- Route protection through middleware for every `/admin` page.
- Dashboard with content and submission counts.
- CRUD management for projects, services, testimonials, subscribers, and contact
  submissions.
- Site settings stored in the database.
- Image upload endpoint restricted to admin sessions, 5 MB maximum, and
  JPEG/PNG/WebP/GIF MIME types.

### Data model

The Prisma schema covers `User`, `Service`, `Project`, `ProjectImage`,
`Testimonial`, `ContactSubmission`, `Subscriber`, and `SiteSetting`, with an
initial migration and a seed script for services, projects, and the first admin
account.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router), React 18 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, Radix UI, shadcn/ui patterns |
| Auth | NextAuth v5 (credentials), bcryptjs |
| ORM / database | Prisma 5, PostgreSQL |
| Email | Resend |
| Validation | Zod, React Hook Form |
| Testing | Jest, Testing Library |
| Delivery | Jenkins, PM2, Nginx, Ubuntu |

## Repository layout

```text
app/                    public pages, login, admin area, API routes
components/             marketing sections, admin managers, shared UI
lib/                    Prisma client, auth helpers, validation, email, rate limiting
prisma/                 schema, migration, seed script
public/                 static assets and uploaded images
Jenkinsfile             CI/CD pipeline definition
```

## Getting started

**Prerequisites:** Node.js 20, pnpm, and a PostgreSQL database.

```bash
pnpm install
```

Create a `.env` file in the project root:

```dotenv
DATABASE_URL="postgresql://user:password@localhost:5432/mimaar"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Optional email delivery
RESEND_API_KEY=""
EMAIL_FROM="Mimaar Associates <no-reply@example.com>"
ADMIN_EMAIL="admin@example.com"

# Required by the seed script
SEED_ADMIN_EMAIL="admin@example.com"
SEED_ADMIN_PASSWORD="choose-a-strong-password"
```

Apply the schema, seed reference data, and start the development server:

```bash
pnpm exec prisma migrate deploy
pnpm exec prisma db seed
pnpm dev
```

The site runs at `http://localhost:3000` and the admin area at
`http://localhost:3000/admin`.

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Start the Next.js development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run Next.js ESLint checks |
| `pnpm test` | Run Jest in CI mode |
| `pnpm test:watch` | Run Jest in watch mode |

## CI/CD pipeline

The `Jenkinsfile` defines a single-stage-per-step pipeline:

```text
Checkout
  → Install pnpm
  → Install dependencies (frozen lockfile)
  → Lint
  → Test
  → Prisma generate + migrate deploy
  → Build
  → Deploy (rsync to /var/www/mimaar, PM2 restart, pm2 save)
```

Jenkins credentials `database-url` and `nextauth-secret` are injected as
environment variables. The deployment target is configured through `DEPLOY_DIR`
and is served by Nginx with PM2 supervising the application process.

## Notes

- The seed script requires `SEED_ADMIN_PASSWORD`; it does not fall back to a
  default password.
- Email sending is skipped when `RESEND_API_KEY` is not configured, while form
  submissions are still stored in the database.
- Uploaded images are written to `public/uploads` on the application host.
