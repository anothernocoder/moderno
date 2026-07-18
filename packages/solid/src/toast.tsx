import { For, Show, createMemo, createUniqueId } from 'solid-js'
import { Portal } from 'solid-js/web'
import * as toast from '@zag-js/toast'
import { useMachine, normalizeProps } from '@zag-js/solid'
import { cx, parts } from '@moderno/class-contract'

export type ToastOptions = toast.Options
export type Toaster = toast.Store

/** Create a toaster store: hold it in module scope and call `.create()` from anywhere. */
export function createToaster(options?: toast.StoreProps): Toaster {
  return toast.createStore(options)
}

export interface ToasterProps {
  /** The toaster store returned by `createToaster`. */
  toaster: Toaster
  /** Accessible label for the notification region. @default 'Notifications' */
  label?: string
  /** Accessible label for each toast's close button. @default 'Dismiss' */
  closeLabel?: string
}

interface ToastItemProps {
  toast: toast.Props
  parent: toast.GroupService
  index: number
  closeLabel: string
}

function ToastItem(props: ToastItemProps) {
  const service = useMachine(toast.machine, {
    get parent() {
      return props.parent
    },
    get id() {
      return props.toast.id
    },
    get index() {
      return props.index
    },
    get title() {
      return props.toast.title
    },
    get description() {
      return props.toast.description
    },
    get type() {
      return props.toast.type
    },
    get duration() {
      return props.toast.duration
    },
    get removeDelay() {
      return props.toast.removeDelay
    },
    get closable() {
      return props.toast.closable
    },
    get action() {
      return props.toast.action
    },
  })
  const api = createMemo(() => toast.connect(service, normalizeProps))

  return (
    <div {...api().getRootProps()} class={parts.toast.root}>
      <Show when={api().title}>
        <p {...api().getTitleProps()} class={parts.toast.title}>
          {api().title}
        </p>
      </Show>
      <Show when={api().description}>
        <p {...api().getDescriptionProps()} class={parts.toast.description}>
          {api().description}
        </p>
      </Show>
      <Show when={props.toast.action}>
        <button {...api().getActionTriggerProps()} class={cx.button({ variant: 'secondary', size: 'sm' })}>
          {props.toast.action?.label}
        </button>
      </Show>
      <Show when={api().closable}>
        <button {...api().getCloseTriggerProps()} class={parts.toast.closeTrigger} aria-label={props.closeLabel}>
          ✕
        </button>
      </Show>
    </div>
  )
}

/**
 * Closed-prop Toaster (ADR-0003) over the Zag toast machine.
 * Renders the notification region for a toaster store created with
 * `createToaster`; behavior, stacking, timers and a11y come from Zag's
 * `toast` group + item machines. Mount once and trigger toasts from
 * anywhere with `toaster.create(...)`.
 */
export function Toaster(props: ToasterProps) {
  const closeLabel = () => props.closeLabel ?? 'Dismiss'
  const service = useMachine(toast.group.machine, {
    id: createUniqueId(),
    get store() {
      return props.toaster
    },
  })
  const api = createMemo(() => toast.group.connect(service, normalizeProps))

  return (
    <Portal>
      <div {...api().getGroupProps({ label: props.label })} class={parts.toast.group}>
        <For each={api().getToasts()}>
          {(t, index) => <ToastItem toast={t} parent={service} index={index()} closeLabel={closeLabel()} />}
        </For>
      </div>
    </Portal>
  )
}
