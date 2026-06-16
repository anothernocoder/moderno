<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getAccordionContext, getAccordionItemContext } from './accordion-context'

  let { children }: { children?: Snippet } = $props()
  const api = getAccordionContext()
  const item = getAccordionItemContext()
</script>

<h3 class="md-accordion-heading">
  <button {...api().getItemTriggerProps(item)} class="md-accordion-trigger">
    <span class="md-accordion-trigger-text">{@render children?.()}</span>
    <span {...api().getItemIndicatorProps(item)} class="md-accordion-indicator" aria-hidden="true">▾</span>
  </button>
</h3>
