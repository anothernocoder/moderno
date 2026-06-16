<script lang="ts">
  import type { Snippet } from 'svelte'
  import * as select from '@zag-js/select'
  import { useMachine, normalizeProps } from '@zag-js/svelte'
  import { setSelectContext, type SelectItem } from './select-context'

  let {
    items,
    defaultValue,
    value = $bindable(),
    multiple,
    disabled,
    onValueChange,
    children,
  }: {
    items: SelectItem[]
    defaultValue?: string[]
    value?: string[]
    multiple?: boolean
    disabled?: boolean
    onValueChange?: (value: string[]) => void
    children?: Snippet
  } = $props()

  const id = $props.id()
  const collection = $derived(select.collection({ items }))
  const service = useMachine(select.machine, {
    id,
    get collection() {
      return collection
    },
    get defaultValue() {
      return defaultValue
    },
    get value() {
      return value
    },
    get multiple() {
      return multiple
    },
    get disabled() {
      return disabled
    },
    onValueChange(d) {
      value = d.value
      onValueChange?.(d.value)
    },
  })
  const api = $derived(select.connect(service, normalizeProps))
  setSelectContext(() => api)
</script>

<div {...api.getRootProps()} class="md-select">{@render children?.()}</div>
