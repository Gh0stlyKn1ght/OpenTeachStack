# OTS-280 Cyber Safety for Educators Outline

Date: 2026-06-22

Status: draft outline from existing cyber safety book model

Course path: Cyber Safety for Educators

Prerequisite: OTS-260 or equivalent public-sharing and media-publishing workflow

## Course Thesis

Teachers are public-facing professionals. Cyber safety should give them calm, practical digital self-defense habits for accounts, identities, devices, public profiles, course sites, GitHub repositories, domains, and incident response.

OTS-280 should avoid fear-based security language. The course should teach repeatable maintenance routines that reduce risk while preserving the usefulness of public curriculum work.

## Source Draft Material

This outline is extracted from the existing cyber safety book model and supporting field note:

- `src/lib/cyberSafety.ts`
- `content/field-notes/teachers-need-digital-self-defense.mdx`

## Final Artifact

Teacher digital self-defense plan

The final artifact should include:

- teacher personal risk map
- account inventory and MFA checklist
- public/private identity map
- phishing response checklist
- public profile audit
- device and browser hardening checklist
- teacher website security audit
- public repo and domain exposure check
- incident response mini-plan

## Chapter Outline

| Chapter | Focus | Existing source | Build artifact |
| --- | --- | --- | --- |
| 01. Teacher Threat Model | Map realistic public-facing teacher risks without panic. | `cyberSafety.ts` | Teacher personal risk map |
| 02. Account Hygiene and MFA | Inventory important accounts, reduce password reuse, and enable MFA. | `cyberSafety.ts` | Password manager and MFA checklist |
| 03. Usernames and Identity Separation | Separate personal, school, and public educator identities where it matters. | `cyberSafety.ts` | Public/private identity map |
| 04. Email, Phishing, and Impersonation | Recognize suspicious messages and respond without making the situation worse. | `cyberSafety.ts` | Phishing response checklist |
| 05. Social Media and Doxxing Risk | Audit public profiles for unnecessary location, routine, and contact exposure. | `cyberSafety.ts`, `teachers-need-digital-self-defense.mdx` | Public profile audit |
| 06. VPNs, Wi-Fi, and Location Privacy | Explain what VPNs and HTTPS can and cannot protect. | `cyberSafety.ts` | Connection safety checklist |
| 07. Browser, Device, and File Safety | Review extensions, updates, lock settings, downloads, screenshots, and metadata. | `cyberSafety.ts` | Device and browser hardening checklist |
| 08. Website Safety for Teacher Sites | Check public websites for forms, downloads, embeds, analytics, and private details. | `cyberSafety.ts` | Teacher website security audit |
| 09. GitHub, Domains, and Public Repos | Check public repositories, commits, domains, and contact details before sharing. | `cyberSafety.ts` | Public repo and domain exposure check |
| 10. Incident Response for Teachers | Create a calm plan for reporting, documenting, and recovering from incidents. | `cyberSafety.ts` | What to do if something happens plan |

## Safety Rules

- Do not ask teachers to publish full risk maps, private account inventories, recovery codes, or sensitive screenshots.
- Never paste passwords, backup codes, API keys, student data, or private incident details into AI tools.
- Keep guidance aligned with district policy, school IT rules, and legal reporting requirements.
- Treat serious threats, harassment, account compromise, and student safety issues as escalation moments.
- If a real secret was exposed publicly, rotate it; deleting the visible file is not enough.

## Current Route Coverage

The outline is represented in `src/lib/cyberSafety.ts` and rendered through the OTS-280 book routes:

- `/book/ots-280`
- `/book/ots-280/01-teacher-threat-model`
- `/book/ots-280/09-github-domains-repos/09-4`

## Next Content Tasks

1. Continue expanding section-level examples as needed. Chapters 01-10 now have authored section content through the OTS-280 content map and chapter guides.
2. Private-use templates that avoid collecting sensitive values are documented in `docs/OTS_280_PRIVATE_USE_TEMPLATES.md`.
3. FTC, NIST, GitHub secret scanning, and platform references are attached or queued in `docs/OTS_280_SOURCE_REFERENCES_AND_ESCALATION.md`.
4. Escalation notes for district IT, administration, platform support, and law enforcement boundaries are documented in `docs/OTS_280_SOURCE_REFERENCES_AND_ESCALATION.md`.
5. The current authored examples passed privacy review in `docs/OTS_280_PRIVACY_REVIEW.md`.
