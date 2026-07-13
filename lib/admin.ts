import { auth } from "@/auth"

export async function isAdmin() {
  const session = await auth()
  const role = (session?.user as { role?: string } | undefined)?.role
  return role === "ADMIN" || role === "SUPER_ADMIN"
}
