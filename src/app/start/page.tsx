import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/siteMetadata";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";

export const metadata: Metadata = createPageMetadata({
  title: "Start Here If You Are Not Technical — OpenTeachStack",
  description:
    "A plain-language starting point for non-technical teachers using OpenTeachStack.",
  path: "/start",
});

const firstMoves = [
  "Pick one course or unit that is currently messy.",
  "Choose one standard, lesson, or recurring workflow.",
  "Use one template to make the work visible.",
  "Use AI only after you know what you are asking it to help with.",
  "Verify the result before it reaches students.",
];

export default function StartPage() {
  return (
    <FieldGuidePage
      eyebrow="Start Here"
      title="Start Here If You Are Not Technical"
      subtitle="You do not need to become a developer on day one. You do not need GitHub, DNS, a public website, or an automation script to start."
      breadcrumbs={[{ label: "Book", href: "/book" }]}
      meta={[
        { label: "Audience", value: "Non-technical teachers" },
        { label: "First course", value: "OTS-000" },
        { label: "Mode", value: "Plain-language start" },
      ]}
    >
      <ArticleBody>
      <section className="prose-academic">
        <h2>Here is the real problem</h2>
        <p>
          Most teachers are not struggling because they lack another app. They
          are struggling because the work is scattered: files in one place,
          links in another, standards in a PDF, prompts in a chat history, and
          assessments rebuilt from memory.
        </p>
        <p>
          OpenTeachStack starts with the tech stack orientation, then narrows
          into one course, one unit, and one workflow. Know the containers
          before you ask AI to improve the course content inside them.
        </p>
      </section>

      <section className="rounded-md border border-border bg-surface p-5">
        <h2 className="mb-3 font-heading text-xl font-bold text-foreground">
          Your first moves
        </h2>
        <ol className="space-y-3 pl-0">
          {firstMoves.map((move, index) => (
            <li key={move} className="flex gap-3 text-sm text-slate">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-accent/10 font-mono text-xs font-bold text-accent">
                {index + 1}
              </span>
              <span>{move}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="prose-academic">
        <h2>You do not need this site&apos;s tech stack to start</h2>
        <p>
          The official OpenTeachStack site is built with Next.js because it is
          an open-source project. That does not mean OTS-101 expects you to
          build with Next.js.
        </p>
        <p>
          OTS-000 handles the tool-stack orientation. OTS-101 starts the
          course-content work: prompts, templates, standards, sources,
          verification checks, student-facing lessons, and revision notes.
          Later pathway courses teach websites, automation, GitHub, and AI
          coding agents when you are ready.
        </p>
      </section>

      <section className="rounded-md border border-border bg-surface-alt/40 p-5">
        <h2 className="mb-3 font-heading text-xl font-bold text-foreground">
          Reality check
        </h2>
        <p className="m-0 text-sm leading-relaxed text-slate">
          AI can draft. You still decide what reaches students. If you cannot
          verify the source, the standard, the privacy risk, or the classroom
          use, do not teach it yet.
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/book/ots-000"
          className="inline-flex rounded-lg bg-[var(--color-text)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg)] no-underline hover:opacity-90"
        >
          Start OTS-000
        </Link>
        <Link
          href="/kb/templates"
          className="inline-flex rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground/70 no-underline transition-colors hover:border-accent hover:text-accent"
        >
          Open Templates
        </Link>
      </div>
      </ArticleBody>
    </FieldGuidePage>
  );
}


