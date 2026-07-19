import { DatePicker } from '@moderno/react'

export default function DatePickerDemo() {
  return (
    <div style={{ maxWidth: 280 }}>
      <DatePicker.Root defaultValue={['2024-01-15']}>
        <DatePicker.Label>Fecha de entrega</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.Input />
          <DatePicker.Trigger />
        </DatePicker.Control>
        <DatePicker.Content />
      </DatePicker.Root>
    </div>
  )
}
