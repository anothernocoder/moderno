<script lang="ts">
  import { cx, type SpinnerSize } from '@moderno-ui/class-contract'

  let {
    size,
    label = 'Loading',
  }: {
    size?: SpinnerSize
    label?: string
  } = $props()
</script>

<span class={cx.spinner({ size })} role="status" aria-label={label}></span>
