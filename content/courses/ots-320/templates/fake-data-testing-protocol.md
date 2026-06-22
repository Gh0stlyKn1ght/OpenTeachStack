# OTS-320 Fake-Data Testing Protocol

Use fake data for every agent-built classroom tool until the teacher, district policy, and technical review all allow something more specific.

## Fake Data Requirements

- Use fictional names, emails, classes, grades, assignments, and schedules.
- Avoid examples that could be mistaken for real students or real incidents.
- Keep answer keys, assessment items, private staff notes, and account details out of prompts and tests.
- Store fake examples inside the course folder only when they are safe to publish or migrate.

## Test Plan

For each tool path, write:

- Fake input:
- Expected output:
- What should not happen:
- Privacy risk checked:
- Accessibility or usability check:
- Result:

## Required Scenarios

- [ ] Normal use with complete fake data
- [ ] Empty or missing data
- [ ] Duplicate data
- [ ] Unexpected formatting
- [ ] Long text or narrow mobile view when the tool has a UI
- [ ] Export, save, or copy behavior when the tool creates files or text

## Approval Rule

Do not move from fake data to real classroom use until privacy review, route/tool probes, and lint/build or equivalent project checks are complete.
