import Link from "next/link";
import { EVIDENCE_TOPICS } from "@/lib/book";

export default function EvidencePanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {EVIDENCE_TOPICS.map((topic) => (
        <article
          key={topic.title}
          className="rounded-sm border border-border bg-surface/65 p-4"
        >
          <h3 className="m-0 border-none font-sans text-base font-semibold text-foreground">
            {topic.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/62">
            {topic.claim}
          </p>
          <p className="mt-3 font-mono text-[0.72rem] leading-relaxed text-foreground/42">
            {topic.sourceNote}
          </p>
          <Link
            href={topic.relatedPath}
            className="mt-4 inline-flex text-sm font-semibold text-link no-underline hover:underline"
          >
            Open related sources
          </Link>
        </article>
      ))}
    </div>
  );
}
