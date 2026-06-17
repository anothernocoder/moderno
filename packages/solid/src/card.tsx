import { Show, type JSX } from 'solid-js'
import { parts } from '@moderno/class-contract'

export interface CardProps {
  title?: JSX.Element
  footer?: JSX.Element
  children?: JSX.Element
}

/** Container surface that groups related content and actions. Closed-prop. */
export function Card(props: CardProps) {
  return (
    <div class={parts.card.root}>
      <Show when={props.title}>
        <h3 class={parts.card.title}>{props.title}</h3>
      </Show>
      <Show when={props.children}>
        <div class={parts.card.body}>{props.children}</div>
      </Show>
      <Show when={props.footer}>
        <div class={parts.card.footer}>{props.footer}</div>
      </Show>
    </div>
  )
}
