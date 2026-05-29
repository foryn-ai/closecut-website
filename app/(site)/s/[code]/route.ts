import { NextResponse } from "next/server";
import { isValidShortCode, readShareShortLink } from "@/lib/fortyEight/shareLinkStore";

type Params = {
  params: Promise<{ code: string }>;
};

export async function GET(request: Request, context: Params) {
  const { code } = await context.params;
  const normalizedCode = code.toUpperCase();

  if (!isValidShortCode(normalizedCode)) {
    return NextResponse.redirect(new URL("/intensive", request.url), 302);
  }

  const targetPath = await readShareShortLink(normalizedCode);
  if (!targetPath) {
    return NextResponse.redirect(new URL("/intensive", request.url), 302);
  }

  return NextResponse.redirect(new URL(targetPath, request.url), 302);
}
