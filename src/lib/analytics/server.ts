export type ServerAnalyticsProps = Record<string, unknown>;

export function trackServerEvent(eventName: string, props: ServerAnalyticsProps = {}) {
  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", eventName, props);
  }
}
