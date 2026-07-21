import type { CSSProperties } from 'react'
import { Avatar, Badge, Card } from '@moderno/react'

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
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px',
  maxWidth: '1040px',
  margin: '0 auto',
}
const badgeWrapStyle: CSSProperties = { margin: '0 0 12px' }
const postTitleStyle: CSSProperties = {
  fontSize: 'var(--md-text-headline-md)',
  lineHeight: 'var(--md-text-headline-md-lh)',
  fontWeight: 600,
  color: 'var(--md-text-primary)',
  margin: '0 0 8px',
}
const excerptStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  lineHeight: 'var(--md-text-body-md-lh)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const metaRowStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '12px' }
const authorNameStyle: CSSProperties = {
  fontSize: 'var(--md-text-label-md)',
  fontWeight: 600,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const dateStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}

/**
 * Moderno block — BlogSections (React). Copy-paste; edit freely.
 * Post listing / preview grid: centered header above a responsive grid of post cards.
 * Uses the Card + Avatar + Badge primitives + Moderno tokens.
 */
export function BlogSections({
  kicker = 'Blog',
  title = 'Últimas publicaciones',
  subtitle = 'Notas del equipo sobre diseño, ingeniería y producto.',
  posts = DEFAULT_POSTS,
}: BlogSectionsProps) {
  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <p style={kickerStyle}>{kicker}</p>
        <h2 style={titleStyle}>{title}</h2>
        <p style={subtitleStyle}>{subtitle}</p>
      </div>
      <div style={gridStyle}>
        {posts.map((post) => (
          <Card
            key={post.title}
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
            {post.category ? (
              <div style={badgeWrapStyle}>
                <Badge>{post.category}</Badge>
              </div>
            ) : null}
            <h3 style={postTitleStyle}>{post.title}</h3>
            <p style={excerptStyle}>{post.excerpt}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
