# Format Readability Audit

Generated: 2026-06-29T00:37:58.198Z

## Summary

- Files reviewed: 425
- Files passing: 376
- Files needing formatting review: 49
- Strict lesson failures: 45
- Support-file warnings: 4
- Blog formatting warnings: 0

## Lesson type counts

- artifact-build: 9
- capstone-assembly: 1
- case-study: 2
- chapter-overview: 24
- checkpoint: 25
- comparison: 15
- concept: 36
- framework: 9
- unknown: 15
- workflow: 8

## Unknown lessonType files

- content/courses/ots-000/lessons/00-welcome-teacher-builder-stack/00-4.mdx
- content/courses/ots-000/lessons/01-builder-workstation/01-4.mdx
- content/courses/ots-000/lessons/02-files-folders-project-structure/02-4.mdx
- content/courses/ots-000/lessons/03-what-is-an-ide/03-4.mdx
- content/courses/ots-000/lessons/05-terminal-without-fear/05-4.mdx
- content/courses/ots-000/lessons/06-git-github-basics/06-4.mdx
- content/courses/ots-000/lessons/07-documentation-literacy/07-4.mdx
- content/courses/ots-000/lessons/08-markdown-mdx-content-files/08-4.mdx
- content/courses/ots-000/lessons/09-websites-hosting-publishing/09-4.mdx
- content/courses/ots-000/lessons/10-modern-project-stack/10-4.mdx
- content/courses/ots-000/lessons/11-ai-assistants-coding-agents-mcp/11-4.mdx
- content/courses/ots-000/lessons/12-safety-backups-secrets-permissions/12-4.mdx
- content/courses/ots-000/lessons/13-teacher-builder-starter-kit/13-2.mdx
- content/courses/ots-000/lessons/13-teacher-builder-starter-kit/13-3.mdx
- content/courses/ots-000/lessons/13-teacher-builder-starter-kit/13-4.mdx

## Repeated formatting problems

- no bullet or numbered lists: 31
- unknown lessonType; human review required: 15
- 6 consecutive plain paragraph blocks: 2
- weak/better comparison without a table: 1
- support file appears to list items without bullets: 1
- support file longer than 150 words without headings: 1
- 5 consecutive plain paragraph blocks: 1

## Recommended first remediation tranche

- 1. Review unknown lessonType files first; add explicit frontmatter or decide they are support files.
- 2. Remediate OTS-101 chapter-overview and checkpoint files for scanability, because they frame each chapter and learner progress.
- 3. Remediate artifact-build files next, because they carry the reusable course artifacts.
- 4. Then clean comparison/workflow/case-study files where the report asks for tables, numbered steps, or review gates.
- 5. Finally, add spacing/scannable blocks to blog posts without forcing every post into the same template.

## Priority fixes

- content/courses/ots-101/lessons/02-standards-goals-to-lessons/02-0.mdx: 5 consecutive plain paragraph blocks

## Strict lesson failures

- content/courses/ots-000/lessons/00-welcome-teacher-builder-stack/00-0.mdx (chapter-overview): no bullet or numbered lists
- content/courses/ots-000/lessons/00-welcome-teacher-builder-stack/00-1.mdx (concept): no bullet or numbered lists
- content/courses/ots-000/lessons/00-welcome-teacher-builder-stack/00-4.mdx (unknown): unknown lessonType; human review required
- content/courses/ots-000/lessons/01-builder-workstation/01-1.mdx (comparison): no bullet or numbered lists
- content/courses/ots-000/lessons/01-builder-workstation/01-2.mdx (concept): no bullet or numbered lists
- content/courses/ots-000/lessons/01-builder-workstation/01-3.mdx (comparison): no bullet or numbered lists
- content/courses/ots-000/lessons/01-builder-workstation/01-4.mdx (unknown): unknown lessonType; human review required
- content/courses/ots-000/lessons/02-files-folders-project-structure/02-1.mdx (concept): no bullet or numbered lists
- content/courses/ots-000/lessons/02-files-folders-project-structure/02-3.mdx (concept): no bullet or numbered lists
- content/courses/ots-000/lessons/02-files-folders-project-structure/02-4.mdx (unknown): unknown lessonType; human review required
- content/courses/ots-000/lessons/03-what-is-an-ide/03-1.mdx (comparison): no bullet or numbered lists
- content/courses/ots-000/lessons/03-what-is-an-ide/03-3.mdx (concept): no bullet or numbered lists
- content/courses/ots-000/lessons/03-what-is-an-ide/03-4.mdx (unknown): unknown lessonType; human review required
- content/courses/ots-000/lessons/04-vscode-teacher-builders/04-1.mdx (concept): no bullet or numbered lists
- content/courses/ots-000/lessons/04-vscode-teacher-builders/04-4.mdx (comparison): weak/better comparison without a table
- content/courses/ots-000/lessons/05-terminal-without-fear/05-0.mdx (chapter-overview): no bullet or numbered lists
- content/courses/ots-000/lessons/05-terminal-without-fear/05-4.mdx (unknown): unknown lessonType; human review required
- content/courses/ots-000/lessons/06-git-github-basics/06-4.mdx (unknown): unknown lessonType; human review required
- content/courses/ots-000/lessons/07-documentation-literacy/07-0.mdx (chapter-overview): no bullet or numbered lists
- content/courses/ots-000/lessons/07-documentation-literacy/07-1.mdx (comparison): no bullet or numbered lists
- content/courses/ots-000/lessons/07-documentation-literacy/07-4.mdx (unknown): unknown lessonType; human review required
- content/courses/ots-000/lessons/08-markdown-mdx-content-files/08-0.mdx (chapter-overview): no bullet or numbered lists
- content/courses/ots-000/lessons/08-markdown-mdx-content-files/08-3.mdx (concept): no bullet or numbered lists
- content/courses/ots-000/lessons/08-markdown-mdx-content-files/08-4.mdx (unknown): unknown lessonType; human review required
- content/courses/ots-000/lessons/09-websites-hosting-publishing/09-0.mdx (chapter-overview): no bullet or numbered lists
- content/courses/ots-000/lessons/09-websites-hosting-publishing/09-2.mdx (comparison): no bullet or numbered lists
- content/courses/ots-000/lessons/09-websites-hosting-publishing/09-3.mdx (concept): no bullet or numbered lists
- content/courses/ots-000/lessons/09-websites-hosting-publishing/09-4.mdx (unknown): unknown lessonType; human review required
- content/courses/ots-000/lessons/10-modern-project-stack/10-0.mdx (chapter-overview): no bullet or numbered lists
- content/courses/ots-000/lessons/10-modern-project-stack/10-1.mdx (concept): no bullet or numbered lists
- content/courses/ots-000/lessons/10-modern-project-stack/10-2.mdx (concept): no bullet or numbered lists
- content/courses/ots-000/lessons/10-modern-project-stack/10-4.mdx (unknown): no bullet or numbered lists; unknown lessonType; human review required
- content/courses/ots-000/lessons/11-ai-assistants-coding-agents-mcp/11-0.mdx (chapter-overview): no bullet or numbered lists
- content/courses/ots-000/lessons/11-ai-assistants-coding-agents-mcp/11-1.mdx (comparison): no bullet or numbered lists
- content/courses/ots-000/lessons/11-ai-assistants-coding-agents-mcp/11-2.mdx (comparison): no bullet or numbered lists
- content/courses/ots-000/lessons/11-ai-assistants-coding-agents-mcp/11-3.mdx (concept): no bullet or numbered lists
- content/courses/ots-000/lessons/11-ai-assistants-coding-agents-mcp/11-4.mdx (unknown): unknown lessonType; human review required
- content/courses/ots-000/lessons/12-safety-backups-secrets-permissions/12-0.mdx (chapter-overview): no bullet or numbered lists
- content/courses/ots-000/lessons/12-safety-backups-secrets-permissions/12-3.mdx (concept): no bullet or numbered lists
- content/courses/ots-000/lessons/12-safety-backups-secrets-permissions/12-4.mdx (unknown): no bullet or numbered lists; unknown lessonType; human review required
- content/courses/ots-000/lessons/13-teacher-builder-starter-kit/13-1.mdx (concept): no bullet or numbered lists
- content/courses/ots-000/lessons/13-teacher-builder-starter-kit/13-2.mdx (unknown): no bullet or numbered lists; unknown lessonType; human review required
- content/courses/ots-000/lessons/13-teacher-builder-starter-kit/13-3.mdx (unknown): unknown lessonType; human review required
- content/courses/ots-000/lessons/13-teacher-builder-starter-kit/13-4.mdx (unknown): unknown lessonType; human review required
- content/courses/ots-101/lessons/02-standards-goals-to-lessons/02-0.mdx (chapter-overview): 5 consecutive plain paragraph blocks

