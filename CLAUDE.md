# Open TeachStack

## North Star
Open TeachStack is not an LMS. It is an open-source, resource-guided course that teaches educators how to build curriculum systems using AI, state standards, Google Workspace, Apps Script, open resources, GitHub, image generation, and AI coding agents. The priority is curriculum clarity, resource curation, teacher workflow, and practical artifacts.

## Tech Stack
- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- MDX content via next-mdx-remote/rsc
- Mermaid diagrams, Shiki code highlighting
- Fonts: Source Serif 4 (headings), Source Sans 3 (body), JetBrains Mono (code)

## 13 Modules
01 TeachStack Mindset, 02 Prompting, 03 Standards, 04 Course Architecture, 05 Resource Discovery, 06 Google Workspace, 07 Apps Script, 08 AI Images, 09 Video/Delivery, 10 GitHub/Open Source, 11 AI Coding Agents, 12 Course Site, 13 Capstone

## Project Structure
- `src/app/` — Next.js App Router pages
- `src/components/` — React components (23 components)
- `src/lib/` — Content utilities, metadata constants, MDX config
- `content/` — MDX files (lessons, labs, field-notes)

## Design Tokens
Light: bg #FDFBF7, text #1B2A4A, accent #C4953A, link #2B5EA7
Dark: bg #0F1729, text #F0EDE6, accent #D4A84B

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint

## License
- Code: MIT
- Content: CC BY-NC-SA 4.0

@AGENTS.md
