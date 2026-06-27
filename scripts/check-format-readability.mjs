import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const reportOnly = process.argv.includes("--report-only");
const reportPath = path.join(root, "docs", "reports", "FORMAT_READABILITY_AUDIT.md");
const scanRoots = [
  path.join(root, "content", "courses"),
  path.join(root, "content", "blog"),
  path.join(root, "src", "app", "blog"),
];

const exts = new Set([".md", ".mdx"]);
const allowedLessonTypes = new Set([
  "concept",
  "framework",
  "artifact-build",
  "comparison",
  "workflow",
  "case-study",
  "checkpoint",
  "capstone-assembly",
  "chapter-overview",
]);

const supportFolderFragments = [
  "/assets/",
  "/docs/",
  "/templates/",
  "/references/",
  "/examples/",
];

const requiredBlogSections = [
  "What happened",
  "Why it bothered me",
  "What was really going on",
  "The lesson",
  "The fix",
  "What teachers can use",
  "Final thought",
];

const lessonTypeRules = {
  "concept": {
    sections: [
      ["Problem", "Teacher Problem", "The Problem", "Why This Matters"],
      ["Concept", "The Concept", "Core Idea", "The Idea"],
      ["Concrete Example", "Example", "Before and After"],
      ["Common Misunderstanding", "Common Mistake", "What Goes Wrong"],
      ["Quick Check", "Takeaway", "Teacher Takeaway"],
    ],
  },
  "framework": {
    sections: [
      ["Why This Framework Exists", "Why This Matters", "The Problem"],
      ["Framework", "The Framework", "Core Framework"],
      ["Parts of the Model", "Parts", "The Parts"],
      ["How to Use It", "Use the Framework", "Put It to Work"],
      ["Failure Mode", "Takeaway", "Common Failure"],
    ],
  },
  "artifact-build": {
    sections: [
      ["Artifact", "The Artifact", "What the Artifact Does"],
      ["Build Step", "Build Steps", "Step 1", "Step 1:"],
      ["Example Output", "Finished Example", "Example"],
      ["Quality Check", "Review Check", "Checklist"],
      ["Capstone Connection", "Save the Artifact", "What to Keep for the Capstone"],
    ],
    requireNumbered: true,
    requireChecklistLike: true,
  },
  "comparison": {
    sections: [
      ["Confusion", "The Confusion", "The Common Confusion", "The Problem"],
      ["Side-by-Side Comparison", "Comparison", "Compare"],
      ["Weak Version", "Weak Example", "Weak"],
      ["Better Version", "Better Example", "Better"],
      ["Decision Rule", "Rule", "Teacher Rule"],
      ["Practice", "Quick Check", "Try It"],
    ],
    requireTableForWeakBetter: true,
  },
  "workflow": {
    sections: [
      ["When to Use This Workflow", "When to Use It", "When This Helps", "The Workflow"],
      ["Workflow Steps", "Steps", "Step 1", "Step 1:"],
      ["Example Run", "Example", "Put It Together"],
      ["Review Gate", "Review", "Check"],
      ["Next Action", "Next Step", "What to Do Next"],
    ],
    requireNumbered: true,
  },
  "case-study": {
    sections: [
      ["What Happened", "The Scenario", "Classroom Scenario", "The Common Scenario"],
      ["What Looked Fine", "What Looked Okay", "What Seemed Fine"],
      ["What Was Actually Broken", "What Was Broken", "The Problem"],
      ["Root Cause", "Why It Happened", "What Caused It"],
      ["The Fix", "Fix", "A Better Direction"],
      ["Rule We Keep", "Teacher Takeaway", "Takeaway"],
    ],
  },
  "checkpoint": {
    sections: [
      ["What You Are Checking", "Review", "Review Question 1", "Checkpoint"],
      ["Review Criteria", "Criteria", "Check"],
      ["Self-Audit Checklist", "Checklist", "Exit Check"],
      ["Evidence to Save", "What to Save", "What to Keep"],
      ["Next Step", "Next Action", "What to Keep for the Capstone"],
    ],
    requireChecklistLike: true,
  },
  "capstone-assembly": {
    sections: [
      ["What You Are Assembling", "What the Packet Needs", "Packet Template"],
      ["Required Pieces", "Required Artifacts", "What the Packet Includes"],
      ["Assembly Steps", "Build Step", "Step 1", "Step 1:"],
      ["Release Check", "Final Review", "Finished Packet Checklist"],
      ["Final Revision Note", "Revision Plan", "Final Review and Revision Plan"],
    ],
    requireNumbered: true,
  },
  "chapter-overview": {
    sections: [
      ["Chapter Purpose", "Why This Chapter Matters", "Why This Matters"],
      ["What You Will Build", "What This Chapter Builds", "What You Will Build"],
      ["Lessons in This Chapter", "Chapter Path", "The Chapter Path"],
      ["Exit Criteria", "What to Keep", "Before You Move On"],
    ],
  },
};

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (!exts.has(path.extname(entry.name))) return [];
    return [full];
  });
}

