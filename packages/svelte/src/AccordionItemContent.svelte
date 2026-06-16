<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getAccordionContext, getAccordionItemContext } from './accordion-context'

  let { children }: { children?: Snippet } = $props()
  const api = getAccordionContext()
  const item = getAccordionItemContext()
</script>

<div {...api().getItemContentProps(item)} class="md-accordion-content">{@render children?.()}</div>
