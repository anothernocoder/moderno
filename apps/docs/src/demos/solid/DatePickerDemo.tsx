import { DatePicker } from '@moderno/solid'

export default function DatePickerDemo() {
  return (
    <div style={{ 'max-width': '280px' }}>
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
