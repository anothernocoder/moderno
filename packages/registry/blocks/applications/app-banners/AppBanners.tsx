import { useState, type CSSProperties } from 'react'
import { Button } from '@moderno/react'

export type AppBannerVariant = 'info' | 'success' | 'warning' | 'error'

export interface AppBannerItem {
  id: string
  variant?: AppBannerVariant
  icon?: string
  message: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  /** Defaults to true; set false for persistent notices (e.g. impersonation) that can't be closed. */
  dismissible?: boolean
  closeLabel?: string
}

export interface AppBannersProps {
  items?: AppBannerItem[]
  onDismiss?: (id: string) => void
}

const VARIANT_TOKEN: Record<AppBannerVariant, string> = {
  info: 'var(--md-info)',
  success: 'var(--md-success)',
  warning: 'var(--md-warning)',
  error: 'var(--md-error)',
}

const DEFAULT_ITEMS: AppBannerItem[] = [
  {
    id: 'impersonation',
    variant: 'warning',
    icon: '🕵️',
    message: 'Estás en modo impersonación: viendo la cuenta de Ana Pérez.',
    actionLabel: 'Salir',
    dismissible: false,
  },
  {
    id: 'trial',
    variant: 'info',
    icon: '⏳',
    message: 'Tu prueba termina en 3 días.',
    actionLabel: 'Actualizar plan',
  },
  {
    id: 'incident',
    variant: 'error',
    icon: '⚠️',
    message: 'Servicio degradado: algunas funciones pueden no responder con normalidad.',
  },
]

function rowStyle(variant: AppBannerVariant): CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    borderBottom: '1px solid var(--md-border-default)',
    background: `color-mix(in srgb, ${VARIANT_TOKEN[variant]} 12%, var(--md-surface-base))`,
  }
}

function iconStyle(variant: AppBannerVariant): CSSProperties {
  return { fontSize: '18px', lineHeight: 1, flexShrink: 0, color: VARIANT_TOKEN[variant] }
}

const messageStyle: CSSProperties = {
  flex: 1,
  margin: 0,
  fontSize: 'var(--md-text-body-sm)',
  lineHeight: 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-primary)',
}

function actionLinkStyle(variant: AppBannerVariant): CSSProperties {
  return { color: VARIANT_TOKEN[variant], fontWeight: 600, textDecoration: 'underline', whiteSpace: 'nowrap', flexShrink: 0 }
}

const closeButtonStyle: CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'var(--md-text-secondary)',
  font: 'inherit',
  fontSize: '16px',
  lineHeight: 1,
  cursor: 'pointer',
  padding: '4px',
  flexShrink: 0,
}

/**
 * Moderno block — AppBanners (React). Copy-paste; edit freely.
 * Application-level system notification banners: impersonation, trial, and incident notices
 * stacked full-width at the top of an authenticated app shell. Uses the Button primitive + Moderno tokens.
 */
export function AppBanners({ items = DEFAULT_ITEMS, onDismiss }: AppBannersProps) {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())

  function handleDismiss(id: string) {
    setDismissedIds((prev) => new Set(prev).add(id))
    onDismiss?.(id)
  }

  const visibleItems = items.filter((item) => !dismissedIds.has(item.id))
  if (visibleItems.length === 0) return null

  return (
    <div>
      {visibleItems.map((item) => {
        const variant = item.variant ?? 'info'
        const dismissible = item.dismissible ?? true
        return (
          <div key={item.id} role="alert" style={rowStyle(variant)}>
            {item.icon ? (
              <span aria-hidden="true" style={iconStyle(variant)}>
                {item.icon}
              </span>
            ) : null}
            <p style={messageStyle}>{item.message}</p>
            {item.actionLabel ? (
              item.actionHref ? (
                <a href={item.actionHref} style={actionLinkStyle(variant)}>
                  {item.actionLabel}
                </a>
              ) : (
                <Button label={item.actionLabel} size="sm" variant="secondary" onClick={item.onAction} />
              )
            ) : null}
            {dismissible ? (
              <button
                type="button"
                aria-label={item.closeLabel ?? 'Cerrar'}
                onClick={() => handleDismiss(item.id)}
                style={closeButtonStyle}
              >
                ×
              </button>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
