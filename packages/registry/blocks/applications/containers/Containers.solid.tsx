import { For, type JSX } from 'solid-js'
import { Badge, Card } from '@moderno/solid'

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

const wrapperStyle: JSX.CSSProperties = { background: 'var(--md-surface-base)', border: '1px solid var(--md-border-default)' }
const headerStyle: JSX.CSSProperties = { padding: '20px 24px', 'border-bottom': '1px solid var(--md-border-default)' }
const titleStyle: JSX.CSSProperties = {
  'font-family': 'var(--md-font-serif)',
  'font-size': '20px',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const descriptionStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const rowStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-direction': 'column',
  gap: '12px',
  padding: '20px 24px',
  'border-bottom': '1px solid var(--md-border-default)',
}
const lastRowStyle: JSX.CSSProperties = { ...rowStyle, 'border-bottom': 'none' }
const variantMetaStyle: JSX.CSSProperties = { display: 'flex', 'align-items': 'baseline', gap: '8px', 'flex-wrap': 'wrap' }
const variantNameStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-md)',
  'font-weight': 500,
  color: 'var(--md-text-primary)',
  margin: 0,
}
const variantDescStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
  'line-height': 1.5,
}
const viewportStyle: JSX.CSSProperties = {
  background: 'var(--md-surface-subtle)',
  border: '1px dashed var(--md-border-default)',
  padding: '16px',
}
const containerBaseStyle: JSX.CSSProperties = {
  'margin-left': 'auto',
  'margin-right': 'auto',
  padding: '0 24px',
  'box-sizing': 'border-box',
  width: '100%',
}

/**
 * Moderno block — Containers (Solid). Copy-paste; edit freely.
 * Page layout wrappers: a set of named `max-width` + consistent horizontal padding
 * containers (narrow, default, wide, full-bleed) for centering page content at different
 * widths. Uses the Card + Badge primitives + Moderno tokens — no bespoke interaction logic,
 * just layout.
 */
export function Containers(props: ContainersProps) {
  const title = () => props.title ?? 'Contenedores'
  const description = () =>
    props.description ??
    'Envoltorios de layout con ancho máximo y padding horizontal consistente para centrar el contenido de la página.'
  const variants = () => props.variants ?? DEFAULT_VARIANTS

  return (
    <section style={wrapperStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{title()}</h2>
        {description() ? <p style={descriptionStyle}>{description()}</p> : null}
      </div>
      <For each={variants()}>
        {(variant, index) => (
          <div style={index() === variants().length - 1 ? lastRowStyle : rowStyle}>
            <div style={variantMetaStyle}>
              <p style={variantNameStyle}>{variant.name}</p>
              <Badge>{variant.maxWidth === 'none' ? 'sin límite' : variant.maxWidth}</Badge>
            </div>
            <p style={variantDescStyle}>{variant.description}</p>
            <div style={viewportStyle}>
              <div style={{ ...containerBaseStyle, 'max-width': variant.maxWidth }}>
                <Card title="Contenido de la página">
                  Este bloque se centra dentro del contenedor y conserva un padding horizontal
                  consistente en cualquier ancho de viewport.
                </Card>
              </div>
            </div>
          </div>
        )}
      </For>
    </section>
  )
}
