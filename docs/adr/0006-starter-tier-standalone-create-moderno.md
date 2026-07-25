# Starter tier: standalone `create-moderno` scaffold, separate from the registry CLI

Status: accepted

## Decision

Moderno adds a third distribution channel, **Starter** — a brand-new project scaffold
pre-integrated with Moderno — alongside the existing [[primitive]] (npm) and [[registry]]
(copy-paste) channels. It ships as its own package, **`create-moderno`**, invoked via
`npm create moderno@latest`, rather than as an `init` subcommand of `@moderno-ui/registry`.
`@moderno-ui/registry` gains a narrower `init` instead: it detects the consumer's framework
from their `package.json` and writes it to `moderno.config.json` so subsequent `add` calls
don't need `--framework`; if no framework is detected, it points the user at
`create-moderno` rather than invoking it itself. v1 of `create-moderno` scaffolds React+Vite
and Vue+Vite only (Svelte/Solid come later, and the framework prompt only ever lists what
actually exists — no "coming soon" placeholders).

## Context

`@moderno-ui/registry` already assumes a target project exists — its `add` command copies
files into `process.cwd()`. Folding "create a project from nothing" into the same CLI
would mean two unrelated interaction modes (a project-scaffolding wizard vs. a
file-copier) living behind one entry point, and `npm`/`pnpm`/`yarn`/`bun` all resolve
`create <name>` to a `create-<name>` package by convention — that's the discoverable,
idiomatic name for "start a new X project" tooling, distinct from `npx <name>` for "run a
tool against my existing project." The bare `moderno` package name was unavailable on npm
(already published by an unrelated author), which is what put `create-moderno` on the
table as its own package instead of `npx moderno@latest` directly.

## Consequences

- A 10th publishable package (`create-moderno`), with its own release cadence separate
  from the 9 existing ones.
- `init` and `create-moderno` don't compose automatically — `init` finding no framework
  stops at a suggestion; it never shells out to spawn `create-moderno`'s own wizard from
  inside another command's prompt flow.
- The framework picker in `create-moderno` is a maintenance surface: it must stay in sync
  with which templates actually exist, by design.
