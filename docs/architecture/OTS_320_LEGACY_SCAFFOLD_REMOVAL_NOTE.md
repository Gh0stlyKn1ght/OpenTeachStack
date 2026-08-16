# OTS-320 Legacy Scaffold Retirement

The original six-chapter OTS-320 lesson tree was generated scaffold content and is being removed from the production lesson source during the Command Line AI rebuild.

Retired lesson directories:

- `01-agent-safety-mindset`
- `02-repo-branch-workflow`
- `03-prompting-coding-agents`
- `04-testing-verification`
- `05-building-teacher-tools`
- `06-reviewed-agent-build`

Reason:

- the files were marked `generationSource: scaffold` / `migrationStatus: generated`,
- lesson bodies contained literal placeholders such as `${richContent}`,
- their six-chapter structure no longer matches the approved 11-chapter OTS-320 contract,
- keeping them under `content/courses/ots-320/lessons` caused reader-quality checks to inspect dead scaffold as if it were production course source.

The Git history remains the archive. Production lesson source should contain only the active authored OTS-320 structure and future intentionally authored chapters.
