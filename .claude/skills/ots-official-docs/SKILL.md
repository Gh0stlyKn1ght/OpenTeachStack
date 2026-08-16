---
name: ots-official-docs
description: Verify OpenTeachStack provider-specific AI CLI claims against current first-party documentation and record source provenance before authoring or updating technical course content.
---

# OTS Official Docs

Use this skill whenever work depends on current behavior of Codex CLI, Claude Code, Google Antigravity CLI (`agy`), Agent Skills, project instructions, permissions, sandboxing, sessions, MCP, installation, authentication, or provider-specific commands and flags.

## Boundary

This skill verifies technical truth. It does not bulk-write lessons and it does not decide course pedagogy by itself.

Do not use remembered behavior as authority when a first-party source can be checked.

## Required workflow

1. Identify the provider, product, and exact behavior being claimed.
2. Read `docs/architecture/ots-320-official-sources.json` first.
3. Use the current first-party source listed there, or a newer first-party replacement if the provider moved the documentation.
4. Verify only the behavior needed for the current task.
5. Record provider, product, source title, canonical URL, verification date, behavior class, and stability.
6. If official sources disagree or are incomplete, mark the claim uncertain and keep it out of learner-facing technical instructions until resolved.
7. Never copy large sections of vendor documentation into OpenTeachStack. Summarize and cite the behavior.

## Source priority

1. current official product documentation
2. current official provider codelab or reference
3. local `--help` output from the installed CLI when explicitly requested
4. secondary material only for discovery

## Output contract

```yaml
provider: openai
product: codex-cli
claim: "..."
sourceTitle: "..."
docsUrl: "https://..."
verifiedAt: YYYY-MM-DD
behaviorClass: command | permission | workflow | skill | mcp | session | project-instructions
stability: stable | version-sensitive | uncertain
notes: "..."
```

## Rules

- A documented command may be shown as a real command.
- Synthetic output must be labeled `emulated`.
- Saved output from a real CLI session must be labeled `captured`.
- Do not silently update `verifiedAt`.
- Documentation checks may participate in provider-agnostic CI, but do not wire them to GitHub Actions or Vercel.
