import { cx, parts, type AvatarShape, type AvatarSize } from '@moderno/class-contract'

export interface AvatarProps {
  /** Image URL. When absent, `initials` render instead. */
  src?: string
  alt?: string
  /** Fallback initials shown when there is no image. */
  initials?: string
  size?: AvatarSize
  shape?: AvatarShape
}

/** User/entity avatar with image or initials fallback. Pure CSS, closed-prop. */
export function Avatar({ src, alt, initials, size, shape }: AvatarProps) {
  return (
    <span className={cx.avatar({ size, shape })}>
      {src ? <img className={parts.avatar.img} src={src} alt={alt ?? ''} /> : initials}
    </span>
  )
}
