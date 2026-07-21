import { For, Show, type JSX } from 'solid-js'
import { Avatar, Badge, Card } from '@moderno/solid'

export interface BlogPostPreview {
  title: string
  excerpt: string
  author: string
  date: string
  avatarSrc?: string
  initials?: string
  category?: string
}

export interface BlogSectionsProps {
  kicker?: string
  title?: string
  subtitle?: string
  posts?: BlogPostPreview[]
}

const DEFAULT_POSTS: BlogPostPreview[] = [
  {
    title: 'Cómo escalamos nuestro sistema de diseño a cuatro frameworks',
    excerpt:
      'Componentes headless, una sola API y estilos compartidos: así mantenemos React, Vue, Svelte y Solid en sincronía.',
    author: 'Marta Gómez',
    date: '12 mar 2025',
    initials: 'MG',
    category: 'Ingeniería',
  },
  {
    title: 'Tokens de diseño: la base de una marca coherente',
    excerpt:
      'Por qué apostamos por variables --md-* en lugar de valores fijos, y cómo eso simplifica tematizar toda la app.',
    author: 'Carlos Peña',
    date: '28 feb 2025',
    initials: 'CP',
    category: 'Diseño',
  },
  {
    title: 'De Figma a producción sin perder fidelidad',
    excerpt: 'El flujo que usamos para llevar cada componente del diseño al código sin sorpresas de último minuto.',
    author: 'Sofía Iglesias',
    date: '15 feb 2025',
    initials: 'SI',
    category: 'Producto',
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
  'grid-template-columns': 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px',
  'max-width': '1040px',
  margin: '0 auto',
}
const badgeWrapStyle: JSX.CSSProperties = { margin: '0 0 12px' }
const postTitleStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-headline-md)',
  'line-height': 'var(--md-text-headline-md-lh)',
  'font-weight': 600,
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const excerptStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  'line-height': 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const metaRowStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'center', gap: '12px' }
const authorNameStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-label-md)',
  'font-weight': 600,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const dateStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

/**
 * Moderno block — BlogSections (Solid). Copy-paste; edit freely.
 * Post listing / preview grid: centered header above a responsive grid of post cards.
 * Uses the Card + Avatar + Badge primitives + Moderno tokens.
 */
export function BlogSections(props: BlogSectionsProps) {
  const kicker = () => props.kicker ?? 'Blog'
  const title = () => props.title ?? 'Últimas publicaciones'
  const subtitle = () => props.subtitle ?? 'Notas del equipo sobre diseño, ingeniería y producto.'
  const posts = () => props.posts ?? DEFAULT_POSTS

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker()}</p>
        <h2 style={titleStyle}>{title()}</h2>
        <p style={subtitleStyle}>{subtitle()}</p>
      </div>
      <div style={gridStyle}>
        <For each={posts()}>
          {(post) => (
            <Card
              footer={
                <div style={metaRowStyle}>
                  <Avatar src={post.avatarSrc} initials={post.initials} alt={post.author} size="sm" />
                  <div>
                    <p style={authorNameStyle}>{post.author}</p>
                    <p style={dateStyle}>{post.date}</p>
                  </div>
                </div>
              }
            >
              <Show when={post.category}>
                <div style={badgeWrapStyle}>
                  <Badge>{post.category}</Badge>
                </div>
              </Show>
              <h3 style={postTitleStyle}>{post.title}</h3>
              <p style={excerptStyle}>{post.excerpt}</p>
            </Card>
          )}
        </For>
      </div>
    </section>
  )
}
