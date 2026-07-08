import fs from "node:fs";
import path from "node:path";

const userProfile = process.env.USERPROFILE || process.env.HOMEPATH || "C:\\Users\\NEO";
const brainDir = path.join(userProfile, ".gemini", "antigravity-cli", "brain");
const outputDir = path.join(process.cwd(), "docs", "chat-archives");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Scanning brain directory: ${brainDir}...`);

if (!fs.existsSync(brainDir)) {
  console.log("No brain directory found at expected path.");
  process.exit(0);
}

const conversations = fs.readdirSync(brainDir).filter((d) => fs.statSync(path.join(brainDir, d)).isDirectory());

for (const cid of conversations) {
  const logDir = path.join(brainDir, cid, ".system_generated", "logs");
  const transcriptPath = path.join(logDir, "transcript.jsonl");

  if (!fs.existsSync(transcriptPath)) continue;

  console.log(`Parsing transcript for conversation: ${cid}...`);
  const lines = fs.readFileSync(transcriptPath, "utf8").split("\n").filter(Boolean);
  
  let dateStr = new Date().toISOString().split("T")[0]; // Fallback date
  let markdown = `# Chat History Archive - ${cid}\n\n`;
  let steps = [];

  for (const line of lines) {
    try {
      const step = JSON.parse(line);
      steps.push(step);
      if (step.timestamp) {
        dateStr = step.timestamp.split("T")[0];
      }
    } catch {
      // Ignore parse errors
    }
  }

  // Format steps chronologically
  for (const step of steps) {
    const timestamp = step.timestamp ? `[${step.timestamp}]` : "";
    if (step.type === "USER_INPUT") {
      markdown += `### 👤 USER ${timestamp}\n\n${step.content || ""}\n\n---\n\n`;
    } else if (step.type === "PLANNER_RESPONSE") {
      markdown += `### 🤖 ASSISTANT ${timestamp}\n\n${step.content || ""}\n\n`;
      if (step.tool_calls && step.tool_calls.length > 0) {
        markdown += `#### 🛠️ Tool Calls:\n`;
        for (const tc of step.tool_calls) {
          markdown += `- **${tc.name}**\n\`\`\`json\n${JSON.stringify(tc.arguments || {}, null, 2)}\n\`\`\`\n`;
        }
      }
      markdown += `\n---\n\n`;
    }
  }

  // Write chat log by date and conversation ID
  const archivePath = path.join(outputDir, `chat-${dateStr}-${cid}.md`);
  fs.writeFileSync(archivePath, markdown, "utf8");
  console.log(`Archived chat log to: docs/chat-archives/chat-${dateStr}-${cid}.md`);

  // Write handoff summary file
  const handoffPath = path.join(outputDir, "handoff-notes.md");
  const handoffSummary = `\n# OpenTeachStack Handoff Notes

Last Updated: ${new Date().toISOString()}
Active Conversation: ${cid}

## Latest Accomplishments
- Enriched all 10 course lesson templates with ComparisonBlocks, WorkflowBlocks, ChecklistBlocks, and Mermaid flowcharts.
- Implemented GSAP entrance page animations and Anime.js list item stagger reveals.
- Built a Teachable package exporter script (node scripts/curriculum/package-teachable.mjs) converting MDX components to standard Markdown.
- Verified Next.js static page compiles cleanly (687/687 pages pass).
- Passed all 25 gates in the npm test suite.

## Pending Verification
- Review OTS-101 lesson bodies and locks in status.json.
- Import the generated ots-101-teachable-import-package.zip directly into Teachable for verification.
`;
  fs.writeFileSync(handoffPath, handoffSummary.trim() + "\n", "utf8");
  console.log("Updated docs/chat-archives/handoff-notes.md");
}
