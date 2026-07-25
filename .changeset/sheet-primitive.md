---
"@moderno-ui/react": minor
"@moderno-ui/vue": minor
"@moderno-ui/svelte": minor
"@moderno-ui/solid": minor
"@moderno-ui/styles": minor
---

Add the **Sheet** primitive across all four frameworks — a slide-in side/bottom
drawer, a compositional variant of Dialog (ADR-0003) over the same Zag.js
`dialog` machine. Exposes `Sheet.Root`, `Sheet.Trigger`, `Sheet.Content` (with
a `side` prop: `right` | `left` | `top` | `bottom`), `Sheet.Title`, and
`Sheet.Close`, sharing one machine instance via context per framework. Adds
the `md-sheet-*` classes and slide-in/out animations to `@moderno-ui/styles`.
