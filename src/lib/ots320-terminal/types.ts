export const CLI_PROVIDERS = ["codex", "claude", "agy"] as const;

export type CliProvider = (typeof CLI_PROVIDERS)[number];
export type TerminalEvidenceType = "documented" | "captured" | "emulated";
export type TerminalEventKind =
  | "read"
  | "write"
  | "execute"
  | "network"
  | "approval"
  | "git"
  | "info"
  | "warning";

export type PermissionKey = "read" | "write" | "execute" | "network";

export interface TerminalPermissions {
  read: boolean;
  write: boolean;
  execute: boolean;
  network: boolean;
}

export interface TerminalEvent {
  kind: TerminalEventKind;
  message: string;
  evidenceType: TerminalEvidenceType;
  blocked?: boolean;
  path?: string;
  command?: string;
  evidenceId?: string;
}

export interface ScenarioInteraction {
  input: string;
  aliases?: string[];
  output: string[];
  events?: TerminalEvent[];
  requires?: PermissionKey[];
}

export interface CliScenario {
  id: string;
  title: string;
  provider: CliProvider;
  cwd: string;
  prompt: string;
  files: Record<string, string>;
  gitStatus: string;
  gitDiff: string;
  permissions: TerminalPermissions;
  interactions: ScenarioInteraction[];
}

export interface CliSessionState {
  scenario: CliScenario;
  files: Record<string, string>;
  gitStatus: string;
  gitDiff: string;
  permissions: TerminalPermissions;
  history: string[];
}

export interface TerminalCommandResult {
  lines: string[];
  events: TerminalEvent[];
  clearScreen?: boolean;
  didReset?: boolean;
}

export interface TerminalStep {
  state: CliSessionState;
  result: TerminalCommandResult;
}
