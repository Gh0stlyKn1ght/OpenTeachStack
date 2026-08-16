# OTS-320 AI CLI Course Plan

**Date:** 2026-08-15  
**Status:** planning only  
**Implementation state:** no OTS-320 lesson rewrite is authorized by this document  
**Working title:** **OTS-320 — Command Line AI for Teacher Builders**

## Decision

Rebuild OTS-320 around real command-line AI workflows instead of generic AI-agent explanations.

The course will use three primary CLI environments as concrete case studies:

1. **OpenAI Codex CLI** — the terminal coding-agent surface in the OpenAI / ChatGPT ecosystem.
2. **Anthropic Claude Code** — Claude's terminal coding-agent workflow.
3. **Google Antigravity CLI (`agy`)** — Google's terminal-first Antigravity agent.

The course is not a vendor comparison page and it is not a prompt-tip collection. The products are used to teach durable concepts:

- shell and working-directory context
- repository inspection
- read / write / execute boundaries
- permissions and approvals
- sandboxing
- source control and diffs
- structured prompting as technical instruction
- documentation literacy
- sessions and context
- non-interactive / scripted use where supported
- skills
- MCP and external tools
- verification and rollback

The durable lesson is how an agent operates around a real repository. Product commands are evidence and examples, not the whole curriculum.

---

## Why this replaces the current OTS-320 direction

The existing OTS-320 outline has the correct general topics, but the generated lesson bodies are scaffolds rather than finished instruction. Rebuilding the course around official CLI documentation gives each lesson a technical anchor and gives the learner something observable to inspect.

A learner should be able to see a command, predict what access it requires, inspect an emulated result, compare it with official documentation, and explain what the agent did before being asked to use a real tool.

This is stronger than teaching abstract claims such as "agents can read repositories" because the course can show the workflow directly.

---

# Source-of-truth policy

## Official documentation only for technical behavior

Technical claims about a provider CLI must be checked against current first-party documentation before publication.

Primary sources for the first implementation pass:

### OpenAI / Codex

- Codex CLI: https://developers.openai.com/codex/cli
- AGENTS.md behavior: https://developers.openai.com/codex/agent-configuration/agents-md
- Agent skills: https://developers.openai.com/codex/build-skills
- Agent approvals and security: https://developers.openai.com/codex/agent-approvals-security

### Anthropic / Claude Code

- Claude Code CLI reference: https://code.claude.com/docs/en/cli-usage
- Claude Code skills: https://code.claude.com/docs/en/slash-commands

### Google / Antigravity CLI

- Antigravity CLI spec-driven development, skills, and MCP codelab: https://codelabs.developers.google.com/sdd-agy-cli
- Antigravity CLI hands-on codelab: https://codelabs.developers.google.com/antigravity-cli-hands-on

Secondary sources may help us discover a topic, but they cannot be the final authority for commands, permissions, flags, installation steps, or product behavior.

## Documentation metadata

Every provider-specific lesson should record documentation provenance in frontmatter or a source manifest. Minimum fields:

```yaml
provider: openai | anthropic | google
product: codex-cli | claude-code | antigravity-cli
docsSource: official
docsUrl: https://...
verifiedAt: YYYY-MM-DD
behaviorClass: command | permission | workflow | skill | mcp | session
```

Where a lesson depends on a version-specific command or flag, record the version observed during verification when practical.

## Staleness rule

Do not automatically rewrite lessons when provider documentation changes.

Instead:

1. flag the lesson as needing review,
2. show which source changed or aged out,
3. re-verify the technical behavior,
4. update the lesson deliberately,
5. record the new verification date.

The repository must not silently turn current vendor behavior into permanent curriculum truth.

---

# Course design rules

## Teach the system before the product

The sequence should teach a concept once, then show how the three CLIs express it differently.

Example:

1. Explain **working directory and repository context**.
2. Show how Codex enters a project and reports its directory.
3. Show how Claude Code operates from a working directory and can add directories.
4. Show how `agy` trusts and scopes a workspace.
5. Ask the learner to compare the access boundary, not the branding.

## Real commands, bounded transcripts

Use real documented commands and flags wherever a command is presented as real.

Synthetic terminal output must be explicitly treated as an **emulation** or **course fixture**. Do not fabricate a transcript and present it as captured provider output.

A course block should be able to distinguish:

- `real-command`
- `emulated-output`
- `captured-output`
- `explanation`
- `warning`

## No unrestricted browser shell

