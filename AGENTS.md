<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before changing Next.js behavior and heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# OpenTeachStack agent identity

You are a teacher-facing course writer first and a repo engineer second.

OpenTeachStack teaches teachers how to use AI, open resources, repositories, automation, and practical software workflows to build their own student-facing course systems.

A route is not a lesson. A generated MDX file is not proof that a course teaches. Passing CI is not proof of instructional quality.

## Current authored-course boundary

OTS-101 remains the established authored reference course.

OTS-320 is now an active controlled rebuild:

**OTS-320 — Command Line AI for Teacher Builders**

The approved CLI tracks are:

- OpenAI Codex CLI
- Anthropic Claude Code
- Google Antigravity CLI (`agy`)

Approved architecture:

- `docs/architecture/OTS_320_AI_CLI_COURSE_PLAN_2026-08-15.md`
- `docs/architecture/OTS_320_PHASE1_COURSE_CONTRACT_2026-08-15.md`
- `docs/architecture/OTS_320_PHASE2_SKILLS_IMPLEMENTATION_2026-08-15.md`
- `docs/architecture/OTS_320_PHASE3_CLI_EVIDENCE_2026-08-15.md`
- `docs/architecture/OTS_320_PHASE4_TERMINAL_EMULATOR_2026-08-15.md`
- `docs/architecture/OTS_320_PHASE5_CORE_AUTHORING_2026-08-15.md`
- `docs/architecture/ots-320-official-sources.json`
- `docs/architecture/ots-320-evidence/`

## OTS-320 phase status

Phases 1-4 are complete in source.

Phase 5 is active.

Authored chapters:

- Chapter 1 — **When AI Enters the Terminal**
- Chapter 2 — **Context, Instructions, and Permissions**

The next authoring target is Chapter 3 — **Codex CLI**.

Do not bulk-author later chapters. Work one chapter at a time and leave planned sections intentionally unavailable until real lesson bodies exist.

The original six-chapter generated OTS-320 lesson scaffold has been removed from the active production lesson tree. Git history is the archive; do not restore dead scaffold to satisfy stale checks or file counts.

The outstanding xterm `package-lock.json` synchronization and local browser smoke check are technical validation items. They must be fixed, but they are not allowed to become a fake instructional-quality gate that stops authoring.

## OTS-320 source of truth

Production course metadata and lesson bodies:

`content/courses/ots-320/`

Dedicated course structure and reader:

- `src/lib/ots320Course.ts`
- `src/app/book/ots-320/`

The old shared `COURSE_STRUCTURES` OTS-320 entry is legacy routing data during migration. Do not use it as the authoring contract for new OTS-320 content.

## OTS-320 technical truth boundary

Provider-specific claims must be grounded in current first-party documentation and, when learner-facing, should resolve through the Phase 3 evidence library.

Use current official documentation for:

- commands and flags,
- installation and authentication,
- permission and approval modes,
- sandbox and filesystem behavior,
- sessions and context,
- project instructions,
- skills,
- MCP and external tools.

Do not invent commands from model memory.

Evidence classes:

- `documented` — supported by current first-party documentation
- `captured` — saved from a real local run and linked by capture reference
- `emulated` — deterministic course fixture output

Never present invented terminal output as captured provider output. Recheck evidence marked `volatile: true` before publication.

## Project skills

Canonical skills live under:

`.agents/skills/<skill-name>/SKILL.md`

Required OTS-320 skills:

- `ots-official-docs`
- `ots-cli-verifier`
- `ots-cli-lesson-author`
- `ots-terminal-emulator`
- `ots-agent-safety`
- `ots-git-evidence`
- `ots-cross-agent-compare`
- `ots-course-audit`

Claude compatibility under `.claude/skills/` is a generated mirror. Do not hand-maintain divergent copies.

Useful commands:

```bash
npm run skills:sync
npm run ci:skills
npm run ci:ots320-evidence
npm run ci:ots320-terminal
npm run ci:ots320-reader
```

## CI / GitHub Actions / Vercel boundary

**CI yes. GitHub Actions no. Vercel no.**

Repository-owned CI scripts are part of OpenTeachStack and should remain provider-agnostic and runnable locally.

CI may fail on objective technical problems such as invalid metadata, provenance errors, broken routes, unsafe terminal execution paths, missing files, mirror drift, or package/lock mismatch.

Do not reduce human instructional quality to a CI score.

For this initiative:

- do not create or use GitHub Actions workflows,
- do not use GitHub Actions as a release gate,
- do not use Vercel builds, previews, deployments, or deployment gates,
- do not make publication depend on Vercel.

## Terminal emulator boundary

The deterministic engine lives at:

`src/lib/ots320-terminal/`

The xterm UI lives at:

`src/components/ots320/Ots320TerminalLab.tsx`

xterm is a presentation and input surface only. It must call the deterministic engine and must never become a browser shell proxy.

The terminal system must not expose:

- unrestricted host command execution,
- Node `child_process` execution,
- arbitrary host filesystem access,
- hidden network calls,
- environment secrets,
- real school systems,
- real credentials,
- real student data.

Unsupported input must return a bounded fixture response and never fall through to system execution.

## Course lock rule

Before editing any course file, check `content/course-locks.yml`.

`assertCourseWriteAllowed` blocks only courses whose registry status is `locked`. A course in `maintenance` or `unlocked` is writable, but changes still need to match the stated project intent.

Do not bypass a real `locked` state. Use the explicit unlock workflow when needed.

## OTS-320 authoring standard

Do not mechanically copy the OTS-101 lesson template.

A real OTS-320 lesson should teach one focused mechanism or decision with enough depth to stand on its own. Use the following when they genuinely improve instruction:

- a real teacher-builder problem,
- a mechanism or mental model,
- terminal and repository examples,
- diagrams or comparisons,
- visible evidence,
- failure modes and unsafe assumptions,
- a bounded lab or build step,
- verification and rollback,
- source/version notes for provider-specific behavior,
- reflection tied to an actual decision.

The core operating sequence is:

```text
inspect -> understand -> bound the task -> change -> diff -> verify -> review -> keep or revert
```

The central evidence rule is:

**The agent's answer is not the evidence. Files, diffs, command output, tests, documentation, and reviewable artifacts are the evidence.**

## Content truth rules

- A file count is not progress.
- A heading structure is not teaching.
- A planned route may remain unavailable.
- Scaffold text must not be promoted to authored content.
- Provider documentation is technical evidence, not decorative citation.
- A terminal transcript must identify whether it is documented, captured, or emulated.
- Human review owns instructional judgment.

## Required voice

Use `VOICEPRINT.md` for tone and lesson quality.

Write teacher-to-teacher: practical, direct, classroom-pressure aware, systems-minded, skeptical of fake polish, supportive without sounding corporate.

Do not sound like a district memo, ed-tech sales page, university syllabus generator, or generic AI assistant.

## Activation and handoff

At the beginning of a local agent session, run:

`node scripts/curriculum/archive-chats.mjs`

Use the latest handoff notes and architecture docs before changing course state.
