<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useId } from 'vue'
import * as carousel from '@zag-js/carousel'
import { useMachine, normalizeProps } from '@zag-js/vue'
import { provideCarousel } from './carousel-context'
import { parts } from '@moderno/class-contract'

const props = defineProps<{
  /** The total number of slides. */
  slideCount: number
  /** @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical'
  /** Controlled page. */
  page?: number
  /** Uncontrolled initial page. */
  defaultPage?: number
  /** Whether the carousel should loop around. */
  loop?: boolean
  /** The number of slides to show at a time. */
  slidesPerPage?: number
  /** The number of slides to scroll at a time. */
  slidesPerMove?: number | 'auto'
  /** Whether to enable variable width slides. */
  autoSize?: boolean
  /** Whether to allow scrolling via dragging with mouse. */
  allowMouseDrag?: boolean
  /** Whether to scroll automatically, or the autoplay delay in ms. */
  autoplay?: boolean | { delay: number }
  /** The amount of space between items. */
  spacing?: string
  /** Extra space around the scrollable area so neighboring items stay partially in view. */
  padding?: string
  /** Localized a11y messages for the prev/next triggers, items and indicators. */
  translations?: carousel.IntlTranslations
}>()
const emit = defineEmits<{ 'update:page': [page: number] }>()

const service = useMachine(carousel.machine, {
  id: useId(),
  get slideCount() {
    return props.slideCount
  },
  get orientation() {
    return props.orientation
  },
  get page() {
    return props.page
  },
  get defaultPage() {
    return props.defaultPage
  },
  onPageChange(d) {
    emit('update:page', d.page)
  },
  get loop() {
    return props.loop
  },
  get slidesPerPage() {
    return props.slidesPerPage
  },
  get slidesPerMove() {
    return props.slidesPerMove
  },
  get autoSize() {
    return props.autoSize
  },
  get allowMouseDrag() {
    return props.allowMouseDrag
  },
  get autoplay() {
    return props.autoplay
  },
  get spacing() {
    return props.spacing
  },
  get padding() {
    return props.padding
  },
  get translations() {
    return props.translations
  },
})
const api = computed(() => carousel.connect(service, normalizeProps))
provideCarousel(api)

const rootEl = ref<HTMLDivElement>()
// Zag measures scroll-snap positions once on mount. If the root starts
// hidden (e.g. an inactive tab panel) that measurement sees a zero-width
// container and never gets recomputed once the tab is shown. A
// ResizeObserver on the root re-runs the machine's own refresh() whenever
// its size settles, independent of Zag's internal item-group observer.
let observer: ResizeObserver | undefined
onMounted(() => {
  if (!rootEl.value) return
  observer = new ResizeObserver(() => api.value.refresh())
  observer.observe(rootEl.value)
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div v-bind="api.getRootProps()" ref="rootEl" :class="parts.carousel.root"><slot /></div>
</template>
