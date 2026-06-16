import type { JSX } from 'solid-js'

export interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle'
  width?: string | number
  height?: string | number
}

/** Loading placeholder with a shimmer. Decorative (aria-hidden). Pure CSS. */
export function Skeleton(props: SkeletonProps) {
  const style = (): JSX.CSSProperties => ({ width: props.width, height: props.height })
  return <span class={`md-skeleton md-skeleton--${props.variant ?? 'text'}`} style={style()} aria-hidden="true" />
}
