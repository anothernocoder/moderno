import type { CSSProperties } from 'react'
import { Card } from '@moderno/react'

export interface DescriptionItem {
  label: string
  value: string
}

export interface DescriptionListProps {
  title?: string
  items?: DescriptionItem[]
}

const DEFAULT_ITEMS: DescriptionItem[] = [
  { label: 'Número de pedido', value: 'PED-1104' },
  { label: 'Fecha', value: '14 jul 2026' },
  { label: 'Cliente', value: 'Bruno Café' },
  { label: 'Correo electrónico', value: 'bruno@cafe.com' },
  { label: 'Dirección de envío', value: 'Cra 9 #63-25, Bogotá' },
  { label: 'Método de pago', value: 'Visa •••• 4242' },
  { label: 'Estado', value: 'Despachado' },
  { label: 'Total', value: '$412.800' },
]

const listStyle: CSSProperties = { margin: 0 }
const rowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px 24px',
  padding: '12px 0',
  borderBottom: '1px solid var(--md-border-default)',
}
const lastRowStyle: CSSProperties = { ...rowStyle, borderBottom: 'none' }
const labelStyle: CSSProperties = {
  flex: '1 1 160px',
  margin: 0,
  fontSize: 'var(--md-text-label-md)',
  color: 'var(--md-text-secondary)',
}
const valueStyle: CSSProperties = {
  flex: '3 1 240px',
  margin: 0,
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
}

/**
 * Moderno block — DescriptionList (React). Copy-paste; edit freely.
 * Key/value detail list for a record view (order, profile, etc). Label above value on
 * narrow layouts, side-by-side on wider ones. Uses the Card primitive + Moderno tokens.
 */
export function DescriptionList({ title = 'Detalle del pedido', items = DEFAULT_ITEMS }: DescriptionListProps) {
  return (
    <Card title={title}>
      <dl style={listStyle}>
        {items.map((item, index) => (
          <div key={item.label} style={index === items.length - 1 ? lastRowStyle : rowStyle}>
            <dt style={labelStyle}>{item.label}</dt>
            <dd style={valueStyle}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  )
}
