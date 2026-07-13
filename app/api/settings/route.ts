import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { isAdmin } from "@/lib/admin"
import { settingSchema } from "@/lib/validations"
import { z } from "zod"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get("key")

    // Single setting by key — public access
    if (key) {
      const setting = await db.siteSetting.findUnique({
        where: { key },
      })

      if (!setting) {
        return NextResponse.json(
          { error: "Setting not found" },
          { status: 404 }
        )
      }

      return NextResponse.json(setting)
    }

    // All settings — admin only
    if (!(await isAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const settings = await db.siteSetting.findMany({
      orderBy: { key: "asc" },
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error("[SETTINGS_GET]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()

    // Support both single setting and array of settings
    const settingsArray = Array.isArray(body) ? body : [body]

    const batchSchema = z.array(settingSchema)
    const result = batchSchema.safeParse(settingsArray)

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      )
    }

    const updated = await Promise.all(
      result.data.map((setting) =>
        db.siteSetting.upsert({
          where: { key: setting.key },
          update: { value: setting.value },
          create: { key: setting.key, value: setting.value },
        })
      )
    )

    return NextResponse.json(updated)
  } catch (error) {
    console.error("[SETTINGS_PUT]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
