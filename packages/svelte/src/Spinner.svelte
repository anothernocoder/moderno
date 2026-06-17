<script lang="ts">
  let {
    size = 'md',
    label = 'Loading',
  }: {
    size?: 'sm' | 'md' | 'lg'
    label?: string
  } = $props()
</script>

<span class={`md-spinner md-spinner--${size}`} role="status" aria-label={label}></span>
