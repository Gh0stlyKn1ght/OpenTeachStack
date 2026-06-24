import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const coursesRoot = join(root, "content", "courses");

const stalePatterns = [
  {
    pattern: /Status:\s*draft outline/i,
    message: "course outline still marks itself as a draft outline",
  },
  {
    pattern: /Source Draft/i,
    message: "course outline still uses source-draft heading language",
  },
  {
    pattern: /Existing draft sources/i,
    message: "course outline still uses draft-source table language",
  },
  {
    pattern: /All OTS-\d{3} draft lessons/i,
    message: "course outline still describes course lessons as draft lessons",
  },
  {
    pattern: /replace generated (section|route) shells/i,
    message: "course outline still asks to replace generated shells",
  },
  {
    pattern: /course-owned scaffold/i,
    message: "course outline still describes course-owned content as scaffold",
  },
];

function walk(dir) {
  if (!existsSync(dir)) return [];

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) return walk(fullPath);
    if (entry.isFile() && entry.name.endsWith(".md")) return [fullPath];
    return [];
  });
}

function display(file) {
  return relative(root, file).replaceAll("\\", "/");
}

const failures = [];

for (const file of walk(coursesRoot)) {
  const normalized = display(file);
  if (!normalized.includes("/docs/") && !normalized.endsWith("/README.md")) continue;

  const source = readFileSync(file, "utf8");
  for (const { pattern, message } of stalePatterns) {
    if (pattern.test(source)) {
      failures.push(`${normalized}: ${message} (${pattern})`);
    }
  }
}

if (failures.length > 0) {
  console.error("Course doc staleness check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Course doc staleness check passed.");
