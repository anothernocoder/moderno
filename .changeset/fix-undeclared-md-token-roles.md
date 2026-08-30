---
"@moderno-ui/tokens": minor
"@moderno-ui/registry": patch
---

Fix two `--md-*` roles that registry blocks referenced but that were never declared, so
they resolved to nothing at runtime.

`@moderno-ui/tokens` gains `--md-text-headline-sm` (18px) and `--md-text-headline-sm-lh`
(22px), completing the headline scale — `body` and `label` already carried an `sm` step,
and the headline steps follow the same size + 4 line-height pattern as `headline-lg`
(24/28) and `headline-md` (20/24). Also added as `typography.headline-sm` in `tokens.json`.

The `Containers` block referenced a `--md-surface-subtle` role that does not exist; it now
uses `--md-surface-muted`, which is the established role for a recessed well holding
`--md-surface-base` content. This restores the intended background on the viewport frame
across the React, Vue, Svelte, and Solid variants.