## Support-file warnings

- content/courses/ots-000/templates/teacher-builder-starter-kit.md: support file appears to list items without bullets
- content/courses/ots-101/README.md: 6 consecutive plain paragraph blocks
- content/courses/ots-101/examples/README.md: support file longer than 150 words without headings
- content/courses/ots-101/lessons/README.md: 6 consecutive plain paragraph blocks

## Blog formatting warnings

- None

## Files passing

- content/blog/authors/jc.md
- content/blog/posts/batch-the-polish-or-the-course-never-gets-better.md
- content/blog/posts/codex-is-a-repo-engineer-not-a-course-writer-by-default.md
- content/blog/posts/coming-soon-is-better-than-fake-progress.md
- content/blog/posts/format-audits-should-protect-voice-not-flatten-it.md
- content/blog/posts/formatting-is-instruction.md
- content/blog/posts/instructional-depth-is-not-a-render-check.md
- content/blog/posts/source-of-truth-vs-export-target.md
- content/blog/posts/stale-tabs-dead-routes-source-truth-cleanup.md
- content/blog/posts/the-fake-course-trap.md
- content/blog/posts/welcome-to-openteachstack-field-notes.md
- content/blog/posts/when-visual-blocks-beat-mermaid.md
- content/blog/templates/author-blog-post-template.md
- content/courses/README.md
- content/courses/ots-000/README.md
- content/courses/ots-000/assets/README.md
- content/courses/ots-000/docs/ARTIFACT_MATRIX.md
- content/courses/ots-000/docs/DRAFT_REVIEW_NOTES.md
- content/courses/ots-000/docs/HUMAN_REVIEW_CHECKLIST.md
- content/courses/ots-000/docs/README.md
- content/courses/ots-000/docs/ROUTE_REVIEW_CHECKLIST.md
- content/courses/ots-000/examples/README.md
- content/courses/ots-000/examples/completed-teacher-builder-starter-kit.md
- content/courses/ots-000/labs/README.md
- content/courses/ots-000/lessons/00-welcome-teacher-builder-stack/00-2.mdx
- content/courses/ots-000/lessons/00-welcome-teacher-builder-stack/00-3.mdx
- content/courses/ots-000/lessons/00-welcome-teacher-builder-stack/00-5.mdx
- content/courses/ots-000/lessons/01-builder-workstation/01-0.mdx
- content/courses/ots-000/lessons/01-builder-workstation/01-5.mdx
- content/courses/ots-000/lessons/02-files-folders-project-structure/02-0.mdx
- content/courses/ots-000/lessons/02-files-folders-project-structure/02-2.mdx
- content/courses/ots-000/lessons/02-files-folders-project-structure/02-5.mdx
- content/courses/ots-000/lessons/03-what-is-an-ide/03-0.mdx
- content/courses/ots-000/lessons/03-what-is-an-ide/03-2.mdx
- content/courses/ots-000/lessons/03-what-is-an-ide/03-5.mdx
- content/courses/ots-000/lessons/04-vscode-teacher-builders/04-0.mdx
- content/courses/ots-000/lessons/04-vscode-teacher-builders/04-2.mdx
- content/courses/ots-000/lessons/04-vscode-teacher-builders/04-3.mdx
- content/courses/ots-000/lessons/04-vscode-teacher-builders/04-5.mdx
- content/courses/ots-000/lessons/05-terminal-without-fear/05-1.mdx
- content/courses/ots-000/lessons/05-terminal-without-fear/05-2.mdx
- content/courses/ots-000/lessons/05-terminal-without-fear/05-3.mdx
- content/courses/ots-000/lessons/05-terminal-without-fear/05-5.mdx
- content/courses/ots-000/lessons/06-git-github-basics/06-0.mdx
- content/courses/ots-000/lessons/06-git-github-basics/06-1.mdx
- content/courses/ots-000/lessons/06-git-github-basics/06-2.mdx
- content/courses/ots-000/lessons/06-git-github-basics/06-3.mdx
- content/courses/ots-000/lessons/06-git-github-basics/06-5.mdx
- content/courses/ots-000/lessons/07-documentation-literacy/07-2.mdx
- content/courses/ots-000/lessons/07-documentation-literacy/07-3.mdx
- content/courses/ots-000/lessons/07-documentation-literacy/07-5.mdx
- content/courses/ots-000/lessons/08-markdown-mdx-content-files/08-1.mdx
- content/courses/ots-000/lessons/08-markdown-mdx-content-files/08-2.mdx
- content/courses/ots-000/lessons/08-markdown-mdx-content-files/08-5.mdx
- content/courses/ots-000/lessons/09-websites-hosting-publishing/09-1.mdx
- content/courses/ots-000/lessons/09-websites-hosting-publishing/09-5.mdx
- content/courses/ots-000/lessons/10-modern-project-stack/10-3.mdx
- content/courses/ots-000/lessons/10-modern-project-stack/10-5.mdx
- content/courses/ots-000/lessons/11-ai-assistants-coding-agents-mcp/11-5.mdx
- content/courses/ots-000/lessons/12-safety-backups-secrets-permissions/12-1.mdx
- content/courses/ots-000/lessons/12-safety-backups-secrets-permissions/12-2.mdx
- content/courses/ots-000/lessons/12-safety-backups-secrets-permissions/12-5.mdx
- content/courses/ots-000/lessons/13-teacher-builder-starter-kit/13-0.mdx
- content/courses/ots-000/lessons/13-teacher-builder-starter-kit/13-5.mdx
- content/courses/ots-000/lessons/README.md
- content/courses/ots-000/references/README.md
- content/courses/ots-000/references/source-references.md
- content/courses/ots-000/templates/README.md
- content/courses/ots-000/templates/ai-mcp-access-map.md
- content/courses/ots-000/templates/builder-workstation-checklist.md
- content/courses/ots-000/templates/documentation-evaluation-checklist.md
- content/courses/ots-000/templates/safe-ai-builder-checklist.md
- content/courses/ots-101/assets/README.md
- content/courses/ots-101/docs/OTS_000_TO_OTS_101_ALIGNMENT.md
- content/courses/ots-101/docs/OTS_101_ACCESSIBILITY_RELEASE_CHECK.md
- content/courses/ots-101/docs/OTS_101_BROWSER_ACCESSIBILITY_AUDIT.md
- content/courses/ots-101/docs/OTS_101_CURRICULUM_MANAGER_AUDIT.md
- content/courses/ots-101/docs/README.md
- content/courses/ots-101/examples/completed-artifact.md
- content/courses/ots-101/examples/reviewer-notes.md
- content/courses/ots-101/examples/robotics-safety-mini-course-packet.md
- content/courses/ots-101/examples/strong-version.md
- content/courses/ots-101/examples/weak-version.md
- content/courses/ots-101/exports/teachable/README.md
- content/courses/ots-101/labs/README.md
- content/courses/ots-101/lessons/01-curriculum-vs-course-content/01-0.mdx
- content/courses/ots-101/lessons/01-curriculum-vs-course-content/01-1.mdx
- content/courses/ots-101/lessons/01-curriculum-vs-course-content/01-2.mdx
- content/courses/ots-101/lessons/01-curriculum-vs-course-content/01-3.mdx
- content/courses/ots-101/lessons/01-curriculum-vs-course-content/01-4.mdx
- content/courses/ots-101/lessons/01-curriculum-vs-course-content/01-5.mdx
- content/courses/ots-101/lessons/01-curriculum-vs-course-content/README.md
- content/courses/ots-101/lessons/02-standards-goals-to-lessons/02-1.mdx
- content/courses/ots-101/lessons/02-standards-goals-to-lessons/02-2.mdx
- content/courses/ots-101/lessons/02-standards-goals-to-lessons/02-3.mdx
- content/courses/ots-101/lessons/02-standards-goals-to-lessons/02-4.mdx
- content/courses/ots-101/lessons/02-standards-goals-to-lessons/02-5.mdx
- content/courses/ots-101/lessons/02-standards-goals-to-lessons/README.md
- content/courses/ots-101/lessons/03-prompting-without-garbage/03-0.mdx
- content/courses/ots-101/lessons/03-prompting-without-garbage/03-1.mdx
- content/courses/ots-101/lessons/03-prompting-without-garbage/03-2.mdx
- content/courses/ots-101/lessons/03-prompting-without-garbage/03-3.mdx
- content/courses/ots-101/lessons/03-prompting-without-garbage/03-4.mdx
- content/courses/ots-101/lessons/03-prompting-without-garbage/03-5.mdx
- content/courses/ots-101/lessons/04-verify-ai-before-students/04-0.mdx
- content/courses/ots-101/lessons/04-verify-ai-before-students/04-1.mdx
- content/courses/ots-101/lessons/04-verify-ai-before-students/04-2.mdx
- content/courses/ots-101/lessons/04-verify-ai-before-students/04-3.mdx
- content/courses/ots-101/lessons/04-verify-ai-before-students/04-4.mdx
- content/courses/ots-101/lessons/04-verify-ai-before-students/04-5.mdx
- content/courses/ots-101/lessons/05-student-facing-lessons/05-0.mdx
- content/courses/ots-101/lessons/05-student-facing-lessons/05-1.mdx
- content/courses/ots-101/lessons/05-student-facing-lessons/05-2.mdx
- content/courses/ots-101/lessons/05-student-facing-lessons/05-3.mdx
- content/courses/ots-101/lessons/05-student-facing-lessons/05-4.mdx
- content/courses/ots-101/lessons/05-student-facing-lessons/05-5.mdx
- content/courses/ots-101/lessons/06-assignments-labs-rubrics-feedback/06-0.mdx
- content/courses/ots-101/lessons/06-assignments-labs-rubrics-feedback/06-1.mdx
- content/courses/ots-101/lessons/06-assignments-labs-rubrics-feedback/06-2.mdx
- content/courses/ots-101/lessons/06-assignments-labs-rubrics-feedback/06-3.mdx
- content/courses/ots-101/lessons/06-assignments-labs-rubrics-feedback/06-4.mdx
- content/courses/ots-101/lessons/06-assignments-labs-rubrics-feedback/06-5.mdx
- content/courses/ots-101/lessons/07-organizing-course-content-system/07-0.mdx
- content/courses/ots-101/lessons/07-organizing-course-content-system/07-1.mdx
- content/courses/ots-101/lessons/07-organizing-course-content-system/07-2.mdx
- content/courses/ots-101/lessons/07-organizing-course-content-system/07-3.mdx
- content/courses/ots-101/lessons/07-organizing-course-content-system/07-4.mdx
- content/courses/ots-101/lessons/07-organizing-course-content-system/07-5.mdx
- content/courses/ots-101/lessons/08-safety-accessibility-copyright-source-quality/08-0.mdx
- content/courses/ots-101/lessons/08-safety-accessibility-copyright-source-quality/08-1.mdx
- content/courses/ots-101/lessons/08-safety-accessibility-copyright-source-quality/08-2.mdx
- content/courses/ots-101/lessons/08-safety-accessibility-copyright-source-quality/08-3.mdx
- content/courses/ots-101/lessons/08-safety-accessibility-copyright-source-quality/08-4.mdx
- content/courses/ots-101/lessons/08-safety-accessibility-copyright-source-quality/08-5.mdx
- content/courses/ots-101/lessons/09-publishing-to-platform/09-0.mdx
- content/courses/ots-101/lessons/09-publishing-to-platform/09-1.mdx
- content/courses/ots-101/lessons/09-publishing-to-platform/09-2.mdx
- content/courses/ots-101/lessons/09-publishing-to-platform/09-3.mdx
- content/courses/ots-101/lessons/09-publishing-to-platform/09-4.mdx
- content/courses/ots-101/lessons/09-publishing-to-platform/09-5.mdx
- content/courses/ots-101/lessons/10-mini-course-content-packet/10-0.mdx
- content/courses/ots-101/lessons/10-mini-course-content-packet/10-1.mdx
- content/courses/ots-101/lessons/10-mini-course-content-packet/10-2.mdx
- content/courses/ots-101/lessons/10-mini-course-content-packet/10-3.mdx
- content/courses/ots-101/lessons/10-mini-course-content-packet/10-4.mdx
- content/courses/ots-101/lessons/10-mini-course-content-packet/10-5.mdx
- content/courses/ots-101/references/README.md
- content/courses/ots-101/templates/README.md
- content/courses/ots-101/templates/ai-course-content-prompt.md
- content/courses/ots-101/templates/ai-output-verification-checklist.md
- content/courses/ots-101/templates/assignment-rubric-packet.md
- content/courses/ots-101/templates/content-safety-review.md
- content/courses/ots-101/templates/course-content-folder-map.md
- content/courses/ots-101/templates/course-content-inventory.md
- content/courses/ots-101/templates/course-truth-audit.md
- content/courses/ots-101/templates/curriculum-course-content-map.md
- content/courses/ots-101/templates/learning-target-lesson-map.md
- content/courses/ots-101/templates/mini-course-content-packet.md
- content/courses/ots-101/templates/publishing-checklist.md
- content/courses/ots-101/templates/revision-log.md
- content/courses/ots-101/templates/student-facing-lesson-page.md
- content/courses/ots-201/README.md
- content/courses/ots-201/assets/README.md
- content/courses/ots-201/docs/OTS_201_COURSE_OUTLINE.md
- content/courses/ots-201/docs/README.md
- content/courses/ots-201/examples/README.md
- content/courses/ots-201/examples/completed-artifact.md
- content/courses/ots-201/examples/reviewer-notes.md
- content/courses/ots-201/examples/strong-version.md
- content/courses/ots-201/examples/weak-version.md
- content/courses/ots-201/exports/teachable/README.md
- content/courses/ots-201/labs/README.md
- content/courses/ots-201/lessons/01-workspace-system-mindset/README.md
- content/courses/ots-201/lessons/02-drive-architecture/README.md
- content/courses/ots-201/lessons/03-docs-slides-delivery/README.md
- content/courses/ots-201/lessons/04-sheets-curriculum-trackers/README.md
- content/courses/ots-201/lessons/05-forms-calendar-operations/README.md
- content/courses/ots-201/lessons/06-workspace-command-center/README.md
- content/courses/ots-201/lessons/README.md
- content/courses/ots-201/references/README.md
- content/courses/ots-201/templates/README.md
- content/courses/ots-201/templates/command-center-review-template.md
- content/courses/ots-201/templates/curriculum-tracker-template.md
- content/courses/ots-201/templates/delivery-template-framework.md
- content/courses/ots-201/templates/drive-architecture-template.md
- content/courses/ots-201/templates/forms-calendar-ops-template.md
- content/courses/ots-201/templates/workspace-command-center-scope-template.md
- content/courses/ots-220/README.md
- content/courses/ots-220/assets/README.md
- content/courses/ots-220/docs/OTS_220_COURSE_OUTLINE.md
- content/courses/ots-220/docs/README.md
- content/courses/ots-220/examples/README.md
- content/courses/ots-220/examples/completed-artifact.md
- content/courses/ots-220/examples/reviewer-notes.md
- content/courses/ots-220/examples/strong-version.md
- content/courses/ots-220/examples/weak-version.md
- content/courses/ots-220/exports/teachable/README.md
- content/courses/ots-220/labs/README.md
- content/courses/ots-220/labs/create-google-form-quizzes-from-sheet.mdx
- content/courses/ots-220/labs/generate-docs-from-sheet-rows.mdx
- content/courses/ots-220/labs/generate-unit-folders-with-apps-script.mdx
- content/courses/ots-220/labs/send-reminder-emails-from-sheet.mdx
- content/courses/ots-220/labs/your-first-apps-script-custom-menu.mdx
- content/courses/ots-220/lessons/01-automation-mindset/README.md
- content/courses/ots-220/lessons/02-apps-script-basics/README.md
- content/courses/ots-220/lessons/03-folder-file-generators/README.md
- content/courses/ots-220/lessons/04-docs-from-sheet-rows/README.md
- content/courses/ots-220/lessons/05-forms-email-reminders/README.md
- content/courses/ots-220/lessons/06-teacher-automation-toolkit/README.md
- content/courses/ots-220/lessons/README.md
- content/courses/ots-220/references/README.md
- content/courses/ots-220/templates/README.md
- content/courses/ots-220/templates/automation-candidate-template.md
- content/courses/ots-220/templates/automation-toolkit-release-checklist.md
- content/courses/ots-220/templates/custom-menu-template.md
- content/courses/ots-220/templates/doc-generation-template.md
- content/courses/ots-220/templates/folder-generator-worksheet.md
- content/courses/ots-220/templates/reminder-automation-safety-checklist.md
- content/courses/ots-240/README.md
- content/courses/ots-240/assets/README.md
- content/courses/ots-240/docs/OTS_240_COURSE_OUTLINE.md
- content/courses/ots-240/docs/README.md
- content/courses/ots-240/examples/README.md
- content/courses/ots-240/examples/completed-artifact.md
- content/courses/ots-240/examples/reviewer-notes.md
- content/courses/ots-240/examples/strong-version.md
- content/courses/ots-240/examples/weak-version.md
- content/courses/ots-240/exports/teachable/README.md
- content/courses/ots-240/labs/README.md
- content/courses/ots-240/lessons/01-open-resource-mindset/README.md
- content/courses/ots-240/lessons/02-github-foundations/README.md
- content/courses/ots-240/lessons/03-writing-readmes/README.md
- content/courses/ots-240/lessons/04-contribution-review/README.md
- content/courses/ots-240/lessons/05-publishing-attribution/README.md
- content/courses/ots-240/lessons/06-open-curriculum-repository/README.md
- content/courses/ots-240/lessons/README.md
- content/courses/ots-240/references/README.md
- content/courses/ots-240/references/source-bank-queue.md
- content/courses/ots-240/templates/README.md
- content/courses/ots-240/templates/contribution-review-checklist.md
- content/courses/ots-240/templates/course-readme-template.md
- content/courses/ots-240/templates/github-repo-readiness-checklist.md
- content/courses/ots-240/templates/open-resource-decision-log-template.md
- content/courses/ots-240/templates/publishing-attribution-license-template.md
- content/courses/ots-240/templates/repository-release-checklist.md
- content/courses/ots-260/README.md
- content/courses/ots-260/assets/README.md
- content/courses/ots-260/docs/OTS_260_ACCESSIBILITY_CHECKLIST.md
- content/courses/ots-260/docs/OTS_260_COURSE_OUTLINE.md
- content/courses/ots-260/docs/OTS_260_READABILITY_PASS.md
- content/courses/ots-260/docs/OTS_260_SOURCE_REFERENCES.md
- content/courses/ots-260/docs/OTS_260_VISUAL_STYLE_GUIDE_TEMPLATE.md
- content/courses/ots-260/docs/README.md
- content/courses/ots-260/examples/README.md
- content/courses/ots-260/examples/completed-artifact.md
- content/courses/ots-260/examples/reviewer-notes.md
- content/courses/ots-260/examples/strong-version.md
- content/courses/ots-260/examples/weak-version.md
- content/courses/ots-260/exports/teachable/README.md
- content/courses/ots-260/labs/README.md
- content/courses/ots-260/lessons/01-media-with-purpose/README.md
- content/courses/ots-260/lessons/02-ai-image-workflows/README.md
- content/courses/ots-260/lessons/03-diagrams-visual-explanations/README.md
- content/courses/ots-260/lessons/04-slides-delivery-routines/README.md
- content/courses/ots-260/lessons/05-short-video-screen-recording/README.md
- content/courses/ots-260/lessons/06-accessible-media-packet/README.md
- content/courses/ots-260/lessons/README.md
- content/courses/ots-260/references/README.md
- content/courses/ots-260/templates/README.md
- content/courses/ots-280/README.md
- content/courses/ots-280/assets/README.md
- content/courses/ots-280/docs/OTS_280_COURSE_OUTLINE.md
- content/courses/ots-280/docs/OTS_280_PRIVACY_REVIEW.md
- content/courses/ots-280/docs/OTS_280_PRIVATE_USE_TEMPLATES.md
- content/courses/ots-280/docs/OTS_280_SOURCE_REFERENCES_AND_ESCALATION.md
- content/courses/ots-280/docs/README.md
- content/courses/ots-280/examples/README.md
- content/courses/ots-280/examples/completed-artifact.md
- content/courses/ots-280/examples/reviewer-notes.md
- content/courses/ots-280/examples/strong-version.md
- content/courses/ots-280/examples/weak-version.md
- content/courses/ots-280/exports/teachable/README.md
- content/courses/ots-280/labs/README.md
- content/courses/ots-280/lessons/01-teacher-threat-model/README.md
- content/courses/ots-280/lessons/02-account-hygiene-mfa/README.md
- content/courses/ots-280/lessons/03-usernames-identity-separation/README.md
- content/courses/ots-280/lessons/04-email-phishing-impersonation/README.md
- content/courses/ots-280/lessons/05-social-media-doxxing/README.md
- content/courses/ots-280/lessons/06-vpns-wifi-location/README.md
- content/courses/ots-280/lessons/07-browser-device-file-safety/README.md
- content/courses/ots-280/lessons/08-website-safety/README.md
- content/courses/ots-280/lessons/09-github-domains-repos/README.md
- content/courses/ots-280/lessons/10-incident-response/README.md
- content/courses/ots-280/lessons/README.md
- content/courses/ots-280/references/README.md
- content/courses/ots-280/templates/README.md
- content/courses/ots-301/README.md
- content/courses/ots-301/assets/README.md
- content/courses/ots-301/docs/OTS_301_COURSE_HUB_SITEMAP_TEMPLATE.md
- content/courses/ots-301/docs/OTS_301_COURSE_OUTLINE.md
- content/courses/ots-301/docs/OTS_301_LIVE_SITE_REVIEW.md
- content/courses/ots-301/docs/OTS_301_SAFE_DOMAIN_EXAMPLES.md
- content/courses/ots-301/docs/OTS_301_SOURCE_REFERENCES.md
- content/courses/ots-301/docs/README.md
- content/courses/ots-301/examples/README.md
- content/courses/ots-301/examples/completed-artifact.md
- content/courses/ots-301/examples/reviewer-notes.md
- content/courses/ots-301/examples/strong-version.md
- content/courses/ots-301/examples/weak-version.md
- content/courses/ots-301/exports/teachable/README.md
- content/courses/ots-301/labs/README.md
- content/courses/ots-301/lessons/01-course-site-strategy/README.md
- content/courses/ots-301/lessons/02-web-basics/README.md
- content/courses/ots-301/lessons/03-course-hub-structure/README.md
- content/courses/ots-301/lessons/04-accessibility-safety/README.md
- content/courses/ots-301/lessons/05-deployment-maintenance/README.md
- content/courses/ots-301/lessons/06-published-course-hub/README.md
- content/courses/ots-301/lessons/README.md
- content/courses/ots-301/references/README.md
- content/courses/ots-301/templates/README.md
- content/courses/ots-301/templates/course-hub-sitemap-template.md
- content/courses/ots-320/README.md
- content/courses/ots-320/assets/README.md
- content/courses/ots-320/docs/OTS_320_AGENT_ARTIFACTS.md
- content/courses/ots-320/docs/OTS_320_COURSE_OUTLINE.md
- content/courses/ots-320/docs/README.md
- content/courses/ots-320/docs/privacy-accessibility-safety-review.md
- content/courses/ots-320/examples/README.md
- content/courses/ots-320/examples/completed-artifact.md
- content/courses/ots-320/examples/reviewer-notes.md
- content/courses/ots-320/examples/strong-version.md
- content/courses/ots-320/examples/weak-version.md
- content/courses/ots-320/exports/teachable/README.md
- content/courses/ots-320/labs/README.md
- content/courses/ots-320/lessons/01-agent-safety-mindset/README.md
- content/courses/ots-320/lessons/02-repo-branch-workflow/README.md
- content/courses/ots-320/lessons/03-prompting-coding-agents/README.md
- content/courses/ots-320/lessons/04-testing-verification/README.md
- content/courses/ots-320/lessons/05-building-teacher-tools/README.md
- content/courses/ots-320/lessons/06-reviewed-agent-build/README.md
- content/courses/ots-320/lessons/README.md
- content/courses/ots-320/references/README.md
- content/courses/ots-320/references/source-references.md
- content/courses/ots-320/templates/README.md
- content/courses/ots-320/templates/diff-review-checklist.md
- content/courses/ots-320/templates/fake-data-testing-protocol.md
- content/courses/ots-320/templates/safe-agent-prompt-template.md
- content/courses/ots-399/README.md
- content/courses/ots-399/assets/README.md
- content/courses/ots-399/docs/OTS_399_CAPSTONE_ARTIFACTS.md
- content/courses/ots-399/docs/OTS_399_COURSE_OUTLINE.md
- content/courses/ots-399/docs/README.md
- content/courses/ots-399/docs/pathway-traceability-check.md
- content/courses/ots-399/docs/privacy-accessibility-safety-review.md
- content/courses/ots-399/examples/README.md
- content/courses/ots-399/examples/completed-artifact.md
- content/courses/ots-399/examples/reviewer-notes.md
- content/courses/ots-399/examples/strong-version.md
- content/courses/ots-399/examples/weak-version.md
- content/courses/ots-399/exports/teachable/README.md
- content/courses/ots-399/labs/README.md
- content/courses/ots-399/lessons/01-capstone-scope/README.md
- content/courses/ots-399/lessons/02-curriculum-system-assembly/README.md
- content/courses/ots-399/lessons/03-automation-tool-evidence/README.md
- content/courses/ots-399/lessons/04-publishing-safety-review/README.md
- content/courses/ots-399/lessons/05-presentation-peer-review/README.md
- content/courses/ots-399/lessons/06-published-curriculum-system/README.md
- content/courses/ots-399/lessons/README.md
- content/courses/ots-399/references/README.md
- content/courses/ots-399/references/source-references.md
- content/courses/ots-399/templates/README.md
- content/courses/ots-399/templates/artifact-index-template.md
- content/courses/ots-399/templates/capstone-proposal-template.md
- content/courses/ots-399/templates/final-release-checklist.md
- content/courses/ots-399/templates/peer-review-protocol.md
- content/courses/ots-399/templates/technical-evidence-log-template.md

