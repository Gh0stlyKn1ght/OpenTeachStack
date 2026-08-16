# OTS-320 Phase 3 CLI Evidence Layer

**Date:** 2026-08-15  
**Phase:** 3 — CLI evidence layer  
**Status:** complete  
**Production lesson rewrite:** not started

## What Phase 3 adds

Phase 3 creates a provider-specific technical evidence layer before any OTS-320 lesson authoring begins.

The evidence library lives at:

`docs/architecture/ots-320-evidence/`

It currently contains documented evidence for:

- OpenAI Codex CLI
- Anthropic Claude Code
- Google Antigravity CLI (`agy`)

Each evidence item records:

- a stable evidence ID,
- behavior class,
- whether the evidence is documented, captured, or emulated,
- executable syntax where appropriate,
- a paraphrased technical claim,
- risk level,
- volatility flag,
- official source ID,
- verification date,
- intended OTS-320 chapter use.

## Evidence policy

Phase 3 deliberately separates three evidence classes:

### Documented

Behavior supported by current first-party documentation.

This is the default evidence type in the initial Phase 3 library.

### Captured

Output saved from a real local CLI session. Captured evidence must later include a `captureRef` pointing to the saved artifact or transcript.

Phase 3 does not fabricate captured runs.

### Emulated

Deterministic course fixture output used by the future browser terminal emulator.

Emulated output is not provider output and must be labeled clearly when Phase 4 begins.

## Current evidence themes

### Codex CLI

The evidence set covers:

- interactive launch,
- session status,
- permission selection,
- review,
- non-interactive `codex exec`,
- `AGENTS.md` discovery,
- repository Agent Skills under `.agents/skills`,
- Git checkpoints,
- sandbox / approval configuration,
- dangerous full-access bypass behavior.

### Claude Code

The evidence set covers:

- interactive launch,
- print mode,
- session continuation,
- permission modes,
- allow / ask / deny concepts,
- read-only command behavior,
- project skills under `.claude/skills`,
- MCP configuration and status,
- dangerous permission bypass behavior.

### Antigravity CLI

The evidence set covers:

- `agy --help`,
- interactive launch,
- workspace trust,
- model discovery and selection,
- Tool Permission configuration,
- project Agent Skills under `.agents`,
- workspace MCP configuration,
- MCP status,
- destructive external-tool risk,
- dangerous permission bypass behavior.

## Volatility rule

Evidence marked `volatile: true` must be rechecked before it becomes learner-facing technical instruction.

Expected volatile areas include:

- exact permission mode labels,
- model names,
- version numbers,
- installation commands,
- provider-specific flags,
- MCP configuration details,
- sandbox implementation details.

A durable course concept should not depend on a volatile label when a broader systems concept can be taught instead.

## CI

Phase 3 adds:

`node scripts/agents/check-ots320-evidence.mjs`

The focused command is:

```bash
npm run ci:ots320-evidence
```

The check validates objective repository facts only:

- all three provider evidence files exist,
- JSON is parseable,
- required evidence metadata is present,
- evidence IDs are unique,
- source IDs resolve to the official source registry,
- captured evidence has a capture reference,
- dangerous bypass commands are marked high risk,
- the evidence library has a minimum useful depth.

This is repository-owned CI. It does not require GitHub Actions or Vercel.

## Phase 3 boundary

No OTS-320 production lessons are changed during Phase 3.

The existing generated course remains isolated until the deliberate production rebuild phase.

## Next phase

**Phase 4 — Terminal emulator foundation**

Phase 4 should build a deterministic browser learning environment from fixtures derived from this evidence layer. It must not expose an unrestricted host shell.
