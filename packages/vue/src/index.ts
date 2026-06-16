import TabsRoot from './TabsRoot.vue'
import TabsList from './TabsList.vue'
import TabsTrigger from './TabsTrigger.vue'
import TabsContent from './TabsContent.vue'

export { default as Button } from './Button.vue'
export { default as Dialog } from './Dialog.vue'
export { default as Badge } from './Badge.vue'
export { default as Card } from './Card.vue'
export { default as Callout } from './Callout.vue'
export { default as Input } from './Input.vue'

/** Compositional Tabs (ADR-0003): <Tabs.Root>/<Tabs.List>/<Tabs.Trigger>/<Tabs.Content>. */
export const Tabs = { Root: TabsRoot, List: TabsList, Trigger: TabsTrigger, Content: TabsContent }
