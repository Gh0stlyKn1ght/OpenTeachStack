import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const scriptsRoot = join(root, "scripts");
const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const npmScripts = packageJson.scripts ?? {};
const failures = [];
const writePattern = /\b(writeFileSync|appendFileSync|mkdirSync|copyFileSync|rmSync|unlinkSync|renameSync)\b/;
const optInPattern = /process\.argv\.includes\("(?<flag>--(?:write|write-report|force|all-targets))"\)|const\s+force\s*=|shouldWrite|shouldWriteReport|reportOnly/;

function fail(message) {
  failures.push(message);
}

function nodeScriptPath(command) {
  return command.match(/^node\s+(?<script>scripts\/[^\s]+)/)?.groups?.script;
}

const testCommand = npmScripts.test ?? "";
const requiredTestCommands = [
  "npm run check:script-workflow",
  "npm run verify:locks",
  "npm run check:ots101-book-titles",
  "npm run check:format-readability",
];

for (const command of requiredTestCommands) {
  if (!testCommand.includes(command)) {
    fail(`package.json test script is missing ${command}.`);
  }
}

const verifyReleaseSource = readFileSync(join(scriptsRoot, "verify-release.mjs"), "utf8");
if (!verifyReleaseSource.includes('cmd: "npm run verify:locks"')) {
  fail("scripts/verify-release.mjs does not include npm run verify:locks.");
}

const testCheckCommands = testCommand
  .split("&&")
  .map((item) => item.trim())
  .filter((item) => item.startsWith("npm run check:"));

for (const command of testCheckCommands) {
  if (!verifyReleaseSource.includes(`cmd: "${command}"`)) {
    fail(`scripts/verify-release.mjs does not include ${command}.`);
  }
}

for (const [name, command] of Object.entries(npmScripts)) {
  const scriptPath = nodeScriptPath(command);
  if (!scriptPath) continue;

  const source = readFileSync(join(root, scriptPath), "utf8");
  const writes = writePattern.test(source);
  if (!writes) continue;

  const hasOptIn = optInPattern.test(source);
  const commandIsExplicitWrite = name.includes(":write") || command.includes("--write") || command.includes("--write-report");

  if (name.startsWith("check:") && !hasOptIn) {
    fail(`${name} writes files but has no explicit write/report opt-in guard.`);
  }

  if (!name.startsWith("check:") && !commandIsExplicitWrite && !hasOptIn) {
    fail(`${name} maps to a writer script without an explicit opt-in guard.`);
  }
}

for (const fileName of readdirSync(scriptsRoot).filter((name) => name.endsWith(".mjs"))) {
  const scriptPath = `scripts/${fileName}`;
  const source = readFileSync(join(root, scriptPath), "utf8");
  if (!writePattern.test(source)) continue;

  if (!optInPattern.test(source)) {
    fail(`${scriptPath} writes files but has no --force/--write-style opt-in guard.`);
  }
}

if (failures.length > 0) {
  console.error("Script workflow check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Script workflow check passed: gates are aligned and writer scripts require explicit opt-in.");
