<!-- src/components/ui/NewsCard.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden mb-4">
    <img 
      v-if="news.image" 
      :src="news.image" 
      :alt="news.title"
      class="w-full h-48 object-cover"
    >
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-2">{{ news.title }}</h3>
      <p class="text-gray-600 text-sm mb-3">{{ news.summary }}</p>
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-500">{{ news.date }}</span>
        <button 
          @click="$emit('click', news.id)"
          class="text-blue-600 text-sm"
        >
          查看详情
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  news: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>