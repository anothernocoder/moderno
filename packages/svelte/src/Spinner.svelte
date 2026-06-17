<script lang="ts">
  import { cx, type SpinnerSize } from '@moderno/class-contract'

  let {
    size,
    label = 'Loading',
  }: {
    size?: SpinnerSize
    label?: string
  } = $props()
</script>

<span class={cx.spinner({ size })} role="status" aria-label={label}></span>
