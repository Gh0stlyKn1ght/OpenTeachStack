import type {
  CliScenario,
  CliSessionState,
  PermissionKey,
  ScenarioInteraction,
  TerminalCommandResult,
  TerminalEvent,
  TerminalStep,
} from "./types";

const EVENT_LABELS: Record<TerminalEvent["kind"], string> = {
  read: "READ",
  write: "WRITE",
  execute: "EXEC",
  network: "NETWORK",
  approval: "APPROVAL",
  git: "GIT",
  info: "INFO",
  warning: "WARNING",
};

export function normalizeTerminalInput(input: string): string {
  return input.trim().replace(/\s+/g, " ").toLowerCase();
}

export function renderTerminalEvent(event: TerminalEvent): string {
  const blocked = event.blocked ? " blocked" : "";
  return `[${EVENT_LABELS[event.kind]}]${blocked} ${event.message}`;
}

export function createCliSession(scenario: CliScenario): CliSessionState {
  return {
    scenario,
    files: { ...scenario.files },
    gitStatus: scenario.gitStatus,
    gitDiff: scenario.gitDiff,
    permissions: { ...scenario.permissions },
    history: [],
  };
}

function cloneState(state: CliSessionState): CliSessionState {
  return {
    ...state,
    files: { ...state.files },
    permissions: { ...state.permissions },
    history: [...state.history],
  };
}

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

function deniedPermission(
  state: CliSessionState,
  required: PermissionKey[] | undefined,
): PermissionKey | undefined {
  return required?.find((permission) => !state.permissions[permission]);
}

function findInteraction(
  scenario: CliScenario,
  normalizedInput: string,
): ScenarioInteraction | undefined {
  return scenario.interactions.find((interaction) => {
    const candidates = [interaction.input, ...(interaction.aliases ?? [])];
    return candidates.some((candidate) => normalizeTerminalInput(candidate) === normalizedInput);
  });
}

function result(
  lines: string[] = [],
  events: TerminalEvent[] = [],
  extra: Pick<TerminalCommandResult, "clearScreen" | "didReset"> = {},
): TerminalCommandResult {
  return { lines, events, ...extra };
}

function runBuiltIn(state: CliSessionState, rawInput: string): TerminalCommandResult | null {
  const normalized = normalizeTerminalInput(rawInput);

  if (normalized === "help") {
    const fixtureInputs = state.scenario.interactions.map((interaction) => interaction.input);
    return result([
      "OTS-320 deterministic terminal fixture",
      "Core commands: help, pwd, ls, cat <file>, git status, git diff, clear, reset",
      "Scenario inputs:",
      ...fixtureInputs.map((input) => `  ${input}`),
      "Unsupported input never falls through to a real shell.",
    ]);
  }

  if (normalized === "pwd") {
    return result([state.scenario.cwd]);
  }

  if (normalized === "ls") {
    if (!state.permissions.read) {
      const event = emulatedEvent("approval", "read permission required for ls", {
        blocked: true,
        command: "ls",
      });
      return result(["[EMULATED] Read blocked by the scenario permission model."], [event]);
    }
    return result(Object.keys(state.files).sort());
  }

  if (normalized.startsWith("cat ")) {
    const requestedPath = rawInput.trim().slice(4).trim();
    if (!state.permissions.read) {
      const event = emulatedEvent("approval", `read permission required for ${requestedPath}`, {
        blocked: true,
        path: requestedPath,
        command: rawInput.trim(),
      });
      return result(["[EMULATED] Read blocked by the scenario permission model."], [event]);
    }

    const content = state.files[requestedPath];
    if (content === undefined) {
      return result([`cat: ${requestedPath}: no such fixture file`], [
        emulatedEvent("warning", `Fixture file not found: ${requestedPath}`, {
          path: requestedPath,
        }),
      ]);
    }

    return result(content.split("\n"), [
      emulatedEvent("read", requestedPath, { path: requestedPath }),
    ]);
  }

  if (normalized === "git status") {
    return result(state.gitStatus.split("\n"), [
      emulatedEvent("git", "git status inspected", { command: "git status" }),
    ]);
  }

  if (normalized === "git diff") {
    return result(state.gitDiff.split("\n"), [
      emulatedEvent("git", "git diff inspected", { command: "git diff" }),
    ]);
  }

  if (normalized === "clear") {
    return result([], [], { clearScreen: true });
  }

  return null;
}

export function runTerminalInput(state: CliSessionState, rawInput: string): TerminalStep {
  const input = rawInput.trim();
  const normalized = normalizeTerminalInput(input);

  if (!input) {
    return { state, result: result() };
  }

  if (normalized === "reset") {
    return {
      state: createCliSession(state.scenario),
      result: result(
        ["[EMULATED] Scenario reset to its original deterministic state."],
        [emulatedEvent("info", "scenario reset")],
        { didReset: true },
      ),
    };
  }

  const nextState = cloneState(state);
  nextState.history.push(input);

  const builtIn = runBuiltIn(nextState, input);
  if (builtIn) {
    return { state: nextState, result: builtIn };
  }

  const interaction = findInteraction(nextState.scenario, normalized);
  if (!interaction) {
    return {
      state: nextState,
      result: result(
        [
          `[EMULATED] Unsupported fixture input: ${input}`,
          "Type help to see supported commands. Nothing was executed on the host system.",
        ],
        [emulatedEvent("warning", "unsupported input rejected", { command: input })],
      ),
    };
  }

  const denied = deniedPermission(nextState, interaction.requires);
  if (denied) {
    const event = emulatedEvent(
      "approval",
      `${denied} permission required for: ${interaction.input}`,
      {
        blocked: true,
        command: interaction.input,
      },
    );
    return {
      state: nextState,
      result: result(
        [
          `[EMULATED] ${denied.toUpperCase()} blocked by the scenario permission model.`,
          "No real command, file write, or network request occurred.",
        ],
        [event],
      ),
    };
  }

  return {
    state: nextState,
    result: result([...interaction.output], [...(interaction.events ?? [])]),
  };
}
