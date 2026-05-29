const DEFAULT_SHEET_NAME = "events_raw";

const ANALYTICS_HEADERS = [
  "timestamp",
  "event_name",
  "path",
  "query",
  "referrer",
  "approx_visitor_key",
  "ip_bucket",
  "ua_family",
  "result_type",
  "step_id",
  "step_index",
  "cta_clicked",
  "payload_json",
] as const;

type AnalyticsRow = {
  timestamp: string;
  eventName: string;
  path: string;
  query: string;
  referrer: string;
  approxVisitorKey: string;
  ipBucket: string;
  uaFamily: string;
  resultType: string;
  stepId: string;
  stepIndex: string;
  ctaClicked: string;
  payloadJson: string;
};

function getAppsScriptConfig() {
  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_ANALYTICS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_APPS_SCRIPT_ANALYTICS_SECRET;
  const sheetName = process.env.GOOGLE_SHEETS_ANALYTICS_SHEET_NAME || DEFAULT_SHEET_NAME;

  if (!webhookUrl) {
    return null;
  }

  return {
    webhookUrl,
    secret,
    sheetName,
  };
}

export async function appendAnalyticsRow(row: AnalyticsRow) {
  const config = getAppsScriptConfig();
  if (!config) return false;

  const response = await fetch(config.webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      secret: config.secret ?? "",
      sheetName: config.sheetName,
      headers: ANALYTICS_HEADERS,
      row: [
        row.timestamp,
        row.eventName,
        row.path,
        row.query,
        row.referrer,
        row.approxVisitorKey,
        row.ipBucket,
        row.uaFamily,
        row.resultType,
        row.stepId,
        row.stepIndex,
        row.ctaClicked,
        row.payloadJson,
      ],
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Apps Script analytics delivery failed with status ${response.status}`);
  }

  return true;
}
