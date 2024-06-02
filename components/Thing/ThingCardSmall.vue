<script setup lang="ts">
defineProps<{
  image?: string,
  link?: string,
  text?: string
}>()
</script>

<template>
  <NuxtLink
    :to="link"
    class="p-2 leading-none gap-2 w-20 overflow-hidden flex flex-col items-center justify-center text-center"
  >
    <n-image
      class="w-20 rounded"
      lazy
      :src="image"
      :alt="`${text} photo`"
    >
      <template #placeholder>
        <div
          class="bg-gray-500 w-20 h-16 rounded"
        />
      </template>
    </n-image>

    <div class="mt-2">
      <div class="font-bold leading-none">
        <div class="text-sm">
          {{ text }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
