import { readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const shouldWrite = process.argv.includes("--write");
const bookPath = join(root, "src", "lib", "book.ts");
const lessonList = execFileSync(
  "git",
  ["ls-files", "content/courses/ots-101/lessons/**/*.mdx"],
  { cwd: root, encoding: "utf8" },
)
  .split("\n")
  .filter(Boolean);

const lessonTitles = new Map();

for (const lessonPath of lessonList) {
  const number = basename(lessonPath, ".mdx").replace("-", ".");
  if (!/^\d{2}\.\d$/.test(number)) continue;

  const text = readFileSync(join(root, lessonPath), "utf8");
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const title = frontmatter?.[1].match(/^title:\s*["']?(.*?)["']?\s*$/m)?.[1];

  if (title) {
    lessonTitles.set(number, title);
  }
}

let book = readFileSync(bookPath, "utf8");
const mismatches = [];

book = book.replace(
  /(number:\s*")(?<number>\d{2}\.\d)(",\s*title:\s*")(?<title>[^"]*)(")/g,
  (full, prefix, number, middle, title, suffix) => {
    const lessonTitle = lessonTitles.get(number);

    if (!lessonTitle || lessonTitle === title) {
      return full;
    }

    mismatches.push({ number, bookTitle: title, lessonTitle });
    return shouldWrite ? `${prefix}${number}${middle}${lessonTitle}${suffix}` : full;
  },
);

if (shouldWrite && mismatches.length > 0) {
  writeFileSync(bookPath, book, "utf8");
}

if (mismatches.length > 0) {
  console.error("OTS-101 book title mismatches:");
  for (const mismatch of mismatches) {
    console.error(
      `- ${mismatch.number}: book.ts "${mismatch.bookTitle}" -> frontmatter "${mismatch.lessonTitle}"`,
    );
  }
  console.error("Run `node scripts/check-ots101-book-titles.mjs --write` to sync book.ts.");
  process.exit(1);
}

console.log(`OTS-101 book title check passed for ${lessonTitles.size} lessons.`);
