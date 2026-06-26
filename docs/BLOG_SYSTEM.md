# Blog System

OpenTeachStack has two public writing lanes. They share the same content folder and review rules, but they serve different reader promises.

## Public lanes

- `/blog` is JC's author blog. Use it for founder essays, teacher-builder reflections, opinionated notes about learning, and human-facing updates.
- `/build-notes` is the build journal. Use it to document the actual work of building OpenTeachStack: mistakes we found, bad assumptions, architecture fixes, course-design lessons, and what changed because of them.

## Content locations

- Published posts live in `content/blog/posts/`.
- Drafts live in `content/blog/drafts/`.
- Author profiles live in `content/blog/authors/`.

## Required frontmatter

Each post needs:

```yaml
title: "Post title"
slug: "post-slug"
date: "2026-06-26"
status: "draft"
author: "JC"
section: "build-notes"
category: "Field Note"
summary: "One sentence summary."
sourceSession: "Where this came from."
humanReviewed: false
published: false
```

Allowed `section` values:

- `author-blog` for `/blog`
- `build-notes` for `/build-notes`

## Publication rule

A post should only appear publicly when all three are true:

- `status: published`
- `published: true`
- `humanReviewed: true`

Drafts should include this visible note in the body:

```md
> Draft for JC review. Not published.
```

## Voice rule

There is no public AI author persona. Codex can help draft, structure, and edit, but public writing is attributed to JC after review. Build notes may honestly mention AI tooling, mistakes, and repair work, but they should read like a real person documenting what happened, not like a synthetic changelog.

## Formatting Is Instruction

Public posts must be structured enough to skim. Author-blog posts should guide the reader through the problem, realization, lesson, fix, and takeaway. Build notes should show what broke, what we learned, what changed, and what teachers or builders can reuse.

Use short sections, bullets, numbered steps, tables, blockquotes, and code blocks when they make the post easier to use.


## Reusable backup template

Use content/blog/templates/author-blog-post-template.md when starting a new author blog post. Do not repeat the # post title in the body; the route header renders the title from frontmatter.

