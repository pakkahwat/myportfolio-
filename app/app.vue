<script setup lang="ts">
// Root application shell. The sticky header sits outside the routed page
// so it persists; <NuxtPage> renders app/pages/index.vue (the one page).
</script>

<template>
  <v-app>
    <SiteHeader />
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<style>
/* Let our own dark background show; keep Vuetify surfaces from overriding it */
.v-application {
  background: #080c10 !important;
}
.v-main {
  --v-layout-top: 0px;
}
</style>
