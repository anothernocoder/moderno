---
"create-moderno-ui": minor
---

Adds `create-moderno-ui` (ADR-0006, "Starter" tier), invoked via
`npm create moderno-ui@latest <target-dir> -- --framework react`: scaffolds a Vite+React
project pre-wired with Moderno. It shells out to `create-vite`'s `react-ts` template, then adds
`@moderno-ui/react` and `@moderno-ui/tokens` as dependencies, wires their CSS imports
(`@moderno-ui/tokens/tokens.css`, `@moderno-ui/react/styles.css`) into the generated entry
point, and sets `data-theme="dark"` on the generated `index.html`. No sample block/screen/flow
is copied in.

v1 only ships the React+Vite template — Vue support is a follow-up.