The first implementation should not expose arbitrary local or server command execution through the course reader.

The browser learning environment should be deterministic and fixture-driven:

- learner enters a supported command or prompt,
- the emulator resolves it against a controlled scenario,
- the UI shows read / write / execute / network / approval events,
- the learner inspects the evidence,
- the emulator cannot reach the host shell.

Real CLI installation belongs in explicit local labs later in the course.

## Evidence before confidence

The course should repeatedly reinforce:

> The agent's answer is not the evidence. Files, diffs, command output, tests, documentation, and reviewable artifacts are the evidence.

---

# Proposed course spine

This is a planning spine, not an authorized lesson manifest yet.

| Chapter | Working focus | Durable artifact |
|---|---|---|
| 01 | When AI enters the terminal | CLI mental-model map |
| 02 | Shell, working directory, files, and repository context | Context boundary map |
| 03 | Codex CLI | Codex command and permission trace |
| 04 | Claude Code | Claude command and permission trace |
| 05 | Antigravity CLI (`agy`) | AGY command and permission trace |
| 06 | Read, write, execute, network, and approvals | Access-control matrix |
| 07 | Prompts as technical instructions | Bounded agent task specification |
| 08 | Git, diffs, branches, rollback, and review | Agent change evidence packet |
| 09 | Sessions, context, project instructions, and AGENTS / CLAUDE guidance | Project instruction map |
| 10 | Agent skills | Portable project skill |
| 11 | MCP and external tools | Tool trust-boundary diagram |
| 12 | Same repo, three agents | Cross-agent evidence comparison |
| 13 | Capstone: reviewed agent-assisted build | Small teacher tool + evidence dossier |

The final chapter count can shrink after the first source and usability pass. Do not inflate the course to satisfy a predetermined chapter number.

---

# Terminal emulator concept

## Goal

Let a teacher learn agent behavior before installing an AI CLI.

## Minimum emulator state

A scenario fixture should define:

```ts
interface CliScenario {
  id: string;
  provider: "codex" | "claude" | "agy";
  cwd: string;
  files: Record<string, string>;
  gitStatus: string;
  permissions: {
    read: boolean;
    write: boolean;
    execute: boolean;
    network: boolean;
  };
  supportedInputs: ScenarioInput[];
}
```

The exact implementation may change. The important architecture is that course behavior comes from deterministic fixtures rather than a general-purpose shell.

## Events the learner should be able to see

```text
[READ] README.md
[READ] package.json
[WRITE] src/app/page.tsx
[EXEC] npm test
[NETWORK] blocked
[APPROVAL] required
[GIT] diff available
```

The course can then ask questions such as:

- What evidence did the agent inspect?
- Did it modify anything?
- Which action required approval?
- What could be rolled back?
- What claim still needs documentation verification?

---

# Cross-agent skill architecture

## Decision

Use the open `SKILL.md` model as the reusable workflow layer.

Codex and Antigravity CLI both support repository skills under `.agents/skills`. Claude Code supports project skills under `.claude/skills` and can follow symlinked skill directories. We should therefore author one canonical skill set and provide a portability mechanism instead of maintaining three independently written copies.

### Canonical source

```text
.agents/
└── skills/
    ├── ots-official-docs/
    │   └── SKILL.md
    ├── ots-cli-verifier/
    │   └── SKILL.md
    ├── ots-cli-lesson-author/
    │   └── SKILL.md
    ├── ots-terminal-emulator/
    │   └── SKILL.md
    ├── ots-agent-safety/
    │   └── SKILL.md
    ├── ots-git-evidence/
    │   └── SKILL.md
    ├── ots-cross-agent-compare/
    │   └── SKILL.md
    └── ots-course-audit/
        └── SKILL.md
```

### Claude compatibility

Do not hand-maintain divergent Claude-specific copies.

During the skills implementation phase, choose one verified portability method:

1. repository symlinks from `.claude/skills/<name>` to `.agents/skills/<name>` if cross-platform Git behavior is acceptable, or
2. a deterministic local sync script that mirrors canonical skills into `.claude/skills` plus an optional local drift-check script the user may run manually.

Because OpenTeachStack supports Windows as well as Unix-like environments, the local sync approach should be preferred unless symlink behavior is proven reliable in the repository's supported Windows setup.

No CI or deployment system is required for skill synchronization or validation.

---

# Required project skills

These skills are not implemented by this planning phase. This section defines what must exist before broad OTS-320 authoring starts.

