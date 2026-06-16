# Domain Blocks + Registry Reorg — Design

**Date:** 2026-06-16
**Status:** Approved (design)

## Goal

Make the final shape of the Moderno **block library** visible by adding one
representative block per product domain and organizing the registry folders by
domain. A [[block]] is a copy-paste composition of primitives + layout, delivered
by the [[registry]] CLI (not npm). Today only `hero` exists in a flat folder.

## Scope

- **4 new blocks**, one per domain that lacks one (Marketing already has Hero).
- **All 4 frameworks** per block (react, vue, svelte, solid) — parity with Hero.
- **Group registry folders by domain.**
- Out of scope: docs-site pages for blocks (the `componentes/` section documents
  npm primitives, not blocks) — deferred to a later pass.

## Folder layout

Move the existing Hero under a `marketing/` group, add four domain folders:

```
packages/registry/blocks/
  marketing/hero/            Hero.tsx  Hero.vue  Hero.svelte  Hero.solid.tsx   (moved)
  applications/stats/        Stats.tsx  Stats.vue  Stats.svelte  Stats.solid.tsx
  ecommerce/product-card/    ProductCard.tsx  .vue  .svelte  .solid.tsx
  portfolio/portfolio-header/ PortfolioHeader.tsx  .vue  .svelte  .solid.tsx
  images-ads/story/          Story.tsx  .vue  .svelte  .solid.tsx
```

## The blocks

All blocks follow the Hero pattern: a single section/component, inline styles
reading `--md-*` tokens, composing existing primitives from `@moderno/{framework}`.
Low behavior, high layout. Each ships an interface/props with sensible defaults so
it renders standalone.

Primitive parity verified across all four frameworks for every primitive used
below (Button, Badge, Card, Avatar, Chip, Divider, Indicator).

### 1. Applications — `Stats` (domain: applications)

KPI metric row. Maps to structure §4.2 (Stats / KPI Cards).

- **Primitives:** Card, Badge.
- **Props:** `items: { label: string; value: string; delta?: string; trend?: 'up' | 'down' }[]`.
- **Render:** responsive grid (CSS grid, `repeat(auto-fit, minmax(…))`) of Card; each
  card shows large value (serif), label (secondary text), and a Badge for `delta`
  (`success` variant when `trend === 'up'`, `error` when `'down'`).
- **Default items:** 3–4 sample KPIs so it renders without props.

### 2. E-Commerce — `ProductCard` (domain: ecommerce)

Product tile. Maps to structure §5.1 (Product Lists / Product Details).

- **Primitives:** Card, Badge, Button.
- **Props:** `image?: string; title?: string; price?: string; saleText?: string; onAdd?: () => void`.
- **Render:** Card with a square image area (image or token-colored placeholder),
  optional sale Badge (`solid` variant) pinned top-left, title, price, and an
  "Agregar al carrito" Button (size `md`, full-width) in the footer.

### 3. Portfolio — `PortfolioHeader` (domain: portfolio)

Intro header. Maps to structure §6.1 (Portfolio Headers).

- **Primitives:** Avatar, Chip, Button.
- **Props:** `name?: string; role?: string; bio?: string; avatarSrc?: string; initials?: string; links?: { label: string; href: string }[]`.
- **Render:** centered column — Avatar (size `lg`), name (serif h1), role (secondary),
  bio (constrained max-width), a row of Chips for `links`, and a primary "Contacto"
  Button.

### 4. Images & Ads — `Story` (domain: images-ads)

Vertical 9:16 ad/social template. Maps to structure §7 (Stories).

- **Primitives:** Button.
- **Props:** `kicker?: string; title?: string; ctaLabel?: string; onCta?: () => void`.
- **Render:** fixed `aspect-ratio: 9 / 16`, `max-width: 360px`, full-bleed surface
  with vertical padding; kicker (uppercase label), large serif title, and a CTA
  Button anchored toward the bottom. Pure layout/visual, no behavior.

## registry.json

Add a `"domain"` field to every block. Keys stay flat and stable; `files` paths
point into the nested folders.

```jsonc
{
  "name": "moderno",
  "blocks": {
    "hero":             { "domain": "marketing",    "files": { "react": "blocks/marketing/hero/Hero.tsx", … } },
    "stats":            { "domain": "applications",  "files": { "react": "blocks/applications/stats/Stats.tsx", … } },
    "product-card":     { "domain": "ecommerce",     … },
    "portfolio-header": { "domain": "portfolio",     … },
    "story":            { "domain": "images-ads",    … }
  }
}
```

Each block keeps `description`, `dependencies: ["@moderno/{framework}"]`, `files`,
and `dest` (bare filename per framework) exactly like the current Hero entry.

## CLI

`packages/registry/bin/cli.mjs` — one change:

- `cmdList` groups output by `domain` (iterate blocks, bucket by `block.domain`,
  print a header per domain). Blocks without a `domain` fall under "otros".
- `cmdAdd` is unchanged: it already resolves `entry.files[framework]` paths
  verbatim, so nested paths work as-is. The Hero path string update is the only
  data change it sees.

## Verification

- `node packages/registry/bin/cli.mjs list` → blocks grouped by domain, all five present.
- `node packages/registry/bin/cli.mjs add stats --framework vue --dest /tmp/md-test`
  copies `Stats.vue`; repeat for one more framework/block to confirm path resolution.
- Each new block imports only exports confirmed to exist in all four framework packages.
- Existing Hero still resolves after the move (`add hero --framework react`).

## Why these choices

- **Group by domain** mirrors the structure doc's hierarchy, so the registry tree
  is self-documenting as the library grows.
- **One block per domain** is the minimum that makes the final folder shape real
  without over-investing before the pattern is validated.
- **All four frameworks** keeps the registry honest to Moderno's framework-agnostic
  promise — a block that only exists for React would be a hidden gap.
