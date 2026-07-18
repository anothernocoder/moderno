<script lang="ts">
  import * as combobox from '@zag-js/combobox'
  import { useMachine, normalizeProps, portal } from '@zag-js/svelte'
  import { parts } from '@moderno/class-contract'

  export interface ComboboxItem {
    label: string
    value: string
    disabled?: boolean
  }

  let {
    label,
    items,
    placeholder,
    defaultValue,
    value = $bindable(),
    disabled,
    onValueChange,
  }: {
    label?: string
    items: ComboboxItem[]
    placeholder?: string
    defaultValue?: string[]
    value?: string[]
    disabled?: boolean
    onValueChange?: (value: string[]) => void
  } = $props()

  let query = $state('')
  const options = $derived.by(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((item) => item.label.toLowerCase().includes(q))
  })
  const collection = $derived(combobox.collection({ items: options }))

  const id = $props.id()
  const service = useMachine(combobox.machine, {
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
    get disabled() {
      return disabled
    },
    onValueChange(d) {
      value = d.value
      onValueChange?.(d.value)
    },
    // Only typing narrows the list; selection/clear set the input programmatically
    // and must show the full list on the next open.
    onInputValueChange(d) {
      query = d.reason === 'input-change' ? d.inputValue : ''
    },
  })
  const api = $derived(combobox.connect(service, normalizeProps))
</script>

<div {...api.getRootProps()} class={parts.combobox.root}>
  {#if label != null}
    <label {...api.getLabelProps()} class={parts.combobox.label}>{label}</label>
  {/if}
  <div {...api.getControlProps()} class={parts.combobox.control}>
    <input {...api.getInputProps()} class={parts.combobox.input} {placeholder} />
    <button {...api.getTriggerProps()} class={parts.combobox.trigger}>▾</button>
  </div>
  {#if api.open && options.length > 0}
    <div use:portal {...api.getPositionerProps()} class={parts.combobox.positioner}>
      <ul {...api.getContentProps()} class={parts.combobox.content}>
        {#each options as item (item.value)}
          <li {...api.getItemProps({ item })} class={parts.combobox.item}>
            <span {...api.getItemTextProps({ item })} class={parts.combobox.itemText}>{item.label}</span>
            <span {...api.getItemIndicatorProps({ item })} class={parts.combobox.itemIndicator} aria-hidden="true">✓</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
