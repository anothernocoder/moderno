---
"@moderno/react": minor
"@moderno/vue": minor
"@moderno/svelte": minor
"@moderno/solid": minor
"@moderno/styles": minor
---

Add the **Toast** primitive across all four frameworks — transient, non-blocking
notifications over Zag.js's `toast` machine. Closed-prop (ADR-0003): create a
`toaster` store once with `createToaster`, mount a single `<Toaster>` region for
it, then call `toaster.create(...)` from anywhere to show a notification.
Stacking, auto-dismiss timers, pause-on-hover/focus, and ARIA (`role="status"`,
a live region) come from Zag. Adds the `md-toast-*` classes to `@moderno/styles`.
