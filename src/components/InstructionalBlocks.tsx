import type { ReactNode } from "react";

type Tone = "blue" | "green" | "amber" | "orange" | "pink" | "purple";

type FrameworkBlockProps = {
  label?: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  tone?: Tone;
};

type ConceptCardProps = {
  title: string;
  number?: string;
  example?: ReactNode;
  children: ReactNode;
  tone?: Tone;
};

type TakeawayStripProps = {
  children: ReactNode;
  tone?: Tone;
};

type ComparisonBlockProps = {
  label?: string;
  title: string;
  intro?: ReactNode;
  leftTitle?: string;
  rightTitle?: string;
  leftItems?: string[];
  rightItems?: string[];
  children?: ReactNode;
  takeaways?: string[];
};

type WorkflowBlockProps = {
  label?: string;
  title: string;
  intro?: ReactNode;
  steps?: string[];
  children?: ReactNode;
  takeaways?: string[];
};

type ChecklistBlockProps = {
  label?: string;
  title: string;
  intro?: ReactNode;
  items?: string[];
  children?: ReactNode;
  takeaway?: ReactNode;
};

export function FrameworkBlock({
  label = "Framework",
  title,
  intro,
  children,
  tone = "blue",
}: FrameworkBlockProps) {
  return (
    <section className={`instructional-block instructional-block-${tone}`}>
      <div className="instructional-block-header">
        <span>{label}</span>
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      <div className="instructional-card-grid">{children}</div>
    </section>
  );
}

export function ConceptCard({
  title,
  number,
  example,
  children,
  tone = "blue",
}: ConceptCardProps) {
  return (
    <article className={`instructional-card instructional-card-${tone}`}>
      <div className="instructional-card-kicker">
        {number ? <span>{number}</span> : null}
        <strong>{title}</strong>
      </div>
      <div className="instructional-card-body">{children}</div>
      {example ? <div className="instructional-card-example">{example}</div> : null}
    </article>
  );
}

export function TakeawayStrip({ children, tone = "amber" }: TakeawayStripProps) {
  return <div className={`takeaway-strip takeaway-strip-${tone}`}>{children}</div>;
}

