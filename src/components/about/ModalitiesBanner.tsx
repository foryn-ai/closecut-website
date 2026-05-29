"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IconBadge } from "@/components/shared/IconBadge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

type ModalityItem = {
  id: string;
  title: string;
  iconSrc: string;
  description: string;
};

type ModalitiesBannerProps = {
  title: string;
  intro: string;
  modalities: ModalityItem[];
};

const easing = [0.22, 1, 0.36, 1] as const;

export function ModalitiesBanner({
  title,
  intro,
  modalities,
}: ModalitiesBannerProps) {
  const [activeId, setActiveId] = useState(modalities[0]?.id ?? "");
  const activeItem = modalities.find((item) => item.id === activeId) ?? modalities[0];

  if (!activeItem) {
    return null;
  }

  return (
    <section className="tf-rule-section mx-auto max-w-6xl px-6 pb-8">
      <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-[0_18px_45px_var(--color-shadow)] sm:p-8">
        <div className="text-center">
          <Heading role="h2">{title}</Heading>
          <Text role="bodySmall" className="mx-auto mt-3 max-w-2xl text-body">
            {intro}
          </Text>
        </div>

        <div
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="tablist"
          aria-label={title}
        >
          {modalities.map((item) => {
            const isActive = item.id === activeItem.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`modality-panel-${item.id}`}
                onMouseEnter={() => setActiveId(item.id)}
                onFocus={() => setActiveId(item.id)}
                onClick={() => setActiveId(item.id)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  isActive
                    ? "border-primary bg-surface-2"
                    : "border-border bg-canvas hover:border-primary/60 hover:bg-surface-2"
                }`}
              >
                <IconBadge src={item.iconSrc} size={32} className="mx-auto" />
                <Text role="bodySmall" className="mt-2 text-center text-heading">
                  {item.title}
                </Text>
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeItem.id}
          id={`modality-panel-${activeItem.id}`}
          role="tabpanel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          className="mt-5 rounded-xl border border-border bg-surface-2 p-5 sm:p-6"
        >
          <div className="flex items-center gap-3">
            <IconBadge src={activeItem.iconSrc} size={32} />
            <Heading role="h3">{activeItem.title}</Heading>
          </div>
          <Text role="body" className="mt-3 text-body">
            {activeItem.description}
          </Text>
        </motion.div>
      </div>
    </section>
  );
}
