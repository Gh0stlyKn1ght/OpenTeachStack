# OTS-280 Privacy Review

Date: 2026-06-22

Status: passed for current authored examples

Scope:

- `src/lib/cyberSafety.ts`
- OTS-280 Chapter 01 authored section content
- OTS-280 Chapter 02-10 chapter-specific authored section guides
- `docs/OTS_280_PRIVATE_USE_TEMPLATES.md`
- `docs/OTS_280_SOURCE_REFERENCES_AND_ESCALATION.md`

## Review Result

Pass with continuing review required as new authored examples are added.

The current OTS-280 authored content uses generic teacher scenarios, labels, and placeholders. It does not include real student data, live credentials, real incident details, private URLs, account addresses, recovery codes, or screenshots.

## Example Safety Checks

| Area | Result | Notes |
| --- | --- | --- |
| Student data | Pass | Examples explicitly prohibit student names, images, rosters, schedules, grades, and identifiable work. |
| Credentials and secrets | Pass | Templates prohibit passwords, MFA backup codes, recovery answers, API keys, tokens, and live secrets. |
| Personal safety | Pass | Identity, doxxing, and profile activities require sanitized summaries and private maps. |
| Incident handling | Pass | Lessons direct active threats, harassment, compromise, and student exposure toward escalation rather than classroom troubleshooting. |
| Public publishing | Pass | Website, repo, domain, and source activities require review before sharing. |
| AI/tool sharing | Pass | Activities warn against pasting private data into AI tools or shared documents. |

## Required Ongoing Review

- Re-run this review when any OTS-280 chapter receives new examples, screenshots, templates, or source panels.
- Keep completed private templates out of the repo.
- Use fictional scenarios for practice tasks.
- For route verification, confirm that rendered pages do not expose private sample data or encourage teachers to submit private inventories.
