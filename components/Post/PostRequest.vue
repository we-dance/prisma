<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
});

const excerpt = computed(() => {
  if (!props.content) return "";
  return props.content.replace(/https?:\/\/[^\s]+/g, "");
});
</script>
<template>
  <div class="flex items-center justify-center h-full">
    <div class="overflow-hidden text-center">
      <h3 class="font-bold leading-none mb-2">{{ title }}</h3>
      <p class="text-xs">{{ excerpt }}</p>
    </div>
  </div>
</template>
