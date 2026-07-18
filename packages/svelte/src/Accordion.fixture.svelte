<script lang="ts">
  import { Accordion } from './index'
</script>

<Accordion.Root defaultValue={['a']}>
  <Accordion.Item value="a">
    <Accordion.ItemTrigger>Item A</Accordion.ItemTrigger>
    <Accordion.ItemContent>Content A</Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
