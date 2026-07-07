# OTS-320 AI Coding Agents Outline

Date: 2026-06-22

Status: authored course tranche

Course path: Modern Teacher Systems

Prerequisite: OTS-240 or equivalent version-control basics

## Course Thesis

AI coding agents can help teachers build small tools, scripts, and course-site improvements, but only when teachers can scope the task, protect authored content, review diffs, test outputs, and stop when risk exceeds understanding.

OTS-320 should make agent work reviewable and teacher-owned. It should not encourage teachers to hand off sensitive student data, large systems, or unreviewed code.

## Source References

This outline is extracted from existing AI coding agent and workflow material:

- `content/lessons/codex-claude-code-ai-agents.mdx`
- `content/lessons/one-day-lesson-site-workflow.mdx`
- `content/field-notes/how-i-built-one-day-lesson-sites.mdx`
- OTS-220 Apps Script draft labs
- OTS-240 GitHub and review workflow outline

## Final Artifact

Reviewed agent-built classroom tool

The final artifact should include:

- agent safety checklist
- branch or copy workflow notes
- safe agent prompt
- diff review log
- test checklist
- small classroom tool or script
- prompt and test evidence portfolio
- teacher approval note

## Chapter Outline

| Chapter | Focus | Source references | Build artifact |
| --- | --- | --- | --- |
| 01. Agent Safety Mindset | Define what agents can help with and what teachers must still own. | `codex-claude-code-ai-agents.mdx` | Agent safety checklist |
| 02. Repo and Branch Workflow | Use version control, copies, branches, commits, and diffs to protect work. | OTS-240 outline, GitHub Docs | Branch workflow notes and diff review log |
| 03. Prompting Coding Agents | Write scoped prompts with inputs, outputs, constraints, and acceptance criteria. | `codex-claude-code-ai-agents.mdx`, `one-day-lesson-site-workflow.mdx` | Safe agent prompt |
| 04. Testing and Verification | Run generated work against test data, route checks, lint/build checks, and manual QA. | `codex-claude-code-ai-agents.mdx`, OTS-220 safety rules | Test checklist |
| 05. Building Teacher Tools | Build a small self-contained tool, script, or page that solves a real classroom workflow. | OTS-220 draft labs, `how-i-built-one-day-lesson-sites.mdx` | Small classroom tool |
| 06. Reviewed Agent Build | Package prompts, diffs, tests, revisions, and teacher approval evidence. | All OTS-320 authored lessons | Reviewed agent-built classroom tool |

## Safety Rules

- Use fake data while developing; do not give agents student names, grades, IDs, emails, or private files.
- Review every diff before accepting generated changes.
- Work on copies or branches so mistakes can be reverted.
- Keep tasks small enough that the teacher can understand the inputs, outputs, and failure modes.
- Stop when the generated work touches authentication, student data, payments, permissions, or systems the teacher cannot verify.
- Document tests before using generated code in a live workflow.

## Current Route Coverage

The authored course is represented in `src/lib/courseStructures.ts` and rendered through the shared course-book routes:

- `/book/ots-320`
- `/book/ots-320/01-agent-safety-mindset`
- `/book/ots-320/02-repo-branch-workflow/02-3`

## Next Content Tasks

1. Continue enriching course-owned `.mdx` lesson bodies with concrete agent prompts, diffs, tests, and teacher approval examples.
2. Keep the safe agent prompt template, diff review checklist, and fake-data testing protocol inside `content/courses/ots-320/templates/`.
3. Keep Codex, Claude Code, VS Code, GitHub, and Apps Script references attached or queued in `content/courses/ots-320/references/source-references.md`.
4. Run example builds only with non-sensitive fake data.
