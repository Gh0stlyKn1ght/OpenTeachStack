# Knowledge Base Architecture Decision

## Date

2026-06-22

## Decision

- We are using a **custom-owned `/kb`** implementation in `src/app/kb`.
- Nextra is not the active KB renderer for production routes, and this project should not keep Nextra in a partial/halfway state.

## Evidence

- KB routes are implemented as App Router pages/components in `src/app/kb/**`.
- KB routing and page chrome are controlled by `src/app/kb/layout.tsx`.
- KB category and metadata content are authored in local modules, not Nextra markdown conventions.
- Search index source (`src/lib/search.ts`) is currently maintained for KB discoverability.

## Action Taken

- Keep `/kb` on the custom path (no Nextra docs middleware).
- Remove `nextra` and `nextra-theme-docs` dependencies.
- Remove Nextra config wrapper from `next.config.ts`.
- Remove `nextra-theme-docs` CSS import from global layout.

## Rationale

- Custom layout and article shell is already complete enough for the current roadmap.
- Consolidating ownership avoids duplicated routing behavior and reduces confusion between Nextra conventions and custom route contracts.
- Future improvements should continue on the custom stack, including optional generation of sidebar/search metadata from filesystem data rather than hard-coded arrays.
