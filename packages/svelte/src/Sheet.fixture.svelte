<script lang="ts">
  import { Sheet } from './index'
  import type { SheetSide } from '@moderno/class-contract'

  let { side }: { side?: SheetSide } = $props()
</script>

<Sheet.Root>
  <Sheet.Trigger>Open cart</Sheet.Trigger>
  <Sheet.Content {side}>
    <Sheet.Title>Your cart</Sheet.Title>
    <Sheet.Close>Close</Sheet.Close>
  </Sheet.Content>
</Sheet.Root>
