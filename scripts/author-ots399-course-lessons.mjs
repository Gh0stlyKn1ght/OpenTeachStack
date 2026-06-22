import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const args = process.argv.slice(2);
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");

const root = process.cwd();
const courseSlug = "ots-399";
const courseRoot = join(root, "content", "courses", courseSlug);
const courseJsonPath = join(courseRoot, "course.json");

const chapterGuides = {
  "01-capstone-scope": {
    focus:
      "framing a capstone that is right-sized, reviewable, and safe to share with a community of practice.",
    decision:
      "choosing one teaching need and publishable outcome that can be evidenced in one cycle.",
    caution:
      "publishing an over-scoped artifact without clear evidence, ownership, or privacy boundaries.",
  },
  "02-curriculum-system-assembly": {
    focus:
      "assembling a coherent curriculum system where every artifact has a place, a purpose, and a maintenance owner.",
    decision:
      "defining the set of artifacts and links that make the capstone usable for teaching and reuse.",
    caution:
      "creating disconnected materials that look complete on paper but cannot be traced in use.",
  },
  "03-automation-tool-evidence": {
    focus:
      "recording technical systems and tool changes with clear intent, testability, and rollback paths.",
    decision:
      "documenting what each automation/tool component does and why it improves teaching workflow.",
    caution:
      "shipping technical claims without evidence, tests, or a rollback strategy.",
  },
  "04-publishing-safety-review": {
    focus:
      "running release safety as a teachable routine that protects privacy, accessibility, licensing, and sources.",
    decision:
      "publishing only after each release surface has a reviewed pass, queue, or block decision.",
    caution:
      "leaving unsafe links, missing source notes, or private information in public materials.",
  },
  "05-presentation-peer-review": {
    focus:
      "making the capstone understandable to peers through explicit walkthroughs, review prompts, and revisions.",
    decision:
      "turning feedback into a concrete revision log and a clear maintenance plan.",
    caution:
      "presenting claims without giving a reviewer a way to verify them.",
  },
  "06-published-curriculum-system": {
    focus:
      "assembling final release evidence into a practical packet that can be migrated or maintained later.",
    decision:
      "marking each item ready, private, or queued with a named handoff and review outcome.",
    caution:
      "declaring completion before the route, source, privacy, and maintenance checks are visible.",
  },
};

