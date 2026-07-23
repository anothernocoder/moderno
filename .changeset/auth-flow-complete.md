---
"@moderno/registry": minor
---

Completes the **Auth** flow (ADR-0005) beyond its sign-in-only tracer: adds the `sign-up`,
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
