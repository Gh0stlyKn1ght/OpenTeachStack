import { execFileSync, execSync, spawn } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const buildVerificationPath = join(root, "docs", "BUILD_VERIFICATION.md");
const shouldWriteReport = process.argv.includes("--write");

const checks = [
  { label: "npm run typecheck", cmd: "npm run typecheck" },
  { label: "npm run lint", cmd: "npm run lint" },
  { label: "npm run build", cmd: "npm run build" },
  { label: "npm run check:script-workflow", cmd: "npm run check:script-workflow" },
  { label: "npm run check:routes", cmd: "npm run check:routes" },
  { label: "npm run check:content-layout", cmd: "npm run check:content-layout" },
  {
    label: "npm run check:course-source-truth",
    cmd: "npm run check:course-source-truth",
  },
  { label: "npm run check:blog-system", cmd: "npm run check:blog-system" },
  {
    label: "npm run check:no-scaffold-fallback",
    cmd: "npm run check:no-scaffold-fallback",
  },
  {
    label: "npm run check:content-authoring-safety",
    cmd: "npm run check:content-authoring-safety",
  },
  {
    label: "npm run check:learner-facing-content",
    cmd: "npm run check:learner-facing-content",
  },
  {
    label: "npm run check:course-doc-staleness",
    cmd: "npm run check:course-doc-staleness",
  },
  {
    label: "npm run check:course-learner-sense",
    cmd: "npm run check:course-learner-sense",
  },
  {
    label: "npm run check:content-uniqueness",
    cmd: "npm run check:content-uniqueness",
  },
  {
    label: "npm run check:instructional-depth",
    cmd: "npm run check:instructional-depth",
  },
  {
    label: "npm run check:format-readability",
    cmd: "npm run check:format-readability",
  },
  {
    label: "npm run check:release-readiness",
    cmd: "npm run check:release-readiness",
  },
  { label: "npm run check:source-bank", cmd: "npm run check:source-bank" },
  { label: "npm run check:prompt-library", cmd: "npm run check:prompt-library" },
  { label: "npm run check:ots101-reader", cmd: "npm run check:ots101-reader" },
  {
    label: "npm run check:ots101-book-titles",
    cmd: "npm run check:ots101-book-titles",
  },
  {
    label: "npm run check:rendered-course-lessons",
    cmd: "npm run check:rendered-course-lessons",
  },
  { label: "production route smoke", run: runProductionRouteSmoke },
];

const smokeRoutes = [
  "/",
  "/pathway",
  "/apps-script",
  "/templates",
  "/kb/library",
  "/book",
  ...getReleasedCourseBookRoutes(),
  "/courses/ots-280",
  "/kb",
  "/kb/source-bank",
  "/prompts",
  "/evidence",
  "/robots.txt",
  "/sitemap.xml",
];

const rows = [];
let overallPass = true;
const MAX_NOTE_LINES = 3;

function runCheck(check) {
  let status = "pass";
  let output = "";
  try {
    output = check.run
      ? check.run()
      : execSync(check.cmd, { encoding: "utf8", stdio: "pipe" });
  } catch (error) {
    status = "fail";
    overallPass = false;
    output = (error.stdout ? error.stdout.toString() : "") + (error.stderr ? error.stderr.toString() : "");
    if (!output.trim()) {
      output = error.message ?? "Command failed without output.";
    }
  }

  const summary = getSummaryLine(status, output);
  rows.push({
    label: check.label,
    status,
    summary,
  });

  return { status, output };
}

function runProductionRouteSmoke() {
  const port = getFreePort();
  const server = startNextServer(port);

  try {
    waitForServer(port, server);

    const results = smokeRoutes.map((route) => {
      const statusCode = requestStatusCode(port, route);
      if (statusCode !== 200) {
        throw new Error(`${route} returned HTTP ${statusCode}`);
      }
      return `${route}=200`;
    });

    return `Route smoke passed on port ${port}: ${results.join(", ")}`;
  } finally {
    stopServer(server);
  }
}

function getReleasedCourseBookRoutes() {
  const metadataPath = join(root, "src", "lib", "metadata.ts");
  const metadata = readFileSync(metadataPath, "utf8");
  const codes = [
    ...metadata.matchAll(/code:\s*"(?<code>OTS-\d{3})"/g),
  ].map((match) => match.groups?.code).filter(Boolean);

  if (codes.length === 0) {
    throw new Error("Could not find PATHWAY_COURSES codes for route smoke.");
  }

  return [...new Set(codes)].map((code) => `/book/${code.toLowerCase()}`);
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

  if (!port) {
    throw new Error("Could not allocate a localhost port for route smoke.");
  }

  return port;
}

