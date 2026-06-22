# OTS-280 Source References and Escalation Notes

Date: 2026-06-22

Status: active source queue and escalation guidance

OTS-280 should use official sources for safety advice. Teacher-facing lessons can translate that advice into plain classroom language, but source panels and course notes should point back to the primary references.

## Source References Attached or Queued

| Source | URL | Use in OTS-280 |
| --- | --- | --- |
| FTC Phishing Guidance | https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams | Chapter 04 phishing recognition, protection, response, and reporting |
| FTC Report Fraud | https://reportfraud.ftc.gov/ | Chapter 04 and Chapter 10 reporting path for scams and fraud |
| NIST Small Business Cybersecurity Corner | https://www.nist.gov/itl/smallbusinesscyber | Plain-language planning support for teacher-scale cyber safety routines |
| NIST Digital Identity Guidelines | https://pages.nist.gov/800-63-4/sp800-63b.html | Chapter 02 authentication, MFA, passkeys, and account security background |
| GitHub Secret Scanning Documentation | https://docs.github.com/en/code-security/how-tos/secure-your-secrets | Chapter 09 public repo secret exposure and remediation |
| GitHub Docs | https://docs.github.com/en | Chapter 09 repositories, commits, public/private repo decisions, and account safety |

These sources are already represented in `src/lib/officialSources.ts` for OTS-280 or adjacent GitHub work. Keep them synchronized when source panels are expanded.

## Escalation Boundaries

Escalation notes belong in every chapter where a teacher might discover an active risk:

- Account compromise: contact school IT or platform support, change credentials from a trusted device, and preserve the timeline.
- Student data exposure: notify the appropriate school administrator or privacy contact before sharing details elsewhere.
- Harassment, stalking, threats, or doxxing: preserve evidence, avoid direct engagement, and escalate to administration, safety staff, or law enforcement as appropriate.
- Exposed API keys, tokens, or credentials: rotate the secret first, then remove the visible exposure and review commit history.
- Suspicious email or message: do not click, reply, forward externally, or download attachments while investigating.
- Lost or stolen device: follow district device-loss procedures, account recovery steps, and remote wipe guidance where available.

## Course-Writing Rules

- Do not ask teachers to investigate live threats inside a class activity.
- Do not include real student data, active incident details, screenshots, or credentials in examples.
- Use fictional scenarios for practice.
- Link to official reporting or support paths instead of inventing local policy.
- Remind teachers that district policy and school safety procedures override generic course advice.
