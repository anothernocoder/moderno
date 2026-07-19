<script lang="ts">
  import { DatePicker } from './index'
</script>

<DatePicker.Root defaultValue={['2024-01-15']}>
  <DatePicker.Label>Date</DatePicker.Label>
  <DatePicker.Control>
    <DatePicker.Input />
    <DatePicker.Trigger />
  </DatePicker.Control>
  <DatePicker.Content />
</DatePicker.Root>
