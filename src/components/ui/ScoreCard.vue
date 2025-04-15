<!-- src/components/ui/ScoreCard.vue -->
<template>
  <div class="bg-white rounded-lg shadow p-4 mb-4">
    <div class="flex items-center mb-3">
      <img :src="score.image" alt="场所图片" class="w-16 h-16 rounded object-cover mr-3">
      <div>
        <h3 class="font-semibold">{{ score.name }}</h3>
        <p class="text-sm text-gray-500">{{ score.date }}</p>
      </div>
    </div>
    <div class="flex items-center">
      <div class="flex-1">
        <div class="flex items-center">
          <span class="text-sm text-gray-600 mr-2">总分：</span>
          <span class="text-lg font-bold text-blue-600">{{ score.totalScore }}</span>
        </div>
      </div>
      <button 
        @click="$emit('viewDetail', score.id)"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
      >
        查看详情
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  score: {
    type: Object,
    required: true
  }
})

defineEmits(['viewDetail'])
</script>