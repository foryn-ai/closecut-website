import { permanentRedirect } from "next/navigation";

type LegacyFortyEightHoursPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LegacyFortyEightHoursPage({
  searchParams,
}: LegacyFortyEightHoursPageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") {
      query.set(key, value);
      continue;
    }
    if (Array.isArray(value)) {
      value.forEach((entry) => query.append(key, entry));
    }
  }

  const suffix = query.toString();
  permanentRedirect(suffix ? `/intensive?${suffix}` : "/intensive");
}
