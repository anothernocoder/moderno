import { useId, type ReactNode } from 'react'
import * as tabs from '@zag-js/tabs'
import { useMachine, normalizeProps } from '@zag-js/react'
import { parts } from '@moderno/class-contract'
import { createPartContext } from './create-part-context'

type TabsApi = ReturnType<typeof tabs.connect>
const { Provider: TabsProvider, usePart: useTabs } = createPartContext<TabsApi>('Tabs')

export interface TabsRootProps {
  /** Uncontrolled initial selected tab. */
  defaultValue?: string
  /** Controlled selected tab. */
  value?: string
  onValueChange?: (value: string) => void
  children: ReactNode
}

function Root({ defaultValue, value, onValueChange, children }: TabsRootProps) {
  const service = useMachine(tabs.machine, {
    id: useId(),
    defaultValue,
    value,
    onValueChange: onValueChange ? (d) => onValueChange(d.value) : undefined,
  })
  const api = tabs.connect(service, normalizeProps)
  return (
    <TabsProvider value={api}>
      <div {...api.getRootProps()} className={parts.tabs.root}>
        {children}
      </div>
    </TabsProvider>
  )
}

function List({ children }: { children: ReactNode }) {
  const api = useTabs('List')
  return (
    <div {...api.getListProps()} className={parts.tabs.list}>
      {children}
    </div>
  )
}

function Trigger({ value, disabled, children }: { value: string; disabled?: boolean; children: ReactNode }) {
  const api = useTabs('Trigger')
  return (
    <button {...api.getTriggerProps({ value, disabled })} className={parts.tabs.trigger}>
      {children}
    </button>
  )
}

function Content({ value, children }: { value: string; children: ReactNode }) {
  const api = useTabs('Content')
  return (
    <div {...api.getContentProps({ value })} className={parts.tabs.content}>
      {children}
    </div>
  )
}

/** Compositional Tabs (per ADR-0003): anatomy parts share one Zag machine via context. */
export const Tabs = { Root, List, Trigger, Content }
