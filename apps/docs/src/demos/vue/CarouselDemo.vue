<script setup lang="ts">
import { Carousel } from '@moderno/vue'

const slides = ['Diseño', 'Desarrollo', 'Pruebas', 'Lanzamiento']
</script>

<template>
  <Carousel.Root :slide-count="slides.length">
    <Carousel.ItemGroup>
      <Carousel.Item v-for="(label, index) in slides" :key="label" :index="index">
        <div
          style="height: 160px; display: flex; align-items: center; justify-content: center; font-size: var(--md-text-body-lg)"
        >
          {{ label }}
        </div>
      </Carousel.Item>
    </Carousel.ItemGroup>
    <Carousel.Control>
      <Carousel.PrevTrigger />
      <Carousel.IndicatorGroup v-slot="{ index }">
        <Carousel.Indicator :index="index" />
      </Carousel.IndicatorGroup>
      <Carousel.NextTrigger />
    </Carousel.Control>
  </Carousel.Root>
</template>
