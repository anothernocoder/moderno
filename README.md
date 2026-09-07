# Moderno

> **This repository is frozen. Moderno continues in [`anothernocoder/moderno-ds`](https://github.com/anothernocoder/moderno-ds)** — docs at **[moderno.style](https://moderno.style)**.
>
> The `@moderno-ui/*` packages published from here (`0.2.x`) are superseded by `0.3.0+` published from `moderno-ds`, which is a different library (Ark UI anatomy and a shadcn-style token contract instead of Zag.js and `md-*` classes). Nothing is released from this repo any more; its inventory of primitives, blocks, screens and flows is being re-implemented there (tracked in [moderno-ds#70](https://github.com/anothernocoder/moderno-ds/issues/70)). Once that is complete this repo will be archived.
>
> | Package from this repo | Use instead |
> | --- | --- |
> | `@moderno-ui/react`, `vue`, `svelte`, `solid`, `tokens` (`0.2.x`) | the same names at `0.3.0+` from `moderno-ds` |
> | `@moderno-ui/styles` | `@moderno-ui/css` |
> | `@moderno-ui/class-contract` | `@moderno-ui/core` |
> | `@moderno-ui/chart-core` | `@moderno-ui/charts-core` |
> | `@moderno-ui/registry` | `@moderno-ui/cli` (registry served from `moderno.style/r/`) |
> | `create-moderno-ui` | `npx @moderno-ui/cli init` |

Moderno is a token-driven design system that ships the same component in React, Vue, Svelte, and Solid — no reimplementation per framework. A single [Zag.js](https://zagjs.com) behavior core drives interaction logic, a shared `md-*` class contract drives markup, and one W3C DTCG token source drives styling, so every framework package renders pixel-identical, accessible components. The visual language follows the `DESIGN.md` spec adapted from Midday: monochrome dark theme, sharp corners, Hedvig Letters Serif for display/h1, Hedvig Letters Sans everywhere else.

Install it via npm, or copy individual blocks into your repo with the registry CLI (shadcn-style). Full installation steps, block usage, and API docs live on the docs site:

**https://anothernocoder.github.io/moderno/**

## Packages

| Package | Description |
| --- | --- |
| [`@moderno-ui/react`](packages/react) | Styled React components |
| [`@moderno-ui/vue`](packages/vue) | Styled Vue components |
| [`@moderno-ui/svelte`](packages/svelte) | Styled Svelte components |
| [`@moderno-ui/solid`](packages/solid) | Styled Solid components |
| [`@moderno-ui/registry`](packages/registry) | Copy-paste CLI that pulls a block's per-framework source into your repo |
| [`@moderno-ui/tokens`](packages/tokens) | Design tokens — framework-free CSS custom properties + W3C DTCG source |
| [`@moderno-ui/styles`](packages/styles) | Compiled component CSS — the framework-agnostic `md-*` class contract |
| [`@moderno-ui/class-contract`](packages/class-contract) | Single source for `md-*` class names and variant builders |
| [`@moderno-ui/chart-core`](packages/chart-core) | Framework-neutral chart geometry (d3-scale + d3-shape) |
| [`create-moderno-ui`](packages/create-moderno-ui) | Scaffolds a new project pre-wired with Moderno (Vite + React or Vite + Vue) |

## Repo layout

- **`DESIGN.md`** — source of truth for the visual language (Google `DESIGN.md` format, validated with `@google/design.md`).
- **`tokens.json`** — tokens in W3C DTCG format.
- **`packages/*`** — publishable per-framework libraries plus tokens, styles, and the registry CLI.
- **`apps/docs`** — live documentation (bilingual Starlight site).
