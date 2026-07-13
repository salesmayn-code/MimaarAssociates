import { db } from "@/lib/db"
import { ProjectsManager } from "@/components/admin/projects-manager"
export default async function ProjectsPage() { const projects = await db.project.findMany({ include: { images: { orderBy: { order: "asc" } } }, orderBy: { createdAt: "desc" } }); return <ProjectsManager initialProjects={projects} /> }
