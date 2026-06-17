<script lang="ts">
  import type { Snippet } from 'svelte'
  import * as accordion from '@zag-js/accordion'
  import { useMachine, normalizeProps } from '@zag-js/svelte'
  import { setAccordionContext } from './accordion-context'
  import { parts } from '@moderno/class-contract'

  let {
    defaultValue,
    value = $bindable(),
    multiple,
    collapsible,
    onValueChange,
    children,
  }: {
    defaultValue?: string[]
    value?: string[]
    multiple?: boolean
    collapsible?: boolean
    onValueChange?: (value: string[]) => void
    children?: Snippet
  } = $props()

  const id = $props.id()
  const service = useMachine(accordion.machine, {
    id,
    get defaultValue() {
      return defaultValue
    },
    get value() {
      return value
    },
    get multiple() {
      return multiple
    },
    get collapsible() {
      return collapsible
    },
    onValueChange(d) {
      value = d.value
      onValueChange?.(d.value)
    },
  })
  const api = $derived(accordion.connect(service, normalizeProps))
  setAccordionContext(() => api)
</script>

<div {...api.getRootProps()} class={parts.accordion.root}>{@render children?.()}</div>
