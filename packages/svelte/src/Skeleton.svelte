<script lang="ts">
  import { cx, type SkeletonVariant } from '@moderno/class-contract'

  let {
    variant,
    width,
    height,
  }: {
    variant?: SkeletonVariant
    width?: string | number
    height?: string | number
  } = $props()

  const len = (v: string | number | undefined) => (typeof v === 'number' ? `${v}px` : v)
  const style = $derived(
    [width != null && `width:${len(width)}`, height != null && `height:${len(height)}`].filter(Boolean).join(';'),
  )
</script>

<span class={cx.skeleton({ variant })} {style} aria-hidden="true"></span>
