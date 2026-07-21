import type { CSSProperties } from 'react'
import { Badge, Button, Divider } from '@moderno/react'

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

const sectionStyle: CSSProperties = { padding: '96px 24px', background: 'var(--md-surface-base)' }
const headerStyle: CSSProperties = { textAlign: 'center', margin: '0 auto 56px', maxWidth: '640px' }
const kickerStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-sm)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--md-text-secondary)',
  margin: '0 0 16px',
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '36px',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 0 16px',
}
const subtitleStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-lg)',
  lineHeight: 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const listStyle: CSSProperties = {
  maxWidth: '760px',
  margin: '0 auto',
  border: '1px solid var(--md-border-default)',
  background: 'var(--md-surface-raised)',
}
const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '16px',
  padding: '24px',
}
const roleTitleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '20px',
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const metaStyle: CSSProperties = { display: 'flex', gap: '8px', flexWrap: 'wrap' }

/**
 * Moderno block — Careers (React). Copy-paste; edit freely.
 * Jobs/openings section: a list of open roles with title, location, and apply CTA.
 * Uses the Badge + Button + Divider primitives + Moderno tokens.
 */
export function Careers({
  kicker = 'Carreras',
  title = 'Construye el futuro de Moderno con nosotros',
  subtitle = 'Buscamos personas curiosas para un equipo pequeño y remoto.',
  roles = DEFAULT_ROLES,
  onApply,
}: CareersProps) {
  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker}</p>
        <h2 style={titleStyle}>{title}</h2>
        <p style={subtitleStyle}>{subtitle}</p>
      </div>
      <div style={listStyle}>
        {roles.map((role, index) => (
          <div key={role.title}>
            {index > 0 ? <Divider /> : null}
            <div style={rowStyle}>
              <div>
                <h3 style={roleTitleStyle}>{role.title}</h3>
                <div style={metaStyle}>
                  <Badge>{role.location}</Badge>
                  {role.department ? <Badge>{role.department}</Badge> : null}
                  {role.type ? <Badge>{role.type}</Badge> : null}
                </div>
              </div>
              <Button label={role.applyLabel ?? 'Aplicar'} variant="secondary" onClick={() => onApply?.(role)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
