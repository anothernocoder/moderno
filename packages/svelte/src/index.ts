import TabsRoot from './TabsRoot.svelte'
import TabsList from './TabsList.svelte'
import TabsTrigger from './TabsTrigger.svelte'
import TabsContent from './TabsContent.svelte'
import AccordionRoot from './AccordionRoot.svelte'
import AccordionItem from './AccordionItem.svelte'
import AccordionItemTrigger from './AccordionItemTrigger.svelte'
import AccordionItemContent from './AccordionItemContent.svelte'
import SelectRoot from './SelectRoot.svelte'
import SelectLabel from './SelectLabel.svelte'
import SelectTrigger from './SelectTrigger.svelte'
import SelectContent from './SelectContent.svelte'
import SelectItem from './SelectItem.svelte'

export { default as Button } from './Button.svelte'
export { default as Dialog } from './Dialog.svelte'
export { default as Badge } from './Badge.svelte'
export { default as Card } from './Card.svelte'
export { default as Callout } from './Callout.svelte'
export { default as Input } from './Input.svelte'
export { default as Textarea } from './Textarea.svelte'
export { default as Avatar } from './Avatar.svelte'
export { default as Chip } from './Chip.svelte'
export { default as Indicator } from './Indicator.svelte'
export { default as Skeleton } from './Skeleton.svelte'
export { default as Spinner } from './Spinner.svelte'
export { default as Divider } from './Divider.svelte'
export { default as Toggle } from './Toggle.svelte'
export { default as Checkbox } from './Checkbox.svelte'
export { default as Radio } from './Radio.svelte'
export { default as Tooltip } from './Tooltip.svelte'
export { default as Popover } from './Popover.svelte'
export { default as Slider } from './Slider.svelte'

/** Compositional Tabs (ADR-0003): <Tabs.Root>/<Tabs.List>/<Tabs.Trigger>/<Tabs.Content>. */
export const Tabs = { Root: TabsRoot, List: TabsList, Trigger: TabsTrigger, Content: TabsContent }

/** Compositional Accordion (ADR-0003): <Accordion.Root>/<Accordion.Item>/<Accordion.ItemTrigger>/<Accordion.ItemContent>. */
export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  ItemTrigger: AccordionItemTrigger,
  ItemContent: AccordionItemContent,
}

/** Compositional Select (ADR-0003): <Select.Root>/<Select.Label>/<Select.Trigger>/<Select.Content>/<Select.Item>. */
export const Select = {
  Root: SelectRoot,
  Label: SelectLabel,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
}
