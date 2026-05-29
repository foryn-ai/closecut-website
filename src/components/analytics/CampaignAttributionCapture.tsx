"use client";

import { useEffect } from "react";
import { captureCampaignAttribution } from "@/lib/marketing/attribution";

export function CampaignAttributionCapture() {
  useEffect(() => {
    captureCampaignAttribution();
  }, []);

  return null;
}

