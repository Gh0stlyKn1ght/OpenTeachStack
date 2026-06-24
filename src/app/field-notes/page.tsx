import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/content";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import PrintPageButton from "@/components/PrintPageButton";

export const metadata: Metadata = {
  title: "Field Notes — OpenTeachStack",
  description:
    "Essays, reflections, and observations from the development of OpenTeachStack.",
};

export default function FieldNotesPage() {
  const notes = getAllContent("field-notes");

  return (
    <FieldGuidePage
      eyebrow="Project Field Notes"
      title="Field Notes"
      subtitle="Essays, reflections, and observations from the field. These are working notes on the ideas, decisions, and discoveries that shaped this course."
      breadcrumbs={[{ label: "Knowledge Base Library", href: "/kb/library" }]}
      meta={[
        { label: "Notes", value: String(notes.length) },
        { label: "Mode", value: "Reflection" },
        { label: "Best voice", value: "Teacher-builder" },
      ]}
    >
      <ArticleBody>
        <div className="mt-6" data-print-hide>
          <PrintPageButton />
        </div>

      {/* ── Notes list ───────────────────────────────────────────────── */}
      {notes.length > 0 ? (
        <ol className="space-y-0 divide-y divide-border list-none pl-0">
          {notes.map((note) => (
            <li key={note.slug} className="py-6 first:pt-0 last:pb-0">
              <article>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-foreground/40 mb-2">
                  {note.frontmatter.date && (
                    <time dateTime={note.frontmatter.date}>
                      {new Date(note.frontmatter.date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </time>
                  )}
                  <span>{note.readingTime.text}</span>
                </div>

                <h2 className="font-heading text-lg font-semibold text-foreground mb-2 border-none mt-0 pb-0">
                  <Link
                    href={`/field-notes/${note.slug}`}
                    className="no-underline hover:text-link transition-colors"
                  >
                    {note.frontmatter.title}
                  </Link>
                </h2>

                {note.frontmatter.summary && (
                  <p className="text-sm text-foreground/60 leading-relaxed mb-0">
                    {note.frontmatter.summary}
                  </p>
                )}
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <div className="py-16 text-center">
          <p className="text-foreground/40 text-sm">
            No field notes published yet. Check back soon.
          </p>
        </div>
      )}
      </ArticleBody>
    </FieldGuidePage>
  );
}


