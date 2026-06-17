import { useId, type ReactNode } from 'react'
import * as popover from '@zag-js/popover'
import { useMachine, normalizeProps, Portal } from '@zag-js/react'

export interface PopoverProps {
  /** Label of the trigger button. */
  triggerLabel: string
  /** Optional heading shown at the top of the panel. */
  title?: ReactNode
  /** Panel body content. */
  content: ReactNode
  /** Accessible label for the close button. @default 'Close' */
  closeLabel?: string
}

/**
 * Closed-prop Popover (ADR-0003) over the Zag popover machine.
 * Anchored, non-modal panel: behavior + a11y from Zag, Moderno owns the markup
 * and the md-* class contract.
 */
export function Popover({ triggerLabel, title, content, closeLabel = 'Close' }: PopoverProps) {
  const service = useMachine(popover.machine, { id: useId() })
  const api = popover.connect(service, normalizeProps)

  return (
    <>
      <button {...api.getTriggerProps()} className="md-btn md-btn--secondary md-btn--sm">
        {triggerLabel}
      </button>
      {api.open && (
        <Portal>
          <div {...api.getPositionerProps()} className="md-popover-positioner">
            <div {...api.getContentProps()} className="md-popover-content">
              <div {...api.getArrowProps()} className="md-popover-arrow">
                <div {...api.getArrowTipProps()} />
              </div>
              {title ? (
                <p {...api.getTitleProps()} className="md-popover-title">
                  {title}
                </p>
              ) : null}
              <div {...api.getDescriptionProps()} className="md-popover-body">
                {content}
              </div>
              <button
                {...api.getCloseTriggerProps()}
                className="md-popover-close"
                aria-label={closeLabel}
              >
                ✕
              </button>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
