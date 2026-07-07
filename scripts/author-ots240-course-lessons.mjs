import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { assertCourseWriteAllowed } from "./lib/course-locks.mjs";
import matter from "gray-matter";

const args = process.argv.slice(2);
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");

const root = process.cwd();
const courseSlug = "ots-240";
const courseRoot = join(root, "content", "courses", courseSlug);
const courseJsonPath = join(courseRoot, "course.json");

const chapterGuides = {
  "01-open-resource-mindset": {
    focus:
      "helping teachers choose materials that are clearly reusable and appropriately licensed",
    decision:
      "what this curriculum includes, what must stay local, and what gets explicit attribution",
    risk: "copying materials without documenting legal rights, provenance, or source trust.",
  },
  "02-github-foundations": {
    focus:
      "helping teachers use GitHub as a clean publication and version-control workflow, not a mystery.",
    decision:
      "what belongs in public curriculum repositories and what should stay private or local",
    risk: "publishing links, files, or identities before documentation, review, and permissions are set.",
  },
  "03-writing-readmes": {
    focus:
      "creating repository documentation that is short, clear, and reusable by another teacher.",
    decision:
      "what context, instructions, and limits are needed before another teacher can trust the repo",
    risk: "shipping a README that sounds confident but does not help actual classroom use.",
  },
  "04-contribution-review": {
    focus: "adding review habits so updates can be safely proposed, inspected, and revised.",
    decision:
      "how to define contribution boundaries without creating endless churn or unmanaged edits",
    risk: "accepting changes from vague workflows without traceability and review notes.",
  },
  "05-publishing-attribution": {
    focus:
      "publishing content with clear rights, attribution, and expectations for safe reuse.",
    decision:
      "how to publish safely while naming what others may and may not do with the content",
    risk: "misstating licensing or leaving attribution gaps that weaken trust and legality.",
  },
  "06-open-curriculum-repository": {
    focus:
      "assembling a minimal but complete open repository that can be updated and reviewed.",
    decision:
      "which files prove the repository is real, safe, and maintainable over time",
    risk: "building a repository shell with no review, no maintenance plan, or missing release checks.",
  },
};

const sourceRefsByChapter = {
  "01-open-resource-mindset": [
    {
      label: "Creative Commons",
      url: "https://creativecommons.org/licenses/",
    },
    {
      label: "Openverse Resource Licensing",
      url: "https://openverse.org/page/licensing/",
    },
    {
      label: "Copyright basics for educators",
      url: "https://www.copyright.gov/help/faq/faq-copyright.html",
    },
    {
      label: "Open Educational Resources",
      url: "https://www.oercommons.org",
    },
  ],
  "02-github-foundations": [
    {
      label: "GitHub Docs: About repositories",
      url: "https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories",
    },
    {
      label: "GitHub Docs: Introduction to repositories",
      url: "https://docs.github.com/en/get-started/quickstart/create-a-repo",
    },
    {
      label: "GitHub Docs: Writing and editing repositories",
      url: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features",
    },
  ],
  "03-writing-readmes": [
    {
      label: "GitHub Docs: About READMEs",
      url: "https://docs.github.com/en/get-started/start-your-journey/about-readmes",
    },
    {
      label: "GitHub Docs: Markdown basics",
      url: "https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github",
    },
    {
      label: "CommonMark",
      url: "https://commonmark.org/help/",
    },
  ],
  "04-contribution-review": [
    {
      label: "GitHub Docs: Issues and pull requests",
      url: "https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues",
    },
    {
      label: "GitHub Docs: Pull requests",
      url: "https://docs.github.com/en/pull-requests",
    },
    {
      label: "GitHub Docs: Review requested changes",
      url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests",
    },
  ],
  "05-publishing-attribution": [
    {
      label: "Creative Commons: license chooser",
      url: "https://creativecommons.org/choose/",
      },
    {
      label: "GitHub Docs: Adding a license to a repository",
      url: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository",
    },
    {
      label: "Wikimedia attribution guide",
      url: "https://commons.wikimedia.org/wiki/Commons:Creditline",
    },
  ],
  "06-open-curriculum-repository": [
    {
      label: "GitHub Docs: Repository security and maintenance",
      url: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features",
    },
    {
      label: "GitHub Docs: Dependabot alerts",
      url: "https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide",
    },
    {
      label: "GitHub Docs: Archiving repositories",
      url: "https://docs.github.com/en/repositories/archiving-a-github-repository",
    },
  ],
};

const templateLinksByChapter = {
  "01-open-resource-mindset":
    "/content/courses/ots-240/templates/open-resource-decision-log-template.md",
  "02-github-foundations":
    "/content/courses/ots-240/templates/github-repo-readiness-checklist.md",
  "03-writing-readmes": "/content/courses/ots-240/templates/course-readme-template.md",
  "04-contribution-review":
    "/content/courses/ots-240/templates/contribution-review-checklist.md",
  "05-publishing-attribution":
    "/content/courses/ots-240/templates/publishing-attribution-license-template.md",
  "06-open-curriculum-repository":
    "/content/courses/ots-240/templates/repository-release-checklist.md",
};

