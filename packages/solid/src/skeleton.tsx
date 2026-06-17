import type { JSX } from 'solid-js'
import { cx, type SkeletonVariant } from '@moderno/class-contract'

export interface SkeletonProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
}

/** Loading placeholder with a shimmer. Decorative (aria-hidden). Pure CSS. */
export function Skeleton(props: SkeletonProps) {
  const style = (): JSX.CSSProperties => ({ width: props.width, height: props.height })
  return <span class={cx.skeleton({ variant: props.variant })} style={style()} aria-hidden="true" />
}
