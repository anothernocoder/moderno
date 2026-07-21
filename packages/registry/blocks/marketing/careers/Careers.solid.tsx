import { Badge, Button, Divider } from '@moderno/solid'
import { For, Show } from 'solid-js'
import type { JSX } from 'solid-js'

export interface CareerRole {
  title: string
  location: string
  department?: string
  type?: string
  applyLabel?: string
}

export interface CareersProps {
  kicker?: string
  title?: string
  subtitle?: string
  roles?: CareerRole[]
  onApply?: (role: CareerRole) => void
}

const DEFAULT_ROLES: CareerRole[] = [
  {
    title: 'Ingeniera/o de Producto Senior',
    location: 'Remoto (LatAm)',
    department: 'Ingeniería',
    type: 'Tiempo completo',
  },
  {
    title: 'Diseñadora/or de Producto',
    location: 'Remoto',
    department: 'Diseño',
    type: 'Tiempo completo',
  },
  {
    title: 'Developer Advocate',
    location: 'Remoto',
    department: 'Marketing',
    type: 'Tiempo completo',
  },
  {
    title: 'Ingeniera/o de Soporte',
    location: 'Remoto (LatAm)',
    department: 'Soporte',
    type: 'Medio tiempo',
  },
]

const listStyle: JSX.CSSProperties = {
  'max-width': '760px',
  margin: '0 auto',
  border: '1px solid var(--md-border-default)',
  background: 'var(--md-surface-raised)',
}
const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  'flex-wrap': 'wrap',
  gap: '16px',
  padding: '24px',
}
const roleTitleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '20px',
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const metaStyle: JSX.CSSProperties = { display: 'flex', gap: '8px', 'flex-wrap': 'wrap' }

/**
 * Moderno block — Careers (Solid). Copy-paste; edit freely.
 * Jobs/openings section: a list of open roles with title, location, and apply CTA.
 * Uses the Badge + Button + Divider primitives + Moderno tokens.
 */
export function Careers(props: CareersProps) {
  const kicker = () => props.kicker ?? 'Carreras'
  const title = () => props.title ?? 'Construye el futuro de Moderno con nosotros'
  const subtitle = () => props.subtitle ?? 'Buscamos personas curiosas para un equipo pequeño y remoto.'
  const roles = () => props.roles ?? DEFAULT_ROLES

  return (
    <section style={{ padding: '96px 24px', background: 'var(--md-surface-base)' }}>
      <div style={{ 'text-align': 'center', margin: '0 auto 56px', 'max-width': '640px' }}>
        <p
          style={{
            'font-size': 'var(--md-text-label-sm)',
            'letter-spacing': '0.14em',
            'text-transform': 'uppercase',
            color: 'var(--md-text-secondary)',
            margin: '0 0 16px',
          }}
        >
          {kicker()}
        </p>
        <h2
          style={{
            'font-family': 'var(--md-font-serif)',
            'font-size': '36px',
            'line-height': 1.1,
            'letter-spacing': '-0.02em',
            color: 'var(--md-text-primary)',
            margin: '0 0 16px',
          }}
        >
          {title()}
        </h2>
        <p
          style={{
            'font-size': 'var(--md-text-body-lg)',
            'line-height': 'var(--md-text-body-lg-lh)',
            color: 'var(--md-text-secondary)',
            margin: 0,
          }}
        >
          {subtitle()}
        </p>
      </div>
      <div style={listStyle}>
        <For each={roles()}>
          {(role, index) => (
            <div>
              <Show when={index() > 0}>
                <Divider />
              </Show>
              <div style={rowStyle}>
                <div>
                  <h3 style={roleTitleStyle}>{role.title}</h3>
                  <div style={metaStyle}>
                    <Badge>{role.location}</Badge>
                    <Show when={role.department}>
                      <Badge>{role.department}</Badge>
                    </Show>
                    <Show when={role.type}>
                      <Badge>{role.type}</Badge>
                    </Show>
                  </div>
                </div>
                <Button
                  label={role.applyLabel ?? 'Aplicar'}
                  variant="secondary"
                  onClick={() => props.onApply?.(role)}
                />
              </div>
            </div>
          )}
        </For>
      </div>
    </section>
  )
}
