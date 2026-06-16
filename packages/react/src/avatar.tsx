export interface AvatarProps {
  /** Image URL. When absent, `initials` render instead. */
  src?: string
  alt?: string
  /** Fallback initials shown when there is no image. */
  initials?: string
  size?: 'sm' | 'md' | 'lg'
  shape?: 'circle' | 'square'
}

/** User/entity avatar with image or initials fallback. Pure CSS, closed-prop. */
export function Avatar({ src, alt, initials, size = 'md', shape = 'circle' }: AvatarProps) {
  const cls = `md-avatar md-avatar--${size} md-avatar--${shape}`
  return (
    <span className={cls}>
      {src ? <img className="md-avatar__img" src={src} alt={alt ?? ''} /> : initials}
    </span>
  )
}
