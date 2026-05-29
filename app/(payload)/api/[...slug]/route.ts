import configPromise from "@payload-config";
import { NextResponse } from "next/server";
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from "@payloadcms/next/routes";

const cmsEnabled = () => false;
const notFound = () => NextResponse.json({ ok: false }, { status: 404 });

const payloadGet = REST_GET(configPromise);
const payloadPost = REST_POST(configPromise);
const payloadDelete = REST_DELETE(configPromise);
const payloadPatch = REST_PATCH(configPromise);
const payloadPut = REST_PUT(configPromise);
const payloadOptions = REST_OPTIONS(configPromise);

export async function GET(request: Request, context: any) {
  if (!cmsEnabled()) return notFound();
  return payloadGet(request, context);
}

export async function POST(request: Request, context: any) {
  if (!cmsEnabled()) return notFound();
  return payloadPost(request, context);
}

export async function DELETE(request: Request, context: any) {
  if (!cmsEnabled()) return notFound();
  return payloadDelete(request, context);
}

export async function PATCH(request: Request, context: any) {
  if (!cmsEnabled()) return notFound();
  return payloadPatch(request, context);
}

export async function PUT(request: Request, context: any) {
  if (!cmsEnabled()) return notFound();
  return payloadPut(request, context);
}

export async function OPTIONS(request: Request, context: any) {
  if (!cmsEnabled()) return notFound();
  return payloadOptions(request, context);
}
