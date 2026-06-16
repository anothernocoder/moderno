import { createContext, useContext, createMemo, createUniqueId, type JSX } from 'solid-js'
import * as tabs from '@zag-js/tabs'
import { useMachine, normalizeProps } from '@zag-js/solid'

type TabsApi = ReturnType<typeof tabs.connect>
const TabsContext = createContext<() => TabsApi>()

function useTabs(part: string): () => TabsApi {
  const api = useContext(TabsContext)
  if (!api) throw new Error(`Moderno: <Tabs.${part}> must be used inside <Tabs.Root>`)
  return api
}

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
    <TabsContext.Provider value={api}>
      <div {...api().getRootProps()} class="md-tabs">
        {props.children}
      </div>
    </TabsContext.Provider>
  )
}

function List(props: { children: JSX.Element }) {
  const api = useTabs('List')
  return (
    <div {...api().getListProps()} class="md-tabs-list">
      {props.children}
    </div>
  )
}

function Trigger(props: { value: string; disabled?: boolean; children: JSX.Element }) {
  const api = useTabs('Trigger')
  return (
    <button {...api().getTriggerProps({ value: props.value, disabled: props.disabled })} class="md-tabs-trigger">
      {props.children}
    </button>
  )
}

function Content(props: { value: string; children: JSX.Element }) {
  const api = useTabs('Content')
  return (
    <div {...api().getContentProps({ value: props.value })} class="md-tabs-content">
      {props.children}
    </div>
  )
}

/** Compositional Tabs (ADR-0003): parts share one Zag machine via Solid context. */
export const Tabs = { Root, List, Trigger, Content }
