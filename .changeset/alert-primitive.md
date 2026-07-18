---
"@moderno/react": minor
"@moderno/vue": minor
"@moderno/svelte": minor
"@moderno/solid": minor
"@moderno/styles": minor
---

Add the **Alert** primitive across all four frameworks — inline feedback
(info/success/warning/error), a display-only, closed-prop primitive (ADR-0003)
mirroring Callout's structure with `role="alert"` instead of `role="note"`. No
Zag machine. Takes `variant`, an optional `title`, and body content. Adds the
`md-alert-*` classes to `@moderno/styles`.
