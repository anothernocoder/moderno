import { createMemo, createUniqueId, type JSX } from 'solid-js'
import * as tabs from '@zag-js/tabs'
import { useMachine, normalizeProps } from '@zag-js/solid'
import { parts } from '@moderno/class-contract'
import { createPartContext } from './create-part-context'

type TabsApi = ReturnType<typeof tabs.connect>
const { Provider: TabsProvider, usePart: useTabs } = createPartContext<TabsApi>('Tabs')

export interface TabsRootProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: JSX.Element
}

function Root(props: TabsRootProps) {
  const service = useMachine(tabs.machine, {
    id: createUniqueId(),
    get defaultValue() {
      return props.defaultValue
    },
    get value() {
      return props.value
    },
    onValueChange: (d) => props.onValueChange?.(d.value),
  })
  const api = createMemo(() => tabs.connect(service, normalizeProps))
  return (
    <TabsProvider value={api}>
      <div {...api().getRootProps()} class={parts.tabs.root}>
        {props.children}
      </div>
    </TabsProvider>
  )
}

function List(props: { children: JSX.Element }) {
  const api = useTabs('List')
  return (
    <div {...api().getListProps()} class={parts.tabs.list}>
      {props.children}
    </div>
  )
}

function Trigger(props: { value: string; disabled?: boolean; children: JSX.Element }) {
  const api = useTabs('Trigger')
  return (
    <button {...api().getTriggerProps({ value: props.value, disabled: props.disabled })} class={parts.tabs.trigger}>
      {props.children}
    </button>
  )
}

function Content(props: { value: string; children: JSX.Element }) {
  const api = useTabs('Content')
  return (
    <div {...api().getContentProps({ value: props.value })} class={parts.tabs.content}>
      {props.children}
    </div>
  )
}

/** Compositional Tabs (ADR-0003): parts share one Zag machine via Solid context. */
export const Tabs = { Root, List, Trigger, Content }
