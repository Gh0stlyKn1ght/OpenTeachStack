import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const args = process.argv.slice(2);
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");

const root = process.cwd();
const courseSlug = "ots-220";
const courseRoot = join(root, "content", "courses", courseSlug);
const courseJsonPath = join(courseRoot, "course.json");

const chapterGuides = {
  "01-automation-mindset": {
    focus:
      "choosing safe, repeatable automations for workflows where teacher time and consistency matter.",
    decision: "which tasks are worth automating first and what should stay manual.",
    risk: "building automation for brittle or unsafe workflows before the process itself is clear.",
  },
  "02-apps-script-basics": {
    focus:
      "learning Apps Script behavior with clear authorization, logging, and failure-handling habits.",
    decision: "how scripts connect to actual workflow boundaries and review points.",
    risk: "running scripts without test boundaries, rollback strategy, or readable error handling.",
  },
  "03-folder-file-generators": {
    focus:
      "using Sheets and Drive in predictable ways through idempotent folder creation.",
    decision: "what folder naming, ownership, and permissions model supports reliable reuse.",
    risk: "generating duplicate or wrong paths and burying maintenance responsibilities.",
  },
  "04-docs-from-sheet-rows": {
    focus:
      "transforming rows into deliverables without losing source context or version control.",
    decision: "what fields are required in each template run and who owns generated copies.",
    risk: "copying sensitive/incorrect data or generating documents without traceability.",
  },
  "05-forms-email-reminders": {
    focus:
      "using Forms and email safely while preserving clear audit trails and consent boundaries.",
    decision:
      "when reminders are useful, who is notified, and what privacy notices are needed.",
    risk: "sending incomplete, too frequent, or private information through automation.",
  },
  "06-teacher-automation-toolkit": {
    focus:
      "assembling a minimal, documented toolkit that another teacher can inspect and run safely.",
    decision: "what artifacts belong in the toolkit and how handoff happens after one cycle.",
    risk: "shipping a complex script bundle that no one can maintain or trust.",
  },
};

const sourceRefsByChapter = {
  "01-automation-mindset": [
    {
      label: "Google Apps Script Guide",
      url: "https://developers.google.com/apps-script/guides",
    },
    {
      label: "Apps Script Best Practices",
      url: "https://developers.google.com/apps-script/guides/support/best-practices",
    },
    {
      label: "Google Workspace Safety",
      url: "https://developers.google.com/workspace/security",
    },
    {
      label: "Privacy and Security Principles",
      url: "https://developers.google.com/workspace/admin/security/security-center",
    },
  ],
  "02-apps-script-basics": [
    {
      label: "Apps Script Services",
      url: "https://developers.google.com/apps-script/guides/services",
    },
    {
      label: "Triggers and Authorization",
      url: "https://developers.google.com/apps-script/guides/triggers",
    },
  ],
  "03-folder-file-generators": [
    {
      label: "DriveApp Reference",
      url: "https://developers.google.com/apps-script/reference/drive/drive-app",
    },
    {
      label: "Apps Script Services",
      url: "https://developers.google.com/apps-script/guides/services",
    },
  ],
  "04-docs-from-sheet-rows": [
    {
      label: "Spreadsheet Service",
      url: "https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-service",
    },
    {
      label: "Docs List and Templates",
      url: "https://developers.google.com/apps-script/reference/docs",
    },
  ],
  "05-forms-email-reminders": [
    {
      label: "Form Service",
      url: "https://developers.google.com/apps-script/reference/forms",
    },
    {
      label: "Mail Service",
      url: "https://developers.google.com/apps-script/reference/mail/mail-app",
    },
  ],
  "06-teacher-automation-toolkit": [
    {
      label: "Properties and Logging",
      url: "https://developers.google.com/apps-script/guides/services/authorization",
    },
    {
      label: "Apps Script Guides",
      url: "https://developers.google.com/apps-script/guides",
    },
  ],
};

const templateLinksByChapter = {
  "01-automation-mindset":
    "/content/courses/ots-220/templates/automation-candidate-template.md",
  "02-apps-script-basics":
    "/content/courses/ots-220/templates/custom-menu-template.md",
  "03-folder-file-generators":
    "/content/courses/ots-220/templates/folder-generator-worksheet.md",
  "04-docs-from-sheet-rows":
    "/content/courses/ots-220/templates/doc-generation-template.md",
  "05-forms-email-reminders":
    "/content/courses/ots-220/templates/reminder-automation-safety-checklist.md",
  "06-teacher-automation-toolkit":
    "/content/courses/ots-220/templates/automation-toolkit-release-checklist.md",
};

function sectionMode(type, artifact, chapterArtifact) {
  if (type === "overview") {
    return {
      action: "preview the automation outcome and define a safe first manual-to-automation cutover.",
      evidence: "a chapter orientation note",
      verify: "the automation target can be tested safely with a copy before rollout.",
    };
  }
  if (type === "artifact" || type === "studio") {
    return {
      action: `build or revise the ${artifact ?? chapterArtifact}`,
      evidence: artifact ?? chapterArtifact,
      verify: "the output is auditable and can be removed without harming existing workflow.",
    };
  }
  if (type === "checkpoint") {
    return {
      action: "review the chapter artifact and define one maintenance step.",
      evidence: "a checkpoint note",
      verify: "the checkpoint decision is explicit and actionable.",
    };
  }
  if (type === "workshop") {
    return {
      action: "practice the workflow with a test dataset and document exactly what changed.",
      evidence: "a reviewed workshop output",
      verify: "the workflow works in at least one representative test case.",
    };
  }
  return {
    action: "apply the chapter logic to one real classroom workflow.",
    evidence: "a short decision note or script check",
    verify: "the change is useful, safe, and reversible.",
  };
}