function sectionMode(type, artifact, chapterArtifact) {
  if (type === "overview") {
    return {
      action: "set expectations for the chapter artifact and identify a safe starter scope.",
      evidence: "a chapter orientation note",
      verify: "the scope is reviewable by a colleague in under one teaching cycle.",
    };
  }
  if (type === "artifact" || type === "studio") {
    return {
      action: `build or revise the ${artifact ?? chapterArtifact}`,
      evidence: artifact ?? chapterArtifact,
      verify: "the artifact has a clear owner, source notes, and review boundary.",
    };
  }
  if (type === "checkpoint") {
    return {
      action: "review the chapter artifact and define one next maintenance action.",
      evidence: "a checkpoint note",
      verify: "the checkpoint identifies what to keep private and what to improve next.",
    };
  }
  if (type === "workshop") {
    return {
      action: "run this workshop with a safe, teacher-owned example.",
      evidence: "a workshop output or notes",
      verify: "the output is testable, reversible, and free of private details.",
    };
  }
  return {
    action: "apply chapter concepts to one realistic teaching workflow.",
    evidence: "a short decision note",
    verify: "the change improves trust, reuse, and maintenance with minimal risk.",
  };
}

function uniqueList(items) {
  return [...new Set(items.filter(Boolean))];
}

function sourceSection(sources) {
  return sources
    .slice(0, 4)
    .map((source, index) => `- [Source ${index + 1}: ${source.label}](${source.url})`)
    .join("\n");
}

function bodyFor(chapter, section) {
  const guide = chapterGuides[chapter.slug] ?? {
    focus: "open, practical educator-owned publishing.",
    decision: "what this section proves and why it is safe.",
    risk: "publishing or merging unvetted curriculum content.",
  };
  const mode = sectionMode(section.type, section.artifact, chapter.buildArtifact);
  const artifact = section.artifact ?? chapter.buildArtifact;
  const templatePath = templateLinksByChapter[chapter.slug];
  const sources = sourceRefsByChapter[chapter.slug] ?? [];
  const sourceList = sourceSection(sources, chapter);

  const doThis = uniqueList([
    `Identify the teaching context connected to ${section.title}.`,
    `Use this section to ${mode.action}.`,
    `Choose one decision that protects reuse, attribution, or version safety.`,
    `Save evidence for ${artifact} and connect it to the chapter final output.`,
    `Record one privacy/safety boundary before sharing this section publicly.`,
  ]);

  const evidence = uniqueList([
    `${mode.evidence} exists for ${section.title}.`,
    `The work explicitly connects to ${artifact}.`,
    `A source or platform note is attached to policy- or tool-dependent choices.`,
    `The section includes a next step that supports maintenance and review.`,
  ]);

  const verify = uniqueList([
    "Do not include student-identifiable details, real school names, private keys, or class rosters.",
    `Check for chapter risk: ${guide.risk}`,
    "Verify attribution and reuse rights before publication.",
    "Use only fictional or scrubbed examples in any workshop output.",
    "Use fake test data when demonstrating repository actions.",
    mode.verify,
  ]);

  return `# ${section.title}

## Core Idea

${chapter.title} is about ${guide.focus}. In this section, **${section.title}** turns this open publishing goal into one concrete teacher-owned artifact.

The chapter goal is to keep repository work reusable, explicit, and safe enough for another educator to trust.

## Do This

${doThis.map((item, i) => (section.lessonType === "artifact-build" || section.lessonType === "workflow") ? `${i + 1}. ${item}` : `- ${item}`).join("\n")}

## Evidence of Completion

${evidence.map((item) => `- ${item}`).join("\n")}

## Source and Template References

Use official Source Bank-backed references before publishing claims:

${sourceList || "- Source references are queued for verification."}

- ${templatePath ? `Template artifact: [${artifact} template](${templatePath})` : "Template is queued."}

## Verification Checks

${verify.map((item) => `- ${item}`).join("\n")}

## Reflection

What choice in this section made the course repository safer or easier for another teacher to pick up?
`;
}

const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
let updated = 0;
let skipped = 0;

for (const chapter of courseJson.chapters) {
  const chapterRoot = join(courseRoot, "lessons", chapter.slug);
  if (!existsSync(chapterRoot)) {
    throw new Error(`Missing OTS-240 chapter folder: ${chapter.slug}`);
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
      lessonType: parsed.data.lessonType,
      artifact: parsed.data.artifact,
    };

    if (dryRun) {
      console.log(`[dry-run] WRITE: lessons/${chapter.slug}/${fileName}`);
      updated++;
      continue;
    }

    parsed.data.migrationStatus = "generated";
    parsed.content = bodyFor(chapter, section);
    assertCourseWriteAllowed(filePath, { operation: "write lesson body" });
    writeFileSync(filePath, matter.stringify(parsed.content, parsed.data));
    updated++;
  }
}

if (force || courseJson.migrationStatus !== "generated") {
  if (dryRun) {
    console.log("[dry-run] WRITE: course.json");
  } else {
    courseJson.migrationStatus = "generated";
    assertCourseWriteAllowed(courseJsonPath, { operation: "write course metadata" });
    writeFileSync(courseJsonPath, `${JSON.stringify(courseJson, null, 2)}\n`);
  }
}

const mode = dryRun ? "[DRY RUN] " : "";
console.log(
  `${mode}Generated OTS-240 section files: ${updated}; preserved ${skipped} existing generated files.${force ? " (--force)" : ""}`,
);
if (!dryRun && skipped > 0 && !force) {
  console.log(`${skipped} non-generated or non-scaffolded files were preserved. Use --force to overwrite.`);
}
