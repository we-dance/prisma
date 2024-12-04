<script setup>
defineProps({
  content: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="flex w-full h-full justify-center items-center">
    <p>{{ content }}</p>
  </div>
</template>