function uniqueList(items) {
  return [...new Set(items.filter(Boolean))];
}

function bodyFor(chapter, section) {
  const guide = chapterGuides[chapter.slug] ?? {
    focus: "safe, readable teacher automation.",
    decision: "where to automate and where to keep manual control.",
    risk: "building automation that reduces teacher control.",
  };
  const mode = sectionMode(section.type, section.artifact, chapter.buildArtifact);
  const artifact = section.artifact ?? chapter.buildArtifact;
  const templatePath = templateLinksByChapter[chapter.slug];
  const sources = sourceRefsByChapter[chapter.slug] ?? [];

  const doThis = uniqueList([
    `Name the classroom workflow issue connected to ${section.title}.`,
    `Use this section to ${mode.action}.`,
    `Record the decision tied to ${guide.decision}.`,
    `Save evidence in support of the chapter artifact: ${artifact}.`,
    `Add one rollback or stop condition before publishing or sharing anything externally.`,
  ]);

  const evidence = uniqueList([
    `${mode.evidence} exists for ${section.title}.`,
    `The work explicitly connects to ${artifact} and one teacher context.`,
    `A source or platform behavior note is attached where needed.`,
    `A safety note is included for any data, email, or file-write action.`,
  ]);

  const verify = uniqueList([
    "Do not include student-identifiable data, credentials, or private school details.",
    `Check for the chapter risk: ${guide.risk}.`,
    "Run a preview or copy-test before any live classroom or student workflow use.",
    `Use official docs for behavior, permissions, and quota expectations.`,
    "Keep instructions readable for the next teacher who inherits the script or workflow.",
    mode.verify,
  ]);

  const sourceLines = sources
    .slice(0, 4)
    .map((source, index) => `- [Source ${index + 1}: ${source.label}](${source.url})`)
    .join("\n");

  return `# ${section.title}

## Core Idea

${chapter.title} is about ${guide.focus}. In this section, **${section.title}** turns that automation goal into a safe, teacher-owned move that can be repeated and reviewed.

The chapter goal is to keep outcomes useful while preserving rollback and privacy boundaries.  

## Do This

${doThis.map((item) => `- ${item}`).join("\n")}

## Evidence of Completion

${evidence.map((item) => `- ${item}`).join("\n")}

## Source and Template References

Use Source Bank-backed references as the official evidence for behavior claims:

${sourceLines || "- Reference list is queued while sources are verified."}

- ${templatePath ? `Template artifact: [${artifact} template](${templatePath})` : "Template is queued."}

## Verification Checks

${verify.map((item) => `- ${item}`).join("\n")}

## Reflection

What is one thing in this section that made the automation safer, simpler, or easier to hand off, and what would you still refuse to automate?
`;
}

const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
let updated = 0;
let skipped = 0;

for (const chapter of courseJson.chapters) {
  const chapterRoot = join(courseRoot, "lessons", chapter.slug);
  if (!existsSync(chapterRoot)) {
    throw new Error(`Missing OTS-220 chapter folder: ${chapter.slug}`);
  }

  const files = readdirSync(chapterRoot)
    .filter((name) => name.endsWith(".mdx"))
    .sort((a, b) => a.localeCompare(b));

  for (const fileName of files) {
    const filePath = join(chapterRoot, fileName);
    const parsed = matter(readFileSync(filePath, "utf8"));

    if (!force && parsed.data.migrationStatus !== "scaffolded") {
      skipped++;
      continue;
    }

    const section = {
      number: parsed.data.sectionNumber,
      title: parsed.data.title,
      type: parsed.data.type,
      artifact: parsed.data.artifact,
    };

    if (dryRun) {
      console.log(`[dry-run] WRITE: lessons/${chapter.slug}/${fileName}`);
      updated++;
      continue;
    }

    parsed.data.migrationStatus = "generated";
    parsed.content = bodyFor(chapter, section);
    writeFileSync(filePath, matter.stringify(parsed.content, parsed.data));
    updated++;
  }
}

if (force || courseJson.migrationStatus !== "generated") {
  if (dryRun) {
    console.log("[dry-run] WRITE: course.json");
  } else {
    courseJson.migrationStatus = "generated";
    writeFileSync(courseJsonPath, `${JSON.stringify(courseJson, null, 2)}\n`);
  }
}

const mode = dryRun ? "[DRY RUN] " : "";
console.log(
  `${mode}Generated OTS-220 section files: ${updated}; preserved ${skipped} existing generated files.${
    force ? " (--force)" : ""
  }`,
);
if (!dryRun && skipped > 0 && !force) {
  console.log(
    `${skipped} non-generated or non-scaffolded files were preserved. Use --force to overwrite.`,
  );
}
