# OTS-220 Apps Script Course Outline

Date: 2026-06-22

Status: release-ready outline

Course path: Modern Teacher Systems

Prerequisite: Comfort with Google Sheets and willingness to read small scripts

## Course Thesis

Apps Script is useful for teachers when it automates small, repeated Google Workspace tasks with clear inputs, visible outputs, test data, and safe rollback.

OTS-220 should teach readable teacher-scale automation, not professional software engineering. The course should keep scripts short, explain every significant line, and require test copies before live use.

## Course Source Labs

This outline is backed by course-owned Apps Script lesson and lab files:

- `content/lessons/what-is-google-apps-script.mdx`
- `content/lessons/google-sheets-as-curriculum-database.mdx`
- `content/lessons/google-drive-folder-architecture.mdx`
- `content/lessons/google-forms-as-quizzes.mdx`
- `content/labs/your-first-apps-script-custom-menu.mdx`
- `content/labs/generate-unit-folders-with-apps-script.mdx`
- `content/labs/generate-docs-from-sheet-rows.mdx`
- `content/labs/create-google-form-quizzes-from-sheet.mdx`
- `content/labs/send-reminder-emails-from-sheet.mdx`

## Final Artifact

Teacher automation toolkit

The final artifact should include:

- automation candidate list
- first custom menu script
- folder generator
- document generator from sheet rows
- quiz generator from a question bank
- reminder email workflow with preview mode
- script review checklist
- test evidence and rollback notes

## Chapter Outline

| Chapter | Focus | Source material | Build artifact |
| --- | --- | --- | --- |
| 01. Automation Mindset | Choose safe repeated tasks and avoid automating broken workflows. | `what-is-google-apps-script.mdx`, OTS-101/201 boundaries | Automation candidate list |
| 02. Apps Script Basics | Open the editor, understand bound scripts, run functions, authorize safely, and add menus. | `your-first-apps-script-custom-menu.mdx` | Custom menu script |
| 03. Folder and File Generators | Read rows from Sheets and create predictable Drive folders. | `google-drive-folder-architecture.mdx`, `generate-unit-folders-with-apps-script.mdx` | Folder generator |
| 04. Docs from Sheet Rows | Use a Sheet as a data source and copy Docs templates with placeholders. | `google-sheets-as-curriculum-database.mdx`, `generate-docs-from-sheet-rows.mdx` | Doc generator |
| 05. Forms, Email, and Reminders | Generate Forms quizzes and send carefully previewed reminders from Sheet data. | `google-forms-as-quizzes.mdx`, `create-google-form-quizzes-from-sheet.mdx`, `send-reminder-emails-from-sheet.mdx` | Reminder workflow |
| 06. Teacher Automation Toolkit | Package scripts with docs, tests, safety notes, and rollback steps. | OTS-220 labs and templates | Automation toolkit |

## Safety Rules

- Run every script on a copy before using live curriculum data.
- Never include student-identifiable data in examples.
- Require preview or confirmation before scripts send email or create many files.
- Write URLs, status, timestamps, or logs back to the source sheet so work is auditable.
- Prefer idempotent helpers such as `getOrCreateFolder` when scripts may be re-run.
- Keep official Apps Script documentation attached through the Source Bank workflow.

## Current Route Coverage

The outline is represented in `src/lib/courseStructures.ts` and rendered through the shared course-book routes:

- `/book/ots-220`
- `/book/ots-220/01-automation-mindset`
- `/book/ots-220/02-apps-script-basics/02-4`

## Next Content Tasks

1. Keep each lab mapped to its corresponding OTS-220 chapter or section.
2. Keep authored MDX, labs, and templates aligned with the book route and release checks.
3. Add an Apps Script safety checklist template only after final fields are stable.
4. Add official Apps Script docs and samples to relevant section source panels.
5. Add a no-live-data test protocol for every code-running lab.
