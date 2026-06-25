# OTS-240 Open Resources and GitHub Outline

Date: 2026-06-22

Status: draft outline from existing open-resource lessons

Course path: Modern Teacher Systems

Prerequisite: OTS-101 resource evaluation and licensing basics

## Course Thesis

Open curriculum is only useful when another teacher can understand what it is, where it came from, what they are allowed to do with it, and how to suggest improvements safely.

OTS-240 should make GitHub practical for educators without turning the course into a programming class. Teachers should leave with a small public repository that has version history, source notes, a readable README, an appropriate license, and a review workflow they can maintain.

## Source Draft Lessons

This outline is extracted from the existing open-resource and GitHub lesson files:

- `content/lessons/resource-discovery-and-evaluation.mdx`
- `content/lessons/open-source-vs-free.mdx`
- `content/lessons/creative-commons-for-teachers.mdx`
- `content/lessons/github-for-teachers.mdx`
- `content/lessons/publishing-your-curriculum-hub.mdx`

## Final Artifact

Open curriculum repository

The final artifact should include:

- open-resource decision log
- GitHub repository created through the web interface
- course README with audience, scope, use notes, and license notes
- source and attribution file
- contribution checklist
- review log for one small change
- release checklist and maintenance plan

## Chapter Outline

| Chapter | Focus | Existing draft sources | Build artifact |
| --- | --- | --- | --- |
| 01. Open Resource Mindset | Distinguish free, open, licensed, and merely available materials. | `resource-discovery-and-evaluation.mdx`, `open-source-vs-free.mdx`, `creative-commons-for-teachers.mdx` | Open resource decision log |
| 02. GitHub Foundations for Teachers | Introduce repositories, files, commits, branches, and the web editor as teacher workflows. | `github-for-teachers.mdx` | Curriculum repo |
| 03. Writing Useful READMEs | Turn the README into trustworthy teacher-facing documentation. | `github-for-teachers.mdx`, Source Bank workflow docs | Course README |
| 04. Contribution and Review Workflows | Use issues, pull requests, checklists, and small reviews to protect curriculum quality. | `github-for-teachers.mdx`, GitHub Docs | Contribution checklist and review log |
| 05. Publishing and Attribution | Attach source notes, license decisions, attribution lines, and publishing boundaries. | `creative-commons-for-teachers.mdx`, `publishing-your-curriculum-hub.mdx` | Attribution and license file |
| 06. Open Curriculum Repository | Assemble the full repository with docs, source notes, contribution rules, and maintenance habits. | All OTS-240 draft lessons | Open curriculum repository |

## Safety Rules

- Do not publish student-identifiable information, private school files, or internal links.
- Treat "found online" as unusable until the license and source are explicit.
- Keep GitHub instruction web-interface-first; terminal Git belongs only in optional extensions.
- Require a README before asking another teacher to use or review the repository.
- Use small commits with descriptive messages so curriculum changes remain auditable.
- Attach official GitHub and Creative Commons references through the Source Bank workflow.

## Current Route Coverage

The outline is represented in `src/lib/courseStructures.ts` and rendered through the shared course-book routes:

- `/book/ots-240`
- `/book/ots-240/01-open-resource-mindset`
- `/book/ots-240/02-github-foundations/02-3`

## Next Content Tasks

1. Continue enriching open-resource and GitHub lessons with beginner-friendly examples.
2. Add a repository README template after the required fields stabilize.
3. Add an attribution and license file template that matches the Source Bank workflow.
4. Add official GitHub Docs and Creative Commons references to relevant section source panels.
5. Run a browser keyboard and public-link privacy pass once authored sections exist.
