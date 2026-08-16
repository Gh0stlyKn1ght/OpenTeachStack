# OTS-320 Phase 4 Terminal Emulator Foundation

**Date:** 2026-08-15  
**Phase:** 4 — Terminal emulator foundation  
**Status:** foundation implemented; xterm presentation adapter pending dependency metadata on pushed `main`  
**Production lesson rewrite:** not started

## Purpose

Phase 4 turns the Phase 3 CLI evidence into a deterministic teaching environment without exposing a real browser shell.

The architecture is deliberately split into two layers:

```text
xterm presentation adapter
        ↓
OTS-320 terminal engine
        ↓
deterministic scenario fixtures
        ↓
synthetic repository state + Phase 3 evidence IDs
```

The terminal engine is authoritative for what a learner input is allowed to do. xterm is only the presentation surface.

## Implemented foundation

The pure TypeScript emulator core lives at:

`src/lib/ots320-terminal/`

It contains:

- `types.ts` — scenario, permission, event, session, and result contracts
- `fixtures.ts` — Codex, Claude Code, and Antigravity CLI scenarios
- `engine.ts` — deterministic command interpreter and permission enforcement
- `index.ts` — public exports

The engine supports a small bounded command set:

```text
help
pwd
ls
cat <fixture-file>
git status
git diff
clear
reset
```

Provider-specific fixture inputs are explicitly enumerated. Unsupported input is rejected rather than passed to a system shell.

## Synthetic repository

All scenarios operate on a fictional repository at:

`/workspace/teacher-tool`

The repository includes only synthetic data such as:

- `README.md`
- `package.json`
- `src/data/sample-lessons.json`

No student records, credentials, environment secrets, school systems, or host files are available to the engine.

## Default permissions

The initial inspection scenarios use:

```text
read     allow
write    deny
execute  deny
network  deny
```

This intentionally makes inspection the first learned behavior.

A learner can type `npm test` or a fixture network command and see the action blocked by the permission model without anything being executed on the host.

## Event model

Every simulated system event is labeled `emulated`.

Examples:

```text
[READ] README.md
[EXEC] blocked npm test
[NETWORK] blocked https://example.com
[APPROVAL] execute permission required
[GIT] git diff inspected
```

Provider-specific documented commands may reference a Phase 3 evidence ID while their displayed runtime behavior remains explicitly emulated.

That distinction is important:

- the **command syntax** may be documented by a provider,
- the **course transcript** is still an emulator fixture unless it was actually captured from a real local run.

## Provider fixtures

### Codex CLI

The first Codex scenario represents:

- `codex`
- `/status`
- `/permissions`
- bounded read-only project inspection

Relevant Phase 3 evidence IDs are attached directly to those fixture events.

### Claude Code

The first Claude scenario represents:

- `claude`
- `claude --permission-mode plan`
- bounded read-only project inspection

### Antigravity CLI

The first AGY scenario represents:

- `agy`
- `agy --help`
- bounded read-only project inspection

## Safety boundary

The terminal core must not contain or invoke:

- Node `child_process`
- `spawn` / `exec` shell execution
- dynamic `eval` / `Function`
- `fetch`
- `XMLHttpRequest`
- `WebSocket`
- environment-secret access
- arbitrary host filesystem access

No unsupported command may fall through to another execution mechanism.

## CI

Phase 4 adds:

```bash
npm run ci:ots320-terminal
```

The check validates:

- required terminal foundation files exist,
- all three provider fixtures exist,
- required bounded commands exist,
- unsupported input is explicitly rejected,
- emulator events are labeled `emulated`,
- provider fixture evidence IDs resolve to the Phase 3 library,
- forbidden shell/network/evaluation APIs are absent,
- the terminal foundation does not depend on protected `content/courses/ots-320/**` lesson files.

This check is part of repository-owned CI. It does not require GitHub Actions or Vercel.

## xterm integration status

The user has installed xterm locally, but at the time this foundation was committed, pushed `main` still did not contain `@xterm/xterm` / addon dependency metadata in `package.json` and `package-lock.json`.

The repository therefore does **not** commit an xterm import against an unresolved dependency or manufacture a lockfile by hand.

Once the real dependency metadata from the local install is present on `main`, the presentation adapter should be added as a client component using the maintained xterm package and a fit addon.

The adapter must:

- render the deterministic engine rather than a shell,
- support Enter, Backspace, Ctrl+C, and clear/reset behavior,
- fit to its container,
- expose provider and permission state outside the terminal canvas,
- render terminal events visibly,
- provide accessible labels and keyboard focus,
- never gain host execution or network privileges.

## Production boundary

Phase 4 foundation changes do not modify:

`content/courses/ots-320/**`

The existing scaffold remains untouched until the later production rebuild is explicitly unlocked and Phase 5 authoring begins.

## Exit state

The deterministic engine, three provider fixtures, evidence linkage, and local CI foundation are implemented.

The remaining Phase 4 item is the xterm presentation adapter after the actual dependency metadata is committed to the repository.

Do not begin Phase 5 lesson authoring until the adapter and terminal usability pass are complete.
