---
"@moderno/registry": minor
---

Adds the **Share and Invite** block (design system §2.3 "Data display") and the **Referral** flow
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
block and the example assembly; primitives stay an `@moderno/<framework>` npm dependency and are
never copied. Adds a bilingual `referral` flow docs page (EN + `/es/`) plus a standalone
`share-invite` block docs page, and CLI/registry tests covering the cross-domain transitive
composition, the standalone `share-invite` block add, the standalone `referral-invite`/
`referral-share` (transitively pulling `share-invite`)/`referral-reward` screen adds,
`--no-example`, and per-framework file existence.
