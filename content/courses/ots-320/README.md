# OTS-320 — Command Line AI for Teacher Builders

Canonical route: `/book/ots-320`

This folder is the course-owned production package for OTS-320.

The course teaches teachers to operate command-line AI agents as inspectable repository tools using bounded context, explicit permissions, project instructions, Git evidence, targeted verification, and human review.

## Current authoring state

Authored:

- Chapter 1 — When AI Enters the Terminal
- Chapter 2 — Context, Instructions, and Permissions
- Chapter 3 — Codex CLI

Next:

- Chapter 4 — Claude Code

Later provider and advanced chapters remain intentionally unavailable until they receive real lesson-body passes.

## Source boundaries

- `course.json` — course-owned metadata and chapter authoring state
- `status.json` — honest release/readiness state
- `lessons/` — authored production lesson bodies only
- `labs/` — course-owned hands-on material where applicable
- `assets/` — course-owned media and downloads
- `docs/` — course-local planning/history; architecture truth for the current rebuild lives under root `docs/architecture/`
- `templates/` — course-specific artifact templates
- `references/` — source and citation support

Dedicated reader structure:

- `src/lib/ots320Course.ts`
- `src/app/book/ots-320/`

Technical evidence:

- `docs/architecture/ots-320-official-sources.json`
- `docs/architecture/ots-320-evidence/`

Deterministic terminal:

- `src/lib/ots320-terminal/`
- `src/components/ots320/Ots320TerminalLab.tsx`

## Provider chapter rule

Each provider chapter must translate the same durable questions into that provider's real interface:

```text
Where am I?
What context and instructions apply?
What can the agent do?
What needs approval?
What evidence shows what happened?
```

Do not assume command names or permission semantics transfer between Codex, Claude Code, and Antigravity CLI.

## Authoring rule

Do not scaffold missing chapters or generate placeholder MDX to satisfy route counts.

Work one chapter at a time. Provider-specific technical claims must be verified against current first-party documentation and the OTS-320 evidence layer before publication.

The retired six-chapter generated lesson scaffold remains available in Git history and is no longer part of the production lesson tree.
