# OpenTeachStack Handoff Notes

Last Updated: 2026-07-13 (Claude Code session — OTS-201 authoring tranche)
Previous auto-generated update: 2026-07-13T23:33:13.571Z (conversation f931b108)

> Note: `archive-chats.mjs` regenerates this file from Antigravity brain
> transcripts. This session ran in Claude Code, so this update was written
> manually. If the archiver overwrites it, this same summary lives in the
> draft package itself: `.generated/drafts/ots-201-lesson-body-pass-01/notes.md`.

## Latest Accomplishments (this session)

- Authored the complete OTS-201 real content tranche as a promotion-ready
  draft in `.generated/drafts/ots-201-lesson-body-pass-01/` — **57 files**:
  - All **36 lesson bodies** (Chapters 01–06), each following the full
    VOICEPRINT lesson shape (teacher problem → idea → scenario → weak/better
    → build step → quality check → safety note → reflection → capstone
    connection), `migrationStatus: draft`.
  - **8 templates** rewritten from 6–10 line stubs into usable teacher
    documents, including a NEW `workspace-workflow-audit-template.md`
    (Ch 01 had no template; scaffolds mispointed at the command-center one).
  - **5 examples** rebuilt Workspace-specific around one fictional teacher
    (Ms. Vega): weak/strong audit pair, completed command center, model
    peer-review revision note.
  - **8 READMEs**, including an honest `labs/README.md` stating OTS-201
    deliberately has no separate labs (build tasks live in lessons x-4 and
    the Ch 06 studio).
  - `draft.manifest.json` with 57 targetPaths, `promotion.allowed: false`,
    and blockers listed; `notes.md` with scope, batch history, and a
    reviewer verification list for Google-behavior/policy claims.
- Verified: all 36 MDX compile clean (`@mdx-js/mdx`); manifest ↔ files
  cross-check 1:1; `verify-locks` passes (ots-000, ots-101 untouched);
  zero changes to tracked files. **The draft directory is gitignored** —
  it exists on disk only; do not conclude from git history that the work
  was not done.

## Why it was done this way

- OTS-000 and OTS-101 are locked + human-reviewed, satisfying the pathway
  boundary; OTS-201 is the next course. Production OTS-201 lessons are
  generated scaffolds (some contain a literal unexpanded `${richContent}`
  placeholder), and OTS-201 is lock-protected for lesson-body changes, so
  all authoring went to `.generated/drafts` per the course lock rule.

## Pending — human-gated (in order)

1. Review all 57 draft files against `VOICEPRINT.md` and
   `docs/LESSON_QUALITY_RUBRIC.md`. The reviewer checklist in the draft's
   `notes.md` flags specific claims to verify: Drive version-history
   retention, shared-drive roles, Slides theme inheritance, Forms/Calendar
   district-config behavior, accessibility floors, and the
   mandatory-reporting wording in lesson 05-2.
2. Source Bank pass for `content/courses/ots-201/references/` — official
   Google Help links, verified live (deliberately not authored from memory).
3. Packetize OTS-201 (`course.packet.json`) — note
   `EXPECTED_PACKETIZED_COURSE_SLUGS` in `scripts/lib/course-registry.mjs`
   currently lists only ots-000/ots-101 and may need updating.
4. Explicit unlock of OTS-201 (`scripts/curriculum/unlock-course.mjs`),
   then `promote-course-draft.mjs --course ots-201 --draft
   ots-201-lesson-body-pass-01` (dry-run first), re-lock after.
5. After promotion: truth review of ots-201 `course.json`/`status.json`;
   `docs/`, `exports/`, `assets/`, top-level README still untouched.

## Pending — carried from previous session

- Review OTS-101 lesson bodies and locks in status.json.
- Import the generated ots-101-teachable-import-package.zip directly into
  Teachable for verification.
