import Link from "next/link";
import Image from "next/image";
import { WORDMARK_SRC } from "@/lib/brand.config";
import { SITE_COPY } from "@/lib/copy";
import { Text } from "@/components/ui/Text";
import { ctaClass } from "@/components/shared/cta";

export function SiteFooter() {
  const { footer, nav } = SITE_COPY;

  return (
    <footer className="w-full border-t border-border bg-surface-1">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-6 py-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
        <div className="flex w-full flex-col items-start gap-4 md:w-auto md:flex-row md:flex-wrap md:items-center md:gap-6 lg:gap-8">
          <Link href="/" aria-label={nav.brand} className="inline-flex shrink-0">
            <Image
              src={WORDMARK_SRC}
              alt={nav.brand}
              width={1280}
              height={720}
              className="block h-8 w-auto"
              sizes="57px"
            />
          </Link>
          <div className="flex flex-col items-start gap-0.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
            <Text role="eyebrow" as="span" className="text-primary">
              {footer.locationsLabel}
            </Text>
            <Text role="fine" as="span" className="text-body">
              {footer.locationsText}
            </Text>
          </div>
          <div className="flex flex-col items-start gap-0.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
            <Text role="eyebrow" as="span" className="text-primary">
              {footer.contactLabel}
            </Text>
            <Text role="fine" as="span" className="text-body">
              {footer.contactText}
            </Text>
          </div>
        </div>
        <Link
          className={ctaClass(
            "primary",
            "w-full !bg-[var(--accent-warm)] !text-canvas hover:!bg-[#b85f36] md:w-auto",
          )}
          href={footer.ctaHref}
        >
          {footer.ctaLabel}
        </Link>
      </div>
    </footer>
  );
}
