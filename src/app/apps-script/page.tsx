import type { Metadata } from "next";
import Link from "next/link";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import PrintPageButton from "@/components/PrintPageButton";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Apps Script Labs — Teaching Teachers Pathway",
  description:
    "Supplemental Google Apps Script labs for the Teaching Teachers pathway. Apps Script belongs in OTS-220 and is not required in OTS-101 Foundations.",
};

export default function AppsScriptPage() {
  const labs = getAllContent("labs");

  return (
    <FieldGuidePage
      eyebrow="OTS-220 Lab Shelf"
      title="Apps Script Labs"
      subtitle="Google Apps Script turns spreadsheets, documents, and forms from static tools into programmable classroom systems. These labs support the released OTS-220 track and are not required in OTS-101 Foundations."
      breadcrumbs={[{ label: "Book", href: "/book" }]}
      meta={[
        { label: "Track", value: "OTS-220" },
        { label: "Platform", value: "Google Workspace" },
        { label: "Labs", value: String(labs.length) },
      ]}
    >
      <ArticleBody>
        <div className="mt-6" data-print-hide>
          <PrintPageButton />
        </div>

      {/* ── Why Apps Script ──────────────────────────────────────────── */}
      <section className="prose-academic">
        <h2>Why Apps Script for Teachers</h2>
        <p>
          Most classroom automation tools require subscriptions, third-party
          integrations, or IT department approval. Apps Script is different:
          it is free, runs entirely inside Google Workspace, and requires
          nothing more than a browser. A teacher with a Google account can
          write a script in the morning and have it automating work by
          afternoon.
        </p>
        <p>
          The labs below support OTS-220: Apps Script for Teacher Automation.
          OTS-101 should only preview the idea of automation and keep its
          capstone focused on the mini-unit system.
        </p>
        <p>
          This course connects to several other parts of the project. The{" "}
          <Link href="/prompts">Prompt Library</Link> includes a dedicated
          prompt for generating Apps Script code with safety guidelines. The{" "}
          <Link href="/safety">Safety Guide</Link> covers code review
          practices for AI-generated scripts. OTS-320 extends that review habit
          into AI coding-agent work.
        </p>
      </section>

      {/* ── Available Labs ───────────────────────────────────────────── */}
      <section>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
          Available Labs
        </h2>

        {labs.length > 0 ? (
          <ol className="space-y-0 divide-y divide-border border-t border-border list-none pl-0">
            {labs.map((lab, index) => (
              <li key={lab.slug}>
                <Link
                  href={`/labs/${lab.slug}`}
                  className="group flex gap-5 py-5 no-underline transition-colors hover:bg-surface-alt/50"
                >
                  <span className="shrink-0 w-8 text-right font-mono text-sm font-medium text-accent/70 pt-0.5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-sans font-semibold text-foreground group-hover:text-link transition-colors m-0 leading-snug">
                      {lab.frontmatter.title}
                    </h3>
                    {lab.frontmatter.summary && (
                      <p className="text-sm text-foreground/55 mt-1.5 mb-0 leading-relaxed">
                        {lab.frontmatter.summary}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs font-mono text-foreground/35">
                      {lab.frontmatter.duration && (
                        <span>{lab.frontmatter.duration}</span>
                      )}
                      {lab.frontmatter.level && (
                        <span>{lab.frontmatter.level}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-foreground/40 py-8 text-center">
            Labs are currently being developed. Check back soon.
          </p>
        )}
      </section>

      {/* ── Code Examples Reference ──────────────────────────────────── */}
      <section>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
          Code Examples
        </h2>
        <p className="text-sm text-foreground/50 mb-6">
          Standalone script patterns you can adapt for your own workflows.
        </p>

        <dl className="space-y-6">
          <div>
            <dt className="font-sans font-semibold text-foreground text-sm mb-1">
              Read &amp; Write Sheet Data
            </dt>
            <dd className="text-sm text-foreground/60 leading-relaxed ml-0">
              Retrieve values from a named range, transform them, and write
              results to a different sheet&mdash;the fundamental read-process-write
              loop behind most classroom automations.
            </dd>
          </div>

          <div>
            <dt className="font-sans font-semibold text-foreground text-sm mb-1">
              Create Documents from a Template
            </dt>
            <dd className="text-sm text-foreground/60 leading-relaxed ml-0">
              Copy a Google Doc template, replace placeholder tokens with data
              from a spreadsheet row, and save the result to a designated
              Drive folder.
            </dd>
          </div>

          <div>
            <dt className="font-sans font-semibold text-foreground text-sm mb-1">
              Scheduled Email Digest
            </dt>
            <dd className="text-sm text-foreground/60 leading-relaxed ml-0">
              Use a time-driven trigger to send a daily or weekly summary email
              with data pulled from a tracking spreadsheet&mdash;useful for
              attendance flags, missing assignments, or progress reports.
            </dd>
          </div>

          <div>
            <dt className="font-sans font-semibold text-foreground text-sm mb-1">
              Form Submission Handler
            </dt>
            <dd className="text-sm text-foreground/60 leading-relaxed ml-0">
              Attach an onFormSubmit trigger that validates responses,
              categorizes them into separate tabs, and sends a confirmation
              email to the respondent.
            </dd>
          </div>

          <div>
            <dt className="font-sans font-semibold text-foreground text-sm mb-1">
              Custom Sidebar UI
            </dt>
            <dd className="text-sm text-foreground/60 leading-relaxed ml-0">
              Build a simple HTML sidebar inside Google Sheets that lets
              non-technical users run scripts through buttons and dropdowns
              instead of the script editor.
            </dd>
          </div>
        </dl>
      </section>

      {/* ── Additional Resources ─────────────────────────────────────── */}
      <section className="prose-academic">
        <h2>Additional Resources</h2>
        <ul>
          <li>
            <a
              href="https://developers.google.com/apps-script"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Apps Script Documentation
            </a>{" "}
            &mdash; Official reference and guides.
          </li>
          <li>
            <a
              href="https://developers.google.com/apps-script/samples"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apps Script Sample Projects
            </a>{" "}
            &mdash; Google&rsquo;s curated collection of starter projects.
          </li>
          <li>
            <Link href="/prompts#apps-script-code">
              Apps Script Prompt Template
            </Link>{" "}
            &mdash; A structured prompt for generating Apps Script code with
            AI assistance.
          </li>
          <li>
            <Link href="/safety">AI Safety Rules for Teachers</Link>{" "}
            &mdash; Code review practices for AI-generated scripts.
          </li>
          <li>
            <Link href="/resources">Teaching Teachers Resource Library</Link>{" "}
            &mdash; Curated tools and references for the full course.
          </li>
        </ul>
      </section>
      </ArticleBody>
    </FieldGuidePage>
  );
}


