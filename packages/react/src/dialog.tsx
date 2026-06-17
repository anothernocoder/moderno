import { useId, type ReactNode } from 'react'
import * as dialog from '@zag-js/dialog'
import { useMachine, normalizeProps, Portal } from '@zag-js/react'
import { cx, parts } from '@moderno/class-contract'

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
export function Dialog({ triggerLabel, title, description, closeLabel = 'Close' }: DialogProps) {
  const service = useMachine(dialog.machine, { id: useId() })
  const api = dialog.connect(service, normalizeProps)

  return (
    <>
      <button {...api.getTriggerProps()} className={cx.button({ variant: 'primary' })}>
        {triggerLabel}
      </button>
      {api.open && (
        <Portal>
          <div {...api.getBackdropProps()} className={parts.dialog.backdrop} />
          <div {...api.getPositionerProps()} className={parts.dialog.positioner}>
            <div {...api.getContentProps()} className={parts.dialog.content}>
              <h2 {...api.getTitleProps()} className={parts.dialog.title}>
                {title}
              </h2>
              {description ? (
                <p {...api.getDescriptionProps()} className={parts.dialog.desc}>
                  {description}
                </p>
              ) : null}
              <div className={parts.dialog.actions}>
                <button {...api.getCloseTriggerProps()} className={cx.button({ variant: 'secondary' })}>
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
