<!-- src/App.vue -->
<template>
  <div class="app-container">
    <!-- <header-bar v-if="showHeader" /> -->
    <main>
      <router-view></router-view>
    </main>
    <!-- <bottom-nav v-if="showNav" /> -->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>