<!-- src/views/HomeView.vue -->
<template>
  <div class="pt-12 px-4">
    <div class="mb-6">
      <h2 class="text-xl font-bold mb-4">热点资讯</h2>
      <news-card
        v-for="news in newsList"
        :key="news.id"
        :news="news"
        @click="handleNewsClick"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NewsCard from '../components/ui/NewsCard.vue'

const newsList = ref([
  {
    id: 1,
    title: '最新监管政策解读',
    summary: '关于加强餐饮服务食品安全监督管理的通知...',
    image: '/assets/images/news1.jpg',
    date: '2024-01-20'
  },
  // More news items...
])

const handleNewsClick = (newsId) => {
  // Handle news click
}
</script>