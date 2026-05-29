export type AnalyticsProps = Record<string, unknown>;

type GtagFn = (command: "event", eventName: string, props?: AnalyticsProps) => void;
type PlausibleFn = (eventName: string, options?: { props?: AnalyticsProps }) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    plausible?: PlausibleFn;
  }
}

function postFirstPartyEvent(eventName: string, props: AnalyticsProps) {
  if (typeof window === "undefined") return;

  const payload = JSON.stringify({
    eventName,
    props,
    path: window.location.pathname,
    query: window.location.search,
    referrer: document.referrer,
  });

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const blob = new Blob([payload], { type: "application/json" });
    navigator.sendBeacon("/api/analytics", blob);
    return;
  }

  void fetch("/api/analytics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
    keepalive: true,
  });
}

export function track(eventName: string, props: AnalyticsProps = {}) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, props);
  }

  if (typeof window.plausible === "function") {
    window.plausible(eventName, { props });
  }

  postFirstPartyEvent(eventName, props);
}
