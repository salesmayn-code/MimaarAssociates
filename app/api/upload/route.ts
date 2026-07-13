import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/admin"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import crypto from "crypto"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
}

export async function POST(req: Request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 }
      )
    }

    // Check MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed." },
        { status: 400 }
      )
    }

    // Generate unique filename
    const ext = MIME_TO_EXT[file.type] || ".jpg"
    const uniqueName = `${crypto.randomUUID()}${ext}`

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadDir, { recursive: true })

    // Write file to disk
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = path.join(uploadDir, uniqueName)
    await writeFile(filePath, buffer)

    return NextResponse.json(
      {
        success: true,
        url: `/uploads/${uniqueName}`,
        filename: uniqueName,
        size: file.size,
        type: file.type,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("[UPLOAD_POST]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
