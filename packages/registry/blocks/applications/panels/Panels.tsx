import type { CSSProperties } from 'react'
import { Button, Card } from '@moderno/react'

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

const wrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  background: 'var(--md-surface-base)',
  border: '1px solid var(--md-border-default)',
}
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
const gridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '16px',
  padding: '20px 24px',
}
const panelBodyStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  lineHeight: 1.5,
  margin: '8px 0 0',
}

/**
 * Moderno block — Panels (React). Copy-paste; edit freely.
 * Generic panel surfaces for grouping content within a screen: a header (title + description)
 * above a responsive grid of bordered panel surfaces, each with a heading, a body slot, and an
 * optional footer action. Uses the Card + Button primitives + Moderno tokens — no new
 * primitives and no bespoke interaction logic, just layout.
 */
export function Panels({
  title = 'Ajustes de la cuenta',
  description = 'Agrupa opciones relacionadas en paneles independientes dentro de la misma pantalla.',
  panels = DEFAULT_PANELS,
  onPanelAction,
}: PanelsProps) {
  return (
    <section style={wrapperStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{title}</h2>
        {description ? <p style={descriptionStyle}>{description}</p> : null}
      </div>
      <div style={gridStyle}>
        {panels.map((panel) => (
          <Card
            key={panel.id}
            title={panel.title}
            footer={
              panel.actionLabel ? (
                <Button variant="secondary" size="sm" onClick={() => onPanelAction?.(panel)} style={{ width: '100%' }}>
                  {panel.actionLabel}
                </Button>
              ) : undefined
            }
          >
            <p style={panelBodyStyle}>{panel.body}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