## Files needing formatting

### content/courses/ots-000/lessons/00-welcome-teacher-builder-stack/00-0.mdx

Type: lesson (chapter-overview, inferred)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Chapter Purpose-style section could help, but it is not required for this lesson type.
- Optional: a What You Will Build-style section could help, but it is not required for this lesson type.
- Optional: a Lessons in This Chapter-style section could help, but it is not required for this lesson type.
- Optional: a Exit Criteria-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/00-welcome-teacher-builder-stack/00-1.mdx

Type: lesson (concept)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Common Misunderstanding-style section could help, but it is not required for this lesson type.
- Optional: a Quick Check-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/00-welcome-teacher-builder-stack/00-4.mdx

Type: lesson (unknown, inferred)

Problems:
- unknown lessonType; human review required

Recommended fixes:
- Add a supported lessonType frontmatter value before applying strict structure rules.

### content/courses/ots-000/lessons/01-builder-workstation/01-1.mdx

Type: lesson (comparison)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Side-by-Side Comparison-style section could help, but it is not required for this lesson type.
- Optional: a Decision Rule-style section could help, but it is not required for this lesson type.
- Optional: a Practice-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/01-builder-workstation/01-2.mdx

Type: lesson (concept)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Concrete Example-style section could help, but it is not required for this lesson type.
- Optional: a Common Misunderstanding-style section could help, but it is not required for this lesson type.
- Optional: a Quick Check-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/01-builder-workstation/01-3.mdx

