import { Show, createMemo, createUniqueId, type JSX } from 'solid-js'
import { Portal } from 'solid-js/web'
import * as popover from '@zag-js/popover'
import { useMachine, normalizeProps } from '@zag-js/solid'

export interface PopoverProps {
  /** Label of the trigger button. */
  triggerLabel: string
  /** Optional heading shown at the top of the panel. */
  title?: JSX.Element
  /** Panel body content. */
  content: JSX.Element
  /** Accessible label for the close button. @default 'Close' */
  closeLabel?: string
}

/** Closed-prop Popover (ADR-0003) over the Zag popover machine. */
export function Popover(props: PopoverProps) {
  const service = useMachine(popover.machine, { id: createUniqueId() })
  const api = createMemo(() => popover.connect(service, normalizeProps))

  return (
    <>
      <button {...api().getTriggerProps()} class="md-btn md-btn--secondary md-btn--sm">
        {props.triggerLabel}
      </button>
      <Show when={api().open}>
        <Portal>
          <div {...api().getPositionerProps()} class="md-popover-positioner">
            <div {...api().getContentProps()} class="md-popover-content">
              <div {...api().getArrowProps()} class="md-popover-arrow">
                <div {...api().getArrowTipProps()} />
              </div>
              <Show when={props.title}>
                <p {...api().getTitleProps()} class="md-popover-title">
                  {props.title}
                </p>
              </Show>
              <div {...api().getDescriptionProps()} class="md-popover-body">
                {props.content}
              </div>
              <button
                {...api().getCloseTriggerProps()}
                class="md-popover-close"
                aria-label={props.closeLabel ?? 'Close'}
              >
                ✕
              </button>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  )
}
