import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { SITE_COPY } from "@/lib/copy";
import { listFurnitureAssets } from "@/lib/assets/furnitureCatalog";

export default async function FurniturePlaygroundPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const assets = await listFurnitureAssets();
  const copy = SITE_COPY.playgroundFurniture;

  return (
    <div className="min-h-screen bg-canvas">
      <PageShell>
        <section className="mx-auto max-w-6xl px-6 pb-8 pt-12 sm:pt-14">
          <Heading role="h1Page">{copy.title}</Heading>
          <Text role="body" className="mt-3 text-body">
            {copy.subtitle}
          </Text>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          {assets.length === 0 ? (
            <Text role="body">{copy.emptyLabel}</Text>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {assets.map((asset) => (
                <article
                  key={asset.filename}
                  className="rounded-2xl border border-border bg-surface-1 p-4 shadow-[0_14px_34px_var(--color-shadow)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface-2">
                    <Image
                      src={asset.src}
                      alt={asset.alt}
                      fill
                      className="object-contain p-3"
                      sizes="(min-width: 1024px) 20rem, (min-width: 768px) 44vw, 100vw"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <Text role="body" className="text-heading font-medium">
                      {asset.displayName}
                    </Text>
                    <Text role="bodySmall" className="text-body">
                      {copy.pathLabel}: {asset.src}
                    </Text>
                    <Text role="bodySmall" className="text-body">
                      {copy.altLabel}: {asset.alt}
                    </Text>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </PageShell>
    </div>
  );
}
