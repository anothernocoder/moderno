# @moderno-ui/registry

## 0.2.0

### Minor Changes

- 96f4d98: Completes the **Auth** flow (ADR-0005) beyond its sign-in-only tracer: adds the `sign-up`,
  `forgot-password`, `reset-password` and `verify` screens across React, Vue, Svelte and Solid,
  each presentational with a typed `values`/`onChange`/`onSubmit` wiring contract (plus
  flow-specific navigation callbacks like `onSignUp`/`onSignIn`/`onBack`/`onResend`), no internal
  state and no router. The `auth` flow's `composes` grows to
  `["sign-in", "sign-up", "forgot-password", "reset-password", "verify"]`.

  `Auth.example.{ext}` now assembles the full journey per framework using idiomatic local state: a
  sign-in↔sign-up toggle, a forgot-password branch that verifies a one-time code before letting the
  user pick a new password, and the email address carried forward from sign-up/forgot-password into
  the verify screen. Each example also accepts an optional `initialStep` string prop so the docs
  demo can drive individual screens across the Astro-island boundary. Updates the bilingual `auth`
  flow docs page to demo the full journey plus each screen individually, and the CLI/registry tests
  to cover the five-screen flow.

- 3a0fac4: Adds the **Checkout** flow (ADR-0005) — the E-Commerce domain capstone, and the first flow
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
  `order-summaries`, deduped) and the example assembly; primitives stay an `@moderno-ui/<framework>`
  npm dependency and are never copied. Adds a bilingual `checkout` flow docs page (EN + `/es/`) and
  CLI/registry tests covering the transitive composition, the standalone `cart` add, `--no-example`,
  and per-framework file existence.

- b7216ac: Adds the **Onboarding** flow (ADR-0005) — the Applications domain capstone: welcome, profile
  setup, workspace/plan selection and invite team, with a local-state example assembly.

  Ships four presentational screens under the existing `applications` screens domain — `welcome`,
  `profile-setup`, `plan-select`, `invite-team` — across React, Vue, Svelte and Solid. `welcome`
  needs no block and composes only the Button primitive (the same allowance the Checkout flow's
  `confirmation` screen used); `profile-setup` composes the `form-layouts` block; `plan-select`
  composes the `grid-lists` block, repurposing its title/subtitle/status-badge tile layout for plan
  pricing cards (picking a tile fires the block's `onItemAction`, forwarded straight through
  `onNext` since GridLists carries no internal state of its own); `invite-team` composes the `list`
  block for the invited-member rows, alongside its own simple email-invite form (no dedicated
  "invite by email" block exists to compose). `welcome` is also addable standalone with no composed
  block at all.

  `Onboarding.example.{ext}` assembles the full journey per framework using idiomatic local state: a
  local `step` union across all four screens, and the profile values / selected plan / invites list
  carried forward between them (no router, no state library). `moderno add onboarding --framework
<fw>` transitively copies the four screens plus the three composed blocks (`form-layouts`,
  `grid-lists`, `list`) and the example assembly; primitives stay an `@moderno-ui/<framework>` npm
  dependency and are never copied. Adds a bilingual `onboarding` flow docs page (EN + `/es/`) and
  CLI/registry tests covering the transitive composition, the standalone `welcome` add (no composed
  block), the standalone `profile-setup`/`plan-select`/`invite-team` adds (each transitively pulling
  its own composed block), `--no-example`, and per-framework file existence.

- bfe24d0: Adds the **Share and Invite** block (design system §2.3 "Data display") and the **Referral** flow
  (ADR-0005) — the cross-domain capstone spanning Applications and Marketing.

  `share-invite` ships under the existing `marketing` blocks domain across React, Vue, Svelte and
  Solid: a shareable link with a copy action, a row of channel/social share buttons, and an
  email-invite form with a list of pending invites. It's purely presentational — no clipboard access
  or async logic lives in the block, just callbacks (`onCopyLink`, `onShare`, `onInvite`) the
  consumer wires up. It's addable standalone (`moderno add share-invite --framework <fw>`) with no
  block dependencies of its own.

  Ships three presentational screens under the existing `applications` screens domain —
  `referral-invite`, `referral-share`, `referral-reward` — across all four frameworks.
  `referral-invite` needs no block and composes only the Input/Button primitives for its "start your
  referral" form, the same allowance the Onboarding flow's `welcome` screen used; `referral-reward`
  is the same, composing only the Badge/Button primitives for its one-off reward/claim summary;
  `referral-share` composes the new Marketing `share-invite` block instead of re-implementing the
  link/channels/invite UI — the first screen in the registry whose composed block crosses domains
  (an Applications-domain screen composing a Marketing-domain block), exercising the CLI's
  domain-agnostic recursive `composes` resolution.

  `Referral.example.{ext}` assembles the full journey per framework using idiomatic local state: a
  local `step` union across all three screens, and the referrer's name / generated share link /
  growing invites list carried forward between them (no router, no state library). `moderno add
referral --framework <fw>` transitively copies the three screens plus the composed `share-invite`
  block and the example assembly; primitives stay an `@moderno-ui/<framework>` npm dependency and are
  never copied. Adds a bilingual `referral` flow docs page (EN + `/es/`) plus a standalone
  `share-invite` block docs page, and CLI/registry tests covering the cross-domain transitive
  composition, the standalone `share-invite` block add, the standalone `referral-invite`/
  `referral-share` (transitively pulling `share-invite`)/`referral-reward` screen adds,
  `--no-example`, and per-framework file existence.

- 83f5bb4: Add the **Flows** delivery tier (ADR-0005) and its pilot tracer, **Auth** (sign-in
  only). `registry.json` gains `screens` and `flows` maps alongside `blocks`; the CLI
  resolves a flow's `composes` recursively (flow → screens → blocks), dedups by name,
  and copies the referenced screens/blocks plus the flow's example assembly — primitives
  stay npm deps and are never copied. `moderno add <flow>` prints what it pulled and
  accepts `--no-example` to skip the assembly; `moderno add <screen>` still works
  standalone. `moderno list` groups blocks, screens and flows into separate sections.

  Ships the `sign-in` screen (presentational, typed `values`/`onChange`/`onSubmit`
  wiring contract, no internal state or router) and the `Auth.example.{ext}` assembly
  (thin, framework-idiomatic local `step` state, no router dependency) across React,
  Vue, Svelte and Solid, composing the Input, Checkbox, Divider and Button primitives.
  Adds a bilingual docs flow page with a 4-framework live demo.
