import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import react from '@astrojs/react'
import vue from '@astrojs/vue'
import svelte from '@astrojs/svelte'
import solid from '@astrojs/solid-js'

// React and Solid both compile .tsx — route each integration to its own
// source globs via include so JSX is compiled with the right pragma.
// Set by the GitHub Pages workflow so the site builds under its project
// subpath (e.g. https://<user>.github.io/moderno/). Left undefined for local
// dev, where the site is served from the root.
const site = process.env.DOCS_SITE || undefined
const base = process.env.DOCS_BASE || undefined

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: 'Moderno',
      description:
        'Framework-agnostic design system: one behavior (Zag.js) and one look (tokens) for React, Vue, Svelte and Solid.',
      customCss: ['./src/styles/moderno-theme.css'],
      components: {
        PageTitle: './src/components/PageTitle.astro',
      },
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        es: { label: 'Español', lang: 'es' },
      },
      sidebar: [
        {
          label: 'Introduction',
          translations: { es: 'Introducción' },
          items: [
            { label: 'About Moderno', translations: { es: 'Acerca de Moderno' }, link: '/' },
            {
              label: 'Installation',
              translations: { es: 'Instalación' },
              link: '/introduction/installation/',
            },
            {
              label: 'Blocks & registry',
              translations: { es: 'Blocks y registry' },
              link: '/introduction/blocks/',
            },
          ],
        },
        {
          label: 'Components',
          translations: { es: 'Componentes' },
          items: [{ autogenerate: { directory: 'components' } }],
        },
        {
          label: 'Blocks',
          translations: { es: 'Blocks' },
          items: [{ autogenerate: { directory: 'blocks' } }],
        },
      ],
    }),
    // Block sources live in @moderno/registry; route their .tsx to React and
    // .solid.tsx to Solid. React must exclude the Solid variant since both
    // integrations transform .tsx.
    react({
      include: [
        '**/packages/react/**',
        '**/@moderno/react/**',
        '**/demos/react/**',
        '**/registry/blocks/**/*.tsx',
      ],
      exclude: ['**/*.solid.tsx'],
    }),
    solid({
      include: [
        '**/packages/solid/**',
        '**/@moderno/solid/**',
        '**/demos/solid/**',
        '**/registry/blocks/**/*.solid.tsx',
      ],
    }),
    vue(),
    svelte(),
  ],
  vite: {
    // Force a single instance of each framework runtime so Zag's context
    // (provided in @moderno/* components) reaches the components in the app tree.
    resolve: {
      dedupe: ['vue', 'solid-js', 'svelte', 'react', 'react-dom'],
    },
    // Keep the Zag Solid adapter as native ESM. esbuild pre-bundling flattens
    // its circular imports and can reorder `send` below its closure, causing a
    // "Cannot access 'send' before initialization" TDZ on hydration.
    optimizeDeps: {
      exclude: ['@zag-js/solid'],
    },
    ssr: {
      noExternal: [
        '@moderno/tokens',
        '@moderno/styles',
        '@moderno/react',
        '@moderno/vue',
        '@moderno/svelte',
        '@moderno/solid',
        '@moderno/registry',
      ],
    },
  },
})
