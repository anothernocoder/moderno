import type { ComputedRef } from 'vue'
import type * as tabs from '@zag-js/tabs'
import { createPartContext, type PartContext } from './create-part-context'

export type TabsApi = ReturnType<typeof tabs.connect>
const tabsContext: PartContext<ComputedRef<TabsApi>> = createPartContext('Tabs')
export const provideTabs: PartContext<ComputedRef<TabsApi>>['provide'] = tabsContext.provide
export const useTabs: PartContext<ComputedRef<TabsApi>>['usePart'] = tabsContext.usePart
