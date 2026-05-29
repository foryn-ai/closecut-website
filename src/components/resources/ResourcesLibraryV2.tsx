"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { track } from "@/lib/analytics/adapter";
import type { SiteCopyShape } from "@/lib/copy/types";
import { SurfaceCard } from "@/components/shared/SurfaceCard";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ctaClass } from "@/components/shared/cta";
import { chip, chipSelected } from "@/lib/ui/classes";

type BookCoverProps = {
  src: string;
  alt: string;
  loading?: "eager" | "lazy";
  priority?: boolean;
};

function BookCover({ src, alt, loading = "lazy", priority = false }: BookCoverProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-border bg-surface-2">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
        sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 92vw"
        loading={loading}
        priority={priority}
        onError={() => setImageSrc("/furniture/books.svg")}
      />
    </div>
  );
}

type ResourcesLibraryV2Props = {
  resources: SiteCopyShape["resources"];
};

export function ResourcesLibraryV2({ resources }: ResourcesLibraryV2Props) {
  const [selectedTag, setSelectedTag] = useState("all");
  const sortedTags = useMemo(
    () => [...resources.booksTags].sort((a, b) => a.label.localeCompare(b.label)),
    [resources.booksTags],
  );
  const tagLookup = useMemo(
    () => new Map(sortedTags.map((tag) => [tag.id, tag.label])),
    [sortedTags],
  );

  const visibleBooks = useMemo(() => {
    return resources.booksCatalog
      .filter(
        (book) =>
          book.hookTags.length > 0 &&
          book.coverSrc.trim().length > 0 &&
          book.linkHref.trim().length > 0 &&
          (selectedTag === "all" || book.hookTags.includes(selectedTag)),
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [resources.booksCatalog, selectedTag]);

  const gridBooks = visibleBooks;

  const handleBookClick = (book: { id: string; title: string; hookTags: string[] }) => {
    track("resource_book_click", {
      book_id: book.id,
      book_title: book.title,
      selected_tag: selectedTag,
      hook_tags: book.hookTags.join(","),
      placement: "grid",
    });
  };

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <Heading role="h2">{resources.emergencyTitle}</Heading>
        <Text role="body" className="text-body" measure="narrow">
          {resources.emergencyIntro}
        </Text>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {resources.emergencyCards.map((card) => (
            <SurfaceCard key={card.title} className="h-full p-4">
              <Heading role="h4">{card.title}</Heading>
              <Text role="caption" className="mt-2 text-body">
                {card.description}
              </Text>
              <Link
                href={card.ctaHref}
                target={card.ctaHref.startsWith("http") ? "_blank" : undefined}
                rel={card.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`${ctaClass("secondary")} mt-3 inline-flex`}
              >
                {card.ctaLabel}
              </Link>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <Heading role="h2">{resources.booksTitle}</Heading>
        <div className="flex flex-wrap items-center gap-2" aria-label={resources.booksTagLabel}>
          <button
            type="button"
            onClick={() => setSelectedTag("all")}
            className={selectedTag === "all" ? chipSelected : chip}
          >
            {resources.booksFilterAllLabel}
          </button>
          {sortedTags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => setSelectedTag(tag.id)}
              className={selectedTag === tag.id ? chipSelected : chip}
            >
              {tag.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gridBooks.map((book) => (
            <SurfaceCard key={book.id} className="h-full">
              <BookCover src={book.coverSrc} alt={book.coverAlt} />
              <Heading role="h4" className="mt-4">
                {book.title}
              </Heading>
              <Text role="bodySmall" className="mt-2 text-body">
                {book.author}
              </Text>
              <div className="mt-3 flex flex-wrap gap-2">
                {book.hookTags.map((tagId) => {
                  return (
                    <span key={`${book.id}-${tagId}`} className={chip}>
                      {tagLookup.get(tagId) ?? tagId}
                    </span>
                  );
                })}
              </div>
              <Link
                href={book.linkHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleBookClick(book)}
                className={`${ctaClass("secondary")} mt-4 inline-flex`}
                aria-label={`${book.linkLabel}: ${book.title}`}
              >
                {book.linkLabel}
              </Link>
            </SurfaceCard>
          ))}
        </div>
        {gridBooks.length === 0 ? (
          <Text role="bodySmall" className="text-body">
            {resources.booksEmptyLabel}
          </Text>
        ) : null}
      </section>
    </div>
  );
}
