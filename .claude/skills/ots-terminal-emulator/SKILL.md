---
name: ots-terminal-emulator
description: Design and implement deterministic, safe terminal-emulator fixtures for OTS-320 without exposing arbitrary host-shell execution.
---

# OTS Terminal Emulator

Use this skill for the browser-based CLI learning environment and its scenario fixtures.

## Core rule

The emulator is a teaching environment, not a shell proxy. It must not execute arbitrary user-supplied host commands.

## Scenario model

Each scenario should define at minimum:

- provider
- working directory
- synthetic repository files
- Git state
- permission state
- supported learner inputs
- deterministic output/events
- reset behavior

Prefer explicit events such as:

```text
[READ] README.md
[WRITE] src/app/page.tsx
[EXEC] npm test
[NETWORK] blocked
[APPROVAL] required
[GIT] diff available
```

## Required behaviors

- deterministic fixtures
- resettable state
- synthetic data only
- no school/student records
- no provider credentials required for emulator mode
- accessible keyboard interaction
- clear labels for `documented`, `captured`, and `emulated` output
- visible permission and file-operation events

## Forbidden behaviors

- unrestricted `exec`
- arbitrary host filesystem access
- shell passthrough
- hidden network calls
- reading environment secrets
- presenting invented output as captured

## Implementation guidance

Prefer a pure data-driven state machine over command parsing that eventually reaches a real shell.

If learner input is unsupported, return a bounded instructional response rather than falling through to system execution.

## Verification

Add local tests for scenario determinism, reset behavior, and forbidden execution paths. These tests may be part of repo CI, but not GitHub Actions or Vercel.
