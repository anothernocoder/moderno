<script lang="ts">
  let {
    variant = 'text',
    width,
    height,
  }: {
    variant?: 'text' | 'rect' | 'circle'
    width?: string | number
    height?: string | number
  } = $props()

  const len = (v: string | number | undefined) => (typeof v === 'number' ? `${v}px` : v)
  const style = $derived(
    [width != null && `width:${len(width)}`, height != null && `height:${len(height)}`].filter(Boolean).join(';'),
  )
</script>

<span class={`md-skeleton md-skeleton--${variant}`} {style} aria-hidden="true"></span>
