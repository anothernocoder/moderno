<script lang="ts">
  import * as tooltip from '@zag-js/tooltip'
  import { useMachine, normalizeProps, portal } from '@zag-js/svelte'
  import { cx, parts } from '@moderno/class-contract'

  let {
    triggerLabel,
    content,
    openDelay,
    closeDelay,
  }: {
    triggerLabel: string
    content: string
    openDelay?: number
    closeDelay?: number
  } = $props()

  const id = $props.id()
  const service = useMachine(tooltip.machine, {
    id,
    get openDelay() {
      return openDelay
    },
    get closeDelay() {
      return closeDelay
    },
  })
  const api = $derived(tooltip.connect(service, normalizeProps))
</script>

<button {...api.getTriggerProps()} class={cx.button({ variant: 'secondary', size: 'sm' })}>{triggerLabel}</button>
{#if api.open}
  <div use:portal {...api.getPositionerProps()} class={parts.tooltip.positioner}>
    <div {...api.getContentProps()} class={parts.tooltip.content}>{content}</div>
  </div>
{/if}
