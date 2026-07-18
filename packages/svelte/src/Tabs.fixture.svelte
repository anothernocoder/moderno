<script lang="ts">
  import { Tabs } from './index'
</script>

<Tabs.Root defaultValue="a">
  <Tabs.List>
    <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
    <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="a">Content A</Tabs.Content>
  <Tabs.Content value="b">Content B</Tabs.Content>
</Tabs.Root>
