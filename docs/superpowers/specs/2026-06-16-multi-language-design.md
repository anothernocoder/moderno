# Multi-language support — design

**Date:** 2026-06-16
**Status:** Approved, ready for implementation plan

## Problem

Two distinct gaps:

1. **Packages** — interactive primitives ship hardcoded Spanish default copy
   (`'Cerrar'`, `'Cargando'`, `'Selecciona…'`, `'Quitar'`). A framework-agnostic
   library distributed via npm should default to English so any consumer locale
   can override cleanly. Worse, Chip's remove-button label is hardcoded in the
   markup (`aria-label="Quitar"`) with no prop, so it cannot be translated at all.

2. **Docs (Astro Starlight site)** — all content is Spanish-only. The audience is
   both Hispanic and English-speaking; the docs must be bilingual (en + es).

These are independent workstreams and can be implemented and shipped separately.

## Workstream 1 — Package default copy → English

### Scope

Change the default value of built-in UI strings across all four framework
packages (`@moderno/react`, `@moderno/vue`, `@moderno/svelte`, `@moderno/solid`).

| Component | Prop | Before | After |
|---|---|---|---|
| Dialog | `closeLabel` | `'Cerrar'` | `'Close'` |
| Spinner | `label` | `'Cargando'` | `'Loading'` |
| Select | `placeholder` | `'Selecciona…'` | `'Select…'` |
| Chip | `removeLabel` (**new prop**) | `aria-label="Quitar"` hardcoded | `'Remove'` |

### Files

- React: `packages/react/src/{dialog,spinner,select,chip}.tsx`
- Vue: `packages/vue/src/{Dialog.vue,Spinner.vue,SelectTrigger.vue,Chip.vue}`
- Svelte: `packages/svelte/src/{Dialog.svelte,Spinner.svelte,SelectTrigger.svelte,Chip.svelte}`
- Solid: `packages/solid/src/{dialog,spinner,select,chip}.tsx`

### Decisions

- **Only new API surface = Chip `removeLabel?: string`** (default `'Remove'`), added
  in all four frameworks. The other three are existing props; only the default
  value changes.
- **Closed-prop philosophy intact** (ADR-0003): consumers still pass their own
  string to localize; only the *default* stops being Spanish. No i18n library,
  no locale context inside the packages — out of scope, YAGNI.
- **No test changes** — grep confirms no test/spec references the Spanish strings.
- **Changeset:** `minor` for all four packages (new Chip prop + visible default-copy
  change is a behavior change, not a patch).

### Verification

- The docs site renders these components; after changing defaults, the affected
  demo pages (dialog, spinner, select, chip) must show the English defaults where
  no explicit prop is passed.
- Chip's `removeLabel` must reach the rendered `aria-label` in all four frameworks.

## Workstream 2 — Docs bilingual (en root + es) via Starlight i18n

### Locale model

- **English = root locale** (no URL prefix). **Spanish = `/es/`.**
- Decided: English-root because the project default is English; the docs site is
  new, so breaking existing `/componentes/...` links is acceptable.
- Root/default locale must be complete — every page exists in English; Spanish
  pages fall back to English if missing (all will be present at launch).

### Starlight config (`apps/docs/astro.config.mjs`)

```js
starlight({
  // title stays "Moderno"; description translated to English
  defaultLocale: 'root',
  locales: {
    root: { label: 'English', lang: 'en' },
    es:   { label: 'Español', lang: 'es' },
  },
  sidebar: [ /* see below */ ],
})
```

Starlight then provides the language picker and fallback automatically.

### Content restructure (`apps/docs/src/content/docs/`)

Slugs renamed to English (same slug across locales, required by Starlight):

- `componentes/` → `components/`
- `introduccion/` → `introduction/` (`instalacion` → `installation`, `blocks` → `blocks`)
- `blocks/` → unchanged
- `index.mdx` → English at root, Spanish at `es/index.mdx`

Per page, two files with identical slug:

- Top level = **English** (translate prose + in-MDX demo `label="..."` strings from
  the current Spanish).
- `es/<slug>` = **Spanish** (move current content to the new English slug path,
  prose unchanged).

**Page inventory (29 root pages → 58 MDX files):**

- 21 components: accordion, avatar, badge, button, callout, card, checkbox, chip,
  dialog, divider, indicator, input, radio, select, skeleton, slider, spinner,
  tabs, textarea, toggle, tooltip
- 5 blocks: hero, portfolio-header, product-card, stats, story
- 2 intro: installation, blocks
- 1 index (Acerca de / About)

### Sidebar (`astro.config.mjs`)

Translate labels with `translations`; keep `autogenerate` (resolves per locale):

```js
sidebar: [
  { label: 'Introduction', translations: { es: 'Introducción' }, items: [
    { label: 'About Moderno', translations: { es: 'Acerca de Moderno' }, link: '/' },
    { label: 'Installation', translations: { es: 'Instalación' }, link: '/introduction/installation/' },
    { label: 'Blocks & registry', translations: { es: 'Blocks y registry' }, link: '/introduction/blocks/' },
  ]},
  { label: 'Components', translations: { es: 'Componentes' },
    items: [{ autogenerate: { directory: 'components' } }] },
  { label: 'Blocks', translations: { es: 'Blocks' },
    items: [{ autogenerate: { directory: 'blocks' } }] },
]
```

Explicit intro links updated to the new English slugs. Starlight prefixes `/es/`
for the Spanish locale automatically.

### Site UI chrome — `PageTitle.astro`

Currently hardcodes Spanish: `aria-label="Copiar como Markdown"`,
`title="Copiar como Markdown"`, `<span>Copiar Markdown</span>`, and JS
`'Copiado'` / `'Copiar Markdown'`.

- Add Starlight UI-strings collection: `apps/docs/src/content/i18n/en.json` +
  `es.json` with keys `copyMarkdown`, `copyMarkdownAria`, `copied`.
- Register the `i18n` collection in `apps/docs/src/content.config.ts`.
- `PageTitle.astro`: replace hardcoded strings with `Astro.locals.t('...')`; pass
  the `copied` label into the client `<script>` via a `data-*` attribute (the
  script runs client-side and cannot call `t()` directly).

### Site title/description

- `title` stays `'Moderno'` (brand, language-neutral).
- `description` → English in config; optional per-locale Spanish override via
  Starlight `<locale>.json` (`site.description`). Translate the description.

### Out of scope / known limitations

- **Shared demos** (`apps/docs/src/demos/*`) are code showcases, not prose. Any
  visible Spanish label inside a shared demo stays single-language; not worth
  parameterizing per locale. In-MDX inline demos (the majority) are translated as
  part of each page.
- No RTL / direction support — Spanish and English are both LTR.

### Alternative rejected

Hand-rolled i18n (manual routing + custom dictionary). Starlight ships native i18n
(language picker, fallback, UI-string translation); rolling our own adds
maintenance for zero gain.

## Verification (Workstream 2)

- `pnpm --filter @moderno/docs build` succeeds.
- Language picker appears; `/components/button` is English, `/es/components/button`
  is Spanish.
- Sidebar labels localize per locale.
- "Copy as Markdown" button chrome localizes (English at root, Spanish under `/es/`).
- No broken internal links after the slug rename (intro links, index).
