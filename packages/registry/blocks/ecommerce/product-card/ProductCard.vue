<script setup lang="ts">
// Moderno block — ProductCard (Vue). Copy-paste; edit freely.
// Product tile. Uses the Card + Badge + Button primitives + Moderno tokens.
import { computed } from 'vue'
import { Card, Badge, Button } from '@moderno/vue'

const props = withDefaults(
  defineProps<{
    image?: string
    title?: string
    price?: string
    saleText?: string
  }>(),
  {
    title: 'Silla Moderno',
    price: '$320',
  },
)

defineEmits<{ add: [] }>()

const imageStyle = computed(() => ({
  aspectRatio: '1 / 1',
  background: 'var(--md-surface-muted)',
  borderBottom: '1px solid var(--md-border-default)',
  backgroundImage: props.image ? `url(${props.image})` : undefined,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}))
</script>

<template>
  <div class="md-product">
    <Card>
      <div class="md-product__media">
        <span v-if="saleText" class="md-product__sale">
          <Badge variant="solid">{{ saleText }}</Badge>
        </span>
        <div class="md-product__image" :style="imageStyle" />
      </div>
      <p class="md-product__title">{{ title }}</p>
      <p class="md-product__price">{{ price }}</p>
      <template #footer>
        <Button label="Agregar al carrito" size="md" style="width: 100%" @click="$emit('add')" />
      </template>
    </Card>
  </div>
</template>

<style scoped>
.md-product {
  max-width: 280px;
}
.md-product__media {
  position: relative;
  margin: 0 0 12px;
}
.md-product__sale {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1;
}
.md-product__title {
  font-size: var(--md-text-body-md);
  color: var(--md-text-primary);
  margin: 0 0 4px;
}
.md-product__price {
  font-family: var(--md-font-serif);
  font-size: 20px;
  color: var(--md-text-primary);
  margin: 0;
}
</style>
