import type { Metadata } from "next";
import Link from "next/link";
import EvidencePanel from "@/components/book/EvidencePanel";
import BookSearchInput from "@/components/book/BookSearchInput";
import TransferableSkillsMap from "@/components/book/TransferableSkillsMap";
import GitHubIcon from "@/components/GitHubIcon";
import { METHOD_STEPS } from "@/lib/book";
import { PATHWAY_COURSES, REPOSITORY_URL } from "@/lib/metadata";
import { getKnowledgeBaseSearchRecords } from "@/lib/search";
import { createPageMetadata } from "@/lib/siteMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Teaching Teachers — Curriculum Systems for Educators",
  description:
    "An open-source field guide for teachers building source-backed curriculum systems, AI workflows, course books, templates, and classroom-ready artifacts.",
  path: "/",
});

export default function HomePage() {
  const pathwayPreview = PATHWAY_COURSES.slice(0, 6);
  const knowledgeBaseSearchRecords = getKnowledgeBaseSearchRecords();

  return (
    <div>
      <section className="mx-auto grid min-h-[calc(100svh-4rem)] w-[min(100%-1.5rem,96rem)] grid-cols-1 gap-10 py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Teaching Teachers
          </p>
          <h1 className="max-w-5xl font-serif text-5xl font-extrabold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            A field guide for educators entering the tech world.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-foreground/65">
            Teachers are expected to use AI, websites, digital tools,
            cybersecurity habits, and source-backed curriculum workflows
            without being taught the system behind the work.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/kb" className="book-action">
              Search the knowledge base
            </Link>
            <Link href="/book/ots-101" className="book-action">
              Enter the course book
            </Link>
            <Link href="/evidence" className="book-action-secondary">
              See why it matters
            </Link>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub repository"
              className="inline-flex h-12 w-12 items-center justify-center rounded-sm border border-border text-foreground no-underline transition-colors hover:border-accent hover:text-accent"
            >
              <GitHubIcon className="h-5 w-5" title="" />
            </a>
          </div>
        </div>

        <aside className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Book Index
          </p>
          <nav aria-label="Homepage book index">
            <ol className="space-y-3">
              {[
                ["Foundations", "/book/ots-101"],
                ["Knowledge Base", "/kb"],
                ["Transferable Skills", "/skills"],
                ["Evidence Layer", "/evidence"],
                ["Source Bank", "/library/source-bank"],
                ["Release Packet", "/course/release"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block border-b border-border py-2 text-lg text-foreground no-underline transition-colors hover:text-accent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </section>

      <section className="border-y border-border bg-surface-alt/18">
        <div className="mx-auto grid w-[min(100%-1.5rem,96rem)] gap-8 py-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(20rem,0.72fr)] lg:items-center">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
              Knowledge Base
            </p>
            <h2 className="mt-0 max-w-3xl font-serif text-4xl font-bold text-foreground">
              Search the field manual when you need the next useful move.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/62">
              Look up prompts, checklists, cyber safety notes, course website
              steps, free tools, templates, and troubleshooting guides without
              entering a full course first.
            </p>
            <Link href="/kb" className="mt-6 inline-flex text-sm font-semibold text-link no-underline hover:underline">
              Open the Knowledge Base
            </Link>
          </div>

          <div>
            <BookSearchInput
              records={knowledgeBaseSearchRecords}
              label="Search knowledge base"
              placeholder="Prompt, checklist, workflow..."
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface-alt/22">
        <div className="mx-auto w-[min(100%-1.5rem,96rem)] py-12">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Signature Method
          </p>
          <div className="method-chain">
            {METHOD_STEPS.map((step) => (
              <span key={step}>{step}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-[min(100%-1.5rem,96rem)] gap-10 py-16 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
            The Real Problem
          </p>
          <h2 className="mt-0 font-serif text-4xl font-bold text-foreground">
            Teachers need systems, not another pile of tools.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/62">
            Teaching Teachers starts with the work teachers already do:
            planning, prompting, checking sources, aligning standards, building
            assessments, organizing files, publishing resources, and improving
            curriculum after class.
          </p>
          <Link href="/book" className="mt-6 inline-flex text-sm font-semibold text-link no-underline hover:underline">
            Open Book Mode
          </Link>
        </div>

        <div>
          <TransferableSkillsMap />
        </div>
      </section>

      <section className="border-y border-border bg-surface-alt/18">
        <div className="mx-auto grid w-[min(100%-1.5rem,96rem)] gap-10 py-16 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
              Evidence Preview
            </p>
            <h2 className="mt-0 font-serif text-4xl font-bold text-foreground">
              Data belongs here, but only when it has sources.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/62">
              The evidence layer is built for charts and rationale, but it is
              intentionally source-first. No fake statistics. No decorative
              graphs pretending to prove something.
            </p>
          </div>
          <EvidencePanel />
        </div>
      </section>

      <section className="mx-auto w-[min(100%-1.5rem,96rem)] py-16">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Pathway Preview
          </p>
          <h2 className="mt-0 font-serif text-4xl font-bold text-foreground">
            From foundations to teacher-owned technical systems.
          </h2>
        </div>

        <ol className="divide-y divide-border border-y border-border">
          {pathwayPreview.map((course) => (
            <li key={course.code}>
              <Link
                href={course.code === "OTS-101" ? "/book/ots-101" : "/pathway"}
                className="grid gap-4 py-5 no-underline transition-colors hover:bg-surface-alt/35 md:grid-cols-[6rem_1fr_8rem]"
              >
                <span className="font-mono text-sm text-accent">
                  {course.code}
                </span>
                <span>
                  <strong className="block text-foreground">
                    {course.title}
                  </strong>
                  <span className="mt-1 block text-sm leading-relaxed text-foreground/55">
                    {course.purpose}
                  </span>
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-foreground/40">
                  {course.status}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-border bg-surface-alt/20">
        <div className="mx-auto grid w-[min(100%-1.5rem,96rem)] gap-8 py-14 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
              Open Source
            </p>
            <h2 className="m-0 border-none font-serif text-3xl font-bold text-foreground">
              Built in the open. Maintained like a field manual.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/58">
              Teaching Teachers is MIT licensed for code and CC BY-NC-SA 4.0
              for content. The source bank, course book, and release packet are
              designed to improve over time.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/library" className="book-action-secondary">
              Open Library
            </Link>
            <Link href="/open-source" className="book-action-secondary">
              License Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

