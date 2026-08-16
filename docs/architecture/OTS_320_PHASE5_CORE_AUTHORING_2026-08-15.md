# OTS-320 Phase 5 Core Authoring

**Date:** 2026-08-15  
**Phase:** 5 — Core course authoring  
**Status:** in progress  
**Course:** OTS-320 — Command Line AI for Teacher Builders

## Decision

Phase 5 is active.

Phase 4 remains feature-complete in source. The outstanding xterm `package-lock.json` synchronization and local browser smoke check remain technical validation items, but they are not allowed to become a fake instructional-quality gate that blocks authoring real course content.

GitHub Actions and Vercel remain out of scope. Repository-owned CI remains in scope.

## Reader architecture

OTS-320 has a dedicated reader boundary:

- `src/lib/ots320Course.ts`
- `src/app/book/ots-320/page.tsx`
- `src/app/book/ots-320/[chapter]/page.tsx`
- `src/app/book/ots-320/[chapter]/[section]/page.tsx`

Navigation uses the approved 11-chapter Phase 1 contract. Lesson bodies resolve from:

`content/courses/ots-320/lessons/<chapter-slug>/<section-slug>.mdx`

Planned sections without authored MDX remain intentionally unavailable. Route visibility is not course completion.

## Authored chapters

### Chapter 1 — When AI Enters the Terminal

- `01.0` — Chapter Overview
- `01.1` — From Chat Answers to Repository Actions
- `01.2` — Read, Write, Execute, Network
- `01.3` — Lab: Inspect Before You Change
- `01.4` — Evidence Checkpoint: Prove What Happened

### Chapter 2 — Context, Instructions, and Permissions

- `02.0` — Chapter Overview
- `02.1` — Working Directory and Repository Context
- `02.2` — Project Instructions and Scope
- `02.3` — Lab: Build a Permission Boundary
- `02.4` — Checkpoint: Least Access Needed

### Chapter 3 — Codex CLI

- `03.0` — Codex CLI
- `03.1` — Starting Codex in a Repository
- `03.2` — Permissions, Status, and Review
- `03.3` — Lab: Inspect a Repository with Codex
- `03.4` — Checkpoint: What Codex Actually Did

Chapter 3 is the first provider-specific application of the provider-neutral operating model established in Chapters 1 and 2.

The Codex sequence teaches:

1. launch from the correct project directory,
2. inspect starting Git state,
3. confirm session configuration with `/status`,
4. reason about `/permissions`, sandbox capability, and approval policy separately,
5. use `AGENTS.md` as durable project guidance rather than one-off prompt memory,
6. represent `/init` and `/review` through documented, explicitly emulated fixture behavior,
7. keep Git evidence and human review above agent assertions.

## Codex evidence refresh

Before authoring Chapter 3, current official OpenAI documentation was rechecked on 2026-08-15.

The Codex evidence library was extended with:

- `codex-init-agents-md`
- `codex-read-only-on-request`

The `codex-review` claim was tightened to reflect the documented dedicated review workflow.

Version-sensitive permission flags remain marked `volatile: true` and must be rechecked before future publication.

## Terminal integration

`Ots320TerminalLab` remains the embedded deterministic xterm teaching environment.

The Codex fixture now represents:

- `codex`
- `/init`
- `/status`
- `/permissions`
- `/review`
- bounded project inspection
- blocked execute requests
- blocked network requests
- Git status and diff evidence

The fixture remains synthetic, resettable, provider-account free, credential free, host-shell free, network free, and explicit about emulated output.

## Content truth

The old generated six-chapter OTS-320 lesson scaffold has been removed from the production lesson source. Git history remains the archive.

Current metadata now states:

- `hasRealLessons: true`
- `humanReviewed: false`
- Chapters 1 through 3 authored
- later chapters planned and intentionally unavailable

## CI

Provider-agnostic repository checks include:

- `npm run ci:skills`
- `npm run ci:ots320-evidence`
- `npm run ci:ots320-terminal`
- `npm run ci:ots320-reader`

No GitHub Actions or Vercel gate is required or allowed for this initiative.

Do not claim a local runtime pass until the xterm lockfile synchronization and browser smoke check are actually completed locally.

## Authoring rule

Do not bulk-author remaining chapters.

Continue in this order:

1. Chapter 4 — Claude Code
2. Chapter 5 — Antigravity CLI
3. Chapter 6 — Same Task, Three Agents
4. Chapter 7 — Prompts as Technical Specifications
5. Chapter 8 — Git, Diffs, Verification, and Rollback
6. Chapter 9 — Project Instructions and Agent Skills
7. Chapter 10 — MCP and External Tool Trust
8. Chapter 11 — Capstone

Each provider-specific claim must resolve through current first-party documentation and the Phase 3 evidence library. Volatile claims must be rechecked before they become learner-facing instructions.

## Quality boundary

A real OTS-320 lesson should teach one focused mechanism or decision with enough depth to stand on its own.

Use, when they improve instruction:

- a real teacher-builder problem,
- a mechanism or mental model,
- concrete terminal/repository examples,
- visible evidence,
- failure modes or unsafe assumptions,
- a bounded practice/build step,
- verification and rollback,
- source/version notes for provider-specific behavior,
- reflection tied to a real decision.

Do not mechanically copy the OTS-101 lesson template.

## Next action

Author Chapter 4 — **Claude Code** only.

Before authoring, recheck the current first-party Anthropic Claude Code documentation and the existing `claude-code.json` evidence set. Preserve the same context / permission / evidence questions without assuming Codex command names or control semantics transfer directly to Claude Code.
