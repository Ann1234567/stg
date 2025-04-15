<!-- src/components/layout/BottomNav.vue -->
<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white shadow-t-md">
    <div class="flex justify-around items-center h-16">
      <router-link 
        v-for="item in navItems" 
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center px-4"
        :class="{ 'text-blue-600': isActive(item.path) }"
      >
        <i :class="[item.icon, 'text-xl']"></i>
        <span class="text-xs mt-1">{{ item.text }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/', text: '首页', icon: 'fas fa-home' },
  { path: '/scoring', text: '监管打分', icon: 'fas fa-star' },
  { path: '/consultation', text: '咨询建议', icon: 'fas fa-comments' }
]

const isActive = (path) => route.path === path
</script>