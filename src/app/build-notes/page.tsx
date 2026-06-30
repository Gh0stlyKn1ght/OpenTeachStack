import type { Metadata } from "next";
import Link from "next/link";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import { getPublishedBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Build Notes — OpenTeachStack",
  description:
    "Reviewed build logs, mistake logs, course architecture notes, and lessons learned while building OpenTeachStack.",
};

export default function BuildNotesPage() {
  const posts = getPublishedBlogPosts("build-notes");
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <FieldGuidePage
      eyebrow="Build Notes"
      title="The messy build journal."
      subtitle="Mistakes, fixes, architecture decisions, and course-writing lessons from building OpenTeachStack."
      breadcrumbs={[{ label: "Start", href: "/book/ots-000" }]}
    >
      <ArticleBody>
        {featured ? (
          <div className="grid gap-8">
            <article className="rounded-2xl border border-border bg-surface/80 p-6 shadow-[0_18px_50px_color-mix(in_srgb,var(--color-green)_10%,transparent)]">
              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.12em] text-green">
                <span>{featured.category}</span>
                <span>{featured.readingTime}</span>
                <time dateTime={featured.date}>{featured.date}</time>
              </div>
              <h2 className="mb-4 mt-0 max-w-3xl border-none pb-0 font-heading text-3xl font-extrabold leading-tight text-heading sm:text-4xl">
                <Link
                  href={`/build-notes/${featured.slug}`}
                  className="no-underline transition-colors hover:text-link"
                >
                  {featured.title}
                </Link>
              </h2>
              {featured.summary ? (
                <p className="mb-5 max-w-2xl text-base leading-relaxed text-foreground/68">
                  {featured.summary}
                </p>
              ) : null}
              <Link href={`/build-notes/${featured.slug}`} className="book-action-secondary">
                Read the build note
              </Link>
            </article>

            {rest.length ? (
              <section>
                <h2 className="mb-4 mt-0 border-none pb-0 text-2xl">More build notes</h2>
                <ol className="grid list-none gap-4 pl-0">
                  {rest.map((post) => (
                    <li key={post.slug}>
                      <article className="rounded-xl border border-border bg-surface/65 p-5 transition-colors hover:border-accent">
                        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-foreground/45">
                          <span>{post.category}</span>
                          <span>{post.readingTime}</span>
                          <time dateTime={post.date}>{post.date}</time>
                        </div>
                        <h3 className="mb-2 mt-0 font-heading text-xl font-bold text-foreground">
                          <Link
                            href={`/build-notes/${post.slug}`}
                            className="no-underline transition-colors hover:text-link"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        {post.summary ? (
                          <p className="mb-0 text-sm leading-relaxed text-foreground/62">
                            {post.summary}
                          </p>
                        ) : null}
                      </article>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
          </div>
        ) : (
          <div className="rounded-md border border-border bg-surface p-5">
            <h2 className="mt-0 border-none pb-0">No build notes yet</h2>
            <p>
              Build notes will appear here when a mistake, fix, or architecture
              lesson is ready to share publicly.
            </p>
          </div>
        )}
      </ArticleBody>
    </FieldGuidePage>
  );
}
