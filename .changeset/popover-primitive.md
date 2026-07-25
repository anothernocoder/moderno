---
"@moderno-ui/react": minor
"@moderno-ui/vue": minor
"@moderno-ui/svelte": minor
"@moderno-ui/solid": minor
"@moderno-ui/styles": minor
---

Add the **Popover** primitive across all four frameworks — an anchored, non-modal
panel built on Zag.js's `popover` machine (closed-prop, ADR-0003). Takes
`triggerLabel`, optional `title`, `content`, and `closeLabel`; renders its own
trigger button and a token-styled panel with an arrow and close button. Adds the
`md-popover-*` classes to `@moderno-ui/styles`.
