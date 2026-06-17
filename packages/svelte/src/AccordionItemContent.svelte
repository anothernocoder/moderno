<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getAccordionContext, getAccordionItemContext } from './accordion-context'
  import { parts } from '@moderno/class-contract'

  let { children }: { children?: Snippet } = $props()
  const api = getAccordionContext()
  const item = getAccordionItemContext()
</script>

<div {...api().getItemContentProps(item)} class={parts.accordion.content}>{@render children?.()}</div>
