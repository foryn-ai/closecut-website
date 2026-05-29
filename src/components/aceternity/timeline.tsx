"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type TimelineItem = {
  title: ReactNode;
  content: ReactNode;
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <section className={cn("relative py-10 sm:py-14", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="relative pl-8 sm:pl-10">
          <motion.div
            aria-hidden
            className="absolute bottom-2 left-2 top-2 w-[2px] sm:left-3"
            animate={{
              opacity: [0.65, 1, 0.65],
              boxShadow: [
                "0 0 0 rgba(107,127,109,0)",
                "0 0 14px rgba(107,127,109,0.4)",
                "0 0 0 rgba(107,127,109,0)",
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "rgba(107,127,109,0.95)",
            }}
          />
          <div
            aria-hidden
            className="absolute bottom-2 left-2 top-2 w-px bg-[rgba(107,127,109,0.95)] sm:left-3"
          />
          <div className="space-y-24 sm:space-y-32">
            {items.map((item, index) => (
              <motion.article
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.8, delay: Math.min(index * 0.06, 0.24), ease: "easeOut" }}
              >
                <div
                  aria-hidden
                  className="absolute -left-[1.72rem] top-3 h-3 w-3 rounded-full bg-primary shadow-[0_0_0_4px_rgba(107,127,109,0.2)] sm:-left-[2.2rem] sm:top-4 sm:h-3.5 sm:w-3.5"
                />
                <div className="rounded-2xl border border-border bg-surface-1 p-5 shadow-[0_18px_42px_var(--color-shadow)] sm:p-6">
                  <h2 className="t-h3">
                    {item.title}
                  </h2>
                  <div className="t-body mt-5 sm:mt-6">
                    {item.content}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
