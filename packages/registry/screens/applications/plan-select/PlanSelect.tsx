import type { CSSProperties } from 'react'
import { GridLists, type GridListItem } from '../../../blocks/applications/grid-lists/GridLists'

export type { GridListItem }

export interface PlanSelectProps {
  /** Plan tiles rendered by the composed GridLists block — falls back to Moderno's
   * own Starter/Pro/Business sample plans below. */
  plans?: GridListItem[]
  /** Forwarded from the composed GridLists block's `onItemAction` — picking a
   * tile selects that plan and advances the flow immediately. */
  onNext: (plan: GridListItem) => void
  onBack?: () => void
  title?: string
  description?: string
  backLabel?: string
}

const DEFAULT_PLANS: GridListItem[] = [
  {
    id: 'starter',
    title: 'Starter',
    subtitle: '$0/mes · Para probar Moderno',
    initials: 'ST',
  },
  {
    id: 'pro',
    title: 'Pro',
    subtitle: '$29/mes · Para equipos pequeños',
    initials: 'PR',
    status: 'Recomendado',
    statusVariant: 'info',
  },
  {
    id: 'business',
    title: 'Business',
    subtitle: '$99/mes · SSO, roles y soporte prioritario',
    initials: 'BZ',
  },
]

const wrapperStyle: CSSProperties = {
  minHeight: '100%',
  background: 'var(--md-surface-base)',
}
const headerStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px 12px',
  maxWidth: '760px',
  margin: '0 auto',
  padding: '24px 24px 0',
}
const titleStyle: CSSProperties = {
  fontFamily: 'var(--md-font-serif)',
  fontSize: 'var(--md-text-headline-lg)',
  color: 'var(--md-text-primary)',
  margin: '0 0 4px',
}
const descriptionStyle: CSSProperties = {
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-secondary)',
  margin: 0,
}
const linkButtonStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  fontSize: 'var(--md-text-body-sm)',
  color: 'var(--md-text-primary)',
  textDecoration: 'underline',
  cursor: 'pointer',
}
const gridWrapStyle: CSSProperties = { maxWidth: '760px', margin: '0 auto' }

/**
 * Moderno screen — PlanSelect (React). Copy-paste; edit freely.
 * Workspace/plan step of the Onboarding flow (ADR-0005): composes the
 * Applications GridLists block — the plan tiles reuse its title/subtitle/
 * status-badge card layout rather than re-implementing it. GridLists carries
 * no internal state of its own, so wiring is a direct forward: choosing a
 * tile fires the composed block's `onItemAction`, which this screen forwards
 * straight through `onNext` — no separate "confirm" step, matching the
 * pattern where a single meaningful action advances the flow.
 */
export function PlanSelect({
  plans = DEFAULT_PLANS,
  onNext,
  onBack,
  title = 'Elige un plan',
  description = 'Puedes cambiarlo después desde la configuración del workspace.',
  backLabel = 'Volver',
}: PlanSelectProps) {
  return (
    <div style={wrapperStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>{title}</h1>
          <p style={descriptionStyle}>{description}</p>
        </div>
        {onBack ? (
          <button type="button" style={linkButtonStyle} onClick={onBack}>
            {backLabel}
          </button>
        ) : null}
      </div>
      <div style={gridWrapStyle}>
        <GridLists items={plans} onItemAction={onNext} />
      </div>
    </div>
  )
}
