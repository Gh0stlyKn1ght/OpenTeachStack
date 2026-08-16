---
name: ots-cli-verifier
description: Verify AI CLI commands, flags, examples, and terminal snippets for OTS-320 before they are presented as executable instructions.
---

# OTS CLI Verifier

Use this skill for any learner-facing command involving Codex CLI, Claude Code, Google Antigravity CLI (`agy`), Git, shell commands used by the course, or provider-specific configuration syntax.

## Verification workflow

1. Classify the block as real executable command, pseudocode, emulated input, or captured input.
2. Identify provider and command family.
3. Verify provider-specific syntax against current first-party documentation.
4. If explicitly requested and a local CLI exists, compare with non-destructive `--help` or equivalent reference output.
5. Check platform assumptions: PowerShell, cmd, bash/zsh, package manager, runtime.
6. Check quoting, paths, pipes, environment variables, and multiline syntax.
7. Classify risk: read-only, local write, execute, network, destructive, permission bypass.
8. Reject or specially label unsafe shortcuts, bypass flags, destructive examples, and commands that expose secrets.

## Required result

```text
STATUS: verified | needs-revision | unsupported | uncertain
TYPE: real-command | emulated-input | captured-input | pseudocode
PLATFORM: windows-powershell | windows-cmd | bash-zsh | cross-platform | provider-shell
RISK: read-only | write | execute | network | destructive | bypass
SOURCE: official source or local help used
NOTES: concise explanation
```

## Rules

- Never invent a flag because a similar CLI has one.
- Never imply feature parity across Codex, Claude Code, and AGY.
- Never present emulator syntax as a real provider command.
- Prefer minimal bounded examples.
- Verification may be part of repo CI, but never as GitHub Actions or Vercel automation.
