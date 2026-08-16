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

This deliberately avoids rewriting the shared `COURSE_STRUCTURES` registry while OTS-320 is being rebuilt.

Navigation uses the approved 11-chapter Phase 1 contract. Lesson bodies resolve from:

`content/courses/ots-320/lessons/<chapter-slug>/<section-slug>.mdx`

Planned sections without authored MDX remain intentionally unavailable. Route visibility is not course completion.

## Authored foundations

### Chapter 1 — When AI Enters the Terminal

- `01.0` — Chapter Overview
- `01.1` — From Chat Answers to Repository Actions
- `01.2` — Read, Write, Execute, Network
- `01.3` — Lab: Inspect Before You Change
- `01.4` — Evidence Checkpoint: Prove What Happened

The sequence establishes the durable operating model:

1. AI moves from answer generation to repository action.
2. Repository action is reasoned about through read, write, execute, and network boundaries.
3. Investigation is separated from modification.
4. The xterm lab makes permissions and evidence observable with deterministic fixtures.
5. Agent claims are converted into files, diffs, command results, checks, and human review.

### Chapter 2 — Context, Instructions, and Permissions

- `02.0` — Chapter Overview
- `02.1` — Working Directory and Repository Context
- `02.2` — Project Instructions and Scope
- `02.3` — Lab: Build a Permission Boundary
- `02.4` — Checkpoint: Least Access Needed

The sequence adds the control layers that should exist before provider-specific operation:

1. verify the working directory and project identity,
2. inspect starting Git state,
3. separate durable repository instructions from the current task,
4. name allowed and protected areas,
5. choose the least read/write/execute/network access needed for the task,
6. treat unexpected scope expansion as a new human decision.

The deterministic training repository now includes a synthetic `AGENTS.md`, allowing learners to inspect project instructions directly rather than only reading about the idea.

## Terminal integration

`Ots320TerminalLab` is registered in the course-packet MDX component map, so authored lessons can embed the deterministic xterm environment directly in the reader.

The fixture remains:

- synthetic,
- resettable,
- provider-account free,
- credential free,
- host-shell free,
- network free,
- explicit about emulated output.

## Content truth correction

The old OTS-320 metadata contradicted itself by claiming both `hasRealLessons: false` and `humanReviewed: true` / release-ready status.

Phase 5 corrected that:

- `hasRealLessons: true` because real authored lessons now exist,
- `humanReviewed: false` because the rebuilt course has not completed human review,
- release readiness explicitly says authoring is in progress,
- the generated six-chapter course contract was replaced in `course.json` by the 11-chapter command-line AI contract.

The old six-chapter generated lesson directories were also removed from `content/courses/ots-320/lessons`. They contained scaffold metadata and literal placeholder content such as `${richContent}`. Git history remains the archive; dead scaffold does not remain in the production lesson source.

## CI

The provider-agnostic repository CI now includes:

- `npm run ci:skills`
- `npm run ci:ots320-evidence`
- `npm run ci:ots320-terminal`
- `npm run ci:ots320-reader`

The OTS-320 reader checker points to the dedicated OTS-320 section route and validates the course-packet reader contract rather than expecting implementation details to be duplicated in the route file.

No GitHub Actions or Vercel gate is required or allowed for this initiative.

## Authoring rule

Do not bulk-author the remaining planned sections.

Continue in this order:

1. Chapter 3 — Codex CLI
2. Chapter 4 — Claude Code
3. Chapter 5 — Antigravity CLI
4. Chapter 6 — Same Task, Three Agents
5. Chapter 7 — Prompts as Technical Specifications
6. Chapter 8 — Git, Diffs, Verification, and Rollback
7. Chapter 9 — Project Instructions and Agent Skills
8. Chapter 10 — MCP and External Tool Trust
9. Chapter 11 — Capstone

Each provider-specific claim must resolve through current first-party documentation and the Phase 3 evidence library. Volatile claims must be rechecked before they become learner-facing instructions.

## Quality boundary

A real OTS-320 lesson should normally contain enough material to teach one focused mechanism or decision, not merely an activity shell.

Use:

- a real teacher-builder problem,
- a mechanism or mental model,
- concrete terminal/repository examples,
- visible evidence,
- failure modes or unsafe assumptions where useful,
- a bounded practice/build step,
- a verification or decision point,
- source/version notes where technical behavior is provider-specific.

Do not mechanically copy the OTS-101 lesson template.

## Next action

Author Chapter 3 — **Codex CLI** only.

Before authoring, recheck the current official OpenAI Codex CLI documentation and the Phase 3 Codex evidence set. The chapter should teach current Codex-specific operation as an application of the provider-neutral context, permission, and evidence model established in Chapters 1 and 2.
