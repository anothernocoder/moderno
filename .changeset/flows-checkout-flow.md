---
"@moderno/registry": minor
---

Adds the **Checkout** flow (ADR-0005) — the E-Commerce domain capstone, and the first flow
whose screens themselves `composes` existing registry **blocks** rather than only primitives,
exercising the CLI's recursive `composes` resolution end-to-end (flow → screen → block).

Ships five presentational screens under a new `ecommerce` screens domain — `cart`, `shipping`,
`payment`, `review`, `confirmation` — across React, Vue, Svelte and Solid. `cart` composes the
`shopping-cart` block; `shipping` and `payment` both compose `checkout-forms` (which bundles
address + payment into a single form — `shipping` is where the user fills it in, `payment`
re-surfaces the same block pre-filled to review/adjust the card before continuing); `review`
composes `order-summaries` for the read-only items/subtotal/shipping/tax/total breakdown, plus
its own simple shipping/payment recap text; `confirmation` needs no block and composes only the
Button primitive. `cart` is also addable standalone (`moderno add cart`), reused outside the
checkout journey.

`Checkout.example.{ext}` assembles the full journey per framework using idiomatic local state: a
local `step` union across all five screens, and the cart items / checkout values carried forward
between them (no router, no state library). `moderno add checkout --framework <fw>` transitively
copies the five screens plus the three composed blocks (`shopping-cart`, `checkout-forms`,
`order-summaries`, deduped) and the example assembly; primitives stay an `@moderno/<framework>`
npm dependency and are never copied. Adds a bilingual `checkout` flow docs page (EN + `/es/`) and
CLI/registry tests covering the transitive composition, the standalone `cart` add, `--no-example`,
and per-framework file existence.
