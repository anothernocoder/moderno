import { createSignal, createMemo, For, type JSX } from 'solid-js'
import { Alert, Button } from '@moderno/solid'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface AlertItem {
  id: string
  variant: AlertVariant
  title?: string
  description: string
  dismissible?: boolean
  actionLabel?: string
}

export interface AlertsProps {
  items?: AlertItem[]
  onDismiss?: (id: string) => void
  onAction?: (id: string) => void
}

const DEFAULT_ITEMS: AlertItem[] = [
  {
    id: 'maintenance',
    variant: 'info',
    title: 'Mantenimiento programado',
    description: 'El sistema no estará disponible el sábado de 2:00 a 4:00 a. m.',
    dismissible: true,
  },
  {
    id: 'saved',
    variant: 'success',
    title: 'Cambios guardados',
    description: 'La información de tu perfil se actualizó correctamente.',
    dismissible: true,
  },
  {
    id: 'card-expiring',
    variant: 'warning',
    title: 'Tu tarjeta vence pronto',
    description: 'Actualiza el método de pago para evitar interrupciones en tu suscripción.',
    actionLabel: 'Actualizar método de pago',
  },
  {
    id: 'payment-failed',
    variant: 'error',
    title: 'El pago no se pudo procesar',
    description: 'Verifica los datos de la tarjeta e inténtalo de nuevo.',
    actionLabel: 'Reintentar pago',
  },
]

const sectionStyle: JSX.CSSProperties = {
  display: 'flex',
  'flex-direction': 'column',
  gap: '12px',
  padding: '24px',
  background: 'var(--md-surface-base)',
}
const itemStyle: JSX.CSSProperties = { position: 'relative' }
const dismissStyle: JSX.CSSProperties = {
  position: 'absolute',
  top: '12px',
  right: '12px',
  background: 'transparent',
  border: 'none',
  color: 'inherit',
  font: 'inherit',
  'font-size': '16px',
  'line-height': 1,
  cursor: 'pointer',
  padding: '4px',
}
const actionStyle: JSX.CSSProperties = { 'margin-left': '12px' }

/**
 * Moderno block — Alerts (Solid). Copy-paste; edit freely.
 * Inline info/success/warning/error message patterns composed into an application
 * layout section (dashboard/form alerts area). Uses the Alert + Button primitives + Moderno tokens.
 */
export function Alerts(props: AlertsProps) {
  const [dismissed, setDismissed] = createSignal<Set<string>>(new Set())

  function handleDismiss(id: string) {
    setDismissed((prev) => new Set(prev).add(id))
    props.onDismiss?.(id)
  }

  const visible = createMemo(() => (props.items ?? DEFAULT_ITEMS).filter((item) => !dismissed().has(item.id)))

  return (
    <section style={sectionStyle}>
      <For each={visible()}>
        {(item) => (
          <div style={itemStyle}>
            <Alert variant={item.variant} title={item.title}>
              {item.description}
              {item.actionLabel ? (
                <Button variant="secondary" size="sm" style={actionStyle} onClick={() => props.onAction?.(item.id)}>
                  {item.actionLabel}
                </Button>
              ) : null}
            </Alert>
            {item.dismissible ? (
              <button type="button" aria-label="Cerrar" onClick={() => handleDismiss(item.id)} style={dismissStyle}>
                ×
              </button>
            ) : null}
          </div>
        )}
      </For>
    </section>
  )
}
