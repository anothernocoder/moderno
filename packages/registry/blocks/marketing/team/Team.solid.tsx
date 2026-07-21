import { For, Show, type JSX } from 'solid-js'
import { Avatar, Card } from '@moderno/solid'

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

const sectionStyle: JSX.CSSProperties = { padding: '96px 24px', background: 'var(--md-surface-base)' }
const headerStyle: JSX.CSSProperties = { 'text-align': 'center', margin: '0 auto 56px', 'max-width': '640px' }
const kickerStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-sm)',
  'letter-spacing': '0.14em',
  'text-transform': 'uppercase',
  color: 'var(--md-text-secondary)',
  margin: '0 0 16px',
}
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '36px',
  'line-height': 1.1,
  'letter-spacing': '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 0 16px',
}
const subtitleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-lg)',
  'line-height': 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const gridStyle: JSX.CSSProperties = {
  display: 'grid',
  'grid-template-columns': 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '24px',
  'max-width': '1040px',
  margin: '0 auto',
}
const memberStyle: JSX.CSSProperties = { 'text-align': 'center' }
const memberNameStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-md)',
  'font-weight': 600,
  color: 'var(--md-text-primary)',
  margin: '12px 0 0',
}
const memberRoleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: '4px 0 0',
}
const memberBioStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  'line-height': 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: '12px 0 0',
}

/**
 * Moderno block — Team (Solid). Copy-paste; edit freely.
 * Team section: centered header above a grid of member profile cards with avatar, name, role, and bio.
 * Uses the Card + Avatar primitives + Moderno tokens.
 */
export function Team(props: TeamProps) {
  const kicker = () => props.kicker ?? 'Nuestro equipo'
  const title = () => props.title ?? 'Conoce al equipo'
  const subtitle = () => props.subtitle ?? 'Las personas que diseñan y construyen Moderno todos los días.'
  const members = () => props.members ?? DEFAULT_MEMBERS

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker()}</p>
        <h2 style={titleStyle}>{title()}</h2>
        <p style={subtitleStyle}>{subtitle()}</p>
      </div>
      <div style={gridStyle}>
        <For each={members()}>
          {(member) => (
            <Card>
              <div style={memberStyle}>
                <Avatar src={member.avatarSrc} initials={member.initials} alt={member.name} size="lg" />
                <p style={memberNameStyle}>{member.name}</p>
                <Show when={member.role}>
                  <p style={memberRoleStyle}>{member.role}</p>
                </Show>
                <Show when={member.bio}>
                  <p style={memberBioStyle}>{member.bio}</p>
                </Show>
              </div>
            </Card>
          )}
        </For>
      </div>
    </section>
  )
}