function relative(file) {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

function splitFrontmatter(text) {
  const match = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
  if (!match) return { data: {}, body: text };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const item = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!item) continue;
    const [, key, rawValue] = item;
    data[key] = rawValue.trim().replace(/^['"]|['"]$/g, "");
  }

  return { data, body: text.slice(match[0].length) };
}

function stripCodeFences(text) {
  return text.replace(/```[\s\S]*?```/g, "");
}

function headingExists(body, labels) {
  return labels.some((label) => {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`^#{2,4}\\s+${escaped}(?:\\s|$|:)`, "mi").test(body);
  });
}

function includesAny(body, labels) {
  const lower = body.toLowerCase();
  return labels.some((label) => lower.includes(label.toLowerCase()));
}

function sectionSatisfied(body, labels) {
  return headingExists(body, labels) || includesAny(body, labels);
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function paragraphBlocks(body) {
  const clean = stripCodeFences(body)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .join("\n");

  return clean
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .filter((block) => !/^#{1,6}\s/m.test(block))
    .filter((block) => !/^[-*+]\s+/m.test(block))
    .filter((block) => !/^\d+\.\s+/m.test(block))
    .filter((block) => !/^>\s+/m.test(block))
    .filter((block) => !/^\|.*\|$/m.test(block))
    .filter((block) => !/^<\/?[A-Za-z]/m.test(block));
}

function longestPlainRun(body) {
  const blocks = stripCodeFences(body).split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  let current = 0;
  let longest = 0;

  for (const block of blocks) {
    const isPlain = !/^#{1,6}\s/m.test(block)
      && !/^[-*+]\s+/m.test(block)
      && !/^\d+\.\s+/m.test(block)
      && !/^>\s+/m.test(block)
      && !/^\|.*\|$/m.test(block)
      && !/^```/m.test(block)
      && !/^<\/?[A-Za-z]/m.test(block);

    current = isPlain ? current + 1 : 0;
    longest = Math.max(longest, current);
  }

  return longest;
}

function hasList(body) {
  return /^\s*([-*+]\s+|\d+\.\s+|[-*+]\s+\[[ xX]\]\s+)/m.test(body);
}

function hasNumberedList(body) {
  return /^\s*\d+\.\s+/m.test(body);
}

function hasNumberedSteps(body) {
  // A numbered list OR a sequence of "## Step 1:" / "### Step 2" headings both
  // communicate a numbered process; artifact builds often use step headings so
  // each step can carry its own code block or template.
  if (hasNumberedList(body)) return true;
  const stepHeadings = body.match(/^#{2,4}\s+Step\s+\d+/gim);
  return (stepHeadings?.length ?? 0) >= 2;
}

function hasChecklist(body) {
  return /^\s*[-*+]\s+\[[ xX]\]\s+/m.test(body) || /^\s*[-*+]\s+/m.test(body);
}

function hasTable(body) {
  return /^\|.*\|\s*$/m.test(body);
}

function classify(file) {
  const rel = relative(file);
  if (rel.startsWith("content/blog/authors/")) return "support";
  if (/README\.mdx?$/i.test(rel)) return "support";
  if (supportFolderFragments.some((fragment) => rel.includes(fragment))) return "support";
  if (rel.startsWith("content/blog/") || rel.startsWith("src/app/blog/")) return "blog";
  if (rel.startsWith("content/courses/") && rel.includes("/lessons/") && rel.endsWith(".mdx")) return "lesson";
  if (rel.startsWith("content/courses/")) return "support";
  return "other";
}

function inferLessonType(file, frontmatter, body) {
  if (frontmatter.lessonType && allowedLessonTypes.has(frontmatter.lessonType)) {
    return { lessonType: frontmatter.lessonType, inferred: false, unknown: false };
  }

  const rel = relative(file).toLowerCase();
  const title = String(frontmatter.title ?? "").toLowerCase();
  const existingType = String(frontmatter.type ?? "").toLowerCase();
  const combined = `${rel} ${title} ${existingType}`;

  if (/\b\d{2}-0\.mdx$/.test(rel) || existingType === "overview") return { lessonType: "chapter-overview", inferred: true, unknown: false };
  if (combined.includes("checkpoint") || existingType === "checkpoint" || existingType === "review") return { lessonType: "checkpoint", inferred: true, unknown: false };
  if (combined.includes("mini-course content packet") || combined.includes("capstone") || existingType === "capstone") return { lessonType: "capstone-assembly", inferred: true, unknown: false };
  if (combined.includes("build artifact") || existingType === "artifact") return { lessonType: "artifact-build", inferred: true, unknown: false };
  if (existingType === "framework") return { lessonType: "framework", inferred: true, unknown: false };
  if (existingType === "workflow" || existingType === "practice") return { lessonType: "workflow", inferred: true, unknown: false };
  if (existingType === "comparison" || /\b(vs|versus)\b/.test(combined) || combined.includes("side-by-side")) return { lessonType: "comparison", inferred: true, unknown: false };
  if (existingType === "case-study" || /mistake|failure|trap|what happened|broken|fake/.test(combined)) return { lessonType: "case-study", inferred: true, unknown: false };
  if (existingType === "concept" || existingType === "safety" || existingType === "source-check") return { lessonType: "concept", inferred: true, unknown: false };

  return { lessonType: "unknown", inferred: true, unknown: true };
}

function analyzeLessonStructure(body, lessonType) {
  const rule = lessonTypeRules[lessonType];
  const problems = [];
  const recommendations = [];

  if (!rule) {
    problems.push("unknown lessonType; human review required");
    recommendations.push("Add a supported lessonType frontmatter value before applying strict structure rules.");
    return { problems, recommendations };
  }

  // Section names are advisory, not required. The lesson quality rubric uses
  // flexible lesson types and explicitly forbids forcing the same section
  // headings into every lesson. Whether each teaching move is actually present
  // is enforced by check:instructional-depth; this audit checks formatting.
  for (const aliases of rule.sections) {
    if (!sectionSatisfied(body, aliases)) {
      recommendations.push(`Optional: a ${aliases[0]}-style section could help, but it is not required for this lesson type.`);
    }
  }

  if (rule.requireNumbered && !hasNumberedSteps(body)) {
    problems.push(`${lessonType} requires numbered steps`);
    recommendations.push("Use numbered steps (a numbered list or Step 1/Step 2 headings) for the process or assembly sequence.");
  }

  if (rule.requireChecklistLike && !hasChecklist(body)) {
    problems.push(`${lessonType} requires bullets or checklist syntax`);
    recommendations.push("Use bullets or Markdown checklist syntax for review criteria.");
  }

  if (rule.requireTableForWeakBetter && /Weak/i.test(body) && /Better/i.test(body) && !hasTable(body)) {
    problems.push("weak/better comparison without a table");
    recommendations.push("Use a table when comparing weak and better examples.");
  }

  if (problems.length > 0) {
    recommendations.push(`Revise structure using the ${lessonType} lesson-type rule instead of forcing Build Step everywhere.`);
  }

  return { problems, recommendations };
}

function analyzeBlog(body, rel) {
  const problems = [];
  const recommendations = [];
  const missing = requiredBlogSections.filter((section) => !headingExists(body, [section]));
  const hasStrongAlternative = /^##\s+/m.test(body) && (hasList(body) || hasTable(body) || /```/.test(body));

  if (missing.length === requiredBlogSections.length && !hasStrongAlternative) {
    problems.push("blog has neither field-note sections nor a strong alternate structure");
    recommendations.push("Use the field-note structure or add a clear human narrative structure with headings and scannable blocks.");
  }

  if (longestPlainRun(body) > 4) {
    problems.push(`${longestPlainRun(body)} consecutive plain paragraph blocks`);
    recommendations.push("Break paragraph runs with headings, bullets, tables, pull quotes, code, or folder examples.");
  }

  if (!/^##\s+/m.test(body)) {
    problems.push("blog has no section headings");
    recommendations.push("Add section headings unless the post is intentionally very short.");
  }

  if (/\b(process|workflow|comparison|steps|fix|lesson)\b/i.test(body) && !hasList(body) && !hasTable(body) && !/```/.test(body)) {
    problems.push("blog explains a process or comparison without scannable blocks");
    recommendations.push("Add bullets, a table, code, or a short checklist where the post explains a process.");
  }

  return { problems, recommendations };
}

function analyzeSupport(body) {
  const problems = [];
  const recommendations = [];
  const words = wordCount(body);

  if (words > 150 && !/^##\s+/m.test(body)) {
    problems.push("support file longer than 150 words without headings");
    recommendations.push("Add headings to make the support file scannable.");
  }

  if (/(:\s*\r?\n(?:.+\r?\n){3,})/.test(body) && !hasList(body)) {
    problems.push("support file appears to list items without bullets");
    recommendations.push("Use bullets when listing support items.");
  }

  if (longestPlainRun(body) > 5) {
    problems.push(`${longestPlainRun(body)} consecutive plain paragraph blocks`);
    recommendations.push("Break wall-of-text support files with headings or bullets.");
  }

  return { problems, recommendations };
}

function analyze(file) {
  const rel = relative(file);
  const raw = fs.readFileSync(file, "utf8");
  const { data, body } = splitFrontmatter(raw);
  const type = classify(file);
  const problems = [];
  const recommendations = [];
  const paragraphs = paragraphBlocks(body);
  const longParagraphs = paragraphs.filter((paragraph) => wordCount(paragraph) > 120).length;
  const hasMajorHeading = /^##\s+/m.test(body);
  const listPresent = hasList(body);
  const plainRun = longestPlainRun(body);
  let lessonType = "";
  let lessonTypeInferred = false;
  let lessonTypeUnknown = false;

  if (type !== "support" && type !== "other") {
    if (!hasMajorHeading) {
      problems.push("missing ## sections");
      recommendations.push("Add major sections where the learning path shifts.");
    }

    if (!listPresent) {
      problems.push("no bullet or numbered lists");
      recommendations.push("Use bullets for checks/options or numbers for process.");
    }

    if (longParagraphs > 0) {
      problems.push(`${longParagraphs} paragraph(s) over 120 words`);
      recommendations.push("Split long paragraphs into shorter teaching moves.");
    }

    if (plainRun > 4) {
      problems.push(`${plainRun} consecutive plain paragraph blocks`);
      recommendations.push("Break paragraph runs with headings, lists, examples, or checks.");
    }
  }

  if (type === "lesson") {
    if (
      rel.startsWith("content/courses/ots-101/lessons/") &&
      (!data.lessonType || !allowedLessonTypes.has(data.lessonType))
    ) {
      problems.push("OTS-101 lesson missing supported lessonType frontmatter");
      recommendations.push("Add an explicit lessonType so the audit can judge the lesson by its teaching job.");
    }

    const classification = inferLessonType(file, data, body);
    lessonType = classification.lessonType;
    lessonTypeInferred = classification.inferred;
    lessonTypeUnknown = classification.unknown;
    const lessonResult = analyzeLessonStructure(body, lessonType);
    problems.push(...lessonResult.problems);
    recommendations.push(...lessonResult.recommendations);
  }

  if (type === "blog") {
    const blogResult = analyzeBlog(body, rel);
    problems.push(...blogResult.problems);
    recommendations.push(...blogResult.recommendations);
  }

  if (type === "support") {
    const supportResult = analyzeSupport(body);
    problems.push(...supportResult.problems);
    recommendations.push(...supportResult.recommendations);
  }

  return {
    file: rel,
    type,
    lessonType,
    lessonTypeInferred,
    lessonTypeUnknown,
    problems: [...new Set(problems)],
    recommendations: [...new Set(recommendations)],
  };
}

const files = scanRoots.flatMap(walk).sort();
const results = files.map(analyze);
const passing = results.filter((result) => result.problems.length === 0);
const failing = results.filter((result) => result.problems.length > 0);
const lessonResults = results.filter((result) => result.type === "lesson");
const unknownLessonType = lessonResults.filter((result) => result.lessonTypeUnknown);
const strictLessonFailures = failing.filter((result) => result.type === "lesson");
const supportWarnings = failing.filter((result) => result.type === "support");
const blogWarnings = failing.filter((result) => result.type === "blog");
const repeated = new Map();
const lessonTypeCounts = new Map();

for (const result of lessonResults) {
  lessonTypeCounts.set(result.lessonType || "unknown", (lessonTypeCounts.get(result.lessonType || "unknown") ?? 0) + 1);
}

for (const result of failing) {
  for (const problem of result.problems) {
    repeated.set(problem, (repeated.get(problem) ?? 0) + 1);
  }
}

const priority = [
  ...strictLessonFailures.filter((result) => result.file.includes("content/courses/ots-101/lessons/")),
  ...blogWarnings,
].slice(0, 40);

const recommendedTranche = [
  "1. Review unknown lessonType files first; add explicit frontmatter or decide they are support files.",
  "2. Remediate OTS-101 chapter-overview and checkpoint files for scanability, because they frame each chapter and learner progress.",
  "3. Remediate artifact-build files next, because they carry the reusable course artifacts.",
  "4. Then clean comparison/workflow/case-study files where the report asks for tables, numbered steps, or review gates.",
  "5. Finally, add spacing/scannable blocks to blog posts without forcing every post into the same template.",
];

const lines = [
  "# Format Readability Audit",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Summary",
  "",
  `- Files reviewed: ${results.length}`,
  `- Files passing: ${passing.length}`,
  `- Files needing formatting review: ${failing.length}`,
  `- Strict lesson failures: ${strictLessonFailures.length}`,
  `- Support-file warnings: ${supportWarnings.length}`,
  `- Blog formatting warnings: ${blogWarnings.length}`,
  "",
  "## Lesson type counts",
  "",
  ...[...lessonTypeCounts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([lessonType, count]) => `- ${lessonType}: ${count}`),
  "",
  "## Unknown lessonType files",
  "",
  ...(unknownLessonType.length
    ? unknownLessonType.map((result) => `- ${result.file}`)
    : ["- None"]),
  "",
  "## Repeated formatting problems",
  "",
  ...[...repeated.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([problem, count]) => `- ${problem}: ${count}`),
  "",
  "## Recommended first remediation tranche",
  "",
  ...recommendedTranche.map((item) => `- ${item}`),
  "",
  "## Priority fixes",
  "",
  ...(priority.length
    ? priority.map((result) => `- ${result.file}: ${result.problems.join("; ")}`)
    : ["- No priority lesson or blog formatting issues found."]),
  "",
  "## Strict lesson failures",
  "",
  ...(strictLessonFailures.length
    ? strictLessonFailures.map((result) => `- ${result.file} (${result.lessonType}): ${result.problems.join("; ")}`)
    : ["- None"]),
  "",
  "## Support-file warnings",
  "",
  ...(supportWarnings.length
    ? supportWarnings.map((result) => `- ${result.file}: ${result.problems.join("; ")}`)
    : ["- None"]),
  "",
  "## Blog formatting warnings",
  "",
  ...(blogWarnings.length
    ? blogWarnings.map((result) => `- ${result.file}: ${result.problems.join("; ")}`)
    : ["- None"]),
  "",
  "## Files passing",
  "",
  ...(passing.length ? passing.map((result) => `- ${result.file}`) : ["- None"]),
  "",
  "## Files needing formatting",
  "",
  ...(failing.length
    ? failing.map((result) => [
        `### ${result.file}`,
        "",
        `Type: ${result.type}${result.lessonType ? ` (${result.lessonType}${result.lessonTypeInferred ? ", inferred" : ""})` : ""}`,
        "",
        "Problems:",
        ...result.problems.map((problem) => `- ${problem}`),
        "",
        "Recommended fixes:",
        ...(result.recommendations.length ? result.recommendations.map((item) => `- ${item}`) : ["- Human review needed."]),
        "",
      ].join("\n"))
    : ["- None"]),
  "## Notes",
  "",
  "- The audit no longer requires Build Step or Quality Check for every lesson.",
  "- Section names are advisory only; this is a formatting audit. Whether each teaching move is present is enforced by check:instructional-depth.",
  "- Real formatting failures still block: missing headings/lists, walls of text, weak/better comparisons without a table, and process lessons without numbered steps.",
  "- Lesson checks are based on lessonType frontmatter when present, with inference as a fallback.",
  "- Author profiles, README files, and course support folders use lighter support-file rules.",
  "- Use findings as review prompts, not permission to add fake sections.",
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, lines);

console.log(`Reviewed ${results.length} markdown files.`);
console.log(`Passing: ${passing.length}`);
console.log(`Needs formatting review: ${failing.length}`);
console.log(`Strict lesson failures: ${strictLessonFailures.length}`);
console.log(`Support-file warnings: ${supportWarnings.length}`);
console.log(`Blog formatting warnings: ${blogWarnings.length}`);
console.log(`Unknown lessonType files: ${unknownLessonType.length}`);
console.log(`Report written: ${relative(reportPath)}`);

if (failing.length > 0 && !reportOnly) {
  process.exitCode = 1;
}
