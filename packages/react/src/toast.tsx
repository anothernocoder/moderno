import { useId } from 'react'
import * as toast from '@zag-js/toast'
import { useMachine, normalizeProps, Portal } from '@zag-js/react'
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

function ToastItem({ toast: toastProps, parent, index, closeLabel }: ToastItemProps) {
  const service = useMachine(toast.machine, { ...toastProps, parent, index })
  const api = toast.connect(service, normalizeProps)

  return (
    <div {...api.getRootProps()} className={parts.toast.root}>
      {api.title ? (
        <p {...api.getTitleProps()} className={parts.toast.title}>
          {api.title}
        </p>
      ) : null}
      {api.description ? (
        <p {...api.getDescriptionProps()} className={parts.toast.description}>
          {api.description}
        </p>
      ) : null}
      {toastProps.action ? (
        <button {...api.getActionTriggerProps()} className={cx.button({ variant: 'secondary', size: 'sm' })}>
          {toastProps.action.label}
        </button>
      ) : null}
      {api.closable ? (
        <button {...api.getCloseTriggerProps()} className={parts.toast.closeTrigger} aria-label={closeLabel}>
          ✕
        </button>
      ) : null}
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
export function Toaster({ toaster, label, closeLabel = 'Dismiss' }: ToasterProps) {
  const service = useMachine(toast.group.machine, { id: useId(), store: toaster })
  const api = toast.group.connect(service, normalizeProps)

  return (
    <Portal>
      <div {...api.getGroupProps({ label })} className={parts.toast.group}>
        {api.getToasts().map((t, index) => (
          <ToastItem key={t.id} toast={t} parent={service} index={index} closeLabel={closeLabel} />
        ))}
      </div>
    </Portal>
  )
}
