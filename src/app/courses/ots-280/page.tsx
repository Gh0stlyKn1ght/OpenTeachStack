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
      eyebrow="OTS-280 Coming Soon Pathway Course"
      title="Cyber Safety for Educators"
      subtitle="Identity, privacy, accounts, and website safety for teachers. This course is frozen until OTS-101 proves the content model with real lessons."
      meta={[
        { label: "Status", value: "Coming Soon" },
        { label: "Boundary", value: "Frozen until OTS-101 is right" },
      ]}
    >
      <section className="mb-10 rounded-md border border-border bg-surface p-5">
        <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
          Why This Is Closed
        </h2>
        <p className="mb-3 text-sm leading-relaxed text-slate">
          OpenTeachStack is rebuilding OTS-101 first. We are not publishing
          course previews, fake lesson bodies, or outline-only pathway content
          while the foundation course is still being repaired.
        </p>
        <p className="m-0 text-sm leading-relaxed text-slate">
          OTS-280 remains Coming Soon until OTS-101 is rebuilt, reviewed, and
          strong enough to guide the rest of the pathway.
        </p>
      </section>

      <section className="mt-10 rounded-md border border-accent/30 bg-surface p-5">
        <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
          Return to the Active Course
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-slate">
          OTS-101 is the only course currently being rebuilt.
        </p>
        <Link
          href="/book/ots-101"
          className="inline-flex rounded-md bg-[var(--color-text)] px-4 py-2 text-sm font-semibold text-[var(--color-bg)] no-underline transition-opacity hover:opacity-90"
        >
          Open OTS-101
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

