"use client";

import { PlannerShell } from "@/components/bridge-weekend/PlannerShell";

type PlannerIslandProps = {
  initialPlanToken: string | null;
  initialIsShareView: boolean;
};

export function PlannerIsland({
  initialPlanToken,
  initialIsShareView,
}: PlannerIslandProps) {
  return (
    <PlannerShell
      initialPlanToken={initialPlanToken}
      initialIsShareView={initialIsShareView}
    />
  );
}
