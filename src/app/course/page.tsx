import type { Metadata } from "next";
import Link from "next/link";
import CourseMeta from "@/components/CourseMeta";
import ModuleIndex from "@/components/ModuleIndex";

export const metadata: Metadata = {
  title: "OTS-101 Foundations — Teaching Teachers",
  description:
    "Overview of OTS-101: Teaching Teachers Foundations, a 10-module beginner course on prompting, standards, resource literacy, and curriculum systems.",
};

export default function CoursePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* ── Page header ──────────────────────────────────────────────── */}
      <header className="max-w-3xl mb-10">
        <span className="inline-block text-xs font-mono font-medium tracking-widest uppercase text-accent border border-accent/30 rounded px-2.5 py-1 mb-4">
          OTS-101 Foundations
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-normal text-foreground mb-4">
          Teaching Teachers Foundations
        </h1>
        <p className="text-foreground/60 leading-relaxed max-w-2xl">
          OTS-101 is the required foundations course in the Teaching Teachers
          pathway. It teaches educators how to prompt responsibly, unpack
          standards, evaluate resources, plan with Google Workspace, design
          assessments, and assemble a practical mini-unit system.
        </p>
      </header>

      {/* ── Two-column layout: content + sidebar ─────────────────────── */}
      <div className="flex flex-col-reverse lg:flex-row gap-10">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <section className="prose-academic mb-10">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4">
              How This Course Works
            </h2>
            <p>
              Each module contains lessons, reflection prompts, and build
              tasks that produce small, useful artifacts. Modules are designed
              to be completed in roughly one week, though participants may move
              at their own pace.
            </p>
            <p>
              The foundations course does not require programming, Apps
              Script, GitHub, domains, Next.js, Docusaurus, or AI coding
              agents. Those topics remain part of the broader pathway, but
              OTS-101 keeps the first release focused and teachable.
            </p>
            <p>
              All materials are openly licensed. Participants leave OTS-101
              with a mini-unit map, prompt library, resource evaluation sheet,
              assessment/rubric draft, delivery plan, verification checklist,
              and revision log.
            </p>
            <p>
              Before sharing the final mini-unit, use the{" "}
              <Link href="/course/audit">OTS-101 Course Audit</Link> to check
              scope, sources, alignment, AI safety, accessibility, and
              classroom readiness.
            </p>
            <p>
              When you are ready to finish, use the{" "}
              <Link href="/course/release">OTS-101 Release Packet</Link> and
              compare your work against the{" "}
              <Link href="/examples/robotics-mini-unit">
                sample robotics mini-unit
              </Link>
              .
            </p>
          </section>

          {/* Module listing */}
          <ModuleIndex />
        </div>

        {/* Sidebar */}
        <aside className="lg:w-72 shrink-0">
          <div className="lg:sticky lg:top-8">
            <CourseMeta />
          </div>
        </aside>
      </div>
    </div>
  );
}

