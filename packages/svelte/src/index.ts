import TabsRoot from './TabsRoot.svelte'
import TabsList from './TabsList.svelte'
import TabsTrigger from './TabsTrigger.svelte'
import TabsContent from './TabsContent.svelte'
import AccordionRoot from './AccordionRoot.svelte'
import AccordionItem from './AccordionItem.svelte'
import AccordionItemTrigger from './AccordionItemTrigger.svelte'
import AccordionItemContent from './AccordionItemContent.svelte'
import SheetRoot from './SheetRoot.svelte'
import SheetTrigger from './SheetTrigger.svelte'
import SheetContent from './SheetContent.svelte'
import SheetTitle from './SheetTitle.svelte'
import SheetClose from './SheetClose.svelte'
import SelectRoot from './SelectRoot.svelte'
import SelectLabel from './SelectLabel.svelte'
import SelectTrigger from './SelectTrigger.svelte'
import SelectContent from './SelectContent.svelte'
import SelectItem from './SelectItem.svelte'
import DatePickerRoot from './DatePickerRoot.svelte'
import DatePickerLabel from './DatePickerLabel.svelte'
import DatePickerControl from './DatePickerControl.svelte'
import DatePickerInput from './DatePickerInput.svelte'
import DatePickerTrigger from './DatePickerTrigger.svelte'
import DatePickerClearTrigger from './DatePickerClearTrigger.svelte'
import DatePickerContent from './DatePickerContent.svelte'

export { default as Button } from './Button.svelte'
export { default as Dialog } from './Dialog.svelte'
export { default as Badge } from './Badge.svelte'
export { default as Card } from './Card.svelte'
export { default as Callout } from './Callout.svelte'
export { default as Alert } from './Alert.svelte'
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
export { default as Progress } from './Progress.svelte'
export { default as Combobox } from './Combobox.svelte'
export type { ComboboxItem } from './Combobox.svelte'
export { default as Menu } from './Menu.svelte'
export type { MenuItem } from './Menu.svelte'
export { default as NumberInput } from './NumberInput.svelte'
export { default as Pagination } from './Pagination.svelte'
export { default as Splitter } from './Splitter.svelte'
export type { SplitterPanelDef } from './Splitter.svelte'
export { default as Toaster } from './Toaster.svelte'
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

/**
 * Compositional DatePicker (ADR-0003): <DatePicker.Root>/<DatePicker.Label>/
 * <DatePicker.Control>/<DatePicker.Input>/<DatePicker.Trigger>/<DatePicker.ClearTrigger>/
 * <DatePicker.Content>. `Content` renders the full day/month/year calendar internally.
 */
export const DatePicker = {
  Root: DatePickerRoot,
  Label: DatePickerLabel,
  Control: DatePickerControl,
  Input: DatePickerInput,
  Trigger: DatePickerTrigger,
  ClearTrigger: DatePickerClearTrigger,
  Content: DatePickerContent,
}
