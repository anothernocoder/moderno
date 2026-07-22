---
"@moderno/registry": minor
---

Add the **Flows** delivery tier (ADR-0005) and its pilot tracer, **Auth** (sign-in
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