Type: lesson (comparison)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Confusion-style section could help, but it is not required for this lesson type.
- Optional: a Side-by-Side Comparison-style section could help, but it is not required for this lesson type.
- Optional: a Practice-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/01-builder-workstation/01-4.mdx

Type: lesson (unknown, inferred)

Problems:
- unknown lessonType; human review required

Recommended fixes:
- Add a supported lessonType frontmatter value before applying strict structure rules.

### content/courses/ots-000/lessons/02-files-folders-project-structure/02-1.mdx

Type: lesson (concept)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Common Misunderstanding-style section could help, but it is not required for this lesson type.
- Optional: a Quick Check-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/02-files-folders-project-structure/02-3.mdx

Type: lesson (concept)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Concrete Example-style section could help, but it is not required for this lesson type.
- Optional: a Common Misunderstanding-style section could help, but it is not required for this lesson type.
- Optional: a Quick Check-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/02-files-folders-project-structure/02-4.mdx

Type: lesson (unknown, inferred)

Problems:
- unknown lessonType; human review required

Recommended fixes:
- Add a supported lessonType frontmatter value before applying strict structure rules.

### content/courses/ots-000/lessons/03-what-is-an-ide/03-1.mdx

Type: lesson (comparison)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Confusion-style section could help, but it is not required for this lesson type.
- Optional: a Side-by-Side Comparison-style section could help, but it is not required for this lesson type.
- Optional: a Decision Rule-style section could help, but it is not required for this lesson type.
- Optional: a Practice-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/03-what-is-an-ide/03-3.mdx

