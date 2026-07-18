<script lang="ts">
  import type { Snippet } from 'svelte'
  import * as dialog from '@zag-js/dialog'
  import { useMachine, normalizeProps } from '@zag-js/svelte'
  import { setSheetContext } from './sheet-context'
  import { parts } from '@moderno/class-contract'

  let {
    defaultOpen,
    open = $bindable(),
    onOpenChange,
    children,
  }: {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
    children?: Snippet
  } = $props()

  const id = $props.id()
  const service = useMachine(dialog.machine, {
    id,
    defaultOpen,
    get open() {
      return open
    },
    onOpenChange(d) {
      open = d.open
      onOpenChange?.(d.open)
    },
  })
  const api = $derived(dialog.connect(service, normalizeProps))
  setSheetContext(() => api)
</script>

<div class={parts.sheet.root}>{@render children?.()}</div>
