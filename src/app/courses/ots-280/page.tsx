import type { Metadata } from "next";
import Link from "next/link";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";

export const metadata: Metadata = {
  title: "OTS-280 Cyber Safety for Educators — OpenTeachStack",
  description:
    "OpenTeachStack pathway course on identity, privacy, accounts, and website safety for teachers.",
};

export default function CyberSafetyCoursePage() {
  return (
    <FieldGuidePage
      eyebrow="OTS-280 Draft Pathway Course"
      title="Cyber Safety for Educators"
      subtitle="Identity, privacy, accounts, and website safety for teachers working in public, connected spaces."
      meta={[
        { label: "Status", value: "Draft" },
        { label: "Review", value: "Human review still required" },
      ]}
    >
      <section className="mb-10 rounded-md border border-border bg-surface p-5">
        <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
          Draft Review Boundary
        </h2>
        <p className="mb-3 text-sm leading-relaxed text-slate">
          OTS-280 is open as a draft preview so the full pathway can be checked
          in one pass. It still needs human review for classroom fit, source
          quality, safety language, and practical usefulness.
        </p>
        <p className="m-0 text-sm leading-relaxed text-slate">
          Treat this as working course material, not a release-ready claim.
        </p>
      </section>

      <section className="mt-10 rounded-md border border-accent/30 bg-surface p-5">
        <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
          Open the Course Book
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-slate">
          Review the chapter path, teacher-facing safety checks, and section
          practice prompts in the active draft book.
        </p>
        <Link
          href="/book/ots-280"
          className="inline-flex rounded-md bg-[var(--color-text)] px-4 py-2 text-sm font-semibold text-[var(--color-bg)] no-underline transition-opacity hover:opacity-90"
        >
          Open OTS-280
        </Link>
      </section>

      <section className="mt-10 rounded-md border border-border bg-surface-alt/40 p-5">
        <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
          Related Library Items
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/kb/prompts"
            className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/70 no-underline transition-colors hover:border-accent hover:text-accent"
          >
            Website Audit Prompt
          </Link>
          <Link
            href="/kb/resources"
            className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/70 no-underline transition-colors hover:border-accent hover:text-accent"
          >
            Official Sources
          </Link>
          <Link
            href="/kb/field-notes"
            className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/70 no-underline transition-colors hover:border-accent hover:text-accent"
          >
            Field Note
          </Link>
        </div>
      </section>
    </FieldGuidePage>
  );
}

