import { createSignal, For, type JSX } from 'solid-js'

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

const gridStyle: JSX.CSSProperties = {
  display: 'grid',
  'grid-template-columns': 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
}

const metaRowStyle: JSX.CSSProperties = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  gap: '12px',
  padding: '20px',
}

const metaTextStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: '4px 0 0',
}

/**
 * Moderno block — PortfolioSections (Solid). Copy-paste; edit freely.
 * Work showcase grid. Uses Moderno tokens only (no primitives).
 */
export function PortfolioSections(props: PortfolioSectionsProps) {
  const [hovered, setHovered] = createSignal<string | null>(null)
  const projects = () => props.projects ?? DEFAULT_PROJECTS

  return (
    <section style={gridStyle}>
      <For each={projects()}>
        {(project) => {
          const isHovered = () => hovered() === project.href
          const cardStyle = (): JSX.CSSProperties => ({
            display: 'block',
            overflow: 'hidden',
            background: 'var(--md-surface-base)',
            border: `1px solid ${isHovered() ? 'var(--md-border-strong)' : 'var(--md-border-default)'}`,
            'text-decoration': 'none',
          })
          const imageStyle = (): JSX.CSSProperties => ({
            'aspect-ratio': '16 / 10',
            background: 'var(--md-surface-muted)',
            'background-image': project.image ? `url(${project.image})` : undefined,
            'background-size': 'cover',
            'background-position': 'center',
          })
          const titleStyle = (): JSX.CSSProperties => ({
            'font-size': 'var(--md-text-body-md)',
            color: 'var(--md-text-primary)',
            margin: 0,
            'text-decoration': isHovered() ? 'underline' : 'none',
            'text-underline-offset': '4px',
          })
          const arrowStyle = (): JSX.CSSProperties => ({
            color: isHovered() ? 'var(--md-text-primary)' : 'var(--md-text-secondary)',
            transform: isHovered() ? 'translateX(4px)' : 'none',
            transition: 'transform 0.15s ease, color 0.15s ease',
          })
          return (
            <a
              href={project.href}
              style={cardStyle()}
              onMouseEnter={() => setHovered(project.href)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => props.onSelect?.(project)}
            >
              <div style={imageStyle()} />
              <div style={metaRowStyle}>
                <div>
                  <p style={titleStyle()}>{project.title}</p>
                  <p style={metaTextStyle}>{project.meta}</p>
                </div>
                <span style={arrowStyle()}>→</span>
              </div>
            </a>
          )
        }}
      </For>
    </section>
  )
}
