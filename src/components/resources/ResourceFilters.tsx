"use client";

import { SITE_COPY } from "@/lib/copy";
import { chip, chipSelected, input } from "@/lib/ui/classes";

type ResourceFiltersProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  query: string;
  onQueryChange: (query: string) => void;
};

export function ResourceFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  query,
  onQueryChange,
}: ResourceFiltersProps) {
  const { resources: resourcesCopy } = SITE_COPY;

  return (
    <div className="space-y-4">
      <label className="sr-only" htmlFor="resources-search">
        {resourcesCopy.searchLabel}
      </label>
      <input
        id="resources-search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={resourcesCopy.searchPlaceholder}
        className={input}
      />
      <div className="flex flex-wrap items-center gap-2" aria-label={resourcesCopy.filterLabel}>
        <span className="text-sm font-medium text-heading">{resourcesCopy.filterLabel}</span>
        <button
          type="button"
          className={selectedCategory === "All" ? chipSelected : chip}
          onClick={() => onCategoryChange("All")}
        >
          {resourcesCopy.filterAllLabel}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={selectedCategory === category ? chipSelected : chip}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