function startNextServer(port) {
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

function waitForServer(port, server) {
  const deadline = Date.now() + 20_000;
  let lastError = "";

  while (Date.now() < deadline) {
    if (server.child.exitCode !== null) {
      throw new Error(
        `next start exited before route smoke. ${server.output.join("").trim()}`,
      );
    }

    try {
      const statusCode = requestStatusCode(port, "/");
      if (statusCode === 200) return;
      lastError = `HTTP ${statusCode}`;
    } catch (error) {
      lastError = error.message;
    }

    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 250);
  }

  throw new Error(`Timed out waiting for next start on port ${port}: ${lastError}`);
}

function requestStatusCode(port, route) {
  const url = new URL(route, `http://127.0.0.1:${port}`);

  const script = `
    const http = require("node:http");
    const startUrl = ${JSON.stringify(url.href)};
    function request(url, redirects = 0) {
      const req = http.get(url, (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirects < 5) {
          res.resume();
          const nextUrl = new URL(res.headers.location, url).href;
          request(nextUrl, redirects + 1);
          return;
        }
      res.resume();
      res.on("end", () => {
        console.log(res.statusCode);
      });
    });
    req.setTimeout(10000, () => {
      req.destroy(new Error("request timeout"));
    });
    req.on("error", (error) => {
      console.error(error.message);
      process.exit(1);
    });
    }
    request(startUrl);
  `;

  return Number(execFileSync(process.execPath, ["-e", script], {
    encoding: "utf8",
    stdio: "pipe",
  }).trim());
}

function stopServer(server) {
  if (server.child.exitCode === null) {
    server.child.kill();
  }
}

function getSummaryLine(status, output) {
  const lines = output.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) {
    return "No command output";
  }

  if (status === "pass") {
    return lines[0];
  }

  const errorHints = [
    "FATAL",
    "ERROR",
    "Build error occurred",
    "Next.js build worker exited with code",
    "Failed to write app endpoint",
    "Turbopack",
  ];
  const hints = lines.filter((line) =>
    errorHints.some((hint) => line.includes(hint)),
  );
  const summaryLines = (hints.length ? hints : lines.slice(-MAX_NOTE_LINES)).slice(
    0,
    MAX_NOTE_LINES,
  );

  return sanitizeSummary(summaryLines.join(" | "));
}

function sanitizeSummary(text) {
  return text
    .replaceAll(/\u001b\[[0-9;]*m/g, "")
    .replaceAll("|", "\\|");
}

function getCommitSha() {
  try {
    return execSync("git rev-parse HEAD", { encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

const runAt = new Date().toISOString();
const commitSha = getCommitSha();
const knownFailures = [];

for (const check of checks) {
  const { status, output } = runCheck(check);
  if (status === "fail" && output) {
    knownFailures.push(
      `- ${check.label}: ${getSummaryLine(status, output)}`,
    );
  }
}

if (shouldWriteReport && !existsSync(buildVerificationPath)) {
  writeFileSync(
    buildVerificationPath,
    `# Build Verification\n\nDate: ${runAt}\n\n`,
    "utf8",
  );
}

const statusRows = rows
  .map(
    (row) =>
      `| ${row.status.toUpperCase()} | ${row.label} | ${row.summary.replaceAll("|", "\\|")} |`,
  )
  .join("\n");

const report = `# Build Verification\n\nDate: ${runAt}\n\nCommit SHA: ${commitSha}\n\n## Result\n\n` +
  `Overall release verification: ${overallPass ? "PASS" : "FAIL"}\n\n` +
  `## Command Results\n\n| Result | Command | Note |\n| --- | --- | --- |\n${statusRows}\n\n` +
  `## Known Failures\n\n` +
  `${overallPass ? "- None" : knownFailures.join("\n")}\n\n` +
  "## Notes\n\nGenerated by `npm run verify:release:write`.\n";

if (shouldWriteReport) {
  writeFileSync(buildVerificationPath, report, "utf8");
} else {
  console.log(report);
  console.log("Report was not written. Run `npm run verify:release:write` to refresh docs/BUILD_VERIFICATION.md.");
}

if (!overallPass) process.exit(1);