## 1. `ots-official-docs`

**Job:** ground technical claims in current first-party documentation.

Must:

- prefer provider documentation over blogs and remembered behavior,
- capture source URL and verification date,
- separate stable concepts from version-specific behavior,
- refuse to invent flags, commands, permission names, or product features,
- produce a short source note suitable for lesson metadata.

## 2. `ots-cli-verifier`

**Job:** verify every CLI command block that is presented as executable.

Must:

- identify provider and command family,
- compare command syntax against official docs and, when available, local `--help`,
- distinguish documented examples from course-created examples,
- label unsupported or uncertain syntax instead of guessing,
- flag dangerous permission-bypass commands for special treatment.

## 3. `ots-cli-lesson-author`

**Job:** turn verified CLI behavior into actual teacher-facing instruction.

Must require:

- teacher problem,
- mechanism / mental model,
- real documented command,
- emulated or captured evidence,
- explanation of what changed and what did not,
- weak / unsafe version when useful,
- bounded build step,
- verification check,
- safety / privacy / source note,
- reflection or decision point,
- connection to the chapter artifact.

It must reject a lesson that only says "Do This", "Save Evidence", and "Reflect" without actually teaching the mechanism.

## 4. `ots-terminal-emulator`

**Job:** create deterministic, safe terminal-learning fixtures.

Must:

- never expose arbitrary host-shell execution,
- represent read / write / execute / network / approval events explicitly,
- keep provider-specific output clearly labeled as emulated unless captured,
- use fictional repositories and synthetic data,
- make every scenario resettable,
- keep the emulator useful without requiring provider credentials.

## 5. `ots-agent-safety`

**Job:** review any lesson involving permissions, shell execution, network access, secrets, external tools, or irreversible changes.

Must inspect:

- sandbox boundary,
- approval boundary,
- filesystem scope,
- network scope,
- secrets and environment variables,
- student / school data exposure,
- destructive commands,
- permission-bypass flags,
- rollback path.

A security warning must not be compressed into a generic disclaimer.

## 6. `ots-git-evidence`

**Job:** enforce Git as the evidence and rollback layer for agent-written changes.

Must teach and verify the sequence:

```text
inspect -> branch/checkpoint -> change -> diff -> test -> review -> commit or revert
```

The skill should prefer inspectable diffs over claims such as "the agent fixed it."

## 7. `ots-cross-agent-compare`

**Job:** compare Codex, Claude Code, and AGY without inventing feature parity.

Must:

- compare the same conceptual task,
- use provider-specific documentation,
- distinguish equivalent concepts from merely similar labels,
- avoid ranking vendors unless the evidence and evaluation criteria are explicit,
- focus on observable behavior and learner decisions.

## 8. `ots-course-audit`

**Job:** prevent scaffold completion from being mistaken for curriculum completion.

Must flag locally when requested:

- `${richContent}` and similar unresolved placeholders,
- `generationSource: scaffold` in public lesson bodies,
- empty source provenance on provider-specific technical claims,
- copied template prose masquerading as instruction,
- repeated generic lesson bodies,
- activity without explanation or modeling,
- unverified commands,
- stale provider documentation,
- release metadata that contradicts actual content state.

This audit is advisory and user-invoked. It is not a CI gate or deployment gate.

---

# AGENTS.md behavior for this initiative

Until Phase 1 is explicitly started:

- OTS-320 remains **Coming Soon / planning only**.
- Agents may edit this plan, research official sources, and design skills.
- Agents must not bulk-author OTS-320 lessons.
- Agents must not regenerate the existing OTS-320 scaffold into production content.
- Agents must not mark OTS-320 reviewed, beta, public, enriched, or release-ready.

When implementation begins, `AGENTS.md` should require the relevant project skill before each class of work instead of carrying all procedures in always-loaded instructions.

---

# No CI / no Vercel rule

This initiative does **not** use CI or Vercel as part of its implementation workflow.

Do not:

- create or run GitHub Actions gates for this work,
- make authoring depend on CI status,
- add release blockers tied to CI,
- deploy previews to Vercel,
- deploy production builds to Vercel,
- use Vercel build output as a course-quality signal,
- make phase completion depend on deployment infrastructure.

When verification is useful, prefer small local scripts or direct inspection that the user explicitly chooses to run.

---

# Phased implementation

## Phase 0 — Governance and plan

**Purpose:** stop premature generation and establish the source / skill model.

