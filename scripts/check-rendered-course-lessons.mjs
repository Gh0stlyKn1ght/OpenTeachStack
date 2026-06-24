import { execFileSync, spawn } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import http from "node:http";
import { join, relative } from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const coursesRoot = join(root, "content", "courses");

const forbiddenVisibleText = [
  /migrationStatus/i,
  /sourceRegistry/i,
  /sourceLessonSlug/i,
  /sourceLessonTitle/i,
  /generated draft/i,
  /scaffolded/i,
  /authoring status/i,
  /route reviewed for this lesson/i,
  /open standalone lesson page/i,
  /section-specific teaching notes/i,
  /entry should/i,
  /use these notes/i,
  /fill-in-the-blank/i,
  /This lesson helps/i,
  /Applied to/i,
  /Use this three-step workflow/i,
  /without asking for a translation/i,
  /teacher is making a durable classroom move/i,
  /Lesson Move/i,
  /Add a short entry/i,
  /handoff note/i,
  /peer handoff/i,
  /artifact update/i,
  /A strong the checkpoint review/i,
  /A strong the chapter plan/i,
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

function collectLessons() {
  return readdirSync(coursesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => walkMdx(join(coursesRoot, entry.name, "lessons")))
    .map((filePath) => {
      const parsed = matter(readFileSync(filePath, "utf8"));
      return {
        filePath,
        route: parsed.data.canonicalRoute,
        title: parsed.data.title,
        courseSlug: parsed.data.courseSlug,
      };
    })
    .filter((lesson) => lesson.route && lesson.title)
    .sort((left, right) => left.route.localeCompare(right.route));
}

function getFreePort() {
  const script = `
    const { createServer } = require("node:net");
    const server = createServer();
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      console.log(address.port);
      server.close();
    });
  `;

  const port = Number(execFileSync(process.execPath, ["-e", script], {
    encoding: "utf8",
    stdio: "pipe",
  }).trim());

  if (!port) throw new Error("Could not allocate a localhost port.");
  return port;
}

function startServer(port) {
  const nextBin = join(root, "node_modules", "next", "dist", "bin", "next");
  const child = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
    cwd: root,
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: "1",
    },
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });

  const output = [];
  child.stdout.on("data", (chunk) => output.push(chunk.toString()));
  child.stderr.on("data", (chunk) => output.push(chunk.toString()));

  return { child, output, port };
}

function stopServer(server) {
  if (server.child.exitCode === null) server.child.kill();
}

async function request(route, port) {
  const url = new URL(route, `http://127.0.0.1:${port}`);

  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        resolve({ statusCode: res.statusCode, body });
      });
    });

    req.setTimeout(10_000, () => {
      req.destroy(new Error(`Timed out requesting ${route}`));
    });
    req.on("error", reject);
  });
}

async function waitForServer(server) {
  const deadline = Date.now() + 20_000;
  let lastError = "";

  while (Date.now() < deadline) {
    if (server.child.exitCode !== null) {
      throw new Error(`next start exited early. ${server.output.join("").trim()}`);
    }

    try {
      const response = await request("/", server.port);
      if (response.statusCode === 200) return;
      lastError = `HTTP ${response.statusCode}`;
    } catch (error) {
      lastError = error.message;
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for next start: ${lastError}`);
}

function visibleText(html) {
  return html
    .replaceAll(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replaceAll(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replaceAll(/<[^>]+>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll(/\s+/g, " ")
    .trim();
}

function display(filePath) {
  return relative(root, filePath).replaceAll("\\", "/");
}

const lessons = collectLessons();
const port = getFreePort();
const server = startServer(port);
const failures = [];
const counts = new Map();

try {
  await waitForServer(server);

  for (const lesson of lessons) {
    const response = await request(lesson.route, port);
    const text = visibleText(response.body);

    counts.set(lesson.courseSlug, (counts.get(lesson.courseSlug) ?? 0) + 1);

    if (response.statusCode !== 200) {
      failures.push(`${lesson.route} returned HTTP ${response.statusCode}`);
      continue;
    }

    if (!text.includes(lesson.title)) {
      failures.push(`${lesson.route} did not render lesson title "${lesson.title}".`);
    }

    for (const pattern of forbiddenVisibleText) {
      if (pattern.test(text)) {
        failures.push(`${lesson.route} exposes forbidden visible text ${pattern} from ${display(lesson.filePath)}.`);
      }
    }
  }
} finally {
  stopServer(server);
}

if (failures.length > 0) {
  console.error("Rendered course lesson check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

for (const [courseSlug, count] of [...counts.entries()].sort()) {
  console.log(`${courseSlug}: rendered ${count} lesson routes.`);
}
console.log(`Rendered course lesson check passed for ${lessons.length} lesson routes.`);
