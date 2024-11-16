<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <div class="h-full flex items-center justify-center p-4">
    <div class="text-center">
      <p class="text-xs">{{ message }}</p>
    </div>
  </div>
</template>
