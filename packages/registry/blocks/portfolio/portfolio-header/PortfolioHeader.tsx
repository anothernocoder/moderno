import { Avatar, Chip, Button } from '@moderno/react'

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
 * Moderno block — PortfolioHeader (React). Copy-paste; edit freely.
 * Intro header. Uses the Avatar + Chip + Button primitives + Moderno tokens.
 */
export function PortfolioHeader({
  name = 'Ana Restrepo',
  role = 'Diseñadora de producto',
  bio = 'Construyo interfaces claras y sistemas de diseño que escalan. Antes en Stripe y Linear.',
  avatarSrc,
  initials = 'AR',
  links = DEFAULT_LINKS,
  onContact,
}: PortfolioHeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '16px',
        padding: '64px 24px',
        background: 'var(--md-surface-base)',
        borderBottom: '1px solid var(--md-border-default)',
      }}
    >
      <Avatar src={avatarSrc} initials={initials} alt={name} size="lg" />
      <h1
        style={{
          fontFamily: 'var(--md-font-serif)',
          fontSize: '40px',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: 'var(--md-text-primary)',
          margin: 0,
        }}
      >
        {name}
      </h1>
      <p style={{ fontSize: 'var(--md-text-headline-md)', color: 'var(--md-text-secondary)', margin: 0 }}>
        {role}
      </p>
      <p
        style={{
          fontSize: 'var(--md-text-body-md)',
          lineHeight: 'var(--md-text-body-md-lh)',
          color: 'var(--md-text-secondary)',
          margin: 0,
          maxWidth: '48ch',
        }}
      >
        {bio}
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {links.map((link) => (
          <a key={link.label} href={link.href} style={{ textDecoration: 'none' }}>
            <Chip>{link.label}</Chip>
          </a>
        ))}
      </div>
      <Button label="Contacto" size="md" onClick={onContact} />
    </header>
  )
}
