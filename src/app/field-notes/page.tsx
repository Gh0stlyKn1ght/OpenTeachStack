import type { Metadata } from "next";
import Link from "next/link";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Field Notes — Open TeachStack",
  description:
    "Essays, reflections, and observations from the development of Open TeachStack.",
};

export default function FieldNotesPage() {
  const notes = getAllContent("field-notes");

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-normal text-foreground mb-3">
          Field Notes
        </h1>
        <p className="text-foreground/60 leading-relaxed max-w-2xl">
          Essays, reflections, and observations from the field. These are not
          lessons or tutorials&mdash;they are working notes on the ideas,
          decisions, and discoveries that shaped this course.
        </p>
      </header>

      <hr className="border-t border-border mb-10" />

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

                <h2 className="font-serif text-lg font-semibold text-foreground mb-2 border-none mt-0 pb-0">
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
    </div>
  );
}
