<script lang="ts">
  import { getSelectContext } from './select-context'
  import { parts } from '@moderno/class-contract'

  let { placeholder = 'Select…' }: { placeholder?: string } = $props()
  const api = getSelectContext()
</script>

<div {...api().getControlProps()} class={parts.select.control}>
  <button {...api().getTriggerProps()} class={parts.select.trigger}>
    <span {...api().getValueTextProps()} class={parts.select.value}>
      {api().empty ? placeholder : api().valueAsString}
    </span>
    <span {...api().getIndicatorProps()} class={parts.select.indicator} aria-hidden="true">▾</span>
  </button>
</div>
