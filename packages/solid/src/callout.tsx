import { Show, type JSX } from 'solid-js'

export interface CalloutProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: JSX.Element
  children: JSX.Element
}

/** Highlighted block that draws attention to a message or tip. Closed-prop. */
export function Callout(props: CalloutProps) {
  return (
    <div class={`md-callout md-callout--${props.variant ?? 'info'}`} role="note">
      <Show when={props.title}>
        <p class="md-callout__title">{props.title}</p>
      </Show>
      <p class="md-callout__body">{props.children}</p>
    </div>
  )
}
