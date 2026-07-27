# Changesets

This repo publishes to npm via Changesets (see `docs/adr/0007-first-npm-release-build-esm-oidc.md`). Any change that affects what a published `packages/*` package actually ships — behavior, public API, or build output — needs a changeset, or it ships with no changelog entry and no version bump.

## When to add one

- A new feature, prop, or component in `packages/react|vue|svelte|solid|chart-core|class-contract|styles|tokens|registry`.
- A bug fix that changes runtime behavior.
- A build/tooling change that alters what actually gets published (e.g. switching a package from raw source to a compiled `dist/` output) — even if the *result* is behaviorally identical for consumers, it changed what ships, so it's worth at least a `patch` changeset.

Skip it for changes with zero effect on the published package: test-only changes, CI config, docs, dev tooling that never reaches the tarball.

## How

Run `pnpm changeset`, pick the affected package(s) and a bump type, and write a one-paragraph summary — it becomes the CHANGELOG entry for each package it's applied to.

This repo is entirely pre-1.0 (`0.x`): use `patch` for fixes and internal-but-shipped changes, `minor` for new features and non-breaking additions. Don't use `major`.

## Don't hand-edit versions or CHANGELOG.md

`changeset version` — run automatically by the release workflow when it opens the "Version Packages" PR — computes each package's version bump and writes its changelog from the accumulated changesets. Never bump a `package.json` version or add a CHANGELOG.md entry by hand.
