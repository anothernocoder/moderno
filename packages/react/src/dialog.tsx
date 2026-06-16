import { useId, type ReactNode } from 'react'
import * as dialog from '@zag-js/dialog'
import { useMachine, normalizeProps, Portal } from '@zag-js/react'

export interface DialogProps {
  triggerLabel: string
  title: ReactNode
  description?: ReactNode
  closeLabel?: string
}

/**
 * Closed-prop Dialog (per ADR-0003): configured by props, not composed.
 * Behavior + a11y come from the Zag dialog machine; Moderno owns the markup
 * and the md-* class contract.
 */
export function Dialog({ triggerLabel, title, description, closeLabel = 'Cerrar' }: DialogProps) {
  const service = useMachine(dialog.machine, { id: useId() })
  const api = dialog.connect(service, normalizeProps)

  return (
    <>
      <button {...api.getTriggerProps()} className="md-btn md-btn--primary">
        {triggerLabel}
      </button>
      {api.open && (
        <Portal>
          <div {...api.getBackdropProps()} className="md-dialog-backdrop" />
          <div {...api.getPositionerProps()} className="md-dialog-positioner">
            <div {...api.getContentProps()} className="md-dialog-content">
              <h2 {...api.getTitleProps()} className="md-dialog-title">
                {title}
              </h2>
              {description ? (
                <p {...api.getDescriptionProps()} className="md-dialog-desc">
                  {description}
                </p>
              ) : null}
              <div className="md-dialog-actions">
                <button {...api.getCloseTriggerProps()} className="md-btn md-btn--secondary">
                  {closeLabel}
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
