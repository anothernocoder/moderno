import { Select } from '@moderno/react'

const frutas = [
  { label: 'Manzana', value: 'apple' },
  { label: 'Banano', value: 'banana' },
  { label: 'Naranja', value: 'orange' },
  { label: 'Mango', value: 'mango' },
  { label: 'Uva (agotada)', value: 'grape', disabled: true },
]

export default function SelectDemo() {
  return (
    <div style={{ maxWidth: 280 }}>
      <Select.Root items={frutas}>
        <Select.Label>Fruta favorita</Select.Label>
        <Select.Trigger placeholder="Elige una fruta" />
        <Select.Content>
          {frutas.map((f) => (
            <Select.Item key={f.value} item={f} />
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  )
}
