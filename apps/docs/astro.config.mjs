import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import react from '@astrojs/react'
import vue from '@astrojs/vue'
import svelte from '@astrojs/svelte'
import solid from '@astrojs/solid-js'

// React and Solid both compile .tsx — route each integration to its own
// source globs via include so JSX is compiled with the right pragma.
export default defineConfig({
  integrations: [
    starlight({
      title: 'Moderno',
      description:
        'Sistema de diseño agnóstico al framework: un comportamiento (Zag.js) y un look (tokens) para React, Vue, Svelte y Solid.',
      customCss: ['./src/styles/moderno-theme.css'],
      components: {
        PageTitle: './src/components/PageTitle.astro',
      },
      sidebar: [
        {
          label: 'Introducción',
          items: [
            { label: 'Acerca de Moderno', link: '/' },
            { label: 'Instalación', link: '/introduccion/instalacion/' },
            { label: 'Blocks y registry', link: '/introduccion/blocks/' },
          ],
        },
        {
          label: 'Componentes',
          items: [{ autogenerate: { directory: 'componentes' } }],
        },
      ],
    }),
    react({ include: ['**/packages/react/**', '**/@moderno/react/**', '**/demos/react/**'] }),
    solid({
      include: ['**/packages/solid/**', '**/@moderno/solid/**', '**/demos/solid/**'],
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
      ],
    },
  },
})
