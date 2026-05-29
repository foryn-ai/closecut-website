import { NextResponse } from "next/server";
import { createShareShortLink } from "@/lib/fortyEight/shareLinkStore";

type SharePayload = {
  targetPath?: unknown;
};

function trimString(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function isValidTargetPath(path: string) {
  const startsWithAllowedPath =
    path.startsWith("/intensive?") || path.startsWith("/48-hours?");
  if (!startsWithAllowedPath) return false;
  if (path.includes("\n") || path.includes("\r")) return false;
  if (path.length > 5000) return false;

  try {
    const parsed = new URL(path, "https://example.com");
    const plan = parsed.searchParams.get("plan");
    const view = parsed.searchParams.get("view");
    return Boolean(plan) && view === "share";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let payload: SharePayload;
  try {
    payload = (await request.json()) as SharePayload;
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_payload" }, { status: 400 });
  }

  const targetPath = trimString(payload.targetPath);
  if (!isValidTargetPath(targetPath)) {
    return NextResponse.json({ ok: false, code: "invalid_target_path" }, { status: 422 });
  }

  try {
    const code = await createShareShortLink(targetPath);
    const origin = new URL(request.url).origin;
    return NextResponse.json(
      {
        ok: true,
        code,
        shortUrl: `${origin}/s/${code}`,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { ok: false, code: "short_link_unavailable" },
      { status: 503 },
    );
  }
}
