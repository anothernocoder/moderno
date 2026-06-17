# Zag.js directly as behavior core (not Ark UI)

Status: accepted (supersedes the core-technology choice in ADR-0001)

## Decision

Moderno's behavior core is **Zag.js consumed directly** via its per-framework adapters
(`@zag-js/{react,vue,svelte,solid}`), not the Ark UI component layer that sits on top of
Zag. Each `@moderno/{framework}` package hand-writes the component anatomy and wires
Zag's prop-getters (`api.getTriggerProps()` …) to its own `md-*` class contract. The
rest of ADR-0001 is unchanged: shared Zag state machines remain the single behavior +
a11y core, primitives ship as npm packages, blocks via copy-paste registry, and the
styling contract stays compiled CSS + CSS custom properties.

## Context

Ark UI is a thin component layer over the same Zag machines. Because Moderno ships its
own class contract and compiled CSS, it was already writing per-framework markup to
apply those classes — so Ark's main value (pre-built anatomy parts) is largely redundant
here. Dropping Ark removes a dependency and the Ark↔Zag version coupling, and gives full
control over the rendered DOM and class names. Zag confirmed to ship adapters for all
four target frameworks (React, Vue, Svelte, Solid), so the framework-agnostic promise is
preserved.

## Consequences

- Moderno hand-writes and maintains composition glue (Portal, presence/exit animation,
  collection wiring) per framework × 4 for overlay components (Dialog, Tooltip, Toast,
  Popover, Select). This is the cost Ark previously absorbed.
- Pure-CSS primitives (Button, Badge, Card, …) have no behavior core and touch neither
  Zag nor Ark.
- Tracking upstream Zag releases remains a dependency, as it was with Ark.
