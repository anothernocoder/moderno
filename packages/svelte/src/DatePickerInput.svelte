<script lang="ts">
  import { getDatePickerContext } from './date-picker-context'
  import { parts } from '@moderno-ui/class-contract'

  let { index }: { index?: number } = $props()
  const api = getDatePickerContext()
</script>

<input {...api().getInputProps({ index })} class={parts.datepicker.input} />
