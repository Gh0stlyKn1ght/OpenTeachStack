# OTS-000 Route Review Checklist

Status: draft route review required.

Use this after the content review direction is approved. This checklist is for local/dev preview and public-route boundary checks.

## Review rule

OTS-000 is active as a public-facing draft route, but it should stay clearly non-live until human review approves release.

## Course entry routes

| Route | What to check |
|---|---|
| `/pathway` | OTS-000 appears in the pathway with Draft status and does not imply release readiness. |
| `/book` | OTS-000 appears in the book list and remains clearly non-live. |
| `/book/ots-000` | Course thesis, chapter table of contents, final artifact, and draft/non-live boundary are clear. |

## Representative chapter routes

| Route | Why this route matters |
|---|---|
| `/book/ots-000/00-welcome-teacher-builder-stack` | Confirms the on-ramp framing works before technical vocabulary appears. |
| `/book/ots-000/01-builder-workstation` | Confirms the workstation chapter is practical and not hardware-shaming. |
| `/book/ots-000/04-vscode-teacher-builders` | Confirms VS Code guidance stays beginner-friendly. |
| `/book/ots-000/07-documentation-literacy` | Confirms source/documentation habits are visible before tool install guidance. |
| `/book/ots-000/11-ai-assistants-coding-agents-mcp` | Confirms AI/MCP access boundaries are clear. |
| `/book/ots-000/13-teacher-builder-starter-kit` | Confirms the capstone packet path is coherent. |

## Representative lesson routes

| Route | What to inspect |
|---|---|
| `/book/ots-000/00-welcome-teacher-builder-stack/00-1` | Teacher-builder stack explanation is plain and non-intimidating. |
| `/book/ots-000/01-builder-workstation/01-4` | Workstation checklist artifact is usable. |
| `/book/ots-000/04-vscode-teacher-builders/04-4` | VS Code survival sheet is practical and safe. |
| `/book/ots-000/08-markdown-mdx-content-files/08-4` | Starter Markdown lesson has student-facing clarity. |
| `/book/ots-000/11-ai-assistants-coding-agents-mcp/11-4` | AI/MCP access map includes review boundaries. |
| `/book/ots-000/13-teacher-builder-starter-kit/13-4` | Final build assembles the full Starter Kit. |

## Content rendering checks

For each representative lesson:

- Page title matches the section title.
- Breadcrumbs point to OTS-000 and the correct chapter.
- Sidebar highlights the active chapter and section.
- Tables fit the page on desktop and mobile.
- Code fences render as examples, not broken MDX.
- No private data, secrets, fake account details, or real student information appears.
- Capstone connection is visible.
- Safety or source note is present where needed.

## Public boundary checks

Before public release, confirm:

- `content/courses/ots-000/status.json` still has `humanReviewed: false` unless review is complete.
- Public pathway metadata still describes OTS-000 honestly.
- Draft behavior is intentional for production until approved.
- Public draft access does not accidentally imply public release.

## Review notes

```text
Reviewer:
Date:

Routes checked:

Rendering issues:

Content issues:

Boundary issues:

Decision:
```
