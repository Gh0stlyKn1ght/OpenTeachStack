# Contributing to Open TeachStack

Thank you for considering a contribution to Open TeachStack. This is an open-source curriculum project, and contributions from educators, developers, and subject matter experts are welcome.

## Types of Contributions

### Content
- Fix typos, broken links, or factual errors in lessons
- Improve explanations or add examples
- Write new field notes or case studies
- Suggest additional resources for the resource library
- Translate content into other languages

### Code
- Fix bugs in the site or components
- Improve accessibility
- Optimize performance
- Add new components for content display
- Improve print styles

### Curriculum Design
- Suggest new lesson topics or modules
- Review existing lessons for pedagogical quality
- Propose hands-on lab exercises
- Share Apps Script examples from your own practice

## How to Contribute

### Small fixes (typos, links, minor corrections)
1. Click the "Edit on GitHub" link on any page
2. Make your change
3. Submit a pull request with a clear description

### Larger contributions
1. Open an issue describing what you want to change and why
2. Fork the repository
3. Create a branch for your changes
4. Make your changes following the guidelines below
5. Submit a pull request

## Content Guidelines

### Lesson format
All lessons use MDX with frontmatter. See existing lessons in `content/lessons/` for the format.

Required frontmatter fields:
```yaml
title: "Your Lesson Title"
module: "module-id"
type: "lecture" | "lab" | "field-note"
order: 1
week: 1
duration: "30 minutes"
level: "Beginner" | "Intermediate" | "Advanced"
summary: "One-sentence summary"
outcomes:
  - "Learning outcome 1"
  - "Learning outcome 2"
tags:
  - relevant-tag
draft: false
```

### Writing style
- Direct, practical tone. No marketing language.
- Second person ("you") for instructions.
- Short paragraphs. One idea per paragraph.
- Use tables for comparisons.
- Use Mermaid diagrams for processes and flows.
- Include a BuildTask in every lesson.
- Include at least one ReflectionPrompt or TeacherNote per lesson.
- Be honest about limitations (use RealityCheck for this).

### Code examples
- All code should be tested and working.
- Apps Script examples should include the full function, not just snippets.
- Add comments only when the "why" is non-obvious.

## Code Guidelines

- TypeScript for all new code
- Use Tailwind CSS classes (no inline styles, no CSS modules)
- Server Components by default; 'use client' only when necessary
- Follow existing file and component naming conventions
- No unnecessary dependencies

## License

By contributing, you agree that:
- Code contributions are licensed under MIT
- Content contributions are licensed under CC BY-NC-SA 4.0
