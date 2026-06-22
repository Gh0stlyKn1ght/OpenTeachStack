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
          {topic.metricLabel && topic.metricValue ? (
            <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-wider text-foreground/55">
              {topic.metricLabel}: {topic.metricValue}
            </p>
          ) : null}
          {topic.evidenceSource?.length ? (
            <div className="mt-2">
              <p className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/55">
                Evidence Sources
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-foreground/62">
                {topic.evidenceSource.map((source) => (
                  <li key={`${topic.title}-${source.label}`}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <p className="mt-3 font-mono text-[0.72rem] leading-relaxed text-foreground/42">
            {topic.sourceNote}
          </p>
          <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-wider text-foreground/45">
            Last verified: {topic.lastVerified}
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
