"use client";

export default function VideoFilters({
  categories,
  activeCategory,
  onChange,
}: {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Video topics">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`rounded-sm border px-3 py-2 text-sm font-semibold transition-colors ${
            activeCategory === category
              ? "border-accent bg-accent text-[var(--color-on-accent)]"
              : "border-border bg-surface text-foreground/70 hover:border-accent/50 hover:text-foreground"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
