import type { ComputedRef } from 'vue'
import type * as carousel from '@zag-js/carousel'
import { createPartContext, type PartContext } from './create-part-context'

export type CarouselApi = ReturnType<typeof carousel.connect>
const carouselContext: PartContext<ComputedRef<CarouselApi>> = createPartContext('Carousel')
export const provideCarousel: PartContext<ComputedRef<CarouselApi>>['provide'] = carouselContext.provide
export const useCarousel: PartContext<ComputedRef<CarouselApi>>['usePart'] = carouselContext.usePart
