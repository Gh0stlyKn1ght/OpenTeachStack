import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const args = process.argv.slice(2);
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");

const root = process.cwd();
const courseSlug = "ots-301";
const courseRoot = join(root, "content", "courses", courseSlug);
const courseJsonPath = join(courseRoot, "course.json");

const chapterGuides = {
  "01-course-site-strategy": {
    focus:
      "building a safe, repeatable site planning process before publishing a class-facing learning space",
    decision:
      "which audiences are served, what data remains private, and what goes public first",
    caution:
      "launching a public course hub without documented privacy boundaries or clear source notes.",
  },
  "02-web-basics": {
    focus:
      "teaching reliable web basics that support readability, maintenance, and trustworthy URLs",
    decision:
      "what content structure and link behavior creates a predictable browsing experience",
    caution:
      "publishing pages that depend on unknown links, unclear behavior, or inaccessible structure.",
  },
  "03-course-hub-structure": {
    focus:
      "organizing a course site into reusable sections so learners and adults can find essentials quickly",
    decision: "how pages, resources, updates, and sources are grouped and reviewed",
    caution:
      "creating a page architecture that looks full but creates hidden dead ends and stale routes.",
  },
  "04-accessibility-safety": {
    focus:
      "ensuring public educational sites remain accessible and policy-safe from day one",
    decision:
      "what must be removed, rewritten, labeled, or queued before public access",
    caution:
      "publishing learning pages with missing labels, missing sources, inaccessible patterns, or hidden student data.",
  },
  "05-deployment-maintenance": {
    focus:
      "creating deployment and maintenance routines that are consistent, documented, and reversible",
    decision:
      "what is checked after every publish and who owns the maintenance loop",
    caution:
      "losing ownership when deployment steps are tribal knowledge or undocumented.",
  },
  "06-published-course-hub": {
    focus:
      "publishing a course hub that can be reviewed, reused, and improved without exposing private material",
    decision:
      "which pages, links, files, and notes are public and which are intentionally private",
    caution:
      "declaring a site complete without a source, accessibility, privacy, and broken-link pass.",
  },
};

const sourceRefsByChapter = {
  "01-course-site-strategy": [
    {
      label: "MDN Learn Web Development",
      url: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
    },
    {
      label: "CommonMark",
      url: "https://spec.commonmark.org/",
    },
    {
      label: "Google accessibility first steps",
      url: "https://developers.google.com/web/fundamentals/accessibility/overview",
    },
  ],
  "02-web-basics": [
    {
      label: "MDN Learn Web Development",
      url: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
    },
    {
      label: "W3C WAI Accessibility",
      url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/",
    },
    {
      label: "CommonMark",
      url: "https://spec.commonmark.org/",
    },
  ],
  "03-course-hub-structure": [
    {
      label: "MDN: Basic HTML",
      url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started_with_the_web/HTML_basics",
    },
    {
      label: "CommonMark",
      url: "https://spec.commonmark.org/",
    },
  ],
  "04-accessibility-safety": [
    {
      label: "W3C WAI Accessibility Guidelines",
      url: "https://www.w3.org/WAI/standards-guidelines/wcag/",
    },
    {
      label: "WCAG Quick Reference",
      url: "https://www.w3.org/WAI/WCAG21/quickref/",
    },
    {
      label: "MDN Accessibility",
      url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    },
  ],
  "05-deployment-maintenance": [
    {
      label: "GitHub Pages",
      url: "https://docs.github.com/en/pages",
    },
    {
      label: "Vercel deployment docs",
      url: "https://vercel.com/docs",
    },
    {
      label: "Cloudflare Pages",
      url: "https://developers.cloudflare.com/pages/",
    },
  ],
  "06-published-course-hub": [
    {
      label: "GitHub Pages",
      url: "https://docs.github.com/en/pages",
    },
    {
      label: "Cloudflare DNS overview",
      url: "https://developers.cloudflare.com/dns/",
    },
    {
      label: "IANA reserved domains",
      url: "https://www.iana.org/help/example-domains",
    },
  ],
};

const templateLinksByChapter = {
  "01-course-site-strategy": "",
  "02-web-basics": "",
  "03-course-hub-structure":
    "/content/courses/ots-301/templates/course-hub-sitemap-template.md",
  "04-accessibility-safety": "",
  "05-deployment-maintenance": "",
  "06-published-course-hub": "",
};

function uniqueList(items) {
  return [...new Set(items.filter(Boolean))];
}

