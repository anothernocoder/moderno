import { Show, type JSX } from 'solid-js'

export interface CardProps {
  title?: JSX.Element
  footer?: JSX.Element
  children?: JSX.Element
}

/** Container surface that groups related content and actions. Closed-prop. */
export function Card(props: CardProps) {
  return (
    <div class="md-card">
      <Show when={props.title}>
        <h3 class="md-card__title">{props.title}</h3>
      </Show>
      <Show when={props.children}>
        <div class="md-card__body">{props.children}</div>
      </Show>
      <Show when={props.footer}>
        <div class="md-card__footer">{props.footer}</div>
      </Show>
    </div>
  )
}
