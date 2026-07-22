import { createSignal, For, Show } from 'solid-js'
import type { JSX } from 'solid-js'
import { Button } from '@moderno/solid'

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

function rowStyle(variant: AppBannerVariant): JSX.CSSProperties {
  return {
    display: 'flex',
    'align-items': 'center',
    gap: '12px',
    padding: '12px 20px',
    'border-bottom': '1px solid var(--md-border-default)',
    background: `color-mix(in srgb, ${VARIANT_TOKEN[variant]} 12%, var(--md-surface-base))`,
  }
}

function iconStyle(variant: AppBannerVariant): JSX.CSSProperties {
  return { 'font-size': '18px', 'line-height': 1, 'flex-shrink': 0, color: VARIANT_TOKEN[variant] }
}

const messageStyle: JSX.CSSProperties = {
  flex: 1,
  margin: 0,
  'font-size': 'var(--md-text-body-sm)',
  'line-height': 'var(--md-text-body-sm-lh)',
  color: 'var(--md-text-primary)',
}

function actionLinkStyle(variant: AppBannerVariant): JSX.CSSProperties {
  return {
    color: VARIANT_TOKEN[variant],
    'font-weight': 600,
    'text-decoration': 'underline',
    'white-space': 'nowrap',
    'flex-shrink': 0,
  }
}

const closeButtonStyle: JSX.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'var(--md-text-secondary)',
  font: 'inherit',
  'font-size': '16px',
  'line-height': 1,
  cursor: 'pointer',
  padding: '4px',
  'flex-shrink': 0,
}

/**
 * Moderno block — AppBanners (Solid). Copy-paste; edit freely.
 * Application-level system notification banners: impersonation, trial, and incident notices
 * stacked full-width at the top of an authenticated app shell. Uses the Button primitive + Moderno tokens.
 */
export function AppBanners(props: AppBannersProps) {
  const [dismissedIds, setDismissedIds] = createSignal<Set<string>>(new Set())

  function handleDismiss(id: string) {
    setDismissedIds((prev) => new Set(prev).add(id))
    props.onDismiss?.(id)
  }

  const items = () => props.items ?? DEFAULT_ITEMS
  const visibleItems = () => items().filter((item) => !dismissedIds().has(item.id))

  return (
    <div>
      <For each={visibleItems()}>
        {(item) => {
          const variant = item.variant ?? 'info'
          const dismissible = item.dismissible ?? true
          return (
            <div role="alert" style={rowStyle(variant)}>
              <Show when={item.icon}>
                <span aria-hidden="true" style={iconStyle(variant)}>
                  {item.icon}
                </span>
              </Show>
              <p style={messageStyle}>{item.message}</p>
              <Show when={item.actionLabel}>
                <Show
                  when={item.actionHref}
                  fallback={<Button label={item.actionLabel} size="sm" variant="secondary" onClick={item.onAction} />}
                >
                  <a href={item.actionHref} style={actionLinkStyle(variant)}>
                    {item.actionLabel}
                  </a>
                </Show>
              </Show>
              <Show when={dismissible}>
                <button
                  type="button"
                  aria-label={item.closeLabel ?? 'Cerrar'}
                  onClick={() => handleDismiss(item.id)}
                  style={closeButtonStyle}
                >
                  ×
                </button>
              </Show>
            </div>
          )
        }}
      </For>
    </div>
  )
}
