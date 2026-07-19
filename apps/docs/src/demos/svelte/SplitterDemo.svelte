<script lang="ts">
  import { Splitter } from '@moderno/svelte'
</script>

<div style="height: 260px">
  <Splitter panels={[{ id: 'sidebar', minSize: 20, maxSize: 50 }, { id: 'main' }]} defaultSize={[30, 70]}>
    {#snippet sidebar()}<div style="padding: var(--md-spacing-6)">Sidebar</div>{/snippet}
    {#snippet main()}<div style="padding: var(--md-spacing-6)">Main content</div>{/snippet}
  </Splitter>
</div>
