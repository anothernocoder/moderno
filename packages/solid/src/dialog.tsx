import { Show, createMemo, createUniqueId, type JSX } from 'solid-js'
import { Portal } from 'solid-js/web'
import * as dialog from '@zag-js/dialog'
import { useMachine, normalizeProps } from '@zag-js/solid'

export interface DialogProps {
  triggerLabel: string
  title: JSX.Element
  description?: JSX.Element
  closeLabel?: string
}

/** Closed-prop Dialog (ADR-0003) over the Zag dialog machine. */
export function Dialog(props: DialogProps) {
  const service = useMachine(dialog.machine, { id: createUniqueId() })
  const api = createMemo(() => dialog.connect(service, normalizeProps))

  return (
    <>
      <button {...api().getTriggerProps()} class="md-btn md-btn--primary">
        {props.triggerLabel}
      </button>
      <Show when={api().open}>
        <Portal>
          <div {...api().getBackdropProps()} class="md-dialog-backdrop" />
          <div {...api().getPositionerProps()} class="md-dialog-positioner">
            <div {...api().getContentProps()} class="md-dialog-content">
              <h2 {...api().getTitleProps()} class="md-dialog-title">
                {props.title}
              </h2>
              <Show when={props.description}>
                <p {...api().getDescriptionProps()} class="md-dialog-desc">
                  {props.description}
                </p>
              </Show>
              <div class="md-dialog-actions">
                <button {...api().getCloseTriggerProps()} class="md-btn md-btn--secondary">
                  {props.closeLabel ?? 'Close'}
                </button>
              </div>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  )
}
