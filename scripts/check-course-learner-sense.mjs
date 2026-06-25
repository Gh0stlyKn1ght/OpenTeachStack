import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const coursesRoot = join(root, "content", "courses");

const expectedCourseFrames = {
  "ots-101": "A teacher building a first reusable mini-unit needs a system another educator can inspect",
  "ots-201": "A workspace system works",
  "ots-220": "Automation is ready",
  "ots-240": "Open work needs",
  "ots-260": "Media belongs in a lesson",
  "ots-280": "Teacher safety work should reduce exposure",
  "ots-301": "A course site is a maintained teaching surface",
  "ots-320": "An agent can draft changes",
  "ots-399": "A capstone proves the system",
};

const confusingFragments = [
  /what avoids [a-z]/i,
  /without asking for a translation/i,
  /not proving technical mastery for its own sake/i,
  /not trying to collect one more tool or checklist/i,
  /rather than left as a loose note/i,
  /what vpns and not/i,
  /what something happens/i,
  /teacher is making a durable classroom move/i,
  /course site .*Teacher safety work should reduce exposure/is,
  /connect chapter overview/i,
  /connect chapter checkpoint/i,
  /A strong \*\*chapter overview\*\*/i,
  /A strong \*\*chapter checkpoint\*\*/i,
];

function walkMdx(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) return walkMdx(fullPath);
    if (entry.isFile() && entry.name.endsWith(".mdx")) return [fullPath];
    return [];
  });
}

function display(filePath) {
  return relative(root, filePath).replaceAll("\\", "/");
}

const failures = [];
const summaries = [];

for (const [courseSlug, expectedFrame] of Object.entries(expectedCourseFrames)) {
  const lessonsRoot = join(coursesRoot, courseSlug, "lessons");
  const files = walkMdx(lessonsRoot);
  let checked = 0;

  for (const file of files) {
    const parsed = matter(readFileSync(file, "utf8"));
    checked += 1;

    if (!parsed.content.includes(expectedFrame)) {
      failures.push(
        `${display(file)} does not use the expected learner frame: ${expectedFrame}`,
      );
    }

    for (const fragment of confusingFragments) {
      if (fragment.test(parsed.content)) {
        failures.push(`${display(file)} contains confusing learner-facing phrasing: ${fragment}`);
      }
    }

    if (
      courseSlug === "ots-101" &&
      parsed.data.chapter === "AI Literacy and Verification" &&
      /An agent can draft changes|Letting an agent rewrite curriculum content/i.test(parsed.content)
    ) {
      failures.push(`${display(file)} uses coding-agent framing inside OTS-101 AI literacy content.`);
    }
  }

  summaries.push(`${courseSlug}: learner-sense frame passed for ${checked} lessons.`);
}

if (failures.length > 0) {
  console.error("Course learner-sense check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

for (const summary of summaries) console.log(summary);
console.log("Course learner-sense check passed.");
