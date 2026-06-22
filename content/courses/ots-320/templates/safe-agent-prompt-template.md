# OTS-320 Safe Agent Prompt Template

Use this template before asking an AI coding agent to edit course files, scripts, tools, or classroom-facing pages.

## Task

- Course or project:
- Teacher workflow problem:
- Desired change:
- Why this change matters:

## Scope

- Allowed files or folders:
- Files or folders the agent must not edit:
- Content that must be preserved exactly:
- Maximum size of change:

## Data Rules

- Use fake data only.
- Do not include student names, grades, IDs, emails, private messages, rosters, account credentials, hidden answer keys, or private files.
- Replace any realistic example with fictional placeholder data.

## Acceptance Criteria

- The change solves one named workflow problem.
- Existing authored content is not removed or rewritten unless explicitly requested.
- The result has clear teacher-facing instructions or notes.
- The agent reports changed files, tests run, skipped checks, and remaining risks.

## Verification Commands

- `npm run lint`
- `npm run build`
- Representative route or tool probe:

## Stop Conditions

Stop and ask before changing authentication, permissions, payments, student data, production deployments, district-managed systems, or files outside the stated scope.
