---
"@moderno-ui/react": minor
"@moderno-ui/vue": minor
"@moderno-ui/svelte": minor
"@moderno-ui/solid": minor
"@moderno-ui/styles": minor
---

Add the **Splitter** primitive across all four frameworks — resizable panes with
draggable, keyboard-accessible resize triggers, a closed-prop primitive (ADR-0003) over
Zag.js's `splitter` machine. Takes a `panels` array of ids and size constraints
(`minSize`/`maxSize`/`collapsedSize`/`collapsible`/`resizeBehavior`), plus
`orientation`, `size`/`defaultSize`, `onResize`/`onResizeStart`/`onResizeEnd`,
`keyboardResizeBy`, and `resizeTriggerLabel` for a localized a11y label. Panel content
is provided the idiomatic way per framework: `children` on each panel (React/Solid) or
a slot/snippet named after the panel `id` (Vue/Svelte). Adds the `md-splitter-*`
classes to `@moderno-ui/styles`.
