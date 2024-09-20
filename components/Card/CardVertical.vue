<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  size: {
    type: Number,
    default: 150,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  bottom: {
    type: String,
  },
});
</script>

<template>
  <NuxtLink
    :to="to"
    class="block border overflow-hidden rounded"
    :style="`width: ${size}px;`"
  >
    <div class="bg-gray-100" :style="`width: ${size}px; height: ${size}px;`">
      <NuxtImg
        v-if="image"
        :width="size"
        :height="size"
        fit="cover"
        loading="lazy"
        :src="image"
        :alt="title"
      />
    </div>
    <div class="p-2 overflow-hidden">
      <div
        class="font-bold text-xs hover:underline hover:text-primary overflow-hidden text-ellipsis"
      >
        {{ title }}
      </div>
      <div class="overflow-hidden">
        <div class="text-xs text-gray-600">
          <div class="flex items-center">
            <span class="truncate">{{ subtitle }}</span>
          </div>
          <div class="flex items-center">
            <span class="truncate">{{ bottom }}</span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
[data-error] {
  @apply hidden;
}
</style>
