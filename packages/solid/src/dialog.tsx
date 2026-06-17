import { Show, createMemo, createUniqueId, type JSX } from 'solid-js'
import { Portal } from 'solid-js/web'
import * as dialog from '@zag-js/dialog'
import { useMachine, normalizeProps } from '@zag-js/solid'
import { cx, parts } from '@moderno/class-contract'

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
      <button {...api().getTriggerProps()} class={cx.button({ variant: 'primary' })}>
        {props.triggerLabel}
      </button>
      <Show when={api().open}>
        <Portal>
          <div {...api().getBackdropProps()} class={parts.dialog.backdrop} />
          <div {...api().getPositionerProps()} class={parts.dialog.positioner}>
            <div {...api().getContentProps()} class={parts.dialog.content}>
              <h2 {...api().getTitleProps()} class={parts.dialog.title}>
                {props.title}
              </h2>
              <Show when={props.description}>
                <p {...api().getDescriptionProps()} class={parts.dialog.desc}>
                  {props.description}
                </p>
              </Show>
              <div class={parts.dialog.actions}>
                <button {...api().getCloseTriggerProps()} class={cx.button({ variant: 'secondary' })}>
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
