import { Show, type JSX } from 'solid-js'
import { cx, parts, type CalloutVariant } from '@moderno/class-contract'

export interface CalloutProps {
  variant?: CalloutVariant
  title?: JSX.Element
  children: JSX.Element
}

/** Highlighted block that draws attention to a message or tip. Closed-prop. */
export function Callout(props: CalloutProps) {
  return (
    <div class={cx.callout({ variant: props.variant })} role="note">
      <Show when={props.title}>
        <p class={parts.callout.title}>{props.title}</p>
      </Show>
      <p class={parts.callout.body}>{props.children}</p>
    </div>
  )
}
