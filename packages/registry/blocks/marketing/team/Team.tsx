import type { CSSProperties } from 'react'
import { Avatar, Card } from '@moderno/react'

export interface TeamMember {
  name: string
  role?: string
  bio?: string
  avatarSrc?: string
  initials?: string
}

export interface TeamProps {
  kicker?: string
  title?: string
  subtitle?: string
  members?: TeamMember[]
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    name: 'Marta Gómez',
    role: 'Head of Design',
    bio: 'Lidera el lenguaje visual de Moderno y cuida la coherencia entre los cuatro frameworks.',
    initials: 'MG',
  },
  {
    name: 'Carlos Peña',
    role: 'Frontend Lead',
    bio: 'Construye la arquitectura de primitives y mantiene la paridad de API entre React, Vue, Svelte y Solid.',
    initials: 'CP',
  },
  {
    name: 'Sofía Iglesias',
    role: 'Product Engineer',
    bio: 'Diseña los tokens --md-* y ayuda a los equipos a tematizar sus apps sin fricción.',
    initials: 'SI',
  },
  {
    name: 'Diego Salas',
    role: 'Developer Experience',
    bio: 'Cuida la CLI y la documentación para que copiar un block sea siempre trivial.',
    initials: 'DS',
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
const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '24px',
  maxWidth: '1040px',
  margin: '0 auto',
}
const memberStyle: CSSProperties = { textAlign: 'center' }
const memberNameStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-md)',
  fontWeight: 600,
  color: 'var(--md-text-primary)',
  margin: '12px 0 0',
}
const memberRoleStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: '4px 0 0',
}
const memberBioStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  lineHeight: 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: '12px 0 0',
}

/**
 * Moderno block — Team (React). Copy-paste; edit freely.
 * Team section: centered header above a grid of member profile cards with avatar, name, role, and bio.
 * Uses the Card + Avatar primitives + Moderno tokens.
 */
export function Team({
  kicker = 'Nuestro equipo',
  title = 'Conoce al equipo',
  subtitle = 'Las personas que diseñan y construyen Moderno todos los días.',
  members = DEFAULT_MEMBERS,
}: TeamProps) {
  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker}</p>
        <h2 style={titleStyle}>{title}</h2>
        <p style={subtitleStyle}>{subtitle}</p>
      </div>
      <div style={gridStyle}>
        {members.map((member) => (
          <Card key={member.name}>
            <div style={memberStyle}>
              <Avatar src={member.avatarSrc} initials={member.initials} alt={member.name} size="lg" />
              <p style={memberNameStyle}>{member.name}</p>
              {member.role ? <p style={memberRoleStyle}>{member.role}</p> : null}
              {member.bio ? <p style={memberBioStyle}>{member.bio}</p> : null}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
