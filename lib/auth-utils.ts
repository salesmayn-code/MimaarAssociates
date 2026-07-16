import { auth } from "@/auth"
import { redirect } from "next/navigation"

type UserWithRole = {
  role?: string
}

export async function requireAuth() {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }
  return session
}

export async function requireAdmin() {
  const session = await requireAuth()
  const { role } = session.user as UserWithRole
  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/")
  }
  return session
}
