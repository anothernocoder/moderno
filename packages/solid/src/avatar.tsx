import { Show } from 'solid-js'

export interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  size?: 'sm' | 'md' | 'lg'
  shape?: 'circle' | 'square'
}

/** User/entity avatar with image or initials fallback. Pure CSS, closed-prop. */
export function Avatar(props: AvatarProps) {
  const cls = () => `md-avatar md-avatar--${props.size ?? 'md'} md-avatar--${props.shape ?? 'circle'}`
  return (
    <span class={cls()}>
      <Show when={props.src} fallback={props.initials}>
        <img class="md-avatar__img" src={props.src} alt={props.alt ?? ''} />
      </Show>
    </span>
  )
}
