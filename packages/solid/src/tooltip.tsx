import { Show, createMemo, createUniqueId, type JSX } from 'solid-js'
import { Portal } from 'solid-js/web'
import * as tooltip from '@zag-js/tooltip'
import { useMachine, normalizeProps } from '@zag-js/solid'

export interface TooltipProps {
  /** Label of the trigger button. */
  triggerLabel: string
  /** The hint content shown in the tooltip. */
  content: JSX.Element
  /** Delay before opening, ms. @default 400 */
  openDelay?: number
  /** Delay before closing, ms. @default 150 */
  closeDelay?: number
}

/** Closed-prop Tooltip (ADR-0003) over the Zag tooltip machine. */
export function Tooltip(props: TooltipProps) {
  const service = useMachine(tooltip.machine, {
    id: createUniqueId(),
    get openDelay() {
      return props.openDelay
    },
    get closeDelay() {
      return props.closeDelay
    },
  })
  const api = createMemo(() => tooltip.connect(service, normalizeProps))

  return (
    <>
      <button {...api().getTriggerProps()} class="md-btn md-btn--secondary md-btn--sm">
        {props.triggerLabel}
      </button>
      <Show when={api().open}>
        <Portal>
          <div {...api().getPositionerProps()} class="md-tooltip-positioner">
            <div {...api().getContentProps()} class="md-tooltip-content">
              {props.content}
            </div>
          </div>
        </Portal>
      </Show>
    </>
  )
}
