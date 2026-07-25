---
"@moderno-ui/react": minor
"@moderno-ui/vue": minor
"@moderno-ui/svelte": minor
"@moderno-ui/solid": minor
"@moderno-ui/styles": minor
---

Add the **Alert** primitive across all four frameworks — inline feedback
(info/success/warning/error), a display-only, closed-prop primitive (ADR-0003)
mirroring Callout's structure with `role="alert"` instead of `role="note"`. No
Zag machine. Takes `variant`, an optional `title`, and body content. Adds the
`md-alert-*` classes to `@moderno-ui/styles`.