Type: lesson (concept)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Concrete Example-style section could help, but it is not required for this lesson type.
- Optional: a Common Misunderstanding-style section could help, but it is not required for this lesson type.
- Optional: a Quick Check-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/03-what-is-an-ide/03-4.mdx

Type: lesson (unknown, inferred)

Problems:
- unknown lessonType; human review required

Recommended fixes:
- Add a supported lessonType frontmatter value before applying strict structure rules.

### content/courses/ots-000/lessons/04-vscode-teacher-builders/04-1.mdx

Type: lesson (concept)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Concrete Example-style section could help, but it is not required for this lesson type.
- Optional: a Common Misunderstanding-style section could help, but it is not required for this lesson type.
- Optional: a Quick Check-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/04-vscode-teacher-builders/04-4.mdx

Type: lesson (comparison, inferred)

Problems:
- weak/better comparison without a table

Recommended fixes:
- Optional: a Confusion-style section could help, but it is not required for this lesson type.
- Optional: a Side-by-Side Comparison-style section could help, but it is not required for this lesson type.
- Optional: a Decision Rule-style section could help, but it is not required for this lesson type.
- Optional: a Practice-style section could help, but it is not required for this lesson type.
- Use a table when comparing weak and better examples.
- Revise structure using the comparison lesson-type rule instead of forcing Build Step everywhere.

