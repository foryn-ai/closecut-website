import type { Metadata } from "next";
import { getResourcesIndexMetadata } from "@/lib/seo/resources";

export const metadata: Metadata = getResourcesIndexMetadata();

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
