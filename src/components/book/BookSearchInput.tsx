"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import type { SearchRecord } from "@/lib/search";

interface BookSearchInputProps {
  records: SearchRecord[];
  label?: string;
  placeholder?: string;
}

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function searchableText(record: SearchRecord) {
  return normalize(
    [
      record.title,
      record.eyebrow,
      record.description,
      ...record.keywords,
    ].join(" "),
  );
}

export default function BookSearchInput({
  records,
  label = "Search book",
  placeholder = "Prompt, source, rubric...",
}: BookSearchInputProps) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const normalizedQuery = normalize(query);
  const results = useMemo(() => {
    if (normalizedQuery.length < 2) return [];

    return records
      .filter((record) => searchableText(record).includes(normalizedQuery))
      .slice(0, 6);
  }, [normalizedQuery, records]);

  return (
    <div className="rounded-sm border border-border bg-surface px-3 py-2">
      <label
        htmlFor={inputId}
        className="mb-1 block font-mono text-[0.65rem] uppercase tracking-widest text-foreground/40"
      >
        {label}
      </label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/35"
      />
      {normalizedQuery.length >= 2 && (
        <div className="mt-3 border-t border-border pt-2" role="status">
          {results.length > 0 ? (
            <ol className="space-y-1">
              {results.map((result) => (
                <li key={`${result.href}-${result.title}`}>
                  <Link
                    href={result.href}
                    className="block rounded-sm px-2 py-2 no-underline transition-colors hover:bg-surface-alt"
                  >
                    <span className="block font-mono text-[0.62rem] uppercase tracking-widest text-accent">
                      {result.eyebrow}
                    </span>
                    <span className="block text-sm font-semibold leading-snug text-foreground">
                      {result.title}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-xs leading-snug text-foreground/52">
                      {result.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <p className="px-2 py-2 text-xs text-foreground/50">
              No matches yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
