# Block Docs + Live Demos — Design

**Date:** 2026-06-16
**Status:** Approved (design)

## Goal

Document every Moderno **block** in the Astro/Starlight docs site with: a 4-framework
live demo, install command, and a props reference. This closes the gap left open by
[[2026-06-16-domain-blocks-design]] ("docs-site pages for blocks … deferred to a later
pass"). Today the only block documentation is `introduccion/blocks.mdx`, which lists
per-block install commands but has no props tables and no live demos.

Blocks are copy-paste compositions delivered by the `@moderno/registry` CLI, distinct
from the versioned `@moderno/<framework>` npm primitives already documented under
`componentes/`.

## Scope

In scope:

- One `.mdx` page per block (5 blocks: `hero`, `stats`, `product-card`,
  `portfolio-header`, `story`), under a new **"Blocks"** sidebar group.
- A live demo per block × 4 frameworks (react, vue, svelte, solid) = **20 demo files**,
  each importing the **real registry block source** (dogfooding the copy-paste output).
- Per-block props reference tables.
- `introduccion/blocks.mdx` trimmed to the conceptual intro (registry, CLI, ADR-0001);
  the per-block install commands move into each block page.

Out of scope:

- Per-framework props tables (block props are identical across frameworks — all blocks
  are 100% prop-driven, no slots).
- A `## Uso` example repeated for all 4 frameworks (one React example + "same API" note).
- Any change to block source code or the registry CLI.

## Architecture

### Content pages

```
apps/docs/src/content/docs/blocks/
  hero.mdx
  stats.mdx
  product-card.mdx
  portfolio-header.mdx
  story.mdx
```

`astro.config` sidebar gains a group after "Componentes":

```js
{ label: 'Blocks', items: [{ autogenerate: { directory: 'blocks' } }] }
```

`introduccion/blocks.mdx` stays in the "Introducción" group as the conceptual entry
point (what a block is, the two-channel model, the CLI). Its "Bloques disponibles"
section (per-block install snippets) is removed; instead it links to the new Blocks
group. Each block page links back to it for the install-prerequisites context.

### Live demos

```
apps/docs/src/demos/<fw>/blocks/<Block>Demo.<ext>
```

- fw ∈ {react, vue, svelte, solid}; ext ∈ {tsx, vue, svelte, tsx}.
- Each demo imports the real block source and renders it with representative sample
  props (mostly defaults; a couple of props overridden to show the block populated):

  ```tsx
  // src/demos/react/blocks/HeroDemo.tsx
  import { Hero } from '@moderno/registry/blocks/marketing/hero/Hero.tsx'
  export default function HeroDemo() {
    return <Hero />
  }
  ```

- Solid imports the `.solid.tsx` variant:
  `import { Hero } from '@moderno/registry/blocks/marketing/hero/Hero.solid.tsx'`.

This dogfoods the registry: the live demo renders exactly the file the CLI copies.

### Config changes (the key risk)

The registry block sources are `.tsx`/`.solid.tsx`/`.vue`/`.svelte` files outside the
existing integration `include` globs, so React/Solid JSX would not be compiled. Fix in
`apps/docs/astro.config.*`:

1. `react(...)` — add the registry path to `include` and **exclude** the Solid variant:
   ```js
   react({
     include: ['**/packages/react/**', '**/@moderno/react/**', '**/demos/react/**',
               '**/registry/blocks/**/*.tsx'],
     exclude: ['**/*.solid.tsx'],
   })
   ```
2. `solid(...)` — add the Solid variant to `include`:
   ```js
   solid({
     include: ['**/packages/solid/**', '**/@moderno/solid/**', '**/demos/solid/**',
               '**/registry/blocks/**/*.solid.tsx'],
   })
   ```
3. `vite.ssr.noExternal` — add `'@moderno/registry'` so its sources are bundled, not
   treated as an external require.
4. `apps/docs/package.json` — add `"@moderno/registry": "workspace:*"` dev dependency so
   pnpm symlinks it into `node_modules` (resolution + Vite `server.fs.allow` coverage).

`.vue`/`.svelte` block sources are handled by their catch-all integrations; no glob
change needed for them.

**Disambiguation:** React and Solid both transform `.tsx`. The Solid block files use the
`.solid.tsx` suffix, so React excludes `**/*.solid.tsx` and Solid includes only
`**/registry/blocks/**/*.solid.tsx`. This mirrors how the existing `demos/<fw>/` split
already keeps the two apart.

## Page anatomy

Each block `.mdx` follows the `componentes/card.mdx` pattern:

1. **Frontmatter** — `title`, `description`.
2. **Intro** — one paragraph: what the block is, which primitives it composes, its domain.
3. `## Demo en vivo` — `<Tabs syncKey="framework">` with 4 `<TabItem>`s, each wrapping the
   demo in `<div class="md-demo">` and hydrating with `client:only` (matching components).
4. `## Instalación` — `<Tabs syncKey="framework">` with the
   `npx @moderno/registry add <block> --framework <fw>` command per tab, plus a note to
   install `@moderno/<fw>` and [import styles](/introduccion/instalacion/).
5. `## Props` — a table `Prop | Tipo | Default | Descripción`. Blocks with item sub-types
   (`StatItem` for stats, `PortfolioLink` for portfolio-header) get a second table for
   that shape.
6. `## Uso` — one React code example with custom props, followed by a note that the API
   is identical across the 4 frameworks.

### Per-block props (source of truth: registry interfaces)

- **hero** (`HeroProps`): `kicker`, `title`, `subtitle`, `ctaLabel` (strings, all
  defaulted); `onCta?: () => void`. Composes `Button`.
- **stats** (`StatsProps`): `items?: StatItem[]` (defaulted). `StatItem`: `label`,
  `value` (string), `delta?` (string), `trend?: 'up' | 'down'`. Composes `Card`, `Badge`.
- **product-card** (`ProductCardProps`): `image?`, `title`, `price`, `saleText?`
  (strings); `onAdd?: () => void`. Composes `Card`, `Badge`, `Button`.
- **portfolio-header** (`PortfolioHeaderProps`): `name`, `role`, `bio`, `avatarSrc?`,
  `initials` (strings); `links?: PortfolioLink[]`; `onContact?: () => void`.
  `PortfolioLink`: `label`, `href`. Composes `Avatar`, `Chip`, `Button`.
- **story** (`StoryProps`): `kicker`, `title`, `ctaLabel` (strings); `onCta?: () => void`.
  Composes `Button`.

## Data flow

Astro builds the `.mdx` → renders the page → each `client:only` island hydrates with its
framework runtime → the demo imports the registry block source → the block imports
`@moderno/<fw>` primitives + reads `--md-*` tokens from the globally-loaded theme CSS
(`moderno-theme.css`, already wired). Primitives and tokens already resolve for the
existing component demos, so the only new resolution path is the registry import handled
by the config changes above.

## Error handling / risks

- **Glob disambiguation** (React vs Solid `.tsx`) — mitigated by the `.solid.tsx` suffix
  + React `exclude`. Verify both React and Solid demos hydrate.
- **`fs.allow`** — importing across the workspace requires Vite to allow the registry
  path. Adding the `workspace:*` dep symlinks it under `node_modules`, which Vite allows
  by default. Verify no "outside allowed paths" error.
- **Deep subpath import** — `@moderno/registry` has no `exports` map, so deep imports
  (`/blocks/...`) are permitted (legacy resolution). If a future `exports` map is added,
  it must expose `./blocks/*`.
- **Solid TDZ** — existing `optimizeDeps.exclude: ['@zag-js/solid']` already handles the
  known Solid hydration hazard; blocks only use already-proven primitives.

## Testing / verification

1. `pnpm --filter @moderno/docs dev` (or repo `pnpm docs`).
2. Load each of the 5 block pages.
3. For every page, switch through all 4 framework tabs; confirm each demo renders the
   block (no `client:only` blank, no console errors).
4. Confirm props tables and install tabs render.
5. Screenshot one representative block page (e.g. `stats`) per framework tab as proof.

## Out-of-scope / YAGNI

- No props code-gen from the TS interfaces — tables authored by hand from the known
  interfaces (5 blocks, small surface).
- No MDX component abstraction for the repeated demo/install tab boilerplate (5 pages;
  extract only if a 6th+ block makes the duplication painful).
