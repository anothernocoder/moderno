import type * as tabs from '@zag-js/tabs'
import { createPartContext } from './create-part-context'

type TabsApi = ReturnType<typeof tabs.connect>

/** Root stores a getter so children read the live $derived api reactively. */
export const { set: setTabsContext, get: getTabsContext } = createPartContext<() => TabsApi>('Tabs')
