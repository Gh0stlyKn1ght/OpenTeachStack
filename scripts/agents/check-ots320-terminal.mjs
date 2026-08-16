import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const terminalDir = path.join(root, 'src', 'lib', 'ots320-terminal');
const evidenceDir = path.join(root, 'docs', 'architecture', 'ots-320-evidence');
const adapterPath = path.join(root, 'src', 'components', 'ots320', 'Ots320TerminalLab.tsx');
const pagePath = path.join(root, 'src', 'app', 'labs', 'ots-320-terminal', 'page.tsx');
const packagePath = path.join(root, 'package.json');

const requiredFiles = [
  'types.ts',
  'engine.ts',
  'fixtures.ts',
  'index.ts',
];

const evidenceFiles = [
  'codex-cli.json',
  'claude-code.json',
  'antigravity-cli.json',
];

const errors = [];
const fail = (message) => errors.push(message);

for (const filename of requiredFiles) {
  const filePath = path.join(terminalDir, filename);
  if (!fs.existsSync(filePath)) fail(`Missing terminal foundation file: ${path.relative(root, filePath)}`);
}

for (const filePath of [adapterPath, pagePath]) {
  if (!fs.existsSync(filePath)) fail(`Missing xterm lab file: ${path.relative(root, filePath)}`);
}

const foundationSource = requiredFiles
  .map((filename) => {
    const filePath = path.join(terminalDir, filename);
    return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  })
  .join('\n');

const adapterSource = [adapterPath, pagePath]
  .map((filePath) => (fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : ''))
  .join('\n');

const allTerminalSource = `${foundationSource}\n${adapterSource}`;

const forbiddenPatterns = [
  ['child_process import', /node:child_process|from\s+['"]child_process['"]|require\(['"]child_process['"]\)/],
  ['shell exec', /\bexecSync\s*\(|\bexecFileSync\s*\(|\bexecFile\s*\(|\bspawnSync\s*\(|\bspawn\s*\(/],
  ['dynamic evaluation', /\beval\s*\(|new\s+Function\s*\(/],
  ['network fetch', /\bfetch\s*\(/],
  ['XMLHttpRequest', /\bXMLHttpRequest\b/],
  ['WebSocket', /\bWebSocket\b/],
  ['environment secret access', /process\.env/],
  ['xterm attach addon', /@xterm\/addon-attach/],
];

for (const [label, pattern] of forbiddenPatterns) {
  if (pattern.test(allTerminalSource)) fail(`Forbidden ${label} found in deterministic terminal implementation`);
}

for (const provider of ['codex', 'claude', 'agy']) {
  if (!foundationSource.includes(`provider: \"${provider}\"`) && !foundationSource.includes(`\"${provider}\",`)) {
    fail(`Missing ${provider} scenario`);
  }
}

for (const command of ['help', 'pwd', 'ls', 'cat ', 'git status', 'git diff', 'clear', 'reset']) {
  if (!foundationSource.includes(command)) fail(`Missing required deterministic command: ${command.trim()}`);
}

if (!foundationSource.includes('evidenceType: \"emulated\"')) {
  fail('Terminal events must be explicitly labeled emulated');
}

if (!foundationSource.includes('Unsupported fixture input')) {
  fail('Unsupported input must be rejected explicitly rather than falling through');
}

if (!adapterSource.includes('from "@xterm/xterm"')) {
  fail('xterm adapter must render through @xterm/xterm');
}

if (!adapterSource.includes('from "@xterm/addon-fit"')) {
  fail('xterm adapter must use @xterm/addon-fit for responsive sizing');
}

if (!adapterSource.includes('@xterm/xterm/css/xterm.css')) {
  fail('xterm adapter must import the package stylesheet explicitly');
}

if (!adapterSource.includes('runTerminalInput')) {
  fail('xterm keyboard input must route through the deterministic terminal engine');
}

if (!adapterSource.includes('ResizeObserver')) {
  fail('xterm adapter must respond to container resize');
}

if (!adapterSource.includes('No host shell')) {
  fail('lab surface must state the host-shell safety boundary visibly');
}

if (fs.existsSync(packagePath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    if (!pkg.dependencies?.['@xterm/xterm']) fail('package.json is missing @xterm/xterm');
    if (!pkg.dependencies?.['@xterm/addon-fit']) fail('package.json is missing @xterm/addon-fit');
  } catch (error) {
    fail(`Invalid package.json: ${error.message}`);
  }
}

const evidenceIds = new Set();
for (const filename of evidenceFiles) {
  const filePath = path.join(evidenceDir, filename);
  if (!fs.existsSync(filePath)) {
    fail(`Missing Phase 3 evidence file: ${path.relative(root, filePath)}`);
    continue;
  }
  try {
    const doc = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const item of doc.evidence ?? []) {
      if (item.id) evidenceIds.add(item.id);
    }
  } catch (error) {
    fail(`${filename}: invalid evidence JSON: ${error.message}`);
  }
}

const fixturesPath = path.join(terminalDir, 'fixtures.ts');
if (fs.existsSync(fixturesPath)) {
  const fixtures = fs.readFileSync(fixturesPath, 'utf8');
  const refs = [...fixtures.matchAll(/evidenceId:\s*\"([^\"]+)\"/g)].map((match) => match[1]);
  if (refs.length < 6) fail(`Expected at least 6 Phase 3 evidence references in fixtures, found ${refs.length}`);
  for (const ref of refs) {
    if (!evidenceIds.has(ref)) fail(`Fixture references unknown Phase 3 evidence id: ${ref}`);
  }
}

const coursePathText = 'content/courses/ots-320';
if (allTerminalSource.includes(coursePathText)) {
  fail('Phase 4 terminal implementation must not depend on protected OTS-320 production lesson files');
}

if (errors.length > 0) {
  console.error('OTS-320 terminal foundation CI failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('OTS-320 terminal foundation CI passed.');
console.log('Deterministic engine, xterm adapter, three provider fixtures, evidence references, and forbidden host execution paths verified.');
console.log('GitHub Actions and Vercel are not required to run this check.');
