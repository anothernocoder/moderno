# Moderno

Moderno is a token-driven, framework-agnostic design system: it delivers styled,
accessible, interactive components consumable from React, Vue, Svelte and Solid.
Its visual language (sharp corners, monochrome, Hedvig type) is the default
[[theme]], not an invariant — consumers may re-theme it to their own brand.

## Language

**Moderno**:
The design system itself — its foundations (tokens) plus its component library.
_Avoid_: styleguide, theme, kit.

**Foundation**:
A primitive design decision (color, type, spacing, radius, elevation, border, icon)
expressed as a token and referenced by semantic role, never hard-coded in a component.
_Avoid_: variable, setting.

**Token**:
A named design value in W3C DTCG format (`tokens.json`), surfaced to consumers as a
CSS custom property. The source of truth for the look.
_Avoid_: var, constant.

**Semantic role**:
An intent-based token name (`color/text/primary`, `border-default`) that components
consume; the swap layer for theming (light/dark, re-skin).
_Avoid_: alias, mapping.

**Theme**:
A named, complete assignment of values to the [[semantic-role]]s — Moderno's look
(sharp corners, monochrome, Hedvig) is just the default one. Created from curated
knobs (brand color, neutrals, type, radius, density, light/dark) that write
semantic roles, never one-off values; authored themes ship as starting points.
Exported as DTCG tokens plus generated CSS custom properties.
_Avoid_: skin, palette, style, branding.

**Class contract**:
The machine-readable set of `md-*` class names — and the variant/size composition
that builds them (`md-btn` + `md-btn--${variant}`) — that the [[styled-layer]] applies
to markup and `styles.css` realizes as rules. The seam between the rendered DOM and the
look. Owned once (`@moderno-ui/class-contract`) so a rename is one edit, not five, and
generated CSS selectors are guaranteed to match the names the frameworks emit. Distinct
from [[semantic-role]], which names token values, not component classes.
_Avoid_: classnames, BEM, css contract, stylesheet API.

**Consumer**:
A project (React/Vue/Svelte/Solid app) that installs and uses Moderno. The audience
of the library.
_Avoid_: client, user, app.

**Framework-agnostic**:
For Moderno, "one behavior + one look defined once, usable from all four target
frameworks" — NOT "four parallel implementations that happen to look alike".
_Avoid_: cross-platform, universal, portable.

**Behavior core**:
The framework-neutral interaction + accessibility logic of a component (keyboard,
focus, ARIA, state), kept in one place and shared across frameworks. For Moderno it
is Zag.js — the state machines consumed directly via their per-framework adapters,
without the Ark UI component layer on top.
_Avoid_: logic, headless, Ark.

**Styled layer**:
The thin, per-framework Moderno code that applies tokens/look to the behavior core
and exposes a component to a consumer.
_Avoid_: wrapper, adapter, skin.

**Chart core**:
The framework-neutral charting math (scales + shape/path generators, d3-scale +
d3-shape) shared across frameworks, the charting analogue of the [[behavior-core]].
Each framework renders its output as token-driven SVG. _Avoid_: chart library,
plotting engine, viz lib.

**Primitive**:
A single interactive or display component (Button, Combobox, Dialog, Tabs…),
backed by the [[behavior-core]] and styled by the [[styled-layer]]. Shipped via
versioned npm packages so a11y/bug fixes propagate centrally.
_Avoid_: widget, element, control.

**Block**:
A composition of primitives + layout (Hero, Pricing, Footer, app shell). Low
behavior, high layout-customization need. Delivered by copy-paste, not npm.
_Avoid_: section, template, pattern, module.

**Registry**:
The copy-paste delivery channel for blocks — a CLI pulls a block's per-framework
source into the consumer's own repo to edit freely. Distinct from npm packages.
_Avoid_: catalog, store, repo.

**Starter**:
The third distribution channel, alongside [[primitive]] (npm) and [[registry]]
(copy-paste): a brand-new project scaffold, pre-integrated with Moderno — framework
package installed, tokens/styles imported, theme set — delivered by the standalone
`create-moderno` package (`npm create moderno@latest`). Unlike the [[registry]], which
adds pieces to a project that already exists, a Starter creates the project itself.
_Avoid_: scaffold, boilerplate, template, kit.

**Screen**:
A full single view composed of [[block]]s (a sign-in screen, a dashboard home, a
cart screen). One step in a [[flow]]. Larger than a block, smaller than a flow.
The structure doc's "example pages / example screens" are Screens.
_Avoid_: page, view, layout, example.

**Flow**:
A connected set of [[screen]]s forming one user journey, with the navigation and
shared state that links them (auth = sign-in + sign-up + forgot-password + verify;
checkout = cart + shipping + payment + confirmation). The third delivery tier above
[[block]]; cuts across [[domain]]s rather than living inside one. Delivered by
copy-paste via the [[registry]].
_Avoid_: funnel, wizard, journey, sequence, example page.

**Playground**:
Moderno's interactive surface — one app, two runtimes. Hosted (public, static,
part of the product): browse and compose registry inventory, edit themes, toggle
viewport, export. Local (`npx @moderno-ui/registry playground`, run inside a repo): the same UI
plus generation — it can drive the user's own coding agent to produce variant
source files in that repo. Generation capabilities light up only in the local
runtime.
_Avoid_: editor, builder, studio, demo site.

**Prototype**:
The saveable, shareable unit of [[playground]] work: a composition (which
[[screen]]s/[[flow]], which [[block]]s in what order, chosen variants and edited
content, viewport) plus the [[theme]] applied to it. Replaces a wireframe.
Serialized as a shareable link and as a JSON file; exports (HTML, prompt) are
derived outputs, not part of the Prototype itself.
_Avoid_: preset, snapshot, draft, design, mockup, wireframe.

**Domain**:
A product-type grouping of [[block]]s and [[screen]]s — Marketing, Applications,
E-Commerce, Portfolio, Images & Ads. The folder axis under the [[registry]]. A
[[flow]] is NOT a domain; it is a cross-domain category alongside them.
_Avoid_: category, group, kind, type.
