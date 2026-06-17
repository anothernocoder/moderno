<script lang="ts">
  import * as dialog from '@zag-js/dialog'
  import { useMachine, normalizeProps, portal } from '@zag-js/svelte'

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

<button {...api.getTriggerProps()} class="md-btn md-btn--primary">{triggerLabel}</button>
{#if api.open}
  <div use:portal {...api.getBackdropProps()} class="md-dialog-backdrop"></div>
  <div use:portal {...api.getPositionerProps()} class="md-dialog-positioner">
    <div {...api.getContentProps()} class="md-dialog-content">
      <h2 {...api.getTitleProps()} class="md-dialog-title">{title}</h2>
      {#if description}
        <p {...api.getDescriptionProps()} class="md-dialog-desc">{description}</p>
      {/if}
      <div class="md-dialog-actions">
        <button {...api.getCloseTriggerProps()} class="md-btn md-btn--secondary">{closeLabel}</button>
      </div>
    </div>
  </div>
{/if}
