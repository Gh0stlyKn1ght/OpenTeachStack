import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const args = process.argv.slice(2);
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");

const root = process.cwd();
const courseSlug = "ots-320";
const courseRoot = join(root, "content", "courses", courseSlug);
const courseJsonPath = join(courseRoot, "course.json");

const chapterGuides = {
  "01-agent-safety-mindset": {
    focus: "what AI coding agents can safely handle and where a teacher keeps decision authority",
    decision:
      "defining clear permissions, boundaries, and escalation points before any agent begins changing files",
    caution:
      "allowing model output to bypass review or expose private classroom data in tool output.",
  },
  "02-repo-branch-workflow": {
    focus: "version-control habits that make agent assistance reversible and reviewable",
    decision: "how each generated change should flow through a branch, review, and rollback path",
    caution:
      "merging without checks or leaving unclear provenance for changes made by an agent.",
  },
  "03-prompting-coding-agents": {
    focus: "prompts that produce narrow, inspectable tasks rather than broad, speculative edits",
    decision:
      "writing constraints that force measurable outputs, safety boundaries, and explicit handoff notes",
    caution:
      "prompts that request broad repo changes, personal data, or hidden assumptions.",
  },
  "04-testing-verification": {
    focus: "verification habits that prove generated work is useful, safe, and reversible",
    decision:
      "which checks should always happen before sharing, classroom use, or publication",
    caution:
      "calling generated behavior complete without lint, route, accessibility, or rollback checks.",
  },
  "05-building-teacher-tools": {
    focus: "small, inspectable tooling that solves one workflow and remains teacher-owned",
    decision:
      "whether the tool improves teaching operations without introducing unnecessary complexity",
    caution:
      "creating a tool that is larger than the original problem or impossible to maintain without the agent.",
  },
  "06-reviewed-agent-build": {
    focus: "closing the loop with prompts, diffs, tests, and approvals in one reusable packet",
    decision:
      "what gets approved for reuse, what needs follow-up, and what stays private",
    caution:
      "shipping an agent build without explicit review evidence and clear constraints.",
  },
};

const sourceRefsByChapter = {
  "01-agent-safety-mindset": [
    {
      label: "OpenAI Codex documentation",
      url: "https://platform.openai.com/docs/guides",
    },
    {
      label: "Claude Code documentation",
      url: "https://docs.anthropic.com/en/docs/claude-code",
    },
    {
      label: "GitHub Branch Protection",
      url: "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/setting-branch-protection-rules",
    },
  ],
  "02-repo-branch-workflow": [
    {
      label: "GitHub pull requests",
      url: "https://docs.github.com/en/pull-requests",
    },
    {
      label: "GitHub forks and diffs",
      url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/about-pull-requests",
    },
    {
      label: "VS Code source control",
      url: "https://code.visualstudio.com/docs/sourcecontrol/overview",
    },
  ],
  "03-prompting-coding-agents": [
    {
      label: "OpenAI Codex documentation",
      url: "https://platform.openai.com/docs/api-reference/responses",
    },
    {
      label: "Claude Code documentation",
      url: "https://docs.anthropic.com/en/docs/claude-code",
    },
    {
      label: "GitHub workflow verification",
      url: "https://docs.github.com/en/pull-requests/guides",
    },
  ],
  "04-testing-verification": [
    {
      label: "Next.js linting",
      url: "https://nextjs.org/docs/app/building-your-application/configuring/eslint",
    },
    {
      label: "Next.js build docs",
      url: "https://nextjs.org/docs/app/building-your-application/deploying",
    },
    {
      label: "Route testing and status checks",
      url: "https://nextjs.org/docs/app/api-reference/functions/use-router",
    },
  ],
  "05-building-teacher-tools": [
    {
      label: "VS Code extension and editor references",
      url: "https://code.visualstudio.com/docs",
    },
    {
      label: "GitHub Actions security basics",
      url: "https://docs.github.com/en/actions/learn-github-actions/security",
    },
    {
      label: "Apps Script documentation",
      url: "https://developers.google.com/apps-script",
    },
  ],
  "06-reviewed-agent-build": [
    {
      label: "GitHub review practices",
      url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests",
    },
    {
      label: "OpenAI Codex documentation",
      url: "https://platform.openai.com/docs/guides",
    },
    {
      label: "Claude Code documentation",
      url: "https://docs.anthropic.com/en/docs/claude-code",
    },
  ],
};

const templateLinksByChapter = {
  "01-agent-safety-mindset": "",
  "02-repo-branch-workflow": "",
  "03-prompting-coding-agents": "/content/courses/ots-320/templates/safe-agent-prompt-template.md",
  "04-testing-verification": "/content/courses/ots-320/templates/fake-data-testing-protocol.md",
  "05-building-teacher-tools": "/content/courses/ots-320/templates/diff-review-checklist.md",
  "06-reviewed-agent-build": "",
};

