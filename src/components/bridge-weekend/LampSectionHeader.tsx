"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/aceternity/aurora-background";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

type LampSectionHeaderProps = {
  eyebrow: string;
  headline: string;
  subhead: string;
  microline: string;
  helperLine: string;
};

export function LampSectionHeader({
  eyebrow,
  headline,
  subhead,
  microline,
  helperLine,
}: LampSectionHeaderProps) {
  return (
    <AuroraBackground className="rounded-3xl px-6 py-16 text-center sm:px-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        viewport={{ once: true, amount: 0.6 }}
        className="relative mx-auto flex max-w-3xl flex-col gap-5"
      >
        <Text role="eyebrow" className="text-primary">
          {eyebrow}
        </Text>
        <Heading role="h1Hero">
          {headline}
        </Heading>
        <Text role="body" measure="tight" className="mx-auto text-body">
          {subhead}
        </Text>
        <div className="flex flex-col gap-2">
          <Text role="caption" as="span" className="font-medium text-heading">
            {microline}
          </Text>
          <Text role="caption" as="span" className="text-body">
            {helperLine}
          </Text>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
