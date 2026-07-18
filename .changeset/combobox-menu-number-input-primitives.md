---
"@moderno/react": minor
"@moderno/vue": minor
"@moderno/svelte": minor
"@moderno/solid": minor
"@moderno/styles": minor
---

Add three closed-prop primitives (ADR-0003) across all four frameworks:

- **Combobox** — searchable single-select over Zag.js's `combobox` machine. Takes
  `items` and filters them by label as the user types; emits `md-combobox-*` classes.
- **Menu** — pull-down of actions over Zag.js's `menu` machine. Takes `triggerLabel`
  and `items` (label + value), fires `onSelect` with the item's value; emits
  `md-menu-*` classes.
- **NumberInput** — numeric field with −/+ steppers over Zag.js's `number-input`
  machine, with min/max clamping and keyboard stepping; emits `md-number-input-*`
  classes.

Adds the matching token-driven CSS to `@moderno/styles`.