### content/courses/ots-000/lessons/05-terminal-without-fear/05-0.mdx

Type: lesson (chapter-overview, inferred)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Chapter Purpose-style section could help, but it is not required for this lesson type.
- Optional: a What You Will Build-style section could help, but it is not required for this lesson type.
- Optional: a Lessons in This Chapter-style section could help, but it is not required for this lesson type.
- Optional: a Exit Criteria-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/05-terminal-without-fear/05-4.mdx

Type: lesson (unknown, inferred)

Problems:
- unknown lessonType; human review required

Recommended fixes:
- Add a supported lessonType frontmatter value before applying strict structure rules.

### content/courses/ots-000/lessons/06-git-github-basics/06-4.mdx

Type: lesson (unknown, inferred)

Problems:
- unknown lessonType; human review required

Recommended fixes:
- Add a supported lessonType frontmatter value before applying strict structure rules.

### content/courses/ots-000/lessons/07-documentation-literacy/07-0.mdx

Type: lesson (chapter-overview, inferred)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Chapter Purpose-style section could help, but it is not required for this lesson type.
- Optional: a What You Will Build-style section could help, but it is not required for this lesson type.
- Optional: a Lessons in This Chapter-style section could help, but it is not required for this lesson type.
- Optional: a Exit Criteria-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/07-documentation-literacy/07-1.mdx

