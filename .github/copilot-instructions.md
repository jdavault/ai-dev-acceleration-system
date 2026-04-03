---
name: copilot-instructions
description: 'Workspace-level instructions for AI agents and Copilot in this repository. Use when performing PR reviews, running workflows, generating tests, or making changes to `.ai/` or `app/` code.'
applyTo:
  - '.ai/**'
  - 'app/**'
  - 'scripts/**'
  - 'README.md'
---

# Workspace instructions — AI Dev Acceleration System

Purpose: Provide a compact, always-available guide for agents operating in this repo. Prefer `CLAUDE.md` for system-brain, and use these instructions for actionable conventions and safe defaults.

Principles:

- Defer policy and high-level norms to `CLAUDE.md`.
- Keep changes minimal and focused: small, reviewable commits.
- Respect the product boundary: `.ai/` is the product; `app/` is a demo.
- When in doubt, ask clarifying questions before making large changes.

Conventions:

- Tests: add or update tests when changing business logic in `app/`.
- Formatting: run project formatters or follow existing style in files modified.
- Commits: prefer small commits with descriptive messages.

What to run / check before proposing changes:

- Run any available CLI workflow in `scripts/` to reproduce expected outputs.
- Inspect `CLAUDE.md` for repository-wide rules and tone.
- Limit edits to the minimal set of files required by the change.

Safety & Anti-patterns:

- Do not use `applyTo: "**"` unless instruction truly applies to every file — prefer targeted globs.
- Avoid making large, sweeping refactors without explicit user approval.
- Do not disclose secrets, environment values, or run external network calls without approval.

Example prompts (use these to start a workflow):

- "Run the PR review workflow for the current diff and produce a checklist of required fixes."
- "Add unit tests for the feature in `app/controllers/` and provide runnable test commands."
- "Refactor this file to improve readability without changing behavior; explain the changes."

Suggested next customizations:

- `AGENTS.md`: add human-readable list of available agents and their trigger phrases.
- `/.github/prompts/`: store reusable prompt templates for common workflows (PR review, test generation).
- `/.ai/agents/pr-review-agent.md`: if present, sync personality and rubric with `CLAUDE.md`.

If you need clarification, ask the repository maintainer before applying broad changes.
