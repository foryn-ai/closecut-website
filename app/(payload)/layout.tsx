import configPromise from "@payload-config";
import { RootLayout, handleServerFunctions, metadata } from "@payloadcms/next/layouts";
import { notFound } from "next/navigation";
import { importMap } from "./cms/importMap";
import "@payloadcms/next/css";

export { metadata };

const serverFunction = async (args: {
  args: Record<string, unknown>;
  name: string;
}) => {
  "use server";

  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  });
};

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  notFound();

  return RootLayout({
    children,
    config: configPromise,
    importMap,
    serverFunction,
  });
}
