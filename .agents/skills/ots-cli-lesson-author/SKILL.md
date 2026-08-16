---
name: ots-cli-lesson-author
description: Author real OTS-320 teacher-facing CLI lessons from verified technical behavior, avoiding scaffold prose and generic activity templates.
---

# OTS CLI Lesson Author

Use this skill only after the relevant technical behavior has been verified.

Read first:

- `VOICEPRINT.md`
- `docs/architecture/OTS_320_PHASE1_COURSE_CONTRACT_2026-08-15.md`
- `docs/architecture/ots-320-official-sources.json`

Use `ots-official-docs` and `ots-cli-verifier` for technical claims and executable snippets.

## Lesson quality standard

A lesson must teach a mechanism before asking the learner to perform an activity.

A real OTS-320 lesson should normally contain:

1. Teacher problem
2. Mental model
3. Observed behavior
4. What happened
5. Weak or unsafe version when useful
6. Better bounded version
7. Build step
8. Verification
9. Safety / privacy / source note when relevant
10. Decision or reflection
11. Artifact connection

The exact visual structure may vary. Do not mechanically repeat the same headings in every lesson.

## Reject these patterns

Do not author or promote a lesson that is mostly:

- `Do This`
- `Save Evidence`
- `Reflection`
- generic checklist prose
- unexplained command blocks
- `${richContent}` or another placeholder
- a copied vendor manual
- a product feature list without a durable systems concept

## Terminal transcript labels

Every transcript must be classifiable as one of:

- `documented`
- `captured`
- `emulated`

Never fabricate output and present it as captured.

## Pedagogy rule

The provider is the case study. The durable concept is the lesson.

## No bulk generation

Author the smallest complete lesson set needed for the active chapter. Do not generate the whole course to satisfy route coverage.

## CI boundary

Course-quality checks may be part of the repository CI command suite. Do not implement them as GitHub Actions or Vercel checks unless the user later explicitly changes that boundary.