const sourceRefsByChapter = {
  "01-capstone-scope": [
    {
      label: "Capstone course outline",
      url: "/content/courses/ots-399/docs/OTS_399_COURSE_OUTLINE.md",
      local: true,
    },
    {
      label: "Capstone proposal template",
      url: "/content/courses/ots-399/templates/capstone-proposal-template.md",
      local: true,
    },
    { label: "OpenAI Codex documentation", url: "https://platform.openai.com/docs" },
    { label: "Google AI usage guidance", url: "https://support.google.com/edu" },
  ],
  "02-curriculum-system-assembly": [
    {
      label: "Capstone artifact templates",
      url: "/content/courses/ots-399/templates/artifact-index-template.md",
      local: true,
    },
    {
      label: "System map guidance notes",
      url: "/content/courses/ots-399/docs/OTS_399_CAPSTONE_ARTIFACTS.md",
      local: true,
    },
    { label: "MDN accessible content patterns", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG" },
  ],
  "03-automation-tool-evidence": [
    {
      label: "Technical evidence log template",
      url: "/content/courses/ots-399/templates/technical-evidence-log-template.md",
      local: true,
    },
    {
      label: "Source-backed automation checks",
      url: "/content/courses/ots-399/docs/OTS_399_COURSE_OUTLINE.md",
      local: true,
    },
    {
      label: "GitHub security checks",
      url: "https://docs.github.com/en/security",
    },
  ],
  "04-publishing-safety-review": [
    {
      label: "Privacy/accessibility/safety review",
      url: "/content/courses/ots-399/docs/privacy-accessibility-safety-review.md",
      local: true,
    },
    {
      label: "Release safety review checklist",
      url: "/content/courses/ots-399/templates/final-release-checklist.md",
      local: true,
    },
    {
      label: "Open educational resources licensing",
      url: "https://creativecommons.org/licenses/",
    },
    {
      label: "Vercel app route behavior",
      url: "https://nextjs.org/docs/app/building-your-application/routing",
    },
  ],
  "05-presentation-peer-review": [
    {
      label: "Peer review protocol",
      url: "/content/courses/ots-399/templates/peer-review-protocol.md",
      local: true,
    },
    {
      label: "Presentation review notes",
      url: "/content/courses/ots-399/docs/OTS_399_CAPSTONE_ARTIFACTS.md",
      local: true,
    },
    { label: "Rubric and review guidance", url: "https://www.w3.org/TR/WCAG21/" },
  ],
  "06-published-curriculum-system": [
    {
      label: "Final release checklist",
      url: "/content/courses/ots-399/templates/final-release-checklist.md",
      local: true,
    },
    {
      label: "Pathway traceability checklist",
      url: "/content/courses/ots-399/docs/pathway-traceability-check.md",
      local: true,
    },
    {
      label: "Project portfolio evidence",
      url: "/content/courses/ots-399/docs/OTS_399_CAPSTONE_ARTIFACTS.md",
      local: true,
    },
  ],
};

const templateLinksByChapter = {
  "01-capstone-scope": "/content/courses/ots-399/templates/capstone-proposal-template.md",
  "02-curriculum-system-assembly": "/content/courses/ots-399/templates/artifact-index-template.md",
  "03-automation-tool-evidence": "/content/courses/ots-399/templates/technical-evidence-log-template.md",
  "04-publishing-safety-review": "/content/courses/ots-399/templates/final-release-checklist.md",
  "05-presentation-peer-review": "/content/courses/ots-399/templates/peer-review-protocol.md",
  "06-published-curriculum-system": "/content/courses/ots-399/templates/final-release-checklist.md",
};

function fail(message) {
  console.error(`OTS-399 authoring script violation: ${message}`);
  process.exitCode = 1;
}

function sourceSection(items) {
  if (!items?.length) return "- Source references are queued for this section.";

  return items
    .map((item) =>
      item.local
        ? `- [${item.label}](${item.url})`
        : `- [${item.label}](${item.url})`,
    )
    .join("\n");
}

function sectionMode(type, artifact, chapterArtifact) {
  if (type === "overview") {
    return {
      action: "set the chapter boundary, decision rule, and evidence gate before building.",
      evidence: "a clear orientation note with scope, risk, and ownership.",
      review:
        "review is complete when audience, evidence, privacy, and timeline boundaries are explicit.",
    };
  }
  if (type === "artifact") {
    return {
      action: `build ${artifact ?? chapterArtifact} with owner, deliverable, and route or file references.`,
      evidence: `a completed version of ${artifact ?? chapterArtifact} plus a short completion note.`,
      review: "the artifact includes public/private status and next maintenance step.",
    };
  }
  if (type === "workshop") {
    return {
      action: "run a short test or workshop using non-sensitive synthetic content.",
      evidence: "an execution note and verification outcome (pass, revise, or block).",
      review:
        "the activity shows what changes happen in measurable teacher-facing outcomes.",
    };
  }
  if (type === "checkpoint") {
    return {
      action:
        "conduct a chapter checkpoint that identifies what is ready, revised, queued, or blocked.",
      evidence: "a concrete checkpoint line tied to one evidence item per decision.",
      review: "checkpoints protect release safety and avoid carrying blind spots forward.",
    };
  }
  if (type === "studio") {
    return {
      action: "compose the final chapter-facing artifact for reuse and handoff.",
      evidence: "a stable final package that maps to the chapter artifact.",
      review:
        "the output is understandable by a colleague without hidden assumptions.",
    };
  }
  return {
    action: "apply one concrete task that improves reviewability and student-facing usability.",
    evidence: "at least one traceable line in the capstone evidence packet.",
    review: "all claims are connected to an artifact, template, or route.",
  };
};

function bodyFor(chapter, section, guide) {
  const mode = sectionMode(section.type, section.artifact, chapter.buildArtifact);
  const artifact = section.artifact ?? chapter.buildArtifact;
  const sourceList = sourceSection(sourceRefsByChapter[chapter.slug] || []);
  const templatePath = templateLinksByChapter[chapter.slug];

  const checklist = [
    `Interpret this section in context: ${guide.focus}`,
    `Use this section to ${mode.action}`,
    `Record decisions and reasons connected to ${artifact}.`,
    "Attach a source or reference before sharing technical, workflow, or publishing details.",
    "Decide explicit private/public scope and maintenance owner.",
    "Collect one reusable review note that another teacher could check without external explanation.",
  ];

  const evidence = [
    `${mode.evidence}`,
    `Evidence connects this section to the chapter artifact and pathway context.`,
    `The section output is student-safe and suitable for teaching review.`,
    `A revision action is documented for the next visible step.`,
    "Source, privacy, accessibility, and safety notes are attached or queued.",
  ];

  const verification = [
    `Apply the chapter caution: ${guide.caution}`,
    `${mode.review}`,
    "Use synthetic or teacher-owned content when demonstrating outputs.",
    "Run a route, lint, or equivalent project check when this section produces publishable output.",
    "Record the approval state before advancing to the next section.",
  ];

  const localTemplate = templatePath
    ? `- Course template: [${artifact} template](${templatePath})`
    : "- Course template is queued where needed for this chapter.";

  return `# ${section.title}

## Core Idea

${chapter.title} emphasizes **${guide.decision}**. In this section, **${section.title}** applies that intent to one concrete teacher-owned action with visibility for peers and future maintenance.

## Do This

${checklist.map((item) => `- ${item}`).join("\n")}

## Evidence of Completion

${evidence.map((item) => `- ${item}`).join("\n")}

## Source and Template References

Use official references before making platform, workflow, or release claims:

${sourceList}

${localTemplate}

## Accessibility, Privacy, and Safety Review

${verification.map((item) => `- ${item}`).join("\n")}

## Reflection

${chapter.title} checkpoint question:
${guide.reflection || `What did this section improve for the capstone owner and reviewer?`}
`;
}

if (!existsSync(courseJsonPath)) {
  fail("course.json missing for OTS-399. Run scaffold before authoring.");
}

const rawCourse = readFileSync(courseJsonPath, "utf8");
const courseJson = JSON.parse(rawCourse);

const reflectionByChapter = {
  "01-capstone-scope":
    "What is the smallest complete capstone scope that still supports the learner goal?",
  "02-curriculum-system-assembly":
    "Which artifact link would break first if omitted, and why?",
  "03-automation-tool-evidence":
    "How can a reviewer verify one technical claim without trusting the builder?",
  "04-publishing-safety-review":
    "What single safety finding would block publication today?",
  "05-presentation-peer-review":
    "Which reviewer question changed your artifact before completion?",
  "06-published-curriculum-system":
    "What proves this package can be migrated, maintained, and audited later?",
};

for (const chapter of courseJson.chapters ?? []) {
  for (let index = 0; index < chapter.lessonCount; index++) {
    const sectionSlug = `${chapter.number.padStart(2, "0")}-${index}`;
    const filePath = join(
      courseRoot,
      "lessons",
      chapter.slug,
      `${sectionSlug}.mdx`,
    );

    if (!existsSync(filePath)) {
      fail(`Missing OTS-399 course lesson file: ${chapter.slug}/${sectionSlug}.mdx`);
      continue;
    }

    const parsed = matter(readFileSync(filePath, "utf8"));
    const guide = chapterGuides[chapter.slug];
    const currentType = parsed.data.type || "lecture";

    if (!force && parsed.data.migrationStatus !== "scaffolded") {
      continue;
    }

    const section = {
      number: parsed.data.sectionNumber,
      title: parsed.data.title,
      type: currentType,
      artifact: parsed.data.artifact,
    };

    const chapterGuide = {
      ...guide,
      reflection: reflectionByChapter[chapter.slug] || `What is the next evidence-ready step for ${chapter.title}?`,
    };
    if (dryRun) {
      console.log(`[dry-run] WRITE: lessons/${chapter.slug}/${sectionSlug}.mdx`);
      continue;
    }

    parsed.data.migrationStatus = "authored";
    parsed.content = bodyFor(chapter, section, chapterGuide);
    writeFileSync(filePath, matter.stringify(parsed.content, parsed.data));
  }
}

if (force || courseJson.migrationStatus !== "authored") {
  if (dryRun) {
    console.log("[dry-run] WRITE: course.json");
  } else {
    courseJson.migrationStatus = "authored";
    writeFileSync(courseJsonPath, `${JSON.stringify(courseJson, null, 2)}\n`);
  }
}

if (dryRun) {
  console.log("[dry-run] OTS-399 authoring complete (no files written).");
} else {
  console.log("Authored OTS-399 section files and updated migration status.");
}
