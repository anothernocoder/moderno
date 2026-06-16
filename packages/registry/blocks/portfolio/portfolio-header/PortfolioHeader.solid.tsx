import { Avatar, Chip, Button } from '@moderno/solid'
import { For } from 'solid-js'
import type { JSX } from 'solid-js'

export interface PortfolioLink {
  label: string
  href: string
}

export interface PortfolioHeaderProps {
  name?: string
  role?: string
  bio?: string
  avatarSrc?: string
  initials?: string
  links?: PortfolioLink[]
  onContact?: () => void
}

const DEFAULT_LINKS: PortfolioLink[] = [
  { label: 'GitHub', href: '#' },
  { label: 'Dribbble', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

/**
 * Moderno block — PortfolioHeader (Solid). Copy-paste; edit freely.
 * Intro header. Uses the Avatar + Chip + Button primitives + Moderno tokens.
 */
export function PortfolioHeader(props: PortfolioHeaderProps) {
  const headerStyle: JSX.CSSProperties = {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'text-align': 'center',
    gap: '16px',
    padding: '64px 24px',
    background: 'var(--md-surface-base)',
    'border-bottom': '1px solid var(--md-border-default)',
  }
  return (
    <header style={headerStyle}>
      <Avatar
        src={props.avatarSrc}
        initials={props.initials ?? 'AR'}
        alt={props.name ?? 'Ana Restrepo'}
        size="lg"
      />
      <h1
        style={{
          'font-family': 'var(--md-font-serif)',
          'font-size': '40px',
          'line-height': 1.05,
          'letter-spacing': '-0.02em',
          color: 'var(--md-text-primary)',
          margin: 0,
        }}
      >
        {props.name ?? 'Ana Restrepo'}
      </h1>
      <p style={{ 'font-size': 'var(--md-text-headline-md)', color: 'var(--md-text-secondary)', margin: 0 }}>
        {props.role ?? 'Diseñadora de producto'}
      </p>
      <p
        style={{
          'font-size': 'var(--md-text-body-md)',
          'line-height': 'var(--md-text-body-md-lh)',
          color: 'var(--md-text-secondary)',
          margin: 0,
          'max-width': '48ch',
        }}
      >
        {props.bio ??
          'Construyo interfaces claras y sistemas de diseño que escalan. Antes en Stripe y Linear.'}
      </p>
      <div style={{ display: 'flex', gap: '8px', 'flex-wrap': 'wrap', 'justify-content': 'center' }}>
        <For each={props.links ?? DEFAULT_LINKS}>
          {(link) => (
            <a href={link.href} style={{ 'text-decoration': 'none' }}>
              <Chip>{link.label}</Chip>
            </a>
          )}
        </For>
      </div>
      <Button label="Contacto" size="md" onClick={() => props.onContact?.()} />
    </header>
  )
}
