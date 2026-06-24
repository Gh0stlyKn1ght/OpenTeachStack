# Educator Learner Audit Remediation

Date: 2026-06-24

This remediation responds to `docs/EDUCATOR_LEARNER_AUDIT.md`.

## What Changed

- Ran a full course-completion pass across all 369 course lesson files.
- Replaced the repeated generated shell (`This lesson helps...`, `Applied to...`, `Use this three-step workflow...`) with a learner-facing structure: why it matters, classroom scenario, key idea, lesson move, artifact build, good-work example, quality check, and reflection.
- Added lesson-specific before/during/after moves so chapter sections do not collapse into near-duplicates.
- Replaced generated-feeling lesson bodies in the P0/P1 target courses with teacher-facing lesson sections that include purpose, teacher problem, plain-language concept, classroom example, artifact starter, section-specific teaching notes, checkpoint, and reflection.
- Marked remediated lesson files as `migrationStatus: authored`.
- Removed visible generated/scaffolded lesson status from released course content.
- Rewrote OTS-320 sections that were already marked authored but still repeated safety boilerplate.
- Added concrete examples to the remaining OTS-101 uniqueness collisions:
  - lesson-plan prompts vs student-facing direction prompts
  - essential questions vs lesson sequence
  - formative checks vs feedback loops vs revision opportunities
- Added `scripts/check-release-readiness.mjs`.
- Added `scripts/complete-course-lessons.mjs` and `npm run complete:courses` for the all-course completion pass.
- Expanded `scripts/check-learner-facing-content.mjs` to fail if generated course-shell phrases become visible again.
- Added `scripts/check-course-learner-sense.mjs` to catch course-level conceptual drift, such as site lessons inheriting cyber-safety framing.
- Wired `npm test` and `npm run verify:release` to include release-readiness checks.
- Added `scripts/remediate-educator-learner-audit.mjs` so the remediation is repeatable and inspectable.

## Current Content Status

After remediation, the content gates report:

| Course | Release-ready lessons | Generated/scaffolded lessons |
|---|---:|---:|
| OTS-101 | 89 | 0 |
| OTS-201 | 36 | 0 |
| OTS-220 | 31 | 0 |
| OTS-240 | 30 | 0 |
| OTS-260 | 30 | 0 |
| OTS-280 | 63 | 0 |
| OTS-301 | 30 | 0 |
| OTS-320 | 30 | 0 |
| OTS-399 | 30 | 0 |

## Verification

Passed:

- `npm run complete:courses`
- `npm run check:learner-facing-content`
- `npm run check:course-learner-sense`
- `npm run check:content-uniqueness`
- `npm run check:release-readiness`
- `npm run test`
- `npm run build`
- `npm run verify:release`

`docs/BUILD_VERIFICATION.md` has been refreshed with the release-readiness checks and production smoke results.

## Remaining Editorial Work

The P0 generated-content blocker is fixed. The next quality pass should be a visual and learner-flow review of the rendered course pages, with special attention to whether lesson-local examples should become reusable template downloads or KB-linked support articles.
