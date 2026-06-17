import type { InjectionKey, ComputedRef } from 'vue'
import type * as tabs from '@zag-js/tabs'

export type TabsApi = ReturnType<typeof tabs.connect>
export const TabsKey: InjectionKey<ComputedRef<TabsApi>> = Symbol('moderno-tabs')
