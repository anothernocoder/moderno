---
"create-moderno-ui": minor
---

Adds a Vue+Vite template alongside the existing React+Vite one. The framework prompt now
offers `react` and `vue`; choosing `vue` (or passing `--framework vue`) scaffolds a Vite + Vue
project with `@moderno-ui/vue` and `@moderno-ui/tokens` installed, the generated `src/main.ts`
importing both CSS files, and `data-theme="dark"` set on the generated `index.html`. The React
path is unchanged.
