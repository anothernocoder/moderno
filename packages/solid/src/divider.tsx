import { Show, type JSX } from 'solid-js'

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  label?: JSX.Element
}

/** Visual/semantic separator, optionally labelled. Pure CSS, closed-prop. */
export function Divider(props: DividerProps) {
  const orientation = () => props.orientation ?? 'horizontal'
  return (
    <Show
      when={props.label && orientation() === 'horizontal'}
      fallback={
        <div
          class={`md-divider md-divider--${orientation()}`}
          role="separator"
          aria-orientation={orientation() === 'vertical' ? 'vertical' : undefined}
        />
      }
    >
      <div class="md-divider-group" role="separator">
        {props.label}
      </div>
    </Show>
  )
}
