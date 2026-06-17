<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getAccordionContext, getAccordionItemContext } from './accordion-context'
  import { parts } from '@moderno/class-contract'

  let { children }: { children?: Snippet } = $props()
  const api = getAccordionContext()
  const item = getAccordionItemContext()
</script>

<h3 class={parts.accordion.heading}>
  <button {...api().getItemTriggerProps(item)} class={parts.accordion.trigger}>
    <span class={parts.accordion.triggerText}>{@render children?.()}</span>
    <span {...api().getItemIndicatorProps(item)} class={parts.accordion.indicator} aria-hidden="true">▾</span>
  </button>
</h3>
