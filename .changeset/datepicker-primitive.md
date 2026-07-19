---
"@moderno/react": minor
"@moderno/vue": minor
"@moderno/svelte": minor
"@moderno/solid": minor
"@moderno/styles": minor
---

Add the **DatePicker** primitive across all four frameworks — single date and range
selection with a day/month/year calendar, a compositional primitive (ADR-0003) over Zag.js's
`date-picker` machine. `DatePicker.Root` takes `selectionMode` (`'single' | 'range'`),
`defaultValue`/`value` (ISO 8601 date strings) with `onValueChange`, `min`, `max`,
`disabled`, `locale`, and `startOfWeek`. Ships `DatePicker.Label`, `.Control`, `.Input`,
`.Trigger`, `.ClearTrigger`, and `.Content` (which renders the full day/month/year calendar
internally). Adds the `md-datepicker-*` classes to `@moderno/styles`.
