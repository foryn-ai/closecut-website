"use client";

import { IconBadge } from "@/components/shared/IconBadge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

type AreaOfInterestItem = {
  id: string;
  title: string;
  iconSrc: string;
  description: string;
};

type AreasOfInterestBannerProps = {
  title: string;
  intro: string;
  items: AreaOfInterestItem[];
};

export function AreasOfInterestBanner({
  title,
  intro,
  items,
}: AreasOfInterestBannerProps) {
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-4 pt-0 sm:pb-6">
      <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-[0_18px_45px_var(--color-shadow)] sm:p-8">
        <div className="text-center">
          <Heading role="h2">{title}</Heading>
          <Text role="bodySmall" className="mx-auto mt-3 max-w-2xl text-body">
            {intro}
          </Text>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label={title}>
          {items.map((item) => {
            return (
              <div
                key={item.id}
                className="rounded-xl border border-border bg-canvas p-4 text-left"
              >
                <IconBadge src={item.iconSrc} size={32} className="mx-auto" />
                <Text role="bodySmall" className="mt-2 text-center text-heading">
                  {item.title}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
