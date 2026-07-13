import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google"

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mimaar Associates - Supply and Services | Construction & Real Estate",
  description:
    "Professional construction, real estate consulting, architectural design, renovation, and interior design services in Islamabad. Builders and developers with expertise in DHA II.",
  generator: "v0.app",
  keywords:
    "construction, real estate, architectural design, renovation, interior design, building materials, Islamabad, DHA II",
}

import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${jakarta.variable} ${playfair.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
