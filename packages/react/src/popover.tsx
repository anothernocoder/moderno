import { useId, type ReactNode } from 'react'
import * as popover from '@zag-js/popover'
import { useMachine, normalizeProps, Portal } from '@zag-js/react'
import { cx, parts } from '@moderno/class-contract'

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
      <button {...api.getTriggerProps()} className={cx.button({ variant: 'secondary', size: 'sm' })}>
        {triggerLabel}
      </button>
      {api.open && (
        <Portal>
          <div {...api.getPositionerProps()} className={parts.popover.positioner}>
            <div {...api.getContentProps()} className={parts.popover.content}>
              <div {...api.getArrowProps()} className={parts.popover.arrow}>
                <div {...api.getArrowTipProps()} />
              </div>
              {title ? (
                <p {...api.getTitleProps()} className={parts.popover.title}>
                  {title}
                </p>
              ) : null}
              <div {...api.getDescriptionProps()} className={parts.popover.body}>
                {content}
              </div>
              <button
                {...api.getCloseTriggerProps()}
                className={parts.popover.close}
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
