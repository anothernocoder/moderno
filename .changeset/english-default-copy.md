---
"@moderno/react": minor
"@moderno/vue": minor
"@moderno/svelte": minor
"@moderno/solid": minor
---

Default component copy is now English instead of Spanish. `Dialog.closeLabel`
defaults to `Close`, `Spinner.label` to `Loading`, and `Select` placeholder to
`Select…`. `Chip` gains a `removeLabel` prop (default `Remove`) — its remove
button's `aria-label` was previously hardcoded and could not be translated.

Consumers relying on the old Spanish defaults should pass the corresponding prop
explicitly.
