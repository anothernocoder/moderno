<script lang="ts">
  import { Select } from './index'
  import type { SelectItem } from './select-context'

  const items: SelectItem[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]
</script>

<Select.Root {items}>
  <Select.Label>Fruit</Select.Label>
  <Select.Trigger />
  <Select.Content>
    {#each items as item (item.value)}
      <Select.Item {item} />
    {/each}
  </Select.Content>
</Select.Root>
