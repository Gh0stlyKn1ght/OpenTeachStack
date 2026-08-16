"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import {
  createCliSession,
  getOts320Scenario,
  renderTerminalEvent,
  runTerminalInput,
  type CliProvider,
  type CliSessionState,
  type TerminalEvent,
} from "@/lib/ots320-terminal";

const PROVIDER_LABELS: Record<CliProvider, string> = {
  codex: "Codex CLI",
  claude: "Claude Code",
  agy: "Antigravity CLI",
};

const EVENT_STYLES: Record<TerminalEvent["kind"], string> = {
  read: "border-sky-500/30 bg-sky-500/5 text-sky-700 dark:text-sky-300",
  write: "border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-300",
  execute: "border-violet-500/30 bg-violet-500/5 text-violet-700 dark:text-violet-300",
  network: "border-rose-500/30 bg-rose-500/5 text-rose-700 dark:text-rose-300",
  approval: "border-orange-500/30 bg-orange-500/5 text-orange-700 dark:text-orange-300",
  git: "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300",
  info: "border-border bg-surface-alt/40 text-slate",
  warning: "border-yellow-500/30 bg-yellow-500/5 text-yellow-800 dark:text-yellow-200",
};

const PERMISSION_ORDER = ["read", "write", "execute", "network"] as const;

type SubmitCommand = (command: string) => void;

function promptFor(state: CliSessionState): string {
  return `${state.scenario.prompt} `;
}

