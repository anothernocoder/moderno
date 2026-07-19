---
"@moderno/react": minor
"@moderno/vue": minor
"@moderno/svelte": minor
"@moderno/solid": minor
"@moderno/styles": minor
---

Add the **Carousel** primitive across all four frameworks — a horizontally (or
vertically) sliding gallery built on Zag.js's `carousel` machine using native CSS
scroll-snap. A **compositional** primitive (ADR-0003): `Carousel.Root` (takes the
required `slideCount`, plus `orientation`, `page`/`defaultPage`, `onPageChange`, `loop`,
`slidesPerPage`, `slidesPerMove`, `autoSize`, `allowMouseDrag`, `autoplay`, `spacing`,
`padding`, `translations`), `Carousel.ItemGroup`, `Carousel.Item`, `Carousel.Control`,
`Carousel.PrevTrigger`, `Carousel.NextTrigger`, `Carousel.IndicatorGroup` (a render
function / scoped slot / parameterized snippet called per snap point), and
`Carousel.Indicator`. Adds the `md-carousel-*` classes to `@moderno/styles`.
