import type { Metadata } from "next";
import Link from "next/link";
import {
  COURSE_CODE,
  COURSE_TITLE,
  COURSE_SUBTITLE,
  AUTHOR,
  LICENSE,
  MODULES,
} from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Syllabus — Teaching Teachers Foundations",
  description:
    "Syllabus for OTS-101: Teaching Teachers Foundations, a 10-module course on prompting, standards, resource literacy, and curriculum systems.",
};

export default function SyllabusPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10 text-center">
        <span className="mb-4 inline-block rounded border border-accent/30 px-2.5 py-1 font-mono text-xs font-medium uppercase tracking-widest text-accent">
          {COURSE_CODE}
        </span>
        <h1 className="mb-2 font-serif text-3xl font-extrabold tracking-normal text-foreground sm:text-4xl">
          {COURSE_TITLE}
        </h1>
        <p className="mb-4 font-serif text-lg text-foreground/60">
          {COURSE_SUBTITLE}
        </p>
        <p className="text-sm text-foreground/45">
          Instructor: {AUTHOR.name} &middot;{" "}
          <a href={`mailto:${AUTHOR.email}`}>{AUTHOR.email}</a>
        </p>
      </header>

      <hr className="mb-10 border-t border-border" />

      <div className="prose-academic">
        <h2>Course Description</h2>
        <p>
          Teaching Teachers Foundations ({COURSE_CODE}) is the required
          beginner course in the Teaching Teachers pathway. It teaches educators
          how to use AI responsibly, unpack standards, evaluate resources,
          build practical planning systems, design assessments, and prepare a
          small curriculum sequence for real classroom delivery.
        </p>
        <p>
          The broader Teaching Teachers project includes later courses in Google
          Workspace systems, Apps Script automation, GitHub, AI media, course
          sites, and AI coding agents. OTS-101 previews those possibilities
          but does not require them.
        </p>

        <h2>Out of Scope for OTS-101</h2>
        <p>
          The foundations course does not require Apps Script implementation,
          GitHub publishing, Codex or Claude Code workflows, Next.js,
          Docusaurus, DNS, domains, hosting, live public websites, or full
          video production. Those topics belong in later pathway courses.
        </p>

        <h2>Intended Audience</h2>
        <ul>
          <li>classroom teachers and CTE/STEM teachers</li>
          <li>robotics, computer science, and club advisors</li>
          <li>department leads and teacher-creators</li>
          <li>educators new to AI tools who want practical guardrails</li>
          <li>teachers who want better control over curriculum systems</li>
        </ul>

        <h2>Prerequisites</h2>
        <ul>
          <li>Basic Google Docs, Sheets, Slides, Forms, and Drive familiarity.</li>
          <li>Access to state, district, or subject-area standards.</li>
          <li>Access to an AI assistant such as ChatGPT, Claude, or similar.</li>
          <li>No coding experience required.</li>
        </ul>

        <h2>Learning Outcomes</h2>
        <ul>
          <li>Explain the difference between collecting tools and building systems.</li>
          <li>Write structured prompts and revise AI output in teacher voice.</li>
          <li>Verify AI output for accuracy, bias, privacy, citations, and standards claims.</li>
          <li>Unpack standards into learning targets and assessment evidence.</li>
          <li>Design a coherent mini-unit architecture.</li>
          <li>Evaluate resources for quality, licensing, accessibility, and alignment.</li>
          <li>Use Google Workspace as a planning system, not just storage.</li>
          <li>Draft assessments, rubrics, and feedback loops tied to learning targets.</li>
          <li>Plan classroom delivery with student-facing directions and backup routines.</li>
          <li>Assemble and revise a complete mini-unit capstone.</li>
        </ul>

        <h2>Outcome Traceability</h2>
        <p>
          OTS-101 does not claim alignment to one state standard set. Teachers
          bring their own state, district, or subject-area standards into the
          mini-unit. This table shows how the course outcomes trace to module
          work and capstone evidence.
        </p>
        <table>
          <thead>
            <tr>
              <th>Course Outcome</th>
              <th>Module Evidence</th>
              <th>Capstone Evidence</th>
              <th>Reviewer Check</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Build systems instead of collecting tools.</td>
              <td>Teacher workflow audit</td>
              <td>Priority workflow problem and improvement plan</td>
              <td>The problem is specific enough to improve.</td>
            </tr>
            <tr>
              <td>Prompt responsibly and preserve teacher voice.</td>
              <td>Reusable prompt library</td>
              <td>Prompt log with revision notes</td>
              <td>AI output is revised, not pasted untouched.</td>
            </tr>
            <tr>
              <td>Verify AI output and source claims.</td>
              <td>AI verification checklist</td>
              <td>Accepted, changed, and rejected AI output notes</td>
              <td>Claims, citations, and answer keys are checked.</td>
            </tr>
            <tr>
              <td>Unpack standards into learning targets.</td>
              <td>Standards unpacking sheet</td>
              <td>Three standards or outcomes with target and evidence</td>
              <td>Each target uses observable learner action.</td>
            </tr>
            <tr>
              <td>Design a coherent mini-unit architecture.</td>
              <td>Mini-unit map and lesson template</td>
              <td>3 to 5 lesson sequence</td>
              <td>Lessons build instead of sitting as isolated activities.</td>
            </tr>
            <tr>
              <td>Evaluate resources for credibility and use.</td>
              <td>Resource evaluation sheet</td>
              <td>Five reviewed resources with license or terms notes</td>
              <td>Software and platform links use official docs first.</td>
            </tr>
            <tr>
              <td>Use Google Workspace as planning infrastructure.</td>
              <td>Workspace planning map</td>
              <td>Artifact storage and update plan</td>
              <td>The system is usable without automation.</td>
            </tr>
            <tr>
              <td>Assess the intended learning target.</td>
              <td>Assessment/rubric draft</td>
              <td>One task with observable rubric criteria</td>
              <td>The assessment measures the target, not effort alone.</td>
            </tr>
            <tr>
              <td>Prepare classroom delivery.</td>
              <td>Delivery plan</td>
              <td>Student directions, timing, feedback, and backup plan</td>
              <td>A teacher can teach it without a private explanation.</td>
            </tr>
            <tr>
              <td>Revise and archive the work.</td>
              <td>Reflection and revision log</td>
              <td>Revision history and next-step notes</td>
              <td>The teacher can explain what changed and why.</td>
            </tr>
          </tbody>
        </table>

        <h2>Pacing Guide</h2>
        <p>
          The standard pacing is 10 modules over 10 weeks. A 16-week semester
          option adds time for peer review, template refinement, and capstone
          revision.
        </p>

        <h3>Standard Pacing: 10 Weeks</h3>
        <table>
          <thead>
            <tr>
              <th>Week</th>
              <th>Module</th>
              <th>Focus</th>
            </tr>
          </thead>
          <tbody>
            {MODULES.map((mod) => (
              <tr key={mod.id}>
                <td className="font-mono text-sm text-accent">{mod.number}</td>
                <td className="font-semibold">{mod.title}</td>
                <td className="text-foreground/70">{mod.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Expanded Pacing: 16 Weeks</h3>
        <table>
          <thead>
            <tr>
              <th>Weeks</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-mono text-sm text-accent">01-10</td>
              <td className="text-foreground/70">One module per week</td>
            </tr>
            <tr>
              <td className="font-mono text-sm text-accent">11-12</td>
              <td className="text-foreground/70">Template cleanup and artifact revision</td>
            </tr>
            <tr>
              <td className="font-mono text-sm text-accent">13-14</td>
              <td className="text-foreground/70">Peer review and safety checks</td>
            </tr>
            <tr>
              <td className="font-mono text-sm text-accent">15-16</td>
              <td className="text-foreground/70">Capstone presentation and reflection</td>
            </tr>
          </tbody>
        </table>

        <h2>Assessment Model</h2>
        <ul>
          <li>
            <strong>Formative checks</strong> through reflection prompts,
            short build tasks, and artifact drafts.
          </li>
          <li>
            <strong>Artifact reviews</strong> for standards alignment,
            resource quality, assessment validity, safety, and accessibility.
          </li>
          <li>
            <strong>Peer review</strong> using the same checklist teachers use
            on their own work.
          </li>
          <li>
            <strong>Capstone review</strong> based on the mini-unit system and
            revision evidence.
          </li>
        </ul>

        <h2>Mini-Unit Capstone</h2>
        <p>
          The capstone is a small curriculum system, not a full published
          course site. Required artifacts:
        </p>
        <ul>
          <li>Teacher workflow audit</li>
          <li>Standards unpacking sheet</li>
          <li>Mini-unit map</li>
          <li>3 to 5 lesson sequence</li>
          <li>Reusable lesson template</li>
          <li>Prompt library</li>
          <li>Resource evaluation sheet</li>
          <li>Assessment or quiz draft</li>
          <li>Rubric</li>
          <li>AI verification checklist</li>
          <li>Accessibility/privacy/copyright checklist</li>
          <li>Delivery plan</li>
          <li>Reflection and revision log</li>
        </ul>

        <h2>Safety Thread</h2>
        <p>
          Every major artifact must include privacy, copyright/licensing, AI
          verification, standards alignment, accessibility, and revision-log
          checks. See the <Link href="/safety">Safety Guide</Link> and{" "}
          <Link href="/templates">Template Library</Link>.
        </p>

        <h2>Pathway Continuation</h2>
        <p>
          After OTS-101, teachers can move into specialized pathway courses:
          Google Workspace systems, Apps Script, GitHub/open resources, AI
          media, course sites, AI coding agents, and capstone studio. See the{" "}
          <Link href="/pathway">Pathway Overview</Link>.
        </p>

        <h2>License Statement</h2>
        <p>
          Code is released under the{" "}
          <a href={LICENSE.code.url} target="_blank" rel="noopener noreferrer">
            {LICENSE.code.name}
          </a>
          . Written content is licensed under{" "}
          <a
            href={LICENSE.content.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {LICENSE.content.name}
          </a>
          .
        </p>
      </div>
    </div>
  );
}

