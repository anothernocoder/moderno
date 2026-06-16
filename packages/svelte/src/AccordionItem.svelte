<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getAccordionContext, setAccordionItemContext } from './accordion-context'

  let {
    value,
    disabled,
    children,
  }: {
    value: string
    disabled?: boolean
    children?: Snippet
  } = $props()

  const api = getAccordionContext()
  setAccordionItemContext({ value, disabled })
</script>

<div {...api().getItemProps({ value, disabled })} class="md-accordion-item">{@render children?.()}</div>
