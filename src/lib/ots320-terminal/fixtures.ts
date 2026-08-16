import type { CliProvider, CliScenario, ScenarioInteraction, TerminalEvent } from "./types";

const syntheticFiles: Record<string, string> = {
  "AGENTS.md": [
    "# Teacher Tool Lab Instructions",
    "",
    "- Inspect before modifying anything.",
    "- Treat src/data/sample-lessons.json as authored content.",
    "- Do not replace authored content with generated filler.",
    "- Do not use network access for this fixture.",
    "- Show the diff before claiming a change is complete.",
    "- Stop and ask if the requested task requires changing project structure.",
  ].join("\n"),
  "README.md": [
    "# Teacher Tool Lab",
    "",
    "A fictional repository used by OTS-320 terminal scenarios.",
    "No student data, credentials, or production systems are present.",
  ].join("\n"),
  "package.json": JSON.stringify(
    {
      name: "teacher-tool-lab",
      private: true,
      scripts: { test: "node scripts/check.mjs" },
    },
    null,
    2,
  ),
  "src/data/sample-lessons.json": JSON.stringify(
    [
      { id: "lesson-01", title: "Sample lesson" },
      { id: "lesson-02", title: "Another sample lesson" },
    ],
    null,
    2,
  ),
};

function emulatedEvent(
  kind: TerminalEvent["kind"],
  message: string,
  extra: Omit<TerminalEvent, "kind" | "message" | "evidenceType"> = {},
): TerminalEvent {
  return {
    kind,
    message,
    evidenceType: "emulated",
    ...extra,
  };
}

function sharedInteractions(launchInput: string, launchEvidenceId: string): ScenarioInteraction[] {
  return [
    {
      input: launchInput,
      output: [
        "[EMULATED] Agent session initialized for the fictional teacher-tool repository.",
        "[EMULATED] No provider service, account, or network connection was used.",
      ],
      events: [
        emulatedEvent("info", `Documented launch command represented by this fixture: ${launchInput}`, {
          evidenceId: launchEvidenceId,
        }),
      ],
    },
    {
      input: "inspect this project. do not modify it.",
      aliases: ["inspect this project; do not modify it"],
      requires: ["read"],
      output: [
        "[EMULATED] Inspection complete.",
        "[EMULATED] Repository appears to be a small teacher-facing utility with synthetic lesson data and project instructions.",
        "[EMULATED] No files were modified.",
      ],
      events: [
        emulatedEvent("read", "AGENTS.md", { path: "AGENTS.md" }),
        emulatedEvent("read", "README.md", { path: "README.md" }),
        emulatedEvent("read", "package.json", { path: "package.json" }),
        emulatedEvent("read", "src/data/sample-lessons.json", {
          path: "src/data/sample-lessons.json",
        }),
        emulatedEvent("git", "Working tree unchanged."),
      ],
    },
    {
      input: "npm test",
      requires: ["execute"],
      output: ["[EMULATED] Test command completed inside the course fixture."],
      events: [emulatedEvent("execute", "npm test", { command: "npm test" })],
    },
    {
      input: "curl https://example.com",
      requires: ["network"],
      output: ["[EMULATED] Network request represented by the fixture."],
      events: [
        emulatedEvent("network", "https://example.com", {
          command: "curl https://example.com",
        }),
      ],
    },
  ];
}

function scenario(
  provider: CliProvider,
  title: string,
  launchInput: string,
  launchEvidenceId: string,
  extraInteractions: ScenarioInteraction[] = [],
): CliScenario {
  return {
    id: `ots320-${provider}-inspection`,
    title,
    provider,
    cwd: "/workspace/teacher-tool",
    prompt: "$",
    files: syntheticFiles,
    gitStatus: "On branch training\nnothing to commit, working tree clean",
    gitDiff: "(no changes)",
    permissions: {
      read: true,
      write: false,
      execute: false,
      network: false,
    },
    interactions: [
      ...sharedInteractions(launchInput, launchEvidenceId),
      ...extraInteractions,
    ],
  };
}

export const codexScenario = scenario(
  "codex",
  "Codex CLI: inspect before changing",
  "codex",
  "codex-launch",
  [
    {
      input: "/init",
      output: [
        "[EMULATED] /init would create project instructions in AGENTS.md.",
        "[EMULATED] This training repository already contains AGENTS.md, so no file was changed.",
      ],
      events: [
        emulatedEvent("info", "Documented Codex /init command represented by this fixture.", {
          evidenceId: "codex-init-agents-md",
        }),
        emulatedEvent("read", "AGENTS.md already exists in the fixture.", { path: "AGENTS.md" }),
      ],
    },
    {
      input: "/status",
      output: [
        "[EMULATED] workspace: /workspace/teacher-tool",
        "[EMULATED] read: allowed | write: blocked | execute: blocked | network: blocked",
      ],
      events: [
        emulatedEvent("info", "Documented Codex status command represented by this fixture.", {
          evidenceId: "codex-session-status",
        }),
      ],
    },
    {
      input: "/permissions",
      output: ["[EMULATED] read=allow write=deny execute=deny network=deny"],
      events: [
        emulatedEvent("approval", "Documented Codex permissions control represented by this fixture.", {
          evidenceId: "codex-session-permissions",
        }),
      ],
    },
    {
      input: "/review",
      output: [
        "[EMULATED] Review requested for the current fixture state.",
        "[EMULATED] No working-tree changes are present, so there is nothing to review.",
      ],
      events: [
        emulatedEvent("git", "Documented Codex review workflow represented by this fixture.", {
          evidenceId: "codex-review",
        }),
      ],
    },
  ],
);

export const claudeScenario = scenario(
  "claude",
  "Claude Code: inspect before changing",
  "claude",
  "claude-launch",
  [
    {
      input: "claude --permission-mode plan",
      output: [
        "[EMULATED] Claude Code plan-mode behavior represented for instruction.",
        "[EMULATED] This fixture still blocks write, execute, and network operations.",
      ],
      events: [
        emulatedEvent("approval", "Documented plan permission mode represented by this fixture.", {
          evidenceId: "claude-plan-mode",
        }),
      ],
    },
  ],
);

export const agyScenario = scenario(
  "agy",
  "Antigravity CLI: inspect before changing",
  "agy",
  "agy-launch",
  [
    {
      input: "agy --help",
      output: [
        "[EMULATED] Antigravity CLI help output is intentionally abbreviated.",
        "[EMULATED] Use current Google documentation for authoritative flags and options.",
      ],
      events: [
        emulatedEvent("info", "Documented AGY help command represented by this fixture.", {
          evidenceId: "agy-help",
        }),
      ],
    },
  ],
);

export const OTS320_TERMINAL_SCENARIOS: Record<CliProvider, CliScenario> = {
  codex: codexScenario,
  claude: claudeScenario,
  agy: agyScenario,
};

export function getOts320Scenario(provider: CliProvider): CliScenario {
  return OTS320_TERMINAL_SCENARIOS[provider];
}
