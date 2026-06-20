import type { Metadata } from "next";
import Link from "next/link";
import {
  OfficialCourseSources,
  SoftwareSourceInventory,
} from "@/components/OfficialSources";

export const metadata: Metadata = {
  title: "Official Sources — Open TeachStack",
  description:
    "Official documentation and source inventory for Open TeachStack courses, apps, and software-facing lessons.",
};

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-accent">
          Source Audit
        </p>
        <h1 className="mb-3 font-serif text-3xl font-extrabold tracking-normal text-foreground sm:text-4xl">
          Official Sources
        </h1>
        <p className="max-w-2xl leading-relaxed text-foreground/60">
          This is the source-of-truth list for software, platforms,
          documentation, and technical references used across Open TeachStack.
          Lessons can use tutorials as supplements, but software behavior
          should be checked against official documentation first.
        </p>
      </header>

      <section className="mb-10 rounded-md border border-border bg-surface p-4">
        <h2 className="mb-2 font-serif text-lg font-bold text-foreground">
          Course Writing Rule
        </h2>
        <p className="text-sm leading-relaxed text-slate">
          When a lesson teaches an app, API, platform, automation workflow,
          publishing workflow, or AI tool, cite the official docs in the lesson
          notes or resource list. AI output is never the source. AI can help
          summarize, draft, or compare sources after the source link is known.
        </p>
        <Link
          href="/resources"
          className="mt-4 inline-flex text-sm font-semibold text-link no-underline hover:underline"
        >
          Open the full resource library
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="mb-1 font-serif text-xl font-bold text-foreground">
          Official Documentation by Pathway Course
        </h2>
        <p className="mb-4 text-sm text-foreground/50">
          Use this list when planning modules, labs, prompt templates, and
          software explanations.
        </p>
        <OfficialCourseSources />
      </section>

      <section>
        <h2 className="mb-1 font-serif text-xl font-bold text-foreground">
          App and Software Inventory
        </h2>
        <p className="mb-4 text-sm text-foreground/50">
          Each homepage carousel app has a direct product link and a direct
          official documentation or help link.
        </p>
        <SoftwareSourceInventory />
      </section>
    </div>
  );
}
