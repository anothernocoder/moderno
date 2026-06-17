<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getAccordionContext, setAccordionItemContext } from './accordion-context'
  import { parts } from '@moderno/class-contract'

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

<div {...api().getItemProps({ value, disabled })} class={parts.accordion.item}>{@render children?.()}</div>