Type: lesson (comparison)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Confusion-style section could help, but it is not required for this lesson type.
- Optional: a Side-by-Side Comparison-style section could help, but it is not required for this lesson type.
- Optional: a Decision Rule-style section could help, but it is not required for this lesson type.
- Optional: a Practice-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/07-documentation-literacy/07-4.mdx

Type: lesson (unknown, inferred)

Problems:
- unknown lessonType; human review required

Recommended fixes:
- Add a supported lessonType frontmatter value before applying strict structure rules.

### content/courses/ots-000/lessons/08-markdown-mdx-content-files/08-0.mdx

Type: lesson (chapter-overview, inferred)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a What You Will Build-style section could help, but it is not required for this lesson type.
- Optional: a Lessons in This Chapter-style section could help, but it is not required for this lesson type.
- Optional: a Exit Criteria-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/08-markdown-mdx-content-files/08-3.mdx

Type: lesson (concept)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Concrete Example-style section could help, but it is not required for this lesson type.
- Optional: a Common Misunderstanding-style section could help, but it is not required for this lesson type.
- Optional: a Quick Check-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/08-markdown-mdx-content-files/08-4.mdx

Type: lesson (unknown, inferred)

Problems:
- unknown lessonType; human review required

Recommended fixes:
- Add a supported lessonType frontmatter value before applying strict structure rules.

### content/courses/ots-000/lessons/09-websites-hosting-publishing/09-0.mdx

Type: lesson (chapter-overview, inferred)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Chapter Purpose-style section could help, but it is not required for this lesson type.
- Optional: a What You Will Build-style section could help, but it is not required for this lesson type.
- Optional: a Lessons in This Chapter-style section could help, but it is not required for this lesson type.
- Optional: a Exit Criteria-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/09-websites-hosting-publishing/09-2.mdx

Type: lesson (comparison)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Confusion-style section could help, but it is not required for this lesson type.
- Optional: a Decision Rule-style section could help, but it is not required for this lesson type.
- Optional: a Practice-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/09-websites-hosting-publishing/09-3.mdx

Type: lesson (concept)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Common Misunderstanding-style section could help, but it is not required for this lesson type.
- Optional: a Quick Check-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/09-websites-hosting-publishing/09-4.mdx

Type: lesson (unknown, inferred)

Problems:
- unknown lessonType; human review required

Recommended fixes:
- Add a supported lessonType frontmatter value before applying strict structure rules.

