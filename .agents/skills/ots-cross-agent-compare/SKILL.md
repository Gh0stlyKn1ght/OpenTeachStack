---
name: ots-cross-agent-compare
description: Compare Codex CLI, Claude Code, and Google Antigravity CLI (`agy`) using the same conceptual task and documented evidence without inventing feature parity.
---

# OTS Cross-Agent Compare

Use this skill for Chapter 6 and any material comparing multiple agent CLIs.

## Core rule

Compare concepts first, product labels second.

Valid dimensions include:

- project/context discovery
- persistent project instructions
- permission model
- shell/tool execution
- session/context continuation
- skills
- MCP/external tools
- non-interactive use
- evidence and review workflow

## Required workflow

1. Define one conceptual task.
2. Define explicit evaluation dimensions.
3. Verify each provider behavior from first-party docs.
4. Record what is truly equivalent, approximately analogous, or unique.
5. If a provider does not expose an equivalent feature, say so.
6. Prefer observable behavior over marketing language.

## Never

- rank vendors from preference or vibes
- copy one provider's terminology onto another
- assume a flag exists because a similar CLI has it
- hide material differences to make a tidy comparison table

## Comparison labels

- `equivalent-enough-for-this-task`
- `similar-but-different`
- `provider-specific`
- `not-documented`
- `not-supported-in-current-source`
