<script setup lang="ts">
// Moderno block — InputGroups (Vue). Copy-paste; edit freely.
// Composite inputs: a text prefix (URL), a prefix + suffix pair (currency amount),
// an icon-button add-on (copy API key) and an input+button search combo. Uses the
// Input + Button primitives + Moderno tokens; the "join" is pure CSS layout —
// shared 1px borders between adjoining segments, no new primitives.
import { ref } from 'vue'
import { Button, Input } from '@moderno/vue'

const props = withDefaults(
  defineProps<{
    website?: string
    price?: string
    apiKey?: string
    search?: string
  }>(),
  {
    website: 'mi-tienda',
    price: '129.900',
    apiKey: 'sk_live_4f2a9c1d8e6b0f3a',
    search: '',
  },
)

const emit = defineEmits<{
  copyApiKey: [value: string]
  searchSubmit: [value: string]
}>()

const websiteValue = ref(props.website)
const priceValue = ref(props.price)
const searchValue = ref(props.search)

function handleSearchSubmit() {
  emit('searchSubmit', searchValue.value)
}
</script>

<template>
  <section class="md-input-groups">
    <!-- Prefix add-on -->
    <div>
      <span class="md-input-groups__label">Sitio web</span>
      <div class="md-input-groups__group">
        <span class="md-input-groups__addon">https://</span>
        <div class="md-input-groups__field">
          <Input
            aria-label="Sitio web"
            placeholder="tu-dominio.com"
            class="md-input-groups__input--no-left"
            v-model="websiteValue"
          />
        </div>
      </div>
    </div>

    <!-- Prefix + suffix add-ons -->
    <div>
      <span class="md-input-groups__label">Precio</span>
      <div class="md-input-groups__group">
        <span class="md-input-groups__addon">$</span>
        <div class="md-input-groups__field">
          <Input
            aria-label="Precio"
            inputmode="decimal"
            class="md-input-groups__input--no-sides"
            v-model="priceValue"
          />
        </div>
        <span class="md-input-groups__addon">MXN</span>
      </div>
    </div>

    <!-- Icon-button add-on -->
    <div>
      <span class="md-input-groups__label">Llave de API</span>
      <div class="md-input-groups__group">
        <div class="md-input-groups__field">
          <Input aria-label="Llave de API" readonly class="md-input-groups__input--no-right" :model-value="apiKey" />
        </div>
        <Button type="button" variant="secondary" aria-label="Copiar llave" @click="emit('copyApiKey', apiKey)">
          ⧉
        </Button>
      </div>
    </div>

    <!-- Input + button combo (search) -->
    <div>
      <span class="md-input-groups__label">Buscar</span>
      <form class="md-input-groups__group" @submit.prevent="handleSearchSubmit">
        <span class="md-input-groups__addon" aria-hidden="true">⌕</span>
        <div class="md-input-groups__field">
          <Input
            aria-label="Buscar"
            placeholder="Buscar productos…"
            class="md-input-groups__input--no-sides"
            v-model="searchValue"
          />
        </div>
        <Button type="submit" variant="primary">Buscar</Button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.md-input-groups {
  display: flex;
  flex-direction: column;
  gap: var(--md-spacing-8);
  max-width: 420px;
  padding: 24px;
  background: var(--md-surface-base);
}
.md-input-groups__label {
  display: block;
  font-size: var(--md-text-label-md);
  color: var(--md-text-primary);
  margin-bottom: var(--md-spacing-2);
}
.md-input-groups__group {
  display: flex;
  align-items: stretch;
  width: 100%;
}
.md-input-groups__addon {
  display: flex;
  align-items: center;
  padding: 0 var(--md-spacing-4);
  background: var(--md-surface-base);
  border: 1px solid var(--md-border-strong);
  color: var(--md-text-secondary);
  font-size: var(--md-text-body-sm);
  white-space: nowrap;
}
.md-input-groups__field {
  flex: 1;
  min-width: 0;
}
.md-input-groups__input--no-left :deep(.md-input) {
  border-left: none;
}
.md-input-groups__input--no-right :deep(.md-input) {
  border-right: none;
}
.md-input-groups__input--no-sides :deep(.md-input) {
  border-left: none;
  border-right: none;
}
</style>
