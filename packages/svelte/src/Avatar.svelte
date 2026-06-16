<script lang="ts">
  let {
    src,
    alt = '',
    initials,
    size = 'md',
    shape = 'circle',
  }: {
    src?: string
    alt?: string
    initials?: string
    size?: 'sm' | 'md' | 'lg'
    shape?: 'circle' | 'square'
  } = $props()
</script>

<span class={`md-avatar md-avatar--${size} md-avatar--${shape}`}>
  {#if src}
    <img class="md-avatar__img" {src} {alt} />
  {:else}
    {initials}
  {/if}
</span>
