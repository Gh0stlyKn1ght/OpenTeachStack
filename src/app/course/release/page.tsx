import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import PrintPageButton from "@/components/PrintPageButton";
import { MODULES } from "@/lib/metadata";
import { createPageMetadata } from "@/lib/siteMetadata";
import { FOUNDATION_TEMPLATES } from "@/lib/templates";
import { pageVisuals } from "@/lib/visualAssets";

export const metadata: Metadata = createPageMetadata({
  title: "OTS-101 Release Packet — Teaching Teachers",
  description:
    "Final release packet for OTS-101 Foundations, including module builds, capstone evidence, safety checks, and next steps.",
  path: "/course/release",
  image: {
    url: pageVisuals.releasePacket.src,
    alt: pageVisuals.releasePacket.alt,
  },
});

const releaseChecks = [
  "Every module has a clear build artifact.",
  "Every required template is available as a page and Markdown download.",
  "The capstone is a mini-unit system, not a full course site.",
  "The pathway boundaries are clear: code, GitHub, domains, public publishing, and AI agents can wait.",
  "The Source Bank is available as the shared system for verified tools, course platforms, learning resources, account notes, and privacy cautions.",
  "Official sources are available for software-facing lessons and workflows.",
  "The one-day lesson site workflow is visible as a signature method.",
  "The course has a non-technical start path.",
  "The final audit checks scope, sources, alignment, AI safety, accessibility, and classroom readiness.",
  "The curriculum-manager audit is documented and remaining v1 risks are visible in the roadmap.",
];

const finalPackage = [
  "Teacher workflow audit",
  "Standards unpacking sheet",
  "Mini-unit map",
  "Reusable lesson template",
  "Prompt library",
  "Resource evaluation sheet",
  "AI verification checklist",
  "Assessment/rubric draft",
  "Delivery plan",
  "One-day lesson site plan",
  "Reflection and revision log",
];

export default function Ots101ReleasePage() {
  return (
    <FieldGuidePage
      eyebrow="OTS-101 Release Packet"
      title="Teaching Teachers Foundations is ready when the work can be taught."
      subtitle="This is the final check for OTS-101: a coherent, source-backed mini-unit system a teacher can explain, teach, revise, and own."
      meta={[
        { label: "Checks", value: String(releaseChecks.length) },
        { label: "Package items", value: String(finalPackage.length) },
      ]}
    >
      <div className="mb-8" data-print-hide>
        <PrintPageButton />
      </div>

      <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-md border border-border bg-surface">
        <Image
          src={pageVisuals.releasePacket.src}
          alt={pageVisuals.releasePacket.alt}
          fill
          priority
          sizes="(min-width: 1024px) 760px, calc(100vw - 48px)"
          className="object-cover"
        />
      </div>

      <section className="mb-10 rounded-md border border-border bg-surface p-5">
        <h2 className="mb-3 font-heading text-xl font-bold text-foreground">
          Release Checks
        </h2>
        <ul className="space-y-3">
          {releaseChecks.map((check) => (
            <li
              key={check}
              className="rounded-md border border-border bg-background px-4 py-3 text-sm leading-relaxed text-slate"
            >
              <span className="mr-2 font-mono text-foreground/35">[ ]</span>
              {check}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">
          Chapter Build Trail
        </h2>
        <div className="divide-y divide-border border-y border-border">
          {MODULES.map((module) => (
            <article key={module.id} className="py-4">
              <div className="mb-2 flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                  {module.number}
                </span>
                <Link
                  href={`/book/ots-101/${module.slug}`}
                  className="font-heading text-lg font-bold text-foreground no-underline hover:text-link"
                >
                  {module.title}
                </Link>
              </div>
              <p className="mb-1 text-sm leading-relaxed text-slate">
                Build: {module.buildArtifact}
              </p>
              <p className="m-0 text-xs leading-relaxed text-foreground/45">
                Evidence: {module.evidence}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-md border border-border bg-surface p-5">
          <h2 className="mb-3 font-heading text-xl font-bold text-foreground">
            Final Student-Ready Package
          </h2>
          <ul className="space-y-2 pl-0">
            {finalPackage.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-md border border-border bg-surface p-5">
          <h2 className="mb-3 font-heading text-xl font-bold text-foreground">
            Required Templates
          </h2>
          <ul className="space-y-2 pl-0">
            {FOUNDATION_TEMPLATES.map((template) => (
              <li key={template.slug}>
                <Link href={`/templates/${template.slug}`}>
                  {template.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-md border border-border bg-surface-alt/40 p-5">
        <h2 className="mb-3 font-heading text-xl font-bold text-foreground">
          Final Reality Check
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-slate">
          If the mini-unit only works because the teacher remembers a private
          explanation, it is not finished. If the sources cannot be checked, it
          is not finished. If AI wrote it and nobody verified it, it is not
          finished.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/course/audit"
            className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/70 no-underline transition-colors hover:border-accent hover:text-accent"
          >
            Run the Course Audit
          </Link>
          <Link
            href="/library/source-bank"
            className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/70 no-underline transition-colors hover:border-accent hover:text-accent"
          >
            Open Source Bank
          </Link>
          <Link
            href="/examples/robotics-mini-unit"
            className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/70 no-underline transition-colors hover:border-accent hover:text-accent"
          >
            View Sample Mini-Unit
          </Link>
        </div>
      </section>
    </FieldGuidePage>
  );
}


