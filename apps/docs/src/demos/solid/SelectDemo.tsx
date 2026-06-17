import { For } from 'solid-js'
import { Select } from '@moderno/solid'

const frutas = [
  { label: 'Manzana', value: 'apple' },
  { label: 'Banano', value: 'banana' },
  { label: 'Naranja', value: 'orange' },
  { label: 'Mango', value: 'mango' },
  { label: 'Uva (agotada)', value: 'grape', disabled: true },
]

export default function SelectDemo() {
  return (
    <div style={{ 'max-width': '280px' }}>
      <Select.Root items={frutas}>
        <Select.Label>Fruta favorita</Select.Label>
        <Select.Trigger placeholder="Elige una fruta" />
        <Select.Content>
          <For each={frutas}>{(f) => <Select.Item item={f} />}</For>
        </Select.Content>
      </Select.Root>
    </div>
  )
}
