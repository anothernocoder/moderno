# Moderno Design System

Token-driven design system basado en el `DESIGN.md` de Midday: monocromo oscuro, esquinas rectas, display + h1 en Hedvig Letters Serif y el resto en Hedvig Letters Sans.

## Contenido

- **`DESIGN.md`** — fuente de verdad (formato Google DESIGN.md, validado con `@google/design.md`).
- **`tokens.json`** — tokens en formato W3C DTCG.
- **`tailwind.config.js`** — los tokens exportados a Tailwind.
- **`styleguide/`** — style guide visual (Vite + Tailwind v4) con todos los componentes de [`Moderno-Design-System-Structure.md`](Moderno-Design-System-Structure.md), más un playground del flujo de compra de chance.

## Style guide

```bash
cd styleguide
npm install
npm run dev      # http://localhost:5173
```

`index.html` es la guía de estilo; `playground.html` el flujo de chance (números → modalidad → loterías → confirmación → ticket). Toggle claro/oscuro en el header re-mapea los roles semánticos sin tocar los componentes.
