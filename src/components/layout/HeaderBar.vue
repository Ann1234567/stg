<!-- src/components/layout/HeaderBar.vue -->
<template>
  <header class="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-12">
    <div class="flex items-center justify-between px-4 h-full">
      <div class="text-lg font-semibold text-blue-600">舒摊鬲</div>
      <div class="flex items-center space-x-2">
        <button @click="handleNotification" class="p-2">
          <i class="fas fa-bell text-gray-600"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const handleNotification = () => {
  // Handle notification click
}
</script>