# OTS-320 Phase 2 Skills Implementation

**Date:** 2026-08-15  
**Phase:** 2 — project skills  
**Status:** implemented  
**OTS-320 lesson rewrite:** not started

## Decision

OpenTeachStack now uses one canonical project-skill set for the OTS-320 CLI initiative.

Canonical source:

```text
.agents/skills/<skill-name>/SKILL.md
```

Claude Code compatibility mirror:

```text
.claude/skills/<skill-name>/SKILL.md
```

Google's current Antigravity CLI documentation describes project/workspace skills under `.agents/skills/`. Claude Code's current documentation describes project skills under `.claude/skills/`. The canonical source remains `.agents/skills`; Claude copies are generated compatibility artifacts.

## Implemented skills

1. `ots-official-docs`
2. `ots-cli-verifier`
3. `ots-cli-lesson-author`
4. `ots-terminal-emulator`
5. `ots-agent-safety`
6. `ots-git-evidence`
7. `ots-cross-agent-compare`
8. `ots-course-audit`

## CI model

CI is intentionally retained.

For this phase, CI means repository-owned validation commands that can run locally or in any future CI runner the user chooses.

It does **not** mean:

- GitHub Actions
- Vercel builds
- Vercel previews
- Vercel deployment gates

Phase 2 adds:

```bash
npm run skills:sync
npm run ci:skills
```

`skills:sync` mirrors canonical `.agents/skills` into `.claude/skills`.

`ci:skills` verifies:

- all eight canonical skills exist,
- each canonical skill has `SKILL.md`,
- skill frontmatter includes `name` and `description`,
- Claude mirrors exist,
- Claude mirrors have not drifted from canonical content.

This is intentionally separate from the repo's large existing `npm test` chain.

## Skill loading philosophy

`AGENTS.md` remains the always-loaded identity and boundary document. Long specialist procedures belong in skills so the agent loads them only when relevant.

The skill descriptions are written as routing triggers. Their bodies contain the detailed workflow.

## No lesson generation in Phase 2

Phase 2 does not authorize production OTS-320 lesson changes. The old generated course scaffold remains untouched.

## Next phase

Phase 3 builds the CLI evidence layer:

- verified Codex command/permission notes,
- verified Claude Code command/permission notes,
- verified AGY command/permission notes,
- provider source manifests,
- captured/documented/emulated evidence conventions.
