<script lang="ts">
  import * as toast from '@zag-js/toast'
  import { useMachine, normalizeProps, portal } from '@zag-js/svelte'
  import { parts } from '@moderno/class-contract'
  import ToastItem from './ToastItem.svelte'
  import type { Toaster } from './toast'

  let {
    toaster,
    label,
    closeLabel = 'Dismiss',
  }: {
    toaster: Toaster
    label?: string
    closeLabel?: string
  } = $props()

  const id = $props.id()
  const service = useMachine(toast.group.machine, {
    id,
    get store() {
      return toaster
    },
  })
  const api = $derived(toast.group.connect(service, normalizeProps))
</script>

<div use:portal {...api.getGroupProps({ label })} class={parts.toast.group}>
  {#each api.getToasts() as t, index (t.id)}
    <ToastItem toast={t} parent={service} {index} {closeLabel} />
  {/each}
</div>
