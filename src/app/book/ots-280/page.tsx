import type { Metadata } from "next";
import Link from "next/link";
import ArtifactCard from "@/components/book/ArtifactCard";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import {
  CYBER_BOOK_CHAPTERS,
  CYBER_COURSE_CODE,
  CYBER_COURSE_PATH,
} from "@/lib/cyberSafety";

export const metadata: Metadata = {
  title: `${CYBER_COURSE_CODE} Course Book — OpenTeachStack`,
  description:
    "OTS-280 book-style table of contents for Cyber Safety for Educators.",
};

export default function Ots280BookPage() {
  return (
    <FieldGuidePage
      eyebrow={`${CYBER_COURSE_CODE} Course Book`}
      title="Cyber Safety for Educators"
      subtitle="A draft cyber safety course for teachers working in public, connected, AI-supported spaces."
      breadcrumbs={[{ label: "Book", href: "/book" }]}
      meta={[
        { label: "Course path", value: CYBER_COURSE_PATH },
        { label: "Course", value: CYBER_COURSE_CODE },
        { label: "Status", value: "Draft" },
        { label: "Review", value: "Human review still required" },
      ]}
    >
      <ArticleBody>
        <section className="book-spread">
          <div>
            <h2>Course Thesis</h2>
            <p>
              Teachers need calm, practical safety routines before they publish
              public sites, reuse accounts everywhere, paste information into
              AI tools, or invite the internet into their classroom workflow.
            </p>
            <p>
              This draft is open for review. Treat it as a working course, not
              a release claim: the human review pass still needs to check
              examples, classroom fit, source quality, and risk language.
            </p>
          </div>
          <ArtifactCard
            title="Teacher cyber safety plan"
            description="The course builds toward a private, maintainable safety plan for accounts, identity, public profiles, websites, repos, and incident response."
          />
        </section>

        <section>
          <h2>Chapter Table of Contents</h2>
          <ol className="divide-y divide-border border-y border-border">
            {CYBER_BOOK_CHAPTERS.map((chapter) => (
              <li
                key={chapter.slug}
                className="grid gap-3 py-4 md:grid-cols-[4.5rem_1fr_10rem]"
              >
                <span className="font-mono text-sm text-accent">
                  {chapter.number}
                </span>
                <span>
                  <Link
                    href={chapter.href}
                    className="block font-semibold text-foreground no-underline hover:text-accent"
                  >
                    {chapter.title}
                  </Link>
                  <span className="mt-1 block text-sm text-foreground/55">
                    {chapter.essentialQuestion}
                  </span>
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-foreground/40">
                  {chapter.difficulty}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <Link
          href={CYBER_BOOK_CHAPTERS[0]?.href ?? "/book"}
          className="book-action"
        >
          Start course
        </Link>
      </ArticleBody>
    </FieldGuidePage>
  );
}

