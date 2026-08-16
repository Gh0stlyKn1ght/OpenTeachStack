# OTS-320 Phase 5 Core Authoring

**Date:** 2026-08-15  
**Phase:** 5 — Core course authoring  
**Status:** in progress  
**Course:** OTS-320 — Command Line AI for Teacher Builders

## Decision

Phase 5 is now active.

Phase 4 remains feature-complete in source. The outstanding xterm `package-lock.json` synchronization and local browser smoke check remain technical validation items, but they are not allowed to become a fake instructional-quality gate that blocks authoring real course content.

GitHub Actions and Vercel remain out of scope. Repository-owned CI remains in scope.

## Reader architecture

OTS-320 now has a dedicated reader boundary:

- `src/lib/ots320Course.ts`
- `src/app/book/ots-320/page.tsx`
- `src/app/book/ots-320/[chapter]/page.tsx`
- `src/app/book/ots-320/[chapter]/[section]/page.tsx`

This deliberately avoids rewriting the shared `COURSE_STRUCTURES` registry while OTS-320 is being rebuilt.

Navigation uses the approved 11-chapter Phase 1 contract. Lesson bodies continue to resolve from:

`content/courses/ots-320/lessons/<chapter-slug>/<section-slug>.mdx`

Planned sections without authored MDX remain intentionally unavailable. Route visibility is not course completion.

## Chapter 1 authored

Chapter 1: **When AI Enters the Terminal**

- `01.0` — Chapter Overview
- `01.1` — From Chat Answers to Repository Actions
- `01.2` — Read, Write, Execute, Network
- `01.3` — Lab: Inspect Before You Change
- `01.4` — Evidence Checkpoint: Prove What Happened

The sequence teaches the durable mechanism before provider-specific syntax:

1. AI moves from answer generation to repository action.
2. Repository action is reasoned about through read, write, execute, and network boundaries.
3. Investigation is separated from modification.
4. The xterm lab makes permissions and evidence observable with deterministic fixtures.
5. Agent claims are converted into files, diffs, command results, checks, and human review.

## Terminal integration

`Ots320TerminalLab` is now registered in the course-packet MDX component map, so authored lessons can embed the deterministic xterm environment directly in the reader.

The Chapter 1 lab uses the existing Phase 4 fixture. It remains:

- synthetic,
- resettable,
- provider-account free,
- credential free,
- host-shell free,
- network free,
- explicit about emulated output.

## Content truth correction

The old OTS-320 metadata contradicted itself by claiming both `hasRealLessons: false` and `humanReviewed: true` / release-ready status.

Phase 5 corrects that:

- `hasRealLessons: true` because Chapter 1 now contains authored lesson bodies.
- `humanReviewed: false` because the new course has not completed human review.
- release readiness explicitly says authoring is in progress.
- the old generated six-chapter course contract is replaced in `course.json` by the 11-chapter command-line AI contract.

## Authoring rule

Do not bulk-author the remaining 50 planned sections.

Continue in this order:

1. Chapter 2 — Context, Instructions, and Permissions
2. Chapter 3 — Codex CLI
3. Chapter 4 — Claude Code
4. Chapter 5 — Antigravity CLI
5. Chapter 6 — Same Task, Three Agents
6. Chapter 7 — Prompts as Technical Specifications
7. Chapter 8 — Git, Diffs, Verification, and Rollback
8. Chapter 9 — Project Instructions and Agent Skills
9. Chapter 10 — MCP and External Tool Trust
10. Chapter 11 — Capstone

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

Author Chapter 2 only.

Chapter 2 should deepen working-directory context, repository instructions, and least-access permission decisions before the course teaches any provider in depth.
