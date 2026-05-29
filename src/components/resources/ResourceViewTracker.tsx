"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/adapter";

type ResourceViewTrackerProps = {
  slug: string;
  category: string;
};

export function ResourceViewTracker({ slug, category }: ResourceViewTrackerProps) {
  useEffect(() => {
    track("resource_view", { slug, category });
  }, [category, slug]);

  return null;
}
