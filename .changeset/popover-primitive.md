---
"@moderno/react": minor
"@moderno/vue": minor
"@moderno/svelte": minor
"@moderno/solid": minor
"@moderno/styles": minor
---

Add the **Popover** primitive across all four frameworks — an anchored, non-modal
panel built on Zag.js's `popover` machine (closed-prop, ADR-0003). Takes
`triggerLabel`, optional `title`, `content`, and `closeLabel`; renders its own
trigger button and a token-styled panel with an arrow and close button. Adds the
`md-popover-*` classes to `@moderno/styles`.
