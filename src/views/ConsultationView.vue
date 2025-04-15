<!-- src/views/ConsultationView.vue -->
<template>
  <div class="pt-12 px-4">
    <div class="mb-4">
      <h2 class="text-xl font-bold">咨询建议</h2>
    </div>
    <div class="space-y-4">
      <div class="flex flex-col space-y-4">
        <message-bubble
          v-for="message in messages"
          :key="message.id"
          :message="message"
          :is-own="message.isOwn"
        />
      </div>
    </div>
    <div class="fixed bottom-16 left-0 right-0 p-4 bg-white border-t">
      <div class="flex space-x-2">
        <input
          v-model="newMessage"
          type="text"
          placeholder="输入消息..."
          class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        >
        <button
          @click="sendMessage"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MessageBubble from '../components/ui/MessageBubble.vue'

const messages = ref([
  {
    id: 1,
    content: '您好，请问有什么可以帮助您的？',
    time: '10:00',
    isOwn: false
  }
  // More messages...
])

const newMessage = ref('')

const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({
      id: Date.now(),
      content: newMessage.value,
      time: new Date().toLocaleTimeString(),
      isOwn: true
    })
    newMessage.value = ''
  }
}
</script>