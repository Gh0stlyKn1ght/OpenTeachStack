import type { Metadata } from "next";
import Link from "next/link";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import { MODULES } from "@/lib/metadata";
import { createPageMetadata } from "@/lib/siteMetadata";
import { FOUNDATION_TEMPLATES } from "@/lib/templates";

export const metadata: Metadata = createPageMetadata({
  title: "OTS-101 Course Audit — OpenTeachStack",
  description:
    "Self-audit and peer-review checklist for the OTS-101 Mini Course Content Packet after the OTS-000 orientation.",
  path: "/course/audit",
});

const auditSections = [
  {
    title: "Scope",
    checks: [
      "The work stays inside OTS-101 foundations outcomes.",
      "OTS-000 tool, source, access, platform, and safety context is referenced only when it affects the course-content artifact.",
      "Apps Script, GitHub, domains, AI coding agents, and course-site building are not required to finish.",
      "The final artifact is a Mini Course Content Packet, not a full course platform.",
    ],
  },
  {
    title: "Sources",
    checks: [
      "Software behavior is checked against official documentation first.",
      "Tools, course platforms, and learning resources are checked against the Source Bank or marked as direct links needing verification.",
      "Standards are linked to the official state, district, or standards-body source.",
      "Borrowed resources include title, creator or publisher, URL, license or terms, and date reviewed.",
      "AI-generated citations are verified or removed.",
    ],
  },
  {
    title: "Instructional Alignment",
    checks: [
      "Each lesson connects to a learning target.",
      "Each learning target connects to a standard or course outcome.",
      "Assessment evidence measures the target instead of measuring trivia, compliance, or effort.",
      "The packet includes student-facing directions, timing or use notes, checks for understanding, and a backup or blocked-item note.",
    ],
  },
  {
    title: "AI and Safety",
    checks: [
      "No student-identifiable information is placed into AI tools or public artifacts.",
      "AI-assisted materials are reviewed for accuracy, bias, accessibility, and teacher voice.",
      "Images, diagrams, examples, and factual claims are verified when accuracy matters.",
      "The teacher can explain what AI helped draft, what changed, and what was rejected.",
    ],
  },
  {
    title: "Accessibility and Use",
    checks: [
      "Directions use plain, student-ready language.",
      "Links are descriptive and tested.",
      "Materials are usable on the devices students actually have.",
      "The packet can be reviewed or piloted by another teacher without a private meeting to decode it.",
    ],
  },
];

export default function CourseAuditPage() {
  return (
    <FieldGuidePage
      eyebrow="OTS-101 Audit"
      title="Mini Course Content Packet Self-Audit"
      subtitle="Use this checklist before treating an OTS-101 packet as ready for review, pilot, or release. The goal is course content that is coherent, sourced, teachable, and safe after the OTS-000 orientation."
      meta={[
        { label: "Scope", value: "OTS-101 capstone" },
        { label: "Templates", value: String(FOUNDATION_TEMPLATES.length) },
      ]}
    >
      <section className="mb-10 rounded-md border border-border bg-surface p-5">
        <h2 className="mb-3 border-none font-heading text-xl font-bold text-foreground">
          Required Templates
        </h2>
        <ul className="grid gap-2 text-sm text-slate sm:grid-cols-2">
          {FOUNDATION_TEMPLATES.map((template) => (
            <li key={template.slug}>
              <Link href={`/templates/${template.slug}`}>
                {template.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">
          Chapter Evidence Trail
        </h2>
        <div className="divide-y divide-border border-y border-border">
          {MODULES.map((module) => (
            <article key={module.slug} className="py-4">
              <div className="mb-2 flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                  Chapter {module.number}
                </span>
                <Link
                  href={`/book/ots-101/${module.slug}`}
                  className="font-heading text-lg font-bold text-foreground no-underline hover:text-link"
                >
                  {module.buildArtifact}
                </Link>
              </div>
              <p className="text-sm leading-relaxed text-slate">
                {module.evidence}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <main className="space-y-8">
          {auditSections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 font-heading text-2xl font-bold text-foreground">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.checks.map((check) => (
                  <li
                    key={check}
                    className="rounded-md border border-border bg-background px-4 py-3 text-sm leading-relaxed text-slate"
                  >
                    <span className="mr-2 font-mono text-foreground/35">
                      [ ]
                    </span>
                    {check}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </main>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-md border border-border bg-surface p-5">
            <h2 className="mb-3 border-none font-sans text-xs font-semibold uppercase tracking-widest text-foreground/40">
              Reviewer Notes
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-slate">
              <p>
                A capstone is ready when the reviewer can trace every major
                decision back to a target, source, OTS-000 boundary when
                relevant, template, or revision note.
              </p>
              <p>
                If a claim depends on software behavior, start with the
                official documentation list before accepting a tutorial, blog
                post, or AI-generated answer.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/kb/source-bank">Source Bank</Link>
                <Link href="/kb/resources">Official Sources</Link>
                <Link href="/kb/templates">Template Library</Link>
                <Link href="/kb/safety">Safety Guide</Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </FieldGuidePage>
  );
}