function sectionMode(type, artifact, chapterArtifact) {
  if (type === "overview") {
    return {
      action: "set scope, intent, and boundaries before creating any public-facing page or link",
      evidence: "an orientation note tied to the chapter artifact",
      verify: "the orientation note includes source notes and a safety boundary.",
    };
  }
  if (type === "artifact" || type === "studio") {
    return {
      action: `build or revise ${artifact ?? chapterArtifact} using source-backed references`,
      evidence: artifact ?? chapterArtifact,
      verify: "the artifact includes maintenance notes, update date, and source notes.",
    };
  }
  if (type === "checkpoint") {
    return {
      action: "review the chapter outcomes and set one next improvement or maintenance action",
      evidence: "a checkpoint note",
      verify: "the checkpoint confirms that public safety and accessibility checks remain visible.",
    };
  }
  if (type === "workshop") {
    return {
      action: "run a safe workshop pass with fictional examples only",
      evidence: "a workshop artifact or draft",
      verify: "the draft is reversible and contains no private links or account details.",
    };
  }
  return {
    action: "apply the chapter model to one realistic teaching workflow",
    evidence: "a short improvement note",
    verify: "the change improves reuse, visibility, and safety without adding unnecessary risk.",
  };
}

function sourceSection(items) {
  return items
    .slice(0, 4)
    .map((item, index) => `- [Source ${index + 1}: ${item.label}](${item.url})`)
    .join("\n");
}

function bodyFor(chapter, section) {
  const guide = chapterGuides[chapter.slug] ?? {
    focus: "building trustworthy, maintainable course-site teaching materials.",
    decision: "what this section proves for the chapter.",
    caution:
      "publishing a page or link without a safety check and a clear maintenance owner.",
  };
  const mode = sectionMode(section.type, section.artifact, chapter.buildArtifact);
  const artifact = section.artifact ?? chapter.buildArtifact;
  const templatePath = templateLinksByChapter[chapter.slug];
  const sourceList = sourceSection(sourceRefsByChapter[chapter.slug] ?? []);

  const doThis = uniqueList([
    `Identify the teaching workflow tied to ${section.title}.`,
    `Use this section to ${mode.action}.`,
    `Save evidence for ${artifact} and mark what stays private while still useful for review.`,
    `Attach source notes before publishing any claim about a web platform, hosting behavior, or policy.`,
    `Record who owns the maintenance loop for this chapter artifact.`,
  ]);

  const evidence = uniqueList([
    `${mode.evidence} exists for ${section.title}.`,
    `The work directly connects to ${artifact}.`,
    `Source, accessibility, and safety notes are attached or queued before publication.`,
    `A maintenance or revision action is written for public content.`,
  ]);

  const verify = uniqueList([
    "Do not include student-identifiable details, roster data, private links, or access tokens.",
    `Check for the chapter risk: ${guide.caution}`,
    "Use fictional or scrubbed examples in workshop outputs.",
    "Document the chapter safety boundary, update rhythm, and owner.",
    mode.verify,
  ]);

  return `# ${section.title}

## Core Idea

${chapter.title} is about ${guide.focus}. In this section, **${section.title}** turns that focus into a practical course-site authoring move.

The chapter intent is to keep the page set clear, maintainable, and safe enough to review in one pass.

## Do This

${doThis.map((item) => `- ${item}`).join("\n")}

## Evidence of Completion

${evidence.map((item) => `- ${item}`).join("\n")}

## Source and Template References

Use official references before publishing site behavior, hosting steps, or policy guidance:

${sourceList || "- Source references are queued for verification before launch."}

${templatePath ? `- Course template: [${chapter.buildArtifact} template](${templatePath})` : "- Course template is queued for this chapter."}

## Accessibility and Safety Checks

${verify.map((item) => `- ${item}`).join("\n")}

## Reflection

What is one change in this section that makes the published course hub more reviewable or safer for a colleague?
`;
}

const courseJson = JSON.parse(readFileSync(courseJsonPath, "utf8"));
const chapterMap = new Map(courseJson.chapters.map((chapter) => [chapter.slug, chapter]));
let updated = 0;
let skipped = 0;

for (const [chapterSlug, chapter] of chapterMap.entries()) {
  const chapterRoot = join(courseRoot, "lessons", chapterSlug);
  if (!existsSync(chapterRoot)) {
    throw new Error(`Missing OTS-301 chapter folder: ${chapterSlug}`);
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
      duration: parsed.data.duration,
    };

    if (dryRun) {
      console.log(`[dry-run] WRITE: lessons/${chapterSlug}/${fileName}`);
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
  `${mode}Generated OTS-301 section files: ${updated}; preserved ${skipped} existing generated files.${force ? " (--force)" : ""}`,
);
if (!dryRun && skipped > 0 && !force) {
  console.log(`${skipped} non-generated or non-scaffolded files were preserved. Use --force to overwrite.`);
}
