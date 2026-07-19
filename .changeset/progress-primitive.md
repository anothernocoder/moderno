---
"@moderno/react": minor
"@moderno/vue": minor
"@moderno/svelte": minor
"@moderno/solid": minor
"@moderno/styles": minor
---

Add the **Progress** primitive across all four frameworks — linear and circular,
determinate and indeterminate, a closed-prop primitive (ADR-0003) over Zag.js's
`progress` machine. Takes `label`, `value`/`defaultValue` (`number | null`, where
`null` renders an indeterminate bar/ring), `min`, `max`, `variant`
(`'linear' | 'circular'`), and `showValue`. Adds the `md-progress-*` classes to
`@moderno/styles`.

Works around an upstream `@zag-js/solid` bug where the bindable's controlled check
(`props().value != undefined`) treats an explicit `value={null}` as uncontrolled
(loose equality folds `null` into `undefined`), which would otherwise prevent the
Solid adapter from ever reaching the indeterminate state when controlled.
