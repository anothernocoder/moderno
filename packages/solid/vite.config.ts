import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import solid from 'vite-plugin-solid'
import dts from 'vite-plugin-dts'

// src/styles.css is a re-export, not something index.tsx imports, so Vite's
// bundler never sees it. Copy it straight into dist/ so the package's
// `./styles.css` export keeps resolving after `files`/`exports` move to dist.
function copyStylesCss(): Plugin {
  return {
    name: 'copy-styles-css',
    closeBundle() {
      mkdirSync(resolve(__dirname, 'dist'), { recursive: true })
      copyFileSync(resolve(__dirname, 'src/styles.css'), resolve(__dirname, 'dist/styles.css'))
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
// solid-js and @zag-js/* are real published peer/runtime deps, so they're
// externalized rather than bundled. @moderno-ui/class-contract and
// @moderno-ui/chart-core are still unbuilt workspace packages (out of scope
// here) that ship raw .ts source — Vite/Rollup resolves and inlines their
// source directly into this bundle, the same way Vitest already does.
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
      external: (id) => id === 'solid-js' || id.startsWith('solid-js/') || id.startsWith('@zag-js/'),
      output: {
        preserveModules: false,
      },
    },
  },
  resolve: {
    conditions: ['solid'],
  },
})
