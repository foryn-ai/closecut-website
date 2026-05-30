"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { WORDMARK_SRC } from "@/lib/brand.config";
import { SITE_COPY } from "@/lib/copy";
import { focusRing, link as linkClass } from "@/lib/ui/classes";

export function SiteHeader() {
  const { nav } = SITE_COPY;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header className="relative z-50 w-full bg-canvas shadow-[0_10px_30px_var(--color-shadow)]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-2">
        <Link
          href="/"
          className={`inline-flex ${linkClass} ${focusRing}`}
        >
          <Image
            src={WORDMARK_SRC}
            alt={nav.brand}
            width={1280}
            height={720}
            className="h-10 w-auto"
            sizes="72px"
          />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex ${linkClass} ${focusRing}`}
            >
              <Text role="label" as="span" className="text-body">
                {link.label}
              </Text>
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <div>
            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="site-mobile-menu"
              aria-haspopup="menu"
              onClick={() => setIsMenuOpen((open) => !open)}
              className={`inline-flex min-h-10 items-center rounded-md px-3 cursor-pointer border border-border bg-surface-1 ${focusRing}`}
            >
              <Text role="label" as="span" className="text-body">
                {nav.menuLabel}
              </Text>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen ? (
        <>
          <button
            type="button"
            aria-label={nav.closeMenuLabel}
            className="fixed inset-0 z-40 bg-[rgba(45,55,72,0.18)] md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div
            id="site-mobile-menu"
            className="absolute inset-x-0 top-full z-50 border-t border-border bg-canvas px-6 pb-5 pt-4 shadow-[0_20px_50px_var(--color-shadow)] md:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label={nav.mobileNavLabel}>
              {nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex min-h-11 items-center rounded-md px-3 ${linkClass} ${focusRing}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Text role="label" as="span" className="text-body">
                    {link.label}
                  </Text>
                </Link>
              ))}
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
