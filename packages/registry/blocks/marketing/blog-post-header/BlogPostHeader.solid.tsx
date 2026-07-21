import { Show, type JSX } from 'solid-js'
import { Avatar, Badge } from '@moderno/solid'

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

const sectionStyle: JSX.CSSProperties = {
  padding: '96px 24px',
  'text-align': 'center',
  background: 'var(--md-surface-base)',
}
const headerStyle: JSX.CSSProperties = { margin: '0 auto', 'max-width': '720px' }
const badgeWrapStyle: JSX.CSSProperties = { margin: '0 0 16px' }
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '40px',
  'line-height': 1.1,
  'letter-spacing': '-0.02em',
  color: 'var(--md-text-primary)',
  margin: '0 0 16px',
}
const subtitleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-lg)',
  'line-height': 'var(--md-text-body-lg-lh)',
  color: 'var(--md-text-secondary)',
  margin: '0 0 32px',
}
const metaRowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  gap: '8px',
}
const authorNameStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-md)',
  'font-weight': 600,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const metaTextStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

/**
 * Moderno block — BlogPostHeader (Solid). Copy-paste; edit freely.
 * Single-article header: category badge, large title, subtitle and an author/date/read-time meta row.
 * Uses the Avatar + Badge primitives + Moderno tokens.
 */
export function BlogPostHeader(props: BlogPostHeaderProps) {
  const category = () => props.category ?? 'Ingeniería'
  const title = () => props.title ?? 'Cómo escalamos nuestro sistema de diseño a cuatro frameworks'
  const subtitle = () =>
    props.subtitle ??
    'Una mirada al proceso detrás de construir Moderno: componentes headless, tokens compartidos y una sola fuente de verdad para React, Vue, Svelte y Solid.'
  const author = () => props.author ?? 'Marta Gómez'
  const date = () => props.date ?? '12 mar 2025'
  const readTime = () => props.readTime ?? '6 min de lectura'
  const initials = () => props.initials ?? 'MG'

  return (
    <header style={sectionStyle}>
      <div style={headerStyle}>
        <Show when={category()}>
          <div style={badgeWrapStyle}>
            <Badge>{category()}</Badge>
          </div>
        </Show>
        <h1 style={titleStyle}>{title()}</h1>
        <p style={subtitleStyle}>{subtitle()}</p>
        <div style={metaRowStyle}>
          <Show when={author()}>
            <Avatar src={props.avatarSrc} initials={initials()} alt={author()} size="sm" />
            <span style={authorNameStyle}>{author()}</span>
          </Show>
          <Show when={author() && (date() || readTime())}>
            <span style={metaTextStyle}>&middot;</span>
          </Show>
          <Show when={date()}>
            <span style={metaTextStyle}>{date()}</span>
          </Show>
          <Show when={date() && readTime()}>
            <span style={metaTextStyle}>&middot;</span>
          </Show>
          <Show when={readTime()}>
            <span style={metaTextStyle}>{readTime()}</span>
          </Show>
        </div>
      </div>
    </header>
  )
}
