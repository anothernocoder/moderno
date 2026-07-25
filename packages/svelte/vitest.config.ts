import { defineConfig, configDefaults } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    // `.svelte-kit/__package__` is @sveltejs/package's scratch dir (see `build`
    // script) — it holds a full compiled copy of src/, including *.test.js.
    // Without this exclude, vitest picks those up too and runs every test twice.
    exclude: [...configDefaults.exclude, '.svelte-kit/**'],
  },
  resolve: {
    conditions: process.env.VITEST ? ['browser'] : [],
  },
})