export default function Ots320TerminalLab() {
  const [provider, setProvider] = useState<CliProvider>("codex");
  const [events, setEvents] = useState<TerminalEvent[]>([]);
  const [sessionView, setSessionView] = useState<CliSessionState>(() =>
    createCliSession(getOts320Scenario("codex")),
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<Terminal | null>(null);
  const sessionRef = useRef<CliSessionState>(sessionView);
  const submitCommandRef = useRef<SubmitCommand | null>(null);

  const scenario = useMemo(() => getOts320Scenario(provider), [provider]);

  const quickCommands = useMemo(
    () =>
      Array.from(
        new Set([
          "help",
          "pwd",
          "git status",
          "git diff",
          ...scenario.interactions.map((interaction) => interaction.input),
        ]),
      ).slice(0, 10),
    [scenario],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initialSession = createCliSession(scenario);
    sessionRef.current = initialSession;
    setSessionView(initialSession);
    setEvents([]);

    const terminal = new Terminal({
      cursorBlink: true,
      cursorStyle: "block",
      fontFamily:
        "var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontSize: 14,
      lineHeight: 1.35,
      scrollback: 800,
      convertEol: true,
      allowTransparency: true,
    });
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(container);
    terminalRef.current = terminal;

    container.setAttribute(
      "aria-label",
      `${PROVIDER_LABELS[scenario.provider]} deterministic training terminal`,
    );

    let inputBuffer = "";
    let historyIndex = initialSession.history.length;

    const writePrompt = () => {
      terminal.write(promptFor(sessionRef.current));
    };

    const writeBanner = () => {
      terminal.writeln("OpenTeachStack / OTS-320 AI CLI Lab");
      terminal.writeln(`[EMULATED] ${scenario.title}`);
      terminal.writeln(`[WORKSPACE] ${scenario.cwd}`);
      terminal.writeln(
        "[SAFETY] Deterministic fixture only. No host shell, provider account, credentials, or network connection.",
      );
      terminal.writeln("Type help to inspect the supported command surface.");
      terminal.writeln("");
      writePrompt();
    };

    const replaceInput = (nextInput: string) => {
      inputBuffer = nextInput;
      terminal.write("\r\x1b[2K");
      terminal.write(`${promptFor(sessionRef.current)}${inputBuffer}`);
    };

    const executeInput = (commandOverride?: string) => {
      if (commandOverride !== undefined) {
        replaceInput(commandOverride);
      }

      const command = inputBuffer;
      inputBuffer = "";
      terminal.write("\r\n");

      const step = runTerminalInput(sessionRef.current, command);
      sessionRef.current = step.state;
      setSessionView(step.state);
      setEvents(step.result.events);
      historyIndex = step.state.history.length;

      if (step.result.clearScreen) {
        terminal.clear();
        terminal.write("\x1b[2J\x1b[H");
      }

      for (const line of step.result.lines) {
        terminal.writeln(line);
      }

      if (step.result.didReset) {
        terminal.writeln(`[WORKSPACE] ${step.state.scenario.cwd}`);
      }

      writePrompt();
      terminal.scrollToBottom();
    };

    submitCommandRef.current = (command: string) => {
      terminal.focus();
      executeInput(command);
    };

    const dataDisposable = terminal.onData((data) => {
      if (data === "\x1b[A") {
        const history = sessionRef.current.history;
        if (history.length === 0) return;
        historyIndex = Math.max(0, historyIndex - 1);
        replaceInput(history[historyIndex] ?? "");
        return;
      }

      if (data === "\x1b[B") {
        const history = sessionRef.current.history;
        if (history.length === 0) return;
        historyIndex = Math.min(history.length, historyIndex + 1);
        replaceInput(historyIndex === history.length ? "" : (history[historyIndex] ?? ""));
        return;
      }

      for (const character of data) {
        if (character === "\r") {
          executeInput();
          continue;
        }

        if (character === "\u007f") {
          if (inputBuffer.length > 0) {
            inputBuffer = inputBuffer.slice(0, -1);
            terminal.write("\b \b");
          }
          continue;
        }

        if (character === "\u0003") {
          inputBuffer = "";
          terminal.write("^C\r\n");
          writePrompt();
          continue;
        }

        if (character === "\u000c") {
          terminal.clear();
          terminal.write("\x1b[2J\x1b[H");
          terminal.write(`${promptFor(sessionRef.current)}${inputBuffer}`);
          continue;
        }

        if (character === "\n" || character < " ") continue;

        inputBuffer += character;
        terminal.write(character);
      }
    });

    const fit = () => {
      try {
        fitAddon.fit();
      } catch {
        // The terminal may be between layout states during navigation.
      }
    };

    const animationFrame = window.requestAnimationFrame(() => {
      fit();
      writeBanner();
      terminal.focus();
    });

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => fit());
    resizeObserver?.observe(container);
    window.addEventListener("resize", fit);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", fit);
      resizeObserver?.disconnect();
      dataDisposable.dispose();
      submitCommandRef.current = null;
      terminalRef.current = null;
      terminal.dispose();
    };
  }, [scenario]);

  const runQuickCommand = (command: string) => {
    submitCommandRef.current?.(command);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
      <div className="border-b border-border bg-surface-alt/50 px-4 py-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent">
              Deterministic emulator
            </p>
            <p className="mt-1 text-sm text-slate">
              Same fictional repository. Different documented agent surfaces.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="CLI provider">
            {(Object.keys(PROVIDER_LABELS) as CliProvider[]).map((item) => {
              const active = item === provider;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setProvider(item)}
                  aria-pressed={active}
                  className={`rounded-md border px-3 py-1.5 font-mono text-xs font-semibold transition-colors ${
                    active
                      ? "border-accent bg-accent text-white"
                      : "border-border bg-background text-slate hover:border-accent/50 hover:text-foreground"
                  }`}
                >
                  {PROVIDER_LABELS[item]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="min-w-0 bg-[#070a0d] p-3 sm:p-4">
          <div
            ref={containerRef}
            className="min-h-[430px] w-full overflow-hidden rounded-md bg-[#070a0d] p-2"
          />
        </div>

        <aside className="border-t border-border bg-background p-4 xl:border-l xl:border-t-0">
          <div className="space-y-6">
            <section>
              <h2 className="font-heading text-sm font-bold text-foreground">Permission boundary</h2>
              <p className="mt-1 text-xs leading-relaxed text-slate">
                These are fixture permissions, not your computer permissions.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {PERMISSION_ORDER.map((permission) => {
                  const allowed = sessionView.permissions[permission];
                  return (
                    <div
                      key={permission}
                      className={`rounded-md border px-2.5 py-2 font-mono text-[0.68rem] uppercase tracking-wide ${
                        allowed
                          ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300"
                          : "border-rose-500/30 bg-rose-500/5 text-rose-700 dark:text-rose-300"
                      }`}
                    >
                      <span className="block font-semibold">{permission}</span>
                      <span>{allowed ? "allowed" : "blocked"}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-heading text-sm font-bold text-foreground">Evidence events</h2>
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-slate">
                  emulated
                </span>
              </div>
              <div className="mt-3 space-y-2" aria-live="polite">
                {events.length === 0 ? (
                  <p className="rounded-md border border-dashed border-border px-3 py-3 text-xs leading-relaxed text-slate">
                    Run a command. File reads, approvals, Git inspection, blocked execution, and network boundaries appear here.
                  </p>
                ) : (
                  events.map((event, index) => (
                    <div
                      key={`${event.kind}-${event.message}-${index}`}
                      className={`rounded-md border px-3 py-2 font-mono text-[0.68rem] leading-relaxed ${EVENT_STYLES[event.kind]}`}
                    >
                      {renderTerminalEvent(event)}
                      {event.evidenceId ? (
                        <span className="mt-1 block opacity-70">evidence: {event.evidenceId}</span>
                      ) : null}
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </aside>
      </div>

      <div className="border-t border-border bg-surface-alt/30 px-4 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-heading text-sm font-bold text-foreground">Try a bounded command</h2>
            <p className="mt-1 text-xs text-slate">
              Buttons type into the same xterm input path as the keyboard.
            </p>
          </div>
          <button
            type="button"
            onClick={() => runQuickCommand("reset")}
            className="rounded-md border border-border bg-background px-3 py-1.5 font-mono text-xs font-semibold text-slate transition-colors hover:border-accent/50 hover:text-foreground"
          >
            reset
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {quickCommands.map((command) => (
            <button
              key={command}
              type="button"
              onClick={() => runQuickCommand(command)}
              className="rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-[0.7rem] text-slate transition-colors hover:border-accent/50 hover:bg-surface hover:text-foreground"
            >
              {command}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
