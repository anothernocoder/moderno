<script lang="ts">
  import type { Snippet } from 'svelte'
  import * as tabs from '@zag-js/tabs'
  import { useMachine, normalizeProps } from '@zag-js/svelte'
  import { setTabsContext } from './tabs-context'
  import { parts } from '@moderno/class-contract'

  let {
    defaultValue,
    value = $bindable(),
    onValueChange,
    children,
  }: {
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
    children?: Snippet
  } = $props()

  const id = $props.id()
  const service = useMachine(tabs.machine, {
    id,
    get defaultValue() {
      return defaultValue
    },
    get value() {
      return value
    },
    onValueChange(d) {
      value = d.value
      onValueChange?.(d.value)
    },
  })
  const api = $derived(tabs.connect(service, normalizeProps))
  setTabsContext(() => api)
</script>

<div {...api.getRootProps()} class={parts.tabs.root}>{@render children?.()}</div>
