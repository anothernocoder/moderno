import { For, Show, type JSX } from 'solid-js'

export interface LogoItem {
  name: string
  src?: string
  href?: string
}

export interface LogosProps {
  kicker?: string
  items?: LogoItem[]
}

const DEFAULT_LOGOS: LogoItem[] = [
  { name: 'Nimbus' },
  { name: 'Kairos' },
  { name: 'Vela' },
  { name: 'Orbit' },
  { name: 'Halcyon' },
  { name: 'Fenwick' },
]

const sectionStyle: JSX.CSSProperties = { padding: '96px 24px', background: 'var(--md-surface-base)' }
const kickerStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-sm)',
  'letter-spacing': '0.14em',
  'text-transform': 'uppercase',
  color: 'var(--md-text-secondary)',
  'text-align': 'center',
  margin: '0 auto 40px',
}
const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-wrap': 'wrap',
  'justify-content': 'center',
  'align-items': 'center',
  gap: '48px',
  'max-width': '960px',
  margin: '0 auto',
}
const imgStyle: JSX.CSSProperties = { filter: 'grayscale(1)', opacity: 0.6, height: '28px' }
const wordmarkStyle: JSX.CSSProperties = {
  color: 'var(--md-text-secondary)',
  'font-weight': 600,
  'letter-spacing': '0.02em',
  'font-size': 'var(--md-text-label-md)',
  'text-transform': 'uppercase',
}

/**
 * Moderno block — Logos (Solid). Copy-paste; edit freely.
 * Trusted-by section: small centered kicker above a wrapped, centered row of partner/customer logos.
 * Uses plain composition + Moderno tokens (--md-* custom properties), no primitives.
 */
export function Logos(props: LogosProps) {
  const kicker = () => props.kicker ?? 'Con la confianza de equipos de todos los tamaños'
  const items = () => props.items ?? DEFAULT_LOGOS

  return (
    <section style={sectionStyle}>
      <p style={kickerStyle}>{kicker()}</p>
      <div style={rowStyle}>
        <For each={items()}>
          {(item) => (
            <Show
              when={item.href}
              fallback={
                <span>
                  <Show when={item.src} fallback={<span style={wordmarkStyle}>{item.name}</span>}>
                    <img src={item.src} alt={item.name} style={imgStyle} />
                  </Show>
                </span>
              }
            >
              <a href={item.href}>
                <Show when={item.src} fallback={<span style={wordmarkStyle}>{item.name}</span>}>
                  <img src={item.src} alt={item.name} style={imgStyle} />
                </Show>
              </a>
            </Show>
          )}
        </For>
      </div>
    </section>
  )
}
