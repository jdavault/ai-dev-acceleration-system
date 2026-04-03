# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

AI Dev Acceleration System — a productized consulting system that gets installed into client repos to accelerate dev velocity (2-5x) using AI workflows and agents.

## Architecture

- `app/` — Demo issue tracker application (Node.js) used to prove the system works
- `.ai/` — **The product itself** — the installable AI acceleration system
  - `agents/` — AI agents (PR review agent is the MVP)
  - `commands/` — Reusable CLI-style prompts
  - `tasks/` — Workflow definitions (feature, refactor, bug fix, PR review)
  - `handoffs/` — Multi-step flows (future)
  - `memory/` — Context, patterns, learnings
- `scripts/` — CLI scripts for running workflows (IDE-agnostic)
- `.cursor/rules/` — Cursor IDE-specific rules (Layer 2, optional)

## Key Distinction

The demo app (`app/`) exists to prove the system works. The `.ai/` directory IS the product being sold. Build in Cursor, sell as IDE-agnostic (VSCode-compatible).

## Tech Stack

- Node.js (demo app)
- Claude (primary AI model)
- CLI workflows (IDE-agnostic execution)