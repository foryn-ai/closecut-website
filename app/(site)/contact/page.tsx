import { ContactPageClient } from "@/components/contact/ContactPageClient";
import { SITE_COPY } from "@/lib/copy";
import { getClinicianCopyGlobal, resolveContactCopy } from "@/lib/copy/clinicianCms";

export default async function ContactPage() {
  const cmsCopy = await getClinicianCopyGlobal();
  const contact = resolveContactCopy(SITE_COPY.contact, cmsCopy);

  return <ContactPageClient contact={contact} />;
}
