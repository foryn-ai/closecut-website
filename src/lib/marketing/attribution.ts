export type CampaignAttribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  landingPath?: string;
  referrer?: string;
};

const STORAGE_KEY = "tf_campaign_attribution_v1";

const URL_TO_MODEL_KEY: Record<string, keyof CampaignAttribution> = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_term: "utmTerm",
  utm_content: "utmContent",
};

function trimValue(value: string | null) {
  if (!value) return "";
  return value.trim();
}

function readStoredAttribution(): CampaignAttribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as CampaignAttribution;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeStoredAttribution(value: CampaignAttribution) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Ignore storage write errors.
  }
}

function readCurrentUrlAttribution(): Partial<CampaignAttribution> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const next: Partial<CampaignAttribution> = {};
  Object.entries(URL_TO_MODEL_KEY).forEach(([urlKey, modelKey]) => {
    const value = trimValue(params.get(urlKey));
    if (value) {
      next[modelKey] = value;
    }
  });
  return next;
}

export function captureCampaignAttribution() {
  if (typeof window === "undefined") return;
  const current = readCurrentUrlAttribution();
  const stored = readStoredAttribution();

  const merged: CampaignAttribution = {
    ...stored,
    ...current,
  };

  if (!merged.landingPath) {
    merged.landingPath = `${window.location.pathname}${window.location.search}`;
  }

  if (!merged.referrer && document.referrer) {
    merged.referrer = document.referrer;
  }

  writeStoredAttribution(merged);
}

export function getCampaignAttribution(): CampaignAttribution {
  if (typeof window === "undefined") return {};
  const stored = readStoredAttribution();
  const current = readCurrentUrlAttribution();
  return {
    ...stored,
    ...current,
  };
}

