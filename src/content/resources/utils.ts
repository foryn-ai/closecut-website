import { RESOURCES } from "./resources";
import type { Resource, ResourceCategory } from "./types";

export function getAllResources(): Resource[] {
  return [...RESOURCES].sort((a, b) => a.title.localeCompare(b.title));
}

export function getResourceBySlug(slug: string): Resource | undefined {
  return RESOURCES.find((resource) => resource.slug === slug);
}

export function getRelatedResources(resource: Resource, limit = 3): Resource[] {
  const sourceTags = new Set(resource.tags);

  return RESOURCES.filter((candidate) => candidate.slug !== resource.slug)
    .map((candidate) => {
      const score = candidate.tags.reduce((acc, tag) => acc + Number(sourceTags.has(tag)), 0);
      return { candidate, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.candidate.title.localeCompare(b.candidate.title);
    })
    .filter((entry) => entry.score > 0)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export function getFilterOptions() {
  const categories = Array.from(
    new Set(RESOURCES.map((resource) => resource.category)),
  ) as ResourceCategory[];
  const tags = Array.from(new Set(RESOURCES.flatMap((resource) => resource.tags))).sort((a, b) =>
    a.localeCompare(b),
  );

  return {
    categories: categories.sort((a, b) => a.localeCompare(b)),
    tags,
  };
}
