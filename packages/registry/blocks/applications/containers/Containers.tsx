import type { CSSProperties } from 'react'
import { Badge, Card } from '@moderno/react'

export interface ContainerVariant {
  id: string
  name: string
  /** CSS `max-width` value, e.g. `'640px'` or `'none'` for full-bleed. */
  maxWidth: string
  description: string
}

export interface ContainersProps {
  title?: string
  description?: string
  variants?: ContainerVariant[]
}

const DEFAULT_VARIANTS: ContainerVariant[] = [
  {
    id: 'narrow',
    name: 'Angosto',
    maxWidth: '640px',
    description: 'Contenido de lectura enfocado: artículos, formularios de un paso, páginas de configuración.',
  },
  {
    id: 'default',
    name: 'Predeterminado',
    maxWidth: '768px',
    description: 'Ancho por defecto para la mayoría de páginas de panel: detalle de registro, ajustes.',
  },
  {
    id: 'wide',
    name: 'Ancho',
    maxWidth: '1024px',
    description: 'Vistas densas en datos: tablas, layouts de varias columnas, dashboards.',
  },
  {
    id: 'full',
    name: 'Completo',
    maxWidth: 'none',
    description: 'De borde a borde; el contenido gestiona su propio espaciado interno.',
  },
]

const wrapperStyle: CSSProperties = { background: 'var(--md-surface-base)', border: '1px solid var(--md-border-default)' }
const headerStyle: CSSProperties = { padding: '20px 24px', borderBottom: '1px solid var(--md-border-default)' }
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: '20px',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const rowStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '20px 24px',
  borderBottom: '1px solid var(--md-border-default)',
}
const lastRowStyle: CSSProperties = { ...rowStyle, borderBottom: 'none' }
const variantMetaStyle: CSSProperties = { display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }
const variantNameStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-md)',
  fontWeight: 500,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const variantDescStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
  lineHeight: 1.5,
}
const viewportStyle: CSSProperties = {
  background: 'var(--md-surface-subtle)',
  border: '1px dashed var(--md-border-default)',
  padding: '16px',
}
const containerBaseStyle: CSSProperties = {
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '0 24px',
  boxSizing: 'border-box',
  width: '100%',
}

/**
 * Moderno block — Containers (React). Copy-paste; edit freely.
 * Page layout wrappers: a set of named `max-width` + consistent horizontal padding
 * containers (narrow, default, wide, full-bleed) for centering page content at different
 * widths. Uses the Card + Badge primitives + Moderno tokens — no bespoke interaction logic,
 * just layout.
 */
export function Containers({
  title = 'Contenedores',
  description = 'Envoltorios de layout con ancho máximo y padding horizontal consistente para centrar el contenido de la página.',
  variants = DEFAULT_VARIANTS,
}: ContainersProps) {
  return (
    <section style={wrapperStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{title}</h2>
        {description ? <p style={descriptionStyle}>{description}</p> : null}
      </div>
      {variants.map((variant, index) => (
        <div key={variant.id} style={index === variants.length - 1 ? lastRowStyle : rowStyle}>
          <div style={variantMetaStyle}>
            <p style={variantNameStyle}>{variant.name}</p>
            <Badge>{variant.maxWidth === 'none' ? 'sin límite' : variant.maxWidth}</Badge>
          </div>
          <p style={variantDescStyle}>{variant.description}</p>
          <div style={viewportStyle}>
            <div style={{ ...containerBaseStyle, maxWidth: variant.maxWidth }}>
              <Card title="Contenido de la página">
                Este bloque se centra dentro del contenedor y conserva un padding horizontal
                consistente en cualquier ancho de viewport.
              </Card>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
