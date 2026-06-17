# Ark UI behavior core + split distribution for framework-agnostic Moderno

Status: superseded by ADR-0002 (behavior core is now Zag.js directly, not Ark UI). The
split-distribution decision below — primitives via npm, blocks via copy-paste registry,
compiled CSS + custom properties as the styling contract — still stands; only the
"Ark UI" core choice is reversed.

## Decision

Moderno becomes a framework-agnostic UI system for React, Vue, Svelte and Solid by
building on **Ark UI (Zag.js state machines)** as a single shared behavior + a11y
core, rather than maintaining four parallel component implementations. The public
styling contract is **compiled CSS + CSS custom properties** (theming via design
tokens and `data-theme`), with Tailwind kept internal to authoring only.
Distribution is **split by component profile**: interactive **primitives** ship as
versioned **npm packages** (`@moderno/tokens`, `@moderno/{react,vue,svelte,solid}`)
so accessibility/bug fixes propagate centrally; **blocks** (Hero, Pricing, app
shells) ship via a **copy-paste registry** so consumers fork layout freely. Native
mobile (iOS/Android) is **out of scope** for this library and shares only tokens.

## Context

Two constraints drove this: the library must deliver full interactive behavior +
accessibility across all four frameworks, and it is maintained by a solo / very
small team. That combination makes per-framework ports (4× shadcn/MUI) unsustainable
and rules out React-only options (Material UI, Base UI). Ark UI is the only mature
option giving one behavior core with official, API-parity adapters for exactly the
four target frameworks.

## Considered options

- **Web Components (Lit)** — one runtime, but we would own all behavior/a11y, with
  React<19 interop friction, harder SSR, and Tailwind-in-shadow-DOM problems.
- **Per-framework ports on native headless cores** (Radix/Reka/Bits/Kobalte) —
  maximum per-framework control, but four codebases of hard a11y logic for one
  maintainer.
- **Material UI / Base UI** — React-only; fail the agnostic requirement outright.

## Consequences

- Primitive behavior/a11y is outsourced to Ark UI; Moderno owns the look and a thin
  styled layer per framework. Upstream Ark releases are a dependency to track.
- Blocks intentionally do NOT get central updates once copied — that is the trade for
  layout customizability, and it is consistent with how primitives stay consistent.
- "Framework-agnostic" means the four web frameworks only; it is not a cross-platform
  promise.
