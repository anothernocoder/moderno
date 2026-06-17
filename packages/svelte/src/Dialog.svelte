<script lang="ts">
  import * as dialog from '@zag-js/dialog'
  import { useMachine, normalizeProps, portal } from '@zag-js/svelte'
  import { cx, parts } from '@moderno/class-contract'

  let {
    triggerLabel,
    title,
    description,
    closeLabel = 'Close',
  }: {
    triggerLabel: string
    title: string
    description?: string
    closeLabel?: string
  } = $props()

  const id = $props.id()
  const service = useMachine(dialog.machine, { id })
  const api = $derived(dialog.connect(service, normalizeProps))
</script>

<button {...api.getTriggerProps()} class={cx.button({ variant: 'primary' })}>{triggerLabel}</button>
{#if api.open}
  <div use:portal {...api.getBackdropProps()} class={parts.dialog.backdrop}></div>
  <div use:portal {...api.getPositionerProps()} class={parts.dialog.positioner}>
    <div {...api.getContentProps()} class={parts.dialog.content}>
      <h2 {...api.getTitleProps()} class={parts.dialog.title}>{title}</h2>
      {#if description}
        <p {...api.getDescriptionProps()} class={parts.dialog.desc}>{description}</p>
      {/if}
      <div class={parts.dialog.actions}>
        <button {...api.getCloseTriggerProps()} class={cx.button({ variant: 'secondary' })}>{closeLabel}</button>
      </div>
    </div>
  </div>
{/if}
