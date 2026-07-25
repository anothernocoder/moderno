---
"@moderno-ui/react": minor
"@moderno-ui/vue": minor
"@moderno-ui/svelte": minor
"@moderno-ui/solid": minor
"@moderno-ui/styles": minor
---

Add the **Pagination** primitive across all four frameworks — accessible page-by-page
navigation over long result sets, a closed-prop primitive (ADR-0003) over Zag.js's
`pagination` machine. Takes `count`, `page`/`defaultPage` (`v-model`/`bind:page` on
Vue/Svelte), `pageSize`/`defaultPageSize`, `siblingCount`, `boundaryCount`, and
`translations` for localized a11y labels. Renders prev/next triggers, numbered page
items, and an ellipsis for truncated ranges. Adds the `md-pagination-*` classes to
`@moderno-ui/styles`.
