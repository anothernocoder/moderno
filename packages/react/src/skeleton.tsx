import type { CSSProperties } from 'react'
import { cx, type SkeletonVariant } from '@moderno/class-contract'

export interface SkeletonProps {
  variant?: SkeletonVariant
  /** CSS length; a number is treated as pixels. */
  width?: string | number
  /** CSS length; a number is treated as pixels. */
  height?: string | number
}

/** Loading placeholder with a shimmer. Decorative (aria-hidden). Pure CSS. */
export function Skeleton({ variant, width, height }: SkeletonProps) {
  const style: CSSProperties = { width, height }
  return <span className={cx.skeleton({ variant })} style={style} aria-hidden="true" />
}