### content/courses/ots-000/lessons/10-modern-project-stack/10-0.mdx

Type: lesson (chapter-overview, inferred)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Chapter Purpose-style section could help, but it is not required for this lesson type.
- Optional: a What You Will Build-style section could help, but it is not required for this lesson type.
- Optional: a Lessons in This Chapter-style section could help, but it is not required for this lesson type.
- Optional: a Exit Criteria-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/10-modern-project-stack/10-1.mdx

Type: lesson (concept)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Concrete Example-style section could help, but it is not required for this lesson type.
- Optional: a Common Misunderstanding-style section could help, but it is not required for this lesson type.
- Optional: a Quick Check-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/10-modern-project-stack/10-2.mdx

Type: lesson (concept)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Concrete Example-style section could help, but it is not required for this lesson type.
- Optional: a Common Misunderstanding-style section could help, but it is not required for this lesson type.
- Optional: a Quick Check-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/10-modern-project-stack/10-4.mdx

Type: lesson (unknown, inferred)

Problems:
- no bullet or numbered lists
- unknown lessonType; human review required

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Add a supported lessonType frontmatter value before applying strict structure rules.

### content/courses/ots-000/lessons/11-ai-assistants-coding-agents-mcp/11-0.mdx

Type: lesson (chapter-overview, inferred)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Chapter Purpose-style section could help, but it is not required for this lesson type.
- Optional: a What You Will Build-style section could help, but it is not required for this lesson type.
- Optional: a Lessons in This Chapter-style section could help, but it is not required for this lesson type.
- Optional: a Exit Criteria-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/11-ai-assistants-coding-agents-mcp/11-1.mdx

Type: lesson (comparison)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Confusion-style section could help, but it is not required for this lesson type.
- Optional: a Side-by-Side Comparison-style section could help, but it is not required for this lesson type.
- Optional: a Practice-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/11-ai-assistants-coding-agents-mcp/11-2.mdx

Type: lesson (comparison)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Confusion-style section could help, but it is not required for this lesson type.
- Optional: a Decision Rule-style section could help, but it is not required for this lesson type.
- Optional: a Practice-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/11-ai-assistants-coding-agents-mcp/11-3.mdx

Type: lesson (concept)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Concrete Example-style section could help, but it is not required for this lesson type.
- Optional: a Common Misunderstanding-style section could help, but it is not required for this lesson type.
- Optional: a Quick Check-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/11-ai-assistants-coding-agents-mcp/11-4.mdx

Type: lesson (unknown, inferred)

Problems:
- unknown lessonType; human review required

Recommended fixes:
- Add a supported lessonType frontmatter value before applying strict structure rules.

### content/courses/ots-000/lessons/12-safety-backups-secrets-permissions/12-0.mdx

Type: lesson (chapter-overview, inferred)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Chapter Purpose-style section could help, but it is not required for this lesson type.
- Optional: a What You Will Build-style section could help, but it is not required for this lesson type.
- Optional: a Lessons in This Chapter-style section could help, but it is not required for this lesson type.
- Optional: a Exit Criteria-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/12-safety-backups-secrets-permissions/12-3.mdx

Type: lesson (concept)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Common Misunderstanding-style section could help, but it is not required for this lesson type.
- Optional: a Quick Check-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/12-safety-backups-secrets-permissions/12-4.mdx

Type: lesson (unknown, inferred)

Problems:
- no bullet or numbered lists
- unknown lessonType; human review required

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Add a supported lessonType frontmatter value before applying strict structure rules.

### content/courses/ots-000/lessons/13-teacher-builder-starter-kit/13-1.mdx

Type: lesson (concept)

Problems:
- no bullet or numbered lists

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Optional: a Concrete Example-style section could help, but it is not required for this lesson type.
- Optional: a Common Misunderstanding-style section could help, but it is not required for this lesson type.
- Optional: a Quick Check-style section could help, but it is not required for this lesson type.

### content/courses/ots-000/lessons/13-teacher-builder-starter-kit/13-2.mdx

Type: lesson (unknown, inferred)

Problems:
- no bullet or numbered lists
- unknown lessonType; human review required

Recommended fixes:
- Use bullets for checks/options or numbers for process.
- Add a supported lessonType frontmatter value before applying strict structure rules.

### content/courses/ots-000/lessons/13-teacher-builder-starter-kit/13-3.mdx

Type: lesson (unknown, inferred)

Problems:
- unknown lessonType; human review required

Recommended fixes:
- Add a supported lessonType frontmatter value before applying strict structure rules.

### content/courses/ots-000/lessons/13-teacher-builder-starter-kit/13-4.mdx

Type: lesson (unknown, inferred)

Problems:
- unknown lessonType; human review required

Recommended fixes:
- Add a supported lessonType frontmatter value before applying strict structure rules.

### content/courses/ots-000/templates/teacher-builder-starter-kit.md

Type: support

Problems:
- support file appears to list items without bullets

Recommended fixes:
- Use bullets when listing support items.

### content/courses/ots-101/README.md

Type: support

Problems:
- 6 consecutive plain paragraph blocks

Recommended fixes:
- Break wall-of-text support files with headings or bullets.

### content/courses/ots-101/examples/README.md

Type: support

Problems:
- support file longer than 150 words without headings

Recommended fixes:
- Add headings to make the support file scannable.

### content/courses/ots-101/lessons/02-standards-goals-to-lessons/02-0.mdx

Type: lesson (chapter-overview)

Problems:
- 5 consecutive plain paragraph blocks

Recommended fixes:
- Break paragraph runs with headings, lists, examples, or checks.

### content/courses/ots-101/lessons/README.md

Type: support

Problems:
- 6 consecutive plain paragraph blocks

Recommended fixes:
- Break wall-of-text support files with headings or bullets.

## Notes

- The audit no longer requires Build Step or Quality Check for every lesson.
- Section names are advisory only; this is a formatting audit. Whether each teaching move is present is enforced by check:instructional-depth.
- Real formatting failures still block: missing headings/lists, walls of text, weak/better comparisons without a table, and process lessons without numbered steps.
- Lesson checks are based on lessonType frontmatter when present, with inference as a fallback.
- Author profiles, README files, and course support folders use lighter support-file rules.
- Use findings as review prompts, not permission to add fake sections.