export function ComparisonBlock({
  label = "Comparison",
  title,
  intro,
  leftTitle = "Before",
  rightTitle = "After",
  leftItems = [],
  rightItems = [],
  children,
  takeaways = [],
}: ComparisonBlockProps) {
  return (
    <section className="instructional-block instructional-block-green">
      <div className="instructional-block-header">
        <span>{label}</span>
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      {leftItems.length || rightItems.length ? (
        <div className="comparison-grid">
          <div className="comparison-panel comparison-panel-source">
            <h3>{leftTitle}</h3>
            <ul>
              {leftItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="comparison-panel comparison-panel-export">
            <h3>{rightTitle}</h3>
            <ul>
              {rightItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : children ? (
        <div className="comparison-grid-content">{children}</div>
      ) : null}
      {takeaways.length ? (
        <div className="takeaway-stack">
          {takeaways.map((takeaway) => (
            <TakeawayStrip key={takeaway}>{takeaway}</TakeawayStrip>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function WorkflowBlock({
  label = "Workflow",
  title,
  intro,
  steps = [],
  children,
  takeaways = [],
}: WorkflowBlockProps) {
  return (
    <section className="instructional-block instructional-block-purple">
      <div className="instructional-block-header">
        <span>{label}</span>
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      {steps.length ? (
        <div className="workflow-grid">
          {steps.map((step, index) => (
            <article className="workflow-step-card" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      ) : children ? (
        <div className="workflow-grid-content">{children}</div>
      ) : null}
      {takeaways.length ? (
        <div className="takeaway-stack">
          {takeaways.map((takeaway) => (
            <TakeawayStrip key={takeaway} tone="purple">
              {takeaway}
            </TakeawayStrip>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function ChecklistBlock({
  label = "Checklist",
  title,
  intro,
  items = [],
  children,
  takeaway,
}: ChecklistBlockProps) {
  return (
    <section className="instructional-block instructional-block-amber">
      <div className="instructional-block-header">
        <span>{label}</span>
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      {items.length ? (
        <ul className="visual-checklist">
          {items.map((item) => (
            <li key={item}>
              <span aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
      ) : children ? (
        <div className="visual-checklist-content">{children}</div>
      ) : null}
      {takeaway ? <TakeawayStrip>{takeaway}</TakeawayStrip> : null}
    </section>
  );
}

export function FakeCourseTrapVisual() {
  return (
    <FrameworkBlock
      label="Framework"
      title="The Fake Course Trap"
      intro="These pieces can make a course look complete before the learning exists."
      tone="orange"
    >
      <ConceptCard title="Course Description" tone="orange">
        A promise about audience and topic. Useful, but not a lesson.
      </ConceptCard>
      <ConceptCard title="Lesson Outline" tone="amber">
        A map of sections. It does not prove any section teaches.
      </ConceptCard>
      <ConceptCard title="Quiz Plan" tone="pink">
        Assessment intent without student-ready questions or evidence.
      </ConceptCard>
      <ConceptCard title="Downloads Index" tone="purple">
        A list of files. It may hide missing examples, tasks, or checks.
      </ConceptCard>
      <ConceptCard title="Video Notes" tone="blue">
        Production support. Not proof that students know what to do.
      </ConceptCard>
      <ConceptCard title="Final Project" tone="green">
        A destination. It still needs scaffolds, criteria, and feedback.
      </ConceptCard>
      <TakeawayStrip>
        Packaging assets are not proof that a course exists.
      </TakeawayStrip>
      <TakeawayStrip>
        Real lessons, examples, tasks, evidence, and review checks still have
        to be built.
      </TakeawayStrip>
    </FrameworkBlock>
  );
}

export function SourceTruthExportVisual() {
  return (
    <ComparisonBlock
      title="Source of Truth vs Export Target"
      intro="The course comes first. The platform copy comes last."
      leftTitle="Source of Truth"
      rightTitle="Export Target"
      leftItems={[
        "lessons",
        "templates",
        "examples",
        "assessments",
        "sample packet",
        "revision notes",
      ]}
      rightItems={[
        "Teachable",
        "Canvas",
        "Google Classroom",
        "website",
        "PDF packet",
      ]}
      takeaways={[
        "The course comes first.",
        "The export comes last.",
        "The container is not the course.",
      ]}
    />
  );
}

export function CourseTruthStackVisual() {
  const steps = [
    "learning goals",
    "lesson sequence",
    "learner-facing content",
    "examples and non-examples",
    "practice task",
    "assessment evidence",
    "safety, accessibility, and source checks",
    "revision routine",
    "export package",
    "delivery platform",
  ];

  return (
    <WorkflowBlock
      label="Stack"
      title="Course Truth Stack"
      intro="A course is real when these layers connect, not when a folder has enough files."
      steps={steps}
      takeaways={["If a layer is missing, the course may look finished while the teaching is still incomplete."]}
    />
  );
}

export function AICourseContentWorkflowVisual() {
  const steps = [
    "define the learning target",
    "gather source and classroom context",
    "prompt AI with boundaries",
    "review the output",
    "add examples and non-examples",
    "build the student task",
    "verify safety, accessibility, and source quality",
    "publish the draft",
    "revise after teaching",
  ];

  return (
    <WorkflowBlock
      title="AI Course Content Workflow"
      intro="AI can accelerate drafting, but the teacher still owns the instructional decisions."
      steps={steps}
      takeaways={["AI drafts the clay. The teacher shapes the lesson."]}
    />
  );
}

export function TiredTeacherTestVisual() {
  return (
    <ChecklistBlock
      title="Tired Teacher Test"
      intro="A real course artifact should survive a hard school week."
      items={[
        "Can a tired teacher use this tomorrow?",
        "Can a student tell what to do?",
        "Is there a real example?",
        "Is there a task?",
        "Is there evidence?",
        "Is there a safety, privacy, or source boundary?",
        "Is the course source of truth clear?",
      ]}
      takeaway="If the answer is no, the page is not done yet."
    />
  );
}
