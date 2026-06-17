import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        playground: 'playground.html',
      },
    },
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
  },
})
