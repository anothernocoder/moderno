---
"@moderno-ui/react": patch
"@moderno-ui/vue": patch
"@moderno-ui/svelte": patch
"@moderno-ui/solid": patch
---

Add a `./tokens.css` subpath export to each framework package, re-exporting
`@moderno-ui/tokens/tokens.css`. `@moderno-ui/tokens` is a transitive
(non-peer) dependency, so under strict resolvers like pnpm it isn't
reachable from consumer app code — only npm's flat `node_modules` hoisting
happened to make `import '@moderno-ui/tokens/tokens.css'` resolve. Consumers
can now write `import '@moderno-ui/react/tokens.css'` (or `/vue`, `/svelte`,
`/solid`) instead, which works regardless of package manager or hoisting
behavior. The existing `@moderno-ui/tokens/tokens.css` import continues to
work unchanged.
