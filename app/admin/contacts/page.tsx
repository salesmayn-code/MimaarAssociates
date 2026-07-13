import { db } from "@/lib/db"
import { ContactsManager } from "@/components/admin/contacts-manager"
export default async function ContactsPage() { const contacts = await db.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }); return <ContactsManager initialContacts={contacts} /> }
