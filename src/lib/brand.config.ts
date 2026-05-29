// Brand configuration — the first file to update when spinning up a new site.
// See BRAND.md for the full setup checklist.
// These values are the structured inputs for BRAND_BRIEF.md and copy-draft generation.

// ---------------------------------------------------------------------------
// Identity
// ---------------------------------------------------------------------------

export const BRAND_NAME = "Therafox";

// NOTE: SITE_URL lives in src/lib/seo/siteMetadata.ts — update it there.
// All app code imports it from @/lib/seo/intensive (the facade).

// The licensed clinician or lead practitioner shown on the About page.
export const PRACTITIONER_NAME = "Anastasia Fox, LMFT, CST";

// One-line specialty description used in SEO and AI discovery context.
export const PRACTICE_SPECIALTY = "Couples therapy and private intensives";

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export const CITY = "Issaquah, WA";
export const ADDRESS = "160 NW Gilman Blvd, Suite 332, Issaquah, WA 98027";
export const PHONE = "425-961-9767";

// Standard individual/couple session rate shown on Billing page.
export const SESSION_RATE = "$250";

// ---------------------------------------------------------------------------
// Logo
// ---------------------------------------------------------------------------

// Path to the public/ logo directory (no trailing slash).
export const LOGO_PACK_DIR = "/therafox_logo_pack";

// Path to the wordmark SVG used in the header and footer.
export const WORDMARK_SRC = `${LOGO_PACK_DIR}/wordmark/therafox_wordmark_mar.svg`;

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------

// Google Ads conversion tracking ID (AW-XXXXXXXXX).
// Set to "" to disable Google Ads tracking.
export const ANALYTICS_CONVERSION_ID = "AW-18030433825";
