import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import matter from "gray-matter";

const args = process.argv.slice(2);
const courseSlug = valueFor("--course");

if (!courseSlug) {
  console.error("Usage: node scripts/curriculum/package-teachable.mjs --course <course-slug> [--write]");
  process.exit(1);
}

const root = process.cwd();
const courseRoot = path.join(root, "content", "courses", courseSlug);
const exportsDir = path.join(courseRoot, "exports", "teachable");
const buildDir = path.join(exportsDir, "import-package");

if (!fs.existsSync(courseRoot)) {
  console.error(`Course not found: ${courseSlug}`);
  process.exit(1);
}

const shouldWrite = process.argv.includes("--write");

if (!shouldWrite) {
  console.log("Teachable Packager Dry-run (pass --write to generate package).");
  process.exit(0);
}

// Clean and recreate build directory
if (shouldWrite && fs.existsSync(buildDir)) {
  fs.rmSync(buildDir, { recursive: true, force: true });
}
fs.mkdirSync(buildDir, { recursive: true });

console.log(`Packaging Teachable import for: ${courseSlug}...`);

// 1. Gather all lesson files
const lessonsDir = path.join(courseRoot, "lessons");
if (fs.existsSync(lessonsDir)) {
  const chapters = fs.readdirSync(lessonsDir).filter((d) => fs.statSync(path.join(lessonsDir, d)).isDirectory());
  for (const chapter of chapters) {
    const chapterSrcDir = path.join(lessonsDir, chapter);
    const chapterDestDir = path.join(buildDir, "lessons", chapter);
    fs.mkdirSync(chapterDestDir, { recursive: true });

    const lessons = fs.readdirSync(chapterSrcDir).filter((f) => f.endsWith(".mdx"));
    for (const lesson of lessons) {
      const lessonPath = path.join(chapterSrcDir, lesson);
      const raw = fs.readFileSync(lessonPath, "utf8");
      const { data, content } = matter(raw);

      // Clean MDX component tags to make them clean markdown
      let cleanContent = content;

      // Convert ComparisonBlock to standard markdown table
      cleanContent = cleanContent.replace(
        /<ComparisonBlock[\s\S]*?title="([\s\S]*?)"[\s\S]*?leftTitle="([\s\S]*?)"[\s\S]*?rightTitle="([\s\S]*?)"[\s\S]*?leftItems=\{\[([\s\S]*?)\]\}[\s\S]*?rightItems=\{\[([\s\S]*?)\]\}[\s\S]*?takeaways=\{\[([\s\S]*?)\]\}[\s\S]*?\/>/g,
        (_, title, leftTitle, rightTitle, leftItems, rightItems, takeaways) => {
          const lItems = parseArray(leftItems).map((i) => `- ${i}`).join("\n");
          const rItems = parseArray(rightItems).map((i) => `- ${i}`).join("\n");
          const tWays = parseArray(takeaways).map((i) => `- ${i}`).join("\n");
          return `\n### Comparison: ${title}\n\n| ${leftTitle} | ${rightTitle} |\n|---|---|\n| ${lItems.replace(/\n/g, "<br>")} | ${rItems.replace(/\n/g, "<br>")} |\n\n**Takeaways**:\n${tWays}\n`;
        }
      );

      // Convert WorkflowBlock to standard markdown numbered list
      cleanContent = cleanContent.replace(
        /<WorkflowBlock[\s\S]*?title="([\s\S]*?)"[\s\S]*?intro="([\s\S]*?)"[\s\S]*?steps=\{\[([\s\S]*?)\]\}[\s\S]*?takeaways=\{\[([\s\S]*?)\]\}[\s\S]*?\/>/g,
        (_, title, intro, steps, takeaways) => {
          const sList = parseArray(steps).map((s, i) => `${i + 1}. ${s}`).join("\n");
          const tWays = parseArray(takeaways).map((i) => `- ${i}`).join("\n");
          return `\n### Workflow: ${title}\n*${intro}*\n\n${sList}\n\n**Takeaways**:\n${tWays}\n`;
        }
      );

      // Convert ChecklistBlock to checklist format
      cleanContent = cleanContent.replace(
        /<ChecklistBlock[\s\S]*?title="([\s\S]*?)"[\s\S]*?intro="([\s\S]*?)"[\s\S]*?items=\{\[([\s\S]*?)\]\}[\s\S]*?takeaway="([\s\S]*?)"[\s\S]*?\/>/g,
        (_, title, intro, items, takeaway) => {
          const iList = parseArray(items).map((i) => `- [ ] ${i}`).join("\n");
          return `\n### Checklist: ${title}\n*${intro}*\n\n${iList}\n\n**Takeaway**: ${takeaway}\n`;
        }
      );

      // Convert FrameworkBlock / ConceptCard structure
      cleanContent = cleanContent.replace(
        /<FrameworkBlock[\s\S]*?title="([\s\S]*?)"[\s\S]*?intro="([\s\S]*?)"[\s\S]*?>([\s\S]*?)<\/FrameworkBlock>/g,
        (_, title, intro, inner) => {
          let cardsStr = "";
          const cardMatches = inner.matchAll(/<ConceptCard[\s\S]*?title="([\s\S]*?)"[\s\S]*?>([\s\S]*?)<\/ConceptCard>/g);
          for (const match of cardMatches) {
            cardsStr += `#### ${match[1]}\n${match[2].trim()}\n\n`;
          }
          return `\n### Framework: ${title}\n*${intro}*\n\n${cardsStr}`;
        }
      );

      // Strip remaining JSX element blocks or warnings
      cleanContent = cleanContent.replace(/<[\s\S]*?\/>/g, "");

      const lessonTitle = data.title ?? lesson.replace(".mdx", "");
      const outputHeader = `---\ntitle: "${lessonTitle}"\nduration: "${data.duration ?? "15 minutes"}"\nsectionNumber: "${data.sectionNumber ?? ""}"\n---\n\n`;

      const outputFileName = lesson.replace(".mdx", ".md");
      fs.writeFileSync(path.join(chapterDestDir, outputFileName), outputHeader + cleanContent.trim() + "\n", "utf8");
    }
  }
}

