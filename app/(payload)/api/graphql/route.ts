import configPromise from "@payload-config";
import { NextResponse } from "next/server";
import { GRAPHQL_PLAYGROUND_GET, GRAPHQL_POST } from "@payloadcms/next/routes";

const cmsEnabled = () => false;
const notFound = () => NextResponse.json({ ok: false }, { status: 404 });

const graphqlGet = GRAPHQL_PLAYGROUND_GET(configPromise);
const graphqlPost = GRAPHQL_POST(configPromise);

export async function GET(request: Request) {
  if (!cmsEnabled()) return notFound();
  return graphqlGet(request);
}

export async function POST(request: Request) {
  if (!cmsEnabled()) return notFound();
  return graphqlPost(request);
}
