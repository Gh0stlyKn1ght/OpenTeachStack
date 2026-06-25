import type { Metadata } from "next";
import Link from "next/link";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";

export const metadata: Metadata = {
  title: "AI Safety Rules for Teachers — OpenTeachStack",
  description:
    "Non-negotiable guidelines for using AI tools in curriculum work. Covers student data, standards verification, citation accuracy, code review, and responsible AI usage.",
};

export default function SafetyPage() {
  return (
    <FieldGuidePage
      eyebrow="Safety"
      title="AI Safety Rules for Teachers"
      subtitle="Non-negotiable guidelines for using AI tools in curriculum work. These rules apply every time you use ChatGPT, Claude, AI image generators, Codex, Claude Code, or any other AI assistant in your professional practice."
      meta={[
        { label: "Use", value: "Before every AI-assisted classroom workflow" },
        { label: "Focus", value: "Privacy, verification, copyright, and data loss prevention" },
      ]}
    >
      <ArticleBody>
      {/* ── Why Safety Rules ─────────────────────────────────────────── */}
      <section className="prose-academic mb-10">
        <h2>Why These Rules Exist</h2>
        <p>
          AI tools are powerful accelerators for curriculum work. They can
          draft lesson plans in seconds, generate quiz questions, write code,
          and create images. But they also make mistakes&mdash;confidently,
          fluently, and without warning. They hallucinate citations, misalign
          to standards, generate biased content, and produce code with subtle
          bugs.
        </p>
        <p>
          These safety rules are not about restricting AI use. They are about
          ensuring that when you use AI tools, you maintain the professional
          standards your students, families, and colleagues depend on. Every
          rule exists because a real failure mode has been observed.
        </p>
      </section>

      <hr className="border-t border-border mb-10" />

      {/* ── The Rules ────────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
          The Rules
        </h2>

        {/* Rule 1 */}
        <article className="mb-10">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            1. Do not paste private student data into AI tools
          </h3>
          <div className="prose-academic">
            <p>
              Never enter student names, grades, IDs, IEP information,
              behavioral records, attendance data, parent contact
              information, or any other personally identifiable information
              into any AI tool. This includes ChatGPT, Claude, Copilot, and
              any browser-based or API-connected AI service.
            </p>
            <p>
              <strong>Why:</strong> AI tools process and may store input data
              on external servers. Entering student PII into these services
              may violate FERPA, your district&rsquo;s data governance
              policies, and your professional obligations to student privacy.
              Even tools that claim not to store data may log inputs for
              safety monitoring or model improvement.
            </p>
            <p>
              <strong>Instead:</strong> Use de-identified or fictional sample
              data when testing prompts. If you need AI to process
              student-related data, use only district-approved tools with
              signed data processing agreements.
            </p>
          </div>
        </article>

        {/* Rule 2 */}
        <article className="mb-10">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            2. Do not trust AI standards alignment without checking
          </h3>
          <div className="prose-academic">
            <p>
              When AI claims a lesson &ldquo;aligns to&rdquo; a specific
              standard, verify that claim against the actual standards
              document. AI tools frequently cite incorrect standard codes,
              describe standards inaccurately, or conflate standards from
              different states or grade levels.
            </p>
            <p>
              <strong>Why:</strong> Standards alignment is a professional
              responsibility. If your lesson plan claims alignment to a
              standard it does not actually address, that misalignment
              affects instruction, assessment validity, and accountability
              reporting.
            </p>
            <p>
              <strong>Instead:</strong> Keep your state standards document
              open while reviewing AI output. Cross-reference every standard
              code and description the AI produces. Use the &ldquo;Aligning
              Lessons to Standards&rdquo; prompt in the{" "}
              <Link href="/kb/prompts">Prompt Library</Link> as a verification
              step, not a substitute for reading the actual standards.
            </p>
          </div>
        </article>

        {/* Rule 3 */}
        <article className="mb-10">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            3. Do not use AI-generated citations unless verified
          </h3>
          <div className="prose-academic">
            <p>
              AI tools frequently generate citations that look correct but
              do not exist. They invent author names, journal titles, DOIs,
              URLs, and publication dates. They also misattribute real quotes
              to the wrong sources.
            </p>
            <p>
              <strong>Why:</strong> Including fabricated citations in
              curriculum materials teaches students that unverified sources
              are acceptable. It also damages your professional credibility
              if a colleague, administrator, or parent checks a reference
              and finds it does not exist.
            </p>
            <p>
              <strong>Instead:</strong> Verify every citation independently.
              Check that the URL resolves, the author exists, the
              publication is real, and the quoted text matches the source. If
              you cannot verify a citation, remove it or find a real source
              yourself.
            </p>
          </div>
        </article>

        {/* Rule 4 */}
        <article className="mb-10">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            4. Do not overwrite authored course content with AI templates
          </h3>
          <div className="prose-academic">
            <p>
              If you have written original lesson plans, assessments, or
              course materials, do not replace them wholesale with
              AI-generated alternatives. AI output is generic by design. Your
              authored content reflects your students, your context, and your
              professional judgment.
            </p>
            <p>
              <strong>Why:</strong> The purpose of AI in this course is to
              accelerate and augment your work, not to replace it. If you
              replace carefully developed materials with AI templates, you
              lose the contextual knowledge embedded in your original work.
            </p>
            <p>
              <strong>Instead:</strong> Use AI to generate drafts, suggest
              revisions, or fill gaps. Integrate AI output into your existing
              materials rather than overwriting them. Version control (git)
              makes this safer&mdash;you can always revert.
            </p>
          </div>
        </article>

        {/* Rule 5 */}
        <article className="mb-10">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            5. Do not publish copyrighted materials without permission
          </h3>
          <div className="prose-academic">
            <p>
              AI tools are trained on vast amounts of copyrighted text and
              may reproduce copyrighted passages verbatim in their output.
              Do not assume that AI-generated content is free of copyright
              concerns.
            </p>
            <p>
              <strong>Why:</strong> Publishing copyrighted material without
              permission&mdash;even unknowingly&mdash;exposes you and your
              school to legal risk. This is especially relevant for AI-generated
              text that closely mirrors existing published works.
            </p>
            <p>
              <strong>Instead:</strong> Check AI-generated content for
              passages that seem unusually specific or well-polished, which
              may indicate reproduction from training data. When in doubt,
              rephrase in your own words. For images, use tools that
              provide clear usage rights and document the generation
              method.
            </p>
          </div>
        </article>

        {/* Rule 6 */}
        <article className="mb-10">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            6. Do not rely on AI images for factual diagrams without
            verification
          </h3>
          <div className="prose-academic">
            <p>
              AI image generators frequently produce images that are
              visually convincing but factually wrong. Maps with incorrect
              borders, anatomy diagrams with missing or misplaced organs,
              science diagrams with wrong labels, and historical scenes
              with anachronistic details are common.
            </p>
            <p>
              <strong>Why:</strong> Students may study these images as
              reference materials. A factually inaccurate diagram in a
              biology class or a historically incorrect illustration in a
              social studies unit can actively mislead learning.
            </p>
            <p>
              <strong>Instead:</strong> Use AI-generated images for
              decorative or illustrative purposes (posters, project
              graphics, general visuals). For factual diagrams, use
              verified sources, draw your own, or carefully verify every
              detail in the AI output. Label AI-generated images as such
              in your materials.
            </p>
          </div>
        </article>

        {/* Rule 7 */}
        <article className="mb-10">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            7. Always review code generated by AI agents
          </h3>
          <div className="prose-academic">
            <p>
              Whether using Codex, Claude Code, or ChatGPT for code
              generation, review every line before executing. AI-generated
              code can contain bugs, security vulnerabilities, unnecessary
              permissions requests, and destructive operations (deleting
              files, overwriting data, sending emails to unintended
              recipients).
            </p>
            <p>
              <strong>Why:</strong> Code runs with your permissions. An
              Apps Script that sends emails runs from your Google account.
              A file-modifying script runs with your file system access. A
              mistake in AI-generated code can result in data loss, spam
              emails, or broken workflows.
            </p>
            <p>
              <strong>Instead:</strong> Read the code line by line. Test on
              copies of your data, never on live documents. Understand what
              each function does before running it. If you do not understand
              a section, ask the AI to explain it, then verify the
              explanation. Use version control so you can undo changes.
            </p>
          </div>
        </article>

        {/* Rule 8 */}
        <article className="mb-10">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            8. Always use version control before large edits
          </h3>
          <div className="prose-academic">
            <p>
              Before letting an AI coding agent modify your project files,
              commit your current state to git. Before making bulk changes
              to a Google Sheet or Doc with Apps Script, make a copy of the
              original.
            </p>
            <p>
              <strong>Why:</strong> AI agents can make sweeping changes
              quickly. If those changes are wrong&mdash;and sometimes they
              are subtly wrong in ways you do not notice
              immediately&mdash;you need a way to revert. Without version
              control, you may lose hours or days of work.
            </p>
            <p>
              <strong>Instead:</strong> Make version control a habit, not
              an afterthought. Run <code>git commit</code> before every AI
              coding session. Duplicate Google documents before running
              bulk scripts. Review diffs after AI modifications.
            </p>
          </div>
        </article>
      </section>

      <hr className="border-t border-border mb-10" />

      {/* ── When AI Goes Wrong ───────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
          When AI Goes Wrong
        </h2>
        <div className="prose-academic">
          <p>
            Understanding common failure modes helps you catch problems
            before they reach students. The following are real, observed
            patterns&mdash;not hypothetical scenarios.
          </p>
        </div>

        <dl className="space-y-6 mt-6">
          <div>
            <dt className="font-sans font-semibold text-foreground text-sm mb-1">
              Confident Hallucination
            </dt>
            <dd className="text-sm text-foreground/60 leading-relaxed ml-0">
              The AI states a false fact with complete confidence and no
              hedging. Example: citing a specific study with author, year,
              and journal title&mdash;none of which exist. This is the
              most dangerous failure mode because the output reads as
              authoritative.
            </dd>
          </div>

          <div>
            <dt className="font-sans font-semibold text-foreground text-sm mb-1">
              Standards Drift
            </dt>
            <dd className="text-sm text-foreground/60 leading-relaxed ml-0">
              The AI produces content that is broadly related to a standard
              but does not actually address the specific skills or knowledge
              the standard requires. A lesson &ldquo;aligned to&rdquo; a
              math standard might teach the right topic but at the wrong
              cognitive level or with the wrong emphasis.
            </dd>
          </div>

          <div>
            <dt className="font-sans font-semibold text-foreground text-sm mb-1">
              Generic Voice
            </dt>
            <dd className="text-sm text-foreground/60 leading-relaxed ml-0">
              AI-generated lesson plans and student directions often use a
              uniform, slightly corporate tone that does not match how any
              real teacher communicates. If distributed as-is, students
              notice. This erodes the personal connection that makes
              classroom instruction effective.
            </dd>
          </div>

          <div>
            <dt className="font-sans font-semibold text-foreground text-sm mb-1">
              Silent Code Bugs
            </dt>
            <dd className="text-sm text-foreground/60 leading-relaxed ml-0">
              AI-generated code may run without errors but produce
              incorrect results. An Apps Script that reads data from the
              wrong column, a quiz generator that silently skips questions,
              or a file organizer that puts documents in the wrong
              folder&mdash;these bugs do not throw errors, so they go
              unnoticed until a student or colleague finds the problem.
            </dd>
          </div>

          <div>
            <dt className="font-sans font-semibold text-foreground text-sm mb-1">
              Image Inaccuracy
            </dt>
            <dd className="text-sm text-foreground/60 leading-relaxed ml-0">
              AI image generators produce visuals that look professional
              but contain factual errors. Maps with countries in the wrong
              location, clocks showing impossible times, text in images
              that is misspelled or nonsensical, and scientific diagrams
              with incorrect labels are all common.
            </dd>
          </div>

          <div>
            <dt className="font-sans font-semibold text-foreground text-sm mb-1">
              Scope Creep in AI Agents
            </dt>
            <dd className="text-sm text-foreground/60 leading-relaxed ml-0">
              AI coding agents (Codex, Claude Code) sometimes modify files
              beyond the requested scope. You ask for a change to one file
              and the agent modifies three others. Without version control,
              you may not realize additional files were changed.
            </dd>
          </div>

          <div>
            <dt className="font-sans font-semibold text-foreground text-sm mb-1">
              Outdated Information
            </dt>
            <dd className="text-sm text-foreground/60 leading-relaxed ml-0">
              AI models have knowledge cutoff dates. They may reference
              discontinued tools, outdated policies, superseded standards,
              or deprecated APIs. Content that was accurate when the model
              was trained may be wrong by the time you use it.
            </dd>
          </div>
        </dl>
      </section>

      <hr className="border-t border-border mb-10" />

      {/* ── Verification Checklist ───────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
          Verification Checklist
        </h2>
        <div className="prose-academic">
          <p>
            Use this checklist every time you review AI-generated output
            before incorporating it into your curriculum materials.
          </p>
        </div>

        <div className="mt-6 rounded-md border border-border bg-surface p-6">
          <h3 className="font-sans font-semibold text-foreground text-sm mb-4 uppercase tracking-wider">
            Before Publishing or Distributing
          </h3>
          <ul className="space-y-3 text-sm text-foreground/70 leading-relaxed list-none pl-0">
            <li className="flex gap-3">
              <span className="shrink-0 text-accent font-mono">[ ]</span>
              <span>
                <strong>Factual accuracy:</strong> Have I independently
                verified all facts, dates, statistics, and claims?
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-accent font-mono">[ ]</span>
              <span>
                <strong>Citations:</strong> Do all cited sources actually
                exist? Have I checked URLs, authors, and titles?
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-accent font-mono">[ ]</span>
              <span>
                <strong>Standards alignment:</strong> Have I verified
                standard codes and descriptions against the actual
                standards document?
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-accent font-mono">[ ]</span>
              <span>
                <strong>Grade appropriateness:</strong> Is the vocabulary,
                complexity, and tone appropriate for my students?
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-accent font-mono">[ ]</span>
              <span>
                <strong>Voice:</strong> Does this sound like me, or does
                it sound like a chatbot? Have I revised it into my
                professional voice?
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-accent font-mono">[ ]</span>
              <span>
                <strong>Student data:</strong> Have I confirmed that no
                student PII was used in generating this content?
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-accent font-mono">[ ]</span>
              <span>
                <strong>Copyright:</strong> Have I checked for passages
                that may reproduce copyrighted material?
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-accent font-mono">[ ]</span>
              <span>
                <strong>Images:</strong> If using AI-generated images, are
                they factually accurate? Are they labeled as AI-generated?
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-accent font-mono">[ ]</span>
              <span>
                <strong>Code:</strong> If using AI-generated code, have I
                read every line, tested on sample data, and verified the
                output?
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-accent font-mono">[ ]</span>
              <span>
                <strong>Version control:</strong> Is my current work
                committed to git (or backed up) before integrating AI
                changes?
              </span>
            </li>
          </ul>
        </div>
      </section>

      <hr className="border-t border-border mb-10" />

      {/* ── District Policies ────────────────────────────────────────── */}
      <section className="prose-academic mb-10">
        <h2>A Note on District Policies</h2>
        <p>
          These safety rules represent baseline professional practices for
          responsible AI use in education. Your school or district may have
          additional policies, approved tool lists, or data governance
          requirements that supersede or supplement these guidelines.
        </p>
        <p>
          Before using AI tools in your professional work, check with your
          administration about:
        </p>
        <ul>
          <li>
            Which AI tools are approved for use with school accounts.
          </li>
          <li>
            Whether your district has a data processing agreement with the
            AI tool provider.
          </li>
          <li>
            Any restrictions on using AI-generated content in official
            curriculum documents.
          </li>
          <li>
            Requirements for disclosing AI assistance in professional work.
          </li>
        </ul>
        <p>
          When in doubt, default to the more restrictive policy.
        </p>
      </section>

      {/* ── Related ──────────────────────────────────────────────────── */}
      <aside className="mt-10 pt-6 border-t border-border">
        <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-foreground/40 mb-3">
          Related Pages
        </h3>
        <ul className="space-y-1 text-sm">
          <li>
            <Link
              href="/kb/prompts"
              className="text-link no-underline hover:underline"
            >
              Prompt Library
            </Link>{" "}
            <span className="text-foreground/40">
              &mdash; Structured prompt templates with built-in safety
              guidance
            </span>
          </li>
          <li>
            <Link
              href="/kb/resources"
              className="text-link no-underline hover:underline"
            >
              Resource Library
            </Link>{" "}
            <span className="text-foreground/40">
              &mdash; Curated tools and references for the full course
            </span>
          </li>
        </ul>
      </aside>
      </ArticleBody>
    </FieldGuidePage>
  );
}


