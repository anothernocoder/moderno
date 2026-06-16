import TabsRoot from './TabsRoot.svelte'
import TabsList from './TabsList.svelte'
import TabsTrigger from './TabsTrigger.svelte'
import TabsContent from './TabsContent.svelte'

export { default as Button } from './Button.svelte'
export { default as Dialog } from './Dialog.svelte'

/** Compositional Tabs (ADR-0003): <Tabs.Root>/<Tabs.List>/<Tabs.Trigger>/<Tabs.Content>. */
export const Tabs = { Root: TabsRoot, List: TabsList, Trigger: TabsTrigger, Content: TabsContent }
