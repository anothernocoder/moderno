import { Card } from '@moderno/solid'
import { For } from 'solid-js'
import type { JSX } from 'solid-js'

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

/**
 * Moderno block — DescriptionList (Solid). Copy-paste; edit freely.
 * Key/value detail list for a record view (order, profile, etc). Label above value on
 * narrow layouts, side-by-side on wider ones. Uses the Card primitive + Moderno tokens.
 */
export function DescriptionList(props: DescriptionListProps) {
  const rowStyle: JSX.CSSProperties = {
    display: 'flex',
    'flex-wrap': 'wrap',
    gap: '4px 24px',
    padding: '12px 0',
    'border-bottom': '1px solid var(--md-border-default)',
  }
  const lastRowStyle: JSX.CSSProperties = { ...rowStyle, 'border-bottom': 'none' }
  const labelStyle: JSX.CSSProperties = {
    flex: '1 1 160px',
    margin: 0,
    'font-size': 'var(--md-text-label-md)',
    color: 'var(--md-text-secondary)',
  }
  const valueStyle: JSX.CSSProperties = {
    flex: '3 1 240px',
    margin: 0,
    'font-size': 'var(--md-text-body-sm)',
    color: 'var(--md-text-primary)',
  }
  const items = () => props.items ?? DEFAULT_ITEMS
  return (
    <Card title={props.title ?? 'Detalle del pedido'}>
      <dl style={{ margin: 0 }}>
        <For each={items()}>
          {(item, index) => (
            <div style={index() === items().length - 1 ? lastRowStyle : rowStyle}>
              <dt style={labelStyle}>{item.label}</dt>
              <dd style={valueStyle}>{item.value}</dd>
            </div>
          )}
        </For>
      </dl>
    </Card>
  )
}
