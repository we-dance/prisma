<script setup>
defineProps({
  content: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <h3 class="font-bold">{{ content }}</h3>
</template>
