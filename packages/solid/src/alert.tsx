import { Show, type JSX } from 'solid-js'
import { cx, parts, type AlertVariant } from '@moderno/class-contract'

export interface AlertProps {
  variant?: AlertVariant
  title?: JSX.Element
  children: JSX.Element
}

/** Inline feedback message (info/success/warning/error). Closed-prop, pure CSS. */
export function Alert(props: AlertProps) {
  return (
    <div class={cx.alert({ variant: props.variant })} role="alert">
      <Show when={props.title}>
        <p class={parts.alert.title}>{props.title}</p>
      </Show>
      <p class={parts.alert.body}>{props.children}</p>
    </div>
  )
}
