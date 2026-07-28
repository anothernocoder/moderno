import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import solid from 'vite-plugin-solid'
import dts from 'vite-plugin-dts'

// src/styles.css and src/tokens.css are re-exports, not something index.tsx
// imports, so Vite's bundler never sees them. Copy them straight into dist/
// so the package's `./styles.css`/`./tokens.css` exports keep resolving after
// `files`/`exports` move to dist.
function copyStylesCss(): Plugin {
  return {
    name: 'copy-styles-css',
    closeBundle() {
      mkdirSync(resolve(__dirname, 'dist'), { recursive: true })
      for (const file of ['styles.css', 'tokens.css']) {
        copyFileSync(resolve(__dirname, `src/${file}`), resolve(__dirname, `dist/${file}`))
      }
    },
  }
}

// Library build for @moderno-ui/solid.
//
// vite-plugin-solid is required (not esbuild's default JSX transform) so
// `.tsx` sources compile through Solid's own babel-preset-solid. A generic
// JSX-to-`createElement` transform would silently produce components that
// re-render wholesale on every update instead of doing Solid's fine-grained,
// signal-driven DOM patching — the whole point of using Solid.
//
// solid-js, @zag-js/*, and @moderno-ui/* are all real, independently-built
// peer/runtime deps (class-contract/chart-core gained their own tsup build in
// issue #152 — turbo's `^build` ordering builds them before this package), so
// they all stay external rather than duplicating their compiled output
// inside dist/index.js.
export default defineConfig({
  plugins: [
    solid(),
    copyStylesCss(),
    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
      entryRoot: 'src',
      outDir: 'dist',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/vitest.d.ts', '**/vitest-setup.ts'],
      insertTypesEntry: true,
      rollupTypes: false,
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: (id) =>
        id === 'solid-js' || id.startsWith('solid-js/') || id.startsWith('@zag-js/') || id.startsWith('@moderno-ui/'),
      output: {
        preserveModules: false,
      },
    },
  },
  resolve: {
    conditions: ['solid'],
  },
})
