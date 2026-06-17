import { useId, type ReactNode } from 'react'
import * as tooltip from '@zag-js/tooltip'
import { useMachine, normalizeProps, Portal } from '@zag-js/react'
import { cx, parts } from '@moderno/class-contract'

export interface TooltipProps {
  /** Label of the trigger button. */
  triggerLabel: string
  /** The hint content shown in the tooltip. */
  content: ReactNode
  /** Delay before opening, ms. @default 400 */
  openDelay?: number
  /** Delay before closing, ms. @default 150 */
  closeDelay?: number
}

/** Closed-prop Tooltip (ADR-0003) over the Zag tooltip machine. */
export function Tooltip({ triggerLabel, content, openDelay, closeDelay }: TooltipProps) {
  const service = useMachine(tooltip.machine, { id: useId(), openDelay, closeDelay })
  const api = tooltip.connect(service, normalizeProps)

  return (
    <>
      <button {...api.getTriggerProps()} className={cx.button({ variant: 'secondary', size: 'sm' })}>
        {triggerLabel}
      </button>
      {api.open && (
        <Portal>
          <div {...api.getPositionerProps()} className={parts.tooltip.positioner}>
            <div {...api.getContentProps()} className={parts.tooltip.content}>
              {content}
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
