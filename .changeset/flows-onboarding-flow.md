---
"@moderno/registry": minor
---

Adds the **Onboarding** flow (ADR-0005) — the Applications domain capstone: welcome, profile
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
`grid-lists`, `list`) and the example assembly; primitives stay an `@moderno/<framework>` npm
dependency and are never copied. Adds a bilingual `onboarding` flow docs page (EN + `/es/`) and
CLI/registry tests covering the transitive composition, the standalone `welcome` add (no composed
block), the standalone `profile-setup`/`plan-select`/`invite-team` adds (each transitively pulling
its own composed block), `--no-example`, and per-framework file existence.
