"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* ── Collect headings on mount ──────────────────────────────────────── */
  useEffect(() => {
    let frameId: number | null = null;
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3, article h4")
    );

    const items: TocItem[] = elements
      .filter((el) => el.id)
      .map((el) => ({
        id: el.id,
        text: el.textContent?.trim() ?? "",
        level: parseInt(el.tagName.substring(1), 10),
      }));

    frameId = window.requestAnimationFrame(() => {
      setHeadings(items);

      if (items.length > 0) {
        setActiveId(items[0].id);
      }
    });

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  /* ── Intersection observer for scroll tracking ─────────────────────── */
  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      // Find the first heading that is intersecting (visible)
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top
        );

      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    },
    []
  );

  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headings, handleIntersect]);

  /* ── Don't render if no headings found ──────────────────────────────── */
  if (headings.length === 0) return null;

  return (
    <nav
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
      aria-label="Table of contents"
    >
      <h2 className="text-xs font-sans font-semibold uppercase tracking-widest text-foreground/40 mb-3 border-none m-0 p-0">
        On this page
      </h2>
      <ul className="space-y-0.5 border-l border-border">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const indent =
            heading.level === 2
              ? "pl-4"
              : heading.level === 3
                ? "pl-7"
                : "pl-10";

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`
                  block py-1.5 text-[0.8125rem] leading-snug no-underline transition-colors
                  ${indent}
                  ${
                    isActive
                      ? "text-link font-medium border-l-2 border-link -ml-px"
                      : "text-foreground/45 hover:text-foreground/70"
                  }
                `}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