function sectionMode(type, artifact, chapterArtifact) {
  if (type === "overview") {
    return {
      action: "establish the chapter boundary and safety posture before editing any student-facing artifact",
      evidence: "an orientation note with decisions, limits, and ownership.",
      review: "review decisions are tied to one specific workflow and one accountable owner.",
    };
  }
  if (type === "artifact" || type === "studio") {
    return {
      action: `build or update ${artifact ?? chapterArtifact} with real verification evidence.`,
      evidence: `a finished artifact linked to ${artifact ?? chapterArtifact}`,
      review: "the artifact includes owner, purpose, fake-data check, and revision plan.",
    };
  }
  if (type === "checkpoint") {
    return {
      action:
        "review the chapter outcome against safety, privacy, and reviewer-readiness before moving to the next chapter.",
      evidence: "a short checkpoint note that states what is pass, revise, or blocked.",
      review: "checkpoint includes what remains private, what is public, and what is deferred.",
    };
  }
  if (type === "workshop") {
    return {
      action: "run a small controlled workshop using fake inputs and explicit acceptance criteria.",
      evidence: "a workshop note that records diffs, test notes, and review outcome.",
      review: "outputs are testable and can be reversed without data loss.",
    };
  }
  return {
    action:
      "apply the chapter intent using one concrete workflow and one explicit constraint.",
    evidence: "a visible evidence line connected to the chapter artifact.",
    review: "work remains inspectable and teacher-owned.",
  };
}

function sourceSection(items) {
  return items
    .map((item, index) => `- [Source ${index + 1}: ${item.label}](${item.url})`)
    .join("\n");
}

function bodyFor(chapter, section) {
  const guide = chapterGuides[chapter.slug] ?? {
    focus: "a controlled code-and-content workflow for teachers using AI coding assistants.",
    decision: "what change should be reviewed first and why.",
    caution: "shipping generated changes without a visibility and rollback path.",
  };
  const mode = sectionMode(section.type, section.artifact, chapter.buildArtifact);
  const artifact = section.artifact ?? chapter.buildArtifact;
  const templatePath = templateLinksByChapter[chapter.slug];
  const sourceList = sourceSection(sourceRefsByChapter[chapter.slug] ?? []);

  const checklist = [
    `Interpret ${section.title} in context: ${guide.focus}`,
    `Use this section to ${mode.action}`,
    `Link the result to ${artifact} with ownership, dates, and review notes.`,
    `Attach source notes before any platform or workflow claims go public.`,
    `Decide what can be public, what stays private, and what is queued.`,
  ];

  const evidence = [
    `${mode.evidence}`,
    `Teacher-oriented explanation is clear enough for a colleague to recreate or review.`,
    `The section connects to the chapter artifact and course outcome.`,
    `A privacy and safety note is attached for any generated content or synthetic data use.`,
    `A revision action is recorded for one follow-up step.`,
  ];

  const verification = [
    `Apply the chapter caution: ${guide.caution}`,
    `${mode.review}`,
    "Use fake or synthetic examples only when this section involves student-like data.",
    "Run at least one check against version control or test output before reuse.",
    "Record source, route, and rollback decisions before publication.",
  ];

  return `# ${section.title}

## Core Idea

${chapter.title} is about ${guide.focus}. In this section, **${section.title}** turns that idea into a practical, teacher-owned process that stays reviewable and reversible.

The chapter decision is focused and specific: ${guide.decision}

## Do This

${checklist.map((item) => `- ${item}`).join("\n")}

## Evidence of Completion

${evidence.map((item) => `- ${item}`).join("\n")}

## Source and Template References

Use official references before making platform, tooling, or workflow claims:

${sourceList || "- Source references are queued for this section."}

${templatePath ? `- Course template: [${artifact} template](${templatePath})` : "- Course template is queued where needed for this section."}

## Accessibility, Privacy, and Safety Review

${verification.map((item) => `- ${item}`).join("\n")}

## Reflection

What is one concrete safety or review outcome from this section that improves teacher confidence in the next agent-assisted step?
`;
}

const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
let updated = 0;
let skipped = 0;

for (const chapter of courseJson.chapters) {
  for (let index = 0; index < chapter.lessonCount; index++) {
    const sectionSlug = `${chapter.number.padStart(2, "0")}-${index}`;
    const relativePath = `lessons/${chapter.slug}/${sectionSlug}.mdx`;
    const filePath = join(courseRoot, relativePath);

    if (!existsSync(filePath)) {
      throw new Error(`Missing OTS-320 course lesson file: ${chapter.slug}/${sectionSlug}.mdx`);
    }

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
      duration: parsed.data.duration,
    };

    if (dryRun) {
      console.log(`[dry-run] WRITE: ${relativePath}`);
      updated++;
      continue;
    }

    parsed.data.migrationStatus = "authored";
    parsed.content = bodyFor(chapter, section);
    writeFileSync(filePath, matter.stringify(parsed.content, parsed.data));
    updated++;
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

const mode = dryRun ? "[DRY RUN] " : "";
console.log(
  `${mode}Authored OTS-320 section files: ${updated}; preserved ${skipped} existing authored files.${force ? " (--force)" : ""}`,
);
if (!dryRun && skipped > 0 && !force) {
  console.log(`${skipped} non-authored or non-scaffolded files were preserved. Use --force to overwrite.`);
}
