# OTS-320 Phase 1 Course Contract

**Date:** 2026-08-15  
**Phase:** 1 — Course contract and source registry  
**Status:** complete  
**Production lesson rewrite:** not started

## Final course identity

**Code:** OTS-320  
**Final title:** **Command Line AI for Teacher Builders**  
**Level:** Advanced  
**Pathway role:** operational AI-agent course after the OpenTeachStack foundations

The old production manifest still says `AI Coding Agents for Educators`. That file remains untouched during Phase 1 because the current OTS-320 course lock requires an explicit production-course unlock for title changes and module restructuring. This contract is the approved migration target for the later rebuild.

## Course promise

By the end of OTS-320, a teacher can use modern AI command-line agents to inspect a repository, define a bounded task, control permissions, make a small change, review the resulting diff, verify the result, and preserve an evidence trail instead of trusting the agent's answer.

The course uses **Codex CLI**, **Claude Code**, and **Google Antigravity CLI (`agy`)** as real case studies. It does not teach one vendor as the definition of an AI agent.

## What the course is really teaching

The durable concepts are:

- terminal-agent mental models
- current working directory and repository context
- project instructions and persistent guidance
- read / write / execute / network boundaries
- permissions, approvals, sandboxing, and trust
- prompts as technical task specifications
- Git diffs and rollback as evidence
- local verification before accepting a change
- reusable Agent Skills
- MCP and external-tool trust boundaries
- comparing agent behavior without inventing feature parity
- documenting what the agent actually did

## Prerequisites

### Required: OTS-000 or equivalent knowledge

A learner should already understand:

- files and folders
- basic terminal navigation
- what a repository is
- basic Git vocabulary
- how to read technical documentation
- secrets / permissions / backup basics
- the difference between a chatbot and a coding agent

OTS-320 must not reteach OTS-000 chapter-by-chapter. It may refresh a concept in one short block when needed.

### Recommended: OTS-101

OTS-101 is recommended but not required.

OTS-101 teaches how to turn AI output into real course content and how to verify that content before students see it. OTS-320 teaches how to operate AI agents inside repository and command-line workflows. A teacher can take OTS-320 for technical workflow skills even if they are not currently building course content.

## Explicit scope boundary with OTS-000

OTS-000 answers:

> What is this tool or concept, and why should a teacher understand it?

OTS-320 answers:

> How do I operate this safely in a real repository, inspect what it did, and decide whether to keep the change?

OTS-000 should retain literacy-level coverage of terminal, Git, agents, MCP, permissions, and documentation. OTS-320 owns operational depth.

## Explicit scope boundary with OTS-101

OTS-101 owns:

- curriculum and course-content decisions
- prompt quality for instructional content
- student-facing lesson quality
- source quality for instructional claims
- course-content verification

OTS-320 owns:

- CLI agent operation
- repository context
- command execution boundaries
- project instructions
- skills
- MCP
- code / file changes
- Git evidence
- technical verification and rollback

## Final chapter contract

The Phase 0 plan proposed 13 chapters. Phase 1 reduces that to **11** to avoid padding and overlap.

| Chapter | Final working title | Core question | Durable artifact |
|---|---|---|---|
| 01 | When AI Enters the Terminal | What changes when an AI assistant can inspect files and run tools? | CLI agent mental-model map |
| 02 | Context, Instructions, and Permissions | What can the agent see, what instructions govern it, and what is it allowed to do? | Context and permission boundary map |
| 03 | Codex CLI | How does Codex express repository context, instructions, skills, approvals, and shell work? | Codex evidence trace |
| 04 | Claude Code | How does Claude Code express sessions, project guidance, tools, skills, permissions, and MCP? | Claude evidence trace |
| 05 | Antigravity CLI (`agy`) | How does AGY express workspace context, permissions, skills, commands, and MCP? | AGY evidence trace |
| 06 | Same Task, Three Agents | What is actually equivalent across the three tools and what is not? | Cross-agent comparison matrix |
| 07 | Prompts as Technical Specifications | How do you give an agent enough scope to work without giving it ownership of the project? | Bounded task specification |
| 08 | Git, Diffs, Verification, and Rollback | How do you prove what changed and decide whether to keep it? | Agent change evidence packet |
| 09 | Project Instructions and Agent Skills | What belongs in persistent project guidance and what belongs in reusable skills? | One portable project skill |
| 10 | MCP and External Tool Trust | What changes when the agent can reach systems outside the repository? | MCP trust-boundary diagram |
| 11 | Capstone: Reviewed Agent-Assisted Build | Can you use an agent to build something useful while preserving human control and evidence? | Small teacher tool + evidence dossier |

