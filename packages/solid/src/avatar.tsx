import { Show } from 'solid-js'
import { cx, parts, type AvatarShape, type AvatarSize } from '@moderno/class-contract'

export interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  size?: AvatarSize
  shape?: AvatarShape
}

/** User/entity avatar with image or initials fallback. Pure CSS, closed-prop. */
export function Avatar(props: AvatarProps) {
  const cls = () => cx.avatar({ size: props.size, shape: props.shape })
  return (
    <span class={cls()}>
      <Show when={props.src} fallback={props.initials}>
        <img class={parts.avatar.img} src={props.src} alt={props.alt ?? ''} />
      </Show>
    </span>
  )
}
