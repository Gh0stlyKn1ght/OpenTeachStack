# OpenTeachStack Handoff

**Updated:** 2026-08-15  
**Current active build:** OTS-320 — Command Line AI for Teacher Builders

The previous July CourseOS handoff is superseded as the current restart point. Its history remains in Git.

For the detailed current continuation notes, read:

`docs/architecture/OTS_320_HANDOFF_2026-08-15.md`

## Current state

OTS-320 is in **Phase 5 — Core course authoring**.

Completed in source:

- Phase 1 — course contract and official source registry
- Phase 2 — project Agent Skills system
- Phase 3 — Codex / Claude Code / Antigravity CLI evidence library
- Phase 4 — deterministic terminal engine + xterm presentation layer

Authored chapters:

1. **When AI Enters the Terminal**
2. **Context, Instructions, and Permissions**
3. **Codex CLI**

Next instructional task:

**Chapter 4 — Claude Code**

Do not bulk-author later chapters.

## Course source of truth

Production metadata/content:

`content/courses/ots-320/`

Dedicated reader and structure:

```text
src/lib/ots320Course.ts
src/app/book/ots-320/
```

Technical evidence:

```text
docs/architecture/ots-320-official-sources.json
docs/architecture/ots-320-evidence/
```

Terminal:

```text
src/lib/ots320-terminal/
src/components/ots320/Ots320TerminalLab.tsx
```

Canonical project skills:

`.agents/skills/`

## Content truth

Current expected state:

```text
status: draft
hasRealLessons: true
humanReviewed: false
chapters 1-3: authored
chapters 4-11: planned
```

The original generated six-chapter OTS-320 lesson scaffold has been removed from active production lesson source.

Do not restore it. Git history is the archive.

## Core rules

The course is not three vendor tutorials.

Codex CLI, Claude Code, and Antigravity CLI are case studies for durable concepts:

- repository context,
- project instructions,
- permissions,
- sandbox/approval boundaries,
- technical task specifications,
- Git evidence,
- verification,
- rollback,
- skills,
- MCP,
- human review.

Central rule:

**The agent's answer is not the evidence. Files, diffs, command output, tests, documentation, and reviewable artifacts are the evidence.**

Core workflow:

```text
inspect -> understand -> bound the task -> change -> diff -> verify -> review -> keep or revert
```

## CI policy

**CI yes. GitHub Actions no. Vercel no.**

Focused OTS-320 checks:

```bash
npm run ci:skills
npm run ci:ots320-evidence
npm run ci:ots320-terminal
npm run ci:ots320-reader
```

Do not turn instructional quality into a CI score.

## Known technical loose end

The pushed `package.json` contains:

```text
@xterm/xterm
@xterm/addon-fit
```

The last verified pushed `package-lock.json` did not yet include those xterm records.

Therefore do not claim:

- `npm ci` is clean,
- xterm browser smoke verification passed,
- the dependency lock issue is resolved,

until it is verified locally.

Do not manually invent lockfile integrity values.

## Resume order

When continuing:

1. `git pull`
2. inspect `git status --short`
3. run `node scripts/curriculum/archive-chats.mjs`
4. read `AGENTS.md`
5. read `docs/architecture/OTS_320_HANDOFF_2026-08-15.md`
6. resolve/verify the xterm package-lock state locally when practical
7. recheck current Anthropic Claude Code first-party documentation
8. compare it with `docs/architecture/ots-320-evidence/claude-code.json`
9. update evidence/fixture only where needed
10. author Chapter 4 only
11. update course metadata and handoff state only after Chapter 4 is real

## Short resume instruction

> Continue OTS-320 from `docs/architecture/OTS_320_HANDOFF_2026-08-15.md`. Chapters 1-3 are authored. Reverify Claude Code documentation and author Chapter 4 only. Keep provider-agnostic CI, do not use GitHub Actions or Vercel, do not restore the retired scaffold, and do not claim the xterm lock/browser issue is fixed until locally verified.
