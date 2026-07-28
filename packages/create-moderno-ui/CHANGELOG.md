# create-moderno-ui

## 0.2.0

### Minor Changes

- 2c399f0: Adds `create-moderno-ui` (ADR-0006, "Starter" tier), invoked via
  `npm create moderno-ui@latest <target-dir> -- --framework react`: scaffolds a Vite+React
  project pre-wired with Moderno. It shells out to `create-vite`'s `react-ts` template, then adds
  `@moderno-ui/react` and `@moderno-ui/tokens` as dependencies, wires their CSS imports
  (`@moderno-ui/tokens/tokens.css`, `@moderno-ui/react/styles.css`) into the generated entry
  point, and sets `data-theme="dark"` on the generated `index.html`. No sample block/screen/flow
  is copied in.

  v1 only ships the React+Vite template — Vue support is a follow-up.

- 6013846: Adds a Vue+Vite template alongside the existing React+Vite one. The framework prompt now
  offers `react` and `vue`; choosing `vue` (or passing `--framework vue`) scaffolds a Vite + Vue
  project with `@moderno-ui/vue` and `@moderno-ui/tokens` installed, the generated `src/main.ts`
  importing both CSS files, and `data-theme="dark"` set on the generated `index.html`. The React
  path is unchanged.
