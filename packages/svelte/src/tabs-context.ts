import { getContext, setContext } from 'svelte'
import type * as tabs from '@zag-js/tabs'

type TabsApi = ReturnType<typeof tabs.connect>
const KEY = Symbol('moderno-tabs')

/** Root stores a getter so children read the live $derived api reactively. */
export function setTabsContext(getApi: () => TabsApi): void {
  setContext(KEY, getApi)
}

export function getTabsContext(): () => TabsApi {
  const ctx = getContext<() => TabsApi>(KEY)
  if (!ctx) throw new Error('Moderno: Tabs parts must be used inside <Tabs.Root>')
  return ctx
}