## Chapter design rule

A chapter is not justified merely because a provider has a feature.

Every chapter must answer a durable systems question and produce an inspectable learner artifact.

Provider-specific chapters must always reconnect the product behavior to a broader concept.

## Provider case-study rule

Codex, Claude Code, and AGY receive dedicated chapters because their real CLI interfaces let learners observe how similar agent concepts are implemented differently.

The course must not:

- declare one provider the winner without explicit evaluation criteria,
- claim two features are equivalent just because their names sound similar,
- invent undocumented flags or behavior,
- require all three paid services for foundational learning,
- present synthetic emulator output as real captured output.

## Documentation contract

Technical behavior is sourced from current first-party documentation.

Each provider-specific claim should record:

```yaml
provider: openai | anthropic | google
product: codex-cli | claude-code | antigravity-cli
docsSource: official
docsUrl: https://...
verifiedAt: YYYY-MM-DD
behaviorClass: command | permission | workflow | skill | mcp | session | project-instructions
```

The canonical Phase 1 registry is:

`docs/architecture/ots-320-official-sources.json`

### Staleness policy

There is no CI gate for documentation freshness.

Staleness review is local and deliberate:

1. a human or agent notices a source may be stale,
2. the current first-party page is re-read,
3. the affected technical note or lesson is updated if necessary,
4. `verifiedAt` is changed only after actual review.

Do not automatically rewrite course content from vendor documentation.

## Terminal emulator contract

The emulator is a teaching environment, not a browser shell.

It may simulate:

- current working directory
- repository files
- reads
- writes
- command requests
- permission prompts
- blocked network access
- Git status and diffs
- reset / rollback

It must not provide unrestricted host command execution.

Every transcript must identify whether its output is:

- **documented** — directly representing documented syntax or behavior,
- **captured** — saved from a real local run,
- **emulated** — deterministic course fixture output.

## Capstone contract

### Capstone title

**Build a Small Teacher Tool With an AI CLI Agent**

### Goal

The learner uses one of the supported CLI agents to make a bounded change in a small starter repository while maintaining human control from request through review.

### Starter repository

The capstone repository must be synthetic and contain no school or student data.

It should be intentionally small enough that a learner can inspect the important files manually before asking an agent to change anything.

Recommended project shape:

```text
teacher-tool/
├── README.md
├── package.json
├── src/
│   ├── data/
│   │   └── sample-lessons.json
│   └── app/
│       └── ...
└── docs/
    └── task.md
```

### Approved capstone task class

The learner builds or improves a small teacher-facing utility such as:

- lesson-material organizer
- rubric formatter
- classroom-resource index
- static lesson-card generator
- course-content checklist tool

The capstone must not require student records, grades, IEP/504 records, credentials, or production school systems.

### Required evidence dossier

The final artifact is not merely the working tool.

The learner must preserve:

1. **Starting state** — repository status and task definition before agent work.
2. **Bounded specification** — what the agent may change and what it must not change.
3. **Agent / environment record** — provider, CLI, working directory, and relevant permission mode.
4. **Inspection evidence** — files or documentation reviewed before modification.
5. **Change evidence** — Git diff or equivalent file-level change record.
6. **Verification evidence** — local run, targeted check, or manual verification appropriate to the task.
7. **Human review note** — what the learner accepted, rejected, or changed after the agent's work.
8. **Rollback plan** — how the learner would restore the previous state.
9. **Source note** — official documentation used for any provider-specific command or behavior relied upon.

### Capstone completion standard

A capstone is complete when the learner can answer:

- What did I ask the agent to do?
- What context could it access?
- What actions could it take?
- What actually changed?
- What evidence shows the change works?
- What did I personally review?
- How would I undo it?

A polished output without those answers is not a passing capstone artifact.

## Phase 1 decisions that are now locked at the planning level

- OTS-320 title becomes **Command Line AI for Teacher Builders** during the later production rebuild.
- OTS-000 or equivalent knowledge is required.
- OTS-101 is recommended, not required.
- Final course spine is 11 chapters.
- Codex CLI, Claude Code, and AGY are case studies, not the curriculum itself.
- Official first-party docs are the source of truth for provider-specific behavior.
- The course uses evidence, diffs, local verification, and rollback rather than agent confidence.
- The capstone requires an evidence dossier.
- No CI gate and no Vercel workflow belongs to this initiative.

## Phase 1 exit status

Phase 1 is complete when this contract and the official source registry exist.

No production OTS-320 lessons were modified in Phase 1.

**Next phase:** Phase 2 — implement the project skills defined in the OTS-320 architecture plan.