<script lang="ts">
  import * as toastMachine from '@zag-js/toast'
  import { useMachine, normalizeProps } from '@zag-js/svelte'
  import { cx, parts } from '@moderno/class-contract'

  let {
    toast,
    parent,
    index,
    closeLabel,
  }: {
    toast: toastMachine.Props
    parent: toastMachine.GroupService
    index: number
    closeLabel: string
  } = $props()

  const service = useMachine(toastMachine.machine, {
    get parent() {
      return parent
    },
    get id() {
      return toast.id
    },
    get index() {
      return index
    },
    get title() {
      return toast.title
    },
    get description() {
      return toast.description
    },
    get type() {
      return toast.type
    },
    get duration() {
      return toast.duration
    },
    get removeDelay() {
      return toast.removeDelay
    },
    get closable() {
      return toast.closable
    },
    get action() {
      return toast.action
    },
  })
  const api = $derived(toastMachine.connect(service, normalizeProps))
</script>

<div {...api.getRootProps()} class={parts.toast.root}>
  {#if api.title}
    <p {...api.getTitleProps()} class={parts.toast.title}>{api.title}</p>
  {/if}
  {#if api.description}
    <p {...api.getDescriptionProps()} class={parts.toast.description}>{api.description}</p>
  {/if}
  {#if toast.action}
    <button {...api.getActionTriggerProps()} class={cx.button({ variant: 'secondary', size: 'sm' })}>
      {toast.action.label}
    </button>
  {/if}
  {#if api.closable}
    <button {...api.getCloseTriggerProps()} class={parts.toast.closeTrigger} aria-label={closeLabel}>✕</button>
  {/if}
</div>
