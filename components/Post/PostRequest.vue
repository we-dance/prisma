<script setup>
defineProps({
  content: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="text-sm">
    {{ content }}
  </div>
</template>
