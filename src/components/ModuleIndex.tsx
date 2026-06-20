import Link from "next/link";
import { MODULES } from "@/lib/metadata";

export default function ModuleIndex() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
        Course Modules
      </h2>
      <p className="text-sm text-foreground/50 mb-8">
        {MODULES.length} modules &middot; Resource-guided curriculum
      </p>

      <ol className="space-y-0 divide-y divide-border border-t border-border">
        {MODULES.map((mod) => (
          <li key={mod.slug}>
            <Link
              href={`/course/${mod.slug}`}
              className="group flex gap-5 py-5 no-underline transition-colors hover:bg-surface-alt/50"
            >
              <span className="shrink-0 w-8 text-right font-mono text-sm font-medium text-accent/70 pt-0.5">
                {mod.number}
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-sans font-semibold text-foreground group-hover:text-link transition-colors m-0 leading-snug">
                  {mod.title}
                </h3>
                <p className="text-sm text-foreground/55 mt-1.5 mb-0 leading-relaxed">
                  {mod.description}
                </p>
                <p className="text-xs font-serif italic text-foreground/40 mt-1 mb-0">
                  {mod.essentialQuestion}
                </p>
                <p className="mt-3 mb-0 text-xs font-mono uppercase tracking-wider text-foreground/40">
                  Build:{" "}
                  <span className="text-foreground/65">
                    {mod.buildArtifact}
                  </span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
