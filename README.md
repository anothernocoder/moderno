# Moderno Design System

Token-driven design system basado en el `DESIGN.md` de Midday: monocromo oscuro, esquinas rectas, display + h1 en Hedvig Letters Serif y el resto en Hedvig Letters Sans.

## Contenido

- **`DESIGN.md`** — fuente de verdad (formato Google DESIGN.md, validado con `@google/design.md`).
- **`tokens.json`** — tokens en formato W3C DTCG.
- **`packages/*`** — librerías publicables por framework (React, Vue, Svelte, Solid) + tokens y estilos.
- **`apps/docs`** — documentación viva (Starlight bilingüe).
- **`legacy/styleguide/`** — style guide visual original (Vite + Tailwind v4) con un playground del flujo de compra de chance. Archivado como referencia (pre-monorepo).

## Style guide legacy

```bash
cd legacy/styleguide
pnpm install --ignore-workspace
pnpm dev         # http://localhost:5173
```

`index.html` es la guía de estilo; `playground.html` el flujo de chance (números → modalidad → loterías → confirmación → ticket). Toggle claro/oscuro en el header re-mapea los roles semánticos sin tocar los componentes. Ver [`legacy/styleguide/README.md`](legacy/styleguide/README.md).
