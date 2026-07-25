# Playground: one app, two runtimes — hosted composer, local-first generation

Status: accepted

## Decision

Moderno gains a **[[playground]]**: a public, product-grade surface for composing and
theming registry inventory — with generation deliberately kept **local-first**.

**One app, two runtimes.** A single React SPA (`apps/playground`, Vite) is deployed
statically alongside the docs as the public playground, and the same build is served
locally by `npx @moderno-ui/registry playground`, which boots a small framework-agnostic server
inside the user's repo. Generative capabilities light up only in the local runtime:
the server spawns the **user's own coding-agent CLI** (Claude Code / Cursor / Codex,
the design-playground model) with templated prompts; the agent writes variant source
files into the repo, the playground renders them for side-by-side comparison, and
good variants are promoted into the [[registry]]. The hosted runtime shows the same
affordances but points at the local command.

**Composition stops at the block.** The playground composes existing registry
inventory — stack [[block]]s into [[screen]]s, chain screens into [[flow]]s (linear
insert/remove/reorder, no free canvas). Building *new* blocks from [[primitive]]s is
served by the generation loop and by prompt export, never by a visual layout editor.

**Preview is React-only.** Previews mount the React versions of blocks/screens; the
framework selector affects exports only. Cross-framework visual parity is already
Moderno's own guarantee (same [[class contract]], same `styles.css`, same tokens).

**Theming = curated knobs over semantic roles.** The [[theme]] editor exposes
foundation-level knobs (brand color, neutrals, type, radius, density, light/dark)
that write [[semantic-role]] values, never one-off values; authored themes ship as
starting points. Moderno's look (sharp corners, monochrome, Hedvig) is demoted to
the default theme, not an invariant. Themes export as DTCG tokens + generated CSS
custom properties.

**The saved unit is the [[prototype]]** (composition + theme + content overrides +
viewport), serialized as a compressed URL hash (shareable with zero backend) and as
a JSON file (git-friendly in the local runtime). Tweaks come in three levels: theme
knobs, per-item structural controls (variant/size/props, declared in a
machine-readable controls manifest that extends `registry.json`), and content
(inline text edits + image swap by URL — no file uploads, no layout editing).

**Flows are navigable in the preview.** The playground acts as a living example
assembly: it holds `step` state and drives screens through the wiring contract
(`onNext`/`onBack`/`onSubmit`). Two canonical viewports (phone frame 375×812,
desktop ~1280) plus a URL "view mode" flag that hides panels for stakeholders.

**Exports, in order:** v1 ships prompt export (self-contained: theme tokens,
composition, `npx @moderno-ui/registry add` commands, wiring notes — works with any agent) and
framework-source export via the existing registry CLI. Pure-HTML snapshot export
comes after v1; an MCP server is explicitly deferred until the local runtime exists
and its absence hurts.

**Sequence:** Phase 1 hosted playground (pilot content: the Auth flow, per ADR 0005).
Phase 2 local generative runtime (its prompt/skill/promotion design gets its own
design pass). Phase 3 HTML export, then MCP.

## Context

The need: prototype real product flows with Moderno instead of wireframes, theme it
to other brands, and export the result. References analyzed: Astryx playground
(state-in-URL permalinks; "human and agent share one API"), shadcn/create (curated
foundation knobs; the preset is a reproducible command), Lightspark's docs demo
(navigable prototype in a phone frame), canvasui ("Copy for AI" as first-class
export), and B1u3B01t/design-playground (local-first generation by spawning the
user's own agent CLI, variants as real files on disk).

The hard constraints: a hosted public site cannot spawn CLIs or hold visitors'
credentials, and hosting generation ourselves (Magic Path model) means backend,
auth, billing and paying strangers' token bills — a different business. A
design-playground-style drop-in is Next.js-specific; Moderno serves four frameworks,
so the local runtime must bring its own server rather than embed in the consumer's
app. A visual block *editor* (primitives on a canvas) is a Figma-sized product; a
one-person team ships a composer, and delegates novel structure to agents.

## Consequences

- Every registry item now owes a controls manifest (its tweakable props/variants) —
  a recurring authoring cost per block, but the same metadata a future MCP server
  and agent prompts consume.
- The screens' wiring contract becomes doubly load-bearing: the playground drives
  screens through it, so changing it breaks prototypes, not just consumers.
- React-only preview means cross-framework parity must be proven by tests, not by
  the playground; the framework toggle demos nothing visually.
- Prototype-in-URL caps payload: no image uploads, content overrides stay textual.
- Generation quality and cost live on the user's side (their agent, their keys);
  Moderno ships prompts and skills, not inference.
- The hosted playground doubles as the demo of the local one; divergence between
  runtimes is a bug by definition.
