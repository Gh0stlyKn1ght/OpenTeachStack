import type { Metadata } from "next";
import Link from "next/link";
import FieldGuidePage from "@/components/field-guide/FieldGuidePage";

export const metadata: Metadata = {
  title: "Sample Robotics Mini Course Content Packet — OpenTeachStack",
  description:
    "A review-ready OTS-101 sample Mini Course Content Packet for an intro robotics lesson on what makes something a robot.",
};

const artifactSections = [
  {
    title: "1. Course Content Inventory",
    body:
      "Current problem: robotics materials are split between slides, kit PDFs, old videos, and improvised whiteboard explanations. Better system: one source list, one lesson page, one assessment, one publishing status note, and one revision log.",
  },
  {
    title: "2. Standards Unpacking",
    body:
      "Target skill: students explain how a system senses information, processes it, and acts. Evidence: students classify devices and defend their reasoning using sense-think-act language.",
  },
  {
    title: "3. Learning Target and Lesson Map",
    body:
      "Lesson 1: What is a robot? Lesson 2: Sensors and inputs. Lesson 3: Decisions and if/then logic. Lesson 4: Build or simulate a simple sensor decision.",
  },
  {
    title: "4. Student-Facing Lesson Draft",
    body:
      "Opening question: Is an automatic door a robot? Direct instruction: sense-think-act model. Practice: classify examples and non-examples. Check: explain one decision chain.",
  },
  {
    title: "5. Reusable Course-Content Prompt",
    body:
      "Prompt used: one-day lesson site builder. Teacher revision: removed vague AI language, added classroom examples, marked video/image placeholders for verification.",
  },
  {
    title: "6. Resource Evaluation",
    body:
      "Use official kit documentation, teacher-created diagram, district-approved standards source, and a verified short video. Do not use random robot images without license notes.",
  },
  {
    title: "7. AI Verification",
    body:
      "Check vocabulary definitions, examples, standard alignment, video suitability, image licensing, and whether the lesson overclaims what counts as a robot.",
  },
  {
    title: "8. Assessment and Rubric",
    body:
      "Task: classify eight systems as robot / not robot / depends, then justify two answers. Criteria: accurate vocabulary, sense-think-act reasoning, and evidence-based explanation.",
  },
  {
    title: "9. Publishing Status",
    body:
      "Classroom copy is treated as an export from the approved source. Student-view access must be checked before release; otherwise publishing remains blocked.",
  },
  {
    title: "10. Reflection and Revision",
    body:
      "After class, note which examples caused confusion, whether students overused the word robot, and which source or diagram needs clearer attribution.",
  },
];

const sourceChecks = [
  "Official robot kit documentation or manufacturer guide",
  "District or state standards source",
  "Teacher-created sense-think-act diagram",
  "Verified video with appropriate age level, captions, and source notes",
  "Image sources with license or classroom-use notes",
];

export default function RoboticsMiniUnitExamplePage() {
  return (
    <FieldGuidePage
      eyebrow="OTS-101 Sample Packet"
      title="Intro Robotics: What Is a Robot?"
      subtitle="A review-ready example: clear target, trusted sources, one student-facing lesson, one assessment, safety checks, blocked publishing status if needed, and a revision path."
      meta={[
        { label: "Artifacts", value: String(artifactSections.length) },
        { label: "Source checks", value: String(sourceChecks.length) },
      ]}
    >
      <section className="mb-10 rounded-md border border-border bg-surface p-5">
        <h2 className="mb-2 font-heading text-xl font-bold text-foreground">
          Student-Friendly Learning Target
        </h2>
        <p className="m-0 text-sm leading-relaxed text-slate">
          I can decide whether a system is a robot by explaining what it
          senses, how it decides, and what action it takes.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">
          Artifact Package
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {artifactSections.map((section) => (
            <article
              key={section.title}
              className="rounded-md border border-border bg-surface p-4"
            >
              <h3 className="mb-2 font-sans text-sm font-bold text-foreground">
                {section.title}
              </h3>
              <p className="m-0 text-xs leading-relaxed text-slate">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-md border border-border bg-surface p-5">
          <h2 className="mb-3 font-heading text-xl font-bold text-foreground">
            Source Checks
          </h2>
          <ul className="space-y-2 pl-0">
            {sourceChecks.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-md border border-border bg-surface p-5">
          <h2 className="mb-3 font-heading text-xl font-bold text-foreground">
            Reality Check
          </h2>
          <p className="m-0 text-sm leading-relaxed text-slate">
            If students can memorize the word robot but cannot explain the
            sense-think-act chain, the lesson is not doing its job yet. Revise
            the examples before adding more technology.
          </p>
        </div>
      </section>

      <section className="rounded-md border border-border bg-surface-alt/40 p-5">
        <h2 className="mb-3 font-heading text-xl font-bold text-foreground">
          Build This Today
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-slate">
          Copy this structure into your own subject after the OTS-000
          orientation. Replace robotics with one concept students misunderstand,
          then build the same review trail.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/templates/course-content-map"
            className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/70 no-underline transition-colors hover:border-accent hover:text-accent"
          >
            Course Content Map
          </Link>
          <Link
            href="/templates/publishing-checklist"
            className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/70 no-underline transition-colors hover:border-accent hover:text-accent"
          >
            Publishing Checklist
          </Link>
          <Link
            href="/course/release"
            className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/70 no-underline transition-colors hover:border-accent hover:text-accent"
          >
            Release Packet
          </Link>
        </div>
      </section>
    </FieldGuidePage>
  );
}


