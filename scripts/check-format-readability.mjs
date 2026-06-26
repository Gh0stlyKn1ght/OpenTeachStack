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
const requiredBlogSections = [
  "What happened",
  "Why it bothered me",
  "What was really going on",
  "The lesson",
  "The fix",
  "What teachers can use",
  "Final thought",
];

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

function stripFrontmatter(text) {
  return text.replace(/^---[\s\S]*?---\s*/, "");
}

function stripCodeFences(text) {
  return text.replace(/```[\s\S]*?```/g, "");
}

function headingExists(body, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^##\\s+${escaped}\\s*$`, "mi").test(body);
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

function classify(file) {
  const rel = relative(file);
  if (rel.startsWith("content/blog/") || rel.startsWith("src/app/blog/")) return "blog";
  if (rel.startsWith("content/courses/") && rel.includes("/lessons/")) return "lesson";
  if (rel.startsWith("content/courses/")) return "course-support";
  return "other";
}

function analyze(file) {
  const rel = relative(file);
  const raw = fs.readFileSync(file, "utf8");
  const body = stripFrontmatter(raw);
  const type = classify(file);
  const problems = [];
  const recommendations = [];
  const paragraphs = paragraphBlocks(body);
  const longParagraphs = paragraphs.filter((paragraph) => wordCount(paragraph) > 120).length;
  const hasMajorHeading = /^##\s+/m.test(body);
  const hasList = /^\s*([-*+]\s+|\d+\.\s+)/m.test(body);
  const hasNumberedList = /^\s*\d+\.\s+/m.test(body);
  const hasTable = /^\|.*\|\s*$/m.test(body);
  const plainRun = longestPlainRun(body);

  if (!hasMajorHeading) {
    problems.push("missing ## sections");
    recommendations.push("Add major sections where the learning path shifts.");
  }

  if (!hasList) {
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

  if (type === "lesson") {
    if (!hasNumberedList) {
      problems.push("lesson has no numbered process steps");
      recommendations.push("Add a numbered Build Step only if the lesson asks the teacher to act.");
    }
    if (!headingExists(body, "Build Step")) {
      problems.push("lesson missing Build Step section");
      recommendations.push("Name the concrete teacher action.");
    }
    if (!headingExists(body, "Quality Check")) {
      problems.push("lesson missing Quality Check section");
      recommendations.push("Add a checklist or review criteria tied to evidence.");
    }
    if (/Weak/i.test(body) && /Better/i.test(body) && !hasTable) {
      problems.push("weak/better comparison without a table");
      recommendations.push("Use a table when comparing weak and better examples.");
    }
  }

  if (type === "blog") {
    for (const section of requiredBlogSections) {
      if (!headingExists(body, section)) {
        problems.push(`blog missing section: ${section}`);
      }
    }
    if (requiredBlogSections.some((section) => !headingExists(body, section))) {
      recommendations.push("Use the blog field-note structure unless a stronger human structure is already present.");
    }
  }

  return {
    file: rel,
    type,
    problems: [...new Set(problems)],
    recommendations: [...new Set(recommendations)],
  };
}

const files = scanRoots.flatMap(walk).sort();
const results = files.map(analyze);
const passing = results.filter((result) => result.problems.length === 0);
const failing = results.filter((result) => result.problems.length > 0);
const repeated = new Map();

for (const result of failing) {
  for (const problem of result.problems) {
    repeated.set(problem, (repeated.get(problem) ?? 0) + 1);
  }
}

const priority = failing
  .filter((result) => result.type === "lesson" || result.type === "blog")
  .slice(0, 40);

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
  "",
  "## Repeated formatting problems",
  "",
  ...[...repeated.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([problem, count]) => `- ${problem}: ${count}`),
  "",
  "## Priority fixes",
  "",
  ...(priority.length
    ? priority.map((result) => `- ${result.file}: ${result.problems.join("; ")}`)
    : ["- No priority lesson or blog formatting issues found."]),
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
        `Type: ${result.type}`,
        "",
        "Problems:",
        ...result.problems.map((problem) => `- ${problem}`),
        "",
        "Recommended fixes:",
        ...(result.recommendations.length ? result.recommendations.map((item) => `- ${item}`) : ["- Human review needed."]),
        "",
      ].join("\n"))
    : ["- None"]),
  "## Recommended checks to add",
  "",
  "- Keep `check:format-readability` available as an intentional audit command.",
  "- Do not add it to the full test chain until the known findings are reviewed or intentionally baselined.",
  "- Use failures as review prompts, not permission to add fake sections.",
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, lines);

console.log(`Reviewed ${results.length} markdown files.`);
console.log(`Passing: ${passing.length}`);
console.log(`Needs formatting review: ${failing.length}`);
console.log(`Report written: ${relative(reportPath)}`);

if (failing.length > 0 && !reportOnly) {
  process.exitCode = 1;
}
