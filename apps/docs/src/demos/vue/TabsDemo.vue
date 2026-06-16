<script setup lang="ts">
import { Tabs } from '@moderno/vue'
</script>

<template>
  <Tabs.Root default-value="cuenta">
    <Tabs.List>
      <Tabs.Trigger value="cuenta">Cuenta</Tabs.Trigger>
      <Tabs.Trigger value="envios">Envíos</Tabs.Trigger>
      <Tabs.Trigger value="seguridad">Seguridad</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="cuenta">Datos de tu cuenta y perfil público.</Tabs.Content>
    <Tabs.Content value="envios">Direcciones y métodos de envío guardados.</Tabs.Content>
    <Tabs.Content value="seguridad">Contraseña, sesiones activas y 2FA.</Tabs.Content>
  </Tabs.Root>
</template>
