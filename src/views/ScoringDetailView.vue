<!-- src/views/ScoringDetailView.vue -->
<template>
  <div class="pt-12 px-4">
    <div class="bg-white rounded-lg shadow-md p-4">
      <h2 class="text-xl font-bold mb-4">评分详情</h2>
      <div class="mb-4">
        <img :src="score.image" alt="场所图片" class="w-full h-48 object-cover rounded-lg">
      </div>
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-600">场所名称</span>
          <span class="font-semibold">{{ score.name }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-600">总分</span>
          <span class="text-xl font-bold text-blue-600">{{ score.totalScore }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-600">评分时间</span>
          <span>{{ score.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useScoringStore } from '../stores/scoring'

const route = useRoute()
const scoringStore = useScoringStore()
const score = ref(null)

onMounted(() => {
  score.value = scoringStore.getScoreById(Number(route.params.id))
})
</script>