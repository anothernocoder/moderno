<script lang="ts">
  import { cx, parts, type AvatarSize, type AvatarShape } from '@moderno/class-contract'

  let {
    src,
    alt = '',
    initials,
    size,
    shape,
  }: {
    src?: string
    alt?: string
    initials?: string
    size?: AvatarSize
    shape?: AvatarShape
  } = $props()
</script>

<span class={cx.avatar({ size, shape })}>
  {#if src}
    <img class={parts.avatar.img} {src} {alt} />
  {:else}
    {initials}
  {/if}
</span>
