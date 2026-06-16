# Hybrid component API shape (closed-prop by default, compositional where anatomy varies)

Status: accepted

## Decision

Moderno primitives expose a **hybrid API**. Most primitives are **closed-prop**: a single
component configured by props (`<Button variant size>`, `<Toggle checked>`), matching the
existing Button/Dialog ergonomics. A minority — those whose internal layout legitimately
varies per consumer — expose a **compositional anatomy** of parts (`<Tabs.Root>`,
`<Tabs.List>`, `<Tabs.Trigger>`, `<Tabs.Content>`). The compositional set is: **Tabs,
Accordion, Select, Date picker, Carousel, Sheet**. Everything else is closed-prop.

## Context

Two forces pull in opposite directions. A styled, opinionated design system wants
closed-prop components for consistency and low consumer effort — and, critically, less
hand-written glue across four frameworks (React/Vue/Svelte/Solid), which matters for a
small team consuming Zag directly. But some components have real per-consumer layout
variance (reordering tabs, custom triggers, mixed content) that a closed prop surface
strangles. An all-closed API frustrates those; an all-compositional API (Ark/Radix style)
maximizes flexibility but multiplies the per-framework parts to author and maintain ×4.

## Consequences

- A reader sees both styles in the same library; the split is intentional, not accidental.
  The rule is: compositional only when layout varies; closed otherwise.
- Reversing this once ~30 primitives × 4 frameworks exist is expensive — hence recorded.
- Closed-prop components may still offer escape hatches (slots / `class` passthrough)
  without becoming fully compositional.