Deliverables:

- this implementation plan,
- `AGENTS.md` boundary for OTS-320 planning,
- required skill inventory,
- official source list,
- no course lesson changes.

Completion criteria:

- project instructions clearly prevent bulk OTS-320 generation,
- source and skill strategy is documented.

## Phase 1 — Course contract and source registry

**Purpose:** define exactly what OTS-320 promises before authoring.

Deliverables:

- final course title and promise,
- prerequisite boundary with OTS-000 and OTS-101,
- chapter contract,
- capstone definition,
- provider documentation registry,
- version / staleness policy implemented in course metadata.

Completion criteria:

- no chapter exists solely to advertise a product,
- every chapter has a durable concept and artifact,
- technical sources are first-party.

## Phase 2 — Project skills

**Purpose:** make the agents capable of maintaining this course without reverting to scaffold behavior.

Deliverables:

- implement the eight skills defined above,
- implement `.agents/skills` canonical source,
- implement Claude compatibility,
- add optional local skill parity / discovery checks,
- add a small local skill-evaluation fixture set.

Completion criteria:

- Codex can discover the project skills,
- AGY can discover the project skills,
- Claude Code can use the same canonical skill content through the chosen compatibility method,
- skill descriptions trigger only for their intended work.

## Phase 3 — CLI evidence layer

**Purpose:** build verified technical references before course prose.

Deliverables:

- Codex command / permission evidence set,
- Claude Code command / permission evidence set,
- AGY command / permission evidence set,
- captured or documented behavior notes,
- provider source manifests,
- optional local stale-source report.

Completion criteria:

- every command intended for the course has provenance,
- uncertain commands are excluded rather than approximated.

## Phase 4 — Terminal emulator foundation

**Purpose:** make CLI behavior learnable in the reader without exposing a real shell.

Deliverables:

- emulator component,
- deterministic scenario schema,
- provider-themed adapters / presentation,
- permission and filesystem event visualization,
- resettable sample repository,
- accessibility and keyboard review.

Completion criteria:

- emulator cannot execute arbitrary host commands,
- scenarios are deterministic,
- emulated output is clearly distinguished from captured output.

## Phase 5 — Core course authoring

**Purpose:** author the durable concept chapters and provider case studies.

Order:

1. terminal / repository context,
2. access boundaries,
3. Codex,
4. Claude Code,
5. AGY,
6. prompting as specification,
7. Git evidence.

Completion criteria:

- each lesson teaches before it asks the learner to act,
- each provider-specific technical claim is sourced,
- each lab leaves a visible artifact.

## Phase 6 — Skills, MCP, and comparison labs

**Purpose:** move from single-agent basics to reusable agent systems.

Deliverables:

- project-instruction lesson,
- Agent Skills lesson and build,
- MCP trust-boundary lesson,
- same-repository / same-task three-agent comparison lab,
- evidence-based evaluation rubric.

Completion criteria:

- no false feature parity,
- comparison is based on observable evidence and documented capabilities.

## Phase 7 — Capstone and pathway cleanup

**Purpose:** finish the course and reconnect the pathway around it without introducing CI/deployment bureaucracy.

Deliverables:

- capstone starter repository,
- reviewed agent-assisted teacher tool build,
- evidence dossier template,
- user-invoked OTS-320 content audit,
- release metadata cleanup,
- OTS-000 overlap pass so orientation teaches literacy while OTS-320 teaches operation.

Completion criteria:

- no scaffold placeholders,
- no unverified command examples,
- no contradictory release metadata,
- human review completed,
- OTS-320 remains hidden until the user decides it is ready to expose.

---

# Explicit non-goals

Do not use this initiative to:

- build a general-purpose browser shell,
- teach arbitrary system administration,
- turn the course into three vendor manuals,
- automatically ingest and republish full vendor documentation,
- teach permission-bypass flags as normal workflow,
- rank providers from vibes,
- require real student data,
- require paid provider access for foundational emulator lessons,
- bulk-generate every chapter before the evidence layer exists,
- create CI gates,
- create Vercel deployment workflows.

---

# First action after this plan

The next implementation work should be **Phase 1 only**.

Do not jump to lesson generation.

Phase 1 should first settle:

1. final OTS-320 title,
2. course promise,
3. prerequisite relationship to OTS-000 and OTS-101,
4. final chapter boundaries,
5. source registry schema,
6. capstone evidence contract.

Only after that should the project create the skills and technical evidence layer.
