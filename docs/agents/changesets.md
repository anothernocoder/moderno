# Changesets

This repo publishes to npm via Changesets (see `docs/adr/0007-first-npm-release-build-esm-oidc.md`). Any change that affects what a published `packages/*` package actually ships — behavior, public API, or build output — needs a changeset, or it ships with no changelog entry and no version bump.

## When to add one

- A new feature, prop, or component in `packages/react|vue|svelte|solid|chart-core|class-contract|styles|tokens|registry`.
- A bug fix that changes runtime behavior.
- A build/tooling change that alters what actually gets published (e.g. switching a package from raw source to a compiled `dist/` output) — even if the *result* is behaviorally identical for consumers, it changed what ships, so it's worth at least a `patch` changeset.

Skip it for changes with zero effect on the published package: test-only changes, CI config, docs, dev tooling that never reaches the tarball.

## How

Don't run the interactive `pnpm changeset` wizard — it's a TTY prompt, not agent-friendly. Instead, write the file directly: create `.changeset/<kebab-case-slug>.md` (any unique, descriptive slug — doesn't need to match Changesets' own random-word generator) with YAML frontmatter mapping each affected package to a bump type, followed by a blank line and a short summary in prose. Match the exact format already used by the files in `.changeset/` (or the release notes of a merged PR) as a template, e.g.:

```md
---
"@moderno-ui/react": minor
"@moderno-ui/vue": minor
---

Add the Foo primitive across React and Vue: a display-only variant of Bar
taking a `label` and `tone` prop.
```

This repo is entirely pre-1.0 (`0.x`): use `patch` for fixes and internal-but-shipped changes, `minor` for new features and non-breaking additions. Don't use `major`.

Do this as the last step before opening the PR, in the same commit as the change it documents.

## Don't hand-edit versions or CHANGELOG.md

`changeset version` — run automatically by the release workflow when it opens the "Version Packages" PR — computes each package's version bump and writes its changelog from the accumulated changesets. Never bump a `package.json` version or add a CHANGELOG.md entry by hand.
