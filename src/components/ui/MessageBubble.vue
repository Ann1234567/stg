<!-- src/components/ui/MessageBubble.vue -->
<template>
  <div 
    class="mb-4" 
    :class="{ 'flex justify-end': isOwn }"
  >
    <div 
      class="max-w-[80%] rounded-lg p-3"
      :class="[
        isOwn ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
      ]"
    >
      <p class="text-sm">{{ message.content }}</p>
      <span class="text-xs mt-1 block" :class="[isOwn ? 'text-blue-100' : 'text-gray-500']">
        {{ message.time }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true
  },
  isOwn: {
    type: Boolean,
    default: false
  }
})
</script>