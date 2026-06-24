import Link from "next/link";
import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { COURSE_TITLE } from "@/lib/metadata";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import PrintPageButton from "@/components/PrintPageButton";

export const metadata: Metadata = {
  title: `Labs — ${COURSE_TITLE}`,
  description:
    "Hands-on labs for the OpenTeachStack course. Build real tools and systems for your classroom.",
};

export default function LabsPage() {
  const labs = getAllContent("labs");

  return (
    <FieldGuidePage
      eyebrow={COURSE_TITLE}
      title="Labs"
      subtitle="Hands-on projects where you build real tools and systems for your classroom."
      breadcrumbs={[{ label: "Book", href: "/book" }]}
      meta={[
        { label: "Labs", value: String(labs.length) },
        { label: "Mode", value: "Hands-on workshops" },
        { label: "Status", value: "Compatibility archive" },
      ]}
    >
      <ArticleBody>
        <div className="mt-6" data-print-hide>
          <PrintPageButton />
        </div>

      <ul className="space-y-4">
        {labs.map((lab) => (
          <li key={lab.slug}>
            <Link
              href={`/labs/${lab.slug}`}
              className="group block rounded-md border border-border p-5 transition-colors hover:border-accent/40 hover:bg-surface-alt/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded-sm bg-accent/15 px-2 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-accent">
                      Lab
                    </span>
                    {lab.frontmatter.level && (
                      <span className="rounded-sm bg-surface-alt px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-slate">
                        {lab.frontmatter.level}
                      </span>
                    )}
                  </div>
                  <h2 className="font-heading text-lg font-semibold text-foreground group-hover:text-link transition-colors">
                    {lab.frontmatter.title}
                  </h2>
                  {lab.frontmatter.summary && (
                    <p className="mt-1 text-sm text-slate font-sans line-clamp-2">
                      {lab.frontmatter.summary}
                    </p>
                  )}
                </div>
              </div>

              {lab.frontmatter.duration && (
                <div className="mt-3 flex items-center gap-1.5 text-xs font-mono text-slate">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {lab.frontmatter.duration}
                </div>
              )}
            </Link>
          </li>
        ))}

        {labs.length === 0 && (
          <li className="py-12 text-center text-sm text-slate font-sans">
            No labs available yet. Check back soon.
          </li>
        )}
      </ul>
      </ArticleBody>
    </FieldGuidePage>
  );
}


