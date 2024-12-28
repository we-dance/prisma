<script setup>
defineProps({
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
});
</script>
<template>
  <div class="flex flex-col w-full h-full justify-center items-center">
    <p>{{ title }}</p>
    <p>{{ content }}</p>
  </div>
</template>
