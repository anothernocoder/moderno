import { For, type JSX } from 'solid-js'
import { Button, Card } from '@moderno/solid'

export interface PanelItem {
  id: string
  title: string
  body: string
  actionLabel?: string
}

export interface PanelsProps {
  title?: string
  description?: string
  panels?: PanelItem[]
  onPanelAction?: (panel: PanelItem) => void
}

const DEFAULT_PANELS: PanelItem[] = [
  { id: 'profile', title: 'Perfil', body: 'Actualiza tu nombre, foto y biografía pública.', actionLabel: 'Editar perfil' },
  {
    id: 'notifications',
    title: 'Notificaciones',
    body: 'Elige qué actualizaciones quieres recibir por correo y en la app.',
    actionLabel: 'Gestionar',
  },
  {
    id: 'billing',
    title: 'Facturación',
    body: 'Consulta tu plan actual, método de pago y el historial de facturas.',
    actionLabel: 'Ver facturación',
  },
  {
    id: 'security',
    title: 'Seguridad',
    body: 'Activa la verificación en dos pasos y revisa las sesiones activas.',
    actionLabel: 'Revisar',
  },
]

const wrapperStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-direction': 'column',
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
}
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
const gridStyle: JSX.CSSProperties = {
  display: 'grid',
  'grid-template-columns': 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '16px',
  padding: '20px 24px',
}
const panelBodyStyle: JSX.CSSProperties = {
  'font-size': 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  'line-height': 1.5,
  margin: '8px 0 0',
}

/**
 * Moderno block — Panels (Solid). Copy-paste; edit freely.
 * Generic panel surfaces for grouping content within a screen: a header (title + description)
 * above a responsive grid of bordered panel surfaces, each with a heading, a body slot, and an
 * optional footer action. Uses the Card + Button primitives + Moderno tokens — no new
 * primitives and no bespoke interaction logic, just layout.
 */
export function Panels(props: PanelsProps) {
  const title = () => props.title ?? 'Ajustes de la cuenta'
  const description = () =>
    props.description ?? 'Agrupa opciones relacionadas en paneles independientes dentro de la misma pantalla.'
  const panels = () => props.panels ?? DEFAULT_PANELS

  return (
    <section style={wrapperStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{title()}</h2>
        {description() ? <p style={descriptionStyle}>{description()}</p> : null}
      </div>
      <div style={gridStyle}>
        <For each={panels()}>
          {(panel) => (
            <Card
              title={panel.title}
              footer={
                panel.actionLabel ? (
                  <Button variant="secondary" size="sm" onClick={() => props.onPanelAction?.(panel)} style={{ width: '100%' }}>
                    {panel.actionLabel}
                  </Button>
                ) : undefined
              }
            >
              <p style={panelBodyStyle}>{panel.body}</p>
            </Card>
          )}
        </For>
      </div>
    </section>
  )
}
