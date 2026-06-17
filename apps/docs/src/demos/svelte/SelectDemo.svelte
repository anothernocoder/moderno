<script lang="ts">
  import { Select } from '@moderno/svelte'

  const frutas = [
    { label: 'Manzana', value: 'apple' },
    { label: 'Banano', value: 'banana' },
    { label: 'Naranja', value: 'orange' },
    { label: 'Mango', value: 'mango' },
    { label: 'Uva (agotada)', value: 'grape', disabled: true },
  ]
</script>

<div style="max-width: 280px">
  <Select.Root items={frutas}>
    <Select.Label>Fruta favorita</Select.Label>
    <Select.Trigger placeholder="Elige una fruta" />
    <Select.Content>
      {#each frutas as f (f.value)}
        <Select.Item item={f} />
      {/each}
    </Select.Content>
  </Select.Root>
</div>
