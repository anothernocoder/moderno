# Flows: presentational screens + thin example assembly, composed via the registry

Status: accepted

## Decision

Moderno adds a third copy-paste delivery tier above blocks: **Flows**. A [[flow]] is a
connected set of [[screen]]s forming one user journey (Auth, Checkout, Onboarding,
Referral); a [[screen]] is a full view composed of [[block]]s; the stack is
**Block → Screen → Flow**. `flows` is a cross-domain category, a sibling to the
[[domain]]s, not a domain itself.

Screens ship **presentational**: each is a standalone component with a typed wiring
contract (`values`, `onChange`, `onSubmit`, `onNext`/`onBack`) and **no router or state
library**. Navigation and shared state are the consumer's job. Each flow additionally
ships **one thin example assembly per framework** — `{Flow}.example.{ext}` — that stitches
its screens using that framework's *idiomatic local state* (useState / ref / store /
signal) and a local `step` variable for navigation, with **no router dependency**. The
example is a runnable demo and a copy-paste starting point, not the product.

Delivery follows the existing block model and `--md-*` token convention: screens use
inline styles reading `var(--md-*)` and import primitives from `@moderno/{framework}`
(which carry the class contract internally); no legacy utility classes. The
[[registry]] gains `screens` and `flows` maps alongside `blocks`. A flow declares
`composes: [...]`; the CLI resolves `composes` **recursively** (flow → screens → blocks),
dedups by name, copies the referenced screens + blocks + the example, and leaves
**primitives as npm deps** (never copied). `add <screen>` and `add <block>` still work
standalone.

The delivery unit is the **flow**: every screen ×4 frameworks + the example ×4, **one
bilingual MDX page per flow**, **one changeset per flow**, **one PR per flow**. Flows are
**interleaved** — each ships as the capstone right after its domain's blocks land (Auth
after Applications, Checkout after E-Commerce); Referral ships last (cross-domain). **Auth
is the pilot**, since its screens are almost pure primitives and need no unbuilt blocks.

## Context

The request was to mine `legacy/` for blocks by domain *and* add a `flows` section of
complete multi-screen journeys (auth, checkout, cart, referral). The structure doc
already lists these as flat "example pages/screens" (§4.8, §5.2); a flow is richer —
multi-screen with transitions and carried state.

The hard part is the **framework-agnostic + copy-paste-presentational** constraint.
Moderno deliberately has no router and no state library; primitives get behavior from
Zag ([[behavior-core]]), blocks are "low behavior, high layout." A batteries-included
runnable flow would bolt router/state opinions into a system that has none and would
cost 4× to maintain. A pure wiring-contract-only flow wouldn't run for demos or give a
real starting point. The thin example assembly threads the needle: screens stay pure and
editable, the journey still runs via local `step` state with zero shared runtime, and
the docs demo drives screens through **string props** (the Astro-island boundary
serializes to JSON, so node/state props don't cross it).

## Consequences

- Screens are pure and editable; the wiring contract (`values`/`onChange`/`onSubmit`/
  `onNext`/`onBack`) becomes public API consumers depend on — hard to change later.
- The CLI grows recursive `composes` resolution (flow → screens → blocks, dedup by
  name). `add <flow>` can copy many files; it prints what it pulled, and granular
  `add <screen>`/`add <block>` remain.
- Reuse lives in the registry *source* (cart is one screen referenced by Checkout and
  addable alone) even though consumer-side copies are independent.
- Flows are a forcing function on block API quality: if a screen can't reuse a block
  cleanly, the block's shape is wrong — a useful signal.
- Native mobile flows, emails, and the Subscription/Paywall flow are out of scope for
  this tier for now; the example assembly carries no router by design, so deep-link /
  URL-state journeys are left to the consumer.
