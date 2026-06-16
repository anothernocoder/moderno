import type { CSSProperties } from 'react'

export interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle'
  /** CSS length; a number is treated as pixels. */
  width?: string | number
  /** CSS length; a number is treated as pixels. */
  height?: string | number
}

/** Loading placeholder with a shimmer. Decorative (aria-hidden). Pure CSS. */
export function Skeleton({ variant = 'text', width, height }: SkeletonProps) {
  const style: CSSProperties = { width, height }
  return <span className={`md-skeleton md-skeleton--${variant}`} style={style} aria-hidden="true" />
}
