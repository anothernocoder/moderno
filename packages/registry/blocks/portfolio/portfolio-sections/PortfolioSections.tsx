import { useState, type CSSProperties } from 'react'

export interface PortfolioProject {
  title: string
  meta: string
  image?: string
  href: string
}

export interface PortfolioSectionsProps {
  projects?: PortfolioProject[]
  onSelect?: (project: PortfolioProject) => void
}

const DEFAULT_PROJECTS: PortfolioProject[] = [
  { title: 'Moderno — sistema de diseño', meta: 'Design systems · 2025', href: '#moderno-sistema-de-diseno' },
  { title: 'Checkout de Rappi Turbo', meta: 'Producto · 2024', href: '#checkout-rappi-turbo' },
  { title: 'Rediseño de app bancaria', meta: 'Fintech · 2023', href: '#rediseno-app-bancaria' },
  { title: 'Dashboard de analítica para Platzi', meta: 'Data viz · 2022', href: '#dashboard-analitica-platzi' },
]

const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
}

const metaRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '20px',
}

const metaTextStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: '4px 0 0',
}

/**
 * Moderno block — PortfolioSections (React). Copy-paste; edit freely.
 * Work showcase grid. Uses Moderno tokens only (no primitives).
 */
export function PortfolioSections({ projects = DEFAULT_PROJECTS, onSelect }: PortfolioSectionsProps) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section style={gridStyle}>
      {projects.map((project) => {
        const isHovered = hovered === project.href
        const cardStyle: CSSProperties = {
          display: 'block',
          overflow: 'hidden',
          background: 'var(--md-surface-base)',
          border: `1px solid ${isHovered ? 'var(--md-border-strong)' : 'var(--md-border-default)'}`,
          textDecoration: 'none',
        }
        return (
          <a
            key={project.href}
            href={project.href}
            style={cardStyle}
            onMouseEnter={() => setHovered(project.href)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect?.(project)}
          >
            <div
              style={{
                aspectRatio: '16 / 10',
                background: 'var(--md-surface-muted)',
                backgroundImage: project.image ? `url(${project.image})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div style={metaRowStyle}>
              <div>
                <p
                  style={{
                    fontSize: 'var(--md-text-body-md)',
                    color: 'var(--md-text-primary)',
                    margin: 0,
                    textDecoration: isHovered ? 'underline' : 'none',
                    textUnderlineOffset: '4px',
                  }}
                >
                  {project.title}
                </p>
                <p style={metaTextStyle}>{project.meta}</p>
              </div>
              <span
                style={{
                  color: isHovered ? 'var(--md-text-primary)' : 'var(--md-text-secondary)',
                  transform: isHovered ? 'translateX(4px)' : 'none',
                  transition: 'transform 0.15s ease, color 0.15s ease',
                }}
              >
                →
              </span>
            </div>
          </a>
        )
      })}
    </section>
  )
}
