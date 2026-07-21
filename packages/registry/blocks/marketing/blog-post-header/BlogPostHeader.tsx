import type { CSSProperties } from 'react'
import { Avatar, Badge } from '@moderno/react'

export interface BlogPostHeaderProps {
  category?: string
  title?: string
  subtitle?: string
  author?: string
  date?: string
  readTime?: string
  avatarSrc?: string
  initials?: string
}

const sectionStyle: CSSProperties = {
  padding: '96px 24px',
  textAlign: 'center',
  background: 'var(--md-surface-base)',
}
const headerStyle: CSSProperties = { margin: '0 auto', maxWidth: '720px' }
const badgeWrapStyle: CSSProperties = { margin: '0 0 16px' }
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '40px',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 0 16px',
}
const subtitleStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-lg)',
  lineHeight: 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-secondary)',
  margin: '0 0 32px',
}
const metaRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
}
const authorNameStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-md)',
  fontWeight: 600,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const metaTextStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

/**
 * Moderno block — BlogPostHeader (React). Copy-paste; edit freely.
 * Single-article header: category badge, large title, subtitle and an author/date/read-time meta row.
 * Uses the Avatar + Badge primitives + Moderno tokens.
 */
export function BlogPostHeader({
  category = 'Ingeniería',
  title = 'Cómo escalamos nuestro sistema de diseño a cuatro frameworks',
  subtitle = 'Una mirada al proceso detrás de construir Moderno: componentes headless, tokens compartidos y una sola fuente de verdad para React, Vue, Svelte y Solid.',
  author = 'Marta Gómez',
  date = '12 mar 2025',
  readTime = '6 min de lectura',
  avatarSrc,
  initials = 'MG',
}: BlogPostHeaderProps) {
  return (
    <header style={sectionStyle}>
      <div style={headerStyle}>
        {category ? (
          <div style={badgeWrapStyle}>
            <Badge>{category}</Badge>
          </div>
        ) : null}
        <h1 style={titleStyle}>{title}</h1>
        <p style={subtitleStyle}>{subtitle}</p>
        <div style={metaRowStyle}>
          {author ? (
            <>
              <Avatar src={avatarSrc} initials={initials} alt={author} size="sm" />
              <span style={authorNameStyle}>{author}</span>
            </>
          ) : null}
          {author && (date || readTime) ? <span style={metaTextStyle}>&middot;</span> : null}
          {date ? <span style={metaTextStyle}>{date}</span> : null}
          {date && readTime ? <span style={metaTextStyle}>&middot;</span> : null}
          {readTime ? <span style={metaTextStyle}>{readTime}</span> : null}
        </div>
      </div>
    </header>
  )
}
