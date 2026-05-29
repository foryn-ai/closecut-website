"use client";

import { useMemo, useState } from "react";
import type { Resource } from "@/content/resources/types";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import { SITE_COPY } from "@/lib/copy";

type ResourcesIndexProps = {
  resources: Resource[];
  categories: string[];
};

export function ResourcesIndex({ resources, categories }: ResourcesIndexProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const { resources: resourcesCopy } = SITE_COPY;

  const visibleResources = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const inCategory = category === "All" || resource.category === category;
      if (!inCategory) return false;
      if (!normalizedQuery) return true;
      const haystack = [
        resource.title,
        resource.summary,
        ...resource.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [category, query, resources]);

  return (
    <div className="space-y-8">
      <ResourceFilters
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
        query={query}
        onQueryChange={setQuery}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {visibleResources.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} />
        ))}
      </div>
      {visibleResources.length === 0 ? (
        <p className="t-body-sm text-body">{resourcesCopy.resultsEmpty}</p>
      ) : null}
    </div>
  );
}
