import { For, Show, type JSX } from 'solid-js'
import { Card } from '@moderno/solid'

export type IncentiveIcon = 'shipping' | 'returns' | 'payment'

export interface IncentiveItem {
  icon?: IncentiveIcon
  label: string
  description: string
}

export interface IncentivesProps {
  heading?: string
  items?: IncentiveItem[]
}

const DEFAULT_ITEMS: IncentiveItem[] = [
  {
    icon: 'shipping',
    label: 'Envío gratis',
    description: 'Envío sin costo en compras desde $250.000 a todo el país.',
  },
  {
    icon: 'returns',
    label: 'Cambios y devoluciones fáciles',
    description: 'Tienes 30 días desde la entrega para cambiar o devolver tu compra sin costo.',
  },
  {
    icon: 'payment',
    label: 'Pago 100% seguro',
    description: 'Tus datos están protegidos con cifrado en cada transacción.',
  },
]

const ICONS: Record<
  IncentiveIcon,
  { viewBox: string; paths: string[]; circles?: { cx: number; cy: number; r: number }[] }
> = {
  shipping: {
    viewBox: '0 0 24 24',
    paths: ['M2 7h11v9H2z', 'M13 10h4l4 3v3h-8z'],
    circles: [
      { cx: 6, cy: 18, r: 1.6 },
      { cx: 17, cy: 18, r: 1.6 },
    ],
  },
  returns: {
    viewBox: '0 0 24 24',
    paths: ['M9 4 4 9l5 5', 'M4 9h9a7 7 0 0 1 7 7v1'],
  },
  payment: {
    viewBox: '0 0 24 24',
    paths: ['M5 11h14v9H5z', 'M7 11V7a5 5 0 0 1 10 0v4'],
    circles: [{ cx: 12, cy: 15.5, r: 1.3 }],
  },
}

const sectionStyle: JSX.CSSProperties = {
  padding: '48px 24px',
  background: 'var(--md-surface-base)',
}
const headingStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '28px',
  'line-height': 1.15,
  color: 'var(--md-text-primary)',
  'text-align': 'center',
  margin: '0 0 24px',
}
const gridStyle: JSX.CSSProperties = {
  display: 'grid',
  'grid-template-columns': 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '24px',
  'max-width': '1040px',
  margin: '0 auto',
}
const titleRowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  gap: '10px',
}
const iconStyle: JSX.CSSProperties = { color: 'var(--md-primary)', 'flex-shrink': 0 }
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  'line-height': 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

function IncentiveIconGlyph(props: { icon?: IncentiveIcon }) {
  const spec = () => ICONS[props.icon ?? 'shipping']
  return (
    <svg
      viewBox={spec().viewBox}
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      style={iconStyle}
      aria-hidden="true"
    >
      <For each={spec().circles ?? []}>{(c) => <circle cx={c.cx} cy={c.cy} r={c.r} />}</For>
      <For each={spec().paths}>{(d) => <path d={d} />}</For>
    </svg>
  )
}

/**
 * Moderno block — Incentives (Solid). Copy-paste; edit freely.
 * Storefront-wide trust/incentive strip: icon + label + short description
 * per incentive (free shipping, easy returns, secure payment). Composes
 * the Card primitive + Moderno tokens. No new primitives, no bespoke
 * interaction logic — purely presentational.
 */
export function Incentives(props: IncentivesProps) {
  const heading = () => props.heading ?? 'Compra con confianza'
  const items = () => props.items ?? DEFAULT_ITEMS

  return (
    <section style={sectionStyle} aria-label={heading()}>
      <Show when={heading()}>
        <h2 style={headingStyle}>{heading()}</h2>
      </Show>
      <div style={gridStyle}>
        <For each={items()}>
          {(item) => (
            <Card
              title={
                <span style={titleRowStyle}>
                  <IncentiveIconGlyph icon={item.icon} />
                  <span>{item.label}</span>
                </span>
              }
            >
              <p style={descriptionStyle}>{item.description}</p>
            </Card>
          )}
        </For>
      </div>
    </section>
  )
}
