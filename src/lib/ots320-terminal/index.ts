export {
  createCliSession,
  normalizeTerminalInput,
  renderTerminalEvent,
  runTerminalInput,
} from "./engine";

export {
  OTS320_TERMINAL_SCENARIOS,
  agyScenario,
  claudeScenario,
  codexScenario,
  getOts320Scenario,
} from "./fixtures";

export type {
  CliProvider,
  CliScenario,
  CliSessionState,
  PermissionKey,
  ScenarioInteraction,
  TerminalCommandResult,
  TerminalEvent,
  TerminalEventKind,
  TerminalEvidenceType,
  TerminalPermissions,
  TerminalStep,
} from "./types";
