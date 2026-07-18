<script lang="ts">
  import * as menu from '@zag-js/menu'
  import { useMachine, normalizeProps, portal } from '@zag-js/svelte'
  import { cx, parts } from '@moderno/class-contract'

  export interface MenuItem {
    label: string
    value: string
    disabled?: boolean
  }

  let {
    triggerLabel,
    items,
    onSelect,
  }: {
    triggerLabel: string
    items: MenuItem[]
    onSelect?: (value: string) => void
  } = $props()

  const id = $props.id()
  const service = useMachine(menu.machine, {
    id,
    onSelect(d) {
      onSelect?.(d.value)
    },
  })
  const api = $derived(menu.connect(service, normalizeProps))
</script>

<button {...api.getTriggerProps()} class={cx.button({ variant: 'secondary', size: 'sm' })}>
  {triggerLabel}
  <span {...api.getIndicatorProps()} class={parts.menu.indicator} aria-hidden="true">▾</span>
</button>
{#if api.open}
  <div use:portal {...api.getPositionerProps()} class={parts.menu.positioner}>
    <ul {...api.getContentProps()} class={parts.menu.content}>
      {#each items as item (item.value)}
        <li {...api.getItemProps({ value: item.value, disabled: item.disabled })} class={parts.menu.item}>
          {item.label}
        </li>
      {/each}
    </ul>
  </div>
{/if}
