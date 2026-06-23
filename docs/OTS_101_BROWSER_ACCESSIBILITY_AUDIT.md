# OTS-101 Browser Accessibility Audit

Date: 2026-06-22

Scope: OTS-101 public release routes, core course pages, template library, Source Bank, release packet, and the active book route.

This is a browser-facing release audit against WCAG 2.1 AA expectations. It is not a third-party certification.

## Result

Status: pass with documented follow-up

OTS-101 remains approved for release. The production build renders the audited routes, exposes semantic page structure, uses visible focus styles, respects reduced-motion preferences, and keeps interaction patterns link/button based.

The remaining follow-up is to add a repeatable CI accessibility scan with axe or an equivalent browser runner, plus a human screen-reader pass after the next visual polish tranche.

## Verification Commands

| Check | Result | Notes |
| --- | --- | --- |
| `npm run lint` | Pass | ESLint completed without errors. |
| `npm run build` | Pass | Production build completed successfully. |
| `npm run start` route probe | Pass | Release build served every audited route with HTTP 200 while the server was held open in the shell. |
| In-app browser automation | Blocked | Browser bridge failed during setup with missing sandbox metadata. |
| Edge headless fallback | Blocked | Local Edge launched but returned no DOM or screenshot artifact in this shell. |

## Route Evidence

| Route | HTTP | H1 | Main | Nav | Buttons | Inputs | Links | Title |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `/` | 200 | 1 | 1 | 2 | 2 | 0 | 46 | Present |
| `/start` | 200 | 1 | 1 | 1 | 2 | 0 | 27 | Present |
| `/course` | 200 | 1 | 2 | 3 | 3 | 2 | 102 | Present |
| `/syllabus` | 200 | 1 | 1 | 1 | 2 | 0 | 31 | Present |
| `/templates` | 200 | 1 | 1 | 1 | 2 | 0 | 47 | Present |
| `/library/source-bank` | 200 | 1 | 1 | 2 | 2 | 0 | 68 | Present |
| `/course/audit` | 200 | 1 | 2 | 1 | 2 | 0 | 50 | Present |
| `/course/release` | 200 | 1 | 1 | 1 | 2 | 0 | 49 | Present |
| `/book/ots-101` | 200 | 1 | 2 | 3 | 3 | 2 | 102 | Present |
| `/book/ots-101/01-teacher-builder-mindset` | 200 | 1 | 2 | 4 | 3 | 2 | 71 | Present |

## WCAG 2.1 AA Review

| Area | Status | Evidence | Follow-up |
| --- | --- | --- | --- |
| Page titles | Pass | Every audited route includes a document title. | Keep metadata coverage on new public routes. |
| Headings and landmarks | Pass | Audited routes expose one `h1`; each route includes at least one `main` landmark. | Avoid duplicate `h1` headings in future book/chapter shells. |
| Keyboard structure | Pass with follow-up | Navigation, search, theme toggle, and mobile menu use native links, inputs, and buttons. Mobile menu has `aria-controls`, `aria-expanded`, and Escape handling. | Run a manual keyboard traversal in a stable browser session before v1.1. |
| Focus visibility | Pass | Global `:focus-visible` and link focus styles are defined in `src/app/globals.css`. | Include focus-state screenshots in the future axe/manual audit artifact. |
| Reduced motion | Pass | Motion-heavy utilities are disabled under `prefers-reduced-motion: reduce`. | Keep new animation decorative and nonessential. |
| Link clarity | Pass | Core routes use named links and action text rather than raw URL-only calls to action. | Recheck new Source Bank additions. |
| Search inputs | Pass | Book and KB search controls have explicit labels connected through generated IDs. | Add result-count text if search expands beyond lightweight local filtering. |
| Mobile navigation | Pass | Mobile navigation uses native button disclosure behavior, a named navigation region, larger tap targets, and active-page state. | Confirm focus order visually once browser automation is available. |
| Color contrast | Pass with follow-up | Theme uses high-contrast foreground/background tokens and visible focus outlines. | Add automated contrast coverage through axe or Playwright before v1.1. |
| Screen-reader behavior | Follow-up | Static semantics are present, but no live screen-reader pass was available in this shell. | Run NVDA/VoiceOver spot check on home, course, templates, Source Bank, and book chapter pages. |

## Release Decision

OTS-101 can continue toward release. The site is text-first, semantic, keyboard-oriented, and backed by a successful production build. The only remaining accessibility risk is evidence automation: the repo should add a repeatable browser accessibility command before the next release polish cycle.
