import type { Metadata } from "next";
import Link from "next/link";
import ArticleBody from "@/components/field-guide/ArticleBody";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";
import {
  COURSE_CODE,
  COURSE_TITLE,
  COURSE_SUBTITLE,
  AUTHOR,
  LICENSE,
  MODULES,
} from "@/lib/metadata";
import { createPageMetadata } from "@/lib/siteMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Syllabus — OTS-101 AI Course Content Foundations",
  description:
    "Syllabus for OTS-101: AI Course Content Foundations for Teachers, the sequel after OTS-000.",
  path: "/syllabus",
});

export default function SyllabusPage() {
  return (
    <FieldGuidePage
      eyebrow={`${COURSE_CODE} Syllabus`}
      title={COURSE_TITLE}
      subtitle={COURSE_SUBTITLE}
      breadcrumbs={[
        { label: "Book", href: "/book" },
        { label: "OTS-000", href: "/book/ots-000" },
        { label: COURSE_CODE, href: "/book/ots-101" },
      ]}
      meta={[
        { label: "Instructor", value: AUTHOR.name },
        { label: "Course", value: COURSE_CODE },
        { label: "Pacing", value: "10 or 16 weeks" },
        { label: "License", value: LICENSE.content.spdx },
      ]}
    >
      <ArticleBody>
      <div className="prose-academic">
        <h2>Course Description</h2>
        <p>
          AI Course Content Foundations ({COURSE_CODE}) is the course after
          OTS-000. It teaches educators how to use AI responsibly to turn goals,
          standards, source material, assignments, rubrics, and student-facing
          directions into a small course content packet they can actually review
          before students see it.
        </p>
        <p>
          The broader OpenTeachStack project includes later courses in Google
          Workspace systems, Apps Script automation, open resources, AI media,
          course sites, and AI coding agents. OTS-101 may point toward those
          possibilities, but it does not require teachers to build that stack.
        </p>

        <h2>Out of Scope for OTS-101</h2>
        <p>
          OTS-101 does not reteach file management, VS Code, GitHub basics,
          Markdown/MDX, websites, hosting, AI assistant setup, MCP-style tool
          access, backups, or secret handling. Those belong in OTS-000. It also
          does not require Apps Script implementation, public website launch,
          DNS, domains, or full video production.
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
          <li>OTS-000 or equivalent comfort with the basic teacher tech stack.</li>
          <li>Access to state, district, or subject-area standards.</li>
          <li>Access to an AI assistant such as ChatGPT, Claude, or similar.</li>
          <li>No coding experience required.</li>
        </ul>

        <h2>Learning Outcomes</h2>
        <ul>
          <li>Separate curriculum intent from student-facing course content.</li>
          <li>Map standards or goals into teachable targets and lesson evidence.</li>
          <li>Write bounded prompts for course-content artifacts.</li>
          <li>Verify AI output for accuracy, bias, privacy, citations, and standards claims.</li>
          <li>Draft student-facing lessons with clear directions and support.</li>
          <li>Draft assignments, rubrics, feedback notes, and evidence checks tied to targets.</li>
          <li>Organize course content so it can be reviewed, revised, and reused.</li>
          <li>Check safety, accessibility, copyright, and source quality before publishing.</li>
          <li>Prepare a student-view or platform-ready publishing checklist.</li>
          <li>Assemble and revise a Mini Course Content Packet.</li>
        </ul>

        <h2>Outcome Traceability</h2>
        <p>
          OTS-101 does not claim alignment to one state standard set. Teachers
          bring their own state, district, or subject-area standards into the
          packet. This table shows how the course outcomes trace to chapter
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
              <td>Separate curriculum intent from student-facing course content.</td>
              <td>Course content inventory</td>
              <td>Inventory notes and keep/revise/rebuild decisions</td>
              <td>The teacher can explain what students actually see and use.</td>
            </tr>
            <tr>
              <td>Map standards or goals into teachable targets.</td>
              <td>Learning target and lesson map</td>
              <td>Targets, evidence, and lesson sequence notes</td>
              <td>Each target uses observable learner action.</td>
            </tr>
            <tr>
              <td>Prompt responsibly and preserve teacher voice.</td>
              <td>Reusable course-content prompt</td>
              <td>Prompt, AI draft, revision notes, and teacher edits</td>
              <td>AI output is revised, not pasted untouched.</td>
            </tr>
            <tr>
              <td>Verify AI output and source claims.</td>
              <td>AI output verification checklist</td>
              <td>Accepted, changed, and rejected AI output notes</td>
              <td>Claims, citations, answer keys, and examples are checked.</td>
            </tr>
            <tr>
              <td>Draft real student-facing lessons.</td>
              <td>Student-facing lesson draft</td>
              <td>Directions, examples, supports, and stuck-point notes</td>
              <td>A student could start without a private teacher explanation.</td>
            </tr>
            <tr>
              <td>Draft assignments, rubrics, and feedback evidence.</td>
              <td>Assignment and rubric packet</td>
              <td>Task, rubric, sample feedback, and evidence notes</td>
              <td>The assessment measures the target, not effort alone.</td>
            </tr>
            <tr>
              <td>Organize course content for review and reuse.</td>
              <td>Course content folder map</td>
              <td>Packet index and revision locations</td>
              <td>The content can be found and updated without guessing.</td>
            </tr>
            <tr>
              <td>Check safety, accessibility, copyright, and source quality.</td>
              <td>Content safety review</td>
              <td>Privacy, access, source, copyright, and accessibility notes</td>
              <td>Risky content is changed, blocked, or documented.</td>
            </tr>
            <tr>
              <td>Prepare a student-view publishing check.</td>
              <td>Publishing checklist</td>
              <td>Student-view check, source export, and blocked-item notes</td>
              <td>The packet is review-ready, not merely uploaded somewhere.</td>
            </tr>
            <tr>
              <td>Assemble and revise the Mini Course Content Packet.</td>
              <td>Mini Course Content Packet</td>
              <td>Final packet index, review notes, and revision plan</td>
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
            <strong>Capstone review</strong> based on the Mini Course Content Packet and
            revision evidence.
          </li>
        </ul>

        <h2>Mini Course Content Packet Capstone</h2>
        <p>
          The capstone is a small course content packet, not a full published
          course site. Required artifacts:
        </p>
        <ul>
          <li>Course content inventory</li>
          <li>Learning target and lesson map</li>
          <li>Reusable course-content prompt</li>
          <li>Student-facing lesson draft</li>
          <li>Assignment or lab draft</li>
          <li>Rubric and feedback notes</li>
          <li>AI verification checklist</li>
          <li>Safety, accessibility, copyright, and source review</li>
          <li>Course content folder map</li>
          <li>Publishing checklist</li>
          <li>Reflection and revision notes</li>
        </ul>

        <h2>Safety Thread</h2>
        <p>
          Every major artifact must include privacy, copyright/licensing, AI
          verification, standards alignment, accessibility, and revision-log
          checks. See the <Link href="/kb/safety">Safety Guide</Link> and{" "}
          <Link href="/kb/templates">Template Library</Link>.
        </p>

        <h2>Pathway Continuation</h2>
        <p>
          After OTS-000 and OTS-101, teachers can move into specialized pathway courses:
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
      </ArticleBody>
    </FieldGuidePage>
  );
}


