import TabsRoot from './TabsRoot.vue'
import TabsList from './TabsList.vue'
import TabsTrigger from './TabsTrigger.vue'
import TabsContent from './TabsContent.vue'
import AccordionRoot from './AccordionRoot.vue'
import AccordionItem from './AccordionItem.vue'
import AccordionItemTrigger from './AccordionItemTrigger.vue'
import AccordionItemContent from './AccordionItemContent.vue'
import SheetRoot from './SheetRoot.vue'
import SheetTrigger from './SheetTrigger.vue'
import SheetContent from './SheetContent.vue'
import SheetTitle from './SheetTitle.vue'
import SheetClose from './SheetClose.vue'
import SelectRoot from './SelectRoot.vue'
import SelectLabel from './SelectLabel.vue'
import SelectTrigger from './SelectTrigger.vue'
import SelectContent from './SelectContent.vue'
import SelectItem from './SelectItem.vue'

export { default as Button } from './Button.vue'
export { default as Dialog } from './Dialog.vue'
export { default as Badge } from './Badge.vue'
export { default as Card } from './Card.vue'
export { default as Callout } from './Callout.vue'
export { default as Alert } from './Alert.vue'
export { default as Input } from './Input.vue'
export { default as Textarea } from './Textarea.vue'
export { default as Avatar } from './Avatar.vue'
export { default as Chip } from './Chip.vue'
export { default as Indicator } from './Indicator.vue'
export { default as Skeleton } from './Skeleton.vue'
export { default as Spinner } from './Spinner.vue'
export { default as Divider } from './Divider.vue'
export { default as Toggle } from './Toggle.vue'
export { default as Checkbox } from './Checkbox.vue'
export { default as Radio } from './Radio.vue'
export { default as Tooltip } from './Tooltip.vue'
export { default as Popover } from './Popover.vue'
export { default as Slider } from './Slider.vue'
export { default as Combobox } from './Combobox.vue'
export type { ComboboxItem } from './Combobox.vue'
export { default as Menu } from './Menu.vue'
export type { MenuItem } from './Menu.vue'
export { default as NumberInput } from './NumberInput.vue'
export { default as Toaster } from './Toaster.vue'
export { createToaster } from './toast'
export type { ToastOptions, Toaster as ToasterStore } from './toast'

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

/** Compositional Sheet (ADR-0003): <Sheet.Root>/<Sheet.Trigger>/<Sheet.Content>/<Sheet.Title>/<Sheet.Close>. */
export const Sheet = {
  Root: SheetRoot,
  Trigger: SheetTrigger,
  Content: SheetContent,
  Title: SheetTitle,
  Close: SheetClose,
}
