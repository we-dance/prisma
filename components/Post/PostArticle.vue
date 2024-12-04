<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="relative flex flex-col gap-4 h-full overflow-hidden rounded">
    <NuxtImg
      v-if="image"
      :src="image"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div
      class="relative flex flex-col justify-end h-full p-4 bg-gradient-to-t from-black/80 to-transparent"
    >
      <h3 class="font-bold text-white">{{ title }}</h3>
      <p class="text-sm text-white line-clamp-3">{{ content }}</p>
    </div>
  </div>
</template>
