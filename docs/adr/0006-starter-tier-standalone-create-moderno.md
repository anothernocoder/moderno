# Starter tier: standalone `create-moderno-ui` scaffold, separate from the registry CLI

Status: accepted

## Decision

Moderno adds a third distribution channel, **Starter** — a brand-new project scaffold
pre-integrated with Moderno — alongside the existing [[primitive]] (npm) and [[registry]]
(copy-paste) channels. It ships as its own package, **`create-moderno-ui`**, invoked via
`npm create moderno-ui@latest`, rather than as an `init` subcommand of `@moderno-ui/registry`.
`@moderno-ui/registry` gains a narrower `init` instead: it detects the consumer's framework
from their `package.json` and writes it to `moderno.config.json` so subsequent `add` calls
don't need `--framework`; if no framework is detected, it points the user at
`create-moderno-ui` rather than invoking it itself. v1 of `create-moderno-ui` scaffolds
React+Vite and Vue+Vite only (Svelte/Solid come later, and the framework prompt only ever
lists what actually exists — no "coming soon" placeholders).

## Context

`@moderno-ui/registry` already assumes a target project exists — its `add` command copies
files into `process.cwd()`. Folding "create a project from nothing" into the same CLI
would mean two unrelated interaction modes (a project-scaffolding wizard vs. a
file-copier) living behind one entry point, and `npm`/`pnpm`/`yarn`/`bun` all resolve
`create <name>` to a `create-<name>` package by convention — that's the discoverable,
idiomatic name for "start a new X project" tooling, distinct from `npx <name>` for "run a
tool against my existing project." The bare `moderno` package/scope name was unavailable on
npm (already published by an unrelated author), which is what forced every other npm-facing
name in this project onto `moderno-ui` (scope `@moderno-ui/*`, registry CLI bin
`moderno-ui`). `create-moderno` itself was technically still free on npm — `create-<name>`
is a distinct package from bare `<name>` — but naming the Starter scaffold `create-moderno`
while everything else reads `moderno-ui` invites exactly the mixup the rename was meant to
avoid: a user typing `npm create moderno@latest` off of muscle memory would have no way to
tell they've landed on this project versus the unrelated one squatting bare `moderno`. So
`create-moderno-ui` follows the same npm-facing convention as the rest of the project,
instead of `npx moderno@latest` or `npx create-moderno@latest`.

## Consequences

- A 10th publishable package (`create-moderno-ui`), with its own release cadence separate
  from the 9 existing ones.
- `init` and `create-moderno-ui` don't compose automatically — `init` finding no framework
  stops at a suggestion; it never shells out to spawn `create-moderno-ui`'s own wizard from
  inside another command's prompt flow.
- The framework picker in `create-moderno-ui` is a maintenance surface: it must stay in sync
  with which templates actually exist, by design.
