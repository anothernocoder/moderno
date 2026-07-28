---
"@moderno-ui/styles": patch
---

Self-hosts the Hedvig Letters Sans/Serif faces that `--md-font-sans`/`--md-font-serif`
(from `@moderno-ui/tokens`) reference. `styles.css` now ships `@font-face` rules plus the
regular-weight, Latin-subset `.woff2` files (SIL Open Font License 1.1) under
`src/fonts/`, so a fresh install renders the intended typeface out of the box with no
Google Fonts `<link>` and no extra step in the installation guide.
