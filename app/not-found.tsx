import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-8xl font-serif font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Page Not Found
      </h2>
      <p className="mt-4 text-muted-foreground max-w-md">
        We couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button asChild className="bg-secondary text-primary hover:bg-secondary/90">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/#contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
