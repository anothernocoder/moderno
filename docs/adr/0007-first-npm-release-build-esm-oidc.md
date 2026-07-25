# First public npm release: real builds, ESM-only output, OIDC trusted publishing

Status: accepted

## Decision

For the first public npm release of the 9 existing packages, three things change from
today's monorepo-only state. First, `class-contract`, `chart-core`, `react`, `vue`,
`svelte`, and `solid` gain a real build step (none exists today — `exports` point
straight at `.ts`/`.tsx`/`.vue`/`.svelte` source, which only worked because every
internal consumer shares this repo's bundler and `tsconfig`). Each uses the tool native
to its ecosystem — `tsup` for the pure-TS/React packages, `vite build` (library mode) +
`@vitejs/plugin-vue` for Vue, `@sveltejs/package` for Svelte, `vite build` +
`vite-plugin-solid` for Solid — rather than one tool forced everywhere. `tokens` and
`styles` need no build; their CSS/JSON output is already generated and committed. Second,
published output is **ESM-only**, no CJS — matching the repo's existing all-ESM
`"type": "module"`. Third, CI publishes via npm **Trusted Publishing (OIDC)** instead of a
long-lived `NPM_TOKEN` secret, via a Changesets GitHub Action (auto-opens a "Version
Packages" PR; publishing happens on merge to `main`).

## Context

Every `@moderno-ui/*` package has only ever been consumed via `workspace:*` inside this
repo — the raw-source `exports` were never exercised by an external bundler, so the gap
only surfaced when actually preparing to publish. Trusted Publishing requires linking
each package to this repo's GitHub Actions workflow by hand on npmjs.com before its
first publish; there's no way around that one-time manual step outside the repo.

## Consequences

- 6 packages need per-ecosystem build config maintained going forward; a build can now
  fail in ways `tsc --noEmit`/vitest didn't previously catch.
- No CJS means consumers stuck on a `require()`-only toolchain can't use these packages
  — accepted given the target frameworks (React 19, Vue 3.5, Svelte 5, Solid 1.9) and
  their tooling are ESM-native today.
- The OIDC link is per-package, done once in the npm UI, and out of band from any file
  in this repo.
