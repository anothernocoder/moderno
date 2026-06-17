<script lang="ts">
  import { getSelectContext } from './select-context'

  let { placeholder = 'Select…' }: { placeholder?: string } = $props()
  const api = getSelectContext()
</script>

<div {...api().getControlProps()} class="md-select-control">
  <button {...api().getTriggerProps()} class="md-select-trigger">
    <span {...api().getValueTextProps()} class="md-select-value">
      {api().empty ? placeholder : api().valueAsString}
    </span>
    <span {...api().getIndicatorProps()} class="md-select-indicator" aria-hidden="true">▾</span>
  </button>
</div>