// 2. Copy all exports templates and packet materials
const templatesDir = path.join(courseRoot, "templates");
if (fs.existsSync(templatesDir)) {
  const destTemplates = path.join(buildDir, "templates");
  fs.mkdirSync(destTemplates, { recursive: true });
  copyFolderSync(templatesDir, destTemplates);
}

const packetDir = path.join(courseRoot, "packet");
if (fs.existsSync(packetDir)) {
  const destPacket = path.join(buildDir, "packet");
  fs.mkdirSync(destPacket, { recursive: true });
  copyFolderSync(packetDir, destPacket);
}

// 3. Copy legacy metadata if present under teachable/{course} or exports/teachable/
const legacyDir = path.join(root, "teachable", courseSlug);
if (fs.existsSync(legacyDir)) {
  copyFolderSync(legacyDir, buildDir);
}

// 4. Create ZIP package
const zipFileName = `${courseSlug}-teachable-import-package.zip`;
const zipPath = path.join(exportsDir, zipFileName);

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

console.log("Generating ZIP package...");
try {
  if (process.platform === "win32") {
    // Windows: use PowerShell Compress-Archive
    execSync(
      `powershell.exe -Command "Compress-Archive -Path '${buildDir}\\*' -DestinationPath '${zipPath}' -Force"`,
      { cwd: root, stdio: "inherit" }
    );
  } else {
    // Unix: use zip utility
    execSync(`zip -r "${zipPath}" ./*`, { cwd: buildDir, stdio: "inherit" });
  }
  console.log(`Success! Package written to: ${path.relative(root, zipPath)}`);
} catch (error) {
  console.error("Failed to compress package:", error.message);
}

// Helper functions
function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
}

function parseArray(itemsStr) {
  try {
    // Try simple parse
    return itemsStr
      .split(",")
      .map((item) => item.replace(/"/g, "").replace(/\\/g, "").trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach((element) => {
    if (fs.lstatSync(path.join(from, element)).isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    } else {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    }
  });
}
