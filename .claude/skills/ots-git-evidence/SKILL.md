---
name: ots-git-evidence
description: Teach and enforce Git-based evidence, review, and rollback for AI-agent changes in OTS-320 labs and capstones.
---

# OTS Git Evidence

Use this skill whenever an agent is allowed to modify repository files.

## Core workflow

```text
inspect -> checkpoint/branch -> change -> diff -> verify -> review -> commit or revert
```

## Required evidence

Before change:

- current branch or checkpoint
- clean/known working state when practical
- bounded task definition

After change:

- `git status`
- targeted `git diff`
- verification result appropriate to the task
- human review note
- commit or explicit revert/reset decision

## Teaching rule

The agent saying "done" is not evidence. Prefer file-level diff, test output, local runtime observation, documentation confirmation, and manual inspection.

## Rollback

Every lab that modifies files must teach a safe recovery path appropriate to the workflow. Avoid destructive reset commands unless consequences are explicitly explained.

## CI boundary

Git/evidence validation may run as part of repo CI. Do not implement it as GitHub Actions or Vercel automation.
