<script lang="ts">
  import * as popover from '@zag-js/popover'
  import { useMachine, normalizeProps, portal } from '@zag-js/svelte'
  import { cx, parts } from '@moderno/class-contract'

  let {
    triggerLabel,
    title,
    content,
    closeLabel = 'Close',
  }: {
    triggerLabel: string
    title?: string
    content: string
    closeLabel?: string
  } = $props()

  const id = $props.id()
  const service = useMachine(popover.machine, { id })
  const api = $derived(popover.connect(service, normalizeProps))
</script>

<button {...api.getTriggerProps()} class={cx.button({ variant: 'secondary', size: 'sm' })}>{triggerLabel}</button>
{#if api.open}
  <div use:portal {...api.getPositionerProps()} class={parts.popover.positioner}>
    <div {...api.getContentProps()} class={parts.popover.content}>
      <div {...api.getArrowProps()} class={parts.popover.arrow}>
        <div {...api.getArrowTipProps()}></div>
      </div>
      {#if title}
        <p {...api.getTitleProps()} class={parts.popover.title}>{title}</p>
      {/if}
      <div {...api.getDescriptionProps()} class={parts.popover.body}>{content}</div>
      <button {...api.getCloseTriggerProps()} class={parts.popover.close} aria-label={closeLabel}>✕</button>
    </div>
  </div>
{/if}
