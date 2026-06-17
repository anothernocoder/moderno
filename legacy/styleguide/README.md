# Style guide legacy (Vite)

Prototipo **original** del design system Moderno: una app Vite + Tailwind v4 con
`index.html` (guía de estilo) y `playground.html` (flujo de chance:
números → modalidad → loterías → confirmación → ticket). Las islas React usan
[`sileo`](https://www.npmjs.com/package/sileo) (toasts) y
[`liveline`](https://www.npmjs.com/package/liveline) (chart en vivo).

> **Archivado.** Esto es anterior a la migración al monorepo pnpm + turbo. La
> documentación viva y los paquetes publicables están en `apps/docs` (Starlight)
> y `packages/*`. Este directorio se conserva solo como referencia.

## Correrlo

Vive fuera del workspace pnpm, así que se instala aislado:

```sh
cd legacy/styleguide
pnpm install --ignore-workspace
pnpm dev          # http://localhost:5173
```

- `/` → guía de estilo (`index.html`)
- `/playground.html` → flujo de chance

Toggle claro/oscuro en el header re-mapea los roles semánticos sin tocar componentes.
